const Product = require("../models/ProductModels");
const Description = require("../models/DescriptionModels");
const ParagraphList = require("../models/ParagraphListModels");
const Image = require("../models/ImagesModels");
const Attributes = require("../models/AttributesModels");
const Option = require("../models/OptionModels");
const Variation = require("../models/VariationModels");
const Quantity = require("../models/QuantityModels")
const Rating = require("../models/RatingModels")
class ProductControllers {
  async createProduct(req, res) {
    const {
      title,
      origin,
      price,
      image,
      Variations,
      Descriptions,
      attributes,
      ParagraphLists,
      imgaes,
    } = req.body;
    try {
      const product = await Product.create({ title, origin, price, image });
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      const descriptions = await Description.create({
        text: Descriptions,
        ProductId: product.id,
      });
      const quantity = await Quantity.create({
        quantity: 0,
        ProductId: product.id
      }) 
      const rating = await Rating.create({
        rating: 5,
        ProductId: product.id
      })
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
            img_id: list.list,
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
                  VariationId: datavariant.id,
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
          url: list.url,
          ProductId: product.id,
          });
          return data;
        })
      );
      return res.status(201).json({
        message: "Product created successfully"
      });
    } catch (error) {
      console.error("Error creating product:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new ProductControllers();
