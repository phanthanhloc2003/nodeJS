const { Op } = require("sequelize");
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
const Comment = require("../models/CommentModels");
const SellersResponse = require("../models/SellerResponseModejs");
const Like = require("../models/LikeModels");
const sequelize = require("../services/db");
const { calculateAverageRating } = require("../utils/ratingUtils");
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
                url: option.image,
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
   const  _name_search = req.query.name_search || " " ;
   const _page = parseInt(req.query._page) || 1; 
   const _limit = parseInt(req.query._limit) || 8; 
  
    try {
      const data = await Product.findAll({
        where: {
          [Op.or]: [
              { 'name': { [Op.like]: `%${_name_search}%` } },
          ]
      },
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
                  as: "list_Option",
                  attributes: [
                    "id",
                    "name",
                    "sold",
                    "price",
                    "price_before_discount",
                    "url",
                  ],
                },
              ],
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
              as: "list_image",
              attributes: ["url"],
            },
            {
              model: ParagraphList,
              as: "ParagraphLists",
              attributes: ["urlId", "text", "ratio"],
            },
          ],
          limit: _limit,
          offset: _page && (_page - 1) * _limit,
        
        }
      
   );
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
  //get details Product
  async getDetailsProduct(req, res) {
    const idProduct = req.params.id;
    try {
      const data = await Product.findOne({
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
                as: "list_Option",
                attributes: [
                  "id",
                  "name",
                  "sold",
                  "price",
                  "price_before_discount",
                  "url",
                ],
              },
            ],
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
            as: "list_image",
            attributes: ["url"],
          },
          {
            model: ParagraphList,
            as: "ParagraphLists",
            attributes: ["urlId", "text", "ratio"],
          },
        ],
      });
      return res.status(200).json({
        data,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  // user comment and update ratings Product
  async createComments(req, res) {
    const idCustomers = req.userId;
    const { idProduct, rating, content } = req.body;
    const ischeckProduct = await Product.findByPk(idProduct);
    if (!ischeckProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    try {
      const data = await Comment.create({
        idCustomers: idCustomers,
        rating,
        content,
        idProduct,
      });
      const averageRating = await calculateAverageRating(idProduct);
      await Rating.update(
        { rating: averageRating },
        { where: { id: idProduct } }
      );
      return res.status(200).json({
        message: "success",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  // get commet all product
  async getAllDetailsProduct(req, res) {
    const idProduct = req.params.id;
    try {
      const data = await Comment.findAll({
        where: { idProduct: idProduct },
        include: [
          {
            model: Customers,
            attributes: ["avata"],
          },

          {
            model: SellersResponse,
            attributes: ["content"],
          },
        ],
        attributes: {
          include: [
            [
              sequelize.literal(
                "(SELECT COUNT(*) FROM Likes WHERE Likes.idComment = Comment.id)"
              ),
              "like",
            ],
          ],
        },
      });
      return res.json(data);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  // sum like product
  async toggleCommentLike(req, res) {
    const idComment = req.params.id;
    const idCustomer = req.userId;
    try {
      const existingLike = await Like.findOne({
        where: {
          idCustomer: idCustomer,
          idComment: idComment,
        },
      });
      if (existingLike) {
        await existingLike.destroy();
      } else {
        await Like.create({
          idCustomer: idCustomer,
          idComment: idComment,
        });
      }
      return res.status(200).json({ message: "Success" });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  // response seller commnet Product
  async sellersResponse(req, res) {
    const idSeller = req.userId;
    const { idProduct, idComment, response } = req.body;
    const icheck = await Product.findOne({
      where: { shop_id: idSeller, id: idProduct },
    });
    if (!icheck) {
      return res.status(404).json({
        message: "You are not eligible to respond",
      });
    }
    try {
      const data = await SellersResponse.create({
        content: response,
        idComment,
      });
      return res.status(200).json({
        message: "Success",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}

module.exports = new ProductControllers();
