const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../Client/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});
const uploadImage = multer({
  storage: storage,
  limits: {
    fileSize: 600000,
  },
  fileFilter(req, file, cb) {
    if (file.mimetype === "image/png" || "image/jpg") {
      cb(null, true);
    } else {
      cb(new Error("Please upload an image."));
    }
  },
});

module.exports = { uploadImage };
