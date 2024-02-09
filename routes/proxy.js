const express = require("express");
const router = express.Router();
const axios = require("axios");
const { authorization } = require("../utils/apiUrls");

let cache = {};
let rate = 1;

setInterval(() => {
  cache = {};
}, 86400000);

router.get("/", async (req, res) => {
  //   console.log(req.query.url);
  const url = Buffer.from(req.query.url, "base64");
  //   console.log(url.toString());
  if (!url.toString().startsWith("https://api.themoviedb.org/3")) {
    return;
  }

  if (cache[url]) {
    res.send(cache[url]);
    // console.log("found in cache");
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

router.get("/database", async (req, res) => {
  // console.log(req.query.url);
  const url = Buffer.from(req.query.url, "base64");
  //   console.log(url.toString());
  if (!url.toString().startsWith("http://localhost:4000/account")) {
    return;
  }

  try {
    const result = await axios.get(url);
    res.send(result.data);
  } catch (result) {
    res.send(result);
  }
});

router.post("/databasePostLogin/:email/:password", async (req, res) => {
  // console.log(req.query.url);
  const url = Buffer.from(req.query.url, "base64");
  console.log(url.toString());
  if (!url.toString().startsWith("http://localhost:4000/account/login")) {
    return;
  }

  const email = req.params.email;
  const password = req.params.password;

  const accountInfo = { email: email, password: password };

  if (rate > 5) {
    res.send({ status: 200, message: "Limit exceeded" });
    setTimeout(() => {
      rate = 1;
    }, 60000);
  } else {
    try {
      console.log(url.toString());
      const result = await axios.post(url, accountInfo);
      res.send(result.data);
      if (result.data.status === 0) {
        rate = ++rate;
        console.log(rate);
      }
    } catch (result) {
      res.send(result);
    }
  }
});

router.post("/databasePostRegister/:email/:password", async (req, res) => {
  // console.log(req.query.url);
  const url = Buffer.from(req.query.url, "base64");
  console.log(url.toString());
  if (!url.toString().startsWith("http://localhost:4000/account/register")) {
    return;
  }

  const email = req.params.email;
  const password = req.params.password;

  const accountInfo = { email: email, password: password };

  try {
    console.log(url.toString());
    const result = await axios.post(url, accountInfo);
    res.send(result.data);
  } catch (result) {
    res.send(result);
  }
});

router.get("/database/:token", async (req, res) => {
  //   console.log("1", req.query.url);
  const url = Buffer.from(req.query.url, "base64");
  console.log(url.toString());
  if (!url.toString().startsWith("http://localhost:4000/useractions")) {
    return;
  }

  const token = req.params.token;

  try {
    const result = await axios.get(url, {
      headers: { token: token },
    });
    res.send(result.data);
    // console.log(result.data);
    //   cache[url] = result.data;
  } catch (result) {
    res.send(result);
  }
});

router.post("/databasePostFave/:token/:movieid/:fave", async (req, res) => {
  // console.log(req.query.url);
  const url = Buffer.from(req.query.url, "base64");
  console.log(url.toString());
  if (!url.toString().startsWith("http://localhost:4000/useractions")) {
    return;
  }

  const token = req.params.token;
  const movieid = req.params.movieid;
  const fave = req.params.fave;

  const faveInfo = { movie_id: movieid, favourite: fave };

  try {
    const result = await axios.post(url, faveInfo, {
      headers: { token: token },
    });
    res.send(result.data);
  } catch (result) {
    res.send(result);
  }
});

router.patch("/databasePatchFave/:token/:movieid/:fave", async (req, res) => {
  // console.log(req.query.url);
  const url = Buffer.from(req.query.url, "base64");
  console.log(url.toString());
  if (!url.toString().startsWith("http://localhost:4000/useractions")) {
    return;
  }

  const token = req.params.token;
  const movieid = req.params.movieid;
  const fave = req.params.fave;

  const faveInfo = { movie_id: movieid, favourite: fave };

  try {
    const result = await axios.patch(url, faveInfo, {
      headers: { token: token },
    });
    res.send(result.data);
  } catch (result) {
    res.send(result);
  }
});

router.post(
  "/databasePostRating/:token/:movieid/:currentRating",
  async (req, res) => {
    // console.log(req.query.url);
    const url = Buffer.from(req.query.url, "base64");
    console.log(url.toString());
    if (!url.toString().startsWith("http://localhost:4000/useractions")) {
      return;
    }

    const token = req.params.token;
    const movieid = req.params.movieid;
    const currentRating = req.params.currentRating;

    const ratingInfo = { movie_id: movieid, rating: currentRating };

    try {
      const result = await axios.post(url, ratingInfo, {
        headers: { token: token },
      });
      res.send(result.data);
    } catch (result) {
      res.send(result);
    }
  }
);

router.patch(
  "/databasePatchRating/:token/:movieid/:currentRating",
  async (req, res) => {
    // console.log(req.query.url);
    const url = Buffer.from(req.query.url, "base64");
    console.log(url.toString());
    if (!url.toString().startsWith("http://localhost:4000/useractions")) {
      return;
    }

    const token = req.params.token;
    const movieid = req.params.movieid;
    const currentRating = req.params.currentRating;

    const ratingInfo = { movie_id: movieid, rating: currentRating };

    try {
      const result = await axios.patch(url, ratingInfo, {
        headers: { token: token },
      });
      res.send(result.data);
    } catch (result) {
      res.send(result);
    }
  }
);

router.delete("/databaseDelete/:token/:password", async (req, res) => {
  // console.log(req.query.url);
  const url = Buffer.from(req.query.url, "base64");
  console.log(url.toString());
  if (!url.toString().startsWith("http://localhost:4000/useractions")) {
    return;
  }

  const token = req.params.token;
  const password = req.params.password;

  try {
    const result = await axios.delete(url, {
      headers: { token: token, password: password },
    });
    res.send(result.data);
  } catch (result) {
    res.send(result);
  }
});

router.patch("/database/:token/:password/:password2", async (req, res) => {
  // console.log(req.query.url);
  const url = Buffer.from(req.query.url, "base64");
  console.log(url.toString());
  if (
    !url
      .toString()
      .startsWith("http://localhost:4000/useractions/changePassword")
  ) {
    return;
  }

  const token = req.params.token;
  const password = req.params.password;
  const password2 = req.params.password2;

  console.log(password2);

  //   const data = { token: token, password: password, newPassword: newPassword };
  const data = {};

  try {
    const result = await axios.patch(url, data, {
      headers: {
        token: token,
        password: password,
        password2: password2,
      },
    });
    res.send(result.data);
  } catch (result) {
    res.send(result);
  }
});

module.exports = router;
