const Client = require("../models/client_model.js");
const fs = require("fs");

module.exports.createClient = async (req, res, next) => {
  let { name, number, from } = req.body;

  const Client = new Client({
    name,
    number,
    from,
  });

  Client.save()
    .then((_) => {
      res.status(200).json({
        message: "Client created successfully !!",
      });
    })
    .catch((error) => {
      console.log(error.message);
      return res.status(500).json({
        message: "Client not created",
      });
    });
};

module.exports.getAllClients = (req, res, next) => {
  Client.find()
    .then((results) => {
      res.status(200).json({ message: results });
    })
    .catch((error) => {
      console.log(error.message);

      res.status(500).json({ message: error.message });
    });
};

module.exports.getOneClient = (req, res, next) => {
  Client.find({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({ message: result });
    })
    .catch((error) => {
      console.log(error.message);

      res.status(500).json({ message: error.message });
    });
};

module.exports.updateOneClient = (req, res, next) => {
  Client.findOneAndUpdate(
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

module.exports.deleteOneClient = (req, res, next) => {
  Client.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({ message: result });
    })
    .catch((error) => {
      console.log(error.message);

      res.status(500).json({ message: error.message });
    });
};
