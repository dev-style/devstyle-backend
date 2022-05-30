const heroSection = require("../controllers/heroSection_controller.js");
const auth = require("../middlewares/auth.js");
const upload = require("../middlewares/upload.js");
const express = require("express");
const router = express.Router();

router.post(
  "/hero/create",
  upload.single("file"),
  auth,
  heroSection.createHeroSection
);
router.get("/hero/all", heroSection.getAllHeroSections);
router.get("/hero/:id", heroSection.getOneHeroSection);
router.delete("/hero/delete/:id", auth, heroSection.deleteOneHeroSection);
router.put("/hero/update/:id", auth, heroSection.updateOneHeroSection);
router.put(
  "/hero/update/image/:id",
  upload.single("file"),
  auth,
  heroSection.updateHeroSectionImage
);

module.exports = router;
