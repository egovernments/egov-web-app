import { httpRequest } from "egov-ui-framework/ui-utils/api";
import get from "lodash/get";
import set from "lodash/set";
import React, { Component } from "react";
import { withRouter } from "react-router";
import { getSearchResults } from "../../ui-utils/commons";

class PaymentRedirect extends Component {
  componentDidMount = async () => {
    //let { history } = this.props;
    let { search } = this.props.location;
    try {
      let pgUpdateResponse = await httpRequest(
        "post",
        "pg-service/transaction/v1/_update" + search,
        "_update",
        [],
        {}
      );
      let consumerCode = get(pgUpdateResponse, "Transaction[0].consumerCode");
      let tenantId = get(pgUpdateResponse, "Transaction[0].tenantId");
      if (get(pgUpdateResponse, "Transaction[0].txnStatus") === "FAILURE") {
        window.location.href = `/fire-noc/acknowledgement?purpose=${"pay"}&status=${"failure"}&applicationNumber=${consumerCode}&tenantId=${tenantId}`;
      } else {
        let response = await getSearchResults([
          {
            key: "tenantId",
            value: tenantId
          },
          { key: "applicationNumber", value: consumerCode }
        ]);
        set(response, "FireNOCs[0].fireNOCDetails.action", "PAY");
        response = await httpRequest(
          "post",
          "/firenoc-services/v1/_update",
          "",
          [],
          {
            FireNOCs: get(response, "FireNOCs", [])
          }
        );

        let transactionId = get(pgUpdateResponse, "Transaction[0].txnId");
        window.location.href = `/fire-noc/acknowledgement?purpose=${"pay"}&status=${"success"}&applicationNumber=${consumerCode}&tenantId=${tenantId}&secondNumber=${transactionId}`;
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
