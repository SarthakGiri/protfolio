const MatrixRain = () => {
  const canvas = document.getElementById('canvas');
  if (!canvas || typeof canvas.getContext !== 'function') {
    return () => {};
  }

  const ctx = canvas.getContext('2d');

  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  const columnWidth = 20;
  let columns = Math.floor(width / columnWidth);
  let yPositions = Array(columns).fill(0);

  const draw = () => {
    // trail
    ctx.fillStyle = 'rgba(4,6,7,0.15)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#35ff9b';
    ctx.font = '15pt ui-monospace, SFMono-Regular, monospace';

    for (let i = 0; i < columns; i += 1) {
      const text = String.fromCharCode(0x30A0 + Math.random() * 96);
      ctx.fillText(text, i * columnWidth, yPositions[i]);
      yPositions[i] = yPositions[i] > height + Math.random() * 1000 ? 0 : yPositions[i] + columnWidth;
    }

    raf = window.requestAnimationFrame(draw);
  };

  const handleResize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    columns = Math.floor(width / columnWidth);
    yPositions = Array(columns).fill(0);
  };

  window.addEventListener('resize', handleResize);
  let raf = window.requestAnimationFrame(draw);

  // cleanup
  return () => {
    if (raf) window.cancelAnimationFrame(raf);
    window.removeEventListener('resize', handleResize);
  };
};

export default MatrixRain;
  