import { useQuery, gql } from "@apollo/client"
import IssuesComponent from "@/components/IssuesComponent.jsx";
import { Container } from "@chakra-ui/react"

const ALL_ISSUES = gql`
    query {
        allIssues {
            id
            title
            description
            createdAt
            updatedAt
            status
            assignedTo {
                name
            }
        }
    }
`


const App = () => {
  const result = useQuery(ALL_ISSUES)
  if (result.loading) {
    return <div>...loading </div>
  }
  console.log(result.data.allIssues)
  // let issues = result.data.allIssues || []

  return (
    <>
      <Container>
        <div className={ "flex justify-center self-center gap-x-80 mt-10" }>
          <h1 className={ "text-5xl font-bold mr-96" }>Simple Issue Tracker</h1>
          <div className={ "flex flex-row text-2xl self-center mt-3" }>
            <h2 className={ "mr-10" }>Issues</h2>
            <h2 className={ "mr-10" }>New Issue</h2>
            <h2 className={ "mr-10" }>Users</h2>
          </div>
        </div>
        <hr/>
        <IssuesComponent issues={result.data.allIssues}/>
      </Container>


    </>
  )
}

export default App
