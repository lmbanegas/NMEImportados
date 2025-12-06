const express = require("express");
const app = express();
const http = require("http");
const { neon } = require("@neondatabase/serverless");
const port = process.env.PORT || 9999;

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "audio/x-mpegurl");

  res.send(`#EXTM3U
#EXTVLCOPT:network-caching=50
#EXTVLCOPT:clock-jitter=0
#EXTVLCOPT:clock-synchro=0

#EXTINF:0,ESPN Premium HD AR
#EXTVLCOPT:network-caching=50
http://190.95.60.228:8500/play/a09v

#EXTINF:0,ESPN Premium HD (Alt)
#EXTVLCOPT:network-caching=50
http://138.59.227.28:8000/play/a078/index.m3u8

#EXTINF:0,ESPN Premium (DirecTV)
#EXTVLCOPT:network-caching=50
http://217.26.190.76:8888/play/a0es/index.m3u8

#EXTINF:-1,ESPN PREMIUM
#EXTVLCOPT:network-caching=50
http://45.5.151.251:8000/play/a00k/index.m3u8

#EXTINF:0,TNT Sports HD AR
#EXTVLCOPT:network-caching=50
http://190.95.60.228:8500/play/a08j

#EXTINF:0,TNT SPORTS
#EXTVLCOPT:network-caching=50
http://45.5.151.251:8000/play/a00p/index.m3u8

#EXTINF:0,TNT Sports HD (Alt)
#EXTVLCOPT:network-caching=50
http://138.59.227.28:8000/play/a0bk/index.m3u8

#EXTINF:0,TNT SPORTS
#EXTVLCOPT:network-caching=50
http://45.5.151.251:8000/play/a00p/index.m3u8

#EXTINF:0,TyC Sports HD (81w) AR
#EXTVLCOPT:network-caching=50
http://190.95.60.228:8500/play/a02m
`);
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



