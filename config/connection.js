const mongoose = require("mongoose");

const uri =
  process.env.MONGO_URI ||
  "mongodb+srv://sonisuciadi:03082000@cluster0.eevav4f.mongodb.net/DesignInDonkDb";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log(`${uri} terkoneksi...`);
});
