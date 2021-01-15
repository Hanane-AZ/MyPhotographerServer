const express = require("express");
const Picture = require("../models/Picture");
const router = express.Router();
const upload = require("../config/cloudinary");
const requireAuth = require("../middlewares/requireAuth");


router.patch(
    "/me",
    requireAuth,
    upload.single("profileImg"),
    (req, res, next) => {
      const userId = req.session.currentUser;

      // If no file is sent, req.file is undefined, leading to an error when trying to
    // acces req.file.path (undefined.path) => Cannot read property path of undefined. 

    if (req.file) {
        req.body.profileImg = req.file.path; // Add profileImage key to req.body
      }

      User.findByIdAndUpdate(userId, req.body, { new: true })
      .select("-password") // Remove the password field from the found document.
      .then((userDocument) => {
        res.status(200).json(userDocument);
      })
      .catch(next);
  }
);


router.get("/me", requireAuth, (req, res, next) => {
    User.findById(req.session.currentUser)
      .select("-password") // Remove the password field from the found document.
      .then((userDocument) => {
        return res.status(200).json(userDocument);
      })
      .catch(next);
  });

  module.exports = router;