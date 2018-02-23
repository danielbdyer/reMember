import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { Container, Item, Button, Input, Spinner } from '../common';
import styles from './memberStyle';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  memberError: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  createMember: PropTypes.func.isRequired
};

class MemberCreate extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(props) {
    const { name, email } = props;

    this.props.createMember({ name, email });
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

        {this.props.memberError
          ?
            <Text style={styles.error}>
              {this.props.memberError}
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
              <Button onPress={handleSubmit(this.handleFormSubmit)}>Create</Button>
            </Item>}
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

MemberCreate.propTypes = propTypes;
MemberCreate = reduxForm({ form: 'membercreate', validate })(MemberCreate);

export default MemberCreate;
