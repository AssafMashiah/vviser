import {View, Text, Image, Platform, Navigator, TouchableHighlight, I18nManager, TextInput, ScrollView, Dimensions} from 'react-native';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TouchableOpacity from 'TouchableOpacity';
import {appStyles} from './styles';
import Iconz from 'react-native-vector-icons/Ionicons';
import Quiz from '../Quiz';
import Searchbar from '../SearchBar';
import {showSearchbar} from '../../state/searchbar/actions';
import QuizInfo from '../QuizInfo';
import TreeView from '../TreeView';
import WebBrowser from '../WebBrowser';
import BackButton from '../BackButton';
import PhotoView from 'react-native-photo-view';
import _ from 'underscore';


const {height, width} = Dimensions.get('window');
import {routes} from '../../constants';

class App extends Component {
    NavigationBarHome = (openDrawer, showSearchbar, openQuizInfo) => (
    {
        LeftButton(route, navigator, index, navState) {
            return (
                <View style={{flexDirection: 'row'}}>
                    {(()=> {
                        switch (route.id) {
                            case  routes.HOME:
                                return (
                                    <View style={{flexDirection: 'row'}}>
                                        <TouchableOpacity onPress={showSearchbar}>
                                            <View style={appStyles.navBarIconsHome}>
                                                <Image style={appStyles.iconSearch}
                                                       source={require('./img/icon-search.png')}/>
                                            </View>
                                        </TouchableOpacity>
                                        <Searchbar/>
                                    </View>
                                );
                            case  routes.QUIZ:
                                return (
                                    <TouchableOpacity onPress={openQuizInfo}>
                                        <View style={appStyles.navBarIconsQuiz}>
                                            <Image style={appStyles.iconScore}
                                                   source={require('./img/score.png')}/>
                                        </View>
                                    </TouchableOpacity>
                                )
                            case routes.BROWSER:
                            case routes.PHOTO_VIEWER:
                                return (
                                    <TouchableOpacity onPress={()=> navigator.pop()}>
                                        <View style={appStyles.navBarIconsQuiz}>
                                            <Iconz name="ios-arrow-round-back" style={appStyles.backArrow}/>
                                        </View>
                                    </TouchableOpacity>
                                )
                        }
                    })()}
                </View>
            )
        },

        RightButton(route, navigator, index, navState) {
            return (
                <View>
                    {(() => {
                        switch (route.id) {
                            case  routes.HOME:
                                return (
                                    <TouchableOpacity onPress={openDrawer}>
                                        <View style={appStyles.navBarIconsHome}>
                                            <Image style={appStyles.iconMenu}
                                                   source={require('./img/icon-menu.png')}/>
                                        </View>
                                    </TouchableOpacity>
                                );
                            case routes.QUIZ:
                            case routes.QUIZ_INFO:
                            case routes.BROWSER:
                                return (
                                    <BackButton navigator={navigator}/>
                                )
                        }
                    })()}
                </View>
            )
        },

        Title(route, navigator, index, navState) {
            return (
                <View style={appStyles.navBarTitleContainer}>
                    {(() => {
                        switch (route.id) {
                            case  routes.HOME:
                                return (
                                    <Image style={appStyles.navBarLogo}
                                           source={require('./img/logo.png')}/>
                                );
                        }
                    })()}
                </View>
            )
        },
    }
    );

    constructor(props) {
        super(props);
        this.renderNavigation = this.renderNavigation.bind(this);
        this.openQuizInfo = this.openQuizInfo.bind(this);
    }

    renderScene(route, navigator) {
        switch (route.id) {
            case routes.HOME:
                return (
                    <View style={appStyles.contentHome}>
                        <View style={appStyles.navBarBackgroundHome}/>
                        {/*<Home navigator={navigator} search/>*/}
                        <TreeView navigator={navigator}/>
                        {/*<Text>{(I18nManager.isRTL)?'yep':'no'}</Text>*/}
                    </View>
                );
            case routes.QUIZ:
                return (
                    <View style={appStyles.contentQuiz}>
                        <View style={appStyles.navBarBackgroundQuiz}/>
                        <Quiz navigator={navigator}/>
                    </View>
                );
            case routes.QUIZ_INFO:
                return (
                    <View style={appStyles.contentQuiz}>
                        <View style={appStyles.navBarBackgroundQuizInfo}/>
                        <QuizInfo navigator={navigator}/>
                    </View>
                );
            case routes.BROWSER:
                return (
                    <View style={appStyles.contentQuiz}>
                        <View style={appStyles.navBarBackgroundWebBrowser}></View>
                        <WebBrowser navigator={navigator}/>
                    </View>
                );
            case routes.PHOTO_VIEWER:{
                const route = navigator.getCurrentRoutes();
                const imageUrl = _.last(route).imageUrl;
                return(
                    <View style={appStyles.contentQuiz}>
                        <View style={appStyles.navBarBackgroundWebBrowser}></View>
                        <PhotoView
                            source={{uri: imageUrl}}
                            resizeMode="contain"
                            minimumZoomScale={0.5}
                            maximumZoomScale={3}
                            style={{width: width, height: height-84}}/>
                    </View>
                )
            }
        }
    }

    openQuizInfo () {
        this.refs.navigator.push({id: routes.QUIZ_INFO});
    }

    renderNavigation() {
        return (
            <View style={appStyles.container}>
                <TouchableHighlight
                    onPress={() => {
                        console.log('Login button press')
                    }}
                    underlayColor={'#ccc'}>
                    <View style={appStyles.navigationMenuItem}>
                        <Text style={appStyles.label}>התחבר</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => {
                        console.log('Logout button press')
                    }}
                    underlayColor={'#ccc'}>
                    <View style={appStyles.navigationMenuItem}>
                        <Text style={appStyles.label}>להתנתק</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    render() {
        return (
            <Image source={require('./img/layout.png')}
                   style={appStyles.mainContainer}>
                <Navigator
                    ref="navigator"
                    configureScene={(route) => Navigator.SceneConfigs.FadeAndroid}
                    initialRoute={{
                        id: routes.HOME
                    }}
                    renderScene={this.renderScene.bind(this)}
                    navigationBar={
                        <Navigator.NavigationBar
                            style={appStyles.navBarQuiz}
                            routeMapper={this.NavigationBarHome(this.openDrawer, this.props.showSearchbar, this.openQuizInfo)}/>
                    }/>
            </Image>
        );
    }
}

// App.propTypes = {
//   dispatch: React.PropTypes.func.isRequired,
// };

function mapDispatchToProps(dispatch) {
    return Object.assign(
        {},
        bindActionCreators({
            showSearchbar,
        }, dispatch),
        {dispatch: dispatch});
}
export default connect(null, mapDispatchToProps)(App);
