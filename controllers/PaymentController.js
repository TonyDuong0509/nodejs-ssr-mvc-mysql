const Cart = require("./../models/Cart");
const Customer = require("./../models/Customer");
const Provinces = require("./../models/Province");
const District = require("./../models/District");
const Ward = require("./../models/Ward");
const Transport = require("./../models/Transport");
const Order = require("./../models/Order");
const OrderItem = require("./../models/OrderItem");

class PaymentController {
  static checkout = async (req, res) => {
    const cart = new Cart(req.cookies.cart);
    const email = req.session.email || "khachvanglai@gmail.com";
    const customer = await Customer.findEmail(email);
    let shippingFee = 0;
    const provinces = await Provinces.all();
    const selectedWardId = customer.ward_id;
    let districts = [];
    let wards = [];
    let selectedDistrictId = "";
    let selectedProvinceId = "";
    if (selectedWardId) {
      const selectedWard = await Ward.find(selectedWardId);
      selectedDistrictId = selectedWard.district_id;
      wards = await Ward.getByDistrictId(selectedDistrictId);

      const selectedDistrict = await District.find(selectedDistrictId);
      selectedProvinceId = selectedDistrict.province_id;
      districts = await District.getByProvinceId(selectedProvinceId);

      const transport = await Transport.getByProvinceId(selectedProvinceId);
      shippingFee = transport.price;
    }
    res.render("payment/checkout", {
      cart,
      shippingFee,
      customer,
      provinces,
      districts,
      wards,
      selectedWardId,
      selectedDistrictId,
      selectedProvinceId,
    });
  };

  static order = async (req, res) => {
    const cart = new Cart(req.cookies.cart);
    const email = req.session.email || "khachvanglai@gmail.com";
    const customer = await Customer.findEmail(email);

    const selectedWardId = customer.ward_id;
    let selectedProvinceId = "";
    let selectedDistrictId = "";
    let shippingFee = 0;
    if (selectedWardId) {
      const selectedWard = await Ward.find(selectedWardId);
      selectedDistrictId = selectedWard.district_id;

      const selectedDistrict = await District.find(selectedDistrictId);
      selectedProvinceId = selectedDistrict.province_id;

      const transport = await Transport.getByProvinceId(selectedProvinceId);
      shippingFee = transport.price;
    }

    const data = {
      created_date: req.app.locals.helpers.getCurrentDateTime(),
      order_status_id: 1,
      staff_id: null,
      customer_id: customer.id,
      shipping_fullname: req.body.fullname,
      shipping_mobile: req.body.mobile,
      payment_method: req.body.payment_method,
      shipping_ward_id: req.body.ward,
      shipping_housenumber_street: req.body.address,
      shipping_fee: shippingFee,
      delivered_date: req.app.locals.helpers.getThreeLaterDateTime(),
    };

    const orderId = await Order.save(data);

    for (const product_id in cart.items) {
      const item = cart.items[product_id];
      const data = {
        product_id: product_id,
        order_id: orderId,
        qty: item.qty,
        unit_price: item.unit_price,
        total_price: item.total_price,
      };
      await OrderItem.save(data);
    }

    const emptyCart = new Cart();
    const stringCart = emptyCart.toString();
    res.cookie("cart", stringCart, {
      maxAge: 1000 * 60 * 60,
      httpOnly: false,
    });

    req.session.message_success = "Đơn hàng đã được tạo thành côngcông";
    req.session.save(() => res.redirect("/don-hang-cua-toi.html"));
  };
}

module.exports = PaymentController;
