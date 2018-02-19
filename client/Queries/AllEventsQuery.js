import gql from 'graphql-tag'

export default gql`
query AllEvents {
    listEvents {
        items {
            id
            name
            where
            when
            description
        }
    }
}
`
