import quiz from './quiz/reducer';
import searchbar from './searchbar/reducer';
import treeView from './treeView/reducer';
import quizInfo from './quizInfo/reducer';
import webBrowser from './webBrowser/reducer';
import backButton from './backButton/reducer';
import audioPlayer from './audioPlayer/reducer';


import {combineReducers} from 'redux-immutable';

const applicationReducers = {
    quiz,
    searchbar,
    treeView,
    quizInfo,
    webBrowser,
    backButton,
    audioPlayer
};

function createReducer() {
    return combineReducers(applicationReducers);
}

export default createReducer;
