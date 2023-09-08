const Ambassador = require("../models/ambassador_model.js");
const cloudinary = require("../cloudinary_config");
const fs = require("fs");

module.exports.createAmbassador = async (req, res, next) => {
  let { name, social, colors } = req.body;
  social = JSON.parse(social);
  try {
    const uploader = async (path) =>
      await cloudinary.uploads(path, `DevStyle/Ambassador`);
    const { path } = req.file;
    const newPath = await uploader(path);
    fs.unlinkSync(path);
    if (!newPath) {
      return res.status(500).json({ message: "sorry an error occur" });
    }
    const ambassador = new Ambassador({
      name,
      social,
      colors,
      image: newPath,
    });

    ambassador
      .save()
      .then((_) => {
        res.status(200).json({
          message: "Ambassador created successfully !!",
        });
      })
      .catch((error) => {
        console.log(error.message);
        return res.status(500).json({
          message: "Ambassador not created",
        });
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "an error occur !",
    });
  }
};

module.exports.getAllAmbassadors = (req, res, next) => {
  Ambassador.find({ show: true })
    .then((results) => {
      res.status(200).json({ message: results });
    })
    .catch((error) => {
      console.log(error.message);

      res.status(500).json({ message: error.message });
    });
};

module.exports.getOneAmbassador = (req, res, next) => {
  Ambassador.findOne({ _id: req.params.id, show: true })
    .then((result) => {
      res.status(200).json({ message: result });
    })
    .catch((error) => {
      console.log(error.message);

      res.status(500).json({ message: error.message });
    });
};

module.exports.updateOneAmbassador = (req, res, next) => {
  Ambassador.findOneAndUpdate(
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

module.exports.deleteOneAmbassador = (req, res, next) => {
  Ambassador.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({ message: result });
    })
    .catch((error) => {
      console.log(error.message);

      res.status(500).json({ message: error.message });
    });
};

module.exports.updateAmbassadorImage = async (req, res, next) => {
  let id = req.params.id;
  const uploader = async (path) =>
    await cloudinary.uploads(path, `DevStyle/Ambassador`);
  const { path } = req.file;
  const newPath = await uploader(path);
  fs.unlinkSync(path);
  if (!newPath) res.status(500).json({ message: "sorry an error occured" });
  await Ambassador.findOneAndUpdate(
    { _id: id },
    {
      image: newPath,
      ...req.body,
    }
  )
    .then((result) => {
      res.status(200).json({
        message: `Ambassador Image was updated !`,
      });
    })
    .catch((error) =>
      res.status(404).json({ message: "Ambassador does not exist" })
    );
};
