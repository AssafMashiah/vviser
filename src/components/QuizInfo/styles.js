import {StyleSheet, Platform} from 'react-native';
import {colors} from '../../constants';

export const quizInfoStyles = StyleSheet.create({
    layout: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 30,
    },
    closeCircleWrapper: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginTop: 10,
        marginRight: 15,
        height: 30
    },
    closeCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: colors.WHITE,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    questionNumber: {
        color: colors.GREEN,
        fontFamily: 'Blender',
        fontWeight: '500'
    },
    scoreWrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 30
    },
    textWrapper: {
        alignItems: 'flex-end',
        marginTop: 20,
        marginRight: 50
    },
    text: {
        color: colors.WHITE,
        fontSize: 16,
        marginTop: 15,
        fontWeight: '500',
        fontFamily: 'Blender'
    },
    percentsWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    percents: {
        color: colors.WHITE,
        fontSize: 29,
        marginLeft: 15,
        lineHeight: 28,
        fontWeight: '900',
        fontFamily: 'Blender-Bold'
    },
    arrow: {
        color: colors.WHITE,
        fontSize: 22,
        marginLeft: 10,
    },
    progress: {
        color: colors.WHITE,
        fontSize: 28,
        fontWeight: '900',
        marginLeft: 15,
        fontFamily: 'Blender-Bold'
    },
    progressBarWrapper: {
        marginTop: 15,
        alignItems: 'center',
    },
    progressBarBg: {
        backgroundColor: colors.WHITE,
        width: 225,
        height: 15,
        borderRadius: 15 / 2
    },
    progressBarChart: {
        backgroundColor: colors.PROGRESSBAR_GREEN,
        height: 15,
        margin: 0,
        borderRadius: 15 / 2,
    },
    chartPanelWrapper: {
        flexDirection: 'row',
        marginTop: 30
    },
    leftPanelWrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginLeft: 35
    },
    rightPanelWrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    ellipseBase: {
        width: 10,
        height: 10,
        borderRadius: 5
    },
    ellipseBlack: {
        backgroundColor: colors.GREY,
    },
    ellipseRed: {
        backgroundColor: colors.RED,
    },
    ellipseYellow: {
        backgroundColor: colors.YELLOW,
    },
    ellipseGreen: {
        backgroundColor: colors.LIGHT_GREEN,
    },
    rightPanelItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    rightPanelItemText: {
        marginLeft: 5,
        color: colors.WHITE,
    },
    waveWrapper: {
        alignItems: 'center',
        marginTop: 35
    },
    chartWrapper: {
        marginLeft: 10
    },
    buttonTextWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    spinner: {
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
});
