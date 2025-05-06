// ─── src/screens/Home.js ─────────────────────────────────────────────
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Qué deseas gestionar?</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('Vendedores')}>
        <Text style={styles.txt}>Vendedores</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('Empleados')}>
        <Text style={styles.txt}>Empleados</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, justifyContent:'center', alignItems:'center', padding:20 },
  title:{ fontSize:24, fontWeight:'bold', marginBottom:40 },
  btn:{ backgroundColor:'#007ACC', padding:18, borderRadius:8, marginBottom:18, width:'80%', alignItems:'center' },
  txt:{ color:'#fff', fontSize:18, fontWeight:'bold' }
});
