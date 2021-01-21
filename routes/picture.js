const express = require("express");
const Picture = require("../models/Picture");
const router = express.Router();
const upload = require("../config/cloudinary");
const requireAuth = require("../middlewares/requireAuth");

//http://localhost:4000/api/picture

router.get("/home", (req, res, next) => {
  //get all pictures
  Picture.find()
    .populate("id_user")
    .then((pictureDocuments) => {
      res.status(200).json(pictureDocuments);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/myphotos", (req, res, next) => {
  //get picture of logged user
  Picture.find({ id_user: req.session.currentUser })
    .then((pictureDocuments) => {
      res.status(200).json(pictureDocuments);
    })
    .catch((error) => {
      next(error);
    });
});

// router.post("/", upload.single("image"), (req, res, next) => {
//   // Create a picture
//   const updateValues = {...req.body}
//   updateValues.id_user = req.session.currentUser
//   req.body.image = req.file.path;
//   Picture.create(req.body).populate("id_user").then((pictureDocument)=> {
//     res.status(201).json(pictureDocument)
//   }).catch((error) => {
//       next(error);
//     });

//     //  pictureDocument.populate("id_user").execPopulate().then((image)=>{res.status(201).json(pictureDocument)}) // Pourquoi le populate ne fonctionne pas ?

// });

router.post("/", requireAuth, upload.single("image"), (req, res, next) => {
  // Create a picture
  req.body.id_user = req.session.currentUser;
  req.body.image = req.file.path;
  console.log(req.body);
  Picture.create(req.body)
    .then((pictureDocument) => {
      res.status(201).json(pictureDocument);
    })
    .catch((error) => {
      next(error);
    });

  //  pictureDocument.populate("id_user").execPopulate().then((image)=>{res.status(201).json(pictureDocument)}) // Pourquoi le populate ne fonctionne pas ?
});

// http://localhost:4000/picure/{some-id}
router.patch("/:id", upload.single("image"), (req, res, next) => {
  // Update a specific picture

  req.body.image = req.file.path;

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

//http://localhost:4000/api/pictures/{some-id}

router.get("/:id", (req, res, next) => {
  //Get one  picture
  Picture.findById(req.params.id)
    .then((pictureDocument) => {
      res.status(200).json(pictureDocument);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
