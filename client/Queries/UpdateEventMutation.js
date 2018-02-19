import gql from 'graphql-tag'

export default gql`
mutation UpdateEventMutation($id: ID!, $name: String!, $where: String!, $when: String!, $description: String!) {
    updateEvent(
        id: $id
        name: $name
        where: $where
        when: $when
        description: $description
    ) {
        id
        name
        where
        when
        description
    }
}
`
