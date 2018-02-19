import gql from 'graphql-tag'

export default gql`
query GetEvent {
    getEvent {
        id
        name
        where
        when
        description
    }
}
`
