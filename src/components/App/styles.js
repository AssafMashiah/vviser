import {StyleSheet, Platform} from 'react-native';
import {colors} from '../../constants';

export const appStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: undefined,
        height: undefined,
        backgroundColor:'transparent',
    },
    container: {
        flex: 1,
    },
    containerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    contentHome: {
        flex: 1,
        zIndex: 2,
        // marginTop: 84,
    },
    contentQuiz: {
        flex: 1,
        zIndex: 2,
        // marginTop: 55,

    },
    navBarHome: {
        // height: 84,
        // backgroundColor: '#448aff',
        height: 55,
        // backgroundColor: '#fff',
    },
    navBarQuiz: {
        height: 55,
        // backgroundColor: '#fff',
    },
    navBarBackgroundHome: {
        height: 84,
        backgroundColor: '#448aff',
    },
    navBarBackgroundQuiz: {
        height: 55,
        backgroundColor: '#ffffff',
    },
    navBarBackgroundQuizInfo: {
        height: 75,
        backgroundColor: '#ffffff',
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    navBarBackgroundWebBrowser: {
        height: 75,
        backgroundColor: '#ffffff',
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        },
        zIndex:2
    },
    navBarIconsHome: {
        marginTop: 20,
        marginRight: 15,
        marginLeft: 15,
    },
    navBarIconsQuiz: {
        marginTop: 5,
        marginRight: 15,
        marginLeft: 15,
    },
    navBarIconsQuizInfo: {
        marginTop: 5,
        flexDirection:'row',
        alignItems:'center',
        marginRight:15
    },
    iconRightArrow: {
        height: 19,
        width: 14,
    },
    iconBack: {
        height: 27,
        width: 87,
    },
    iconBackQuizInfo: {
        marginRight:5
    },
    iconScore: {
        height: 25,
        width: 18,
    },
    iconSearch: {
        height: 18,
        width: 18,
    },
    iconMenu: {
        height: 12,
        width: 18,
    },
    navBarTitleContainer: {
        zIndex: 10,
        alignSelf: 'center',
        marginRight: 65,
        marginLeft: 65,
    },
    navBarTitle: {
        textAlign: 'center',
        marginTop: 24,
        marginBottom: 13,
        color: '#000',
        fontWeight: 'bold',
    },
    navBarLogo: {
        marginTop: 5,
        height: 49,
        width: 54,
    },
    navigationMenuItem: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ededed',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
    },
    label: {
        fontSize: 24,
        marginLeft: 10,
    },
    searchBarWrapper:{
      flexDirection:'row',
      alignItems: 'center'
    },
    backArrow:{
        fontSize: 35,
        color: colors.GREEN,
        fontWeight:'bold',
    },
});

export const commonStyles = StyleSheet.create({
    spinnerWrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
