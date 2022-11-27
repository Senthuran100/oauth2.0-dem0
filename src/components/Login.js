import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import Styled from "styled-components";
import GithubIcon from "mdi-react/GithubIcon";
import { AuthContext } from "../App";
import fetch from 'node-fetch';


// const FormData = require("form-data");

export default function Login() {
  const { state, dispatch } = useContext(AuthContext);
  const [data, setData] = useState({ errorMessage: "", isLoading: false });

  const { client_id, redirect_uri, client_secret } = state;

  useEffect(() => {
    // After requesting Github access, Github redirects back to your app with a code parameter
    const url = window.location.href;
    const hasCode = url.includes("?code=");
  console.log("Method1");
    // If Github API returns the code parameter
    if (hasCode) {
      const newUrl = url.split("?code=");
      window.history.pushState({}, null, newUrl[0]);
      setData({ ...data, isLoading: true });
      console.log("Method2");

      const requestData = {
        code: newUrl[1]
      };

      // const proxy_url = state.proxy_url;

      // const token_data = new FormData();
      // token_data.append("client_id", client_id);
      // token_data.append("client_secret", client_secret);
      // token_data.append("code", requestData.code);
      // token_data.append("redirect_uri", redirect_uri);


     
      const URL = "https://github.com/login/oauth/access_token";
      // Use code parameter and other parameters to make POST request to proxy_server
      const token_data = new FormData();
      token_data.append("client_id", client_id);
      token_data.append("client_secret", client_secret);
      token_data.append("code", requestData.code);
      token_data.append("redirect_uri", redirect_uri);
      console.log("Method3",token_data);
      fetch(URL, {
        method: "POST",
        headers:{'Access-Control-Allow-Origin':'*','Accept': 'application/json',
        'Content-Type':'application/json'
      },
        mode: 'no-cors',
        body: token_data,
      })
        .then((response) => {
          console.log('response',response.text());
          
          response.text()})
        .then((response) => {
          console.log('paramsString',response);
          let params = new URLSearchParams(response);
          const access_token = params.get("access_token");
          console.log('Access Token',access_token);
          // Request to return data of a user that has been authenticated
          return fetch(`https://api.github.com/user`, {
            headers: {
              Authorization: `token ${access_token}`,
            },
          });
        })
        
        // .then((response) => response.json())
        // .then((response) => {
        //   return res.status(200).json(response);
        // })
        // .catch((error) => {
        //   return res.status(400).json(error);
        // });
        // .then(response => response.json())
        // .then(data => {
        //   dispatch({
        //     type: "LOGIN",
        //     payload: { user: data, isLoggedIn: true }
        //   });
        // })

        .catch(error => {
          console.log('Error',error);
          setData({
            isLoading: false,
            errorMessage: "Sorry! Login failed"
          });
        });
    }
  }, [state, dispatch, data]);

  if (state.isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Wrapper>
      <section className="container">
        <div>
          <h1>Welcome</h1>
          <span>Super amazing app</span>
          <span>{data.errorMessage}</span>
          <div className="login-container">
            {data.isLoading ? (
              <div className="loader-container">
                <div className="loader"></div>
              </div>
            ) : (
              <>
                {
                  // Link to request GitHub access
                }
                <a
                  className="login-link"
                  href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`}
                  onClick={() => {
                    setData({ ...data, errorMessage: "" });
                  }}
                >
                  <GithubIcon />
                  <span>Login with GitHub</span>
                </a>
              </>
            )}
          </div>
        </div>
      </section>
    </Wrapper>
  );
}

const Wrapper = Styled.section`
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-family: Arial;
    

    > div:nth-child(1) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
      transition: 0.3s;
      width: 25%;
      height: 45%;

      > h1 {
        font-size: 2rem;
        margin-bottom: 20px;
      }

      > span:nth-child(2) {
        font-size: 1.1rem;
        color: #808080;
        margin-bottom: 70px;
      }

      > span:nth-child(3) {
        margin: 10px 0 20px;
        color: red;
      }

      .login-container {
        background-color: #000;
        width: 70%;
        border-radius: 3px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;

        > .login-link {
          text-decoration: none;
          color: #fff;
          text-transform: uppercase;
          cursor: default;
          display: flex;
          align-items: center;          
          height: 40px;

          > span:nth-child(2) {
            margin-left: 5px;
          }
        }

        .loader-container {
          display: flex;
          justify-content: center;
          align-items: center;          
          height: 40px;
        }

        .loader {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          width: 12px;
          height: 12px;
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      }
    }
  }
`;
