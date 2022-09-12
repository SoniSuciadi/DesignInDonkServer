require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const routes = require("./routes/index");
const handleError = require("./middlewares/handleError");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", routes);
app.use(handleError);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
