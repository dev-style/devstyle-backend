const express = require("express");
const router = express.Router();
const Collection = require("../controllers/collection_controller.js");
const upload = require("../middlewares/upload.js");
const auth = require("../middlewares/auth.js");

router.post(
  "/collection/create",
  upload.single("file"),
  auth,
  Collection.createCollection
);
router.get("/collection/all", Collection.getAllCollections);
router.get("/collection/:id", Collection.getOneCollection);
router.get("/collection/goodies/:slug", Collection.getOneCollectionAndGoodies);
router.put("/collection/update/:id", auth, Collection.updateOneCollection);
router.delete("/collection/delete/:id", auth, Collection.deleteOneCollection);
router.put(
  "/collection/update/image/:id",
  upload.single("file"),
  auth,
  Collection.updateCollectionImage
);
router.put("/collection/update/views/:slug", Collection.updateViews);

module.exports = router;
