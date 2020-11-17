import {
    View,
    WebView,
    Text
} from 'react-native';
import React, {Component} from 'react';
import _ from 'underscore';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    browseToPage,
    restoreBrowserDefaults,
} from '../../state/webBrowser/actions';

import {
    commonStyles,
    urlBarStyles,
    webBrowserStyles
} from './styles';

class WebBrowser extends Component {
    constructor() {
        super();
        this.renderWebView = this.renderWebView.bind(this);
    }

    componentWillMount() {
        const routes = this.props.navigator.getCurrentRoutes();
        const url = _.last(routes).url;
        if (url) {
            this.props.browseToPage(url);
        }
    }

    componentWillUnmount() {
        this.props.restoreBrowserDefaults();
    }

    renderWebView() {
        return (
            <WebView
                style={webBrowserStyles.browser}
                source={{
                    uri: this.props.url,
                }}
            />);
    }

    render() {
        return (
            <View style={commonStyles.container}>
                <View style={urlBarStyles.container}>
                    <Text style={urlBarStyles.url}>{this.props.url}</Text>
                </View>
                {(this.props.url) ?
                    this.renderWebView()
                    :
                    <View/>
                }
            </View>);
    }
}

function mapStateToProps(state) {
    const browser = state.get('webBrowser');
    debugger
    return {
        url: browser.get('url'),
    }
}

function mapDispatchToProps(dispatch) {
    return Object.assign({},
        bindActionCreators({
            browseToPage,
            restoreBrowserDefaults
        }, dispatch),
        {dispatch: dispatch});
}

export default connect(mapStateToProps, mapDispatchToProps)(WebBrowser);


