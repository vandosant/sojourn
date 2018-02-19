/**
 * @flow
 */

import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native';

type Props = {};
export default class AddEvent extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = this.getInitialState();
  }

  static defaultProps = {
    onAdd: () => null
  }

  getInitialState = () => ({
    name: '',
    where: '',
    when: '',
    description: ' '
  })

  handleChange = (field, value) => {
    this.setState({
      [field]: value
    })
  }

  handleAdd = () => {
    const { name, where, when, description } = this.state;

    this.setState(this.getInitialState(), () => {
      this.props.onAdd({ name, where, when, description });
    });
  }

  handleCancel = () => {
    this.setState(this.getInitialState());
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Add new event</Text>
          <TextInput style={{ borderWidth: 1 }} value={this.state.name} onChangeText={this.handleChange.bind(this, 'name')} placeholder='name' />
          <TextInput style={{ borderWidth: 1 }} value={this.state.where} onChangeText={this.handleChange.bind(this, 'where')} placeholder='where' />
          <TextInput style={{ borderWidth: 1 }} value={this.state.when} onChangeText={this.handleChange.bind(this, 'when')} placeholder='when' />
          <TextInput style={{ borderWidth: 1 }} value={this.state.description} onChangeText={this.handleChange.bind(this, 'description')} placeholder='description' />
        <View>
          <Button title="Add" onPress={this.handleAdd} />
          <Button title="Cancel" onPress={this.handleCancel} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    marginTop: 40,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10
  }
});


