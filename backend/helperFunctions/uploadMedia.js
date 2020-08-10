const cloudinary = require("cloudinary").v2; 

exports.uploadMedia = (media, options) => {
    return new Promise((resolve, reject) => {
     cloudinary.uploader.upload(media, options, (err, result) => {
       if(result) {
         resolve(result)
       }else{
         reject(err)
       }
     })
   })
  }