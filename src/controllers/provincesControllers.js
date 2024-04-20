const fs = require("fs");
const path = require("path");

class ProvincesControllers {
  // get provinces
  async provincesAll(req, res) {
    try {
      const filePath = path.join(__dirname, "../config/provinces.json");
      const data = fs.readFileSync(filePath, "utf8");
      const jsonData = JSON.parse(data);
      return res.status(200).json({
        status: "success",
        data: jsonData.data.data,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
  async provincesDistricts(req, res) {
    const idProvinces = req.params.id;
    if (!idProvinces) {
      return res.status(400).json({
        status: "error",
        message: "no params id",
      });
    }
    try {
      const filePath = path.join(__dirname, "../config/districts.json");
      const data = fs.readFileSync(filePath, "utf8");
      const jsonData = JSON.parse(data);
      const foundDistricts = jsonData.data.data.filter(
        (provinces) => provinces.parent_code === idProvinces
      );
      if (foundDistricts.length === 0) {
        return res.status(400).json({
          status: "error",
          message: "not found",
        });
      }

      return res.status(200).json({
        status: "succsess",
        data: foundDistricts,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async provincesWards(req, res) {
    const idDistricts = req.params.id;
    if (!idDistricts) {
      return res.status(400).json({
        status: "error",
        message: "no params id",
      });
    }
    try {
      const filePath = path.join(__dirname, "../config/wards.json");
      const data = fs.readFileSync(filePath, "utf8");
      const jsonData = JSON.parse(data);
      const foundWards = jsonData.data.data.filter(
        (districts) => districts.parent_code === idDistricts
      );
      if (foundWards.length === 0) {
        return res.status(400).json({
          status: "error",
          message: "not found",
        });
      }
      return res.status(200).json({
        status: "succsess",
        data: foundWards,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

module.exports = new ProvincesControllers();
