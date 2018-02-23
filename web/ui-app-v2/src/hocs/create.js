import React, { Component } from 'react';

// recieve search, search url
const CreateHoC = (Create, search, searchUrl) => {
  return class WrappedCreate extends Component {
    componentDidMount() {
      search(searchUrl);
    }
    render() {
      return <Create {...this.props} />;
    }
  };
};

export default CreateHoC;
