const mongoose = require("mongoose");
const uri =
  "mongodb+srv://sonisuciadi:03082000@cluster0.eevav4f.mongodb.net/DesignInDonkDb";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
