class ContactController {
  //Trang liên hệ
  static form = async (req, res) => {
    res.render("contact/form", {});
  };

  //chính sách thanh toán
  static sendEmail = async (req, res) => {
    const { name, email, mobile, content } = req.body;
    const to = "haodevblog@gmail.com";
    const subject = "Liên Hệ !";
    const domain = `${req.protocol}://${req.headers.host}`;
    const html = `
      Hello admin, <br>
      Dưới đây là thông tin khách hàng liên hệ, <br>
      Tên: ${name}, <br>
      Email: ${email}, <br>
      Mobile: ${mobile}, <br>
      Nội dung: ${content}, <br>
      Được gửi từ trang web - ${domain}
    `;
    req.app.locals.helpers.sendEmail(to, subject, html);
    res.end("Send Successfully");
  };
}

module.exports = ContactController;
