const cloudinary = require('cloudinary').v2
require("dotenv").config;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploads = (file, folder, optionsOnUpload = {}) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      { resource_type: "auto",
        folder: folder, 
        ...optionsOnUpload
      },
      (error, result) => {
        resolve({
          url: result.url,
            secure_url: result.secure_url,
          //   id: result.public_id,
        });
      },
      {
       
      }
    );
  });
};
