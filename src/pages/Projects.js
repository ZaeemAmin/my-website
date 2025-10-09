// src/pages/Projects.js
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, X, RefreshCw } from 'lucide-react';
import LazyImage from '../components/LazyImage';
import './Projects.css';

const projects = [
  {
    title: "PokeMatcher",
    description: "Engineered an iOS application with Swift and Core ML matching users to Pokémon through facial feature analysis, processing 100+ facial features and traits to succeed 98% detection. Integrated a RESTful API system connected to PokeAPI database with over 1000 Pokémon type matching and machine learning-based recommendation engine, processing 50ms response time.",
    technologies: ["Swift", "Core ML", "RESTful API", "iOS"],
    github: "https://github.com/ZaeemAmin/PokemonMatcherApp",
    demo: "web-demo",
    image: "/projects/pokematcher.png"
  },
  {
    title: "Portfolio Website",
    description: "Architected a portfolio website using React.js, HTML, and JavaScript with modern web practices through Vercel implementation while maintaining sub-2 second load times across all devices. Executed a component-based architecture with Redux, custom hooks, and automated testing achieving 90% code coverage, while integrating CI/CD pipeline through GitHub Actions.",
    technologies: ["React.js", "JavaScript", "HTML/CSS", "Vercel"],
    github: "https://github.com/ZaeemAmin/portfolio-website",
    demo: "https://your-portfolio-url.vercel.app",
    image: "/projects/portfolio.png"
  },
  {
    title: "Rubik's Cube Solver",
    description: "Enhanced existing Java-based Rubik's cube simulator by utilizing CFOP method, advanced algorithms, reducing computation time by 75% and optimizing machine learning predictions. Transforming cube mechanics with refined turn speed algorithm and customized movement patterns, reducing average solution steps from 100+ to 65 moves and increasing color neutrality.",
    technologies: ["Java", "Machine Learning"],
    github: "https://github.com/ZaeemAmin/rubiks-cube-solver",
    demo: null,
    image: "/projects/rubiks-cube.png"
  },
  {
    title: "Minesweeper",
    description: "Constructed a Java-based Minesweeper featuring recursive tile reveal algorithm, efficient mine detection system using 2D arrays with O(1) lookup time, and adaptive difficulty scaling. Engineered a comprehensive game management system with MongoDB integration for persistent storage, real-time analytics tracking player patterns, and custom sprite rendering engine.",
    technologies: ["Java", "MongoDB"],
    github: "https://github.com/ZaeemAmin/minesweeper",
    demo: null,
    image: "/projects/minesweeper.png"
  }
];

const PokemonMatcherModal = ({ isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [matchedPokemon, setMatchedPokemon] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisMessage, setAnalysisMessage] = useState('');
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const typeColors = {
    normal: '#A8A878', fire: '#F08030', water: '#6890F0',
    grass: '#78C850', electric: '#F8D030', ice: '#98D8D8',
    fighting: '#C03028', poison: '#A040A0', ground: '#E0C068',
    flying: '#A890F0', psychic: '#F85888', bug: '#A8B820',
    rock: '#B8A038', ghost: '#705898', dragon: '#7038F8',
    dark: '#705848', steel: '#B8B8D0', fairy: '#EE99AC'
  };

  const typePersonalities = {
    normal: "Adaptable and easygoing, you're reliable and down-to-earth.",
    fire: "Passionate and energetic, you have a fiery spirit and unwavering determination.",
    water: "Calm and reflective, you adapt to change and flow around obstacles with grace.",
    grass: "Nurturing and patient, you're connected to nature and growth.",
    electric: "Energetic and quick-thinking, you light up the room with your presence.",
    ice: "Cool and collected, you maintain composure even in heated situations.",
    fighting: "Determined and disciplined, you face challenges head-on with courage.",
    poison: "Perceptive and transformative, you can turn negative situations into positive ones.",
    ground: "Stable and practical, you're well-grounded and provide support to others.",
    flying: "Free-spirited and perspective-minded, you see the bigger picture in life.",
    psychic: "Intuitive and thoughtful, you have deep insight into people and situations.",
    bug: "Resilient and hardworking, you're persistent in achieving your goals.",
    rock: "Solid and dependable, you're a steadfast presence others can rely on.",
    ghost: "Mysterious and insightful, you see beyond the surface of situations.",
    dragon: "Majestic and powerful, you have natural leadership qualities and inner strength.",
    dark: "Strategic and resourceful, you think outside conventional boundaries.",
    steel: "Resilient and principled, you have unwavering determination and values.",
    fairy: "Charming and compassionate, you bring light and joy to those around you."
  };

  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      setCameraStream(stream);
      setShowCamera(true);
      
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play().catch(err => {
              console.error('Error playing video:', err);
            });
          };
        }
      }, 100);
    } catch (err) {
      console.error('Camera error:', err);
      alert('Unable to access camera. Please check permissions.');
      setShowCamera(false);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    if (canvas && video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      
      const imageDataUrl = canvas.toDataURL('image/jpeg');
      setSelectedImage(imageDataUrl);
      analyzePokemon(imageDataUrl);
      stopCamera();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        analyzePokemon(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImageColors = (imageData) => {
    const data = imageData.data;
    const colorBuckets = {};
    
    for (let i = 0; i < data.length; i += 16) {
      const r = Math.floor(data[i] / 51) * 51;
      const g = Math.floor(data[i + 1] / 51) * 51;
      const b = Math.floor(data[i + 2] / 51) * 51;
      const key = `${r},${g},${b}`;
      colorBuckets[key] = (colorBuckets[key] || 0) + 1;
    }
    
    const totalPixels = data.length / 4;
    const sortedColors = Object.entries(colorBuckets)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([color, count]) => {
        const [r, g, b] = color.split(',').map(Number);
        return { 
          r: r / 255, 
          g: g / 255, 
          b: b / 255,
          percentage: count / totalPixels
        };
      });
    
    return sortedColors;
  };

  const hashImage = (imageData) => {
    const data = imageData.data;
    let hashValue = 0;
    const sampleDensity = 12;
    const width = imageData.width;
    const height = imageData.height;
    
    for (let y = 0; y < sampleDensity; y++) {
      for (let x = 0; x < sampleDensity; x++) {
        const pixelX = Math.floor((width * x) / sampleDensity);
        const pixelY = Math.floor((height * y) / sampleDensity);
        const pixelIndex = ((width * pixelY) + pixelX) * 4;
        
        const r = data[pixelIndex] || 0;
        const g = data[pixelIndex + 1] || 0;
        const b = data[pixelIndex + 2] || 0;
        
        hashValue = (hashValue * 31 + r) & 0xFFFFFFFF;
        hashValue = (hashValue * 37 + g) & 0xFFFFFFFF;
        hashValue = (hashValue * 41 + b) & 0xFFFFFFFF;
      }
    }
    
    return Math.abs(hashValue);
  };

  const rgbToHsv = (r, g, b) => {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    
    let h = 0;
    if (delta !== 0) {
      if (max === r) h = ((g - b) / delta) % 6;
      else if (max === g) h = (b - r) / delta + 2;
      else h = (r - g) / delta + 4;
      h /= 6;
      if (h < 0) h += 1;
    }
    
    const s = max === 0 ? 0 : delta / max;
    const v = max;
    
    return { h, s, v };
  };

  const calculateEnvironmentalScores = (colors) => {
    const scores = {};
    const types = ['normal', 'fire', 'water', 'grass', 'electric', 'ice',
                  'fighting', 'poison', 'ground', 'flying', 'psychic',
                  'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];
    
    types.forEach(type => {
      scores[type] = colors.reduce((sum, color) => {
        const { h, s, v } = rgbToHsv(color.r, color.g, color.b);
        let score = 0;
        
        switch (type) {
          case 'normal':
            if ((h >= 0.05 && h <= 0.12) && s < 0.5 && v > 0.7) score = color.percentage * 2.0;
            break;
          case 'fire':
            if ((h <= 0.05 || h >= 0.95 || (h >= 0.05 && h <= 0.12)) && s > 0.5 && v > 0.5) 
              score = color.percentage * 2.0;
            break;
          case 'water':
            if (h >= 0.5 && h <= 0.65 && s > 0.3) score = color.percentage * 2.0;
            break;
          case 'grass':
            if (h >= 0.25 && h <= 0.40 && s > 0.3) score = color.percentage * 2.0;
            break;
          case 'electric':
            if (h >= 0.12 && h <= 0.18 && s > 0.5 && v > 0.7) score = color.percentage * 2.0;
            break;
          case 'ice':
            if (((h >= 0.5 && h <= 0.6) && s < 0.3 && v > 0.7) || (s < 0.1 && v > 0.85))
              score = color.percentage * 1.9;
            break;
          case 'fighting':
            if (((h <= 0.05 || h >= 0.95) && s > 0.4 && v < 0.6) || 
                ((h >= 0.05 && h <= 0.08) && s > 0.5 && v < 0.5))
              score = color.percentage * 1.8;
            break;
          case 'poison':
            if (((h >= 0.7 && h <= 0.85) && s > 0.3) || 
                ((h >= 0.35 && h <= 0.45) && s > 0.7))
              score = color.percentage * 1.8;
            break;
          case 'ground':
            if (((h >= 0.05 && h <= 0.12) && s > 0.3 && v < 0.7) ||
                ((h >= 0.08 && h <= 0.15) && s > 0.2 && v < 0.6))
              score = color.percentage * 1.8;
            break;
          case 'flying':
            if (((h >= 0.5 && h <= 0.65) && v > 0.7) || (s < 0.1 && v > 0.9))
              score = color.percentage * 1.5;
            break;
          case 'psychic':
            if ((h >= 0.8 && h <= 0.95 && s > 0.3) || 
                ((h >= 0.7 && h <= 0.8) && v > 0.7 && s > 0.3))
              score = color.percentage * 1.9;
            break;
          case 'bug':
            if (((h >= 0.2 && h <= 0.4) && s > 0.3) ||
                ((h >= 0.05 && h <= 0.15) && s > 0.3 && v < 0.6))
              score = color.percentage * 1.8;
            break;
          case 'rock':
            if ((s < 0.3 && (v >= 0.3 && v <= 0.6)) ||
                ((h >= 0.05 && h <= 0.10) && s < 0.4 && v < 0.6))
              score = color.percentage * 1.7;
            break;
          case 'ghost':
            if (((h >= 0.7 && h <= 0.85) && s > 0.2) ||
                ((h >= 0.6 && h <= 0.7) && s > 0.2 && v < 0.5))
              score = color.percentage * 2.0;
            break;
          case 'dragon':
            if ((((h >= 0.5 && h <= 0.7) || (h <= 0.05 || h >= 0.95)) &&
                 s > 0.5 && v > 0.4))
              score = color.percentage * 1.8;
            break;
          case 'dark':
            if (((h >= 0.6 && h <= 0.95) || h <= 0.05 || h >= 0.95) &&
                s > 0.2 && v < 0.4)
              score = color.percentage * 2.0;
            break;
          case 'steel':
            if (s < 0.2 && (v >= 0.3 && v <= 0.7) &&
                !((h >= 0.05 && h <= 0.12) && s > 0.1))
              score = color.percentage * 1.8;
            break;
          case 'fairy':
            if (((h >= 0.8 && h <= 0.95) && v > 0.7) ||
                ((s < 0.3 && v > 0.8) && !(h >= 0.5 && h <= 0.65)))
              score = color.percentage * 1.9;
            break;
          default:
            score = 0;
        }
        
        return sum + score;
      }, 0);
    });
    
    return scores;
  };

  const createFeatureFingerprint = (pokemon, imageHash) => {
    let fingerprint = 0;
    let componentCount = 0;
    
    pokemon.types.forEach(typeElement => {
      const type = typeElement.type.name;
      
      switch (type) {
        case 'normal':
          fingerprint += 0.0717311;
          componentCount += 1;
          break;
        case 'fighting':
          fingerprint += 0.0811527;
          componentCount += 1;
          break;
        case 'psychic':
          fingerprint += 0.0619163;
          fingerprint += 0.0953849;
          componentCount += 2;
          break;
        case 'fairy':
          fingerprint += 0.0917957;
          componentCount += 1;
          break;
        case 'dark':
          fingerprint += 0.0613869;
          componentCount += 1;
          break;
        case 'dragon':
          fingerprint += 0.0817673;
          componentCount += 1;
          break;
        case 'flying':
          fingerprint += 0.0518119;
          componentCount += 1;
          break;
        case 'rock':
        case 'steel':
          fingerprint += 0.0615217;
          componentCount += 1;
          break;
        case 'ghost':
          fingerprint += 0.0413273;
          componentCount += 1;
          break;
        default:
          fingerprint += 0.0413869;
          componentCount += 1;
      }
    });
    
    fingerprint += (imageHash % 1000) / 1000.0 * 0.0573631;
    componentCount += 1;
    
    fingerprint = fingerprint / componentCount;
    
    return fingerprint - Math.floor(fingerprint);
  };

  const scorePokemonList = (allPokemon, envScores, imageHash) => {
    return allPokemon.map(pokemon => {
      let environmentScore = 0;
      pokemon.types.forEach(typeElement => {
        environmentScore += envScores[typeElement.type.name] || 0;
      });
      
      const maxEnvironmentScore = 2.0 * pokemon.types.length;
      const normalizedEnvironmentScore = (environmentScore / maxEnvironmentScore) * 0.35;
      
      const featureFingerprint = createFeatureFingerprint(pokemon, imageHash);
      
      const totalScore = normalizedEnvironmentScore + featureFingerprint * 0.65;
      
      return { pokemon, score: totalScore };
    }).sort((a, b) => b.score - a.score);
  };

  const analyzePokemon = async (imageData) => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setAnalysisMessage('Analyzing image...');
    
    const img = new Image();
    img.src = imageData;
    
    await new Promise(resolve => {
      img.onload = resolve;
    });
    
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    
    setAnalysisProgress(25);
    await new Promise(r => setTimeout(r, 500));
    
    setAnalysisMessage('Detecting colors and environment...');
    const imageData2 = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const dominantColors = analyzeImageColors(imageData2);
    const envScores = calculateEnvironmentalScores(dominantColors);
    
    setAnalysisProgress(50);
    await new Promise(r => setTimeout(r, 500));
    
    setAnalysisMessage('Analyzing features...');
    const imageHash = hashImage(imageData2);
    
    setAnalysisProgress(75);
    await new Promise(r => setTimeout(r, 500));
    
    setAnalysisMessage('Finding your Pokémon match...');
    setAnalysisProgress(85);
    
    try {
      const topTypes = Object.entries(envScores)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([type]) => type);
      
      const allPokemonPromises = topTypes.map(type =>
        fetch(`https://pokeapi.co/api/v2/type/${type}`)
          .then(res => res.json())
          .then(data => data.pokemon.slice(0, 30))
      );
      
      const allTypePokemon = await Promise.all(allPokemonPromises);
      const uniquePokemon = new Map();
      
      allTypePokemon.flat().forEach(p => {
        uniquePokemon.set(p.pokemon.name, p.pokemon.url);
      });
      
      setAnalysisProgress(90);
      await new Promise(r => setTimeout(r, 300));
      
      const pokemonDetailsPromises = Array.from(uniquePokemon.values())
        .slice(0, 50)
        .map(url => fetch(url).then(res => res.json()));
      
      const allPokemon = await Promise.all(pokemonDetailsPromises);
      
      setAnalysisProgress(95);
      
      const scoredPokemon = scorePokemonList(allPokemon, envScores, imageHash);
      const bestMatch = scoredPokemon[0].pokemon;
      
      setMatchedPokemon({
        name: bestMatch.name,
        id: bestMatch.id,
        image: bestMatch.sprites.other['official-artwork']?.front_default || bestMatch.sprites.front_default,
        types: bestMatch.types.map(t => t.type.name),
        height: bestMatch.height,
        weight: bestMatch.weight
      });
      
      setAnalysisProgress(100);
      setAnalysisMessage('Match found!');
      await new Promise(r => setTimeout(r, 500));
      
      setIsAnalyzing(false);
    } catch (error) {
      console.error('Analysis error:', error);
      setAnalysisMessage('Error finding match. Please try again.');
      setIsAnalyzing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="pokematcher-modal-overlay" onClick={onClose}>
      <div className="pokematcher-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="pokematcher-modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        
        <h2 className="pokematcher-modal-title">PokéMatcher Web Demo</h2>
        
        <div className="pokematcher-container">
          {showCamera && (
            <div className="pokematcher-camera-preview">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted
                className="pokematcher-video-preview" 
              />
              <div className="pokematcher-camera-overlay">
                <button onClick={capturePhoto} className="pokematcher-btn pokematcher-btn-capture">
                  <Camera size={20} />
                  Capture Photo
                </button>
                <button onClick={stopCamera} className="pokematcher-btn pokematcher-btn-cancel">
                  <X size={20} />
                  Cancel
                </button>
              </div>
            </div>
          )}
          
          {!showCamera && selectedImage ? (
            <div className="pokematcher-image-container">
              <img src={selectedImage} alt="Selected" className="pokematcher-image" />
              <button 
                onClick={() => { setSelectedImage(null); setMatchedPokemon(null); }}
                className="pokematcher-image-close"
              >
                <X size={20} />
              </button>
            </div>
          ) : !showCamera && (
            <div className="pokematcher-placeholder">
              <div className="pokematcher-placeholder-content">
                <div className="pokematcher-placeholder-icon">⚡</div>
                <p>Take a photo to find your Pokémon match!</p>
              </div>
            </div>
          )}
          
          {isAnalyzing && (
            <div className="pokematcher-analysis">
              <div className="pokematcher-spinner">
                <RefreshCw className="pokematcher-spinner-icon" size={40} />
              </div>
              <div className="pokematcher-progress-bar">
                <div 
                  className="pokematcher-progress-fill"
                  style={{ width: `${analysisProgress}%` }}
                />
              </div>
              <p className="pokematcher-analysis-message">{analysisMessage}</p>
            </div>
          )}
          
          {matchedPokemon && !isAnalyzing && (
            <div className="pokematcher-result" style={{ borderColor: typeColors[matchedPokemon.types[0]] }}>
              <p className="pokematcher-result-label">You match with:</p>
              <h3 className="pokematcher-result-name" style={{ color: typeColors[matchedPokemon.types[0]] }}>
                {matchedPokemon.name}
              </h3>
              
              <img src={matchedPokemon.image} alt={matchedPokemon.name} className="pokematcher-result-image" />
              
              <div className="pokematcher-types">
                {matchedPokemon.types.map(type => (
                  <span 
                    key={type}
                    className="pokematcher-type-badge"
                    style={{ backgroundColor: typeColors[type] }}
                  >
                    {type}
                  </span>
                ))}
              </div>
              
              <div className="pokematcher-stats">
                <div className="pokematcher-stat">
                  <span>Height:</span>
                  <span>{(matchedPokemon.height / 10).toFixed(1)} m</span>
                </div>
                <div className="pokematcher-stat">
                  <span>Weight:</span>
                  <span>{(matchedPokemon.weight / 10).toFixed(1)} kg</span>
                </div>
              </div>
              
              <div className="pokematcher-personality">
                <p className="pokematcher-personality-title">Personality Match:</p>
                {matchedPokemon.types.map(type => (
                  <p key={type} className="pokematcher-personality-text">
                    • {typePersonalities[type]}
                  </p>
                ))}
              </div>
            </div>
          )}
          
          {!showCamera && (
            <div className="pokematcher-actions">
              <button onClick={startCamera} className="pokematcher-btn pokematcher-btn-camera">
                <Camera size={20} />
                Take Photo
              </button>
              
              <button onClick={() => fileInputRef.current.click()} className="pokematcher-btn pokematcher-btn-upload">
                <Upload size={20} />
                Upload Photo
              </button>
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </div>
          )}
        </div>
        
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

function Projects() {
  const [showPokeMatcherModal, setShowPokeMatcherModal] = useState(false);

  const handleDemoClick = (project) => {
    if (project.demo === 'web-demo') {
      setShowPokeMatcherModal(true);
    } else if (project.demo) {
      window.open(project.demo, '_blank');
    }
  };

  return (
    <section className="projects page-transition">
      <h2>Projects</h2>
      <motion.div 
        className="projects-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {projects.map((project, index) => (
          <motion.div 
            key={index} 
            className="project-card"
            variants={itemVariants}
          >
            <div className="project-image">
              <LazyImage src={project.image} alt={project.title} />
            </div>
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tech">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-badge">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="project-btn github-btn"
                >
                  <i className="fab fa-github"></i> GitHub
                </a>
                {project.demo && (
                  <button 
                    onClick={() => handleDemoClick(project)}
                    className="project-btn demo-btn"
                  >
                    <i className="fas fa-external-link-alt"></i> Live Demo
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <PokemonMatcherModal 
        isOpen={showPokeMatcherModal} 
        onClose={() => setShowPokeMatcherModal(false)} 
      />
    </section>
  );
}

export default Projects;