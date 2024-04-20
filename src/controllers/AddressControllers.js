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
}
module.exports = new AddressController();
