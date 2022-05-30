const express = require("express");
const auth = require("../middlewares/auth.js");
const Social = require("../controllers/social_controller.js");
const router = express.Router();

router.post("/social/create", auth, Social.createSocial);
router.get("/social/all", Social.getAllSocials);
router.get("/social/:id", Social.getOneSocial);
router.put("/social/update/:id", auth, Social.updateOneSocial);
router.delete("/social/delete/:id", auth, Social.deleteOneSocial);

module.exports = router;
