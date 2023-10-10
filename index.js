const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");

// const url = `https://api.themoviedb.org/3/genre/movie/list?language=en`;
// const auth = {
//   headers: {
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZDNjYzk1ZWE4Zjk5MWYxMDhkZWQxMjJhM2YwMzA3MCIsInN1YiI6IjY0OGM2ZDEwYzNjODkxMDBhZTUwMWJkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LX3gcqEZAqxOq0UVFVSm_L9rWNhXF4JgEn48pkSa9Rg",
//   },
// };

app.use(cors());

// app.get("/", async (req, res) => {
//   const apiResponse = await axios.get(url, auth);
//   res.send(apiResponse.data);
// });

// app.use(async (req, res, next) => {
//   const { query, headers, method, body } = req;
//   console.log(method);

//   try {
//     const apiResponse = await axios[method.toLowerCase()](url, auth);
//     res.send(apiResponse.data);
//   } catch (error) {
//     res.send("Req failed");
//   }
// });

app.use("/proxy", require("./routes/proxy"));

const port = process.env.PORT || 6001;
app.listen(port, () => {
  console.log("Server running on port: ", port);
});
