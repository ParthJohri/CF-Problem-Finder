import React, { useState } from "react";
import UserInput from "./components/UserInput";
import ProblemTable from "./components/ProblemTable";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [problems, setProblems] = useState([]);
  const [username, setUsername] = useState("");

  const handleUsernameSubmit = (username) => {
    setUsername(username);

    fetch(`https://codeforces.com/api/user.status?handle=${username}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK") {
          const processedProblems = processData(data.result);
          setProblems(processedProblems);
        } else {
          console.error(data.status + " : " + data.comment);
        }
      });
  };

  const processData = (resultArr) => {
    const processedProblems = resultArr.map((sub) => ({
      problemId: `${sub.problem.contestId}/${sub.problem.index}`,
      rating: sub.problem.rating,
    }));
    return processedProblems;
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 text-center">
          <h1>Codeforces Problems</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <UserInput onUsernameSubmit={handleUsernameSubmit} />
          {username && (
            <h2 className="mt-4"> Problems Solved By: {username}</h2>
          )}
          {problems.length > 0 && <ProblemTable problems={problems} />}
        </div>
      </div>
      <footer className="mt-4 text-center">
        <h3>Made by Parth Johri</h3>
        <a
          href="https://www.linkedin.com/in/parthjohri07"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>{" "}
        |{" "}
        <a
          href="https://github.com/parthjohri"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
}

export default App;
