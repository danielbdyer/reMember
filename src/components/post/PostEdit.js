import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { Container, Item, Button, Input, Spinner, Confirm } from '../common';
import styles from './postStyle';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  postError: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  updatePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

class PostEdit extends Component {
  constructor(props) {
    super(props);

    this.state = { modal: false };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onAccept = this.onAccept.bind(this);
    this.onDecline = this.onDecline.bind(this);
  }

  onAccept() {
    this.props.deletePost({ uid: this.props.post.uid });
  }

  onDecline() {
    this.setState({ modal: false });
  }

  handleFormSubmit(props) {
    const { name, email, uid } = props;

    this.props.updatePost({ name, email, uid });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Container>
        <Item>
          <Field
            name="name"
            placeholder="Full Name"
            autoCapitalize={'words'}
            component={Input}
            containerStyle={{ height: 70 }}
          />
        </Item>

        <Item>
          <Field
            name="email"
            placeholder="Email Address"
            autoCapitalize={'none'}
            component={Input}
          />
        </Item>

        {this.props.postError
          ?
            <Text style={styles.error}>
              {this.props.postError}
            </Text>
          :
            <View />}

        {this.props.loading
          ?
            <Item style={styles.loadingContainer}>
              <Spinner />
            </Item>
          :
            <Item>
              <Button onPress={handleSubmit(this.handleFormSubmit)}>Update</Button>
            </Item>}

        <Item>
          <Button
            buttonStyle={{ backgroundColor: '#e62117' }}
            onPress={() => this.setState({ modal: !this.state.modal })}
          >
            Delete
          </Button>
        </Item>

        <Confirm
          visible={this.state.modal}
          onAccept={this.onAccept}
          onDecline={this.onDecline}
        >
          Are you sure you want to delete this?
        </Confirm>
      </Container>
    );
  }
}

const validate = (props) => {
  const errors = {};
  const fields = ['name', 'email'];

  fields.forEach((f) => {
    if (!(f in props)) {
      errors[f] = `${f} is required`;
    }
  });

  if (props.name && props.name.length < 4) {
    errors.name = 'Minimum of 4 characters';
  } else if (props.name && props.name.length > 30) {
    errors.name = 'Maximum of 30 characters';
  }

  if (props.email && props.email.length < 10) {
    errors.email = 'Minimum of 10 characters';
  } else if (props.email && props.email.length > 25) {
    errors.email = 'Maximum of 25 characters';
  }

  return errors;
};

PostEdit.propTypes = propTypes;
PostEdit = reduxForm({ form: 'postedit', validate })(PostEdit);

export default PostEdit;
