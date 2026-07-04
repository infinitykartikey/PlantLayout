import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from "react-native";
import { useTranslation } from "react-i18next";
import PlantLayout from "../components/PlantLayout";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useTest } from "../context/TestContext";

const DEPTS = {
  "Blast Furnace": { x: 200, y: 130, w: 280, h: 220 },
  "Steelmaking (BOF)": { x: 170, y: 450, w: 280, h: 220 },
  "Rolling Mill": { x: 750, y: 130, w: 280, h: 220 },
  "Maintenance & Utilities": { x: 750, y: 450, w: 290, h: 220 },
  "Power Plant": { x: 480, y: 290, w: 270, h: 220 },
};


const EXITS = {
  West: { x: 60, y: 370, w: 28, h: 28 },
  East: { x: 1110, y: 370, w: 28, h: 28 },
  South: { x: 550, y: 725, w: 28, h: 28 },
};

const NEAREST = {
  "Blast Furnace": "West",
  "Steelmaking (BOF)": "South",
  "Rolling Mill": "East",
  "Maintenance & Utilities": "South",
  "Power Plant": "South",
};

const HAZARD_LIST = Object.keys(DEPTS);
const VIEWBOX = { w: 1500, h: 800 };

export default function TrainingScreen({ navigation }) {
  const { t } = useTranslation();
  const { addAttempt, testData } = useTest();

  const [phase, setPhase] = useState("hazard");
  const [hazard, setHazard] = useState(null);
  const [canvas, setCanvas] = useState({ w: 0, h: 0 });

  const blinkAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    pickRandomHazard();
  }, []);

  useEffect(() => {
    if (phase === "exit") {
      Animated.loop(
        Animated.sequence([
          Animated.timing(blinkAnim, { toValue: 1, duration: 600, easing: Easing.linear, useNativeDriver: false }),
          Animated.timing(blinkAnim, { toValue: 0, duration: 600, easing: Easing.linear, useNativeDriver: false }),
        ])
      ).start();
    }
  }, [phase]);

  const sx = useMemo(() => (canvas.w ? canvas.w / VIEWBOX.w : 1), [canvas.w]);
  const sy = useMemo(() => (canvas.h ? canvas.h / VIEWBOX.h : 1), [canvas.h]);

  function pickRandomHazard() {
    const choice = HAZARD_LIST[Math.floor(Math.random() * HAZARD_LIST.length)];
    setHazard(choice);
    setPhase("hazard");
  }

  function onTapHazard() {
    if (phase !== "hazard") return;
    setPhase("exit");
  }

  // function onPressExit(label) {
  //   if (phase !== "exit") return;
  //   const nearest = NEAREST[hazard];
  //   const isCorrect = label === nearest;
  //   const points = isCorrect ? 10 : 2;

  //   addAttempt({ hazard, nearestExit: nearest, selectedExit: label, points });

  //   if (testData.attempts.length + 1 >= testData.totalAttempts) {
  //     navigation.replace("Result");
  //   } else {
  //     pickRandomHazard();
  //   }
  // }

  function onPressExit(label) {
    if (phase !== "exit") return;
  
    // Prevent extra attempt if already at limit
    if (testData.attempts.length >= testData.totalAttempts) {
      return;
    }
  
    const nearest = NEAREST[hazard];
    const isCorrect = label === nearest;
    const points = isCorrect ? 10 : 2;
  
    addAttempt({ hazard, nearestExit: nearest, selectedExit: label, points });
  
    const newAttemptCount = testData.attempts.length + 1;
  
    if (newAttemptCount >= testData.totalAttempts) {
      navigation.replace("Result");
    } else {
      pickRandomHazard();
    }
  }
  

  const rectStyle = (x, y, w, h) => ({
    position: "absolute",
    left: x * sx,
    top: y * sy,
    width: w * sx,
    height: h * sy,
  });

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {phase === "hazard" ? t("hazardInstruction") : t("evacuationInstruction")}
        </Text>
        <Text style={styles.subtitle}>
          {t("attempts")} {testData.attempts.length + 1}/{testData.totalAttempts}
        </Text>
      </View>

      <View
        style={styles.canvas}
        onLayout={(e) => {
          const { width, height } = e.nativeEvent.layout;
          setCanvas({ w: width, h: height });
        }}
      >
        <PlantLayout width="100%" height="100%" />

        {hazard && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onTapHazard}
            style={[rectStyle(DEPTS[hazard].x, DEPTS[hazard].y, DEPTS[hazard].w, DEPTS[hazard].h), styles.hazardZone]}
          >
            <Icon name="exclamation-triangle" size={36} color="white" solid />
          </TouchableOpacity>
        )}

        {phase === "exit" &&
          Object.keys(EXITS).map((label) => {
            const e = EXITS[label];
            const blinkColor = blinkAnim.interpolate({
              inputRange: [0, 2],
              outputRange: ["#00ff00", "#009900"],
            });
            return (
              <TouchableOpacity
                key={label}
                activeOpacity={0.7}
                onPress={() => onPressExit(label)}
                style={[rectStyle(e.x, e.y, 40, 40), styles.exitZone]}
              >
                <Animated.View style={{ transform: [{ scale: blinkAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.3] }) }] }}>
                <Icon name="sign-out-alt" size={28} color="limegreen" solid />
                </Animated.View>
                <Text style={styles.exitLabel}>{label}</Text>
              </TouchableOpacity>
            );
          })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  header: { padding: 16, display:'flex',flexDirection:'row',justifyContent:"space-between" },
  title: { fontSize: 18, fontWeight: "bold", color:"#4f46e5" },
  subtitle: { fontSize: 18,fontWeight: "bold",color: "#4f46e5" },
  canvas: { flex: 1 },
  hazardZone: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,0,0,0.4)",
    borderWidth: 2,
    borderColor: "red",
  },
  exitZone: { justifyContent: "center", alignItems: "center" },
  exitLabel: { fontSize: 12, fontWeight: "600", color: "#333" },
});
