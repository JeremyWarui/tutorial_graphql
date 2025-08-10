const {ApolloServer} = require("@apollo/server");
const {startStandaloneServer} = require("@apollo/server/standalone");
let {issues, users} = require("./data.js");
const {typeDefs} = require("./graphql/schema.js");
const {GraphQLError} = require("graphql");
const {v1: uuid} = require("uuid");

/* ----------------------------------------------
   RESOLVERS: QUERY, MUTATIONS AND SUBSCRIPTIONS
-------------------------------------------------*/
const resolvers = {
  Query: {
    dummy: () => "Hello World!",
    usersCount: () => users.length,
    issuesCount: () => issues.length,
    allIssues: () => issues.map(issue => issue),
    allUsers: () => users.map(user => user),
    issue: (root, args) => {
      return issues.find(issue => issue.id === args.id) || null;
    }
  },
  Issue: {
    assignedTo: (root) => {
      return users.find(user => user.id === root.assignedTo) || null;
    }
  },
  User: {
    issues: (root) => issues.filter(issue => issue.assignedTo === root.id) || []
  },
  Mutation: {
    createIssue: (root, args) => {
      if (!args.title || !args.description) {
        throw new GraphQLError("Invalid input", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title
          }
        });
      }
      const newIssue = {
        id: uuid(),
        ...args,
        createdAt: new Date().toISOString(),
        assignedTo: null,
        status: "OPEN"
      };
      console.log(newIssue);
      issues = issues.concat(newIssue);
      return newIssue;
    },
    assignIssue: (root, args) => {
      const {issueId, userId} = args
      const issue = issues.find(issue => issue.id === issueId)
      if (!issue) {
        throw new GraphQLError("issue not found", {
          extensions: {
            code: "NOT_FOUND"
          }
        })
      }
      const user = users.find(user => user.id === userId)
      if (!user) {
        throw new GraphQLError("no user found", {
          extensions: {
            code: "NOT_FOUND"
          }
        })
      }

      issues = issues.map(issue =>
        issue.id === issueId ?
          {
            ...issue,
            updatedAt: new Date().toISOString(),
            assignedTo: userId,
            status: "ASSIGNED"
          }
          : issue
      )

      return issues.find(issue => issue.id === issueId)
    },
    updateIssueStatus: (root, args) => {
      const {issueId, userId, status} = args
      const issue = issues.find(issue => issue.id === issueId)
      if (!issue) {
        throw new GraphQLError("Issue not found", {
          extensions: {
            code: "NOT_FOUND"
          }
        })
      }

      const user = users.find(user => user.id === userId)
      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: {
            code: "NOT_FOUND"
          }
        })
      }


      if (issue.assignedTo !== userId) {
        throw new GraphQLError("Not authorized to update this issue", {
          extensions: {
            code: "FORBIDDEN"
          }
        })
      }

      issues = issues.map(issue =>
        issue.id === issueId ?
          {...issue, status: status, updatedAt: new Date().toISOString()}
          : issue
      )
      return issues.find(issue => issue.id === issueId)
    },
    createUser: (root, args) => {
      const {name, email} = {...args}
      if (!name || !email) {
        throw new GraphQLError("Invalid input, enter both email and name", {
          extensions: {code: "BAD_USER_INPUT"}
        })
      }
      const user = {name, email, id: uuid()}
      users = users.concat(user)
      return user
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

(async () => {
  const {url} = await startStandaloneServer(server, {
    context: async () => ({}),
    listen: {port: 4000}
  });
  console.log(`🚀  Server ready at: ${url}`);
})();