const MatrixRain = () => {
    const canvas = document.getElementById('canvas');
    if(canvas.getContext) {
      const ctx = canvas.getContext('2d');
      const w = document.body.clientWidth;
      const h = document.body.clientHeight;
      canvas.height = h;
      canvas.width = w;
      const col = Math.floor(w / 20); // Updated this line
      const y = Array(col).fill(0);
      const run = () => {
        ctx.fillStyle='#0001';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle='#0f0';
        ctx.font = '15pt monospace';
        y.map((v, i) => {
          const text = String.fromCharCode(Math.random() * 128);
          ctx.fillText(text, i * 20, v);
          if(v > 100 + Math.random() * 1e4) {
            y[i] = 0;
          } else {
            y[i] = v + 20;
          }
        });
      };
      setInterval(run, 50);
    }
  }
  
  export default MatrixRain;
  