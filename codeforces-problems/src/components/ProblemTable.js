// src/components/ProblemTable.js

import React, { useState } from "react";
import "./ProblemTable.css";

function ProblemTable({ problems }) {
  const groupedProblems = {};

  problems.forEach((problem) => {
    if (!groupedProblems[problem.rating]) {
      groupedProblems[problem.rating] = [];
    }
    groupedProblems[problem.rating].push(problem.problemId);
  });

  const [expandedRating, setExpandedRating] = useState(null);

  const handleRatingClick = (rating) => {
    if (expandedRating === rating) {
      setExpandedRating(null);
    } else {
      setExpandedRating(rating);
    }
  };

  return (
    <div className="container-fluid">
      <h2>Problems by Rating</h2>
      <div className="row">
        {Object.keys(groupedProblems).map((rating) => (
          <div key={rating} className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Rating: {rating}</h5>
                <button
                  onClick={() => handleRatingClick(rating)}
                  className={`btn btn-outline-primary ${
                    expandedRating === rating ? "active" : ""
                  }`}
                >
                  {expandedRating === rating ? "Hide" : "Show"} Problems
                </button>
                {expandedRating === rating && (
                  <ul className="list-group mt-2">
                    {groupedProblems[rating].map((problemId) => (
                      <li key={problemId} className="list-group-item">
                        <a
                          href={`https://codeforces.com/problemset/problem/${problemId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {problemId}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProblemTable;
