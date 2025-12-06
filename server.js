const express = require("express");
const app = express();
const http = require("http");
const { neon } = require("@neondatabase/serverless");
const port = process.env.PORT || 9999;

app.get('/', (req, res) => {
    res.redirect('https://gist.githubusercontent.com/lmbanegas/2a5c5289bef3cfdbb9179199484981cb/raw/3edfae85124d6af46ce899f8b661983eaeb46bda/gistfile1.raw');
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



