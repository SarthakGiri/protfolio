import React, { useEffect, useRef } from 'react';

const FuturisticBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let nodes = [];
    let energyBeams = [];
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Enhanced Particle class with quantum effects
    class QuantumParticle {
      constructor() {
        this.reset();
        this.quantum = Math.random() * Math.PI * 2;
        this.energy = Math.random() * 0.5 + 0.5;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 2 + 1;
        this.life = Math.random() * 200 + 200;
        this.maxLife = this.life;
        this.hue = Math.random() * 60 + 180; // Blue to cyan range
      }

      update() {
        this.x += this.vx + Math.sin(this.quantum) * 0.1;
        this.y += this.vy + Math.cos(this.quantum) * 0.1;
        this.quantum += 0.01;
        this.life--;

        // Quantum tunneling effect
        if (this.x < -10) this.x = canvas.width + 10;
        if (this.x > canvas.width + 10) this.x = -10;
        if (this.y < -10) this.y = canvas.height + 10;
        if (this.y > canvas.height + 10) this.y = -10;

        // Reset if dead
        if (this.life <= 0) {
          this.reset();
        }
      }

      draw() {
        const opacity = (this.life / this.maxLife) * this.energy;
        const quantumSize = this.size * (1 + Math.sin(this.quantum * 3) * 0.3);
        
        ctx.save();
        ctx.globalAlpha = opacity;
        
        // Quantum glow effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0, 
          this.x, this.y, quantumSize * 4
        );
        gradient.addColorStop(0, `hsla(${this.hue}, 100%, 80%, ${opacity})`);
        gradient.addColorStop(0.5, `hsla(${this.hue}, 100%, 60%, ${opacity * 0.5})`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, quantumSize * 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Particle core with energy pulse
        ctx.fillStyle = `hsla(${this.hue}, 100%, 90%, ${opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, quantumSize, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }

    // Energy Node class
    class EnergyNode {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.15;
        this.vy = (Math.random() - 0.5) * 0.15;
        this.size = Math.random() * 4 + 3;
        this.energy = Math.random() * Math.PI * 2;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.connections = [];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.energy += 0.02;
        this.pulsePhase += 0.03;

        // Bounce off edges with energy reflection
        if (this.x < this.size || this.x > canvas.width - this.size) {
          this.vx *= -0.8;
          this.energy += 0.5;
        }
        if (this.y < this.size || this.y > canvas.height - this.size) {
          this.vy *= -0.8;
          this.energy += 0.5;
        }

        // Keep in bounds
        this.x = Math.max(this.size, Math.min(canvas.width - this.size, this.x));
        this.y = Math.max(this.size, Math.min(canvas.height - this.size, this.y));
      }

      draw() {
        const energyPulse = Math.sin(this.energy) * 0.3 + 0.7;
        const pulse = Math.sin(this.pulsePhase) * 0.4 + 0.6;
        const nodeSize = this.size * pulse;
        
        ctx.save();
        
        // Energy field
        const fieldGradient = ctx.createRadialGradient(
          this.x, this.y, 0, 
          this.x, this.y, nodeSize * 3
        );
        fieldGradient.addColorStop(0, `rgba(0, 234, 255, ${0.3 * energyPulse})`);
        fieldGradient.addColorStop(0.7, `rgba(0, 153, 255, ${0.1 * energyPulse})`);
        fieldGradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = fieldGradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, nodeSize * 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Node core with quantum effects
        const coreGradient = ctx.createRadialGradient(
          this.x, this.y, 0, 
          this.x, this.y, nodeSize
        );
        coreGradient.addColorStop(0, `rgba(255, 255, 255, ${0.9 * pulse})`);
        coreGradient.addColorStop(0.5, `rgba(0, 234, 255, ${0.8 * pulse})`);
        coreGradient.addColorStop(1, `rgba(0, 153, 255, ${0.6 * pulse})`);
        
        ctx.fillStyle = coreGradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, nodeSize, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }

      connect(other) {
        const dx = other.x - this.x;
        const dy = other.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200 && distance > 50) {
          const energy = (200 - distance) / 200;
          const opacity = energy * 0.4;
          
          ctx.save();
          
          // Energy beam with quantum fluctuation
          const fluctuation = Math.sin(Date.now() * 0.005 + distance * 0.01) * 0.2;
          ctx.strokeStyle = `rgba(0, 234, 255, ${opacity + fluctuation})`;
          ctx.lineWidth = 2;
          ctx.shadowBlur = 15;
          ctx.shadowColor = 'rgba(0, 234, 255, 0.8)';
          
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          
          // Curved energy beam
          const midX = (this.x + other.x) / 2 + Math.sin(Date.now() * 0.003) * 20;
          const midY = (this.y + other.y) / 2 + Math.cos(Date.now() * 0.003) * 20;
          ctx.quadraticCurveTo(midX, midY, other.x, other.y);
          ctx.stroke();
          
          // Energy packets
          const time = Date.now() * 0.002;
          const progress = (Math.sin(time + distance * 0.01) + 1) / 2;
          const packetX = this.x + dx * progress;
          const packetY = this.y + dy * progress;
          
          const packetGradient = ctx.createRadialGradient(
            packetX, packetY, 0, 
            packetX, packetY, 6
          );
          packetGradient.addColorStop(0, `rgba(0, 255, 136, ${opacity * 2})`);
          packetGradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = packetGradient;
          ctx.beginPath();
          ctx.arc(packetX, packetY, 6, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.restore();
        }
      }
    }

    // Initialize particles and nodes
    for (let i = 0; i < 80; i++) {
      particles.push(new QuantumParticle());
    }
    
    for (let i = 0; i < 15; i++) {
      nodes.push(new EnergyNode());
    }

    // Mouse interaction enhancement
    let mouse = { x: 0, y: 0 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      // Add quantum disturbance around mouse
      particles.forEach(particle => {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.vx += dx * force * 0.0008;
          particle.vy += dy * force * 0.0008;
          particle.quantum += force * 0.1;
        }
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop with quantum effects
    const animate = () => {
      // Quantum background clear
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw energy network
      nodes.forEach(node => {
        node.update();
        nodes.forEach(other => {
          if (node !== other) {
            node.connect(other);
          }
        });
        node.draw();
      });

      // Update and draw quantum particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Add random quantum bursts
      if (Math.random() < 0.002) {
        const burstX = Math.random() * canvas.width;
        const burstY = Math.random() * canvas.height;
        
        ctx.save();
        const burstGradient = ctx.createRadialGradient(
          burstX, burstY, 0, 
          burstX, burstY, 100
        );
        burstGradient.addColorStop(0, 'rgba(0, 234, 255, 0.1)');
        burstGradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = burstGradient;
        ctx.beginPath();
        ctx.arc(burstX, burstY, 100, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -5,
        pointerEvents: 'none',
        opacity: 0.8
      }}
    />
  );
};

export default FuturisticBackground;