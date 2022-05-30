const Social = require("../models/social_model.js");

module.exports.createSocial = async (req, res, next) => {
  let { id, name } = req.body;

  const social = new Social({
    id,
    name,
  });

  social
    .save()
    .then((_) => {
      res.status(200).json({
        message: "Social created successfully !!",
      });
    })
    .catch((error) => {
      console.log(error.message);
      return res.status(500).json({
        message: "Social not created",
      });
    });
};

module.exports.getAllSocials = (req, res, next) => {
  Social.find()
    .then((results) => {
      res.status(200).json({ message: results });
    })
    .catch((error) => {
      console.log(error.message);

      res.status(500).json({ message: error.message });
    });
};

module.exports.getOneSocial = (req, res, next) => {
  Social.findOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({ message: result });
    })
    .catch((error) => {
      console.log(error.message);

      res.status(500).json({ message: error.message });
    });
};

module.exports.updateOneSocial = (req, res, next) => {
  Social.findOneAndUpdate(
    { _id: req.params.id },
    { ...req.body },
    { new: true }
  )
    .then((result) => {
      res.status(200).json({ message: result });
    })
    .catch((error) => {
      console.log(error.message);

      res.status(500).json({ message: error.message });
    });
};

module.exports.deleteOneSocial = (req, res, next) => {
  Social.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({ message: result });
    })
    .catch((error) => {
      console.log(error.message);

      res.status(500).json({ message: error.message });
    });
};
