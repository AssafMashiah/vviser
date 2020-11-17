import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    View,
    ScrollView,
    Text,
    Animated,
    TouchableOpacity,
    Image,
    TextInput,
    AlertIOS,
    ActivityIndicator,
} from 'react-native';
import _ from 'underscore';
import {treeStyles} from './styles';
import {
    loadItems,
    restoreTreeViewDefaults
} from '../../state/treeView/actions';
const treeData = require('../../jsons/treeData.json');

import {routes} from '../../constants';

class TreeView extends Component {
    componentWillMount() {
        this.props.loadItems();
    }
    componentWillUnmount(){
        this.props.restoreTreeViewDefaults();
    }

    constructor(props) {
        super(props);

        this._openQuiz = this._openQuiz.bind(this);
        this._toggleState = this._toggleState.bind(this);
    }

    _toggleState(node) {
        const {collapsed} = this.props;

        collapsed[node.id] = !collapsed[node.id];
        this.setState({
            collapsed: collapsed
        });
    }

    _getStyle(type, tag) {
        return [treeStyles[tag], treeStyles[type + tag]]
    }

    _openQuiz(node) {
        this.props.navigator.push({
            id: routes.QUIZ,
            quizId: node.id,
            bookId: node.bookId,
            quizTitle: node.title,
            bookTitle: node.bookTitle,
        });
    }

    _getNodeView(node) {
        let cover = '';
        switch (node.id) {
            case 10:
                cover = require('./img/boxes.png');
                break;
            case 1:
                cover = require('./img/glasses.png');
                break;
            case 9:
                cover = require('./img/book.png');
                break;
            case 0:
                cover = require('./img/calc.png');
                break;
            case 3:
                cover = require('./img/quiz.png');
                break;

        }
        if (node.type ==='quiz'){
            cover = require('./img/quiz.png');
        }

        const {collapsed} = this.props;
        const imagePath = !collapsed[node.id] ? require('./img/group.png') : require('./img/path.png');
        const hasChildren = node.data && node.data.length > 0;
        return (
            <View style={[this._getStyle(node.type, 'item'), {height: 50,}]}>
                <View style={!collapsed[node.id] ? treeStyles.arrow : treeStyles.dagger}>
                    {
                        !hasChildren ? node.type == 'quiz' ?
                            <Image source={require('./img/quiz-arrow.png')} style={treeStyles.quizArrow}/> : null
                            : <Image source={imagePath}/>
                    }
                    <Text style={treeStyles.progress}> {node.progress ? node.progress + '%' : null}</Text>
                </View>

                <Text style={this._getStyle(node.type, 'text')}> {node.title} </Text>
                {
                    node.type != 'subject'
                        ? <View style={treeStyles.catIconWrapper}>
                        <Image source={cover} style={treeStyles.catIcon}/>
                    </View>
                        : null
                }
            </View>
        )
    }

    _getNode(node) {
        const {collapsed} = this.props;
        return (
            <View key={node.id} style={[{backgroundColor: node.color}, this._getStyle(node.type, 'node')]}>
                <TouchableOpacity onPress={() => node.type != 'quiz' ? this._toggleState(node) : this._openQuiz(node)}>
                    {this._getNodeView(node)}
                </TouchableOpacity>
                <View style={treeStyles.children}>
                    {
                        !collapsed[node.id] ? null : this.getTree(node.data || [])
                    }
                </View>
            </View>
        )
    }

    getTree(items) {
        const nodes = [];
        for (let i = 0; i < items.length; i++) {
            nodes.push(this._getNode(items[i]))
        }
        return nodes;
    }

    _filter(items) {
        let filtered = [];
        _.each(items, (item) => {
            let matched = [];
            let children = [];
            if (item.data) {
                children = this._filter(item.data.slice());
            }
            if (item.title.indexOf(this.props.filter) !== -1 || children.length > 0) {
                matched = item;
                matched.data = children.slice();
                filtered.push(matched);
            }
        });

        return filtered;
    }

    render() {
        if (this.props.isLoading) {
            return (
                <View style={treeStyles.spinner}>
                    <ActivityIndicator size="large"/>
                </View>
            )
        }
        if (this.props.error) {
            AlertIOS.alert(
                this.props.error.message
            );
        }

        const {items, filter} = this.props;
        const filtered = (filter === '') ? items.slice() : this._filter(items.slice());
        return (
            <View>
                <ScrollView>
                    {this.getTree(filtered)}
                </ScrollView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    const treeView = state.get('treeView');
    const searchbar = state.get('searchbar');
    return {
        items: treeView.get('items'),
        collapsed: treeView.get('collapsed'),
        filter: searchbar.get('filter'),
        error: treeView.get('error'),
        isLoading: treeView.get('isLoading'),
    }
}

function mapDispatchToProps(dispatch) {
    return Object.assign(
        {},
        bindActionCreators({
            loadItems,
            restoreTreeViewDefaults
        }, dispatch),
        {dispatch: dispatch});
}

export default connect(mapStateToProps, mapDispatchToProps)(TreeView);
