import React, { useRef, useEffect, useState } from 'react';
import './NeuralNetwork.css';

const NeuralNetwork = ({ skills = [], isActive = false }) => {
  const canvasRef = useRef(null);
  const [networkData, setNetworkData] = useState({ nodes: [], connections: [] });
  const [activeNode, setActiveNode] = useState(null);
  const [learningProgress, setLearningProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let nodes = [];
    let connections = [];
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initializeNetwork();
    };

    // Neural Network Node Class
    class NeuralNode {
      constructor(x, y, layer, skill = null) {
        this.x = x;
        this.y = y;
        this.layer = layer;
        this.skill = skill;
        this.activation = Math.random();
        this.targetActivation = Math.random();
        this.size = 8 + (skill ? 4 : 0);
        this.pulse = 0;
        this.connections = [];
        this.id = Math.random().toString(36).substr(2, 9);
      }

      update() {
        // Smooth activation changes
        this.activation += (this.targetActivation - this.activation) * 0.02;
        this.pulse += 0.1;
        
        // Random activation changes for learning effect
        if (Math.random() < 0.005) {
          this.targetActivation = Math.random();
        }
      }

      draw(ctx) {
        const intensity = this.activation;
        const pulseSize = Math.sin(this.pulse) * 2;
        
        // Outer glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size + pulseSize + 5, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size + 5
        );
        
        if (this.skill) {
          gradient.addColorStop(0, `rgba(0, 234, 255, ${intensity * 0.8})`);
          gradient.addColorStop(1, 'rgba(0, 234, 255, 0)');
        } else {
          gradient.addColorStop(0, `rgba(0, 153, 255, ${intensity * 0.6})`);
          gradient.addColorStop(1, 'rgba(0, 153, 255, 0)');
        }
        
        ctx.fillStyle = gradient;
        ctx.fill();

        // Main node
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size + pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = this.skill 
          ? `rgba(0, 234, 255, ${0.8 + intensity * 0.2})`
          : `rgba(0, 153, 255, ${0.6 + intensity * 0.4})`;
        ctx.fill();

        // Inner core
        ctx.beginPath();
        ctx.arc(this.x, this.y, (this.size + pulseSize) * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${intensity * 0.8})`;
        ctx.fill();

        // Skill label
        if (this.skill && intensity > 0.7) {
          ctx.font = '10px "JetBrains Mono"';
          ctx.fillStyle = '#00eaff';
          ctx.textAlign = 'center';
          ctx.fillText(this.skill.substring(0, 8), this.x, this.y - this.size - 15);
        }
      }
    }

    // Neural Connection Class
    class NeuralConnection {
      constructor(nodeA, nodeB) {
        this.nodeA = nodeA;
        this.nodeB = nodeB;
        this.weight = Math.random() * 2 - 1; // -1 to 1
        this.signal = 0;
        this.particles = [];
      }

      update() {
        // Signal propagation based on node activations
        const activationDiff = this.nodeA.activation - this.nodeB.activation;
        this.signal += activationDiff * 0.1;
        this.signal *= 0.95; // Decay

        // Create signal particles
        if (Math.abs(this.signal) > 0.5 && Math.random() < 0.1) {
          this.particles.push({
            progress: 0,
            speed: 0.02 + Math.random() * 0.03,
            intensity: Math.abs(this.signal)
          });
        }

        // Update particles
        this.particles = this.particles.filter(particle => {
          particle.progress += particle.speed;
          return particle.progress <= 1;
        });
      }

      draw(ctx) {
        const dx = this.nodeB.x - this.nodeA.x;
        const dy = this.nodeB.y - this.nodeA.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Connection line
        ctx.beginPath();
        ctx.moveTo(this.nodeA.x, this.nodeA.y);
        ctx.lineTo(this.nodeB.x, this.nodeB.y);
        ctx.strokeStyle = `rgba(0, 153, 255, ${0.2 + Math.abs(this.signal) * 0.3})`;
        ctx.lineWidth = 1 + Math.abs(this.weight);
        ctx.stroke();

        // Signal particles
        this.particles.forEach(particle => {
          const x = this.nodeA.x + dx * particle.progress;
          const y = this.nodeA.y + dy * particle.progress;
          
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 255, 136, ${particle.intensity})`;
          ctx.fill();
          
          // Particle trail
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 255, 136, ${particle.intensity * 0.3})`;
          ctx.fill();
        });
      }
    }

    const initializeNetwork = () => {
      nodes = [];
      connections = [];
      
      const width = canvas.width;
      const height = canvas.height;
      const layers = 4;
      const nodesPerLayer = [8, 12, 10, 6]; // Input, Hidden1, Hidden2, Output
      
      // Create nodes
      for (let layer = 0; layer < layers; layer++) {
        const layerNodeCount = nodesPerLayer[layer];
        const x = (width / (layers - 1)) * layer;
        
        for (let i = 0; i < layerNodeCount; i++) {
          const y = (height / (layerNodeCount + 1)) * (i + 1);
          const skill = (layer === 0 && skills[i]) ? skills[i] : null;
          nodes.push(new NeuralNode(x, y, layer, skill));
        }
      }

      // Create connections
      for (let layer = 0; layer < layers - 1; layer++) {
        const currentLayerNodes = nodes.filter(n => n.layer === layer);
        const nextLayerNodes = nodes.filter(n => n.layer === layer + 1);
        
        currentLayerNodes.forEach(nodeA => {
          nextLayerNodes.forEach(nodeB => {
            if (Math.random() < 0.7) { // 70% connection probability
              connections.push(new NeuralConnection(nodeA, nodeB));
            }
          });
        });
      }

      setNetworkData({ nodes, connections });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw connections
      connections.forEach(connection => {
        connection.update();
        connection.draw(ctx);
      });
      
      // Update and draw nodes
      nodes.forEach(node => {
        node.update();
        node.draw(ctx);
      });

      // Learning progress simulation
      if (isActive) {
        setLearningProgress(prev => (prev + 0.5) % 100);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Mouse interaction
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      // Find closest node
      let closestNode = null;
      let closestDistance = Infinity;
      
      nodes.forEach(node => {
        const distance = Math.sqrt((mouseX - node.x) ** 2 + (mouseY - node.y) ** 2);
        if (distance < 30 && distance < closestDistance) {
          closestDistance = distance;
          closestNode = node;
        }
      });
      
      if (closestNode !== activeNode) {
        setActiveNode(closestNode);
        
        // Activate connected nodes
        if (closestNode) {
          connections.forEach(conn => {
            if (conn.nodeA === closestNode || conn.nodeB === closestNode) {
              conn.nodeA.targetActivation = 1;
              conn.nodeB.targetActivation = 1;
            }
          });
        }
      }
    };

    const handleMouseLeave = () => {
      setActiveNode(null);
      // Reset all nodes
      nodes.forEach(node => {
        node.targetActivation = Math.random() * 0.5 + 0.3;
      });
    };

    // Event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', resizeCanvas);

    // Initialize
    resizeCanvas();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [skills, isActive]);

  return (
    <div className="neural-network-container">
      <canvas 
        ref={canvasRef} 
        className="neural-network-canvas"
      />
      
      {/* Network Stats Overlay */}
      <div className="network-stats">
        <div className="stat-item">
          <span className="stat-label">Nodes:</span>
          <span className="stat-value">{networkData.nodes.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Connections:</span>
          <span className="stat-value">{networkData.connections.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Learning:</span>
          <span className="stat-value">{Math.round(learningProgress)}%</span>
        </div>
      </div>

      {/* Active Node Info */}
      {activeNode && activeNode.skill && (
        <div className="node-tooltip">
          <h4>{activeNode.skill}</h4>
          <div className="activation-bar">
            <div 
              className="activation-fill"
              style={{ width: `${activeNode.activation * 100}%` }}
            />
          </div>
          <p>Activation: {Math.round(activeNode.activation * 100)}%</p>
        </div>
      )}

      {/* Neural Network Title */}
      <div className="network-title">
        <span className="title-text">NEURAL SKILL MATRIX</span>
        <span className="title-subtitle">Hover to explore neural pathways</span>
      </div>
    </div>
  );
};

export default NeuralNetwork;
