const { ApolloServer } = require("@apollo/server")
const { standAloneServer } = require("@apollo/server/standalone")


const typeDefs = `
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
        createdAt: Date
        updatedAt: Date
        assignedTo: User
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
        dummy: String
        updateIssueStatus(
            id: ID!,
            status: Status
        ): Issue!
        createIssue(
            title: String!,
            description: String!
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




const server = new ApolloServer({
   typeDefs,
   resolvers
})

standAloneServer(server, {
    listen: { port: 4000 },
}, ({url}) => console.log(`Server running on: ${url}`))