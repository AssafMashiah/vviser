import {StyleSheet, Platform} from 'react-native';
import {colors} from '../../constants';

export const audioPlayerStyles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
        height: 70,
        shadowColor: "#000000",
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            height: 1,
            width: 0
        },
    },
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    playerWrapper: {
        marginLeft: 20,
    },
    button: {
        fontSize: 28,
        marginRight: 10
    },
    playButton: {},
    pauseButton: {},
    buttonsWrapper: {
        flex: 1,
    },
    sliderWrapper: {
        left:0,
        right:0,
    },
    slider: {
        width:200
    },
    track:{
        height:8,
        borderWidth:1,
        borderColor:'#000000',
        borderRadius:3
    },
    sliderThumb:{
        backgroundColor:'#FFFFFF',
        borderWidth:1,
        borderColor:'#AAAAAA',
    },
    time:{
        margin: 5,
        fontSize:11
    }
});
