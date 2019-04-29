import React from 'react';
import TopicList from '../components/TopicList';
import { MockedProvider } from 'react-apollo/test-utils';
import { GET_RELATED_TOPICS_QUERY } from '../queries';
import renderer from 'react-test-renderer';
import wait from 'waait';

const mocks = [
  {
    request: {
      query: GET_RELATED_TOPICS_QUERY,
      variables: {
        name: 'react',
      },
    },
    result: {
      data: {
        topic: {
          relatedTopics: [
            { name: 'angular', stargazers: { totalCount: 105 } },
            { name: 'jest', stargazers: { totalCount: 10 } },
            { name: 'vue', stargazers: { totalCount: 350 } },
          ],
        },
      },
    },
  },
  {
    request: {
      query: GET_RELATED_TOPICS_QUERY,
      variables: {
        name: 'angular',
      },
    },
    result: {
      data: {
        topic: {
          relatedTopics: [
            { name: 'react', stargazers: { totalCount: 105 } },
            { name: 'graphql', stargazers: { totalCount: 10 } },
          ],
        },
      },
    },
  },
];

test('renders without an error', () => {
  renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <TopicList />
    </MockedProvider>
  );
});

it('renders loading state initially', () => {
  const component = renderer
    .create(
      <MockedProvider mocks={[]} addTypename={false}>
        <TopicList />
      </MockedProvider>
    )
    .toJSON();
  expect(JSON.stringify(component)).toContain('loading...');
});

it('renders an error message in UI', async () => {
  const reactMock = {
    request: {
      query: GET_RELATED_TOPICS_QUERY,
      variables: { name: 'react' },
    },
    error: new Error('aw shucks'),
  };
  const component = renderer.create(
    <MockedProvider mocks={[reactMock]} addTypename={false}>
      <TopicList />
    </MockedProvider>
  );
  await wait(0);
  const tree = component.toJSON();
  expect(JSON.stringify(tree.children)).toContain('error!');
});

it('renders Related Topics into buttons', async () => {
  const component = renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <TopicList />
    </MockedProvider>
  );
  await wait(0); // wait for response

  let tree = component.toJSON();
  tree = JSON.stringify(tree.children);
  expect(tree).toContain('angular');
  expect(tree).toContain('jest');
  expect(tree).toContain('vue');
  // This check could be more specific.
  // I couldn't figure out how to extract button objects from the component tree.
  // Enzyme might work, but a shallow render won't execute Mocked Provider
});

// (MISSING TEST) renders new list of topics when a button is clicked
