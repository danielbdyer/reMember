const styles = {
  loadingContainer: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  error: {
    fontSize: 20,
    alignSelf: 'center',
    color: '#e62117',
    paddingTop: 20,
    paddingBottom: 10,
  },
  listTitleStyle: {
    fontSize: 18,
    paddingLeft: 15,
    color: '#4d4d4d',
  },
  listContainerStyle: {
    borderColor: '#e5e3e3',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1
  },
  container: {
    backgroundColor: '#F5FCFF',
    paddingTop: 20
  },
  autocompleteContainer: {
    alignSelf: 'stretch',
    paddingLeft: 20,
    width: 350,
    position: 'absolute'
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
    textAlign: 'center',
    paddingTop: 20,
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
};

export default styles;
