const Partner = require("../controllers/partner_controller.js");
const auth = require("../middlewares/auth.js");
const upload = require("../middlewares/upload.js");
const express = require("express");
const router = express.Router();

router.post(
  "/partner/create",
  upload.array("files"),
  auth,
  Partner.createPartner
);
router.get("/partner/all", Partner.getAllPartners);
router.get("/partner/:id", Partner.getOnePartner);
router.delete("/partner/delete/:id", auth, Partner.deleteOnePartner);
router.put("/partner/update/:id", auth, Partner.updateOnePartner);
router.put(
  "/partner/update/image/:id",
  upload.array("files"),
  auth,
  Partner.updatePartnerImage
);

module.exports = router;
