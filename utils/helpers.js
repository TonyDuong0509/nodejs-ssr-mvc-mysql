const numeral = require("numeral");
require("numeral/locales/vi");
numeral.locale("vi");

const slugify = require("slugify");

exports.formatMoney = (money) => {
  return numeral(money).format("0,0");
};

exports.getCurrentRoute = (path) => {
  path = path.startsWith("/") ? path.slice(1) : path;
  if (path === "") {
    return "home";
  }
  if (path === "san-pham.html") {
    return "product";
  }
  if (path.match(/^san-pham/)) {
    return "productDetails";
  }
  if (path === "chinh-sach-doi-tra.html") {
    return "return";
  }
  if (path === "chinh-sach-thanh-toan.html") {
    return "payment";
  }
  if (path === "chinh-sach-giao-hang.html") {
    return "delivery";
  }
  if (path === "lien-he.html") {
    return "contact";
  }
  if (path === "thong-tin-tai-khoan.html") {
    return "show";
  }
  if (path === "dia-chi-giao-hang-mac-dinh.html") {
    return "shippingDefault";
  }
  if (path === "don-hang-cua-toi.html") {
    return "orders";
  }
  if (path.match(/^chi-tiet-don-hang-/)) {
    return "orderDetail ";
  }
};

exports.getCategoryRoute = (category) => {
  const slug = slugify(category.name, { lower: true });
  return `/danh-muc/${slug}/c${category.id}.html`;
};

exports.getProductDetails = (product) => {
  const slug = slugify(product.name, { lower: true });
  return `/san-pham/${slug}-${product.id}.html`;
};

exports.getOrderDetails = (order) => {
  return `/chi-tiet-don-hang-${order.id}.html`;
};

exports.sendEmail = async (to, subject, content) => {
  const nodemailer = require("nodemailer");

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: "haodevblog@gmail.com",
      pass: "cxjk cjcx xkgw xyvn",
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: "haodevblog@gmail.com", // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    html: content, // html body
  });
};
