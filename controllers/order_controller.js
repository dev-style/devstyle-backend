const Order = require("../models/order_model.js");

module.exports.createOrder = async (req, res, next) => {
  let { number, description } = req.body;

  const NewOrder = new Order({
    number,
    description,
  });

  NewOrder.save()
    .then((_) => {
      res.status(200).json({
        message: "Order created successfully !!",
      });
    })
    .catch((error) => {
      console.log(error.message);
      return res.status(500).json({
        message: "Order not created",
      });
    });
};

module.exports.getAllOrders = (req, res, next) => {
  Order.find()
    .then((results) => {
      res.status(200).json({ message: results });
    })
    .catch((error) => {
      console.log(error.message);

      res.status(500).json({ message: error.message });
    });
};

module.exports.getOneOrder = (req, res, next) => {
  Order.findOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({ message: result });
    })
    .catch((error) => {
      console.log(error.message);

      res.status(500).json({ message: error.message });
    });
};

module.exports.updateOneOrder = (req, res, next) => {
  Order.findOneAndUpdate(
    { _id: req.params.id },
    { ...req.body }
    // { new: true },
  )
    .then((result) => {
      res.status(200).json({ message: result });
    })
    .catch((error) => {
      console.log(error.message);

      res.status(500).json({ message: error.message });
    });
};

module.exports.deleteOneOrder = (req, res, next) => {
  Order.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({ message: result });
    })
    .catch((error) => {
      console.log(error.message);

      res.status(500).json({ message: error.message });
    });
};
