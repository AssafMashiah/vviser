//noinspection JSUnresolvedVariable
import {
    View,
    Text,
    Image,
    Navigator,
    ScrollView,
    ListView,
    TouchableHighlight,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import React, {Component} from 'react';
import TimerMixin from 'react-timer-mixin';
import reactMixin from 'react-mixin';
import _ from 'underscore';
import Icon from 'react-native-vector-icons/FontAwesome';

import MMC from './MMC';
import MultipleChoice from './MultipleChoice';

import {
    commonStyles,
    interactionStyles,
    notificationStyles,
} from './styles';

import {notificationTexts} from '../../constants';

import {interactionTypes} from '../../constants';

// const interaction = require('../../jsons/checkInteraction.json');

class SCTypeQuestion extends Component {
    componentDidMount() {

    }

    constructor() {
        super();

        this.renderList = this.renderList.bind(this);
        this.selectQuestion = this.selectQuestion.bind(this);
        this.setInteractionRead = this.setInteractionRead.bind(this);
        this.checkInteraction = this.checkInteraction.bind(this);
        this.renderNotification = this.renderNotification.bind(this);
        this.openAttachmentPopup = this.openAttachmentPopup.bind(this);
        this.closeAttachmentPopup = this.closeAttachmentPopup.bind(this);
    }

    setInteractionRead() {
        if (!this.props.interaction.isRead && this.props.interaction.isActive) {
            this.props.setInteractionRead();
        }
    }

    checkInteraction() {
        const getAnswers = (choices, type) => {
            const isMMC = type === interactionTypes.MMC;
            let answer = (isMMC) ? [] : null;

            _.each(choices, (choice, index) => {
                if (choice.isSelected) {
                    (isMMC) ? answer.push(index) : answer = index;
                }
            });

            return answer;
        };

        if (this.props.interaction.isActive) {
            const model = {
                quizStateId: this.props.quizStateId,
                interactionIndex: this.props.currentInteraction,
                interactionType: this.props.interaction.interactionType,
                answer: getAnswers(this.props.interaction.choices, this.props.interaction.interactionType),
            };

            this.props.checkInteraction(model);
        }
    }

    openAttachmentPopup() {
        this.props.openAttachmentPopup()
    }

    closeAttachmentPopup() {
        this.props.closeAttachmentPopup()
    }

    setAttachmentType(attachmentType) {
        this.props.setAttachmentType(attachmentType);
    }

    selectQuestion(indexAnswer, isCheckbox) {
        if (this.props.interaction.isActive) {
            if (isCheckbox) {
                this.props.selectCheckboxQuestion(indexAnswer);
            } else {
                this.props.selectRadioQuestion(indexAnswer);
            }
        }
    }

    getColorOfChoice(choice) {
        choice = choice || {};
        const colors = {
            default: '#000000',
            selected: '#1db4ae',
            correct: '#61f7b1',
            halfCorrect: '#ebf228',
            wrong: '#f74661',
        };
        let color = colors.default;

        if (choice.isSelected) color = colors.selected;
        if (choice.isWrong) color = colors.wrong;
        if (choice.isCorrect) color = colors.correct;
        if (choice.isHalfCorrect) color = colors.halfCorrect;

        return color;
    }

    renderNotification() {
        const status = this.props.interaction.status;
        const isSelected = this.props.interaction.isSelected;
        const trials = this.props.interaction.answer.trials;
        const steps = this.props.interaction.answer.maxTrials;
        const goToNext = this.props.goToNext;
        const isAllInteractionsDone = this.props.isAllInteractionsDone;
        let timerGoToNext;

        let notification = (<View/>);

        const getBackground = (type) => {
            const backgroundGood = require('./img/background-good-notif.png');
            const backgroundGoodNext = require('./img/background-good-next.png');
            const backgroundBad = require('./img/background-bad-notif.png');

            switch (type) {
                case 'good':
                    return backgroundGood;
                case 'good-next':
                    return backgroundGoodNext;
                case 'bad':
                    return backgroundBad;
            }
        };

        const getNotification = (type, text, action, showCloseButton, iconName) => {

            let background = getBackground(type);


            const icon = (iconName) ? <Icon color='#fff' size={25} name={iconName} style={{marginRight: 20}}/> :
                <View/>;

            return (
                <TouchableOpacity onPress={() => {
                    if (action) {
                        action();
                    }
                }}>
                    <Image style={notificationStyles.notificationGoodBack}
                           source={background}>
                        {(showCloseButton) ?
                            <Image source={require('./img/close-icon.png')}
                                   style={notificationStyles.notificationCloseImage}/>
                            :
                            <View/>
                        }
                        <View style={notificationStyles.notificationLabel}>
                            {icon}
                            <Text style={notificationStyles.notificationText}>
                                {text}
                            </Text>
                        </View>
                    </Image>
                </TouchableOpacity>
            )
        };

        const setTimeGoToNext = () => {
            if (timerGoToNext) {
                this.clearTimeout(timerGoToNext);
            }
            timerGoToNext = this.setTimeout(()=> {
                this.props.showGoToNext();
            }, 2000)
        };

        const showGoToNext = () => {
            this.clearTimeout(timerGoToNext);
            this.props.showGoToNext();
        };

        if (status === 'correct') {
            if (!goToNext) {
                setTimeGoToNext();
            }
            notification = (getNotification('good', notificationTexts.CORRECT_WELL_DONE, showGoToNext, true));
        }

        if ((status === 'wrong' || status === 'halfCorrect') && !isSelected) {
            notification = (getNotification('bad', notificationTexts.INCORRECT_HINT));
        }

        if ((status === 'wrong' || status === 'halfCorrect') && trials === steps) {
            notification = (getNotification('bad', notificationTexts.INCORRECT_HINT, this.props.showRightAnswer, true, 'frown-o'));
        }

        if (goToNext) {
            notification = (getNotification('good-next', notificationTexts.TO_THE_NEXT_QUESTION, this.props.nextQuestion))
        }

        if (goToNext && isAllInteractionsDone) {
            notification = (getNotification('good-next', notificationTexts.COMPLETE_TEST, this.props.doneQuiz))
        }

        return (
            <View style={notificationStyles.notificationContainer}>
                {notification}
            </View>
        )
    }

    renderList() {
        let choices = <View/>;

        if (this.props.interaction.interactionType === interactionTypes.MMC) {
            choices = <MMC choices={this.props.interaction.choices}
                           getColorOfChoice={this.getColorOfChoice}
                           selectQuestion={this.selectQuestion}
                           isLTR={this.props.isLTR}/>;
        }
        if (this.props.interaction.interactionType === interactionTypes.MULTIPLE_CHOICE) {
            choices = <MultipleChoice choices={this.props.interaction.choices}
                                      getColorOfChoice={this.getColorOfChoice}
                                      selectQuestion={this.selectQuestion}
                                      isLTR={this.props.isLTR}/>;
        }

        return (
            <View>
                {choices}
            </View>
        );
    }

    render() {
        return (
            <View style={interactionStyles.container}>
                {(this.props.isLoading) ?
                    <View style={commonStyles.spinnerAbsoluteWrap}>
                        <ActivityIndicator size="large"/>
                    </View>
                    :
                    <View/>
                }

                <View style={interactionStyles.container}>
                    <View style={interactionStyles.answersContainer}>
                        <View style={interactionStyles.audioAttachmentContainer}/>
                        <View style={interactionStyles.listAnswersWrap}>
                            {this.renderList()}
                        </View>
                        <View>
                            {this.renderNotification()}
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

reactMixin(SCTypeQuestion.prototype, TimerMixin);

SCTypeQuestion.propTypes = {
    interaction: React.PropTypes.object.isRequired,
    quizId: React.PropTypes.string.isRequired,
    quizStateId: React.PropTypes.string.isRequired,
    currentInteraction: React.PropTypes.number.isRequired,
    selectRadioQuestion: React.PropTypes.func.isRequired,
};


export default SCTypeQuestion;
