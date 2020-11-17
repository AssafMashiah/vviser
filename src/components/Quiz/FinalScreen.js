import React, {Component} from 'react';
import {
    View,
    Image,
} from 'react-native';
import {finalScreenStyles} from './styles';


class FinalScreen extends Component {
    render() {
        return (
            <View style={finalScreenStyles.layout}>
                <Image source={require('./../Quiz/img/quizInfoBg.png')}>
                    <View style={finalScreenStyles.medalWrapper}>
                        <Image source={require('./img/medal_header.png')}/>
                        <Image source={require('./img/medal.png')}/>
                    </View>
                </Image>
            </View>
        )
    }
}

export default FinalScreen;
