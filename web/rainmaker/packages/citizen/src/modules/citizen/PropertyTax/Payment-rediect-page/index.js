import React from "react";
import {connect} from "react-redux";
import { toggleSpinner } from "egov-ui-kit/redux/common/actions";
import { httpRequest } from "egov-ui-kit/utils/api";
import get from "lodash/get";


class PaymentRedirect extends React.Component {
  componentWillMount()
  {
    this.props.toggleSpinner();
  }
  componentDidMount=async()=>{
    let { history } = this.props;
    let { search } = this.props.location;
    try {
      let pgUpdateResponse = await httpRequest("pg-service/transaction/v1/_update" + search, "_update", [], {});
      let moduleId = get(pgUpdateResponse, "Transaction[0].moduleId");
      let tenantId=get(pgUpdateResponse, "Transaction[0].tenantId");
      if (get(pgUpdateResponse, "Transaction[0].txnStatus") === "FAILURE") {
        this.props.toggleSpinner();
        history.push("/property-tax/payment-failure/" + moduleId.split(":")[0]+"/"+tenantId+"/"+moduleId.split(":")[1]+"/"+"2019-18");
      } else {
        let transactionId=get(pgUpdateResponse, "Transaction[0].receipt[0].transactionId");
        this.props.toggleSpinner();
        history.push("/property-tax/payment-success/" + moduleId.split(":")[0]+"/"+tenantId+"/"+transactionId);
      }
    } catch (e) {
      this.props.toggleSpinner();
      alert(e);
      // history.push("/property-tax/payment-success/"+moduleId.split("-",(moduleId.split("-").length-1)).join("-"))
    }
  }
  render()
  {
    return (
      <div>

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSpinner: () => dispatch(toggleSpinner())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(PaymentRedirect);
