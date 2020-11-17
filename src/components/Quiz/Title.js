import {
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import React, {Component} from 'react';

import {ButtonsStatus} from '../Attachment';

import {
    interactionStyles,
} from '../Interaction/styles';

class Title extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <View style={interactionStyles.titleContainer}>
                <View style={[
                    interactionStyles.titleWrap,
                    {flexDirection: (this.props.isLTR) ? 'row-reverse' : 'row'}
                ]}>
                    {(this.props.imageUrl) ?
                        <View style={interactionStyles.titleImageWrap}>
                            <Image source={{uri: this.props.imageUrl}}
                                   onLoadStart={(e) => {
                                       console.log('start')
                                   }}
                                   onLoadEnd={(e) => {
                                       console.log('end')
                                   }}
                                   resizeMode="contain"
                                   style={interactionStyles.navTitleImage}/>
                        </View> :
                        <View/>
                    }
                    <View style={interactionStyles.titleTextWrap}>
                        <Text style={[
                            interactionStyles.titleText,
                            {textAlign: (this.props.isLTR) ? 'left' : 'right'}
                        ]}>{this.props.title}</Text>
                    </View>
                    <ButtonsStatus currentAttachments={this.props.currentAttachments}
                                   currentAttachmentStatus={this.props.currentAttachmentStatus}
                                   setAttachmentType={this.props.setAttachmentType}
                                   openWebBrowser={this.props.openWebBrowser}
                                   togglePlayer={this.props.togglePlayer}
                                   initPlayer={this.props.initPlayer}
                                   hidePlayer={this.props.hidePlayer}/>
                </View>
            </View>
        )
    }
}

export default Title;
