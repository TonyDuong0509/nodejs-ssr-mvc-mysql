class PolicyController {
  static return = async (req, res) => {
    res.render("policy/return", {});
  };

  static payment = async (req, res) => {
    res.render("policy/payment", {});
  };

  static delivery = async (req, res) => {
    res.render("policy/delivery", {});
  };
}

module.exports = PolicyController;
