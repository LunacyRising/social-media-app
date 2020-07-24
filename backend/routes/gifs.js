const router = require("express").Router();
const axios = require("axios");

const baseUrl = "http://api.giphy.com/v1/gifs/"

const API_KEY =  process.env.GIF_API_KEY 

router.post("/gifs", async (req,res) => { 

    const  { gifLimit, gifOffset, gifQuery } = req.body; 

    console.log(gifQuery, gifLimit)

    const gifsByTrend = `${baseUrl}trending?api_key=${API_KEY}&limit=${gifLimit}&offset=${gifOffset}`;

    const gifsByQuery = `${baseUrl}search?api_key=${API_KEY}&q=${gifQuery}&limit=${gifLimit}&offset=${gifOffset}`;

    let endPoint = !gifQuery ? gifsByTrend : gifsByQuery ;
    
    try{
        const response = await axios.get(endPoint);
        res.status(201).send({gifs: response.data.data , maxResults: response.data.pagination.total_count});

    }catch(err) {
      console.log(err)
      res.status(400).send({code: 500}) 
    }
  });

module.exports = router;