// src/components/Vendedores.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

function Vendedores() {
  const [vendedorId, setVendedorId]     = useState('');
  const [codigo, setCodigo]             = useState('');
  const [nroDocumento, setNroDocumento] = useState('');
  const [nombre, setNombre]             = useState('');
  const [mensaje, setMensaje]           = useState('');
  const [vendedor, setVendedor]         = useState(null);
  const [baseDeDatos, setBaseDeDatos]   = useState('DEPOFORT'); // default

  const backendUrl = 'http://190.220.57.172:5000';

  const handleCreate = async () => {
    try {
      await axios.post(`${backendUrl}/api/vendedores`, 
        { Codigo: codigo, NroDocumento: nroDocumento, Nombre: nombre },
        { params: { BaseDeDatos: baseDeDatos } }
      );
      setMensaje('Vendedor creado exitosamente');
      limpiarCampos();
    } catch (err) {
      console.error(err);
      setMensaje('Error al crear el vendedor');
    }
  };

  const handleGet = async () => {
    if (!vendedorId) {
      setMensaje('Por favor, ingresa el ID del vendedor');
      return;
    }
    try {
      const resp = await axios.get(`${backendUrl}/api/vendedores`, {
        params: { id: vendedorId, BaseDeDatos: baseDeDatos }
      });
      const data = resp.data;
      setVendedor(data);
      setCodigo(data.Codigo);
      setNroDocumento(data.NroDocumento);
      setNombre(data.Nombre);
      setMensaje('Vendedor obtenido exitosamente');
    } catch (err) {
      console.error(err);
      setMensaje('Error al obtener el vendedor');
    }
  };

  const handleDelete = async () => {
    if (!vendedorId) {
      setMensaje('Por favor, ingresa el ID del vendedor');
      return;
    }
    try {
      await axios.delete(`${backendUrl}/api/vendedores`, {
        params: { id: vendedorId, BaseDeDatos: baseDeDatos }
      });
      setMensaje('Vendedor eliminado exitosamente');
      limpiarCampos();
    } catch (err) {
      console.error(err);
      setMensaje('Error al eliminar el vendedor');
    }
  };

  const limpiarCampos = () => {
    setVendedorId('');
    setCodigo('');
    setNroDocumento('');
    setNombre('');
    setVendedor(null);
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>

        <Text style={styles.title}>Gestión de Vendedores</Text>

        {/* Selección de Base de Datos con botones */}
        <View style={styles.card}>
          <Text style={styles.subtitle}>Seleccione Base de Datos</Text>
          <View style={styles.dbRow}>
            {['DEPOFORT','DEPOSEVN','DEPOUA'].map(db => (
              <TouchableOpacity
                key={db}
                style={[
                  styles.dbButton,
                  baseDeDatos === db && styles.dbButtonSelected
                ]}
                onPress={() => setBaseDeDatos(db)}
              >
                <Text style={[
                  styles.dbButtonText,
                  baseDeDatos === db && styles.dbButtonTextSelected
                ]}>
                  {db}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Consultar / Eliminar */}
        <View style={styles.card}>
          <Text style={styles.subtitle}>Consultar / Eliminar Vendedor</Text>
          <TextInput
            style={styles.input}
            value={vendedorId}
            onChangeText={setVendedorId}
            placeholder="ID del vendedor"
            placeholderTextColor="#888"
          />
          <TouchableOpacity style={styles.buttonBlue} onPress={handleGet}>
            <Text style={styles.buttonText}>Consultar Vendedor</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRed} onPress={handleDelete}>
            <Text style={styles.buttonText}>Eliminar Vendedor</Text>
          </TouchableOpacity>
        </View>

        {/* Mostrar datos */}
        {vendedor && (
          <View style={styles.cardTable}>
            <Text style={styles.subtitle}>Datos del Vendedor</Text>
            <Text style={styles.info}><Text style={styles.label}>Código:</Text> {vendedor.Codigo}</Text>
            <Text style={styles.info}><Text style={styles.label}>Documento:</Text> {vendedor.NroDocumento}</Text>
            <Text style={styles.info}><Text style={styles.label}>Nombre:</Text> {vendedor.Nombre}</Text>
          </View>
        )}

        {/* Crear */}
        <View style={styles.card}>
          <Text style={styles.subtitle}>Crear / Actualizar Vendedor</Text>
          <TextInput
            style={styles.input}
            value={codigo}
            onChangeText={setCodigo}
            placeholder="Código"
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            value={nroDocumento}
            onChangeText={setNroDocumento}
            placeholder="Número de Documento"
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Nombre"
            placeholderTextColor="#888"
          />
          <TouchableOpacity style={styles.buttonBlue} onPress={handleCreate}>
            <Text style={styles.buttonText}>Crear Vendedor</Text>
          </TouchableOpacity>
        </View>

        {mensaje !== '' && <Text style={styles.message}>{mensaje}</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flex: 1, backgroundColor: '#f4f4f4' },
  container: { flex: 1, padding: 20, backgroundColor: '#f4f4f4' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 40, marginTop: 40 },
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 20, marginBottom: 20, shadowColor: '#000', shadowOffset: { width:0, height:2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 5 },
  subtitle: { fontSize: 18, fontWeight: 'bold', color: '#444', marginBottom: 10 },
  dbRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  dbButton: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6, borderWidth: 1, borderColor: '#007ACC' },
  dbButtonSelected: { backgroundColor: '#007ACC' },
  dbButtonText: { color: '#007ACC', fontWeight: 'bold' },
  dbButtonTextSelected: { color: '#fff' },
  cardTable: { backgroundColor: '#eaf5ff', borderWidth:1, borderColor:'#007ACC', borderRadius:10, padding:20, marginBottom:20 },
  input: { borderWidth:1, borderColor:'#ddd', borderRadius:8, padding:10, fontSize:16, color:'#333', marginBottom:10 },
  buttonBlue: { backgroundColor: '#007ACC', padding:15, borderRadius:8, alignItems:'center', marginBottom:10 },
  buttonRed:  { backgroundColor: '#FF4136', padding:15, borderRadius:8, alignItems:'center', marginBottom:10 },
  buttonText:{ color:'#fff', fontSize:16, fontWeight:'bold' },
  info: { fontSize:16, marginBottom:5 },
  label:{ fontWeight:'bold' },
  message:{ textAlign:'center', fontSize:16, color:'#4CAF50', marginTop:20 }
});

export default Vendedores;
