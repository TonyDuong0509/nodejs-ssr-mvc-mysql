const bcrypt = require("bcrypt");
const customerModel = require("./../models/Customer");
const orderModel = require("./../models/Order");

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
    const email = req.session.email;
    const customer = await customerModel.findEmail(email);
    const orders = await orderModel.getByCustomerId(customer.id);
    for (let i = 0; i <= orders.length - 1; i++) {
      orders[i].orderItems = await orders[i].getOrderItems();
      for (let j = 0; j <= orders[i].orderItems.length - 1; j++) {
        orders[i].orderItems[j].product = await orders[i].orderItems[
          j
        ].getProduct();
      }
      orders[i].status = await orders[i].getStatus();
    }
    res.render("customer/orders", { orders });
  };

  static orderDetail = async (req, res) => {
    const { id } = req.params;
    const order = await orderModel.find(id);
    order.orderItems = await order.getOrderItems();
    for (let i = 0; i <= order.orderItems.length - 1; i++) {
      order.orderItems[i].product = await order.orderItems[i].getProduct();
    }
    order.total_price = await order.getSubTotalPrice();

    const shippingWard = await order.getShippingWard();
    const shippingDistrict = await shippingWard.getDistrict();
    const shippingProvince = await shippingDistrict.getProvince();
    res.render("customer/orderDetail", {
      order,
      shippingWard,
      shippingDistrict,
      shippingProvince,
    });
  };

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
