const Ambassador = require("../controllers/ambassador_controller.js");
const upload = require("../middlewares/upload.js");
const auth = require("../middlewares/auth.js");
const express = require("express");
const router = express.Router();

router.post(
  "/ambassador/create",
  upload.single("file"),
  auth,
  Ambassador.createAmbassador
);
router.get("/ambassador/all", Ambassador.getAllAmbassadors);
router.get("/ambassador/:id", Ambassador.getOneAmbassador);
router.delete("/ambassador/delete/:id", auth, Ambassador.deleteOneAmbassador);
router.put("/ambassador/update/:id", auth, Ambassador.updateOneAmbassador);
router.put(
  "/ambassador/update/image/:id",
  upload.single("file"),
  auth,
  Ambassador.updateAmbassadorImage
);

module.exports = router;
