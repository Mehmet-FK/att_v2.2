const express = require("express");
const path = require("path");

const PORT = 3000;

const app = express();
app.use(express.static(path.join(__dirname, "public")));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
  console.log(__dirname);
});

app.listen(PORT, () =>
  console.log("Server running on:" + `http://localhost:${PORT}/`)
);
