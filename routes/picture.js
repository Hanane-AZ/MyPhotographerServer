const express = require("express");
const Picture = require("../models/Picture");
const router = express.Router();
//const upload = require("../config/cloudinary");



//http://localhost:4000/api/picture

router.get("/home",(req,res,next) => {
    //get all pictures
    Picture.find()
    .then((pictureDocuments) => {
        res.status(200).json(pictureDocuments);
    })
    .catch((error) => {
        next(error);

    });
});

//http://localhost:4000/api/pictures/{some-id}

router.get("/:id", (req, res, next) => {
//Get one  picture
Picture.findById(req.params.id)
.then((pictureDocument)=>{
    res.status(200).json(pictureDocument);
})
.catch((error) => {
next(error);
});
});



// http://localhost:4000/picure/{some-id}
router.patch("/:id", (req, res, next) => {
    // Update a specific picture
    Picture.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((pictureDocument) => {
        res.status(200).json(pictureDocument);
        // There's a trap !
      })
      .catch((error) => {
        next(error);
      });
  });

  // http://localhost:4000/picture
router.post("/", (req, res, next) => {
    // Create a picture
    Picture.create(req.body)
      .then((pictureDocument) => {
        res.status(201).json(pictureDocument);
      })
      .catch((error) => {
        next(error);
      });
  });

// http://localhost:4000/{some-id}
router.delete("/:id", (req, res, next) => {
    // Deletes a picture
    Picture.findByIdAndRemove(req.params.id)
      .then((pictureDocument) => {
        // res.sendStatus(204)
        res.status(204).json({
          message: "Successfuly deleted !",
        });
      })
      .catch((error) => {
        next(error);
      });
  });
  
  module.exports = router;
