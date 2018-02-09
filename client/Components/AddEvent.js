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
    id: '',
    title: '',
    author: ''
  })

  handleChange = (field, value) => {
    this.setState({
      [field]: value
    })
  }

  handleAdd = () => {
    const { id, title, author } = this.state;

    this.setState(this.getInitialState(), () => {
      this.props.onAdd({ id, title, author });
    });
  }

  handleCancel = () => {
    this.setState(this.getInitialState());
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Add new event</Text>
          <TextInput style={{ borderWidth: 1 }} value={this.state.id} onChangeText={this.handleChange.bind(this, 'id')} placeholder='id' />
          <TextInput style={{ borderWidth: 1 }} value={this.state.title} onChangeText={this.handleChange.bind(this, 'title')} placeholder='title' />
          <TextInput style={{ borderWidth: 1 }} value={this.state.author} onChangeText={this.handleChange.bind(this, 'author')} placeholder='author' />
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


