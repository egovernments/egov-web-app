import React from "react";

const styles = {
  error: {
    color: "red"
  }
};

const Error = ({ errorMessage }) => {
  return <div style={styles.error}>{errorMessage}</div>;
};

export default Error;
