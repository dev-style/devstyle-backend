const Goodie = require("../models/goodie_model.js");
const cloudinary = require("../cloudinary_config");
const fs = require("fs");

module.exports.createGoodie = async (req, res, next) => {
  let urls = [];
  let {
    name,
    slug,
    fromCollection,
    promoPercentage,
    price,
    inPromo,
    views,
    size,
    availableColors,
    backgroundColors,
    likes,
  } = req.body;
  availableColors = JSON.parse(req.body.availableColors);
  backgroundColors = JSON.parse(req.body.backgroundColors);
  size = JSON.parse(req.body.size);
  try {
    const uploader = async (path) =>
      await cloudinary.uploads(path, `DevStyle/Goodies`);
    for (const file of req.files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    if (urls.length == 0) {
      return res.status(500).json({ message: "sorry an error occur" });
    }
    const goodie = new Goodie({
      name,
      slug,
      fromCollection,
      promoPercentage,
      price,
      inPromo,
      views,
      size,
      mainImage: urls[0],
      availableColors,
      backgroundColors,
      images: urls,
      // image: url,
      // color: availableColors[i],
      // backgroundColor: backgroundColors[i],
      likes,
    });

    goodie
      .save()
      .then((_) => {
        res.status(200).json({
          message: "Goodie created successfully !!",
        });
      })
      .catch((error) => {
        console.log(error.message);
        return res.status(500).json({
          message: "Goodie not created",
        });
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "an error occur !",
    });
  }
};

module.exports.getAllGoodies = (req, res, next) => {
  Goodie.find()
    .then((results) => {
      res.status(200).json({ message: results });
    })
    .catch((error) => {
      console.log(error.message);

      res.status(500).json({ message: error.message });
    });
};

module.exports.getOneGoodie = (req, res, next) => {
  Goodie.findOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({ message: result });
    })
    .catch((error) => {
      console.log(error.message);

      res.status(500).json({ message: error.message });
    });
};

module.exports.getGoodiesOfCollection = (req, res, next) => {
  Goodie.find({ fromCollection: req.params.collectionID })
    .then((result) => {
      res.status(200).json({ message: result });
    })
    .catch((error) => {
      console.log(error.message);

      res.status(500).json({ message: error.message });
    });
};

module.exports.getHotGoodiesOfCollection = (req, res, next) => {
  Goodie.find({ fromCollection: req.params.collectionID })
    .skip(req.headers.skip)
    .sort({ views: -1, likes: -1 })
    .limit(4)
    .then((result) => {
      res.status(200).json({ message: result });
    })
    .catch((error) => {
      console.log(error.message);

      res.status(500).json({ message: error.message });
    });
};

module.exports.updateOneGoodie = (req, res, next) => {
  Goodie.findOneAndUpdate(
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

module.exports.deleteOneGoodie = (req, res, next) => {
  Goodie.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({ message: result });
    })
    .catch((error) => {
      console.log(error.message);

      res.status(500).json({ message: error.message });
    });
};

module.exports.updateGoodieImage = async (req, res, next) => {
  let id = req.params.id;

  let urls = [];
  const uploader = async (path) =>
    await cloudinary.uploads(path, `DevStyle/Goodie`);
  for (const file of req.files) {
    const { path } = file;
    const newPath = await uploader(path);
    urls.push(newPath);
    fs.unlinkSync(path);
  }
  if (urls.length == 0)
    res.status(500).json({ message: "sorry an error occured" });
  await Goodie.findOneAndUpdate(
    { _id: id },
    {
      mainImage: urls[0],
      images: urls,

      ...req.body,
    },
    { new: true }
  )
    .then((result) => {
      res.status(200).json({
        message: `Goodie Image was updated !`,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "sorry an error occured" });
    });
};

module.exports.updateLikes = (req, res, next) => {
  Goodie.findOneAndUpdate(
    { _id: req.params.id },
    { $inc: { likes: 1 } },
    { new: 1 }
  )
    .then((result) => res.status(200).json({ message: "Success" }))
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error" });
    });
};

module.exports.updateViews = (req, res, next) => {
  Goodie.findOneAndUpdate(
    { _id: req.params.id },
    { $inc: { views: 1 } },
    { new: 1 }
  )
    .then((result) => res.status(200).json({ message: "Success" }))
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error" });
    });
};

module.exports.getNewGoodies = (req, res, next) => {
  Goodie.find()
    .skip(req.headers.skip)
    .limit(4)
    .sort({ createdAt: -1 })
    .then((result) => {
      return res.status(200).json({
        message: result,
      });
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ message: "Error" });
    });
};

module.exports.getHotGoodies = (req, res, next) => {
  Goodie.find()
    .skip(req.headers.skip)
    .sort({ views: -1, likes: -1 })
    .limit(8)
    .then((result) => {
      return res.status(200).json({
        message: result,
      });
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ message: "Error" });
    });
};
