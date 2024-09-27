const customerModel = require("./../models/Customer");
const Cart = require("./../models/Cart");

class CartController {
  static add = async (req, res) => {
    const currentCartData = req.cookies.cart;
    const cart = new Cart(currentCartData);
    const productId = req.query.product_id;
    const qty = req.query.qty;
    await cart.addProduct(productId, qty);
    const stringCart = cart.toString();
    res.cookie("cart", stringCart, {
      maxAge: 1000 * 60 * 60 * 24 * 3,
      httpOnly: false,
    });
    res.end("");
  };

  static update = async (req, res) => {
    const currentCartData = req.cookies.cart;
    const cart = new Cart(currentCartData);
    const productId = req.query.product_id;
    const qty = req.query.qty;
    cart.deleteProduct(productId);
    await cart.addProduct(productId, qty);
    const stringCart = cart.toString();
    res.cookie("cart", stringCart, {
      maxAge: 1000 * 60 * 60 * 24 * 3,
      httpOnly: false,
    });
    res.end("");
  };

  static delete = async (req, res) => {
    const currentCartData = req.cookies.cart;
    const cart = new Cart(currentCartData);
    const productId = req.query.product_id;
    const qty = req.query.qty;
    cart.deleteProduct(productId);
    const stringCart = cart.toString();
    res.cookie("cart", stringCart, {
      maxAge: 1000 * 60 * 60 * 24 * 3,
      httpOnly: false,
    });
    res.end("");
  };
}

module.exports = CartController;
