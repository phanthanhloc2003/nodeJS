const Cart = require("../models/CartModels");
const Product = require("../models/ProductModels");
const Option = require("../models/OptionModels");
class CartController {
  // add to cart
  async addToCart(req, res) {
    const idUser = req.userId;
    const { idProduct, quantity } = req.body;
    const ischeckProduct = await Product.findByPk(idProduct);
    if (!ischeckProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    try {
      const cartItem = await Cart.findOne({
        where: { idUser, idProduct },
      });
      if (cartItem) {
        await cartItem.increment("quantity", { by: quantity });
      } else {
        await Cart.create({
          ...req.body,
          idUser: idUser,
        });
      }
      return res.status(200).json({
        message: "add to succsess",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
// get cart user
  async getAllcart(req, res) {
    const iduser = req.userId;
    try {
      const data = await Cart.findAll({
        where: { iduser },
        include: [
          {
            model: Product,
          },
          {
            model: Option,
            attributes: ["name"],
          },
        ],
      });
     return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({
        message: error.message
      })
    }
  }
  async updateCart(req, res){
    const {id,idOption, quantity,ischeck} = req.body
    const isCheckCart = await Cart.findByPk(id)
    if(!isCheckCart){
       return res.status(404).json({
        message: "Cart not found"
       })
    }

    try {
      await Cart.update({idOption,quantity, ischeck }, 
        {
          where: {
            id
          },
        },
      )
      return res.status(200).json({
        message:"update succsess"
      })
    } catch (error) {
      return res.status(500).json({
        message: error.message
      })
    }
  }
  async deleteCart(req, res) {
    const idUser = req.userId;
     const id = req.params.id
    try {
      const cartItem = await Cart.findOne({
        where: { idUser, id }
      });
      if (!cartItem) {
        return res.status(404).json({ message: "Sản phẩm không tồn tại trong giỏ hàng." });
      }
      await cartItem.destroy();

     return res.status(200).json({
      message: "delete product succsess"
     })
    } catch (error) {
      return res.status(500).json({
        message: error.message
      })
    }
  }

}

module.exports = new CartController();
