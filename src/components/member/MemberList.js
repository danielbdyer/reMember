/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import Autocomplete from 'react-native-autocomplete-input'
import PropTypes from 'prop-types';
import { Stylesheet, TouchableOpacity, View, TouchableWithoutFeedback, Text, ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Spinner, Item } from '../common';
import styles from './memberStyle';

const propTypes = {
  getMemberList: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  createMember: PropTypes.func,
  handleSubmit: PropTypes.func,
};

class MemberList extends Component {
  static renderAttendee(attendee) {
    const { name, uid, email } = attendee;

    return (
      <View>
        <Text>{ name }</Text>
      </View>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      attendees: [],
      query: ''
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(props) {
    const { name, email } = props;

    this.props.createMember({ name, email });
  }

  componentWillMount() {
    this.props.getMemberList();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  componentDidMount() {
  const attendees = []
  firebase.database().ref('houston/community').orderByChild('name')
    .once('value').then((snapshot) => {
      snapshot.forEach(function(child) {
        attendees.push({
          uid: child.key,
          name: child.val().name,
          email: child.val().email
        })
      });
        this.setState({ attendees });
    })
}

  createDataSource({ list }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    for (var key in list) {
      console.log(key)
      console.log(list[key])
    }
    this.dataSource = ds.cloneWithRows(list);
  }

  renderRow(member) {
    const { name } = member;

    return (
      <TouchableWithoutFeedback
        onPress={() => { Actions.memberEdit({ member }); }}
      >
        <View>
          <Item style={styles.listContainerStyle}>
            <Text style={styles.listTitleStyle}>{name}</Text>
          </Item>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  findAttendee(query) {
    if (query === '') {
      return [];
    }

    const { attendees } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return attendees.filter(attendee => attendee.name.search(regex) >= 0);
  }

  render() {
    const { query } = this.state;
    const attendees = this.findAttendee(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    const { handleSubmit } = this.props;

    return (
      <View style={{ flex: 1 }}>
        {this.props.loading
          ?
            <Spinner />
          :
            <View>
              <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
              />
              <View style={styles.container}>
                <Autocomplete
                  autoCapitalize="words"
                  autoCorrect={false}
                  containerStyle={styles.autocompleteContainer}
                  data={attendees.length === 1 && comp(query, attendees[0].name) ? [] : attendees}
                  defaultValue={query}
                  onChangeText={text => this.setState({ query: text })}
                  placeholder="Search for your name here"
                  renderItem={({ name, uid }) => (
                    <TouchableOpacity onPress={() => this.setState({ query: name })}>
                      <Text style={styles.itemText}>
                        {name}
                      </Text>
                    </TouchableOpacity>
                  )
                }
                />
                <View style={styles.descriptionContainer}>
                  {attendees.length > 0 || query == "" ? (
                    []
                  ) : (
                    <Text style={styles.infoText}>
                      '{query}' returned no matches
                    </Text>
                  )}
                </View>
              </View>

          </View>
          }
      </View>
    );
  }
}


MemberList.propTypes = propTypes;

export default MemberList;
