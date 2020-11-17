import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import Iconz from 'react-native-vector-icons/Ionicons';
import {ReactNativeAudioStreaming} from 'react-native-audio-streaming';
import _ from 'underscore';
import TimerMixin from 'react-timer-mixin';
import reactMixin from 'react-mixin';
import Slider from 'react-native-slider';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {audioPlayerStyles} from './styles';

import {
    setPlaybackPosition,
    togglePlayer,
    initPlayer,
    restorePlayerDefaults,
    getPlayerStatus
} from '../../state/audioPlayer/actions';


class AudioPlayer extends Component {
    constructor() {
        super();
        this._startStatusWatcher = this._startStatusWatcher.bind(this);
        this._withLeadingZero = this._withLeadingZero.bind(this);
        this._formattedTime = this._formattedTime.bind(this);
    }

    componentWillUnmount() {
        ReactNativeAudioStreaming.stop();
        this.props.restorePlayerDefaults();
    }

    _startStatusWatcher() {
        let iteration = 0;
        const interval = this.setInterval(() => {
            ReactNativeAudioStreaming.getStatus(this.props.getPlayerStatus);
            if (iteration && this.props.paused) {
                this.clearInterval(interval);
            }
            iteration++;
            if (this.props.hidden){
                ReactNativeAudioStreaming.stop();
            }

        }, 1000);
    }

    _withLeadingZero(amount) {
        if (amount < 10) {
            return `0${ amount }`;
        } else {
            return `${ amount }`;
        }
    }

    _formattedTime(timeInSeconds) {
        let minutes = Math.floor(timeInSeconds / 60);
        let seconds = timeInSeconds - minutes * 60;

        if (isNaN(minutes) || isNaN(seconds)) {
            return "";
        } else {
            return (`${ this._withLeadingZero(minutes) }:${ this._withLeadingZero(seconds.toFixed(0)) }`);
        }
    }


    render() {
        return (
            <View style={{position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1000}}>
                {
                    this.props.hidden
                        ? <View/> :
                        <View style={[audioPlayerStyles.wrapper, audioPlayerStyles.container]}>
                            <View style={[audioPlayerStyles.wrapper, audioPlayerStyles.playerWrapper]}>
                                <View style={[audioPlayerStyles.wrapper, audioPlayerStyles.buttonsWrapper]}>
                                    <TouchableOpacity onPress={() => {
                                        ReactNativeAudioStreaming.pause();
                                        ReactNativeAudioStreaming.getStatus(this.props.getPlayerStatus);
                                    }
                                    }>
                                        <Iconz name="ios-pause"
                                               style={[audioPlayerStyles.button, audioPlayerStyles.playButton]}/>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => {
                                        ReactNativeAudioStreaming.play(this.props.track,
                                            {showIniOSMediaCenter: true, showInAndroidNotifications: false});
                                        this._startStatusWatcher();
                                    }
                                    }>
                                        <Iconz name="ios-play"
                                               style={[audioPlayerStyles.button, audioPlayerStyles.playButton]}/>
                                    </TouchableOpacity>
                                </View>

                                <View style={[audioPlayerStyles.wrapper, audioPlayerStyles.sliderWrapper]}>
                                    <Text style={audioPlayerStyles.time}>{this._formattedTime(this.props.status.progress)}</Text>

                                    <Slider style={audioPlayerStyles.slider}
                                            maximumValue={this.props.status.duration}
                                            value={this.props.status.progress}
                                            onValueChange={this.props.setPlaybackPosition}
                                            onSlidingComplete={() => {
                                                ReactNativeAudioStreaming.seekToTime(this.props.sliderPosition);
                                            }}
                                            minimumTrackTintColor="#000"
                                            maximumTrackTintColor='#FFFFFF'
                                            trackStyle={ audioPlayerStyles.track }
                                            thumbStyle={ audioPlayerStyles.sliderThumb }/>
                                    <Text style={audioPlayerStyles.time}>-{this._formattedTime(this.props.status.duration - this.props.status.progress)}</Text>
                                </View>
                            </View>
                        </View>
                }
            </View>
        )
    }
}

function mapStateToProps(state) {
    const audioPlayer = state.get('audioPlayer')

    return {
        hidden: audioPlayer.get('hidden'),
        track: audioPlayer.get('track'),
        status: audioPlayer.get('status'),
        sliderPosition: audioPlayer.get('sliderPosition'),
        paused: audioPlayer.get('paused'),
    }
}

function mapDispatchToProps(dispatch) {
    return Object.assign({},
        bindActionCreators({
            setPlaybackPosition,
            togglePlayer,
            initPlayer,
            restorePlayerDefaults,
            getPlayerStatus
        }, dispatch),
        {dispatch: dispatch});

}

reactMixin(AudioPlayer.prototype, TimerMixin);
export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayer);
