import React, { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, OrbitControls, Stars, Text } from "@react-three/drei";
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

// Define constellations with their TLE URLs and properties
const constellations = [
  {
    name: "ISS",
    url: "https://celestrak.org/NORAD/elements/gp.php?GROUP=stations&FORMAT=tle",
    filter: (name: string | string[]) => name.includes("ISS"),
    color: "#00ff00",
    size: 1.2,
    type: "ISS",
    description: "International Space Station",
  },
  {
    name: "Starlink",
    url: "https://celestrak.org/NORAD/elements/gp.php?GROUP=starlink&FORMAT=tle",
    color: "#ff6b6b",
    size: 0.25,
    type: "Starlink",
    description: "High-Speed Internet Constellation",
  },
  {
    name: "OneWeb",
    url: "https://celestrak.org/NORAD/elements/gp.php?GROUP=oneweb&FORMAT=tle",
    color: "#4ecdc4",
    size: 0.3,
    type: "OneWeb",
    description: "Global Internet Constellation",
  },
  {
    name: "GPS",
    url: "https://celestrak.org/NORAD/elements/gp.php?GROUP=gps-ops&FORMAT=tle",
    color: "#ffd93d",
    size: 0.4,
    type: "GPS",
    description: "US Navigation Satellites",
  },
  {
    name: "Galileo",
    url: "https://celestrak.org/NORAD/elements/gp.php?GROUP=galileo&FORMAT=tle",
    color: "#6c5ce7",
    size: 0.4,
    type: "Galileo",
    description: "European Navigation Satellites",
  },
  {
    name: "GLONASS",
    url: "https://celestrak.org/NORAD/elements/gp.php?GROUP=glo-ops&FORMAT=tle",
    color: "#ff7675",
    size: 0.4,
    type: "GLONASS",
    description: "Russian Navigation Satellites",
  },
  {
    name: "GEO",
    url: "https://celestrak.org/NORAD/elements/gp.php?GROUP=geo&FORMAT=tle",
    color: "#fd79a8",
    size: 0.5,
    type: "GEO",
    description: "Geostationary Satellites",
  },
  {
    name: "Visual",
    url: "https://celestrak.org/NORAD/elements/gp.php?GROUP=visual&FORMAT=tle",
    typeMapper: (name: string | string[]) => {
      if (name.includes("SENTINEL")) return "Sentinel";
      if (name.includes("HUBBLE")) return "Science";
      return "Visual";
    },
    colorMapper: (type: string) => {
      if (type === "Sentinel") return "#a29bfe";
      if (type === "Science") return "#fdcb6e";
      return "#ffffff";
    },
    size: 0.6,
    description: "Visible Satellites",
  },
  {
    name: "Amateur",
    url: "https://celestrak.org/NORAD/elements/gp.php?GROUP=amateur&FORMAT=tle",
    color: "#ff00ff",
    size: 0.3,
    type: "Amateur",
    description: "Amateur Radio Satellites",
  },
  {
    name: "CubeSat",
    url: "https://celestrak.org/NORAD/elements/gp.php?GROUP=cubesat&FORMAT=tle",
    color: "#e26c34",
    size: 0.2,
    type: "CubeSat",
    description: "CubeSat Constellation",
  },
  {
    name: "Iridium",
    url: "https://celestrak.org/NORAD/elements/gp.php?GROUP=iridium&FORMAT=tle",
    color: "#ff0000",
    size: 0.4,
    type: "Iridium",
    description: "Iridium NEXT Constellation",
  },
  {
    name: "Weather",
    url: "https://celestrak.org/NORAD/elements/gp.php?GROUP=weather&FORMAT=tle",
    color: "#00ff00",
    size: 0.5,
    type: "Weather",
    description: "Weather Satellites",
  },
  {
    name: "NOAA",
    url: "https://celestrak.org/NORAD/elements/gp.php?GROUP=noaa&FORMAT=tle",
    color: "#ffff00",
    size: 0.5,
    type: "NOAA",
    description: "NOAA Satellites",
  },
];

export type SatelliteTle = {
  name: string;
  line1: string;
  line2: string;
  id: string;
  color: string;
  size: number;
  type: string | undefined;
  description: string;
};

interface SatelliteProps {
  tle: SatelliteTle;
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
        positionAndVelocity &&
        positionAndVelocity.position &&
        typeof positionAndVelocity.position !== "boolean"
      ) {
        const gmst = satellite.gstime(time);
        const positionEci = positionAndVelocity.position;
        const positionEcf = satellite.eciToEcf(positionEci, gmst);

        const scale = 0.001;
        const x = positionEcf.x * scale;
        const y = positionEcf.z * scale;
        const z = -positionEcf.y * scale;

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
        <sphereGeometry args={[tle.size * 0.1, 8, 8]} />
        <meshBasicMaterial color={tle.color} />
      </mesh>
      {showLabels && (
        <Billboard>
          <Text
            position={[0, tle.size * 0.1, 0]}
            fontSize={0.15}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {tle.name}
          </Text>
        </Billboard>
      )}
    </group>
  );
};

interface InstancedSatellitesProps {
  satellites: SatelliteTle[];
  time: Date;
  selectedType: string | null;
}

const InstancedSatellites: React.FC<InstancedSatellitesProps> = ({
  satellites,
  time,
  selectedType,
}) => {
  // Group satellites by color
  const groups = useMemo(() => {
    const map = new Map<string, SatelliteTle[]>();
    satellites.forEach((sat) => {
      if (selectedType && sat.type !== selectedType) return;
      if (!map.has(sat.color)) map.set(sat.color, []);
      map.get(sat.color)!.push(sat);
    });
    return Array.from(map.entries());
  }, [satellites, selectedType]);

  return (
    <>
      {groups.map(([color, sats]) => (
        <GroupedInstancedMesh
          key={color}
          color={color}
          sats={sats}
          time={time}
        />
      ))}
    </>
  );
};

// Update Earth props to accept timeSpeed
const Earth: React.FC<{ timeSpeed: number }> = ({ timeSpeed }) => {
  const earthRef = useRef<THREE.Mesh>(null);
  const [earthTexture, setEarthTexture] = useState<THREE.Texture | null>(null);
  const [_, setTextureError] = useState(false);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");

    const url = import.meta.env.BASE_URL + "/1_earth_8k.jpg";
    loader.load(
      url,
      (tex) => {
        (tex as any).encoding = (THREE as any).sRGBEncoding;
        tex.flipY = true;
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.needsUpdate = true;
        setEarthTexture(tex);
        setTextureError(false);

        console.log(
          "Earth texture loaded:",
          tex.image.width,
          "×",
          tex.image.height
        );
      },
      (xhr) => {
        // optional: track progress
        console.log(`Loading: ${Math.round((xhr.loaded / xhr.total) * 100)}%`);
      },
      (errEvent) => {
        setTextureError(true);
        setEarthTexture(null);
        console.error("Earth texture failed to load", errEvent);
      }
    );
  }, []);

  // Earth's sidereal day in seconds
  // const EARTH_ROTATION_PERIOD = 86164; // seconds
  // const ROTATION_PER_SEC = (2 * Math.PI) / EARTH_ROTATION_PERIOD;

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y +=
        ((2 * Math.PI) / 86164) * delta * timeSpeed;
    }
  });

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[6.371, 64, 32]} />
      {earthTexture ? (
        // Option 1: Use meshStandardMaterial (responds to lighting)
        <meshStandardMaterial
          map={earthTexture}
          transparent={false}
          // Adjust these values to control how the Earth looks with lighting
          roughness={0.8}
          metalness={0.1}
        />
      ) : (
        // Option 2: Use emissive meshBasicMaterial (glows in the dark)
        // <meshBasicMaterial
        //   map={earthTexture}
        //   transparent={false}
        //   emissive="#222222"  // Add some glow
        //   emissiveMap={earthTexture}
        //   emissiveIntensity={0.3}
        // />
        <meshBasicMaterial color="hotpink" />
      )}
    </mesh>
  );
};

const Scene: React.FC<{
  time: Date;
  showLabels: boolean;
  selectedType: string | null;
  satellites: SatelliteTle[];
  timeSpeed: number;
}> = ({ time, showLabels, selectedType, satellites, timeSpeed }) => {
  // Only show labels for the first 10 satellites for performance
  const satellitesWithLabels = showLabels ? satellites.slice(0, 10) : [];

  return (
    <>
      <ambientLight intensity={1.0} />
      <directionalLight position={[50, 50, 50]} intensity={2.5} castShadow />
      <pointLight position={[100, 100, 100]} intensity={1.2} />
      <Stars
        radius={500}
        depth={50}
        count={8000}
        factor={4}
        saturation={0}
        fade
      />
      <Earth timeSpeed={timeSpeed} />
      <InstancedSatellites
        satellites={satellites}
        time={time}
        selectedType={selectedType}
      />
      {satellitesWithLabels.map((tle) => (
        <Satellite
          key={tle.id}
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

interface GroupedInstancedMeshProps {
  color: string;
  sats: SatelliteTle[];
  time: Date;
}

const GroupedInstancedMesh: React.FC<GroupedInstancedMeshProps> = ({
  color,
  sats,
  time,
}) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    if (!meshRef.current) return;
    sats.forEach((tle, i) => {
      const satrec = satellite.twoline2satrec(tle.line1, tle.line2);
      const posVel = satellite.propagate(satrec, time);
      if (posVel && posVel.position && typeof posVel.position !== "boolean") {
        const gmst = satellite.gstime(time);
        const ecf = satellite.eciToEcf(posVel.position, gmst);
        const scale = 0.001;
        const x = ecf.x * scale;
        const y = ecf.z * scale;
        const z = -ecf.y * scale;
        const matrix = new THREE.Matrix4().setPosition(x, y, z);
        meshRef.current!.setMatrixAt(i, matrix);
      }
    });
    meshRef.current!.instanceMatrix.needsUpdate = true;
  }, [sats, time]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, sats.length]}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshBasicMaterial color={color} />
    </instancedMesh>
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
  const [timeSpeed, setTimeSpeed] = useState(5);
  type SatelliteTle = {
    name: string;
    line1: string;
    line2: string;
    id: string;
    color: string;
    size: number;
    type: string | undefined;
    description: string;
  };
  const [satellites, setSatellites] = useState<SatelliteTle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTleData = async () => {
      const allTle = [];
      const existingIds = new Set();
      for (const constellation of constellations) {
        try {
          const response = await fetch(
            "https://corsproxy.io/?" + constellation.url
          );
          const text = await response.text();
          const lines = text.split("\n");
          for (let i = 0; i < lines.length; i += 3) {
            const name = lines[i]?.trim();
            const line1 = lines[i + 1]?.trim();
            const line2 = lines[i + 2]?.trim();
            if (name && line1 && line2) {
              const id = line1.substring(2, 7).trim();
              if (
                !existingIds.has(id) &&
                (!constellation.filter || constellation.filter(name))
              ) {
                existingIds.add(id);
                let tleType = constellation.type;
                if (constellation.typeMapper) {
                  tleType = constellation.typeMapper(name);
                }
                const legend = satelliteTypes.find((s) => s.type === tleType);
                allTle.push({
                  name,
                  line1,
                  line2,
                  id,
                  color: legend
                    ? legend.color
                    : constellation.colorMapper
                    ? constellation.colorMapper(tleType ?? "")
                    : constellation.color,
                  size: constellation.size,
                  type: tleType,
                  description: constellation.description,
                });
              }
            }
          }
        } catch (error) {
          console.warn(`Error fetching TLE for ${constellation.name}:`, error);
        }
      }
      setSatellites(allTle);
      setLoading(false);
    };
    fetchTleData();
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        // Advance by real elapsed time * speed
        return new Date(prev.getTime() + timeSpeed * 100);
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying, timeSpeed]);

  const resetTime = () => {
    setCurrentTime(new Date());
  };

  const satelliteTypes = [
    { type: "ISS", color: "#00ff00", icon: SatelliteIcon },
    { type: "Starlink", color: "#ff6b6b", icon: Zap },
    { type: "OneWeb", color: "#4ecdc4", icon: Globe },
    { type: "GPS", color: "#ffd93d", icon: SatelliteIcon },
    { type: "Galileo", color: "#6c5ce7", icon: SatelliteIcon },
    { type: "GLONASS", color: "#ff7675", icon: SatelliteIcon },
    { type: "GEO", color: "#fd79a8", icon: SatelliteIcon },
    { type: "Sentinel", color: "#a29bfe", icon: SatelliteIcon },
    { type: "Science", color: "#fdcb6e", icon: SatelliteIcon },
    { type: "Amateur", color: "#ff00ff", icon: SatelliteIcon },
    { type: "CubeSat", color: "#e26c34", icon: SatelliteIcon },
    { type: "Iridium", color: "#ff0000", icon: SatelliteIcon },
    { type: "Weather", color: "#00ff00", icon: SatelliteIcon },
    { type: "NOAA", color: "#ffff00", icon: SatelliteIcon },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex flex-col">
      <div className="flex justify-between items-center p-6 bg-slate-900/90 border-b border-slate-700">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">
            3D Visualization - Global Satellite Constellations
          </h2>
          <p className="text-slate-300 text-sm">
            Real-time TLE Data • {satellites.length} Satellites Tracked •
            Inspired by Heavens Above
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-slate-400 hover:text-white transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
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
          <label className="text-white text-sm">Speed:</label>
          <select
            value={timeSpeed}
            onChange={(e) => setTimeSpeed(Number(e.target.value))}
            className="bg-slate-700 text-white px-3 py-1 rounded border border-slate-600"
          >
            <option value={1}>1x</option>
            <option value={5}>5x</option>
            <option value={10}>10x</option>
            <option value={50}>50x</option>
            <option value={100}>100x</option>
            <option value={500}>500x</option>
            <option value={1000}>1 000x</option>
            <option value={5000}>5 000x</option>
            <option value={10000}>10 000x</option>
          </select>
        </div>
        <label className="flex items-center gap-2 text-white">
          <input
            type="checkbox"
            checked={showLabels}
            onChange={(e) => setShowLabels(e.target.checked)}
            className="rounded"
          />
          Satellite Names
        </label>
        <button
          onClick={() => setSelectedType(null)}
          className={`px-3 py-1 rounded text-sm transition-colors ${
            selectedType === null
              ? "bg-violet-500 text-white"
              : "bg-slate-600 text-slate-300 hover:bg-slate-500"
          }`}
        >
          All
        </button>
        <div className="ml-auto text-white text-sm">
          {currentTime.toLocaleString("en-US")}
        </div>
      </div>
      <div className="flex-1 relative">
        {loading ? (
          <div className="text-white text-center mt-48">Loading...</div>
        ) : (
          <Canvas camera={{ position: [0, 0, 25], fov: 60 }}>
            <Scene
              time={currentTime}
              showLabels={showLabels}
              selectedType={selectedType}
              satellites={satellites}
              timeSpeed={timeSpeed}
            />
          </Canvas>
        )}
        <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-sm rounded-lg p-4 border border-slate-700 max-w-xs">
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
            <Info className="h-4 w-4" />
            Constellations ({satellites.length} satellites)
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
                  <span className="text-slate-300 ml-auto text-xs">
                    {satellites.filter((s) => s.type === sat.type).length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
          <h3 className="text-white font-bold mb-3">Orbital Statistics</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-300">LEO (&lt; 2000km):</span>
              <span className="text-white font-semibold">~90%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300 pr-2">MEO (2000-35786km):</span>
              <span className="text-white font-semibold">~02%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">GEO (35786km):</span>
              <span className="text-white font-semibold">~08%</span>
            </div>
            <hr className="border-slate-600 my-2" />
            <div className="flex justify-between">
              <span className="text-slate-300">Total visible:</span>
              <span className="text-violet-400 font-bold">
                {satellites.length}
              </span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
          <h3 className="text-white font-bold mb-2">3D Controls</h3>
          <div className="space-y-1 text-sm text-slate-300">
            <div>🖱️ Left Click + Drag: Rotate</div>
            <div>🎯 Scroll: Zoom</div>
            <div>🖱️ Right Click + Drag: Pan</div>
            <div>🎮 Click Constellation: Filter</div>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-sm rounded-lg p-4 border border-slate-700 max-w-sm">
          <h3 className="text-white font-bold mb-2">About</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            This visualization showcases major satellite constellations in Earth
            orbit. TLE data is sourced in real-time, representing accurate
            orbital positions. Inspired by professional tools like Heavens
            Above.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EarthVisualization;
