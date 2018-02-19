import gql from 'graphql-tag'

export default gql`
query AllEvents {
    allEvent {
        events {
            __typename
            id
            name
            where
            when
            description
        }
    }
}
`
