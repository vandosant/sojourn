/**
 * @flow
 */

import React, { Component } from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native';

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      editing: {}
    }
  }

  static defaultProps = {
    events: [],
    onDelete: () => null,
    onEdit: () => null
  }

  handleDelete = async (event) => {
    const confirm = await new Promise((resolve, reject) => {
      Alert.alert('Confirm delete', 'Are you sure?', [
        { text: 'OK', onPress: () => resolve(true) },
        { text: 'Cancel', onPress: () => resolve(false) },
      ], { cancelable: false });
    })

    if (confirm) {
      this.props.onDelete(event);
    }
  }

  handleEdit = (event) => {
    const { editing } = this.state;

    this.setState({ editing: { ...editing, [event.id]: { ...event } } } );
  }

  handleEditCancel = (id) => {
    const { editing } = this.state;
    const { [id]: curr, ...others } = editing;

    this.setState({ editing: { ...others } });
  }

  handleFieldEdit = (id, field, value) => {
    const { editing } = this.state;
    const editData = { ...editing[id] };

    editData[field] = value;

    this.setState({
      editing: { ...editing, ...{ [id]: editData } }
    });
  }

  handleEditSave = (id) => {
    const { editing } = this.state;
    const { [id]: editedEvent, ...others } = editing;

    this.props.onEdit({ ...editedEvent });
    this.setState({
      editing: { ...others }
    });
  }

  renderOrEditEvent = (event) => {
    const { editing } = this.state;

    const editData = editing[event.id];
    const isEditing = !!editData;

    return (
      !isEditing ?
      (
        <View key={event.id} style={styles.item}>
          <View style={styles.itemColumn}>
            <Text>{event.name}</Text>
            <Text>{event.where}</Text>
            <Text>{event.when}</Text>
          </View>
          <View style={styles.itemColumn}>
            <Button title="Edit" onPress={this.handleEdit.bind(this, event)} />
            <Button title="Delete" onPress={this.handleDelete.bind(this, event)} />
          </View>
        </View>
      ) : (
        <View key={event.id} style={styles.item}>
          <View style={styles.itemColumn}>
            <Text>{event.id}</Text>
            <TextInput style={{ borderWidth: 1 }} value={editData.name} onChangeText={this.handleFieldEdit.bind(this, event.id, 'name')} />
            <TextInput style={{ borderWidth: 1 }} value={editData.where} onChangeText={this.handleFieldEdit.bind(this, event.id, 'where')} />
            <TextInput style={{ borderWidth: 1 }} value={editData.when} onChangeText={this.handleFieldEdit.bind(this, event.id, 'when')} />
            <TextInput style={{ borderWidth: 1 }} value={editData.description} onChangeText={this.handleFieldEdit.bind(this, event.id, 'description')} />
          </View>
          <View style={styles.itemColumn}>
            <Button title="Save" onPress={this.handleEditSave.bind(this, event.id)} />
            <Button title="Cancel" onPress={this.handleEditCancel.bind(this, event.id)} />
          </View>
        </View>
      )
    )
  }

  render() {
    const { events, error } = this.props;

    if (error) {
      console.log(error.networkError.response && JSON.parse(error.networkError.response._bodyText).message);
      return <Text>{error.message}</Text>
    }

    return (
      <ScrollView contentContainerStyle={styles.scroller}>
        <View style={styles.container}>
          {[].concat(events).sort((a, b) => b.id - a.id).map(this.renderOrEditEvent)}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    padding: 30,
    margin: 2,
  },
  item: {
    flexDirection: 'row',
    borderWidth: 1,
    paddingTop: 10
  },
  itemColumn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  scroller: {
    flexGrow:1,
    padding: 10
  }
});

