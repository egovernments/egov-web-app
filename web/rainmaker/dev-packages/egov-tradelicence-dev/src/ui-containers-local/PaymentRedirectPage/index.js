import React, { Component } from "react";
import get from "lodash/get";
import { httpRequest } from "../../ui-utils/api";
import { withRouter } from "react-router";

class PaymentRedirect extends Component {
  componentDidMount = async () => {
    let { search } = this.props.location;
    try {
      let pgUpdateResponse = await httpRequest(
        "post",
        "pg-service/transaction/v1/_update" + search,
        "_update",
        [],
        {}
      );
      let moduleId = get(pgUpdateResponse, "Transaction[0].moduleId");
      let tenantId = get(pgUpdateResponse, "Transaction[0].tenantId");
      if (get(pgUpdateResponse, "Transaction[0].txnStatus") === "FAILURE") {
        window.location.href = `/tradelicence/acknowledgement?purpose=${"pay"}&status=${"failure"}&applicationNumber=${moduleId}&tenantId=${tenantId}`;
      } else {
        let transactionId = get(pgUpdateResponse, "Transaction[0].txnId");
        window.location.href = `/tradelicence/acknowledgement?purpose=${"pay"}&status=${"success"}&applicationNumber=${moduleId}&tenantId=${tenantId}&secondNumber=${transactionId}`;
      }
    } catch (e) {
      alert(e);
    }
  };
  render() {
    return <div />;
  }
}

export default withRouter(PaymentRedirect);
