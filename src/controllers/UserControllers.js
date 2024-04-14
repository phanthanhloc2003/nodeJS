const Customers = require("../models/CustomersController");
const Sellers = require("../models/SellersController");
const Users = require("../models/userControlers");
const bcrypt = require("bcryptjs");

class UserController {
  async registerUserCustomers(req, res) {
    const { email, password, setPassword } = req.body;
    if (!email || !password || !setPassword) {
      return res.status(400).json({
        message: "Vui lòng điền đầy đủ thông tin.",
      });
    }
    if (password !== setPassword) {
      return res.status(400).json({
        message: "Mật khẩu không khớp.",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Địa chỉ email không hợp lệ.",
      });
    }
    try {
      const user = await Users.findOne({
        where: {
          email: email,
        },
      });

      if (user !== null) {
        return res.status(400).json({
          message: "Email này đã tồn tại.",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await Users.create({
        email: email,
        password: hashedPassword,
        role: "user",
      });
      await Customers.create({ user_id: newUser.id });
      return res.status(200).json({
        status: "success",
        message: "Tạo tài khoản thành công.",
        data: newUser,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Lỗi truy vấn dữ liệu.",
      });
    }
  }
  async registerUserSellers(req, res) {
    const { email, password, setPassword } = req.body;
    if (!email || !password || !setPassword) {
      return res.status(400).json({
        message: "Vui lòng điền đầy đủ thông tin.",
      });
    }
    if (password !== setPassword) {
      return res.status(400).json({
        message: "Mật khẩu không khớp.",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Địa chỉ email không hợp lệ.",
      });
    }

    try {
      const user = await Users.findOne({
        where: {
          email: email,
        },
      });

      if (user !== null) {
        return res.status(400).json({
          message: "Email này đã tồn tại.",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUserSellers = await Users.create({
        email: email,
        password: hashedPassword,
        role: "sellers",
      });
      await Customers.create({ user_id: newUserSellers.id });
      await Sellers.create({ user_id: newUserSellers.id });

      return res.status(200).json({
        status: "success",
        message: "Tạo tài khoản thành công.",
        data: newUserSellers,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Lỗi truy vấn dữ liệu.",
      });
    }
  }
}

module.exports = new UserController();
