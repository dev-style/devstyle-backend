const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) return res.status(403).json({ message: "No token provided" });

    jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
      if (err)
        return res
          .status(500)
          .json({ message: "Failed to authenticate token" });
      req.userId = decoded._id;
      req.role = decoded.role;

      if (req.role !== "admin") {
        return res.status(500).json({ message: "Not allowed" });
      }
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occured" });
  }
};

module.exports = auth;
