import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

import _ from 'underscore';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {backButtonStyles} from './styles';

import {
    loadButtonLabels,
    restoreButtonDefaults
} from '../../state/backButton/actions';

import {routes} from '../../constants';

class BackButton extends Component {

    componentWillUnmount() {
        this.props.restoreButtonDefaults();
    }

    render() {
        const currentRoute = _.last(this.props.navigator.getCurrentRoutes()).id;
        const showQuestionNumber = currentRoute === routes.QUIZ_INFO || currentRoute === routes.BROWSER;
        return (
            <TouchableOpacity onPress={()=> {
                currentRoute === routes.QUIZ_INFO ? this.props.navigator.pop() : this.props.navigator.popToTop();
            }}>
                <View style={backButtonStyles.container}>
                    <View style={backButtonStyles.textWrapper}>
                        <View style={backButtonStyles.qNumberQuizWrapper}>
                            {showQuestionNumber ?
                                <Text style={[
                                    backButtonStyles.text,
                                    backButtonStyles.questionNumber
                                ]}>
                                    {this.props.questionNumber}
                                    <Text style={{fontWeight: 'bold'}}> | </Text>
                                </Text>
                                :
                                null
                            }
                            <Text style={[backButtonStyles.text,
                                backButtonStyles.quiz]}>{this.props.quiz}</Text>
                        </View>
                        <Text style={[backButtonStyles.text,
                            backButtonStyles.subject]}>{this.props.subject}</Text>
                    </View>
                    <Image source={require('./img/right-arrow.png')}
                           style={backButtonStyles.rightArrow}/>
                </View>
            </TouchableOpacity>
        )
    }
}

function mapStateToProps(state) {
    const quiz = state.get('quiz')
    return {
        quiz: quiz.get('name'),
        subject: quiz.get('bookName'),
        questionNumber: quiz.get('currentInteraction') + 1,
    }
}

function mapDispatchToProps(dispatch) {
    return Object.assign({},
        bindActionCreators({
            loadButtonLabels,
            restoreButtonDefaults
        }, dispatch),
        {dispatch: dispatch});

}

export default connect(mapStateToProps, mapDispatchToProps)(BackButton);
