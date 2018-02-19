import gql from 'graphql-tag'

export default gql`
query AllEvents {
    listEvents {
        items {
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
