import {
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import React, {Component} from 'react';
import {CheckboxField, Checkbox} from 'react-native-checkbox-field';

import {interactionStyles} from './styles';

class MMC extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <View style={interactionStyles.listAnswersWrap}>
                {this.props.choices.map(function (item, index) {
                    return (
                        <View key={index} style={[
                            interactionStyles.itemAnswerWrap,
                            {flexDirection: (this.props.isLTR) ? 'row' : 'row-reverse'}
                        ]}>
                            <CheckboxField
                                label={item.label}
                                onSelect={() => {
                                    this.props.selectQuestion(index, true)
                                }}
                                selected={item.isSelected}
                                defaultColor="#fff"
                                selectedColor="#fff"
                                containerStyle={interactionStyles.containerStyle}
                                labelStyle={[
                                    interactionStyles.itemAnswerLabel,
                                    {color: this.props.getColorOfChoice(item)}
                                ]}
                                checkboxStyle={interactionStyles.checkboxStyle}
                                labelSide={(this.props.isLTR) ? "right" : "left"}>
                                {(item.isSelected) ?
                                    <Image source={require('./img/checkbox.png')}/>
                                    :
                                    <View/>
                                }
                            </CheckboxField>
                            {(item.isCorrect) ?
                                <Image style={interactionStyles.iconCorrect}
                                       source={require('./img/correct-label.png')}/>
                                :
                                <View/>
                            }
                        </View>
                    )
                }, this)}
            </View>
        )
    }
}

export default MMC;
