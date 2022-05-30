const Announcement = require("../models/announcement_model.js");

module.exports.createAnnouncement = async (req, res, next) => {
  let { text, link } = req.body;

  const NewAnnouncement = new Announcement({
    text,
    link,
  });

  NewAnnouncement.save()
    .then((_) => {
      res.status(200).json({
        message: "Announcement created successfully !!",
      });
    })
    .catch((error) => {
      console.log(error.message);
      return res.status(500).json({
        message: "Announcement not created",
      });
    });
};

module.exports.getAnnouncement = (req, res, next) => {
  Announcement.findOne()
    .then((result) => {
      res.status(200).json({ message: result });
    })
    .catch((error) => {
      console.log(error.message);

      res.status(500).json({ message: error.message });
    });
};

module.exports.updateAnnouncement = (req, res, next) => {
  Announcement.findOneAndUpdate({}, { ...req.body }, { new: true })
    .then((result) => {
      res.status(200).json({ message: result });
    })
    .catch((error) => {
      console.log(error.message);

      res.status(500).json({ message: error.message });
    });
};

module.exports.deleteAnnouncement = (req, res, next) => {
  Announcement.deleteOne()
    .then((result) => {
      res.status(200).json({ message: result });
    })
    .catch((error) => {
      console.log(error.message);

      res.status(500).json({ message: error.message });
    });
};
