const HeroSection = require("../models/heroSection_model.js");
const cloudinary = require("../cloudinary_config");
const fs = require("fs");

module.exports.createHeroSection = async (req, res, next) => {
  let { text } = req.body;
  try {
    const uploader = async (path) =>
      await cloudinary.uploads(path, `DevStyle/HeroSection`);
    const { path } = req.file;
    const newPath = await uploader(path);
    fs.unlinkSync(path);
    if (!newPath) {
      return res.status(500).json({ message: "sorry an error occur" });
    }
    const heroSection = new HeroSection({
      text,
      image: newPath,
    });

    heroSection
      .save()
      .then((_) => {
        res.status(200).json({
          message: "HeroSection created successfully !!",
        });
      })
      .catch((error) => {
        console.log(error.message);
        return res.status(500).json({
          message: "HeroSection not created",
        });
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "an error occur !",
    });
  }
};

module.exports.getAllHeroSections = (req, res, next) => {
  HeroSection.find()
    .then((results) => {
      res.status(200).json({ message: results });
    })
    .catch((error) => {
      console.log(error.message);

      res.status(500).json({ message: error.message });
    });
};

module.exports.getOneHeroSection = (req, res, next) => {
  HeroSection.findOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({ message: result });
    })
    .catch((error) => {
      console.log(error.message);

      res.status(500).json({ message: error.message });
    });
};

module.exports.updateOneHeroSection = (req, res, next) => {
  HeroSection.findOneAndUpdate(
    { _id: req.params.id },
    { ...req.body }
    // { new: true }
  )
    .then((result) => {
      res.status(200).json({ message: "Updated" });
    })
    .catch((error) => {
      console.log(error.message);

      res.status(500).json({ message: error.message });
    });
};

module.exports.deleteOneHeroSection = (req, res, next) => {
  HeroSection.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({ message: "Deleted" });
    })
    .catch((error) => {
      console.log(error.message);

      res.status(500).json({ message: error.message });
    });
};

module.exports.updateHeroSectionImage = async (req, res, next) => {
  let id = req.params.id;
  const uploader = async (path) =>
    await cloudinary.uploads(path, `DevStyle/HeroSection`);
  const { path } = req.file;
  const newPath = await uploader(path);
  fs.unlinkSync(path);
  if (!newPath) res.status(500).json({ message: "sorry an error occured" });
  await HeroSection.findOneAndUpdate(
    { _id: id },
    {
      image: newPath,
      ...req.body,
    }
    // { new: true }
  )
    .then((result) => {
      res.status(200).json({
        message: `HeroSection Image was updated !`,
      });
    })
    .catch((error) =>
      res.status(404).json({ message: "HeroSection does not exist" })
    );
};
