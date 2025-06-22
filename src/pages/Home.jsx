import React from "react";
import { app_version } from "../constants.js";

const Home = () => {
  return (
    <div className="home-page">
      <h1 className="glitch" data-text="Welcome to GitSec">
        Welcome to GitSec {app_version}
      </h1>
      <p>Your one-stop solution for GitHub repository security analysis.</p>
      <p>
        In order to use the application, all you need to do is login with your
        GitHub account.
      </p>
      <p>
        GitSec will then analyze your repositories and provide you with a simple
        report on the security of your repositories.
      </p>
    </div>
  );
};

export default Home;
