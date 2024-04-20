const Address = require("../models/AddressModels");

class AddressController {
  // create address
  async createAddress(req, res) {
    const idUser = req.userId;
    const {
      region,
      region_id,
      district,
      district_id,
      ward,
      ward_id,
      full_Name,
      telephone,
      street,
      is_default,
    } = req.body;
    const phoneRegex = /^\d{10,12}$/;
    if (!phoneRegex.test(telephone)) {
      return res.status(400).json({
        status: "error",
        message: "invalid phone number",
      });
    }
    try {
      if (is_default === 1) {
        await Address.update(
          { is_default: 0 },
          {
            where: {
              user_id: idUser,
            },
          }
        );
      }
      const data = await Address.create({
        user_id: idUser,
        region: region,
        region_id: region_id,
        district: district,
        district_id: district_id,
        ward: ward,
        ward_id: ward_id,
        full_Name: full_Name,
        telephone: telephone,
        street: street,
        is_default: is_default,
      });
      return res.status(200).json({
        status: "succsess",
        data: data,
      });
    } catch (error) {
      return res.json({
        status: "error",
        message: error,
      });
    }
  }
  //update address
  async updateAdderss(req, res) {
    const idUser = req.userId;
    const idAddress = req.params.id;
    const {
      region,
      region_id,
      district,
      district_id,
      ward,
      ward_id,
      full_Name,
      telephone,
      street,
      is_default,
    } = req.body;
    const phoneRegex = /^\d{10,12}$/;
    if (!phoneRegex.test(telephone)) {
      return res.status(400).json({
        status: "error",
        message: "invalid phone number",
      });
    }
    if (!idAddress) {
      return res.status(400).json({
        status: "error",
        message: "not found id",
      });
    }
    try {
      if (is_default === 1) {
        await Address.update(
          { is_default: 0 },
          {
            where: {
              user_id: idUser,
            },
          }
        );
      }
      await Address.update(
        {
          region: region,
          region_id: region_id,
          district: district,
          district_id: district_id,
          ward: ward,
          ward_id: ward_id,
          full_Name: full_Name,
          telephone: telephone,
          street: street,
          is_default: is_default,
        },
        {
          where: {
            id: idAddress,
          },
        }
      );
      const data = await Address.findOne({
        where: {
          id: idAddress,
        },
      });
      return res.status(200).json({
        status: "succsess",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
  // delete address
  async deleteAddress(req, res) {
    const idAddress = req.params.id;
    try {
      const ischeck = await Address.findOne({
        where: {
          id: idAddress,
        },
      });
      if (!ischeck) {
        return res.status(400).json({
          status: "error",
          message: "address not found",
        });
      }

      if (ischeck.is_default === true) {
        return res.status(400).json({
          status: "error",
          message: "Default address cannot be deleted",
        });
      }
      const data = await Address.destroy({
        where: {
          id: idAddress,
        },
      });
      return res.status(200).json({
        status: "succsess",
        data: ischeck,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error ",
        message: error.message,
      });
    }
  }
}
module.exports = new AddressController();
