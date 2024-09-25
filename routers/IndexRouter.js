const express = require("express");
const router = express.Router();

const HomeController = require("./../controllers/HomeController");
const ProductController = require("./../controllers/ProductController");
const PolicyController = require("./../controllers/PolicyController");
const ContactController = require("./../controllers/ContactController");
const AuthController = require("./../controllers/AuthController");
const CustomerController = require("../controllers/CustomerController");

router.get("/", HomeController.index);
router.get("/san-pham.html", ProductController.index);
router.get("/danh-muc/:slug/c:category_id.html", ProductController.index);
router.get("/san-pham/:slug.html", ProductController.details);
router.get("/chinh-sach-doi-tra.html", PolicyController.return);
router.get("/chinh-sach-thanh-toan.html", PolicyController.payment);
router.get("/chinh-sach-giao-hang.html", PolicyController.delivery);
router.get("/lien-he.html", ContactController.form);
router.post("/contact/sendEmail", ContactController.sendEmail);

router.post("/login", AuthController.login);
router.get("/logout", AuthController.logout);

router.get("/thong-tin-tai-khoan.html", CustomerController.show);
router.get(
  "/dia-chi-giao-hang-mac-dinh.html",
  CustomerController.shippingDefault
);
router.get("/don-hang-cua-toi.html", CustomerController.orders);

router.post("/customer/updateInfo", CustomerController.updateInfo);

module.exports = router;
