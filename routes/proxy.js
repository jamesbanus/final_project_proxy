const express = require("express");
const router = express.Router();
const axios = require("axios");
const { authorization } = require("../utils/apiUrls");

const cache = {};

setInterval(() => {
  cache = {};
}, 86400000);

router.get("/", async (req, res) => {
  console.log(req.query.url);
  const url = Buffer.from(req.query.url, "base64");
  if (!url.toString().startsWith("https://api.themoviedb.org/3")) {
    return;
  }

  if (cache[url]) {
    res.send(cache[url]);
    console.log("Found inCache");
    return;
  }

  try {
    const result = await axios.get(url, {
      headers: { Authorization: authorization },
    });
    res.send(result.data);
    cache[url] = result.data;
  } catch (result) {
    res.send(result);
  }
});

module.exports = router;
