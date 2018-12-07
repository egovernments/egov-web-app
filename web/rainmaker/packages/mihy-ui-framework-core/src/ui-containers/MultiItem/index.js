import React from "react";
import Div from "../../ui-atoms/HtmlElements/Div";
import RenderScreen from "../../ui-molecules/RenderScreen";
import Container from "../../ui-atoms/Layout/Container";
import Item from "../../ui-atoms/Layout/Item";
import Button from "../../ui-atoms/Button";
import IconButton from "@material-ui/core/IconButton";
import Icon from "../../ui-atoms/Icon";
import { connect } from "react-redux";
import get from "lodash/get";
import set from "lodash/set";
import cloneDeep from "lodash/cloneDeep";
import { addComponentJsonpath, replaceStrInPath } from "../../ui-utils";
import { prepareFinalObject as pFO } from "../../ui-redux/screen-configuration/actions";
import isEqual from "lodash/isEqual";

const checkActiveItems = items => {
  let count = 0;
  for (var i = 0; i < items.length; i++) {
    if (checkActiveItem(items[i])) count++;
  }
  return count;
};

const checkActiveItem = item => {
  return item && (item.isDeleted === undefined || item.isDeleted !== false);
};

class MultiItem extends React.Component {
  componentDidMount = () => {
    this.initMultiItem(this.props);
  };

  initMultiItem = props => {
    const { items, sourceJsonPath, preparedFinalObject } = props;
    const editItems = get(preparedFinalObject, sourceJsonPath, []);
    if (editItems) {
      if (!items.length && !editItems.length) {
        this.addItem();
      } else {
        if (items.length<editItems.length) {
          for (var i = 0; i < editItems.length; i++) {
            if (checkActiveItem(editItems[i])) {
              if (i) {
                this.addItem();
              } else {
                this.addItem(true);
              }
              // this.addItem(true);
            }
          }
        }
      }
    }
  };

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps, this.props)) {
      this.initMultiItem(nextProps);
    }
  }

  objectToDropdown = object => {
    let dropDown = [];
    for (var variable in object) {
      if (object.hasOwnProperty(variable)) {
        dropDown.push({ code: variable });
      }
    }
    return dropDown;
  };

  addItem = (isNew = false) => {
    const {
      onFieldChange: addItemToState,
      screenKey,
      scheama,
      sourceJsonPath,
      prefixSourceJsonPath,
      afterPrefixJsonPath,
      componentJsonpath,
      headerName,
      headerJsonPath,
      screenConfig,
      preparedFinalObject
    } = this.props;
    const items = isNew
      ? []
      : get(screenConfig, `${screenKey}.${componentJsonpath}.props.items`, []);
    const itemsLength = items.length;
    set(scheama, headerJsonPath, `${headerName} - ${itemsLength + 1}`);
    if (sourceJsonPath) {
      let multiItemContent = get(scheama, prefixSourceJsonPath, {});
      for (var variable in multiItemContent) {
        if (
          multiItemContent.hasOwnProperty(variable) &&
          multiItemContent[variable].props &&
          multiItemContent[variable].props.jsonPath
        ) {
          let prefixJP = multiItemContent[variable].props.jsonPathUpdatePrefix
            ? multiItemContent[variable].props.jsonPathUpdatePrefix
            : sourceJsonPath;
          let splitedJsonPath = multiItemContent[variable].props.jsonPath.split(
            prefixJP
          );
          if (splitedJsonPath.length > 1) {
            let propertyName = splitedJsonPath[1].split("]");
            if (propertyName.length > 1) {
              multiItemContent[
                variable
              ].jsonPath = `${prefixJP}[${itemsLength}]${propertyName[1]}`;
              multiItemContent[
                variable
              ].props.jsonPath = `${prefixJP}[${itemsLength}]${
                propertyName[1]
              }`;
              multiItemContent[variable].index = itemsLength;
            }
          }
          //Temporary fix - For setting trade type - should be generalised
          const value = get(
            preparedFinalObject,
            multiItemContent[variable].props.jsonPath
          );
          if (multiItemContent[variable].props.setDataInField && value) {
            if (
              multiItemContent[variable].props.jsonPath.split(".")[0] ===
                "LicensesTemp" &&
              multiItemContent[variable].props.jsonPath.split(".").pop() ===
                "tradeType"
            ) {
              const tradeTypeData = get(
                preparedFinalObject,
                `applyScreenMdmsData.TradeLicense.TradeType`,
                []
              );
              const tradeTypeDropdownData =
                tradeTypeData &&
                tradeTypeData.TradeType &&
                Object.keys(tradeTypeData.TradeType).map(item => {
                  return { code: item, active: true };
                });
              multiItemContent[variable].props.data = tradeTypeDropdownData;
              const data = tradeTypeData[value];
              if (data) {
                multiItemContent[
                  "tradeType"
                ].props.data = this.objectToDropdown(data);
              }
            } else if (
              multiItemContent[variable].props.jsonPath.split(".").pop() ===
              "tradeType"
            ) {
              const data = get(
                preparedFinalObject,
                `applyScreenMdmsData.TradeLicense.TradeType.${
                  value.split(".")[0]
                }.${value.split(".")[1]}`
              );
              if (data) {
                multiItemContent[variable].props.data = data;
              }
            } else if (
              multiItemContent[variable].props.jsonPath.split(".").pop() ===
                "uomValue" &&
              value > 0
            ) {
              multiItemContent[variable].props.disabled = false;
              multiItemContent[variable].props.required = true;
            }
          }
          if (
            multiItemContent[variable].props.setDataInField &&
            multiItemContent[variable].props.disabled
          ) {
            if (
              multiItemContent[variable].props.jsonPath.split(".").pop() ===
              "uomValue"
            ) {
              const disabledValue = get(
                screenConfig[screenKey],
                `${
                  multiItemContent[variable].componentJsonpath
                }.props.disabled`,
                true
              );
              multiItemContent[variable].props.disabled = disabledValue;
            }
          }
        } else if (
          afterPrefixJsonPath &&
          multiItemContent.hasOwnProperty(variable) &&
          get(multiItemContent[variable], `${afterPrefixJsonPath}.props`) &&
          get(
            multiItemContent[variable],
            `${afterPrefixJsonPath}.props.jsonPath`
          )
        ) {
          let splitedJsonPath = get(
            multiItemContent[variable],
            `${afterPrefixJsonPath}.props.jsonPath`
          ).split(sourceJsonPath);
          if (splitedJsonPath.length > 1) {
            let propertyName = splitedJsonPath[1].split("]");
            if (propertyName.length > 1) {
              set(
                multiItemContent[variable],
                `${afterPrefixJsonPath}.props.jsonPath`,
                `${sourceJsonPath}[${itemsLength}]${propertyName[1]}`
              );
            }
          }
        }
      }
      set(scheama, prefixSourceJsonPath, multiItemContent);
    }
    items[itemsLength] = cloneDeep(
      addComponentJsonpath(
        { [`item${itemsLength}`]: scheama },
        `${componentJsonpath}.props.items[${itemsLength}]`
      )
    );
    addItemToState(screenKey, componentJsonpath, `props.items`, items);
  };

  removeItem = index => {
    const {
      onFieldChange: removeItem,
      screenKey,
      componentJsonpath,
      screenConfig,
      updatePreparedFormObject,
      sourceJsonPath
    } = this.props;
    const items = get(
      screenConfig,
      `${screenKey}.${componentJsonpath}.props.items`
    );
    updatePreparedFormObject(`${sourceJsonPath}[${index}].isDeleted`, false);
    items[index].isDeleted = false;
    // items.splice(index,1);
    removeItem(screenKey, componentJsonpath, `props.items`, items);
  };

  render() {
    const {
      items,
      scheama,
      addItemLabel,
      id,
      uiFramework,
      onFieldChange,
      onComponentClick,
      hasAddItem,
      screenKey,
      isReviewPage
    } = this.props;
    const { addItem, removeItem } = this;
    return (
      <Div>
        {items.length > 0 &&
          items.map((item, key) => {
            if (checkActiveItem(item)) {
              return (
                <Div key={key}>
                  {checkActiveItems(items) > 1 && !isReviewPage && (
                    <Container>
                      <Item xs={12} align="right">
                        <IconButton
                          style={{
                            marginBottom: "-105px",
                            width: "40px",
                            height: "40px"
                          }}
                          onClick={e => removeItem(key)}
                          aria-label="Remove"
                        >
                          <Icon iconName="clear" />
                        </IconButton>
                      </Item>
                    </Container>
                  )}
                  <RenderScreen
                    screenKey={screenKey}
                    components={item}
                    uiFramework={uiFramework}
                    onFieldChange={onFieldChange}
                    onComponentClick={onComponentClick}
                  />
                </Div>
              );
            }
          })}
        {hasAddItem !== false && (
          <Container style={{ marginTop: "8px" }}>
            <Item xs={12} align="right">
              <Button onClick={e => addItem()} color="primary">
                <Icon iconName="add" />
                {addItemLabel}
              </Button>
            </Item>
          </Container>
        )}
      </Div>
    );
  }
}

const mapStateToProps = state => {
  const { screenConfiguration } = state;
  const { screenConfig, preparedFinalObject } = screenConfiguration;
  return { screenConfig, preparedFinalObject, state };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePreparedFormObject: (jsonPath, value) =>
      dispatch(pFO(jsonPath, value))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MultiItem);
