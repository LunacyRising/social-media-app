const router = require("express").Router();
const axios = require("axios");

const baseUrl = "https://api.giphy.com/v1/gifs/"

//const API_KEY =  process.env.GIF_API_KEY

router.post("/gifs", async (req,res) => { 

  //console.log("apykey", API_KEY )

    const  { gifLimit, gifOffset, gifQuery } = req.body; 

    console.log("gifquery",gifQuery, "giflimit",gifLimit)

    const gifsByTrend = `${baseUrl}trending?api_key=${process.env.GIF_API_KEY}&limit=${gifLimit}&offset=${gifOffset}`;

    const gifsByQuery = `${baseUrl}search?api_key=${process.env.GIF_API_KEY}&q=${gifQuery}&limit=${gifLimit}&offset=${gifOffset}`;

    let endPoint = !gifQuery ? gifsByTrend : gifsByQuery ;
    
    try{
        //const response = await axios.get("https://api.giphy.com/v1/gifs/trending?api_key=sX6tPjMvrePrzqDkiPyLg9G09q1UFTZ7&limit=25&offset=0");
        const response = await axios.get(endPoint);
        res.status(201).send({gifs: response.data.data , maxResults: response.data.pagination.total_count});

    }catch(err) {
      console.log(err)
      res.status(400).send({code: 500}) 
    }
  });

module.exports = router;