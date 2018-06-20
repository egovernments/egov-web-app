import React from "react";

class PlotDetails extends React.Component {
  render() {
    let { component: Component } = this.props;
    return (
      <div>
        <Component />
      </div>
    );
  }
}

export default PlotDetails;
