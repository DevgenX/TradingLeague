import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div className="loading-container">
      <Spinner animation="border" size="sm" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loading;
