const { where } = require("sequelize");
const Address = require("../models/AddressModels");
const Option = require("../models/OptionModels");
const Order = require("../models/OrderModels");
const Product = require("../models/ProductModels");
const Quantity = require("../models/QuantityModels");
const PurchaseHistory = require("../models/PurchaseHistory")

class OrderController {
  // Process product purchase notifications for shop owners
  async handleOrder(req, res) {
    const { orderShop } = req.body;

    if (!orderShop  ) {
      return res.status(404).json({
        message: "Order not found",
      });
    }
    try {
      orderShop.map(async (item) => {
        await Order.create({
          shopId: item.shopId,
          idProduct: item.idProduct,
          quantity: item.quantity,
          price: item.price,
          idAddress: item.idAddress,
          optionId: item.optionId,
        });
      });

      return res.status(200).json({
        message: "Order succsess",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
//get Notify the shop owner
  async getOrder(req, res) {
    const idUser = req.userId;
    if (!idUser) {
      return res.status(404).json({
        message: " user not found",
      });
    }

    try {
      const data = await Order.findAll({
        where: { shopId: idUser },
        include: [
          {
            model: Option,
            attributes: ["name"],
          },
          {
            model: Product,
            attributes: ["name", "image"],
          },
          {
            model: Address,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
        attributes: ["quantity", "price"],
        order: [["createdAt", "DESC"]],
      });

      return res.json(data);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  // aotu upate quantity
  async updateQuantity(req, res) {
    const { quantity} = req.body;
    console.log(quantity.length )
    if(!quantity || quantity.length === 0){
        return res.status(404).json(
            {
                message : " quantity not found",
            }
        )
    }
    try {
        // auto update quantity product
        const updatePromises = quantity.map(async (item) => {
          const data = await Quantity.findOne({
            where: { ProductId: item.idProduct },
          });
          await Quantity.update(
            { quantity: data.quantity + item.quantity },
            {
              where: {
                ProductId: item.idProduct,
              },
            }
          );
        });
        await Promise.all(updatePromises);
        return res.status(200).json({
          message: "Quantities updated successfully",
        });
      } catch (error) {
        console.error("Error updating quantities:", error);
        return res.status(500).json({
          message: error.message,
        });
      }
  }
  // handle create history purchase
  async handlePurchaseHistory(req, res) {
        const idUser = req.userId
        const {purchaseHistory} = req.body
   if(!purchaseHistory || purchaseHistory.length ===0){
    return res.status(404).json({
      message: "not found"
    })
   }

   try {
     const createHistory = purchaseHistory.map( async (item) => {
      await PurchaseHistory.create({
        idUser:idUser,
        IdOption: item.idOption,
        idProduct: item.idProduct,
        quantity: item.quantity,
        totalPrice: item.totalPrice,
        price: item.price,

      })
     })
     await Promise.all(createHistory)
   
     return res.status(200).json({
    message: "succsess"
     })
  
   } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
   }
  }

  // get history purchase
  async getPurchaseHistory(req, res) {
    const idUser = req.userId
    if(!idUser){
      return res.status(404).json({
        message : "id not found"
      })
    }
    try {
      const data = await PurchaseHistory.findAll(
      {
        where: {idUser },
        include:[
          {
            model: Option,
            attributes: ["name"],

          },
          {
            model: Product,
            attributes: ["name", "image"],
          }
        ],
        attributes: ["quantity", "price", "totalPrice"],
        order: [["createdAt", "DESC"]],
      
      }
      );
     if(!data){
         return res.status(404).json({
          message : "Purchase history not found"
         });
     }
      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }


}

module.exports = new OrderController();
