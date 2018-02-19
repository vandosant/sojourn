import gql from 'graphql-tag'

export default gql`
mutation AddEventMutation($name: String!, $where: String!, $when: String!, $description: String) {
    createEvent(
        name: $name
        where: $where
        when: $when
        description: $description
    ) {
        __typename
        id
        name
        where
        when
        description
    }
}
`
