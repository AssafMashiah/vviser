import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import React, {Component} from 'react';
import YouTube from 'react-native-youtube';
import {
    attachments,
    routes
} from '../../constants';

import ButtonsStatus from './ButtonsStatus';

import {
    commonStyles,
    attachmentStyles,
} from './styles';

class Attachment extends Component {
    componentDidMount() {

    }

    constructor() {
        super();

        this.renderAttachment = this.renderAttachment.bind(this);
    }

    renderAttachment() {

        switch (this.props.type) {
            case attachments.YOUTUBE:
                return (
                    <YouTube
                        ref="youtubePlayer"
                        videoId={this.props.attachment}
                        playsInline={true}
                        style={{alignSelf: 'stretch', flex: 1, backgroundColor: 'black'}}
                    />
                );
            case attachments.IMAGE:
            case attachments.TABLE_IMAGE:
                return (
                <View style={attachmentStyles.container}>
                    <Image
                        style={{flex: 1, resizeMode: 'contain'}}
                        source={{uri: this.props.attachment}}
                    />
                    <TouchableOpacity style={{alignItems:'flex-end', margin:10}} onPress={()=>{
                        this.props.navigator.push({
                            id: routes.PHOTO_VIEWER,
                            imageUrl: this.props.attachment
                        });
                    }}>
                        <Image source={require('./img/resize.png')}></Image>
                    </TouchableOpacity>
                </View>
            );
            case attachments.TEXT:
                return (
                        <ScrollView>
                            <Text>{this.props.attachment}</Text>
                        </ScrollView>
                )

        }
    }

    render() {
        return (
            <View style={attachmentStyles.container}>
                {(this.props.isLoading) ?
                    <View style={commonStyles.spinnerWrap}>
                        <ActivityIndicator size="large"/>
                    </View>
                    :
                    <View style={attachmentStyles.container}>
                        {this.renderAttachment()}
                    </View>
                }
            </View>
        );
    }
}

Attachment.propTypes = {
    // attachment: React.PropTypes.string.isRequired,
    // type: React.PropTypes.string.isRequired,
};


export default Attachment
export {ButtonsStatus}
