import { StyleSheet, Text, Pressable, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Formulario from './components/Formulario';
import Paciente from './components/Paciente';
import { useState } from 'react';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  
  // Agregamos el estado para el paciente que se va a editar
  const [pacienteEditado, setPacienteEditado] = useState({});

  // Agregamos la función para setear el paciente a editar
  const editarPaciente = (id) => {
    const pacienteAEditar = pacientes.filter(paciente => paciente.id === id);
    setPacienteEditado(pacienteAEditar[0]);
  }

  // Agregamos la función para eliminar usando Alert de React Native
  const eliminarPaciente = (id) => {
    Alert.alert(
      '¿Estas seguro de eliminar esta cita?',
      'Una cita eliminada no se puede recuperar',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sí, Eliminar', onPress: () => {
            const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id);
            setPacientes(pacientesActualizados);
        }}
      ]
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.titulo}>Administrador de Citas {''}
          <Text style={styles.tituloBold}>Veterinaria</Text>
        </Text>
        
        <Pressable 
          style={styles.btnNuevaCita}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.btnTextoNuevaCita}>Nueva cita</Text>
        </Pressable>

        {pacientes.map((paciente) => (
          <Paciente 
            key={paciente.id} 
            paciente={paciente} 
            pacientes={pacientes} 
            setModalVisible={setModalVisible} 
            // Pasamos las nuevas funciones por props
            editarPaciente={editarPaciente}
            eliminarPaciente={eliminarPaciente}
          />
        ))}

        <Formulario
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          pacientes={pacientes}
          setPacientes={setPacientes}
          // Pasamos los estados de edición por props
          pacienteEditado={pacienteEditado}
          setPacienteEditado={setPacienteEditado}
        />
        
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#F3F4F6',
    flex: 1
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    color: '#374151',
    fontWeight:'600'
  },
  tituloBold:{
    fontWeight: '900',
    color: '#6D28D9'
  },
  btnNuevaCita: {
    backgroundColor: '#6D28D9',
    padding:15,
    marginTop: 30,
    marginHorizontal:20,
    borderRadius:10
  },
  btnTextoNuevaCita: {
    textAlign: 'center',
    color: '#FFF',
    fontSize:18,
    fontWeight:'900',
    textTransform: 'uppercase'
  }
});