const express = require("express");
const router = express.Router();

const AdminHomeController = require("./../controllers/admin/AdminHomeController");
const AdminAuthController = require("../controllers/admin/AdminAuthController");

router.get("/", AdminHomeController.index);
router.get("/login", AdminAuthController.loginPage);
router.post("/admin-login", AdminAuthController.adminLogin);
router.get("/create-category", AdminHomeController.createCategoryPage);
router.post("/create-category", AdminHomeController.createCategory);

module.exports = router;
