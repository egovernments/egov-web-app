import React, { Component } from "react";

const CreateHoC = Create => {
  return class WrappedCreate extends Component {
    componentDidMount() {
      // make the api call here
      console.log("Api Call Made");
    }
    render() {
      return <Create {...this.props} />;
    }
  };
};

export default CreateHoC;
