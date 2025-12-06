const express = require("express");
const app = express();
const http = require("http");
import fetch from 'node-fetch';

const { neon } = require("@neondatabase/serverless");
const port = process.env.PORT || 9999;


app.get('/', async (req, res) => {
  try {
    const rawUrl =
      'https://gist.githubusercontent.com/lmbanegas/2a5c5289bef3cfdbb9179199484981cb/raw/b85c16bac482764c6b83b3ca808ea42e33b5c89a/gistfile1.m3u8';

    const response = await fetch(rawUrl);
    const text = await response.text();

    res.setHeader('Content-Type', 'audio/x-mpegurl');
    res.send(text);
  } catch (e) {
    res.status(500).send('Error cargando lista');
  }
});



app.listen(port, () => {
  `Server started on port ${port}`;
});

// DB

require("dotenv").config();


const sql = neon(process.env.DATABASE_URL);

const requestHandler = async (req, res) => {
  const result = await sql`SELECT * from public.productos`;
};

app.get('/hola', function(req, res) {
  const requestHandler = async (req, res) => {
    const result = await sql`SELECT * from public.productos`;

    console.log(result)
    res.send({ result: result.rows })

  }


});



