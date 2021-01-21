const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pictureSchema = new Schema({
  image: {
    type: String,
    default:
      "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
  },
  id_user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  description: { type: String },
});

const Picture = mongoose.model("Picture", pictureSchema);

module.exports = Picture;
