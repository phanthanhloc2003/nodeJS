const Customers = require("../models/CustomersModels");
const Option = require("../models/OptionModels");
const Product = require("../models/ProductModels");
class CheckuotController {
  async checkuotOrder(req, res) {
    const { shopOrder } = req.body;
    try {
      let total = 0
      let sale_shop = null;
      const data = await Promise.all(
        shopOrder.map(async (orderItem) => {
          let total_price = 0;
          const shopId = await Customers.findOne({
            where: { user_id: orderItem.shop_id },
            attributes: { exclude: ['createdAt','updatedAt'] }
          });
          const items = await Promise.all(
            orderItem.items.map(async (productItem) => {
              const product = await Product.findOne({
                where: { id: productItem.idProduct },
                attributes: { exclude: ['price'] }
              });
              const option = await Option.findOne({
                where: { id: productItem.idOption },
                attributes: ["price", "name"],
              });
              const ship_free = 32000
              total_price = option.price * productItem.quantity ;
            const  total_product = total_price + ship_free
              total += total_product 
              return {
               
                product,
                price: option.price,
                quantity: productItem.quantity,
                option,
                ship_free,
                total_price,
                total_product
              };
            })
          ); 
          return { shopId, items };
        })
      );

      if(shopOrder.length > 1){
        sale_shop = 20000
        total = total - 20000
      }
     return res.status(200).json({data ,sale_shop, total});
    } catch (error) {
      res.status(500).json({ error:error.message });
    }
  }
}
module.exports = new CheckuotController();
