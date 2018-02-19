import gql from 'graphql-tag'

export default gql`
mutation UpdateEventMutation($id: ID!, $name: String!, $where: String!, $when: String!) {
    updateEvent(
        id: $id
        name: $name
        where: $where
        when: $when
    ) {
        __typename
        id
        name
        where
        when
    }
}
`
