import React, { Component } from "react";
import { connect } from "react-redux";
import { Screen } from "modules/common";
import { Icon } from "components";
import PaymentStatus from "../common/PaymentStatus";
import { fetchProperties } from "egov-ui-kit/redux/properties/actions";
import { getCommaSeperatedAddress } from "egov-ui-kit/utils/commons";
import { getDateFromEpoch } from "egov-ui-kit/utils/commons";

const receiptDetails = {
  OwnerName: "Harishikesh Anand",
  PropertyID: "PID-78-567",
  Property: "EB-154, Maya Enclave Harinagar, KT Marg Amritsar - 53",
  PaymentTerm: "2017-18",
  PropertyTaxDue: "1432.47",
};

const buttons = {
  button2: "Retry",
};

const failureMessages = {
  Message1: "OOPS !",
  Message2: "PT_RECEIPT_FAILURE_MESSAGE",
};

const icon = <Icon action="navigation" name="close" />;

class PaymentFailure extends Component {
  componentDidMount = () => {
    const { fetchProperties, match } = this.props;
    fetchProperties([{ key: "ids", value: match.params.propertyId }, { key: "tenantId", value: match.params.tenantId }]);
  };

  render() {
    return (
      <Screen>
        <PaymentStatus receiptDetails={receiptDetails} floatingButtonColor="#e74c3c" icon={icon} messages={failureMessages} buttons={buttons} />
      </Screen>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProperties: (queryObject) => dispatch(fetchProperties(queryObject)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentFailure);
