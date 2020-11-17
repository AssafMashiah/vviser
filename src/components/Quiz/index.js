import {
    View,
    Text,
    Image,
    Navigator,
    ScrollView,
    ListView,
    TouchableHighlight,
    TouchableOpacity,
    ActivityIndicator,
    AlertIOS,
    WebView
} from 'react-native';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TimerMixin from 'react-timer-mixin';
import reactMixin from 'react-mixin';
import _ from 'underscore';
import Drawer from 'react-native-drawer';

import {routes} from '../../constants';

import bindIndexToActionCreators from '../../state/bindIndexToActionCreators';

import {
    restoreDefaultQuiz,
    loadQuiz,
    loadLocalQuiz, //test
    setQuestion,
    showFinalScreen,
    bindQuizAndBookName,
    startChangingRoute,
    stopChangingRoute,
} from '../../state/quiz/actions';

import {
    togglePlayer,
    initPlayer,
    hidePlayer
} from '../../state/audioPlayer/actions';

import {
    setInteractionRead,
    setQuestions,
    selectRadioQuestion,
    selectCheckboxQuestion,
    checkInteraction,
    showRightAnswer,
    showGoToNext,
    setInteractionStatus,
    openAttachmentPopup,
    closeAttachmentPopup,
    setAttachmentType,
} from '../../state/interaction/actions';

import Title from './Title';
import QuestionNumbers from './QuestionNumbers';
import NavigationBar from './NavigationBar';
import FinalScreen from './FinalScreen';
import Interaction from '../Interaction';
import Attachment from '../Attachment';
import AudioPlayer from '../AudioPlayer';

import {subjectStyles, drawerStyles} from './styles';
import {interactionStyles} from '../Interaction/styles';

import {textDirection} from '../../constants';

const quiz = require('../../jsons/quiz.json');

const SCDispatchProperties =
    index =>
        dispatch => bindActionCreators(
            bindIndexToActionCreators({
                selectRadioQuestion,
                selectCheckboxQuestion,
                setInteractionRead,
                checkInteraction,
                showRightAnswer,
                showGoToNext,
                setInteractionStatus,
                openAttachmentPopup,
                closeAttachmentPopup,
                setAttachmentType,
            }, index),
            dispatch);


class Quiz extends Component {
    componentDidMount() {
        // this.props.loadLocalQuiz(quiz);
        //this.props.loadQuiz('54408d43dd64a361ffafe226');
        const routes = this.props.navigator.getCurrentRoutes();
        const quizId = _.last(routes).quizId;
        const bookId = _.last(routes).bookId;
        if (quizId) {
            this.props.loadQuiz(bookId, quizId);
        }

        this.props.bindQuizAndBookName(_.last(routes).quizTitle, _.last(routes).bookTitle);
    }

    componentWillUnmount() {
        //this.props.restoreDefaultQuiz();
    }

    constructor() {
        super();

        this.nextQuestion = this.nextQuestion.bind(this);
        this.prevQuestion = this.prevQuestion.bind(this);
        this.submitInteraction = this.submitInteraction.bind(this);
        this.renderQuiz = this.renderQuiz.bind(this);
        this.doneQuiz = this.doneQuiz.bind(this);
        this.renderDrawerContent = this.renderDrawerContent.bind(this);
        this.renderAttachment = this.renderAttachment.bind(this);
        this.onAttachmentPopupClose = this.onAttachmentPopupClose.bind(this);
        this.onAttachmentPopupOpen = this.onAttachmentPopupOpen.bind(this);
        this.setAttachmentType = this.setAttachmentType.bind(this);
        this.openWebBrowser = this.openWebBrowser.bind(this);
        this.togglePlayer = this.togglePlayer.bind(this);
        this.initPlayer = this.initPlayer.bind(this);
        this.hidePlayer = this.hidePlayer.bind(this);
    }

    setRef(ref) {
        if (!this.refsQuestion) this.refsQuestion = [];
        this.refsQuestion.push(ref);
    }

    nextQuestion() {
        if (!this.props.routeChanging && this.props.currentInteraction < (this.props.numberOfQuestions - 1)) {
            this.refs['questionsNav'].jumpForward();
        }
    }

    prevQuestion() {
        if (!this.props.routeChanging && this.props.currentInteraction) {
            this.refs['questionsNav'].jumpBack();
        }
    }

    onDidFocus(route) {
        this.props.stopChangingRoute();
        this.refsQuestion[route.index].setInteractionRead();
    }

    onWillFocus(route) {
        this.props.startChangingRoute();
        this.props.setQuestion(route.index);
    }

    onAttachmentPopupClose() {
        this.refsQuestion[this.props.currentInteraction].closeAttachmentPopup();
    }

    onAttachmentPopupOpen() {
        this.refsQuestion[this.props.currentInteraction].openAttachmentPopup();
    }

    setAttachmentType(attachmentType) {
        this.refsQuestion[this.props.currentInteraction].setAttachmentType(attachmentType);
    }

    submitInteraction() {
        this.refsQuestion[this.props.currentInteraction].checkInteraction();
    }

    doneQuiz() {
        const stateId = this.props.quizStateId;
        this.props.showFinalScreen();
        this.setTimeout(
            ()=> {
                this.props.navigator.replace({
                    id: routes.QUIZ_INFO,
                    isCompleted: true,
                    quizId: stateId,
                });
            },
            2000
        );
    }

    openWebBrowser(url) {
        this.props.navigator.push({
            id: routes.BROWSER,
            url: url,
        });
    }

    togglePlayer() {
        this.props.togglePlayer();
    }

    initPlayer(trackUrl) {
        this.props.initPlayer(trackUrl);
    }

    hidePlayer() {
        this.props.hidePlayer();
    }

    checkIfAllInteractionsDone(interactions) {
        let isDone = true;

        if (_.findWhere(interactions, {isActive: true})) {
            isDone = false;
        }

        return isDone;
    }

    renderScene(route, navigator) {
        const isAllInteractionsDone = this.checkIfAllInteractionsDone(this.props.interactions);
        const currentInteraction = this.props.interactions[route.index];
        const isLTR = currentInteraction.textDir === textDirection.LTR;
        return (
            <View style={subjectStyles.content}>
                <Interaction
                    ref={this.setRef.bind(this)}
                    nextQuestion={this.nextQuestion}
                    doneQuiz={this.doneQuiz}
                    interaction={currentInteraction}
                    isLoading={currentInteraction.isLoading}
                    isLTR={isLTR}
                    quizId={this.props.id}
                    quizStateId={this.props.quizStateId}
                    currentInteraction={this.props.currentInteraction}
                    style={subjectStyles.content}
                    index={this.props.currentInteraction}
                    goToNext={currentInteraction.goToNext}
                    isAllInteractionsDone={isAllInteractionsDone}
                    {...SCDispatchProperties(this.props.currentInteraction)(this.props.dispatch)}/>
            </View>)
    }

    renderAttachment() {
        const index = this.props.currentInteraction;
        const currentAttachmentType = this.props.interactions[index].attachmentStatus.type;
        const currentAttachments = this.props.interactions[index].attachments[currentAttachmentType];

        return (
            <View style={drawerStyles.mainWrap}>
                <Attachment navigator={this.props.navigator}
                            attachment={currentAttachments}
                            type={currentAttachmentType}/>
            </View>
        )
    }

    renderDrawerContent(attachmentStatus) {
        const index = this.props.currentInteraction;
        const currentInteraction = this.props.interactions[index]
        const isLTR = currentInteraction.textDir === textDirection.LTR;
        return (
            <View style={[
                drawerStyles.containerDrawer,
                {flexDirection: (isLTR) ? 'column-reverse' : 'column'}
                ]}>
                <View style={[
                    drawerStyles.container,
                    {
                        left: (isLTR) ? -20 : 0,
                        right: (isLTR) ? 0 : -20,
                        flexDirection: (isLTR) ? 'row-reverse' : 'row',
                    }
                ]}>
                    <View style={drawerStyles.mainContainer}>
                        {this.renderAttachment()}
                    </View>
                    <View style={drawerStyles.toggleButtonContainer}>
                        <View style={[
                            drawerStyles.toggleButtonWrap,
                            (isLTR) ? {left: -40} : {right: -40}
                        ]}>
                            <TouchableOpacity disabled={!attachmentStatus.isActive} onPress={() => {
                                this.refs.drawer.toggle()
                            }} style={[
                                drawerStyles.toggleButton,
                                (isLTR) ? {marginLeft: 5} : {marginRight: 5}
                            ]}>
                                {(attachmentStatus.isOpen) ?
                                    <Image style={drawerStyles.iconButton}
                                           source={require('./img/close-drawer.png')}/>
                                    :
                                    <Image style={drawerStyles.iconButton}
                                           source={(isLTR) ? require('./img/arrow-left-drawer.png') : require('./img/arrow-right-drawer.png')}/>
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    renderQuiz() {
        const index = this.props.currentInteraction;
        const currentInteraction = this.props.interactions[index];
        const currentAttachments = this.props.interactions[index].attachments;
        const currentAttachmentStatus = this.props.interactions[index].attachmentStatus;
        const isAllInteractionsDone = this.checkIfAllInteractionsDone(this.props.interactions);
        const isLTR = currentInteraction.textDir === textDirection.LTR;

        return (
            <View style={subjectStyles.container}>
                {(this.props.isFinalScreen) ?
                    <View>
                        <View style={subjectStyles.navBarBackgroundQuizInfo}/>
                        <FinalScreen/>
                    </View>
                    :
                    <View style={subjectStyles.container}>
                        <QuestionNumbers currentInteraction={index}
                                         interactions={this.props.interactions}/>
                        <View style={interactionStyles.container}>
                            <Title title={currentInteraction.question}
                                   imageUrl={currentInteraction.imageUrl}
                                   setAttachmentType={this.setAttachmentType}
                                   openWebBrowser={this.openWebBrowser}
                                   togglePlayer={this.togglePlayer}
                                   initPlayer={this.initPlayer}
                                   hidePlayer={this.hidePlayer}
                                   isLTR={isLTR}
                                   currentAttachments={currentAttachments}
                                   currentAttachmentStatus={currentAttachmentStatus}
                                   style={interactionStyles.titleContainer}/>
                            <View style={interactionStyles.answersContainer}>
                                <AudioPlayer/>
                                <Drawer ref="drawer"
                                        type="overlay"
                                        side={(isLTR) ? "right" : "left"}
                                        open={currentAttachmentStatus.isOpen}
                                        disabled={!currentAttachmentStatus.isActive}
                                        content={this.renderDrawerContent(currentAttachmentStatus)}
                                        onOpenStart={this.onAttachmentPopupOpen}
                                        onCloseStart={this.onAttachmentPopupClose}
                                        panCloseMask={1}
                                        panOpenMask={0.18}
                                        openDrawerOffset={0.2}>
                                    <Navigator
                                        style={subjectStyles.navWrapper}
                                        ref='questionsNav'
                                        configureScene={(route) => Navigator.SceneConfigs.HorizontalSwipeJump}
                                        onDidFocus={this.onDidFocus.bind(this)}
                                        onWillFocus={this.onWillFocus.bind(this)}
                                        initialRoute={this.props.interactions[0]}
                                        initialRouteStack={this.props.interactions}
                                        renderScene={this.renderScene.bind(this)}/>
                                    <NavigationBar prevQuestion={this.prevQuestion} nextQuestion={this.nextQuestion}
                                                   submitInteraction={this.submitInteraction}
                                                   doneQuiz={this.doneQuiz}
                                                   style={{zIndex: 0}}
                                                   steps={currentInteraction.answer.maxTrials}
                                                   interactions={this.props.interactions}
                                                   interaction={this.props.interactions[index]}
                                                   statusColorSteps={currentInteraction.statusColorSteps}
                                                   currentStep={currentInteraction.answer.trials} //answer.trials
                                                   currentInteraction={index}
                                                   isAllInteractionsDone={isAllInteractionsDone}/>

                                </Drawer>
                            </View>
                        </View>
                    </View>
                }
            </View>
        )
    }

    render() {
        if (this.props.error) {
            AlertIOS.alert(
                this.props.error.message
            );
        }

        return (
            <View style={subjectStyles.mainContainer}>
                {(this.props.isLoading) ?
                    <View style={subjectStyles.spinnerWrap}>
                        <ActivityIndicator size="large"/>
                    </View>
                    :
                    ((!this.props.error) ?
                            this.renderQuiz()
                            :
                            <View/>
                    )
                }
            </View>
        );
    }
}

reactMixin(Quiz.prototype, TimerMixin);

Quiz.propTypes = {
    navigator: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const quiz = state.get('quiz');
    return {
        id: quiz.get('id'),
        routeChanging: quiz.get('routeChanging'),
        quizStateId: quiz.get('quizStateId'),
        isLoading: quiz.get('isLoading'),
        isFinalScreen: quiz.get('showFinalScreen'),
        error: quiz.get('error'),
        name: quiz.get('name'),
        interactions: quiz.get('interactions').toJS(),
        currentInteraction: quiz.get('currentInteraction'),
        numberOfQuestions: quiz.get('numberOfQuestions'),
    }
}

function mapDispatchToProps(dispatch) {
    return Object.assign(
        {},
        bindActionCreators({
            restoreDefaultQuiz,
            loadQuiz,
            loadLocalQuiz, //test
            setQuestion,
            setQuestions,
            showFinalScreen,
            bindQuizAndBookName,
            togglePlayer,
            initPlayer,
            hidePlayer,
            startChangingRoute,
            stopChangingRoute,
        }, dispatch),
        {dispatch: dispatch})
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
