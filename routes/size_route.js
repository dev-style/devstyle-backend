const express = require("express");
const auth = require("../middlewares/auth.js");
const router = express.Router();
const Size = require("../controllers/size_controller.js");

router.post("/size/create", auth, Size.createSize);
router.get("/size/all", Size.getAllSizes);
router.get("/size/:id", Size.getOneSize);
router.put("/size/update/:id", auth, Size.updateOneSize);
router.delete("/size/delete/:id", auth, Size.deleteOneSize);

module.exports = router;
