const Partner = require("../models/partner_model.js");
const cloudinary = require("../cloudinary_config");
const fs = require("fs");

module.exports.createPartner = async (req, res, next) => {
  let urls = [];
  let { name, link } = req.body;
  try {
    const uploader = async (path) =>
      await cloudinary.uploads(path, `DevStyle/Partners`);
    for (const file of req.files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    if (urls.length == 0) {
      return res.status(500).json({ message: "sorry an error occur" });
    }
    const partner = new Partner({
      name,
      link,
      logoColor: urls[0] ?? "",
      logoWhite: urls[1] ?? "",
      logoBlack: urls[2] ?? "",
    });

    partner
      .save()
      .then((_) => {
        res.status(200).json({
          message: "Partner created successfully !!",
        });
      })
      .catch((error) => {
        console.log(error.message);
        return res.status(500).json({
          message: "Partner not created",
        });
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "an error occur !",
    });
  }
};

module.exports.getAllPartners = (req, res, next) => {
  Partner.find()
    .then((results) => {
      res.status(200).json({ message: results });
    })
    .catch((error) => {
      console.log(error.message);

      res.status(500).json({ message: error.message });
    });
};

module.exports.getOnePartner = (req, res, next) => {
  Partner.findOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({ message: result });
    })
    .catch((error) => {
      console.log(error.message);

      res.status(500).json({ message: error.message });
    });
};

module.exports.updateOnePartner = (req, res, next) => {
  Partner.findOneAndUpdate(
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

module.exports.deleteOnePartner = (req, res, next) => {
  Partner.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({ message: result });
    })
    .catch((error) => {
      console.log(error.message);

      res.status(500).json({ message: error.message });
    });
};

module.exports.updatePartnerImage = async (req, res, next) => {
  let id = req.params.id;
  let urls = [];
  const uploader = async (path) =>
    await cloudinary.uploads(path, `DevStyle/Partners`);
  for (const file of req.files) {
    const { path } = file;
    const newPath = await uploader(path);
    urls.push(newPath);
    fs.unlinkSync(path);
  }
  if (urls.length == 0) {
    console.log(urls);
    return res.status(500).json({ message: "sorry an error occured" });
  }
  await Partner.findOneAndUpdate(
    { _id: id },
    {
      logoColor: urls[0] ?? "",
      logoWhite: urls[1] ?? "",
      logoBlack: urls[2] ?? "",
      ...req.body,
    }
    // { new: true }
  )
    .then((result) => {
      res.status(200).json({
        message: `Partner Image was updated !`,
      });
    })
    .catch((error) =>
      res.status(404).json({ message: "Partner does not exist" })
    );
};
