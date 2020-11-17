import {StyleSheet, Platform} from 'react-native';

export const searchBarStyles = StyleSheet.create({
    backArrow:{
        fontSize: 35,
    },
    backButton:{
        flex: 1,
        marginLeft: 10
    },
    searchBar:{
        width: 300,
        marginTop: 6,
        marginLeft: -40,
        marginRight: 50,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 3,
    },
    searchInput:{
        flex: 9,
        textAlign: 'right',
    },
});
