import {
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import React, {Component} from 'react';
import {attachments} from '../../constants';

import {
    attachmentButtonsStyles,
} from './styles';


class ButtonsStatus extends Component {

    constructor() {
        super();

        this.getIcon = this.getIcon.bind(this);
        this.isIconActive = this.isIconActive.bind(this);
    }

    isIconActive(typeName) {
        let isActive = true;

        if (!this.props.currentAttachmentStatus.isActive) {
            return false;
        }
        if (!this.props.currentAttachments[typeName]) {
            return false;
        }

        return isActive;
    }

    getIcon(imgName, typeName) {
        const images = {
            audio: {
                grey: require('./img/audio-icon-grey.png'),
                green: require('./img/audio-icon-green.png'),
                white: require('./img/audio-icon-white.png'),
            },
            link: {
                grey: require('./img/link-icon-grey.png'),
                green: require('./img/link-icon-green.png'),
                white: require('./img/link-icon-white.png'),
            },
            table: {
                grey: require('./img/table-icon-grey.png'),
                green: require('./img/table-icon-green.png'),
                white: require('./img/table-icon-white.png'),
            },
            text: {
                grey: require('./img/text-icon-grey.png'),
                green: require('./img/text-icon-green.png'),
                white: require('./img/text-icon-white.png'),
            },
            image: {
                grey: require('./img/image-icon-grey.png'),
                green: require('./img/image-icon-green.png'),
                white: require('./img/image-icon-white.png'),
            },
            video: {
                grey: require('./img/video-icon-grey.png'),
                green: require('./img/video-icon-green.png'),
                white: require('./img/video-icon-white.png'),
            },
        };
        const isActive = this.props.currentAttachmentStatus.isActive;
        const isOpen = this.props.currentAttachmentStatus.isOpen;
        const type = this.props.currentAttachmentStatus.type;

        if (type === typeName && isOpen) {
            return images[imgName].green;
        }

        if (isActive && this.isIconActive(typeName)) {
            return images[imgName].white;
        }

        return images[imgName].grey;
    }

    render() {
        return (
            <View style={attachmentButtonsStyles.container}>
                <View style={attachmentButtonsStyles.leftContainer}>
                    <View style={attachmentButtonsStyles.buttonWrap}>
                        <TouchableOpacity onPress={()=> {
                            {/*this.props.setAttachmentType(attachments.AUDIO)*/}
                            this.props.togglePlayer();
                            this.props.initPlayer(this.props.currentAttachments[attachments.AUDIO])
                        }} disabled={!this.isIconActive(attachments.AUDIO)}>
                            <Image style={attachmentButtonsStyles.iconAudio}
                                   source={this.getIcon('audio', attachments.AUDIO)}/>
                        </TouchableOpacity>
                    </View>
                    <View style={attachmentButtonsStyles.buttonWrap}>
                        <TouchableOpacity onPress={()=> {
                            {/*this.props.setAttachmentType(attachments.WEBSITE);*/}
                            this.props.openWebBrowser(this.props.currentAttachments[attachments.WEBSITE]);
                            this.props.hidePlayer();
                        }} disabled={!this.isIconActive(attachments.WEBSITE)}>
                            <Image style={attachmentButtonsStyles.iconLink}
                                   source={this.getIcon('link', attachments.WEBSITE)}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={attachmentButtonsStyles.rightContainer}>
                    <View style={attachmentButtonsStyles.buttonWrap}>
                        <TouchableOpacity onPress={()=> {
                            this.props.setAttachmentType(attachments.TABLE_IMAGE);
                            this.props.hidePlayer();
                        }} disabled={!this.isIconActive(attachments.TABLE_IMAGE)}>
                            <Image style={attachmentButtonsStyles.iconTable}
                                   source={this.getIcon('table', attachments.TABLE_IMAGE)}/>
                        </TouchableOpacity>
                    </View>
                    <View style={attachmentButtonsStyles.buttonWrap}>
                        <TouchableOpacity onPress={()=> {
                            this.props.setAttachmentType(attachments.TEXT);
                            this.props.hidePlayer();
                        }} disabled={!this.isIconActive(attachments.TEXT)}>
                            <Image style={attachmentButtonsStyles.iconText}
                                   source={this.getIcon('text', attachments.TEXT)}/>
                        </TouchableOpacity>
                    </View>
                    <View style={attachmentButtonsStyles.buttonWrap}>
                        <TouchableOpacity onPress={()=> {
                            this.props.setAttachmentType(attachments.IMAGE);
                            this.props.hidePlayer();
                        }} disabled={!this.isIconActive(attachments.IMAGE)}>
                            <Image style={attachmentButtonsStyles.iconImage}
                                   source={this.getIcon('image', attachments.IMAGE)}/>
                        </TouchableOpacity>
                    </View>
                    <View style={attachmentButtonsStyles.buttonWrap}>
                        <TouchableOpacity onPress={()=> {
                            this.props.setAttachmentType(attachments.YOUTUBE);
                            this.props.hidePlayer();
                        }} disabled={!this.isIconActive(attachments.YOUTUBE)}>
                            <Image style={attachmentButtonsStyles.iconVideo}
                                   source={this.getIcon('video', attachments.YOUTUBE)}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

ButtonsStatus.propTypes = {
    currentAttachments: React.PropTypes.object.isRequired,
    currentAttachmentStatus: React.PropTypes.object.isRequired,
};

export default ButtonsStatus;
