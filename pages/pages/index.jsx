

export default function Home() {
const videoRef = useRef(null);
const HLS_URL = 'http://181.13.252.102:8000/play/a078';


useEffect(() => {
const video = videoRef.current;
if (!video) return;


// Si el navegador (Safari) soporta HLS directamente
if (video.canPlayType('application/vnd.apple.mpegurl')) {
video.src = HLS_URL;
video.addEventListener('loadedmetadata', () => video.play().catch(()=>{}));
return;
}


// Para otros navegadores usamos hls.js
let Hls;
let hls;


// import dinámico para que sólo corra en el cliente
import('hls.js').then((mod) => {
Hls = mod.default;
if (Hls.isSupported()) {
hls = new Hls();
hls.loadSource(HLS_URL);
hls.attachMedia(video);
hls.on(Hls.Events.MANIFEST_PARSED, function () {
// opcional: autoplay
// video.play();
});
} else {
// Fallback: asignar la URL directa (puede no funcionar en todos los navegadores)
video.src = HLS_URL;
}
}).catch((err) => {
console.error('Error cargando hls.js', err);
video.src = HLS_URL;
});


return () => {
if (hls) {
hls.destroy();
}
};
}, []);


return (
<main style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: '#f5f7fa' }}>
<div style={{ width: '90%', maxWidth: 900, padding: 16 }}>
<h1 style={{ textAlign: 'center' }}>Reproductor HLS - Stream</h1>
<div style={{ background: '#000', borderRadius: 8, overflow: 'hidden' }}>
<video
ref={videoRef}
controls
playsInline
style={{ width: '100%', height: 'auto', display: 'block' }}
/>
</div>
<p style={{ textAlign: 'center', marginTop: 8, color: '#555' }}>Fuente: <code>{HLS_URL}</code></p>
</div>
</main>
);
}
