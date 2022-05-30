const Size = require("../models/size_model.js");

module.exports.createSize = async (req, res, next) => {
  let { size } = req.body;

  const NewSize = new Size({
    size,
  });

  NewSize.save()
    .then((_) => {
      res.status(200).json({
        message: "Size created successfully !!",
      });
    })
    .catch((error) => {
      console.log(error.message);
      return res.status(500).json({
        message: "Size not created",
      });
    });
};

module.exports.getAllSizes = (req, res, next) => {
  Size.find()
    .then((results) => {
      res.status(200).json({ message: results });
    })
    .catch((error) => {
      console.log(error.message);

      res.status(500).json({ message: error.message });
    });
};

module.exports.getOneSize = (req, res, next) => {
  Size.findOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({ message: result });
    })
    .catch((error) => {
      console.log(error.message);

      res.status(500).json({ message: error.message });
    });
};

module.exports.updateOneSize = (req, res, next) => {
  Size.findOneAndUpdate(
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

module.exports.deleteOneSize = (req, res, next) => {
  Size.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({ message: result });
    })
    .catch((error) => {
      console.log(error.message);

      res.status(500).json({ message: error.message });
    });
};
