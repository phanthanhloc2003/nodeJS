const Customers = require("../models/CustomersModels");
const Sellers = require("../models/SellersModels");
const Users = require("../models/userModels");
const bcrypt = require("bcryptjs");
const genneraAccessToken = require('../JwtService/accessToken');
const genneraRefreshToken = require("../JwtService/refreshToken");

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
        status: "error",
        message: "Vui lòng điền đầy đủ thông tin.",
      });
    }
    if (password !== setPassword) {
      return res.status(400).json({
        status: "error",
        message: "Mật khẩu không khớp.",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: "error",
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
          status: "error",
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
        status: "error",
        message: "Lỗi truy vấn dữ liệu.",
      });
    }
  }

  async loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Vui lòng điền đầy đủ thông tin.",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: "error",
        message: "Địa chỉ email không hợp lệ.",
      });
    }

    try {
      const user = await Users.findOne({
        where: {
          email: email,
        },
      });
      if (user === null) {
        return res.status(550).json({
          status: "error",
          message: "email ko hợp lệ vui lòng nhập lại",
        });
      }
      const comparePasword = bcrypt.compareSync(password, user.password);
      if (!comparePasword) {
        return res.status(550).json({
          status: "error",
          message: "mật khẩu không đúng vui lòng nhập lại",
        });
      }
       const accsessToken = await genneraAccessToken({
        id: user.id,
        role: user.role
       })
       const refreshToken = await genneraRefreshToken({
        id: user.id,
        role: user.role
       })
     
      return res.status(200).json({
        status: "đăng nhập thành công",
        data:{ accsessToken, refreshToken}
      });
    } catch (error) {
      return res.status(404).json({
        status: "error",
        message: error
      })
    }
  }
}

module.exports = new UserController();
