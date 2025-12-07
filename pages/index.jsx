import React, { useEffect, useRef } from 'react';

export default function Home() {
  const videoRef = useRef(null);
  const HLS_URL = 'http://181.13.252.102:8000/play/a078';

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // HLS nativo en Safari
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_URL;
      video.addEventListener('loadedmetadata', () => video.play().catch(()=>{}));
      return;
    }

    // hls.js para el resto
    let hls;
    import('hls.js')
      .then((mod) => {
        const Hls = mod.default;
        if (Hls.isSupported()) {
          hls = new Hls();
          hls.loadSource(HLS_URL);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            // opcional autoplay
            // video.play().catch(()=>{});
          });
        } else {
          // fallback
          video.src = HLS_URL;
        }
      })
      .catch((err) => {
        console.error('Error cargando hls.js', err);
        video.src = HLS_URL;
      });

    return () => {
      if (hls) hls.destroy();
    };
  }, []);

  return (
    <main style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: '#f5f7fa' }}>
      <div style={{
