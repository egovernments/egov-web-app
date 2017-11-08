var dat = {
	"works.create": {
		"numCols": 12/4,
		"url": "",
		"tenantIdRequired": true,
		"useTimestamp": true,
		"objectName": "abstractEstimates",
		"groups": [
			{
				"label": "works.create.groups.label.estandadminsanction",
				"name": "Abstract Estimate",
				"fields": [
            {
              "name": "dateOfProposal",
              "jsonPath": "abstractEstimates[0].dateOfProposal",
              "label": "works.create.groups.fields.dateOfProposal",
              "pattern": "",
              "type": "date",
              "url": "",
              "isRequired": true,
              "isDisabled": false,
              "requiredErrMsg": "Please enter valid date",
              "patternErrMsg": ""
            },
						{
              "name": "department",
              "jsonPath": "abstractEstimates[0].department",
              "label": "works.create.groups.fields.department",
              "pattern": "",
              "type": "singleValueList",
							"url": "/egov-common-masters/departments/_search?&|$..id|$..name",
              "isRequired": true,
              "isDisabled": false,
              "requiredErrMsg": "",
              "patternErrMsg": ""
            },
						{
              "name": "referenceType",
              "jsonPath": "abstractEstimates[0].referenceType",
              "label": "works.create.groups.fields.referenceType",
              "pattern": "",
              "type": "singleValueList",
							"url":"/egov-mdms-service/v1/_get?&moduleName=Works&masterName=ReferenceType|$..code|$..name",
              "isRequired": true,
              "isDisabled": false,
              "requiredErrMsg": "",
              "patternErrMsg": ""
            },
						{
              "name": "referenceNumber",
              "jsonPath": "abstractEstimates[0].referenceNumber",
              "label": "works.create.groups.fields.referenceNumber",
              "pattern": "",
              "type": "text",
              "url": "",
              "isRequired": false,
              "isDisabled": false,
              "requiredErrMsg": "",
              "patternErrMsg": ""
            },
						{
							"name": "subject",
							"jsonPath": "abstractEstimates[0].subject",
							"label": "works.create.groups.fields.subject",
							"pattern": "",
							"type": "textarea",
							"isRequired": true,
							"isDisabled": false,
							"requiredErrMsg": "",
							"patternErrMsg": ""
						},
						{
							"name": "description",
							"jsonPath": "abstractEstimates[0].description",
							"label": "works.create.groups.fields.description",
							"pattern": "",
							"type": "textarea",
							"isRequired": true,
							"isDisabled": false,
							"requiredErrMsg": "",
							"patternErrMsg": ""
						},
						{
              "name": "natureOfWork",
              "jsonPath": "abstractEstimates[0].natureOfWork",
              "label": "works.create.groups.fields.natureOfWork",
              "pattern": "",
              "type": "singleValueList",
							"url":"/egov-mdms-service/v1/_get?&moduleName=Works&masterName=NatureOfWork|$..code|$..name",
              "isRequired": true,
              "isDisabled": false,
              "requiredErrMsg": "",
              "patternErrMsg": ""
            },
						{
              "name": "modeOfAllotment",
              "jsonPath": "abstractEstimates[0].modeOfAllotment",
              "label": "works.create.groups.fields.modeOfAllotment",
              "pattern": "",
              "type": "singleValueList",
              "url":"/egov-mdms-service/v1/_get?&moduleName=Works&masterName=ModeOfAllotment|$..code|$..name",
              "isRequired": true,
              "isDisabled": false,
              "requiredErrMsg": "",
              "patternErrMsg": ""
            },
						{
              "name": "typeOfWork",
              "jsonPath": "abstractEstimates[0].typeOfWork",
              "label": "works.create.groups.fields.typeOfWork",
              "pattern": "",
              "type": "singleValueList",
              "url":"/egov-mdms-service/v1/_get?&moduleName=Works&masterName=TypeOfWork|$..code|$..name",
              "isRequired": true,
              "isDisabled": false,
              "requiredErrMsg": "",
              "patternErrMsg": "",
							"depedants": [{
	              "jsonPath": "abstractEstimates[0].subTypeOfWork",
	              "type": "dropDown",
								"pattern": "/egov-mdms-service/v1/_get?&moduleName=Works&masterName=TypeOfWork&filter=%5B%3F%28%40.parent%3D%3D'{abstractEstimates[0].typeOfWork}'%29%5D|$..code|$..name"
	            }]
            },
						{
              "name": "subTypeOfWork",
              "jsonPath": "abstractEstimates[0].subTypeOfWork",
              "label": "works.create.groups.fields.subTypeOfWork",
              "pattern": "",
              "type": "singleValueList",
              "isRequired": true,
              "isDisabled": false,
              "requiredErrMsg": "",
              "patternErrMsg": ""
            },
						{
              "name": "workCategory",
              "jsonPath": "abstractEstimates[0].workCategory",
              "label": "works.create.groups.fields.workCategory",
              "pattern": "",
              "type": "singleValueList",
              "url": "",
							"defaultValue":[
								{
                    "key": "NON_SLUM",
                    "value": "NON_SLUM"
                },
								{
                    "key": "NOTIFIED_SLUM",
                    "value": "NOTIFIED_SLUM"
                },
								{
                    "key": "NON_NOTIFIED_SLUM",
                    "value": "NON_NOTIFIED_SLUM"
                },
							],
              "isRequired": true,
              "isDisabled": false,
              "requiredErrMsg": "",
              "patternErrMsg": ""
            },
						{
              "name": "beneficiary",
              "jsonPath": "abstractEstimates[0].beneficiary",
              "label": "works.create.groups.fields.beneficiary",
              "pattern": "",
              "type": "singleValueList",
              "url": "",
							"defaultValue":[
								{
                    "key": "SC",
                    "value": "SC"
                },
								{
                    "key": "ST",
                    "value": "ST"
                },
								{
                    "key": "BC",
                    "value": "BC"
                },
								{
                    "key": "MINORITY",
                    "value": "MINORITY"
                },
								{
                    "key": "WOMEN_CHILDREN_WELFARE",
                    "value": "WOMEN_CHILDREN_WELFARE"
                },
								{
                    "key": "GENERAL",
                    "value": "GENERAL"
                },
							],
              "isRequired": true,
              "isDisabled": false,
              "requiredErrMsg": "",
              "patternErrMsg": ""
            },
						{
              "name": "locality",
              "jsonPath": "abstractEstimates[0].locality",
              "label": "works.create.groups.fields.locality",
              "pattern": "",
              "type": "singleValueList",
              "url": "/egov-location/boundarys/boundariesByBndryTypeNameAndHierarchyTypeName?&boundaryTypeName=LOCALITY&hierarchyTypeName=LOCATION|$..code|$..name",
              "isRequired": true,
              "isDisabled": false,
              "requiredErrMsg": "",
              "patternErrMsg": ""
            },
						{
              "name": "ward",
              "jsonPath": "abstractEstimates[0].ward",
              "label": "works.create.groups.fields.ward",
              "pattern": "",
              "type": "singleValueList",
              "url": "/egov-location/boundarys/boundariesByBndryTypeNameAndHierarchyTypeName?tenantId=default&boundaryTypeName=Ward&hierarchyTypeName=ADMINISTRATION|$..code|$..name",
              "isRequired": true,
              "isDisabled": false,
              "requiredErrMsg": "",
              "patternErrMsg": ""
            },
						{
              "name": "workProposedAsPerDP",
              "jsonPath": "abstractEstimates[0].workProposedAsPerDP",
              "label": "works.create.groups.fields.workProposedAsPerDP",
              "pattern": "",
              "type": "singleValueList",
              "url": "",
              "isRequired": true,
              "isDisabled": false,
              "requiredErrMsg": "",
              "patternErrMsg": ""
            },
						{
							"name": "dpRemarks",
							"jsonPath": "abstractEstimates[0].dpRemarks",
							"label": "works.create.groups.fields.dpRemarks",
							"pattern": "",
							"type": "textarea",
							"isRequired": true,
							"isDisabled": false,
							"requiredErrMsg": "",
							"patternErrMsg": ""
						},
						{
              "name": "pmcRequired",
              "jsonPath": "abstractEstimates[0].pmcRequired",
              "label": "works.create.groups.fields.pmcRequired",
              "pattern": "",
              "type": "singleValueList",
              "url": "",
							"defaultValue":[
								{
                    "key": true,
                    "value": "Yes"
                },
								{
                    "key": false,
                    "value": "No"
                }
							],
              "isRequired": false,
              "isDisabled": false,
              "requiredErrMsg": "",
              "patternErrMsg": ""
            },
						{
              "name": "pmcType",
              "jsonPath": "abstractEstimates[0].pmcType",
              "label": "works.create.groups.fields.pmcType",
              "pattern": "",
              "type": "singleValueList",
              "url": "",
              "isRequired": false,
              "isDisabled": false,
              "requiredErrMsg": "",
              "patternErrMsg": ""
            },
						{
              "name": "pmcName",
              "jsonPath": "abstractEstimates[0].pmcName",
              "label": "works.create.groups.fields.pmcName",
              "pattern": "",
              "type": "singleValueList",
              "url": "",
              "isRequired": false,
              "isDisabled": false,
              "requiredErrMsg": "",
              "patternErrMsg": ""
            },
						{
							"name": "implementationPeriod",
							"jsonPath": "abstractEstimates[0].implementationPeriod",
							"label": "works.create.groups.fields.implementationPeriod",
							"pattern": "",
							"type": "text",
							"isRequired": false,
							"isDisabled": false,
							"requiredErrMsg": "",
							"patternErrMsg": ""
						}
				]
			},
			{
				"label": "works.create.groups.label.assetdetails",
				"name": "Asset Details",
				"fields":[
					{
						"name": "code",
						"jsonPath": "abstractEstimates[0].assetDetails[0].asset",
						"label": "works.create.groups.fields.assetCode",
						"pattern": "",
						"type": "text",
						"isRequired": false,
						"isDisabled": false,
						"requiredErrMsg": "",
						"patternErrMsg": ""
					},
					{
						"name": "assetCondition",
						"jsonPath": "abstractEstimates[0].assetDetails[0].assetCondition",
						"label": "works.create.groups.fields.assetCondition",
						"pattern": "",
						"type": "singleValueList",
						"url": "",
						"isRequired": true,
						"isDisabled": false,
						"requiredErrMsg": "",
						"patternErrMsg": ""
					},
					{
						"name": "assetRemarks",
						"jsonPath": "abstractEstimates[0].assetDetails[0].assetRemarks",
						"label": "works.create.groups.fields.assetRemarks",
						"pattern": "",
						"type": "textarea",
						"isRequired": true,
						"isDisabled": false,
						"requiredErrMsg": "",
						"patternErrMsg": ""
					},
				]
			},
			{
				"label": "works.create.groups.label.workdetails",
				"name": "Work Details",
				"fields":[
					{
					  "type": "tableList",
					  "jsonPath": "abstractEstimates[0].abstractEstimateDetails",
					  "tableList": {
					    "header": [{
					      "label": "works.create.groups.label.nameofthework"
					    }, {
					      "label": "works.create.groups.label.estimateAmount"
					    }],
					    "values": [{
					      "name": "name",
					      "pattern": "",
					      "type": "textarea",
					      "jsonPath": "abstractEstimates[0].abstractEstimateDetails[0].nameOfWork",
					      "isRequired": true,
								"isDisabled": false
					    }, {
					      "name": "type",
					      "pattern": "",
					      "type": "text",
					      "jsonPath": "abstractEstimates[0].abstractEstimateDetails[0].estimateAmount",
					      "isRequired": true,
								"isDisabled": false
					    }]
					  }
					}
				]
			},
			{
				"label": "works.create.groups.label.uploaddocs",
				"name": "Upload Documents",
				"fields":[
					{
						"name": "name",
		        "jsonPath": "documentDetails[0].name",
						"label": "works.create.groups.label.docDetails",
						"pattern": "",
						"type": "fileTable",
						"isRequired": true,
						"isDisabled": false,
						"requiredErrMsg": "",
						"patternErrMsg": "",
						"fileList": {
									name: "docName",
									id: "fileStoreId"
						},
						fileCount: 3
					}
				]
			}
		]
	}
}

export default dat;
