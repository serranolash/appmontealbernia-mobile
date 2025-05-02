// src/components/Empleados.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // <-- importamos el Picker
import axios from 'axios';

function Empleados() {
  const [empleadoId, setEmpleadoId]       = useState('');
  const [codigo, setCodigo]               = useState('');
  const [nroDocumento, setNroDocumento]   = useState('');
  const [apellido, setApellido]           = useState('');
  const [primerNombre, setPrimerNombre]   = useState('');
  const [mensaje, setMensaje]             = useState('');
  const [empleado, setEmpleado]           = useState(null);
  const [baseDeDatos, setBaseDeDatos]     = useState('DEPOFORT');  // <-- nuevo estado

  const backendUrl = 'http://190.220.57.172:5000';

  const handleGet = async () => {
    if (!empleadoId) {
      setMensaje("Por favor, ingresa el ID del empleado");
      return;
    }
    try {
      const resp = await axios.get(`${backendUrl}/api/empleados`, {
        params: { 
          id: empleadoId, 
          BaseDeDatos: baseDeDatos    // <-- añadimos el parámetro
        }
      });
      const data = resp.data;
      setEmpleado(data);
      setCodigo(data.Codigo);
      setNroDocumento(data.NroDocumento);
      setApellido(data.Apellido);
      setPrimerNombre(data.PrimerNombre);
      setMensaje('Empleado obtenido exitosamente');
    } catch (err) {
      console.error(err);
      setMensaje('Error al obtener el empleado');
    }
  };

  const handleCreate = async () => {
    const payload = { Codigo: codigo, NroDocumento: nroDocumento, Apellido: apellido, PrimerNombre: primerNombre };
    try {
      await axios.post(`${backendUrl}/api/empleados`, payload, {
        params: { BaseDeDatos: baseDeDatos }  // <-- aquí también
      });
      setMensaje('Empleado creado exitosamente');
      limpiarCampos();
    } catch (err) {
      console.error(err);
      setMensaje('Error al crear el empleado');
    }
  };

  const handleUpdate = async () => {
    if (!empleadoId) {
      setMensaje("Por favor, ingresa el ID del empleado");
      return;
    }
    const payload = { Codigo: codigo, NroDocumento: nroDocumento, Apellido: apellido, PrimerNombre: primerNombre };
    try {
      await axios.put(`${backendUrl}/api/empleados`, payload, {
        params: { id: empleadoId, BaseDeDatos: baseDeDatos }  // <-- params id + BaseDeDatos
      });
      setMensaje('Empleado actualizado exitosamente');
      limpiarCampos();
    } catch (err) {
      console.error(err);
      setMensaje('Error al actualizar el empleado');
    }
  };

  const handleDelete = async () => {
    if (!empleadoId) {
      setMensaje("Por favor, ingresa el ID del empleado");
      return;
    }
    try {
      const resp = await axios.delete(`${backendUrl}/api/empleados`, {
        params: { id: empleadoId, BaseDeDatos: baseDeDatos }
      });
      setMensaje(resp.data.message || 'Empleado eliminado exitosamente');
      limpiarCampos();
    } catch (err) {
      console.error(err);
      setMensaje('Error al eliminar el empleado');
    }
  };

  const limpiarCampos = () => {
    setEmpleadoId('');
    setCodigo('');
    setNroDocumento('');
    setApellido('');
    setPrimerNombre('');
    setEmpleado(null);
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>

        <Text style={styles.title}>Gestión de Empleados</Text>

        {/* Picker para seleccionar el depósito */}
        <View style={styles.card}>
          <Text style={styles.subtitle}>Seleccione Base de Datos</Text>
          <Picker
            selectedValue={baseDeDatos}
            onValueChange={setBaseDeDatos}
            style={styles.picker}
          >
            <Picker.Item label="DEPOFORT (Depósito 1)" value="DEPOFORT" />
            <Picker.Item label="DEPOUA (Underarmour)"    value="DEPOUA" />
          </Picker>
        </View>

        {/* Consultar / Eliminar */}
        <View style={styles.card}>
          <Text style={styles.subtitle}>Consultar / Eliminar Empleado</Text>
          <TextInput
            style={styles.input}
            value={empleadoId}
            onChangeText={setEmpleadoId}
            placeholder="ID del empleado"
            placeholderTextColor="#888"
          />
          <TouchableOpacity style={styles.buttonBlue} onPress={handleGet}>
            <Text style={styles.buttonText}>Consultar Empleado</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRed} onPress={handleDelete}>
            <Text style={styles.buttonText}>Eliminar Empleado</Text>
          </TouchableOpacity>
        </View>

        {/* Mostrar datos */}
        {empleado && (
          <View style={styles.cardTable}>
            <Text style={styles.subtitle}>Datos del Empleado</Text>
            <Text style={styles.info}><Text style={styles.label}>Código:</Text> {empleado.Codigo}</Text>
            <Text style={styles.info}><Text style={styles.label}>Documento:</Text> {empleado.NroDocumento}</Text>
            <Text style={styles.info}><Text style={styles.label}>Apellido:</Text> {empleado.Apellido}</Text>
            <Text style={styles.info}><Text style={styles.label}>Nombre:</Text> {empleado.PrimerNombre}</Text>
          </View>
        )}

        {/* Crear / Actualizar */}
        <View style={styles.card}>
          <Text style={styles.subtitle}>Crear / Actualizar Empleado</Text>
          <TextInput
            style={styles.input}
            value={codigo}
            onChangeText={setCodigo}
            placeholder="Código (Debe comenzar con 'E')"
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
            value={apellido}
            onChangeText={setApellido}
            placeholder="Apellido"
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            value={primerNombre}
            onChangeText={setPrimerNombre}
            placeholder="Nombre"
            placeholderTextColor="#888"
          />
          <TouchableOpacity style={styles.buttonBlue} onPress={handleCreate}>
            <Text style={styles.buttonText}>Crear Empleado</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonBlue} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Actualizar Empleado</Text>
          </TouchableOpacity>
        </View>

        {mensaje !== '' && <Text style={styles.message}>{mensaje}</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
    marginTop: 40, // Se agregó más margen superior para que el título sea visible
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cardTable: {
    backgroundColor: '#eaf5ff',
    borderWidth: 1,
    borderColor: '#007ACC',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  buttonBlue: {
    backgroundColor: '#007ACC',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonRed: {
    backgroundColor: '#FF4136',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    color: '#4CAF50',
    marginTop: 20,
  },
});

export default Empleados;
