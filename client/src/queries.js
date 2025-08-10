import { gql } from "@apollo/client"


export const ALL_ISSUES = gql`
    query {
        allIssues {
            id
            title
            description
            createdAt
            updatedAt
            status
            assignedTo
        }
    }
`
