const Affiliation = require("../models/affiliation_model.js");
const Ambassador = require("../models/ambassador_model.js");
const { SchemaTypes, Schema } = require("mongoose");

module.exports.createAffiliation = async (req, res, next) => {
  try {
    const { AmbassadorId } = req.body;

    // Génération du code unique pour le lien d'affiliation
    const affiliateCode = Math.random().toString(36).substring(2);

    // Ajout du code au champ "lienAffiliation" dans la base de données
    await Ambassador.findByIdAndUpdate(AmbassadorId, {
      affiliateCode: affiliateCode,
    });

    // Construction du lien complet avec le nom de domaine
    const affiliateLink = `$dev-style.com/affiliate/${affiliateCode}`;

    // return res.status(200).json({ link: affiliateLink });

    const affiliation = new Affiliation({
      affiliateCode,
      affiliateLink, 
    });

    affiliation
      .save()
      .then((_) => {
        res.status(200).json({
          message: "Affiliation created successfully !!",
          link: affiliateLink,
        });
      })
      .catch((error) => {
        console.log(error.message);
        return res.status(500).json({
          message: "Affiliation not created",
        });
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error creating   affiliation for Ambassador " });
  }
};

module.exports.updateClickCount = async (req, res, next) => {
  try {
    const { affiliateCode } = req.params;
    const affiliateLink = await Affiliation.findOneAndUpdate(
      {
        affiliateCode,
      },
      {
        $inc: { clicksCount: 1 },
      },
      { new: true }
    );


    if(!affiliateLink){

        return res.status(404).json({ error:'Affiliate Link not found' });


    }
    return res.status(200).json({ success:true , clickCount :affiliateLink.clicksCount });


  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
