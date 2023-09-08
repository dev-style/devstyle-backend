const Newsletter = require("../models/newsletter_model.js");
const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});
module.exports.createAudience = async (req, res, next) => {
  console.log(true, req)
  const event = {
    name: "_DevStyle Newsletter",
  };

  const footerContactInfo = {
    company: "_DevStyle",
    address1: "Bonamoussadi",
    city: "Douala",
    state: "Littoral",
    zip: "237",
    country: "CM",
  };

  const campaignDefaults = {
    from_name: "_DevStyle",
    from_email: "contact.devstyle@gmail.com",
    subject: "_DevStyle Newsletter",
    language: "FR_FR",
  };
  async function run() {
    const response = await mailchimp.lists.createList({
      name: event.name,
      contact: footerContactInfo,
      permission_reminder: "permission_reminder",
      email_type_option: true,
      campaign_defaults: campaignDefaults,
    });

    console.log(
      `Successfully created an audience. The audience id is ${response.id}.`
    );
    if (response.id) {
      return res.status(200).json({ message: response.id });
    } else {
      console.log(response);
      return res.status(500).json({ message: response });
    }
  }

  run();
};

module.exports.saveEmail = async (req, res, next) => {
  let { email } = req.body;

  const NewNewsletter = new Newsletter({
    email,
  });

  NewNewsletter.save()
    .then((_) => {
      async function run() {
        const response = await mailchimp.lists.addListMember(
          process.env.MAILCHIMP_AUDIENCE_ID,
          {
            email_address: email,
            status: "subscribed",
          }
        );

        console.log(
          `Successfully added contact as an audience member. The contact's id is ${response.id}.`
        );
        if (response.id) {
          return res.status(200).json({ message: response.id });
        } else {
          console.log(response);
          return res.status(500).json({ message: response });
        }
      }

      run();
    })
    .catch((error) => {
      console.log(error.message);
      return res.status(500).json({
        message: "Newsletter not created",
      });
    });
};

module.exports.getAllEmails = (req, res, next) => {
  Newsletter.find()
    .then((results) => {
      res.status(200).json({ message: results });
    })
    .catch((error) => {
      console.log(error.message);

      res.status(500).json({ message: error.message });
    });
};

module.exports.getOneEmail = (req, res, next) => {
  Newsletter.findOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({ message: result });
    })
    .catch((error) => {
      console.log(error.message);

      res.status(500).json({ message: error.message });
    });
};

module.exports.deleteOneEmail = (req, res, next) => {
  Newsletter.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({ message: result });
    })
    .catch((error) => {
      console.log(error.message);

      res.status(500).json({ message: error.message });
    });
};
