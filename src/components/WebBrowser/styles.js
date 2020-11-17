import {StyleSheet, Platform} from 'react-native';


export const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export const webBrowserStyles = StyleSheet.create({
    browser:{
        flex:1,
    }
})

export const urlBarStyles = StyleSheet.create({
   container:{
       backgroundColor:'#908f90',
       height:30,
       flexDirection: 'row',
       alignItems:'center'
   },
   url:{
       marginLeft:5,
       color:'#eee',
   }
});
