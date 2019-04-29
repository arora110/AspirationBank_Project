import React, { Component } from 'react';
import { Query } from 'react-apollo';
import './TopicList.css';
import { GET_RELATED_TOPICS_QUERY } from '../queries';

// Displays a list of Related Github Topics
// Clicking on a Related Topic will update the list to display
// a new list of topics related to the topic clicked on
export default class TopicList extends Component {
  constructor() {
    super();
    this.state = {
      topic: 'react',
    };
  }

  // Updates the main topic stored in local state
  handleClick = e => {
    this.setState(state => ({
      topic: e,
    }));
  };

  render() {
    return (
      <div className="list">
        <h2 className="center-text">{this.state.topic}</h2>
        <p> Related Topics: </p>
        <Query
          query={GET_RELATED_TOPICS_QUERY}
          variables={{ name: this.state.topic }}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>loading...</p>;
            if (error) return <p>error! </p>;
            const listItems = data.topic.relatedTopics.map((topic, index) => (
              <button key={index} onClick={e => this.handleClick(topic.name)}>
                {topic.name + ': ' + topic.stargazers.totalCount} &#9733;
              </button>
            ));
            return <ul>{listItems}</ul>;
          }}
        </Query>
      </div>
    );
  }
}
