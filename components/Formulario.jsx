import { Modal, Text, View, StyleSheet, Pressable} from 'react-native';

const Formulario = ({
    modalVisible,
    setModalVisible
}) => {
    return (
        <Modal 
        visible={modalVisible}
        animationType='slide'
        >
            <View style={styles.container}>
            <Text style ={styles.titulo}>Nueva {''}
                <Text style= {styles.tituloBold}>Cita</Text>
                </Text>
                <Pressable style={styles.btnCancelar} onPress ={() => setModalVisible (false)} >
                    <Text style={styles.btnTextoCancelar}>Cancelar</Text>
                </Pressable>
            </View>
        </Modal>
    );
};
const styles = StyleSheet.create({
    container : {
        flex: 1
    },
    titulo:{
        fontSize: 30,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 30,
        color: '#374151',
    },
     tituloBold: {
        fontWeight: '900',
        color: '#6D28D9',
    },
    btnCancelar: {
        backgroundColor: '#6D28D9',
        padding: 15,
        marginTop: 30,
        marginHorizontal: 20,
        borderRadius: 10
    },
    btnTextoCancelar:{
        textAlign: 'center',
        color: '#FFF',
        fontSize: 18,
        fontWeight: '900',
        textTransform: 'uppercase'
    }

  
})
export default Formulario