var dat = {
  'lcms.create': {
    numCols: 4,
    title: 'legacycase.update.document.title',
    useTimestamp: true,
    objectName: 'cases',
    documentsPath: 'cases[0].summon',
    customActionsAndUrl: [
      {
        actionName: 'Back',
        url: '/search/lcms/summon/view',
      },
    ],
    groups: [
    {
        name: 'CaseType',
        label: 'legal.create.group.title.CaseType',
        fields: [
          {
            name: 'isSummon',
            jsonPath: 'cases[0].summon.isSummon',
            label: 'legal.create.isSummon',
            type: 'radio',
            styleObj: { display: '-webkit-box' },
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
            values: [
              {
                label: 'legal.create.Summon',
                value: true,
              },
              {
                label: 'legal.create.Warrant',
                value: false,
              },
            ],
            defaultValue: true,
          },
        ],
      },
      {
        name: 'CaseTypeDetails',
        label: 'legal.create.group.title.CaseTypeDetails',
        fields: [
          {
            name: 'referenceNo',
            jsonPath: 'cases[0].summon.summonReferenceNo',
            label: 'legal.create.referenceNo',
            type: 'text',
            isRequired: false,
            isDisabled: true,
            patternErrorMsg: '',
          },
          {
            name: 'summonDate',
            jsonPath: 'cases[0].summon.summonDate',
            label: 'legal.create.summonDate',
            type: 'datePicker',
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'year',
            jsonPath: 'cases[0].summon.year',
            label: 'legal.create.year',
            type: 'singleValueList',
            isCurrentYear: true,
            isRequired: true,
            isDisabled: false,
            url: '/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=year|$..code|$..name',
            patternErrorMsg: '',
          },
          {
            name: 'side',
            jsonPath: 'cases[0].summon.side.code',
            label: 'legal.create.side',
            type: 'singleValueList',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
            url: '/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=side|$..code|$..name',
            depedants: [
              {
                jsonPath: 'cases[0].summon.caseType.code',
                type: 'dropDown',
                pattern:
                  "/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=caseType&filter=%5B%3F%28%40.sideCode%3D%3D'{cases[0].summon.side.code}'%29%5D|$..code|$..name",
              },
            ],
          },
          {
            name: 'caseType',
            jsonPath: 'cases[0].summon.caseType.code',
            label: 'legal.create.caseType',
            type: 'singleValueList',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
            url: '',
          },
          {
            name: 'plantiffName',
            jsonPath: 'cases[0].summon.plantiffName',
            label: 'legal.create.plantiffName',
            type: 'text',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'caseNo',
            jsonPath: 'cases[0].summon.caseNo',
            label: 'legal.create.caseNo',
            type: 'text',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'plantiffAddress',
            jsonPath: 'cases[0].summon.plantiffAddress.addressLine1',
            label: 'legal.create.plantiffAddress',
            type: 'text',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'caseDetails',
            jsonPath: 'cases[0].summon.caseDetails',
            label: 'legal.create.caseDetails',
            type: 'textarea',
            fullWidth: true,
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'defendant',
            jsonPath: 'cases[0].summon.defendant',
            label: 'legal.create.defendant',
            type: 'text',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'departmentName',
            jsonPath: 'cases[0].summon.departmentName.code',
            label: 'legal.create.departmentName',
            type: 'singleValueList',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
            url: '/egov-common-masters/departments/_search?|$..code|$..name',
            depedants: [
              {
                jsonPath: 'cases[0].departmentPerson',
                type: 'dropDown',
                pattern: '/hr-employee/employees/_search?tenantId=default&departmentCode={cases[0].summon.departmentName.code}|$..name|$..name',
              },
            ],
          },
          {
            name: 'courtName',
            jsonPath: 'cases[0].summon.courtName.code',
            label: 'legal.create.courtName',
            type: 'singleValueList',
            isKeyOtherPair: 'type',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
            url: '/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=court|$..code|$..name',
          },
          {
            name: 'hearingTime',
            jsonPath: 'cases[0].summon.hearingTime',
            label: 'legal.create.hearingTime',
            type: 'timePicker',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'hearingDate',
            jsonPath: 'cases[0].summon.hearingDate',
            label: 'legal.create.hearingDate',
            type: 'datePicker',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'ward',
            jsonPath: 'cases[0].summon.ward',
            label: 'legal.create.ward',
            type: 'singleValueList',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
            url: '/egov-location/boundarys/boundariesByBndryTypeNameAndHierarchyTypeName?tenantId=default&boundaryTypeName=Ward&hierarchyTypeName=ADMINISTRATION|$.Boundary.*.id|$.Boundary.*.name',
          },
          {
            name: 'stamp',
            jsonPath: 'cases[0].summon.register.code',
            label: 'legal.create.stamp',
            type: 'singleValueList',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
            url: '/lcms-services/legalcase/register/_search?|$..code|$..register',
          },
          {
            name: 'bench',
            jsonPath: 'cases[0].summon.bench.code',
            label: 'legal.create.bench',
            type: 'singleValueList',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
            url: '/egov-mdms-service/v1/_get?&moduleName=lcms&masterName=bench|$..code|$..name',
          },
          {
            name: 'sectionApplied',
            jsonPath: 'cases[0].summon.sectionApplied',
            label: 'legal.create.sectionApplied',
            type: 'text',
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'departmentConcernedPerson',
            jsonPath: 'cases[0].departmentPerson',
            label: 'caseRegistration.create.departmentConcernedPerson',
            type: 'singleValueList',
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: '',
            defaultValue: [],
            url: '',
          },
          {
            name: 'caseRegistrationDate',
            jsonPath: 'cases[0].caseRegistrationDate',
            label: 'caseRegistration.create.caseRegistrationDate',
            type: 'datePicker',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
        ],
      },
      {
        name: 'assignAdvocate',
        label: 'legal.create.group.title.assignAdvocate',
        fields: [
          {
            type: 'tableList',
            jsonPath: 'cases[0].advocateDetails',
            tableList: {
              header: [
                {
                  label: 'legal.create.advocateName',
                },
                {
                  label: 'legal.create.advocateAssignDate',
                },
                {
                  label: 'legal.create.advocateStatus',
                },
              ],
              values: [
                {
                  name: 'advocateName',
                  isKeyOtherPair: 'agencyName',
                  pattern: '',
                  type: 'singleValueList',
                  jsonPath: 'cases[0].advocateDetails[0].advocate.code',
                  isRequired: true,
                  isDisabled: false,
                  url: '/lcms-services/legalcase/advocate/_search?&status=active|$..code|$..name',
                  depedants: [
                    {
                      jsonPath: 'cases[0].advocateDetails[0].advocatestaus',
                      type: 'autoFill',
                      //  pattern:
                      //   "/lcms-services/legalcase/advocate/_search?code={cases[0].advocateDetails[0].advocate.code}|$..status|$..status",
                      pattern:
                        '/lcms-services/legalcase/advocate/_search?tenantId=default&code={cases[0].advocateDetails[0].advocate.code}|$..status|$..status',
                      autoFillFields: {
                        'cases[0].advocateDetails[0].advocatestaus': 'advocates[0].status',
                      },
                    },
                  ],
                },
                {
                  name: 'advocateAssignDate',
                  pattern: '',
                  type: 'datePicker',
                  jsonPath: 'cases[0].advocateDetails[0].assignedDate',
                  isRequired: true,
                  isDisabled: false,
                },
                {
                  name: 'advocatestaus',
                  pattern: '',
                  type: 'text',
                  jsonPath: 'cases[0].advocateDetails[0].advocatestaus',
                  isRequired: false,
                  isDisabled: true,
                },
              ],
            },
          },
        ],
      },
      {
        name: 'UploadDocument',
        label: 'legal.create.group.title.UploadDocument',
        fields: [
          {
            name: 'UploadDocument',
            jsonPath: 'cases[0].summon.documents',
            label: 'legal.create.sectionApplied',
            type: 'fileTable',
            isRequired: false,
            isDisabled: false,
            patternErrMsg: '',
            fileList: {
              name: 'documentName',
              id: 'fileStoreId',
            },
            fileCount: 3,
          },
        ],
      },
    ],
    url: '/lcms-services/legalcase/case/_dataentry',
    tenantIdRequired: true,
  },
};
export default dat;
