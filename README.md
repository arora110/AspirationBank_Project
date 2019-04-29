Akash Arora, April 2019


A small web-app to navigate Related Github Topics. [React, Apollo, Github GraphqlAPI]

------------------------------------------------------

To Run:

1) Download folder in master branch of this repo
2) Create a .env file in the root folder and write:

	REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN= 'token'

* Please create your own Github access token by following these steps:

	https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line

* While creating the token, please check these scopes: repo, admin:org, notifications, user

3) Run: npm start and visit http://localhost:3000/

------------------------------------------------------

To Test: yarn tests --verbose
