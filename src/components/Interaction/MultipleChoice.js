import {
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import React, {Component} from 'react';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from './RadioButton';

import {interactionStyles} from './styles';

class MultipleChoice extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <RadioForm
                animation={true} style={interactionStyles.listAnswersWrap}>
                {this.props.choices.map(function (item, index) {
                    return (
                        <View key={index} style={[
                            interactionStyles.itemAnswerWrap,
                            {flexDirection: (this.props.isLTR) ? 'row' : 'row-reverse'}
                        ]}>
                            <RadioButton labelHorizontal={true} style={[
                                interactionStyles.itemAnswerRadio,
                                {flexDirection: (this.props.isLTR) ? 'row-reverse' : 'row'}
                            ]}>
                                {(item.isCorrect) ?
                                    <Image style={interactionStyles.iconCorrect}
                                           source={require('./img/correct-label.png')}/>
                                    :
                                    <View/>
                                }
                                <RadioButtonLabel
                                    obj={item}
                                    index={index}
                                    labelHorizontal={false}
                                    labelStyle={[
                                        interactionStyles.itemAnswerLabel,
                                        {color: this.props.getColorOfChoice(item)}
                                    ]}
                                    onPress={(value, index) => {
                                        this.props.selectQuestion(index)
                                    }}
                                    labelWrapStyle={interactionStyles.itemAnswerLabelWrap}
                                />
                                <RadioButtonInput
                                    obj={item}
                                    index={index}
                                    isSelected={item.isSelected}
                                    buttonSize={10}
                                    buttonOuterSize={20}
                                    borderWidth={2}
                                    buttonInnerColor={this.props.getColorOfChoice(item)}
                                    buttonOuterColor={this.props.getColorOfChoice(item)}
                                    buttonStyle={{}}
                                    onPress={(value, index) => {
                                        this.props.selectQuestion(index)
                                    }}
                                    buttonWrapStyle={interactionStyles.itemAnswerInputWrap}
                                />
                            </RadioButton>
                        </View>
                    )
                }, this)}
            </RadioForm>
        )
    }
}
;

export default MultipleChoice;

