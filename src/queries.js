import gql from 'graphql-tag';

// <Github API query>
// Takes in a Topic Name and fetches the first 10 related topics
// and the total number of stargazers each topic has
export const GET_RELATED_TOPICS_QUERY = gql`
  query getRelatedTopics($name: String!) {
    topic(name: $name) {
      relatedTopics(first: 10) {
        name
        stargazers {
          totalCount
        }
      }
    }
  }
`;
