const express = require("express");
const app = express();
const port = 3000;
const { Game } = require("./models/index");
const router = require("./routes/index");
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
