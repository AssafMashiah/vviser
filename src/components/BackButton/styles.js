import {StyleSheet, Platform} from 'react-native';
import {colors} from '../../constants';

export const backButtonStyles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        marginRight:10,
    },
    textWrapper:{
        marginLeft:5,
        justifyContent:'flex-end',
    },
    rightArrow:{
        marginLeft:5
    },
    qNumberQuizWrapper:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
    },
    text:{
        color:colors.GREEN,
        fontSize:12,
        fontFamily:'Blender'
    },
    quiz:{
        fontSize:16
    },
    subject:{

    },
    questionNumber:{
        fontSize:16
    }
});
