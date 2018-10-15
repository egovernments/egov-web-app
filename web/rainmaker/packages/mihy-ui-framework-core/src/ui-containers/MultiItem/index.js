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
import { addComponentJsonpath } from "../../ui-utils";
import {prepareFinalObject as pFO} from "../../ui-redux/screen-configuration/actions";

const checkActiveItems=(items)=>{
  let count=0;
  for (var i = 0; i < items.length; i++) {
    if(checkActiveItem(items[i])) count++
  }
  return count;
}

const checkActiveItem=(item)=>{
  return item && (item.active===undefined || item.active!==false)
}

class MultiItem extends React.Component {
  componentDidMount = () => {
    const { items, sourceJsonPath, preparedFinalObject } = this.props;
    const editItems = get(preparedFinalObject, sourceJsonPath, []);
    if (!items.length && !editItems.length) {
      this.addItem();
    } else {
      for (var i = 0; i < editItems.length; i++) {
        if (checkActiveItem(editItems[i])) {
          this.addItem(true);
        }
      }
    }
  };

  addItem = (isNew=false) => {
    const {
      onFieldChange: addItemToState,
      screenKey,
      scheama,
      sourceJsonPath,
      prefixSourceJsonPath,
      componentJsonpath,
      headerName,
      headerJsonPath,
      screenConfig
    } = this.props;
    const items = isNew?[]:get(
      screenConfig,
      `${screenKey}.${componentJsonpath}.props.items`,
      []
    );
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
          let splitedJsonPath = multiItemContent[variable].props.jsonPath.split(
            sourceJsonPath
          );
          if (splitedJsonPath.length > 1) {
            let propertyName = splitedJsonPath[1].split("]");
            if (propertyName.length > 1) {
              multiItemContent[
                variable
              ].jsonPath = `${sourceJsonPath}[${itemsLength}]${
                propertyName[1]
              }`;
              multiItemContent[
                variable
              ].props.jsonPath = `${sourceJsonPath}[${itemsLength}]${
                propertyName[1]
              }`;
            }
          }
        }
      }
      set(scheama, prefixSourceJsonPath, multiItemContent);
    }
    addItemToState(
      screenKey,
      componentJsonpath,
      `props.items[${itemsLength}]`,
      cloneDeep(
        addComponentJsonpath(
          { [`item${itemsLength}`]: scheama },
          `${componentJsonpath}.props.items[${itemsLength}]`
        )
      )
    );
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
    updatePreparedFormObject(`${sourceJsonPath}[${index}].active`,false);
    items[index].active=false;
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
      screenKey
    } = this.props;
    const { addItem, removeItem } = this;
    return (
      <Div>
        {items.length > 0 &&
          items.map((item, key) => {
            if (checkActiveItem(item)) {
              return (
                <Div key={key}>
                  {checkActiveItems(items) > 1 && (
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
    updatePreparedFormObject:(jsonPath,value)=>dispatch(pFO(jsonPath,value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MultiItem);
