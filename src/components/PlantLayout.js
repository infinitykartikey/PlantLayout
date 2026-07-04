import React from "react";
import { Svg, Rect, Circle, Path, Polygon, Text, G } from "react-native-svg";

const PlantLayout = ({ width = "100%", height = "100%" }) => (
  <Svg viewBox="0 0 1500 800" width={width} height={height}>

    {/* ====== Plant boundary ====== */}
    <Rect x="20" y="20" width="1460" height="760"
          fill="#f9fafb" stroke="#9ca3af" strokeWidth="3" rx="12" />

    {/* ====== Main corridor ring ====== */}
    <Rect x="100" y="100" width="1000" height="600"
          fill="none" stroke="#374151" strokeWidth="8" rx="30" />

    {/* ====== Blast Furnace ====== */}
    <G>
      <Rect x="140" y="140" width="300" height="200"
            fill="#dbeafe" stroke="#3b82f6" strokeWidth="3" rx="10"/>
      <Rect x="250" y="170" width="80" height="120" fill="black" opacity="0.2"/>
      <Rect x="270" y="150" width="40" height="30" fill="black" opacity="0.2"/>
      <Circle cx="290" cy="145" r="12" fill="gray" opacity="0.2"/>
      <Text x="290" y="220" textAnchor="middle" fontSize="20" fontWeight="700" fill="#111827">
        Blast Furnace
      </Text>
      <Rect x="435" y="220" width="20" height="28" fill="white" stroke="green" strokeWidth="3" rx="2"/>
      <Circle cx="450" cy="234" r="2" fill="green"/>
      <Rect x="275" y="330" width="20" height="28" fill="white" stroke="green" strokeWidth="3" rx="2"/>
      <Circle cx="290" cy="344" r="2" fill="green"/>
    </G>

    {/* ====== Steelmaking (BOF) ====== */}
    <G>
      <Rect x="140" y="460" width="300" height="200"
            fill="#fef3c7" stroke="#f59e0b" strokeWidth="3" rx="10"/>
      <Rect x="250" y="490" width="80" height="60" fill="black" rx="10" opacity="0.2"/>
      <Path d="M330 490 Q350 520 330 540 L300 540" fill="black" opacity="0.2"/>
      <Circle cx="330" cy="530" r="6" fill="orange" opacity="0.2"/>
      <Text x="290" y="560" textAnchor="middle" fontSize="20" fontWeight="700" fill="#111827">
        Steelmaking (BOF)
      </Text>
      <Rect x="435" y="540" width="20" height="28" fill="white" stroke="green" strokeWidth="3" rx="2"/>
      <Circle cx="450" cy="554" r="2" fill="green"/>
      <Rect x="275" y="460" width="20" height="28" fill="white" stroke="green" strokeWidth="3" rx="2"/>
      <Circle cx="290" cy="474" r="2" fill="green"/>
    </G>

    {/* ====== Rolling Mill ====== */}
    <G>
      <Rect x="760" y="140" width="300" height="200"
            fill="#e0f2fe" stroke="#0284c7" strokeWidth="3" rx="10"/>
      <Circle cx="830" cy="230" r="30" stroke="black" strokeWidth="12" fill="none" opacity="0.2"/>
      <Circle cx="910" cy="230" r="30" stroke="black" strokeWidth="12" fill="none" opacity="0.2"/>
      <Rect x="830" y="220" width="80" height="20" fill="black" opacity="0.2"/>
      <Text x="910" y="220" textAnchor="middle" fontSize="20" fontWeight="700" fill="#111827">
        Rolling Mill
      </Text>
      <Rect x="760" y="220" width="20" height="28" fill="white" stroke="green" strokeWidth="3" rx="2"/>
      <Circle cx="775" cy="234" r="2" fill="green"/>
      <Rect x="890" y="330" width="20" height="28" fill="white" stroke="green" strokeWidth="3" rx="2"/>
      <Circle cx="905" cy="344" r="2" fill="green"/>
    </G>

    {/* ====== Maintenance & Utilities ====== */}
    <G>
      <Rect x="760" y="460" width="300" height="200"
            fill="#dcfce7" stroke="#22c55e" strokeWidth="3" rx="10"/>
      <Circle cx="830" cy="540" r="25" stroke="black" strokeWidth="8" fill="none" opacity="0.2"/>
      <Rect x="850" y="560" width="60" height="12" rx="3" fill="black" opacity="0.2"/>
      <Path d="M860 565 L870 580 L855 590 L845 575 Z" fill="black" opacity="0.2"/>
      <Text x="910" y="560" textAnchor="middle" fontSize="20" fontWeight="700" fill="#111827">
        Maintenance & Utilities
      </Text>
      <Rect x="760" y="540" width="20" height="28" fill="white" stroke="green" strokeWidth="3" rx="2"/>
      <Circle cx="775" cy="554" r="2" fill="green"/>
      <Rect x="890" y="460" width="20" height="28" fill="white" stroke="green" strokeWidth="3" rx="2"/>
      <Circle cx="905" cy="474" r="2" fill="green"/>
    </G>

    {/* ====== Power Plant ====== */}
    <G>
      <Rect x="460" y="300" width="280" height="200"
            fill="#fee2e2" stroke="#ef4444" strokeWidth="3" rx="10"/>
      <Circle cx="600" cy="400" r="50" stroke="black" strokeWidth="10" fill="none" opacity="0.2"/>
      <Polygon points="590,350 615,390 595,390 620,450 580,400 600,400" fill="gold" opacity="0.2"/>
      <Text x="600" y="400" textAnchor="middle" fontSize="20" fontWeight="700" fill="#111827">
        Power Plant
      </Text>
      <Rect x="710" y="380" width="20" height="28" fill="white" stroke="green" strokeWidth="3" rx="2"/>
      <Circle cx="725" cy="394" r="2" fill="green"/>
      <Rect x="460" y="380" width="20" height="28" fill="white" stroke="green" strokeWidth="3" rx="2"/>
      <Circle cx="475" cy="394" r="2" fill="green"/>
    </G>

    {/* ====== Plant-wide exits ====== */}
    <G>
      <Rect x="50" y="385" width="20" height="28" fill="white" stroke="green" strokeWidth="3" rx="2"/>
      <Circle cx="65" cy="399" r="2" fill="green"/>
      <Text x="65" y="370" textAnchor="middle" fontSize="14" fill="#111827">West Exit</Text>

      <Rect x="1120" y="385" width="20" height="28" fill="white" stroke="green" strokeWidth="3" rx="2"/>
      <Circle cx="1135" cy="399" r="2" fill="green"/>
      <Text x="1135" y="370" textAnchor="middle" fontSize="14" fill="#111827">East Exit</Text>

      <Rect x="595" y="725" width="20" height="28" fill="white" stroke="green" strokeWidth="3" rx="2"/>
      <Circle cx="610" cy="739" r="2" fill="green"/>
      <Text x="610" y="770" textAnchor="middle" fontSize="14" fill="#111827">South Exit</Text>
    </G>

    {/* ====== Walking Paths ====== */}
    <Path d="M460,235 L760,235" stroke="#6b7280" strokeWidth="4" strokeDasharray="10 8" fill="none"/>
    <Path d="M460,555 L760,555" stroke="#6b7280" strokeWidth="4" strokeDasharray="10 8" fill="none"/>
    <Path d="M285,330 L285,460" stroke="#6b7280" strokeWidth="4" strokeDasharray="10 8" fill="none"/>
    <Path d="M905,330 L905,460" stroke="#6b7280" strokeWidth="4" strokeDasharray="10 8" fill="none"/>
    <Path d="M740,395 L1100,395" stroke="#6b7280" strokeWidth="4" strokeDasharray="10 8" fill="none"/>
    <Path d="M460,395 L100,395" stroke="#6b7280" strokeWidth="4" strokeDasharray="10 8" fill="none"/>
    <Path d="M610,720 L610,700" stroke="#6b7280" strokeWidth="4" strokeDasharray="10 8" fill="none"/>
    <Path d="M610,720 L610,555" stroke="#6b7280" strokeWidth="4" strokeDasharray="10 8" fill="none"/>

    {/* ====== Legend ====== */}
    <Text x="1300" y="160" textAnchor="middle" fontSize="16" fontWeight="600" fill="#111827">
      Legend
    </Text>
    <Rect x="1220" y="190" width="20" height="20" fill="#dbeafe" stroke="#3b82f6"/>
    <Text x="1250" y="205" fontSize="16" fontWeight="600" fill="#111827">Blast Furnace</Text>
    <Rect x="1220" y="220" width="20" height="20" fill="#fef3c7" stroke="#f59e0b"/>
    <Text x="1250" y="235" fontSize="16" fontWeight="600" fill="#111827">Steelmaking (BOF)</Text>
    <Rect x="1220" y="250" width="20" height="20" fill="#e0f2fe" stroke="#0284c7"/>
    <Text x="1250" y="265" fontSize="16" fontWeight="600" fill="#111827">Rolling Mill</Text>
    <Rect x="1220" y="280" width="20" height="20" fill="#dcfce7" stroke="#22c55e"/>
    <Text x="1250" y="295" fontSize="16" fontWeight="600" fill="#111827">Maintenance & Utilities</Text>
    <Rect x="1220" y="310" width="20" height="20" fill="#fee2e2" stroke="#ef4444"/>
    <Text x="1250" y="325" fontSize="16" fontWeight="600" fill="#111827">Power Plant</Text>
    <Rect x="1220" y="340" width="20" height="28" fill="white" stroke="green" strokeWidth="3" rx="2"/>
    <Circle cx="1235" cy="354" r="2" fill="green"/>
    <Text x="1250" y="355" fontSize="16" fontWeight="600" fill="#111827">Exit</Text>
    <Path d="M1220,380 L1240,380" stroke="#6b7280" strokeWidth="4" strokeDasharray="10 8" fill="none"/>
    <Text x="1250" y="385" fontSize="16" fontWeight="600" fill="#111827">Walking Path</Text>
  </Svg>
);

export default PlantLayout;
