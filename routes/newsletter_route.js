const express = require("express");
const auth = require("../middlewares/auth.js");
const router = express.Router();
const Newsletter = require("../controllers/newsletter_controller.js");

router.post("/newsletter/create-list", auth, Newsletter.createAudience);
router.post("/newsletter/save", Newsletter.saveEmail);
router.get("/newsletter/all-email", auth, Newsletter.getAllEmails);
router.get("/newsletter/:id", auth, Newsletter.getOneEmail);
router.delete("/newsletter/delete/:id", auth, Newsletter.deleteOneEmail);

module.exports = router;
