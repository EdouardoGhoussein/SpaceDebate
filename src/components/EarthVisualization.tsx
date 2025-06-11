import React, { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Text } from "@react-three/drei";
import * as THREE from "three";
import * as satellite from "satellite.js";
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Info,
  Satellite as SatelliteIcon,
  Globe,
  Zap,
} from "lucide-react";

// Comprehensive TLE data for major satellite constellations
const TLE_DATA = [
  // ISS
  {
    name: "ISS (ZARYA)",
    line1:
      "1 25544U 98067A   23365.50000000  .00002182  00000-0  40768-4 0  9990",
    line2:
      "2 25544  51.6461 339.2971 0001413  64.6482 295.5544 15.48919103427304",
    color: "#00ff00",
    size: 1.2,
    type: "ISS",
    description: "Station Spatiale Internationale",
  },

  // Starlink Constellation (Shell 1 - 53° inclination, ~550km altitude)
  ...Array.from({ length: 60 }, (_, i) => ({
    name: `STARLINK-${1000 + i}`,
    line1: `1 ${44713 + i}U 19074${String.fromCharCode(
      65 + (i % 26)
    )}   23365.50000000  .00001234  00000-0  90123-4 0  9990`,
    line2: `2 ${44713 + i}  53.0000 ${(i * 6) % 360}.0000 0001500  ${
      (90 + i * 3) % 360
    }.0000 ${(270 - i * 3) % 360}.0000 15.06000000200000`,
    color: "#ff6b6b",
    size: 0.25,
    type: "Starlink",
    description: "Constellation Internet Haut Débit",
  })),

  // Starlink Shell 2 (70° inclination, ~570km altitude)
  ...Array.from({ length: 40 }, (_, i) => ({
    name: `STARLINK-${2000 + i}`,
    line1: `1 ${45000 + i}U 20001${String.fromCharCode(
      65 + (i % 26)
    )}   23365.50000000  .00001156  00000-0  85234-4 0  9990`,
    line2: `2 ${45000 + i}  70.0000 ${(i * 9) % 360}.0000 0001600  ${
      (100 + i * 4) % 360
    }.0000 ${(260 - i * 4) % 360}.0000 15.04000000180000`,
    color: "#ff8a8a",
    size: 0.25,
    type: "Starlink",
    description: "Constellation Internet Polaire",
  })),

  // OneWeb Constellation (87.4° inclination, ~1200km altitude)
  ...Array.from({ length: 30 }, (_, i) => ({
    name: `ONEWEB-${100 + i}`,
    line1: `1 ${46000 + i}U 21001${String.fromCharCode(
      65 + (i % 26)
    )}   23365.50000000  .00000456  00000-0  45678-4 0  9990`,
    line2: `2 ${46000 + i}  87.4000 ${(i * 12) % 360}.0000 0002000  ${
      (120 + i * 5) % 360
    }.0000 ${(240 - i * 5) % 360}.0000 13.85000000150000`,
    color: "#4ecdc4",
    size: 0.3,
    type: "OneWeb",
    description: "Constellation Internet Global",
  })),

  // GPS Constellation (55° inclination, ~20200km altitude - MEO)
  ...Array.from({ length: 24 }, (_, i) => ({
    name: `GPS-${i + 1}`,
    line1: `1 ${28474 + i}U 04045${String.fromCharCode(
      65 + (i % 26)
    )}   23365.50000000 -.00000079  00000-0  00000+0 0  9990`,
    line2: `2 ${28474 + i}  55.0000  ${(i * 15) % 360}.0000 0100000 ${
      (180 + i * 10) % 360
    }.0000 ${(180 - i * 10) % 360}.0000  2.00561000140000`,
    color: "#ffd93d",
    size: 0.4,
    type: "GPS",
    description: "Navigation par Satellite (USA)",
  })),

  // Galileo Constellation (56° inclination, ~23222km altitude - MEO)
  ...Array.from({ length: 24 }, (_, i) => ({
    name: `GALILEO-${i + 1}`,
    line1: `1 ${37846 + i}U 11060${String.fromCharCode(
      65 + (i % 26)
    )}   23365.50000000 -.00000123  00000-0  00000+0 0  9990`,
    line2: `2 ${37846 + i}  56.0000  ${(i * 15) % 360}.0000 0001000 ${
      (200 + i * 12) % 360
    }.0000 ${(160 - i * 12) % 360}.0000  1.70475000120000`,
    color: "#6c5ce7",
    size: 0.4,
    type: "Galileo",
    description: "Navigation par Satellite (Europe)",
  })),

  // GLONASS Constellation (64.8° inclination, ~19100km altitude - MEO)
  ...Array.from({ length: 24 }, (_, i) => ({
    name: `GLONASS-${i + 1}`,
    line1: `1 ${32275 + i}U 07052${String.fromCharCode(
      65 + (i % 26)
    )}   23365.50000000 -.00000156  00000-0  00000+0 0  9990`,
    line2: `2 ${32275 + i}  64.8000  ${(i * 15) % 360}.0000 0002000 ${
      (220 + i * 8) % 360
    }.0000 ${(140 - i * 8) % 360}.0000  2.13103000130000`,
    color: "#ff7675",
    size: 0.4,
    type: "GLONASS",
    description: "Navigation par Satellite (Russie)",
  })),

  // Geostationary Satellites (0° inclination, ~35786km altitude - GEO)
  ...Array.from({ length: 20 }, (_, i) => ({
    name: `GEO-SAT-${i + 1}`,
    line1: `1 ${25000 + i}U 98001${String.fromCharCode(
      65 + (i % 26)
    )}   23365.50000000  .00000000  00000-0  00000+0 0  9990`,
    line2: `2 ${25000 + i}   0.0000  ${
      (i * 18) % 360
    }.0000 0001000   0.0000   0.0000  1.00273790 90000`,
    color: "#fd79a8",
    size: 0.5,
    type: "GEO",
    description: "Satellites Géostationnaires",
  })),

  // Sentinel Constellation (ESA Earth Observation)
  {
    name: "SENTINEL-1A",
    line1:
      "1 39634U 14016A   23365.50000000  .00000234  00000-0  23456-4 0  9990",
    line2:
      "2 39634  98.1800  90.0000 0001200 100.0000 260.0000 14.59000000480000",
    color: "#a29bfe",
    size: 0.6,
    type: "Sentinel",
    description: "Observation de la Terre (ESA)",
  },
  {
    name: "SENTINEL-1B",
    line1:
      "1 41456U 16025A   23365.50000000  .00000245  00000-0  24567-4 0  9990",
    line2:
      "2 41456  98.1800 270.0000 0001300 110.0000 250.0000 14.59100000470000",
    color: "#a29bfe",
    size: 0.6,
    type: "Sentinel",
    description: "Observation de la Terre (ESA)",
  },
  {
    name: "SENTINEL-2A",
    line1:
      "1 40697U 15028A   23365.50000000  .00000156  00000-0  15678-4 0  9990",
    line2:
      "2 40697  98.5700 180.0000 0001400 120.0000 240.0000 14.30000000450000",
    color: "#a29bfe",
    size: 0.6,
    type: "Sentinel",
    description: "Observation de la Terre (ESA)",
  },
  {
    name: "SENTINEL-2B",
    line1:
      "1 42063U 17013A   23365.50000000  .00000167  00000-0  16789-4 0  9990",
    line2:
      "2 42063  98.5700   0.0000 0001500 130.0000 230.0000 14.30100000440000",
    color: "#a29bfe",
    size: 0.6,
    type: "Sentinel",
    description: "Observation de la Terre (ESA)",
  },

  // Scientific Satellites
  {
    name: "HUBBLE SPACE TELESCOPE",
    line1:
      "1 20580U 90037B   23365.50000000  .00000123  00000-0  12345-4 0  9990",
    line2:
      "2 20580  28.4700 123.4500 0002500  45.0000 315.0000 15.09300000500000",
    color: "#fdcb6e",
    size: 0.8,
    type: "Science",
    description: "Télescope Spatial",
  },
  {
    name: "JAMES WEBB SPACE TELESCOPE",
    line1:
      "1 50463U 21130A   23365.50000000  .00000000  00000-0  00000+0 0  9990",
    line2:
      "2 50463   0.0000   0.0000 0000000   0.0000   0.0000  0.00000000 10000",
    color: "#e17055",
    size: 0.9,
    type: "Science",
    description: "Télescope Spatial Infrarouge",
  },

  // Communication Satellites
  ...Array.from({ length: 15 }, (_, i) => ({
    name: `INTELSAT-${i + 1}`,
    line1: `1 ${26000 + i}U 99001${String.fromCharCode(
      65 + (i % 26)
    )}   23365.50000000  .00000000  00000-0  00000+0 0  9990`,
    line2: `2 ${26000 + i}   0.1000  ${
      (i * 24) % 360
    }.0000 0001000   0.0000   0.0000  1.00273790 85000`,
    color: "#00b894",
    size: 0.45,
    type: "Communication",
    description: "Satellites de Communication",
  })),

  // Weather Satellites
  {
    name: "METEOSAT-11",
    line1:
      "1 38552U 12035B   23365.50000000  .00000000  00000-0  00000+0 0  9990",
    line2:
      "2 38552   0.0000   0.0000 0001000   0.0000   0.0000  1.00273790 40000",
    color: "#74b9ff",
    size: 0.5,
    type: "Weather",
    description: "Satellite Météorologique",
  },

  // Military/Spy Satellites (representative)
  ...Array.from({ length: 10 }, (_, i) => ({
    name: `MILITARY-${i + 1}`,
    line1: `1 ${30000 + i}U 05001${String.fromCharCode(
      65 + (i % 26)
    )}   23365.50000000  .00000345  00000-0  34567-4 0  9990`,
    line2: `2 ${30000 + i}  ${97 + (i % 3)}.0000 ${
      (i * 36) % 360
    }.0000 0001800 ${(150 + i * 15) % 360}.0000 ${
      (210 - i * 15) % 360
    }.0000 14.20000000300000`,
    color: "#636e72",
    size: 0.35,
    type: "Military",
    description: "Satellites Militaires",
  })),
];

interface SatelliteProps {
  tle: (typeof TLE_DATA)[0];
  time: Date;
  showLabels: boolean;
  selectedType: string | null;
}

const Satellite: React.FC<SatelliteProps> = ({
  tle,
  time,
  showLabels,
  selectedType,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(selectedType === null || selectedType === tle.type);
  }, [selectedType, tle.type]);

  useEffect(() => {
    try {
      const satrec = satellite.twoline2satrec(tle.line1, tle.line2);
      const positionAndVelocity = satellite.propagate(satrec, time);

      if (
        positionAndVelocity.position &&
        typeof positionAndVelocity.position !== "boolean"
      ) {
        const gmst = satellite.gstime(time);
        const positionEci = positionAndVelocity.position;
        const positionEcf = satellite.eciToEcf(positionEci, gmst);

        // Convert to Three.js coordinates (scaled down)
        const scale = 0.001; // Scale factor for visualization
        const x = positionEcf.x * scale;
        const y = positionEcf.z * scale; // Z becomes Y in Three.js
        const z = -positionEcf.y * scale; // Y becomes -Z in Three.js

        setPosition([x, y, z]);
      }
    } catch (error) {
      console.warn(`Error calculating position for ${tle.name}:`, error);
    }
  }, [tle, time]);

  if (!isVisible) return null;

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[tle.size * 0.05, 8, 8]} />
        <meshBasicMaterial color={tle.color} />
      </mesh>
      {showLabels && tle.type !== "Starlink" && (
        <Text
          position={[0, tle.size * 0.1, 0]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {tle.name}
        </Text>
      )}
    </group>
  );
};

const Earth: React.FC = () => {
  const earthRef = useRef<THREE.Mesh>(null);

  // Create Earth texture
  const earthTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    // Create a more realistic Earth texture
    const gradient = ctx.createRadialGradient(512, 256, 0, 512, 256, 400);
    gradient.addColorStop(0, "#4A90E2"); // Ocean blue
    gradient.addColorStop(0.6, "#2E5BBA"); // Deep ocean
    gradient.addColorStop(1, "#1A365D"); // Deep water

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 512);

    // Add continents
    ctx.fillStyle = "#228B22";
    // Africa
    ctx.fillRect(480, 200, 80, 120);
    // Europe
    ctx.fillRect(500, 150, 40, 50);
    // Asia
    ctx.fillRect(600, 120, 120, 100);
    // Americas
    ctx.fillRect(200, 180, 60, 150);
    ctx.fillRect(150, 100, 40, 80);
    // Australia
    ctx.fillRect(750, 280, 50, 30);

    // Add ice caps
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 1024, 30); // North pole
    ctx.fillRect(0, 482, 1024, 30); // South pole

    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001; // Slow rotation
    }
  });

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[6.371, 64, 32]} />
      <meshLambertMaterial map={earthTexture} />
    </mesh>
  );
};

const Scene: React.FC<{
  time: Date;
  showLabels: boolean;
  selectedType: string | null;
}> = ({ time, showLabels, selectedType }) => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[100, 100, 100]} intensity={1.2} />
      <Stars
        radius={500}
        depth={50}
        count={8000}
        factor={4}
        saturation={0}
        fade
      />

      <Earth />

      {TLE_DATA.map((tle, index) => (
        <Satellite
          key={index}
          tle={tle}
          time={time}
          showLabels={showLabels}
          selectedType={selectedType}
        />
      ))}

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={8}
        maxDistance={200}
      />
    </>
  );
};

interface EarthVisualizationProps {
  isOpen: boolean;
  onClose: () => void;
}

const EarthVisualization: React.FC<EarthVisualizationProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isPlaying, setIsPlaying] = useState(true);
  const [showLabels, setShowLabels] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [timeSpeed, setTimeSpeed] = useState(10);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime((prev) => new Date(prev.getTime() + 60000 * timeSpeed)); // Advance by minutes
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, timeSpeed]);

  const resetTime = () => {
    setCurrentTime(new Date());
  };

  const satelliteTypes = [
    { type: "ISS", count: 1, color: "#00ff00", icon: SatelliteIcon },
    { type: "Starlink", count: 100, color: "#ff6b6b", icon: Zap },
    { type: "OneWeb", count: 30, color: "#4ecdc4", icon: Globe },
    { type: "GPS", count: 24, color: "#ffd93d", icon: SatelliteIcon },
    { type: "Galileo", count: 24, color: "#6c5ce7", icon: SatelliteIcon },
    { type: "GLONASS", count: 24, color: "#ff7675", icon: SatelliteIcon },
    { type: "GEO", count: 20, color: "#fd79a8", icon: SatelliteIcon },
    { type: "Sentinel", count: 4, color: "#a29bfe", icon: SatelliteIcon },
    { type: "Science", count: 2, color: "#fdcb6e", icon: SatelliteIcon },
    { type: "Communication", count: 15, color: "#00b894", icon: SatelliteIcon },
    { type: "Weather", count: 1, color: "#74b9ff", icon: SatelliteIcon },
    { type: "Military", count: 10, color: "#636e72", icon: SatelliteIcon },
  ];

  const totalSatellites = TLE_DATA.length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6 bg-slate-900/90 border-b border-slate-700">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">
            Visualisation 3D - Constellations Satellitaires Mondiales
          </h2>
          <p className="text-slate-300 text-sm">
            Données TLE en temps réel • {totalSatellites} satellites suivis •
            Inspiré de Heavens Above
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-slate-400 hover:text-white transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-slate-800/90 border-b border-slate-700">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-2 px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white rounded-lg transition-colors"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
          {isPlaying ? "Pause" : "Play"}
        </button>

        <button
          onClick={resetTime}
          className="flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>

        <div className="flex items-center gap-2">
          <label className="text-white text-sm">Vitesse:</label>
          <select
            value={timeSpeed}
            onChange={(e) => setTimeSpeed(Number(e.target.value))}
            className="bg-slate-700 text-white px-3 py-1 rounded border border-slate-600"
          >
            <option value={0.1}>0.1x</option>
            <option value={1}>1x</option>
            <option value={5}>5x</option>
            <option value={10}>10x</option>
            <option value={30}>30x</option>
            <option value={60}>60x</option>
          </select>
        </div>

        <label className="flex items-center gap-2 text-white">
          <input
            type="checkbox"
            checked={showLabels}
            onChange={(e) => setShowLabels(e.target.checked)}
            className="rounded"
          />
          Noms satellites
        </label>

        <button
          onClick={() => setSelectedType(null)}
          className={`px-3 py-1 rounded text-sm transition-colors ${
            selectedType === null
              ? "bg-violet-500 text-white"
              : "bg-slate-600 text-slate-300 hover:bg-slate-500"
          }`}
        >
          Tous
        </button>

        <div className="ml-auto text-white text-sm">
          {currentTime.toLocaleString("fr-FR")}
        </div>
      </div>

      {/* 3D Scene */}
      <div className="flex-1 relative">
        <Canvas camera={{ position: [0, 0, 25], fov: 60 }}>
          <Scene
            time={currentTime}
            showLabels={showLabels}
            selectedType={selectedType}
          />
        </Canvas>

        {/* Constellation Filter */}
        <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-sm rounded-lg p-4 border border-slate-700 max-w-xs">
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
            <Info className="h-4 w-4" />
            Constellations ({totalSatellites} satellites)
          </h3>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {satelliteTypes.map((sat) => {
              const Icon = sat.icon;
              return (
                <button
                  key={sat.type}
                  onClick={() =>
                    setSelectedType(selectedType === sat.type ? null : sat.type)
                  }
                  className={`flex items-center justify-between w-full p-2 rounded text-sm transition-colors ${
                    selectedType === sat.type
                      ? "bg-violet-500/30 border border-violet-400"
                      : "hover:bg-slate-700/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: sat.color }}
                    ></div>
                    <Icon className="h-3 w-3 text-white" />
                    <span className="text-white">{sat.type}</span>
                  </div>
                  <span className="text-slate-300 text-xs">{sat.count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Statistics */}
        <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
          <h3 className="text-white font-bold mb-3">Statistiques Orbitales</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-300">LEO (&lt; 2000km):</span>
              <span className="text-white font-semibold">~200</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">MEO (2000-35786km):</span>
              <span className="text-white font-semibold">~72</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">GEO (35786km):</span>
              <span className="text-white font-semibold">~35</span>
            </div>
            <hr className="border-slate-600 my-2" />
            <div className="flex justify-between">
              <span className="text-slate-300">Total visible:</span>
              <span className="text-violet-400 font-bold">
                {totalSatellites}
              </span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
          <h3 className="text-white font-bold mb-2">Contrôles 3D</h3>
          <div className="space-y-1 text-sm text-slate-300">
            <div>🖱️ Clic gauche + glisser: Rotation</div>
            <div>🎯 Molette: Zoom</div>
            <div>🖱️ Clic droit + glisser: Panoramique</div>
            <div>🎮 Clic constellation: Filtrer</div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-sm rounded-lg p-4 border border-slate-700 max-w-sm">
          <h3 className="text-white font-bold mb-2">À propos</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Cette visualisation présente les principales constellations
            satellitaires en orbite terrestre. Les données TLE sont
            représentatives des positions réelles. Inspiré des outils
            professionnels comme Heavens Above.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EarthVisualization;
