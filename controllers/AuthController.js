const bcrypt = require("bcrypt");
const customerModel = require("./../models/Customer");

class AuthController {
  //Trang liên hệ
  static login = async (req, res) => {
    const { email, password } = req.body;
    const user = await customerModel.findEmail(email);
    if (!user) {
      req.session.message_error = `Lỗi: Không tồn tại Email ${email}, vui lòng thử lại`;
      req.session.save(() => res.redirect("/"));
    }
    if (!bcrypt.compareSync(password, user.password)) {
      req.session.message_error = `Lỗi: Mật khẩu không chính xác, vui lòng thử lại`;
      req.session.save(() => res.redirect("/"));
    }
  };
}

module.exports = AuthController;
