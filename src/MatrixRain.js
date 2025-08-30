const MatrixRain = () => {
  const canvas = document.getElementById('matrix-canvas') || document.createElement('canvas');
  
  if (!canvas.getContext) {
    return () => {}; // Return empty cleanup function if canvas not supported
  }
  
  // Set canvas attributes
  canvas.id = 'matrix-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '-1';
  canvas.style.opacity = '0.15';
  canvas.style.pointerEvents = 'none';
  
  // Append to body if not already there
  if (!document.getElementById('matrix-canvas')) {
    document.body.appendChild(canvas);
  }
  
  const ctx = canvas.getContext('2d');
  
  // Set canvas size
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Matrix characters - mix of various symbols for cyberpunk effect
  const characters = [
    // Japanese Katakana
    'ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ',
    'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト',
    'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
    'マ', 'ミ', 'ム', 'メ', 'モ', 'ヤ', 'ユ', 'ヨ', 'ラ', 'リ',
    'ル', 'レ', 'ロ', 'ワ', 'ヲ', 'ン',
    // Numbers
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    // Cyberpunk symbols
    '!', '@', '#', '$', '%', '^', '&', '*', '(', ')',
    '-', '=', '+', '[', ']', '{', '}', '|', '\\', ':',
    ';', '"', "'", '<', '>', ',', '.', '?', '/', '~',
    // Binary
    '0', '1', '0', '1', '0', '1',
    // Hex
    'A', 'B', 'C', 'D', 'E', 'F',
    // Special cyberpunk characters
    '▲', '▼', '◆', '◇', '○', '●', '◎', '□', '■', '△'
  ];
  
  const fontSize = 14;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = new Array(columns).fill(0);
  
  // Colors for different themes
  const getThemeColor = () => {
    const theme = document.documentElement.getAttribute('data-theme');
    return theme === 'cyan' ? '#00ffff' : '#00ff41';
  };
  
  // Brightness levels for fade effect
  const brightnesses = [1, 0.8, 0.6, 0.4, 0.2, 0.1, 0.05];
  
  const draw = () => {
    // Black background with slight transparency for trailing effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const themeColor = getThemeColor();
    
    // Set font
    ctx.font = `${fontSize}px 'JetBrains Mono', 'Fira Code', monospace`;
    
    for (let i = 0; i < drops.length; i++) {
      // Draw multiple characters with different brightness levels
      for (let j = 0; j < brightnesses.length; j++) {
        const brightness = brightnesses[j];
        const y = drops[i] - (j * fontSize);
        
        if (y > 0 && y < canvas.height) {
          // Get theme color with brightness
          if (themeColor === '#00ffff') {
            ctx.fillStyle = `rgba(0, 255, 255, ${brightness})`;
          } else {
            ctx.fillStyle = `rgba(0, 255, 65, ${brightness})`;
          }
          
          // Random character
          const character = characters[Math.floor(Math.random() * characters.length)];
          
          // Add some glow effect for the brightest character
          if (j === 0) {
            ctx.shadowColor = themeColor;
            ctx.shadowBlur = 10;
          } else {
            ctx.shadowBlur = 0;
          }
          
          ctx.fillText(character, i * fontSize, y);
        }
      }
      
      // Move drop down
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  };
  
  // Animation loop
  const interval = setInterval(draw, 35);
  
  // Theme change listener
  const observer = new MutationObserver(() => {
    // Force redraw on theme change
  });
  
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
  
  // Cleanup function
  return () => {
    clearInterval(interval);
    window.removeEventListener('resize', resizeCanvas);
    observer.disconnect();
    // Remove canvas when component unmounts
    const canvasElement = document.getElementById('matrix-canvas');
    if (canvasElement) {
      canvasElement.remove();
    }
  };
};

export default MatrixRain;