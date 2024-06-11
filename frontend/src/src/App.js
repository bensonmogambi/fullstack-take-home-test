import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import BookAssignmentView from './components/BookAssignmentView';
import './styles.css';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BookAssignmentView />
    </ApolloProvider>
  );
}

export default App;
