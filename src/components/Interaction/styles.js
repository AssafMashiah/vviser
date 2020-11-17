import {StyleSheet, Platform} from 'react-native';

export const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    spinnerWrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    spinnerAbsoluteWrap: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export const notificationStyles = StyleSheet.create({
    notificationContainer: {
        height: 70,
        paddingBottom: 10,
        paddingTop: 10,
        marginBottom: 60,
        alignItems: 'center',
        flexDirection: 'column',
    },
    notificationGoodBack: {
        width: 332,
        height: 50,
        alignItems: 'center',
    },
    notificationLabel: {
        // width: 332,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    notificationCloseImage: {
        position: 'absolute',
        left: 25,
        top: 13,

    },
    notificationText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    notificationNextImage: {}
});


export const interactionStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    titleContainer: {
        // height: 225,
        flex: 2,
        backgroundColor: '#76c3bf',
        flexDirection: 'row',
    },
    titleWrap: {
        flex: 1,
        padding: 15,
    },
    titleImageWrap: {
        flex: 2,
        justifyContent: 'center',
    },
    navTitleImage: {
        flex: 1,
    },
    titleTextWrap: {
        flex: 5,
        paddingLeft: 15,

        justifyContent: 'center',
    },
    titleText: {
        color: '#000',
        fontSize: 17,
        fontWeight: '500',
    },
    answersContainer: {
        flex: 3,
    },
    audioAttachmentContainer: {
        height: 35,
    },
    listAnswersWrap: {
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: 'column',
    },
    itemAnswerWrap: {
        // paddingBottom: 10,
        // paddingTop: 10,
        // flexDirection: 'row-reverse',
    },
    saveButtonWrap: {
        paddingBottom: 5,
        paddingTop: 10,
    },
    itemAnswerRadio: {
        marginBottom: 0,
    },
    itemAnswerLabelWrap: {
        justifyContent: 'flex-end',
    },
    itemAnswerLabel: {
        marginLeft: 10,
        fontSize: 22,
        lineHeight: 40,
    },
    itemAnswerInputWrap: {
        marginLeft: 20,
        marginRight: 15,
    },
    iconCorrect: {
        height: 40,
        width: 77,
    },
    saveButton: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cfa1ff',
        shadowColor: "#000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 5,
            width: 0
        },
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 21,
    },
    containerStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    labelStyle: {
        flex: 1,
        fontSize: 16,
        color: '#000',
    },
    checkboxStyle: {
        width: 18,
        height: 18,
        marginLeft: 20,
        marginRight: 15,
        borderWidth: 2,
        borderColor: '#747474',
        borderRadius: 3,
    }
});

export const radioButtonStyles = StyleSheet.create({
    radioForm: {},

    radioWrap: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 5,
    },
    radio: {
        justifyContent: 'center',
        alignItems: 'center',

        width: 30,
        height: 30,


        alignSelf: 'center',

        borderColor: '#2196f3',
        borderRadius: 30,
    },

    radioLabel: {
        paddingLeft: 10,
        lineHeight: 20,
    },

    radioNormal: {
        borderRadius: 10,
    },

    radioActive: {
        width: 20,
        height: 20,
        backgroundColor: '#2196f3',
    },

    labelWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center'
    },

    labelVerticalWrap: {
        flexDirection: 'column',
        paddingLeft: 10,
    },

    labelVertical: {
        paddingLeft: 0,
    },

    formHorizontal: {
        flexDirection: 'row',
    },
});

