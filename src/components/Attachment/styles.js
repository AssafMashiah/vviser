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
});


export const attachmentStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export const attachmentButtonsStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 50,
    },
    leftContainer: {
        position: 'absolute',
        left: 5,
        bottom: 0,
        flexDirection: 'row',
    },
    rightContainer: {
        position: 'absolute',
        right: 5,
        bottom: 0,
        flexDirection: 'row',
    },
    buttonWrap: {
        height: 50,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconAudio: {
        width: 20,
        height: 21,
    },
    iconLink: {
        width: 20,
        height: 20,
    },
    iconTable: {
        width: 26,
        height: 19,
    },
    iconText: {
        width: 18,
        height: 18,
    },
    iconImage: {
        width: 24,
        height: 20,
    },
    iconVideo: {
        width: 20,
        height: 20,
    },
});
