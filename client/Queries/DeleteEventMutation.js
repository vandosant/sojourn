import gql from 'graphql-tag'

export default gql`
mutation DeleteEventMutation($id: ID!, $expectedVersion: Int!) {
    deleteEvent(id: $id, expectedVersion: $expectedVersion) {
        __typename
        id
        name
        where
        when
        description
    }
}
`
