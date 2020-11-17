import {StyleSheet, Platform} from 'react-native';

export const treeStyles = StyleSheet.create({
    tree: {},
    subjectnode: {
        backgroundColor: '#5dc8c1'
    },
    rootnode: {
        paddingBottom: 0,
    },
    quiznode: {
        backgroundColor: '#f3fafd',
    },
    node: {
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    item: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    icon: {
        paddingRight: 10,
        color: '#333',
        alignSelf: 'center'
    },
    text: {
        color: '#FFF',
        fontSize: 18,
    },
    roottext: {
        paddingRight: 10,
    },
    subjecttext: {
        paddingRight: 15,
    },
    quiztext: {
        paddingRight: 10,
        color: '#1abc9c',
    },
    arrow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: 15,
    },
    dagger: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: 20,
    },
    separator: {
        height: 1,
        backgroundColor: '#aaa',
    },
    progress: {
        paddingLeft: 35,
        fontWeight: 'bold',
        color: '#1abc9c'
    },
    catIconWrapper: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    catIcon: {
        marginRight: 10
    },
    quizArrow: {
        marginLeft: 5
    },
    spinner: {
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },

});
