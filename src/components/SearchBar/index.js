import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, TouchableOpacity, Image, TextInput} from 'react-native';
import Iconz from 'react-native-vector-icons/Ionicons';
import {searchBarStyles} from './styles';
import {search, restoreDefaults} from '../../state/searchbar/actions';

class Searchbar extends Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount(){
        this.props.restoreDefaults();
    }

    render() {
        if (!this.props.showSearch)
             return null;
        return (
            <View style={searchBarStyles.searchBar}>
                <TouchableOpacity style={searchBarStyles.backButton} onPress={this.props.restoreDefaults}>
                    <Iconz name="ios-arrow-round-back" style={searchBarStyles.backArrow}/>
                </TouchableOpacity>
                <TextInput placeholder={'לחפש...'}
                           style={searchBarStyles.searchInput}
                           onChangeText={(value)=>{
                             this.props.search(value)
                           }}>
                </TextInput>
            </View>)
    }
}


function mapStateToProps(state){
  const searchbar = state.get('searchbar');
  return{
    showSearch:searchbar.get('showSearch'),
    filter: searchbar.get('filter')
  }
}

function mapDispatchToProps(dispatch){
  return Object.assign(
      {},
      bindActionCreators({
          search,
          restoreDefaults
      }, dispatch),
      {dispatch: dispatch});
}

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
