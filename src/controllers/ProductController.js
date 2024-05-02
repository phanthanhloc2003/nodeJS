const Product = require("../models/ProductModels");
const Customers = require("../models/CustomersModels");
const Description = require("../models/DescriptionModels");
const ParagraphList = require("../models/ParagraphListModels");
const Image = require("../models/ImagesModels");
const Attributes = require("../models/AttributesModels");
const Option = require("../models/OptionModels");
const Variation = require("../models/VariationModels");
const Quantity = require("../models/QuantityModels");
const Rating = require("../models/RatingModels");
class ProductControllers {
  // create product
  async createProduct(req, res) {
    const idUser = req.userId;
    const {
      name,
      origin,
      discount,
      price,
      image,
      Variations,
      Descriptions,
      attributes,
      ParagraphLists,
      imgaes,
    } = req.body;
    try {
      // add product
      const seller = await Customers.findByPk(idUser);
      const product = await Product.create({
        name,
        origin,
        price,
        image,
        discount,
        shop_id: seller.user_id,
      });
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      // add descriptions
      const descriptions = await Description.create({
        text: Descriptions,
        ProductId: product.id,
      });
      const quantity = await Quantity.create({
        quantity: 0,
        ProductId: product.id,
      });
      const rating = await Rating.create({
        rating: 5,
        ProductId: product.id,
      });
      const dataattributes = await Promise.all(
        attributes.map(async (list) => {
          const data = await Attributes.create({
            name: list.name,
            value: list.value,
            ProductId: product.id,
          });
          return data;
        })
      );
      const dataParagraphList = await Promise.all(
        ParagraphLists.map(async (list) => {
          const data = await ParagraphList.create({
            urlId: list.list,
            ratio: list.ratio,
            text: list.text,
            ProductId: product.id,
          });
          return data;
        })
      );
      const variationsAndOptions = await Promise.all(
        Variations.map(async (variation) => {
          const datavariant = await Variation.create({
            name: variation.name,
            ProductId: product.id,
          });
          if (!datavariant) {
            throw new Error("Variant not found");
          }
          const options = await Promise.all(
            variation.option.map(async (option) => {
              const dataOption = await Option.create({
                name: option.name,
                sold: option.sold,
                price: option.price,
                price_before_discount: option.price_before_discount,
                VariationId: datavariant.id,
              });
              if (!dataOption) {
                throw new Error("Option not found");
              }
              let image = null;
              if (option.image) {
                image = await Image.create({
                  url: option.image,
                  ProductId: product.id,
                  OptionId: dataOption.id,
                });
                if (!image) {
                  throw new Error("Image not found");
                }
              }
              return { name: dataOption.name, image };
            })
          );
          return { variation: datavariant, options };
        })
      );
      const dataimgaes = await Promise.all(
        imgaes.map(async (list) => {
          const data = await Image.create({
            idProduct: product.id,
            url: list,
            ProductId: product.id,
          });
          return data;
        })
      );
      return res.status(201).json({
        message: "Product created successfully",
      });
    } catch (error) {
      console.error("Error creating product:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  //get all product
  async getAllProduct(req, res) {
    try {
      const data = await Product.findAll({
        include: [
          {
            model: Quantity,
            as: "Quantity",
            attributes: ["quantity"],
          },
          {
            model: Rating,
            as: "Rating",
            attributes: ["rating"],
          },
        ],
      });
      return res.status(200).json({
        message: "successfully",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async getDetailsProduct(req, res) {
    const idProduct = req.params.id;
    try {
      const data = await Product.findAll({
        where: { id: idProduct },
        include: [
          {
            model: Quantity,
            as: "Quantity",
            attributes: ["quantity"],
          },
          {
            model: Description,
            as: "Description",
            attributes: ["text"],
          },

          {
            model: Variation,
            as: "Variations",
            attributes: ["name"],
            include: [
              { 
                  model: Option, 
                  as: "Options", 
                  attributes: ["name", "sold", "price", "price_before_discount"],
                  include: [
                      { model: Image, as: "Images", attributes: ["url"]
                    
                     }
                  ]
              }
          ]
          },
          {
            model: Attributes,
            as: "Attributes",
            attributes: ["name", "value", "url"],
          },
          {
            model: Rating,
            as: "Rating",
            attributes: ["rating"],
          },
          {
            model: Image,
            as: "Images",
            attributes: ["url"],
          },
          {
            model: ParagraphList,
            as: "ParagraphLists",
            attributes: ["urlId","text", "ratio"],
          },
        ],

      });

      res.json(data);
    } catch (error) {}
  }
}

module.exports = new ProductControllers();
