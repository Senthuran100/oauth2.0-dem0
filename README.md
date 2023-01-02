# OAuth 2.0 Demo using Github

### Instructions
* Clone this repo.
* Login to the Github Account and create an OAuth App by following this [link](https://docs.github.com/en/free-pro-team@latest/developers/apps/creating-an-oauth-app)

 N.B set the homepage URL as `http://localhost:3000/` and redirect URL as `http://localhost:3000/login`

* Create a .env file in the root folder and replace the below variables with the client id and client secret.

```
REACT_APP_CLIENT_ID=981xxxxxxxxxxxx
REACT_APP_CLIENT_SECRET=fbcxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_REDIRECT_URI=http://localhost:3000/login
REACT_APP_PROXY_URL=http://localhost:5000/authenticate
SERVER_PORT=5000
```

