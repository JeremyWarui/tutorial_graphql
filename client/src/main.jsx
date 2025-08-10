import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { Provider } from "@/components/ui/provider"
import './index.css'
import App from './App.jsx'


const client = new ApolloClient( {
  cache : new InMemoryCache(),
  uri : "http://localhost:4000"
} )

createRoot( document.getElementById( 'root' ) ).render(
  <StrictMode>
    <Provider>
      <ApolloProvider client={ client }>
        <App/>
      </ApolloProvider>
    </Provider>
  </StrictMode>,
)
