// ─────────────────────────────────────────────────────────
// src/components/Empleados.js
// ─────────────────────────────────────────────────────────
import React, { useState }           from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView
}                                    from 'react-native';
import { Picker }                    from '@react-native-picker/picker';
import axios                         from 'axios';

const backendUrl = 'http://190.220.57.172:5000';   // proxy-Nginx

export default function Empleados () {
  /* ---------- estados ---------- */
  const [empleadoId,   setEmpleadoId]   = useState('');
  const [codigo,       setCodigo]       = useState('');
  const [nroDocumento, setNroDocumento] = useState('');
  const [apellido,     setApellido]     = useState('');
  const [primerNombre, setPrimerNombre] = useState('');
  const [baseDeDatos,  setBaseDeDatos]  = useState('DEPOFORT');
  const [empleado,     setEmpleado]     = useState(null);
  const [mensaje,      setMensaje]      = useState('');

  /* ---------- helper: log + msg ---------- */
  const logErr = (tag, err) => {
    const info = {
      tag,
      message : err.message,
      status  : err.response?.status,
      payload : err.response?.data,
      url     : err.config?.url,
      method  : err.config?.method,
    };
    console.log('[Empleados]❌', info);
    return info.payload?.error || info.payload?.message || err.message;
  };

  /* ---------- CRUD ---------- */
  const handleGet = async () => {
    if (!empleadoId) return setMensaje('⚠️ Ingresa el ID del empleado');
    try {
      const { data } = await axios.get(`${backendUrl}/api/empleados`, {
        params : { id: empleadoId, BaseDeDatos: baseDeDatos },
      });
      setEmpleado(data);
      setCodigo(data.Codigo);
      setNroDocumento(data.NroDocumento);
      setApellido(data.Apellido);
      setPrimerNombre(data.PrimerNombre);
      setMensaje('✅ Empleado obtenido');
    } catch (err) { setMensaje(`❌ ${logErr('GET', err)}`); }
  };

  const handleCreate = async () => {
    try {
      await axios.post(`${backendUrl}/api/empleados`,
        { Codigo: codigo, NroDocumento: nroDocumento, Apellido: apellido, PrimerNombre: primerNombre },
        { params: { BaseDeDatos: baseDeDatos } });
      setMensaje('✅ Empleado creado'); limpiar();
    } catch (err) { setMensaje(`❌ ${logErr('POST', err)}`); }
  };

  const handleUpdate = async () => {
    if (!empleadoId) return setMensaje('⚠️ Ingresa el ID del empleado');
    try {
      await axios.put(`${backendUrl}/api/empleados`,
        { Codigo: codigo, NroDocumento: nroDocumento, Apellido: apellido, PrimerNombre: primerNombre },
        { params: { id: empleadoId, BaseDeDatos: baseDeDatos } });
      setMensaje('✅ Empleado actualizado'); limpiar();
    } catch (err) { setMensaje(`❌ ${logErr('PUT', err)}`); }
  };

  const handleDelete = async () => {
    if (!empleadoId) return setMensaje('⚠️ Ingresa el ID del empleado');
    try {
      await axios.delete(`${backendUrl}/api/empleados`, {
        params : { id: empleadoId, BaseDeDatos: baseDeDatos },
      });
      setMensaje('✅ Empleado eliminado'); limpiar();
    } catch (err) { setMensaje(`❌ ${logErr('DELETE', err)}`); }
  };

  const limpiar = () => {
    setEmpleadoId(''); setCodigo(''); setNroDocumento('');
    setApellido('');  setPrimerNombre(''); setEmpleado(null);
  };

  /* ---------- UI ---------- */
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Gestión de Empleados</Text>

        {/* Base de datos */}
        <View style={styles.card}>
          <Text style={styles.subtitle}>Base de Datos</Text>
          <Picker selectedValue={baseDeDatos} onValueChange={setBaseDeDatos}>
            <Picker.Item label="DEPOFORT" value="DEPOFORT" />
            <Picker.Item label="DEPOUA"   value="DEPOUA"   />
          </Picker>
        </View>

        {/* Consultar / Eliminar */}
        <View style={styles.card}>
          <Text style={styles.subtitle}>Consultar / Eliminar</Text>
          <TextInput style={styles.input} value={empleadoId}
                     onChangeText={setEmpleadoId} placeholder="ID" />
          <TouchableOpacity style={styles.buttonBlue} onPress={handleGet}>
            <Text style={styles.buttonText}>Consultar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRed}  onPress={handleDelete}>
            <Text style={styles.buttonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>

        {/* Datos */}
        {empleado && (
          <View style={styles.cardTable}>
            <Text style={styles.info}><Text style={styles.label}>Código:</Text> {empleado.Codigo}</Text>
            <Text style={styles.info}><Text style={styles.label}>Documento:</Text> {empleado.NroDocumento}</Text>
            <Text style={styles.info}><Text style={styles.label}>Apellido:</Text> {empleado.Apellido}</Text>
            <Text style={styles.info}><Text style={styles.label}>Nombre:</Text> {empleado.PrimerNombre}</Text>
          </View>
        )}

        {/* Crear / Actualizar */}
        <View style={styles.card}>
          <Text style={styles.subtitle}>Crear / Actualizar</Text>
          <TextInput style={styles.input} value={codigo}       onChangeText={setCodigo}       placeholder="Código" />
          <TextInput style={styles.input} value={nroDocumento} onChangeText={setNroDocumento} placeholder="N.º documento" />
          <TextInput style={styles.input} value={apellido}     onChangeText={setApellido}     placeholder="Apellido" />
          <TextInput style={styles.input} value={primerNombre} onChangeText={setPrimerNombre} placeholder="Nombre" />
          <TouchableOpacity style={styles.buttonBlue} onPress={handleCreate}>
            <Text style={styles.buttonText}>Crear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonBlue} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Actualizar</Text>
          </TouchableOpacity>
        </View>

        {Boolean(mensaje) && <Text style={styles.message}>{mensaje}</Text>}
      </View>
    </ScrollView>
  );
}

/* estilos genéricos */
const styles = StyleSheet.create({
  scrollContainer:{flex:1,backgroundColor:'#f4f4f4'},
  container:{flex:1,padding:20},
  title:{fontSize:28,fontWeight:'bold',textAlign:'center',marginVertical:40},
  card:{backgroundColor:'#fff',borderRadius:10,padding:20,marginBottom:20,elevation:5},
  subtitle:{fontSize:18,fontWeight:'bold',marginBottom:10},
  cardTable:{backgroundColor:'#eaf5ff',borderWidth:1,borderColor:'#007ACC',borderRadius:10,padding:20,marginBottom:20},
  input:{borderWidth:1,borderColor:'#ddd',borderRadius:8,padding:10,fontSize:16,marginBottom:10},
  buttonBlue:{backgroundColor:'#007ACC',padding:15,borderRadius:8,alignItems:'center',marginBottom:10},
  buttonRed:{backgroundColor:'#FF4136',padding:15,borderRadius:8,alignItems:'center',marginBottom:10},
  buttonText:{color:'#fff',fontSize:16,fontWeight:'bold'},
  info:{fontSize:16,marginBottom:5},
  label:{fontWeight:'bold'},
  message:{textAlign:'center',fontSize:16,marginTop:10,color:'#e11'},
});
