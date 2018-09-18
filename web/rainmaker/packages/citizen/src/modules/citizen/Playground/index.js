import React from "react";
import { getPlotAndFloorFormConfigPath } from "egov-ui-kit/config/forms/specs/PropertyTaxPay/utils/assessInfoFormManager";
import { get, cloneDeep } from "lodash";

const propertiesData = {
  ResponseInfo: { apiId: "Rainmaker", ver: ".01", ts: null, resMsgId: "uief87324", msgId: "20170310130900|en_IN", status: "successful" },
  Properties: [
    {
      auditDetails: {
        createdBy: "7d38b816-4b99-40b2-8449-e0ed34d4f7b0",
        lastModifiedBy: "7d38b816-4b99-40b2-8449-e0ed34d4f7b0",
        createdTime: 1535622392448,
        lastModifiedTime: 1535622392448,
      },
      creationReason: null,
      occupancyDate: 0,
      propertyDetails: [
        {
          institution: null,
          tenantId: "pb.amritsar",
          citizenInfo: {
            isPrimaryOwner: null,
            ownerShipPercentage: null,
            ownerType: null,
            institutionId: null,
            documents: null,
            relationship: null,
            id: 23985,
            uuid: "7d38b816-4b99-40b2-8449-e0ed34d4f7b0",
            userName: "8454951244",
            password: null,
            salutation: null,
            name: "S D",
            gender: null,
            mobileNumber: "8454951244",
            emailId: null,
            altContactNumber: null,
            pan: null,
            aadhaarNumber: null,
            permanentAddress: null,
            permanentCity: null,
            permanentPinCode: null,
            correspondenceCity: null,
            correspondencePinCode: null,
            correspondenceAddress: null,
            active: null,
            dob: null,
            pwdExpiryDate: null,
            locale: null,
            type: "CITIZEN",
            signature: null,
            accountLocked: null,
            roles: [
              {
                id: 281,
                name: "Citizen",
                code: "CITIZEN",
                description: null,
                createdBy: null,
                createdDate: null,
                lastModifiedBy: null,
                lastModifiedDate: null,
                tenantId: null,
              },
            ],
            fatherOrHusbandName: null,
            bloodGroup: null,
            identificationMark: null,
            photo: null,
            createdBy: null,
            createdDate: null,
            lastModifiedBy: null,
            lastModifiedDate: null,
            otpReference: null,
            tenantId: "pb",
          },
          source: null,
          usage: null,
          noOfFloors: 2,
          landArea: 2222,
          buildUpArea: 0,
          units: [
            {
              id: "d7ce83eb-106e-460e-931b-31ee1fd1f318",
              tenantId: "pb.amritsar",
              floorNo: "0",
              unitType: null,
              unitArea: 222.222,
              usageCategoryMajor: "RESIDENTIAL",
              usageCategoryMinor: null,
              usageCategorySubMinor: null,
              usageCategoryDetail: null,
              occupancyType: "SELFOCCUPIED",
              occupancyDate: 0,
              constructionType: null,
              constructionSubType: null,
              arv: null,
            },
            {
              id: "824d932e-5463-468e-8929-41b0b2195f26",
              tenantId: "pb.amritsar",
              floorNo: "1",
              unitType: null,
              unitArea: 1.111,
              usageCategoryMajor: "RESIDENTIAL",
              usageCategoryMinor: null,
              usageCategorySubMinor: null,
              usageCategoryDetail: null,
              occupancyType: "SELFOCCUPIED",
              occupancyDate: 0,
              constructionType: null,
              constructionSubType: null,
              arv: null,
            },
            {
              id: "5bb0a828-e17d-4931-9f83-39aef0de0dd0",
              tenantId: "pb.amritsar",
              floorNo: "0",
              unitType: null,
              unitArea: 11.111,
              usageCategoryMajor: "RESIDENTIAL",
              usageCategoryMinor: null,
              usageCategorySubMinor: null,
              usageCategoryDetail: null,
              occupancyType: "SELFOCCUPIED",
              occupancyDate: 0,
              constructionType: null,
              constructionSubType: null,
              arv: null,
            },
          ],
          documents: null,
          additionalDetails: { type: "jsonb", value: "null" },
          financialYear: "2018-19",
          propertyType: "BUILTUP",
          propertySubType: "INDEPENDENTPROPERTY",
          assessmentNumber: "AS-2018-08-30-001468",
          assessmentDate: 1535622392462,
          usageCategoryMajor: "RESIDENTIAL",
          usageCategoryMinor: null,
          ownershipCategory: "INDIVIDUAL",
          subOwnershipCategory: "SINGLEOWNER",
          adhocExemption: null,
          adhocPenalty: null,
          adhocExemptionReason: null,
          adhocPenaltyReason: null,
          owners: [
            {
              isPrimaryOwner: false,
              ownerShipPercentage: 0,
              ownerType: "NONE",
              institutionId: null,
              documents: null,
              relationship: null,
              id: null,
              uuid: "6031bfc4-5d76-46b9-bb5e-e3a73cac99bd",
              userName: "9876543211",
              password: null,
              salutation: null,
              name: "sd",
              gender: "MALE",
              mobileNumber: "9876543211",
              emailId: null,
              altContactNumber: null,
              pan: null,
              aadhaarNumber: null,
              permanentAddress: "Back Side 33 KVA Grid Patiala Road - Area1, amritsar",
              permanentCity: null,
              permanentPinCode: null,
              correspondenceCity: null,
              correspondencePinCode: null,
              correspondenceAddress: null,
              active: true,
              dob: null,
              pwdExpiryDate: 1543398392000,
              locale: null,
              type: "CITIZEN",
              signature: null,
              accountLocked: false,
              roles: [
                {
                  id: 281,
                  name: "Citizen",
                  code: "CITIZEN",
                  description: null,
                  createdBy: null,
                  createdDate: null,
                  lastModifiedBy: null,
                  lastModifiedDate: null,
                  tenantId: null,
                },
              ],
              fatherOrHusbandName: "sd",
              bloodGroup: null,
              identificationMark: null,
              photo: null,
              createdBy: "23985",
              createdDate: 1535622392000,
              lastModifiedBy: "23985",
              lastModifiedDate: 1535622392000,
              otpReference: null,
              tenantId: "pb",
            },
          ],
          auditDetails: {
            createdBy: "7d38b816-4b99-40b2-8449-e0ed34d4f7b0",
            lastModifiedBy: "7d38b816-4b99-40b2-8449-e0ed34d4f7b0",
            createdTime: 1535622392448,
            lastModifiedTime: 1535622392448,
          },
          calculation: null,
          channel: null,
        },
      ],
      propertyId: "PT-107-001359",
      tenantId: "pb.amritsar",
      acknowldgementNumber: "PB-AC-2018-08-30-001369",
      oldPropertyId: null,
      status: "ACTIVE",
      address: {
        id: "3f5ac000-8a20-4cf1-b894-fb5a028e0a56",
        tenantId: "pb.amritsar",
        latitude: 0,
        longitude: 0,
        addressId: null,
        addressNumber: null,
        type: null,
        addressLine1: null,
        addressLine2: null,
        landmark: null,
        doorNo: null,
        city: "Amritsar",
        pincode: null,
        detail: null,
        buildingName: null,
        street: null,
        locality: {
          code: "SUN11",
          name: "Back Side 33 KVA Grid Patiala Road - Area1",
          label: "Locality",
          latitude: null,
          longitude: null,
          area: "Area1",
          children: [],
          materializedPath: null,
        },
      },
    },
  ],
};

// const propertiesData = { "ResponseInfo": { "apiId": "Rainmaker", "ver": ".01", "ts": null, "resMsgId": "uief87324", "msgId": "20170310130900|en_IN", "status": "successful" }, "Properties": [{ "auditDetails": { "createdBy": "7d38b816-4b99-40b2-8449-e0ed34d4f7b0", "lastModifiedBy": "7d38b816-4b99-40b2-8449-e0ed34d4f7b0", "createdTime": 1535622392448, "lastModifiedTime": 1535622392448 }, "creationReason": null, "occupancyDate": 0, "propertyDetails": [{ "institution": null, "tenantId": "pb.amritsar", "citizenInfo": { "isPrimaryOwner": null, "ownerShipPercentage": null, "ownerType": null, "institutionId": null, "documents": null, "relationship": null, "id": 23985, "uuid": "7d38b816-4b99-40b2-8449-e0ed34d4f7b0", "userName": "8454951244", "password": null, "salutation": null, "name": "S D", "gender": null, "mobileNumber": "8454951244", "emailId": null, "altContactNumber": null, "pan": null, "aadhaarNumber": null, "permanentAddress": null, "permanentCity": null, "permanentPinCode": null, "correspondenceCity": null, "correspondencePinCode": null, "correspondenceAddress": null, "active": null, "dob": null, "pwdExpiryDate": null, "locale": null, "type": "CITIZEN", "signature": null, "accountLocked": null, "roles": [{ "id": 281, "name": "Citizen", "code": "CITIZEN", "description": null, "createdBy": null, "createdDate": null, "lastModifiedBy": null, "lastModifiedDate": null, "tenantId": null }], "fatherOrHusbandName": null, "bloodGroup": null, "identificationMark": null, "photo": null, "createdBy": null, "createdDate": null, "lastModifiedBy": null, "lastModifiedDate": null, "otpReference": null, "tenantId": "pb" }, "source": null, "usage": null, "noOfFloors": 2, "landArea": 2222, "buildUpArea": 0, "units": [{ "id": "d7ce83eb-106e-460e-931b-31ee1fd1f318", "tenantId": "pb.amritsar", "floorNo": "0", "unitType": null, "unitArea": 222.222, "usageCategoryMajor": "RESIDENTIAL", "usageCategoryMinor": null, "usageCategorySubMinor": null, "usageCategoryDetail": null, "occupancyType": "SELFOCCUPIED", "occupancyDate": 0, "constructionType": null, "constructionSubType": null, "arv": null }, { "id": "824d932e-5463-468e-8929-41b0b2195f26", "tenantId": "pb.amritsar", "floorNo": "1", "unitType": null, "unitArea": 1.111, "usageCategoryMajor": "RESIDENTIAL", "usageCategoryMinor": null, "usageCategorySubMinor": null, "usageCategoryDetail": null, "occupancyType": "SELFOCCUPIED", "occupancyDate": 0, "constructionType": null, "constructionSubType": null, "arv": null }, { "id": "5bb0a828-e17d-4931-9f83-39aef0de0dd0", "tenantId": "pb.amritsar", "floorNo": "0", "unitType": null, "unitArea": 11.111, "usageCategoryMajor": "RESIDENTIAL", "usageCategoryMinor": null, "usageCategorySubMinor": null, "usageCategoryDetail": null, "occupancyType": "SELFOCCUPIED", "occupancyDate": 0, "constructionType": null, "constructionSubType": null, "arv": null }], "documents": null, "additionalDetails": { "type": "jsonb", "value": "null" }, "financialYear": "2018-19", "propertyType": "BUILTUP", "propertySubType": "INDEPENDENTPROPERTY", "assessmentNumber": "AS-2018-08-30-001468", "assessmentDate": 1535622392462, "usageCategoryMajor": "RESIDENTIAL", "usageCategoryMinor": null, "ownershipCategory": "INDIVIDUAL", "subOwnershipCategory": "SINGLEOWNER", "adhocExemption": null, "adhocPenalty": null, "adhocExemptionReason": null, "adhocPenaltyReason": null, "owners": [{ "isPrimaryOwner": false, "ownerShipPercentage": 0, "ownerType": "NONE", "institutionId": null, "documents": null, "relationship": null, "id": null, "uuid": "6031bfc4-5d76-46b9-bb5e-e3a73cac99bd", "userName": "9876543211", "password": null, "salutation": null, "name": "sd", "gender": "MALE", "mobileNumber": "9876543211", "emailId": null, "altContactNumber": null, "pan": null, "aadhaarNumber": null, "permanentAddress": "Back Side 33 KVA Grid Patiala Road - Area1, amritsar", "permanentCity": null, "permanentPinCode": null, "correspondenceCity": null, "correspondencePinCode": null, "correspondenceAddress": null, "active": true, "dob": null, "pwdExpiryDate": 1543398392000, "locale": null, "type": "CITIZEN", "signature": null, "accountLocked": false, "roles": [{ "id": 281, "name": "Citizen", "code": "CITIZEN", "description": null, "createdBy": null, "createdDate": null, "lastModifiedBy": null, "lastModifiedDate": null, "tenantId": null }], "fatherOrHusbandName": "sd", "bloodGroup": null, "identificationMark": null, "photo": null, "createdBy": "23985", "createdDate": 1535622392000, "lastModifiedBy": "23985", "lastModifiedDate": 1535622392000, "otpReference": null, "tenantId": "pb" }], "auditDetails": { "createdBy": "7d38b816-4b99-40b2-8449-e0ed34d4f7b0", "lastModifiedBy": "7d38b816-4b99-40b2-8449-e0ed34d4f7b0", "createdTime": 1535622392448, "lastModifiedTime": 1535622392448 }, "calculation": null, "channel": null }], "propertyId": "PT-107-001359", "tenantId": "pb.amritsar", "acknowldgementNumber": "PB-AC-2018-08-30-001369", "oldPropertyId": null, "status": "ACTIVE", "address": { "id": "3f5ac000-8a20-4cf1-b894-fb5a028e0a56", "tenantId": "pb.amritsar", "latitude": 0, "longitude": 0, "addressId": null, "addressNumber": null, "type": null, "addressLine1": null, "addressLine2": null, "landmark": null, "doorNo": null, "city": "Amritsar", "pincode": null, "detail": null, "buildingName": null, "street": null, "locality": { "code": "SUN11", "name": "Back Side 33 KVA Grid Patiala Road - Area1", "label": "Locality", "latitude": null, "longitude": null, "area": "Area1", "children": [], "materializedPath": null } } }] }  ;

class Playground extends React.Component {
  propTypeUsage = (data) => {
    var propertyType = data["Properties"][0]["propertyDetails"][0]["propertyType"];
    var propertySubType = data["Properties"][0]["propertyDetails"][0]["propertySubType"];
    var usageCategoryMajor = data["Properties"][0]["propertyDetails"][0]["usageCategoryMajor"];
    var usageCategoryMinor = data["Properties"][0]["propertyDetails"][0]["usageCategoryMinor"];
    var propType = propertySubType === null ? propertyType : propertySubType;
    var propUsageType = usageCategoryMinor == null ? usageCategoryMajor : usageCategoryMinor;
    let formConfigPath = getPlotAndFloorFormConfigPath(propUsageType, propType);
    var path = formConfigPath["path"];
    var dictFloor = {};
    var dictCustomSelect = {};

    let configPlot = require(`egov-ui-kit/config/forms/specs/${path}/plotDetails.js`).default;
    let configFloor = require(`egov-ui-kit/config/forms/specs/${path}/floorDetails.js`).default;
    let configCustomSelect = require(`egov-ui-kit/config/forms/specs/PropertyTaxPay/customSelect.js`).default;
    let configBasic = require(`egov-ui-kit/config/forms/specs/PropertyTaxPay/basicInformation.js`).default;

    if (formConfigPath["hasPlot"]) {
      configPlot = cloneDeep(configPlot);
      Object.keys(configPlot["fields"]).map((item) => {
        let jsonPath = configPlot["fields"][item]["jsonPath"];
        let value = get(data, jsonPath);
        configPlot["fields"][item]["value"] = value;
      });
    }

    if (formConfigPath["hasFloor"]) {
      var units = data["Properties"][0]["propertyDetails"][0]["units"];

      for (var unitIndex = 0; unitIndex < units.length; unitIndex++) {
        var floorNo = units[unitIndex]["floorNo"];
        let formKey = `floorDetails_${floorNo}_unit_${unitIndex}`;
        configFloor = cloneDeep(configFloor);
        Object.keys(configFloor["fields"]).map((item) => {
          let jsonPath = configFloor["fields"][item]["jsonPath"];
          jsonPath = jsonPath.replace(/units\[[0-9]\]/g, "units[" + unitIndex + "]");
          let valueInJSON = get(data, jsonPath);
          configFloor["fields"][item].value = valueInJSON;
        });
        dictFloor[formKey] = configFloor;
        if (!("customSelect_" + floorNo in dictCustomSelect)) {
          configCustomSelect = cloneDeep(configCustomSelect);
          configCustomSelect["fields"]["floorName"]["value"] = floorNo;
          dictCustomSelect["customSelect_" + floorNo] = configCustomSelect;
        }
      }
    }

    configBasic = cloneDeep(configBasic);
    Object.keys(configBasic["fields"]).map((item) => {
      var jsonPath = configBasic["fields"][item]["jsonPath"];
      var valueInJSON = get(data, jsonPath);
      // console.log("Path:" + path);
      // console.log("In floor " + item + ":" + valueInJSON);
      configBasic["fields"][item].value = valueInJSON;
    });
    // console.log(configBasic);
    console.log({ basicInformation: configBasic, plotDetails: configPlot, ...dictFloor, ...dictCustomSelect });
    return { basicInformation: configBasic, plotDetails: configPlot, ...dictFloor, ...dictCustomSelect };
  };

  componentDidMount() {
    this.propTypeUsage(propertiesData);
  }
  render() {
    return <div> playground</div>;
  }
}

export default Playground;
