const express = require("express");
const router = express.Router();
const Goodie = require("../controllers/goodie_controller.js");
const upload = require("../middlewares/upload.js");
const auth = require("../middlewares/auth.js");

router.post("/goodie/create", upload.array("files"), auth, Goodie.createGoodie);
router.get("/goodie/all", Goodie.getAllGoodies);
router.get("/goodie/:id", Goodie.getOneGoodie);
router.put("/goodie/update/:id", auth, Goodie.updateOneGoodie);
router.put(
  "/goodie/update/image/:id",
  upload.array("files"),
  auth,
  Goodie.updateGoodieImage
);
router.delete("/goodie/delete/:id", auth, Goodie.deleteOneGoodie);
router.get("/goodies/collection/:collectionID", Goodie.getGoodiesOfCollection);
router.get(
  "/goodies/hot-goodies/collection/:collectionID",
  Goodie.getHotGoodiesOfCollection
);
router.get("/goodies/new-goodies", Goodie.getNewGoodies);
router.get("/goodies/hot-goodies", Goodie.getHotGoodies);
router.put("/goodie/update/views/:id", Goodie.updateViews);
router.put("/goodie/update/likes/:id", Goodie.updateLikes);

module.exports = router;
