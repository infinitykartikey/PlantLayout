import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';


export default function AppHeader() {


  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo/CMR.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: '#fff', // match your app theme
    elevation: 2, // small shadow on Android
  },
  logo: {
    height: 40,
    width: 160,
  },
});
