/**
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import AWSAppSyncClient from 'aws-appsync'
import { Rehydrated } from 'aws-appsync-react'
import { AUTH_TYPE } from 'aws-appsync/lib/link/auth-link'
import { graphql, ApolloProvider, compose } from 'react-apollo'
import * as AWS from 'aws-sdk'
import AppSync from './AppSync.js'
import AllEvents from './Components/AllEvents'
import AddEvent from './Components/AddEvent'
import AllEventsQuery from './Queries/AllEventsQuery'
import NewEventMutation from './Queries/NewEventMutation'
import DeleteEventMutation from './Queries/DeleteEventMutation'
import UpdateEventMutation from './Queries/UpdateEventMutation'

const client = new AWSAppSyncClient({
  url: AppSync.graphqlEndpoint,
  region: AppSync.region,
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey: AppSync.apiKey,
  }
})

const events = [{ "id": "1", "title": "My Event", "author": "meetup.com" }, { "id": "2", "title": "My Second Event", "author": "eventbrite.com" }];

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  state = { events };

  handleOnAdd = (event) => {
    const { events } = this.state;

    this.setState({
      events: [...events, event]
    })
  }

  handleOnDelete = ({ id }) => {
    const { events } = this.state;

    this.setState({
      events: [...events.filter(event => event.id !== id)]
    })
  }

  handleOnEdit = (editedEvent) => {
    const { events } = this.state;

    this.setState({
      events: [...events.map(event => event.id === editedEvent.id ? editedEvent : event )]
    })
  }

  render() {
    const { events } = this.state;

    return (
      <View style={styles.container}>
        <AddEvent onAdd={this.handleOnAdd} />
        <AllEvents events={events} onDelete={this.handleOnDelete} onEdit={this.handleOnEdit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  }
});
