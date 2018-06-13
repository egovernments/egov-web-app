import React from "react";
import formHoc from "egov-ui-kit/hocs/form";
import GenericForm from "../../GenericForm";


class PlotDetails extends React.Component {
  render()
  {
    let {component:Component}=this.props;
    return (
      <div>
          <Component />
      </div>
    )
  }
}


export default PlotDetails;
