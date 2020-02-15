import React from 'react'
import { View, Text,StyleSheet } from 'react-native'

import ModalDropdown from 'react-native-modal-dropdown';

const Test = (props) => {
    return (
        <View style={styles.container}>
            <ModalDropdown options={['option 1', 'option 2']}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})
export default Test
