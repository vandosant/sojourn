import gql from 'graphql-tag'

export default gql`
mutation AddEventMutation($id: ID!, $name: String!, $where: String!, $when: String!) {
    addEvent(
        id: $id
        name: $name
        where: $where
        when: $when
        description: " "
    ) {
        __typename
        id
        name
        where
        when
    }
}
`
