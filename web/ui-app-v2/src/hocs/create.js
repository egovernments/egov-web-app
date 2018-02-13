import React, { Component } from "react";

const CreateHoC = (Create, searchEntity) => {
  return class WrappedCreate extends Component {
    componentDidMount() {
      // make the api call here
      console.log("API call made");
      searchEntity();
    }
    render() {
      return <Create {...this.props} />;
    }
  };
};

export default CreateHoC;
