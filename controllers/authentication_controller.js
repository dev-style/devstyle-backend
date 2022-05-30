const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user_model.js");
require("dotenv").config();

module.exports.register = (req, res, next) => {
  const { email, phone, password, firstName, lastName } = req.body;
  bcrypt
    .hash(password, Number(process.env.BCRYPT_SALT))
    .then((hash) => {
      const user = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        role: "user",
        password: hash,
      });
      user
        .save()
        .then((user) => {
          if (!user)
            return res.status(400).json({ error: "user are not created" });
          let token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_KEY
          );
          res.status(200).json({
            message: { user, token },
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({ message: "error: account not created" });
        });
    })
    .catch((error) => {
      console.log("bcrypt", error);
      res.status(500).json({ message: "An error occured" });
    });
};

module.exports.login = (req, res, next) => {
  const { password, email } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      try {
        if (!user) return res.status(404).json({ message: "user not found" });
        let verify = bcrypt.compareSync(password, user.password);
        if (verify == false)
          res
            .status(500)
            .json({ message: "authentication failed or incorrect password" });
        let token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_KEY
        );
        res.status(200).json({
          message: { user, token },
        });
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "An error occured" });
      }
    })
    .catch((error) => {
      console.log(error.message);

      res.status(500).json({ message: "An error occured" });
    });
};
