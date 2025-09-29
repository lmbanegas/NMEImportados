const express = require("express");
const app = express();

const port = process.env.PORT || 9999;

app.get("/", (req, res) => {
  res.send("Subscribe to Arpan Neupane's channel");
});

app.listen(port, () => {
  `Server started on port ${port}`;
});
