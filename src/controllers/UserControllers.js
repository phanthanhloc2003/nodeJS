const Customers = require("../models/CustomersModels");
const Sellers = require("../models/SellersModels");
const Users = require("../models/userModels");
const bcrypt = require("bcryptjs");
const genneraAccessToken = require("../JwtService/accessToken");
const genneraRefreshToken = require("../JwtService/refreshToken");
const updateAccsessToken = require("../JwtService/updateAccsessToken");
const Admin = require("../models/AdminModels");

class UserController {
  //resgister user customers
  async registerUserCustomers(req, res) {
    const { email, password, setPassword } = req.body;
    if (!email || !password || !setPassword) {
      return res.status(400).json({
        message: "Please complete all information.",
      });
    }
    if (password !== setPassword) {
      return res.status(400).json({
        message: "passwords are not the same",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "invalid phone number.",
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
          message: "Email does not exist",
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
  //  resgister  user selles
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
  //login user
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
        role: user.role,
      });
      const refreshToken = await genneraRefreshToken({
        id: user.id,
        role: user.role,
      });

      return res.status(200).json({
        status: "đăng nhập thành công",
        data: { accsessToken, refreshToken },
      });
    } catch (error) {
      return res.status(404).json({
        status: "error",
        message: error,
      });
    }
  }
  //resister Admin
  async registerAdmin(req, res) {
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
        role: "admin",
      });
      await Customers.create({ user_id: newUserSellers.id });
      await Sellers.create({ user_id: newUserSellers.id });
      await Admin.create({ user_id: newUserSellers.id });

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
  // upgrade User Sellers
  async upgradeUserSellers(req, res) {
    const { shop_name, shop_category, shop_address } = req.body;
    const userId = req.userId;
    if (!shop_name || !shop_category || !shop_address || !userId) {
      return res.status(400).json({
        status: "error",
        message: "vui lòng nhập đủ thông tin",
      });
    }
    try {
      const userSellers = await Sellers.create({
        user_id: userId,
        shop_name: shop_name,
        shop_category: shop_category,
        shop_address: shop_address,
      });
      await Users.update(
        { role: "sellers" },
        {
          where: {
            id: userId,
          },
        }
      );
      return res.status(200).json({
        status: "success",
        message: "đăng ký thành công Sellers ",
        data: userSellers,
      });
    } catch (error) {
      return res.status(404).json({
        status: "error",
        message: error.message,
      });
    }
  }
  //update accsessToken
  async accsessToken(req, res) {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(404).json({
        status: "error",
        message: "không nhận đc refreshToken ",
      });
    }
    try {
      const accessToken = await updateAccsessToken(refreshToken);
      return res.status(200).json({
        status: "success",
        message: "cập nhập accsessToken thành công",
        data: accessToken,
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        message: error.message,
      });
    }
  }
  //delete user
  async deleteUser(req, res) {
    const userId = req.body.id;
    if (!userId) {
      res.status(400).json({
        status: "error",
        message: "no userID",
      });
    }

    try {
      const userAdmin = await Users.findByPk(userId);
      if (userAdmin.role === "admin") {
        return res.status(500).json({
          status: "error",
          message: "You cannot delete admin users",
        });
      }
      const userDelete = await Users.destroy({
        where: {
          id: userId,
        },
      });
      if (userDelete === 0) {
        return res.status(404).json({
          status: "error",
          message: "not found user",
        });
      }
      return res.json({
        status: "success",
        message: `User with ID ${userId} deleted successfully.`,
      });
    } catch (error) {
      return res.status(404).json({
        status: "error",
        message: error.message,
      });
    }
  }
  //update user
  async updateUser(req, res) {
    const { name, nickname, gender, dateOfBirth } = req.body;

    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({
        status: "error",
        message: "no tokens",
      });
    }
    try {
      await Customers.update(
        {
          name: name,
          nickname: nickname,
          gender: gender,
          dateOfBirth: dateOfBirth,
        },
        {
          where: {
            user_id: userId,
          },
        }
      );
      const userUpdate = await Customers.findByPk(userId);
      return res.status(200).json({
        status: "success",
        data: userUpdate,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
  //update name seller
  async updateuserSellers(req, res){
    const {shop_name, shop_address,phone,avata} = req.body
    const userSellerid = req.userId
    if (!userSellerid) {
      return res.status(400).json({
        status: "error",
        message: "no tokens",
      });
    }
   try {
    await Sellers.update(
      {
        shop_name: shop_name,
        shop_address: shop_address,
        phone: phone,
       avata:avata
      },
      {
        where: {
          user_id: userSellerid,
        },
      }
    );
   const userSellers =  await Sellers.findByPk(userSellerid);
   return res.status(200).json({
    status: "succsess",
    data: userSellers
   })
   } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
   }
  }

}

module.exports = new UserController();
