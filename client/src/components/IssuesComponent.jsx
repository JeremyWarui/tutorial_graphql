// import { useQuery } from "@apollo/client"
import { Table } from "@chakra-ui/react"
import { ALL_ISSUES } from "@/queries.js";

const IssuesComponent = ({issues}) => {


  return (
    <Table.Root size="sm" interactive>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Title</Table.ColumnHeader>
          <Table.ColumnHeader>Description</Table.ColumnHeader>
          <Table.ColumnHeader>Status</Table.ColumnHeader>
          <Table.ColumnHeader>Assigned To</Table.ColumnHeader>
          <Table.ColumnHeader>Details</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>{issue.title}</Table.Cell>
            <Table.Cell>{issue.description}</Table.Cell>
            <Table.Cell>{issue.status}</Table.Cell>
            <Table.Cell>{issue.assignedTo?.name}</Table.Cell>
            <Table.Cell><button>...</button></Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

export default IssuesComponent