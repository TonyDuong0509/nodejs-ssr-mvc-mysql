const bcrypt = require("bcrypt");
const customerModel = require("./../models/Customer");

class AuthController {
  static login = async (req, res) => {
    const { email, password } = req.body;
    const user = await customerModel.findEmail(email);
    if (!user) {
      req.session.message_error = `Lỗi: Không tồn tại Email ${email}, vui lòng thử lại`;
      req.session.save(() => res.redirect("/"));
      return;
    }
    if (!bcrypt.compareSync(password, user.password)) {
      req.session.message_error = `Lỗi: Mật khẩu không chính xác, vui lòng thử lại`;
      req.session.save(() => res.redirect("/"));
      return;
    }
    if (!user.is_active) {
      req.session.message_error = `Lỗi: Tài khoản chưa kích hoạt, vui lòng kích hoạt tài khoản`;
      req.session.save(() => res.redirect("/"));
      return;
    }

    req.session.email = user.email;
    req.session.name = user.name;
    req.session.save(() => res.redirect("/thong-tin-tai-khoan.html"));
    return;
  };

  static logout = async (req, res) => {
    req.session.destroy(() => res.redirect("/"));
  };
}

module.exports = AuthController;
