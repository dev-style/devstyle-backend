const Affiliation = require("../controllers/affiliation_controller.js")


const express = require("express");
const router = express.Router();


router.post('/affiliation/create', Affiliation.createAffiliation )
router.put('/affiliation/:affiliateCode', Affiliation.updateClickCount)

module.exports = router