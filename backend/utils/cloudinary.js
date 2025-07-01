const cloudinary = require('cloudinary').v2;

console.log('Cloudinary ENV:', process.env.CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_API_KEY, process.env.CLOUDINARY_API_SECRET);

cloudinary.config({
  cloud_name: 'dijayprrw',
  api_key: '519957917434212',
  api_secret: 'podPs8YKmPeDvh5iCd5KiPqm9qE',
});

module.exports = cloudinary; 