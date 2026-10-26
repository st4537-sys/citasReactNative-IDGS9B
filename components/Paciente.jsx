import {
  Text,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';

const Paciente = ({ setModalVisible, pacientes, paciente, eliminarPaciente, editarPaciente }) => {
    
    const handleEditar = () => {
        setModalVisible(true);
        editarPaciente(paciente.id);
        console.log(pacientes);
    };

    const handleEliminar = () => {
        eliminarPaciente(paciente.id);
    };

    return (
        <View style={styles.pacienteCard}>
            <Text style={styles.pacienteLabel}>Paciente:{' '}
                <Text style={styles.pacienteNombre}>{paciente.paciente}</Text>
            </Text>
            <Text style={styles.pacienteFecha}>
              {new Date(paciente.fechaAlta).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>

            <View style={styles.pacienteContenedorBotones}>
                <Pressable
                    style={[styles.pacienteBtn, styles.pacienteBtnEditar]}
                    onPress={handleEditar}
                >
                    <Text style={styles.pacienteBtnTexto}>Editar</Text>
                </Pressable>
                
                <Pressable
                    style={[styles.pacienteBtn, styles.pacienteBtnEliminar]}
                    onPress={handleEliminar}
                >
                    <Text style={styles.pacienteBtnTexto}>Eliminar</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  pacienteCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#94a3b8',
    borderRadius: 8,
    marginBottom: 10, // Separación entre cada paciente
    marginHorizontal: 20,
  },
  pacienteLabel: {
    color: '#374151',
    textTransform: 'uppercase',
    fontWeight: '700',
    marginBottom: 10,
    fontSize: 14,
  },
  pacienteNombre: {
    color: '#6d28d9',
    fontSize: 24,
    fontWeight: '700',
  },
  pacienteFecha: {
    color: '#374151',
    fontSize: 14,
  },
  pacienteContenedorBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  pacienteBtn: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  pacienteBtnTexto: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  pacienteBtnEditar: {
    backgroundColor: '#f59e0b',
  },
  pacienteBtnEliminar: {
    backgroundColor: '#ef4444',
  },
});

export default Paciente;