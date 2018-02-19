import gql from 'graphql-tag'

export default gql`
mutation DeleteEventMutation($id: ID!) {
    deleteEvent(id: $id) {
        id
        name
        where
        when
        description
    }
}
`
