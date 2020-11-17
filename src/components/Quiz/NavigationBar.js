import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {Component} from 'react';

import {subjectStyles} from './styles';

import _ from 'underscore';

class NavigationBar extends Component {

    constructor() {
        super();

        this.renderPrevButton = this.renderPrevButton.bind(this);
        this.renderNextButton = this.renderNextButton.bind(this);
        this.renderSubmit = this.renderSubmit.bind(this);
        this.renderTrails = this.renderTrails.bind(this);
    }

    renderPrevButton() {
        return (
            <TouchableOpacity onPress={() => this.props.prevQuestion()}>
                <View style={subjectStyles.navBarIconsQuiz}>
                    <Image style={subjectStyles.iconRightLeftArrow}
                           source={require('./img/left-arrow.png')}/>
                </View>
            </TouchableOpacity>
        )
    }

    renderNextButton() {
        return (
            <TouchableOpacity onPress={() => this.props.nextQuestion()}>
                <View style={subjectStyles.navBarIconsQuiz}>
                    <Image style={subjectStyles.iconRightLeftArrow}
                           source={require('./img/right-arrow.png')}/>
                </View>
            </TouchableOpacity>
        )
    }

    renderSubmit() {

        return (
            <View>
                {(this.props.isAllInteractionsDone) ?
                    <TouchableOpacity onPress={() => this.props.doneQuiz()}>
                        <View style={[
                            subjectStyles.navBarSubmitIcon,
                            {backgroundColor: "#1db4ae"}
                        ]}>
                            <Text style={subjectStyles.navBarSubmitIconText}>סיים</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => this.props.submitInteraction()}
                                      disabled={!this.props.interaction.isActive || !this.props.interaction.isSelected}>
                        <View style={[
                            subjectStyles.navBarSubmitIcon,
                            {backgroundColor: (this.props.interaction.isActive && this.props.interaction.isSelected) ? "#1db4ae" : "#a6abb2"}
                        ]}>
                            <Text style={subjectStyles.navBarSubmitIconText}>בדוק</Text>
                        </View>
                    </TouchableOpacity>
                }
            </View>
        )
    }

    renderTrails() {
        return (
            <Text style={[
                subjectStyles.navTitleText,
                {color: this.props.statusColorSteps}
            ]}>
                {this.props.currentStep}/{this.props.steps}
            </Text>
        )
    }

    render() {
        return (
            <View style={subjectStyles.navBar}>
                {this.renderPrevButton()}
                <View style={subjectStyles.navTitle}>
                    {this.renderSubmit()}
                    {this.renderTrails()}
                </View>
                {this.renderNextButton()}
            </View>
        )
    }
}

NavigationBar.propTypes = {
    interactions: React.PropTypes.array.isRequired,
    steps: React.PropTypes.number.isRequired,
    currentStep: React.PropTypes.number.isRequired,
    currentInteraction: React.PropTypes.number.isRequired,
    statusColorSteps: React.PropTypes.string.isRequired,
    prevQuestion: React.PropTypes.func.isRequired,
    nextQuestion: React.PropTypes.func.isRequired,
    submitInteraction: React.PropTypes.func.isRequired,
};

export default NavigationBar;
