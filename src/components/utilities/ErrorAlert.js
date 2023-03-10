import React from "react";
import Alert from "react-bootstrap/Alert";

const ErrorAlert = ({ message }) => {
  return <Alert variant="danger">{message}</Alert>;
};

export default ErrorAlert;
