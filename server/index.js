import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import {issues, users} from "./data.js"


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
        createdAt: String
        updatedAt: String
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
        createIssue(
            title: String!,
            description: String!
        ): Issue!
        updateIssueStatus(
            id: ID!,
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
const resolvers = {
  Query: {
    dummy: () => "Hello World!",
    usersCount: () => users.length,
    issuesCount: () => issues.length,
    allIssues: () => issues.map(issue => issue),
    allUsers: () => users.map(user => user),
    issue: (root, args) => {
      return issues.filter(issue => issue.id === id)
    }
  }

}



const server = new ApolloServer({
   typeDefs,
   resolvers
})


const { url} = await startStandaloneServer(server, {
  listen: { port : 4000 },
})

console.log(`🚀  Server ready at: ${url}`)