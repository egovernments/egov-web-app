import React from "react";
import RenderScreen from "mihy-ui-framework/ui-molecules/RenderScreen";
import CustomTab from "../../ui-molecules-local/CustomTab";
import { connect } from "react-redux";
import { addComponentJsonpath } from "mihy-ui-framework/ui-utils";
import { prepareFinalObject } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import cloneDeep from "lodash/cloneDeep";

class MultiItem extends React.Component {
  state = {
    tabIndex: 0
  };

  fieldsToReset = [
    "ReceiptTemp[0].Bill[0].payer",
    "ReceiptTemp[0].Bill[0].paidBy",
    "ReceiptTemp[0].Bill[0].payerMobileNumber",
    "ReceiptTemp[0].instrument.transactionNumber",
    "ReceiptTemp[0].instrument.transactionDateInput",
    "ReceiptTemp[0].instrument.ifscCode",
    "ReceiptTemp[0].instrument.instrumentNumber",
    "ReceiptTemp[0].instrument.transactionNumberConfirm",
    "ReceiptTemp[0].instrument.bank.name",
    "ReceiptTemp[0].instrument.branchName"
  ];

  resetFields = dispatch => {
    dispatch(prepareFinalObject("ReceiptTemp[0].Bill[0].payer", ""));
    dispatch(prepareFinalObject("ReceiptTemp[0].Bill[0].paidBy", ""));
    dispatch(
      prepareFinalObject("ReceiptTemp[0].Bill[0].payerMobileNumber", "")
    );
    dispatch(prepareFinalObject("ReceiptTemp[0].instrument", {}));
  };

  setInstrumentType = (value, dispatch) => {
    dispatch(
      prepareFinalObject("ReceiptTemp[0].instrument.instrumentType.name", value)
    );
  };

  onTabChange = (tabIndex, dispatch) => {
    // this.resetFields(dispatch);
    switch (tabIndex) {
      case 0:
        this.setInstrumentType("Cash", dispatch);

        break;
      case 1:
        this.setInstrumentType("Cheque", dispatch);

        break;
      case 2:
        this.setInstrumentType("DD", dispatch);

        break;
      case 3:
        this.setInstrumentType("Card", dispatch);

        break;
      default:
        this.setInstrumentType("Cash", dispatch);
        break;
    }
  };

  onTabClick = tabIndex => {
    const { onTabClick: tabClick, state, dispatch } = this.props;
    // tabClick(tabIndex, state, dispatch);
    this.onTabChange(tabIndex, dispatch);
    this.setState({ tabIndex });
  };

  render() {
    console.log("Render!!!");
    const {
      uiFramework,
      onFieldChange,
      onComponentClick,
      screenKey,
      componentJsonpath
    } = this.props;

    const { onTabClick } = this;

    const transFormedProps = {
      ...this.props,
      tabs: this.props.tabs.map((tab, key) => {
        return {
          ...tab,
          tabContent: (
            <RenderScreen
              key={key}
              screenKey={screenKey}
              components={cloneDeep(
                addComponentJsonpath(
                  tab.tabContent,
                  `${componentJsonpath}.props.tabs[${key}].tabContent`
                )
              )}
              uiFramework={uiFramework}
              onFieldChange={onFieldChange}
              onComponentClick={onComponentClick}
            />
          )
        };
      })
    };
    return <CustomTab handleClick={onTabClick} {...transFormedProps} />;
  }
}

const mapStateToProps = state => {
  const { screenConfiguration } = state;
  const { screenConfig, preparedFinalObject } = screenConfiguration;
  return { screenConfig, preparedFinalObject, state };
};

export default connect(mapStateToProps)(MultiItem);
