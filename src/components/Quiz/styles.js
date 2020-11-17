import {StyleSheet, Platform} from 'react-native';


export const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export const subjectStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.35)'
    },
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    spinnerWrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navWrapper: {
        flex: 1,
        flexDirection: 'row-reverse',
    },
    navBar: {
        position: 'absolute',
        zIndex: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        // backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    navButton: {
        flex: 4,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navButtonText: {
        color: '#68626f',
        fontSize: 12,
    },
    navTitle: {
        flex: 3,
        height: 28,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navTitleText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    navBarSubmitIcon: {
        paddingTop: 4,
        paddingBottom: 4,
        paddingRight: 20,
        paddingLeft: 20,
        marginBottom: 1,
        borderRadius: 10,
    },
    navBarSubmitIconText: {
        fontSize: 20,
        color: '#ffffff',
    },
    navBarIconsQuiz: {
        marginTop: 6,
        marginRight: 42,
        marginLeft: 42,
        paddingBottom: 20,
    },
    iconRightLeftArrow: {
        height: 19,
        width: 14,
    },
    navBarBackgroundQuizInfo: {
        flexDirection: 'row',
        height: 24,
        paddingBottom: 5,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#ffffff',
        shadowColor: "#999",
        shadowOpacity: 1,
        shadowRadius: 1,
        shadowOffset: {
            height: 3,
            width: 0
        },
        zIndex: 10,
    },
});


export const questionNumbersStyles = StyleSheet.create({
    numberQuestionsContainer: {
        flexDirection: 'row',
        height: 24,
        paddingBottom: 5,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#ffffff',
        shadowColor: "#999",
        shadowOpacity: 1,
        shadowRadius: 1,
        shadowOffset: {
            height: 3,
            width: 0
        },
        zIndex: 10,
    },
    numberQuestionsWrap: {
        flexDirection: 'row',
    },
    numberQuestionWrap: {
        borderWidth: 1,
        borderRadius: 17,
        height: 17,
        width: 17,
        marginLeft: 2,
        marginRight: 2,
        alignItems: 'center',
    },
    numberQuestion: {
        fontWeight: 'bold',
        fontSize: 11,
        lineHeight: 14,
        backgroundColor: 'transparent'

    }
});

export const finalScreenStyles = StyleSheet.create({
    layout: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 30,
    },
    medalWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});


export const drawerStyles = StyleSheet.create({

    containerDrawer: {
        flex: 1,
        zIndex: -1
    },
    container: {
        top: 0,
        bottom: 0,
        position: 'absolute',
        backgroundColor: '#ccc',
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#1db4ae',
    },
    mainWrap: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'absolute',
        margin:20,
        backgroundColor:'#FFFFFF',
        borderWidth: 5,
        borderColor: '#00fdff'
    },
    toggleButtonContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        height: 60,
        width: 0,
    },
    toggleButtonWrap: {
        position: 'absolute',
        zIndex: 10000,
        top: 0,
        width: 40,
        height: 48,
        backgroundColor: '#76c3bf',
    },
    toggleButton: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#1db4ae',
    },
    iconButton: {

    }
});
