import React, { Component } from "react";
import { Screen } from "modules/common";
import { Icon } from "components";
import formHoc from "egov-ui-kit/hocs/form";
import GenericForm from "egov-ui-kit/common/GenericForm";
import { OwnerInformation } from "../../../../PropertyTax/FormWizard/components/Forms";
import { fetchProperties } from "egov-ui-kit/redux/properties/actions";
import { ActionFooter } from "modules/common";
import Label from "egov-ui-kit/utils/translationNode";
import { getLatestPropertyDetails } from "egov-ui-kit/utils/PTCommon";
import { connect } from "react-redux";
import propertyAddress from "egov-ui-kit/config/forms/specs/PropertyTaxPay/propertyAddress"
import cloneDeep from "lodash/cloneDeep"
import get from "lodash/get"
import set from "lodash/set"
import { getPropertyFromId } from "./utils"
import { updateForms } from "egov-ui-kit/redux/form/actions";
import { normalizePropertyDetails } from "modules/employee/PropertyTax/FormWizard"
import { httpRequest } from "egov-ui-kit/utils/api";
import { updatePrepareFormDataFromDraft } from "egov-ui-kit/redux/common/actions";

import "./index.css";

const buttons = {
  button1: "GO BACK",
  button2: "SAVE",
};

const PropertyAddressHOC = formHoc({ formKey: "propertyAddress", path: "PropertyTaxPay" })(GenericForm);

export const getpropertyAddressDetails = (property) => {
  let res = cloneDeep(propertyAddress)
  Object.keys(propertyAddress.fields).forEach((field)=> {
    const jsonPath = propertyAddress.fields[field].jsonPath
    if (jsonPath) {
      let value = get(property, `Properties[0].address[${jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)}]`, "")
      set(res, `fields.${field}.value`, value)
    }
  })
  delete res.name
  let propertyAddressForm = {
    "propertyAddress": res,
  }
  set(propertyAddressForm, "propertyAddress.fields.oldPID.value", get(property, "oldPropertyId", ""))
  set(propertyAddressForm, "propertyAddress.fields.city.value", get(property, "tenantId", ""))
  set(propertyAddressForm, "propertyAddress.fields.mohalla.value", get(property, "address.locality.code", ""))

  return propertyAddressForm
}

class PropertyInformation extends Component {
  state = {
    propertiesFromApi: {},
  }

  addDraft = async (assessmentNumber) => {
    const { propertiesFromApi } = this.state
    const tenantId = get(propertiesFromApi, "Properties[0].tenantId", "")
    let draftRequest = {
      draft: {
        tenantId,
        userId: get(JSON.parse(localStorage.getItem("user-info")), "uuid"),
        draftRecord: {},
      },
    }
    let draftsResponse = await httpRequest(
      "pt-services-v2/drafts/_search",
      "_search",
      [
        {
          key: "assessmentNumber",
          value: get(this.state, "propertiesFromApi.Properties[0].propertyDetails[0].assessmentNumber", ""),
        },
        {
          key: "tenantId",
          value: tenantId,
        },
      ],
      draftRequest
    );
    set(draftRequest, "draft.draftRecord", draftsResponse.drafts[0].draftRecord)
    let draftsResponseNew = await httpRequest("pt-services-v2/drafts/_create", "_cretae", [], draftRequest);
    set(draftRequest, "draft.draftRecord.assessmentNumber", assessmentNumber)
    set(draftRequest, "draft.assessmentNumber", assessmentNumber)
    set(draftRequest, "draft.id", get(draftsResponseNew, "drafts[0].id", ""))
    let updatedDraftsResponse = await httpRequest("pt-services-v2/drafts/_update", "_update", [], draftRequest);
  }

  primaryAction = async () => {
    try {
      const properties = normalizePropertyDetails(this.props.prepareFormData.Properties, this.props);
      set(properties, "[0].propertyDetails[0].financialYear", "2017-18")
      let createPropertyResponse = await httpRequest(`pt-services-v2/property/_update`, `_update`, [], {
        Properties: properties,
      });
      const assessmentNumber = get(createPropertyResponse, "Properties[0].propertyDetails[0].assessmentNumber", "")
      console.log("assessmentNumber", assessmentNumber)
      const draftResponse = await this.addDraft(assessmentNumber)
    } catch (e) {
      alert(e)
    }
  }

  async componentDidMount() {
    const { fetchProperties, currentProperty, updatePrepareFormDataFromDraft, updatePTForms } = this.props;
    const { propertyId, tenantId } = this.props.match.params
    //fetchProperties([{ key: "ids", value: this.props.match.params.propertyId }, { key: "tenantId", value: this.props.match.params.tenantId }]);
    const propertyDetails = await getPropertyFromId(tenantId, propertyId)
    const propertyAddressDetails = getpropertyAddressDetails(propertyDetails)
    this.setState({
      propertiesFromApi: propertyDetails,
    })
    updatePTForms(propertyAddressDetails);
    updatePrepareFormDataFromDraft(propertyDetails);
  }
  render() {
    return (
      <Screen>
        <div className="form-without-button-cont-generic">
          <PropertyAddressHOC
            cardTitle={
              <div className="rainmaker-displayInline" style={{ marginLeft: 12, marginBottom: 10 }}>
                <Icon action="action" name="home" />
                <Label label="Property Address" containerStyle={{ marginLeft: 5 }} />
              </div>
            }
          />
          <ActionFooter label1={buttons.button1} label2={buttons.button2} primaryAction={this.primaryAction}/>
        </div>
      </Screen>
    );
  }
}

const mapStateToProps = ({ properties, common }, compProps) => {
  const { propertiesById } = properties;
  let currentProperty = [];
  if (propertiesById.hasOwnProperty(compProps.match.params.propertyId)) {
    currentProperty[0] = propertiesById[compProps.match.params.propertyId];
    currentProperty[0].propertyDetails = getLatestPropertyDetails(currentProperty[0].propertyDetails);
  }
  return {
    currentProperty,
    prepareFormData: common.prepareFormData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProperties: (queryObjectProperty) => dispatch(fetchProperties(queryObjectProperty)),
    updatePTForms: (forms) => dispatch(updateForms(forms)),
    updatePrepareFormDataFromDraft: (prepareFormData) => dispatch(updatePrepareFormDataFromDraft(prepareFormData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyInformation);
