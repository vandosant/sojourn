/**
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
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
import AppSync from './AppSync'
import AllEvents from './Components/AllEvents'
import AddEvent from './Components/AddEvent'
import AllEventsQuery from './Queries/AllEventsQuery'
import NewEventMutation from './Queries/NewEventMutation'
import DeleteEventMutation from './Queries/DeleteEventMutation'
import UpdateEventMutation from './Queries/UpdateEventMutation'
import Sandbox from './sandbox/App'

const client = new AWSAppSyncClient({
  url: AppSync.graphqlEndpoint,
  region: AppSync.region,
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey: AppSync.apiKey,
  }
})

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class App extends Component {
  state = { events: [] }

  render() {
    return (
      <View style={styles.container}>
        <NewEventWithData />
        <AllEventsWithData />
      </View>
    )
  }
}

const AllEventsWithData = compose(
  graphql(AllEventsQuery, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: (props) => ({
      events: props.data.listEvents && props.data.listEvents.items,
    })
  }),
  graphql(DeleteEventMutation, {
    options: {
      refetchQueries: [{ query: AllEventsQuery }],
      update: (proxy, { data: { deleteEvent: { id } } }) => {
        const query = AllEventsQuery
        const data = proxy.readQuery({ query })

        data.listEvents.items = data.listEvents.items.filter(event => event.id !== id)

        proxy.writeQuery({ query, data })
      }
    },
    props: (props) => ({
      onDelete: (event) => props.mutate({
        variables: { id: event.id },
        optimisticResponse: () => ({ deleteEvent: { ...event, __typename: 'Event' } }),
      })
    })
  }),
  graphql(UpdateEventMutation, {
    options: {
      refetchQueries: [{ query: AllEventsQuery }],
      update: (proxy, { data: { updateEvent } }) => {
        const query = AllEventsQuery
        const data = proxy.readQuery({ query })

        data.listEvents.items = data.listEvents.items.map(event => event.id !== updateEvent.id ? event : { ...updateEvent })

        proxy.writeQuery({ query, data })
      }
    },
    props: (props) => ({
      onEdit: (event) => {
        props.mutate({
          variables: { ...event },
          optimisticResponse: () => ({ updateEvent: { ...event, __typename: 'Event' } }),
        })
      }
    })
  })
)(AllEvents)

const NewEventWithData = graphql(NewEventMutation, {
  options: {
    refetchQueries: [{ query: AllEventsQuery }]
  },
  props: (props) => ({
    onAdd: (event) => props.mutate({
      variables: event,
      optimisticResponse: () => ({ createEvent: { ...event, __typename: 'Event', id: Math.round(Math.random() * -1000000).toString() } })
    })
  })
})(AddEvent)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  }
});

const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>
)

AppRegistry.registerComponent('sojourn', WithProvider)

module.exports = __DEV__ ? Sandbox : WithProvider
