const Goodie = require("../models/goodie_model.js");
const Collection = require("../models/collection_model.js");
const cloudinary = require("../cloudinary_config");
const fs = require("fs");
const { SchemaTypes, Schema } = require("mongoose");

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
      await cloudinary.uploads(path, `DevStyle/Goodies`, { transformation : [
        {
          overlay: "devstyle_watermark",
          opacity: 10,
          gravity: "north_west",
          x: 5,
          y: 5,
          width: "0.5"
        }, 
        {
          overlay: "devstyle_watermark",
          opacity: 6.5,
          gravity: "center",
          width: "1.0",
          angle: 45
        },
        {
          overlay: "devstyle_watermark",
          opacity: 10,
          gravity: "south_east",
          x: 5,
          y: 5,
          width: "0.5"
        }
      ]});
    for (const file of req.files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    if (urls.length == 0) {
      console.log("No images");
      return res.status(500).json({ message: "sorry an error occur" });
    }

    let collectionSlug = await Collection.findOne({ _id: fromCollection })
    collectionSlug = collectionSlug.slug??null
    if (!collectionSlug){
      res.status(500).json({ message: collectionSlug.message });
    }
    slug = collectionSlug + "-" + slug
    
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
  console.log(req.params.slug)
  Goodie.findOne({ slug: req.params.slug })
    .populate("fromCollection")
    .populate("size")
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
  Goodie.find({
    fromCollection: req.params.collectionID,
    _id: { $ne: req.params.goodieID },
  })
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
    await cloudinary.uploads(path, `DevStyle/Goodies`,  { transformation : [
      {
        overlay: "devstyle_watermark",
        opacity: 15,
        gravity: "north_west",
        x: 5,
        y: 5,
        width: "0.5"
      }, 
      {
        overlay: "devstyle_watermark",
        opacity: 10.5,
        gravity: "center",
        width: "1.0",
        angle: 45
      },
      {
        overlay: "devstyle_watermark",
        opacity: 15,
        gravity: "south_east",
        x: 5,
        y: 5,
        width: "0.5"
      }
    ]});
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
    { slug: req.params.slug },
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
    { slug: req.params.slug },
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
