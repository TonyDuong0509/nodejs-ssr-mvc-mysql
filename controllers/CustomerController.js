const bcrypt = require("bcrypt");
const customerModel = require("./../models/Customer");

class CustomerController {
  static show = async (req, res) => {
    const email = req.session.email;
    const customer = await customerModel.findEmail(email);
    res.render("customer/show", {
      customer,
    });
  };

  static shippingDefault = async (req, res) => {
    res.render("customer/shippingDefault");
  };

  static orders = async (req, res) => {
    res.render("customer/orders");
  };

  static orderDetail = async (req, res) => {};

  static updateInfo = async (req, res) => {
    const email = req.session.email;
    const customer = await customerModel.findEmail(email);
    customer.name = req.body.fullname;
    customer.mobile = req.body.mobile;

    if (req.body.current_password && req.body.password) {
      if (!bcrypt.compareSync(req.body.current_password, customer.password)) {
        req.session.message_error = "Mật khẩu hiện tại không đúng";
        req.session.save(() => res.redirect("/thong-tin-tai-khoan.html"));
        return;
      }
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
      customer.password = hashedPassword;
    }

    await customer.update();
    req.session.message_success = "Đã cập nhật thông tin thành công";
    req.session.save(() => res.redirect("/thong-tin-tai-khoan.html"));
    return;
  };
}

module.exports = CustomerController;
