const express = require("express");
const auth = require("../middlewares/auth.js");
const router = express.Router();
const Announcement = require("../controllers/announcement_controller.js");

router.post("/announcement/create", auth, Announcement.createAnnouncement);
router.get("/announcement", Announcement.getAnnouncement);
router.put("/announcement/update", auth, Announcement.updateAnnouncement);
router.delete("/announcement/delete", auth, Announcement.deleteAnnouncement);

module.exports = router;
