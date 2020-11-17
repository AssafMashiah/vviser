import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    View,
    TouchableOpacity,
    Image,
    Text,
    ProgressViewIOS,
    AlertIOS,
    ActivityIndicator
} from 'react-native';
import Iconz from 'react-native-vector-icons/Ionicons';
import PieChart from 'react-native-pie-chart';
import {quizInfoStyles} from './styles';
import {routes} from '../../constants';

import _ from 'underscore';

import {
    loadInfo,
    setQuizComplete,
    restoreQuizInfoDefault,
    loadInfoFromApi
} from '../../state/quizInfo/actions';


class QuizInfo extends Component {
    constructor(props) {
        super(props);
        this._backToQuiz = this._backToQuiz.bind(this);
        this._toCategories = this._toCategories.bind(this);
    }

    componentWillUnmount() {
        this.props.restoreQuizInfoDefault();
    }

    componentWillMount() {
        const routes = this.props.navigator.getCurrentRoutes();
        const isCompleted = _.last(routes).isCompleted;
        const quizId = _.last(routes).quizId || this.props.quizStateId;

        this.props.loadInfoFromApi(quizId);
        if (isCompleted) {
            this.props.setQuizComplete();
        }
    }

    _backToQuiz() {
        this.props.navigator.pop();
    }

    _toCategories() {
        this.props.navigator.popToTop();
    }

    _renderQuizResult() {
        let questionsResult = [];
        let chartColors = [];
        if (this.props.wrongAnswers > 0) {
            questionsResult.push(this.props.wrongAnswers);
            chartColors.push('#d74861')
        }
        if (this.props.rightAnswers > 0) {
            questionsResult.push(this.props.rightAnswers);
            chartColors.push('#9ef7b3')
        }
        if (this.props.halfRightAnswers > 0) {
            questionsResult.push(this.props.halfRightAnswers);
            chartColors.push('#eef16d')
        }
        if (!this.props.isCompleted && this.props.passedQuestions > 0) {
            questionsResult.push(this.props.passedQuestions);
            chartColors.push('#bdc3c7');
        }

        return (
            <View>
                <View style={quizInfoStyles.closeCircleWrapper}>
                    {this.props.isCompleted ? null :
                        <View style={quizInfoStyles.closeCircle}>
                            <Text style={quizInfoStyles.questionNumber}>
                                {this.props.questionNumber}
                            </Text>
                        </View>
                    }
                </View>
                <View style={quizInfoStyles.scoreWrapper}>
                    <Image source={require('./img/score_white.png')}/>
                </View>
                <View style={quizInfoStyles.textWrapper}>
                    <View style={quizInfoStyles.percentsWrapper}>
                        <Text style={quizInfoStyles.text}>העלחה</Text>
                        <Text style={quizInfoStyles.percents}>{Math.round(this.props.finalGrade)}%</Text>
                        <Iconz name="md-arrow-round-back" style={quizInfoStyles.arrow}/>
                    </View>
                    <View style={quizInfoStyles.percentsWrapper}>
                        <Text style={quizInfoStyles.text}>הושלמו</Text>
                        <Text
                            style={quizInfoStyles.progress}>{this.props.rightAnswers}/{this.props.questionsCount}</Text>
                        <Iconz name="md-arrow-round-back" style={quizInfoStyles.arrow}/>
                    </View>
                </View>
                <View style={quizInfoStyles.progressBarWrapper}>
                    <View style={quizInfoStyles.progressBarBg}>
                        <View style={[quizInfoStyles.progressBarChart, {
                            width: Math.round((this.props.rightAnswers / this.props.questionsCount) * 225)
                        }]}></View>
                    </View>
                </View>
                <View style={quizInfoStyles.waveWrapper}>
                    <Image source={require('./img/wave.png')}/>
                </View>
                <View style={quizInfoStyles.chartPanelWrapper}>
                    <View style={quizInfoStyles.leftPanelWrapper}>
                        <View style={quizInfoStyles.rightPanelItem}>
                            <View style={[quizInfoStyles.ellipseBase, quizInfoStyles.ellipseGreen]}></View>
                            <Text style={quizInfoStyles.rightPanelItemText}>תשובות נכונות</Text>
                        </View>
                        <View style={quizInfoStyles.rightPanelItem}>
                            <View style={[quizInfoStyles.ellipseBase, quizInfoStyles.ellipseYellow]}></View>
                            <Text style={quizInfoStyles.rightPanelItemText}>תשובות חלקית</Text>
                        </View>
                        <View style={quizInfoStyles.rightPanelItem}>
                            <View style={[quizInfoStyles.ellipseBase, quizInfoStyles.ellipseRed]}></View>
                            <Text style={quizInfoStyles.rightPanelItemText}>שגיאות</Text>
                        </View>
                        {
                            this.props.isCompleted ? null :
                                <View style={quizInfoStyles.rightPanelItem}>
                                    <View style={[quizInfoStyles.ellipseBase, quizInfoStyles.ellipseBlack]}></View>
                                    <Text style={quizInfoStyles.rightPanelItemText}>חסר</Text>
                                </View>
                        }
                    </View>
                    <View style={quizInfoStyles.rightPanelWrapper}>
                        <View style={quizInfoStyles.chartWrapper}>
                            <PieChart chart_wh={105}
                                      series={questionsResult}
                                      doughnut={true}
                                      coverFill={'#5dc8c1'}
                                      coverRadius={0.72}
                                      sliceColor={chartColors}/>
                        </View>
                    </View>
                </View>
            </View>
        );
    }


    _renderButton() {
        return (
            <TouchableOpacity onPress={this.props.isCompleted ? this._toCategories : this._backToQuiz}>
                <Image style={quizInfoStyles.buttonTextWrapper} source={require('./img/button.png')}>
                    <Image source={require('./img/button_text.png')}/>
                </Image>
            </TouchableOpacity>
        )
    }

    render() {
        if (this.props.error) {
            AlertIOS.alert(
                this.props.error.message
            );
        }
        if (this.props.isLoading)
            return (<View style={quizInfoStyles.spinner}>
                        <ActivityIndicator size="large"/>
                    </View>);

        return (<View style={quizInfoStyles.layout}>
                    <Image source={require('./../Quiz/img/quizInfoBg.png')}>
                        {this._renderQuizResult()}
                    </Image>
                    {this._renderButton()}
                </View>);
    }
}


function mapStateToProps(state) {
    const quizInfo = state.get('quizInfo');
    const quiz = state.get('quiz');
    return {
        finalGrade: quizInfo.get('finalGrade'),
        questionNumber: quiz.get('currentInteraction') + 1,
        questionsCount: quizInfo.get('questionsCount'),
        answeredQuestionsCount: quizInfo.get('answeredQuestionsCount'),
        rightAnswers: quizInfo.get('rightAnswers'),
        wrongAnswers: quizInfo.get('wrongAnswers'),
        halfRightAnswers: quizInfo.get('halfRightAnswers'),
        passedQuestions: quizInfo.get('passedQuestions'),
        isCompleted: quizInfo.get('isCompleted'),
        error: quizInfo.get('error'),
        isLoading: quizInfo.get('isLoading'),
        quizStateId: quiz.get("quizStateId")
    }
}

function mapDispatchToProps(dispatch) {
    return Object.assign(
        {},
        bindActionCreators({
            loadInfo,
            setQuizComplete,
            restoreQuizInfoDefault,
            loadInfoFromApi
        }, dispatch),
        {dispatch: dispatch})
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizInfo);
