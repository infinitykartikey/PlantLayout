// src/components/LineChart.js - A simple chart component to simulate recovery timeline
import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Svg, { Path, Line, Text as SvgText, Circle } from 'react-native-svg';

const LineChart = ({ data, xKey = 'day', yKey = 'recoveryPercent', height = 200 }) => {
  const screenWidth = Dimensions.get('window').width - 32; // Full width minus padding
  const chartWidth = screenWidth - 60; // Leave space for y-axis labels
  const chartHeight = height - 40; // Leave space for x-axis labels
  
  const maxX = Math.max(...data.map(item => item[xKey]));
  const maxY = Math.max(...data.map(item => item[yKey]));
  
  // Create a path string for the line
  let pathD = '';
  data.forEach((item, index) => {
    const x = (item[xKey] / maxX) * chartWidth + 40; // Offset for y-axis
    const y = chartHeight - (item[yKey] / maxY) * chartHeight + 10; // Invert y-axis
    
    if (index === 0) {
      pathD += `M ${x} ${y} `;
    } else {
      pathD += `L ${x} ${y} `;
    }
  });
  
  // Create x-axis ticks
  const xTicks = [];
  const xTickCount = Math.min(data.length, 10); // Limit to 10 ticks for readability
  for (let i = 0; i < xTickCount; i++) {
    const tickIndex = Math.floor(i * (data.length / xTickCount));
    const item = data[tickIndex];
    const x = (item[xKey] / maxX) * chartWidth + 40;
    xTicks.push(
      <React.Fragment key={`x-tick-${i}`}>
        <Line 
          x1={x} 
          y1={chartHeight + 10} 
          x2={x} 
          y2={chartHeight + 15} 
          stroke="#333" 
          strokeWidth="1" 
        />
        <SvgText 
          x={x} 
          y={chartHeight + 30} 
          textAnchor="middle" 
          fontSize="12"
          fill="#333"
        >
          {item[xKey]}
        </SvgText>
      </React.Fragment>
    );
  }
  
  // Create y-axis ticks
  const yTicks = [];
  const yTickCount = 5;
  for (let i = 0; i <= yTickCount; i++) {
    const value = (maxY / yTickCount) * i;
    const y = chartHeight - (value / maxY) * chartHeight + 10;
    yTicks.push(
      <React.Fragment key={`y-tick-${i}`}>
        <Line 
          x1={35} 
          y1={y} 
          x2={40} 
          y2={y} 
          stroke="#333" 
          strokeWidth="1" 
        />
        <SvgText 
          x={30} 
          y={y + 5} 
          textAnchor="end" 
          fontSize="12"
          fill="#333"
        >
          {Math.round(value)}
        </SvgText>
        <Line 
          x1={40} 
          y1={y} 
          x2={chartWidth + 40} 
          y2={y} 
          stroke="#DDD" 
          strokeWidth="1" 
          strokeDasharray="5,5" 
        />
      </React.Fragment>
    );
  }
  
  // Draw data points
  const points = data.map((item, index) => {
    const x = (item[xKey] / maxX) * chartWidth + 40;
    const y = chartHeight - (item[yKey] / maxY) * chartHeight + 10;
    return (
      <Circle
        key={`point-${index}`}
        cx={x}
        cy={y}
        r={3}
        fill="#007BFF"
      />
    );
  });
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recovery Timeline</Text>
      <Svg width={screenWidth} height={height} style={styles.chart}>
        {/* Y-axis */}
        <Line 
          x1={40} 
          y1={10} 
          x2={40} 
          y2={chartHeight + 10} 
          stroke="#333" 
          strokeWidth="1" 
        />
        
        {/* X-axis */}
        <Line 
          x1={40} 
          y1={chartHeight + 10} 
          x2={chartWidth + 40} 
          y2={chartHeight + 10} 
          stroke="#333" 
          strokeWidth="1" 
        />
        
        {/* Y-axis label */}
        <SvgText 
          x={15} 
          y={height / 2} 
          textAnchor="middle" 
          fontSize="12"
          fill="#333"
          rotation="-90"
        >
          Recovery %
        </SvgText>
        
        {/* X-axis label */}
        <SvgText 
          x={screenWidth / 2} 
          y={height - 5} 
          textAnchor="middle" 
          fontSize="12"
          fill="#333"
        >
          Days
        </SvgText>
        
        {/* X-axis ticks */}
        {xTicks}
        
        {/* Y-axis ticks */}
        {yTicks}
        
        {/* Line path */}
        <Path
          d={pathD}
          fill="none"
          stroke="#007BFF"
          strokeWidth="2"
        />
        
        {/* Data points */}
        {points}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  chart: {
    backgroundColor: '#F9F9F9',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
});

export default LineChart;
