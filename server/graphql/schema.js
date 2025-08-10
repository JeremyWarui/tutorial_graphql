/* ----------------------------------------------
  SCHEMAS AND TYPES
-------------------------------------------------*/
export const typeDefs = `
    type User {
        id: ID!
        name: String!
        email: String!
        issues: [Issue!]!
    }
    
    enum Status {
        OPEN
        IN_PROGRESS
        CLOSED
    }

    type Issue {
        id: ID!
        title: String
        description: String
        createdAt: String
        updatedAt: String
        assignedTo: User
        status: Status
    }

    type Query {
        dummy: String
        usersCount: Int
        issuesCount: Int
        allIssues: [Issue!]!
        allUsers: [User!]!
        issue(id: ID!): Issue
        user(id: ID!): User!
    }

    type Mutation {
        createIssue(
            title: String!,
            description: String!
        ): Issue!
        updateIssueStatus(
            issueId: ID!,
            userId: ID!
            status: Status
        ): Issue!
        assignIssue(
            issueId: ID!,
            userId: ID!
        ): Issue!
        createUser(
            name: String!,
            email: String
        ): Issue
    }
`