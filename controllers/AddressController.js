const Ward = require("./../models/Ward");
const District = require("./../models/District");

class AddressController {
  static districts = async (req, res) => {
    const provinceId = req.query.province_id;
    const districts = await District.getByProvinceId(provinceId);
    res.end(JSON.stringify(districts));
  };

  static wards = async (req, res) => {
    const districtId = req.query.district_id;
    const wards = await Ward.getByDistrictId(districtId);
    res.end(JSON.stringify(wards));
  };
}

module.exports = AddressController;
