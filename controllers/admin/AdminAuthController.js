const Customer = require("./../../models/Customer");
const bcrypt = require("bcrypt");

class AdminAuthController {
  static loginPage = async (req, res) => {
    res.render("admin/auth/login", {
      layout: false,
    });
  };

  static adminLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await Customer.findEmail(email);
    if (!user) {
      req.session.message_error = `Lỗi: Không tồn tại Email ${email}, vui lòng thử lại`;
      req.session.save(() => res.redirect("/admin/login"));
      return;
    }
    if (!bcrypt.compareSync(password, user.password)) {
      req.session.message_error = `Lỗi: Mật khẩu không chính xác, vui lòng thử lại`;
      req.session.save(() => res.redirect("/admin/login"));
      return;
    }
    if (!user.is_active) {
      req.session.message_error = `Lỗi: Tài khoản chưa kích hoạt, vui lòng kích hoạt tài khoản`;
      req.session.save(() => res.redirect("/admin/login"));
      return;
    }

    req.session.admin_email = user.email;
    req.session.admin_name = user.name;
    req.session.save(() => res.redirect("/admin"));
    return;
  };
}

module.exports = AdminAuthController;
