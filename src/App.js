import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import BodyBackgroundColor from 'react-body-backgroundcolor';
import TopicList from './components/TopicList';
import gitCat from './gitCat.png';
import './App.css';

// Initialize client's Github API authentication
const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${
          process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
        }`,
      },
    });
  },
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BodyBackgroundColor backgroundColor="#D6EAF8">
          <div className="App">
            <h2> Aspiration Bank Project - by Akash Arora</h2>
            <h3 className="move-down">
              This web-app displays Git topics related to one another using the
              Github GraphQL API.
            </h3>
            <img className="medium" src={gitCat} alt="logo" />
            <TopicList />
          </div>
        </BodyBackgroundColor>
      </ApolloProvider>
    );
  }
}

export default App;
