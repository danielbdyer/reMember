import Autocomplete from 'react-native-autocomplete-input';
import firebase from 'react-native-firebase';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

class AutocompleteExample extends Component {
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
  }

  componentDidMount() {
    const attendees = []
    firebase.database().ref('houston/community').orderByChild('name').
      once('value').then((snapshot) => {
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

  return (
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
  );
}
}

const styles = StyleSheet.create({
container: {
  backgroundColor: '#F5FCFF',
  flex: 1,
  paddingTop: 25
},
autocompleteContainer: {
  marginLeft: 30,
  marginRight: 30
},
itemText: {
  fontSize: 15,
  margin: 8
},
descriptionContainer: {
  // `backgroundColor` needs to be set otherwise the
  // autocomplete input will disappear on text input.
  backgroundColor: '#F5FCFF',
  marginTop: 8
},
infoText: {
  textAlign: 'center'
},
titleText: {
  fontSize: 18,
  fontWeight: '500',
  marginBottom: 20,
  marginTop: 20,
  textAlign: 'center'
},
directorText: {
  color: 'grey',
  fontSize: 12,
  marginBottom: 10,
  textAlign: 'center'
},
openingText: {
  textAlign: 'center'
}
});

export default AutocompleteExample;
