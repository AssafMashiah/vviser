import {View, Text} from 'react-native';
import React, {Component} from 'react';

import {questionNumbersStyles} from './styles';

import {questionStatusColors} from '../../constants';

class QuestionNumbers extends Component {

    constructor() {
        super();

        this.generateStyleNumber = this.generateStyleNumber.bind(this);
    }

    getStatusColor(status) {
        switch (status) {
            case 'information':
                return questionStatusColors.INFORMATION;
            case 'correct':
                return questionStatusColors.CORRECT;
            case 'halfCorrect':
                return questionStatusColors.HALF_CORRECT;
            case 'wrong':
                return questionStatusColors.WRONG;
            case 'read':
                return questionStatusColors.READ;
            default: //unread
                return questionStatusColors.UNREAD;
        }
    };

    generateStyleNumber(item, index, current) {
        const statusColor = {color: this.getStatusColor(item.status)};

        // if (current === index) {
        //     statusColor.fontSize = 16;
        // }

        return [
            questionNumbersStyles.numberQuestion,
            statusColor
        ];
    }

    generateStyleNumberWrap(item) {
        const statusColor = {
            borderColor: this.getStatusColor(item.status),
        };

        if (item.status != 'unread' && item.status != 'read') {
            statusColor.backgroundColor = this.getStatusColor(item.status)
        }

        return [
            questionNumbersStyles.numberQuestionWrap,
            statusColor
        ];
    }

    render() {
        return (
            <View style={questionNumbersStyles.numberQuestionsContainer}>
                <View style={questionNumbersStyles.numberQuestionsWrap}>
                    {this.props.interactions.map((item, index) =>
                        <View key={index} style={questionNumbersStyles.numberQuestionsWrap}>
                            <View style={this.generateStyleNumberWrap(item)}>
                                <Text style={this.generateStyleNumber(item, index, this.props.currentInteraction)}>
                                    {index + 1}
                                </Text>
                            </View>
                            {(item.isRelated) ?
                                <View>
                                    <Text style={{color: questionStatusColors.READ}}>-</Text>
                                </View>
                                :
                                <View/>
                            }
                        </View>
                    )}
                </View>
            </View>
        )
    }
}

export default QuestionNumbers;
