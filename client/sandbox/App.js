/**
 * @flow
 */

import React, { Component } from 'react'
import {
  Text,
  ScrollView,
  View
} from 'react-native'
import AddEvent from '../Components/AddEvent'
import AllEvents from '../Components/AllEvents'

export default class App extends Component {
  render () {
    return (
      <ScrollView>
        <View>
          <Text>SandBox</Text>
        </View>
        <AddEvent />
        <AllEvents
          events={[
            {
              id: 'Test-Id',
              name: 'Great Event',
              where: 'Here',
              when: 'Then'
            }
          ]}
          onEdit={() => {}}
          onDelete={() => {}}
        />
      </ScrollView>
    )
  }
}
