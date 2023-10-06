const express = require("express");
const router = express.Router();
const {
  apiAuth,
  genreList,
  getPopular,
  getSearch,
} = require("../utils/apiUrls");
const axios = require("axios");
// import React, { useEffect, useState, useCallback } from "react";

//get score
router.get("/:page/", async (req, res) => {
  const page = req.params.page;
  const genreApiString = "";
  //   const genreApiString = req.params.genreApiString;
  //   const search = req.params.search;

  console.log(page);

  let endpoints = [
    getPopular(page, genreApiString),
    // getSearch(search, page),
    genreList,
  ];

  const axiosInstance = axios.create({
    headers: {
      Authorization: apiAuth,
    },
  });

  const getMainData = useCallback(async () => {
    try {
      axios
        .all(endpoints.map((endpoints) => axiosInstance.get(endpoints)))
        .then(
          axios.spread(
            (
              { data: movieData },
              { data: searchData },
              { data: genreData }
            ) => {
              // console.log({ genreData });
              dispatch(setMovies(movieData));
              dispatch(setSearchResults(searchData));
              dispatch(setGenreApiResults(genreData));
            }
          )
        );
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, page, search, genre]);

  useEffect(() => {
    getMainData();
  }, [getMainData]);

  res.send({ status: 1, results });
});

module.exports = router;
