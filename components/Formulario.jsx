import { useState, useEffect } from 'react';
import {
    Modal,
    Text,
    View,
    StyleSheet,
    Pressable,
    TextInput,
    Alert,
    Platform, 
    ScrollView,
    SafeAreaView
} from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";

const Formulario = ({ 
    modalVisible, 
    setModalVisible, 
    pacientes, 
    setPacientes, 
    pacienteEditado, 
    setPacienteEditado 
}) => {
    
    const [paciente, setPaciente] = useState('');
    const [nombrePropietario, setNombrePropietario] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fechaAlta, setFechaAlta] = useState(new Date());
    const [sintomas, setSintomas] = useState('');
    const [idPaciente, setIdPaciente] = useState('');
    
    const [mostrarPicker, setMostrarPicker] = useState(false);

    // Efecto para cargar los datos cuando se presiona "Editar"
    useEffect(() => {
        if (Object.keys(pacienteEditado).length > 0) {
            setPaciente(pacienteEditado.paciente);
            setNombrePropietario(pacienteEditado.nombrePropietario);
            setCorreo(pacienteEditado.correo);
            setTelefono(pacienteEditado.telefono);
            // Si la fecha se guardó como Date, la usamos; si se guardó como string, la parseamos
            setFechaAlta(new Date(pacienteEditado.fechaAlta)); 
            setSintomas(pacienteEditado.sintomas);
            setIdPaciente(pacienteEditado.id);
        }
    }, [pacienteEditado]);

    const onChangeFecha = (event, selectedDate) => {
        setMostrarPicker(Platform.OS === 'ios'); // En iOS el picker puede quedar abierto de otra forma
        if(selectedDate){
            setFechaAlta(selectedDate);
        }
    }

    const cleanForm = () => {
        setPaciente('');
        setNombrePropietario('');
        setCorreo('');
        setTelefono('');
        setFechaAlta(new Date());
        setSintomas('');
        setIdPaciente('');
        setModalVisible(false);
        setPacienteEditado({});
    }

    const handleCancelar = () => {
        cleanForm();
    }

    const handleCita = () => {
        // Validación
        if ([paciente.trim(), nombrePropietario.trim(), correo.trim(), telefono.trim(), sintomas.trim()].includes('')) {
            Alert.alert(
                'Error', 
                'Todos los campos son obligatorios',
                [{ text: 'OK' }]
            );
            return;
        }

        const nuevoPaciente = {
            paciente,
            nombrePropietario,
            telefono,
            correo,
            fechaAlta, 
            sintomas
        };

        if (idPaciente) {
            // Editando un paciente existente
            nuevoPaciente.id = idPaciente;
            const pacientesActualizados = pacientes.map(pacienteState => 
                pacienteState.id === nuevoPaciente.id ? nuevoPaciente : pacienteState
            );
            setPacientes(pacientesActualizados);
        } else {
            // Agregando un nuevo paciente
            nuevoPaciente.id = Date.now();
            setPacientes([...pacientes, nuevoPaciente]);
        }

        cleanForm();
    }

    return (
        <Modal
            animationType='slide'
            visible={modalVisible}
        >
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <Text style={styles.titulo}>
                        {idPaciente ? 'Editar' : 'Nueva'} {''}
                        <Text style={styles.tituloBold}>Cita</Text>
                    </Text>
                    
                    <Pressable 
                        style={styles.btnCancelar}
                        onPress={handleCancelar}
                    >
                        <Text style={styles.btnTextoCancelar}> Cancelar </Text>
                    </Pressable>

                    <View style={styles.campo}>
                        <Text style={styles.label}>Nombre Paciente:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Nombre del Paciente'
                            placeholderTextColor={'#666'}
                            value={paciente}
                            onChangeText={setPaciente}
                        />
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.label}>Propietario:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Nombre del Propietario'
                            placeholderTextColor={'#666'}
                            value={nombrePropietario}
                            onChangeText={setNombrePropietario}
                        />
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.label}>Correo:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='correo@correo.com'
                            placeholderTextColor={'#666'}
                            keyboardType='email-address'
                            value={correo}
                            onChangeText={setCorreo}
                        />
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.label}>Telefono:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='123456789'
                            placeholderTextColor={'#666'}
                            keyboardType='phone-pad'
                            value={telefono}
                            onChangeText={setTelefono}
                        />
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.label}>Fecha Alta:</Text>
                        <Pressable 
                            style={styles.input} 
                            onPress={() => setMostrarPicker(true)}
                        >
                            <Text>{fechaAlta.toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</Text>
                        </Pressable>
                        {mostrarPicker && (
                            <DateTimePicker 
                                value={fechaAlta}
                                mode="date"
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                onChange={onChangeFecha}
                                locale={'es-ES'}
                            />
                        )}
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.label}>Sintomas: </Text>
                        <TextInput
                            style={[styles.input, styles.sintomasInput]}
                            placeholder='Sintomas del paciente'
                            placeholderTextColor={'#666'}
                            value={sintomas}
                            onChangeText={setSintomas}
                            multiline={true}
                            numberOfLines={4}
                        />
                    </View>
                    
                    <Pressable 
                        style={styles.btnAgregar}
                        onPress={handleCita}
                    >
                        <Text style={styles.btnTextoAgregar}> 
                            {idPaciente ? 'Editar' : 'Agregar'} Paciente 
                        </Text>
                    </Pressable>
                </ScrollView>
            </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F3F4F6',
        flex: 1
    },
    titulo: {
        fontSize: 30,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 30,
        color: '#374151'
    },
    tituloBold: {
        fontWeight: '900',
        color: '#6D28D9'
    },
    btnCancelar: {
        backgroundColor: '#5827A4',
        padding: 15,
        marginTop: 30,
        marginHorizontal: 30,
        borderRadius: 10
    },
    btnTextoCancelar: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 18,
        fontWeight: '900',
        textTransform: 'uppercase'
    },
    campo: {
        marginTop: 10,
        marginHorizontal: 30
    },
    label: {
        color: '#374151',
        marginBottom: 10,
        marginTop: 15,
        fontSize: 20,
        fontWeight: '600'
    },
    input: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        color: '#333'
    },
    sintomasInput: {
        height: 100,
        textAlignVertical: 'top'
    },
    btnAgregar: {
        backgroundColor: '#6D28D9',
        padding: 15,
        marginTop: 30,
        marginBottom: 30,
        marginHorizontal: 30,
        borderRadius: 10
    },
    btnTextoAgregar: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 18,
        fontWeight: '900',
        textTransform: 'uppercase'
    }
});

export default Formulario;