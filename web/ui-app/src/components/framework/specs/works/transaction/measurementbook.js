var dat = {
    'works.search': {
        numCols: 6,
        useTimestamp: true,
        objectName: 'RemarksRequest',
        url: '/works-measurementbook/v1/measurementbooks/_search',
        groups: [
          {
            name: 'search',
            label: 'works.measurementbook.search.title',
            fields: [
                {
                    name: 'mbRefNumber',
                    jsonPath: 'measurementbooks[0].mbRefNo',
                    label: 'works.measurementbook.label.mbRefNumberLike',
                    type: 'autoCompelete',
                    isRequired: false,
                    isDisabled: false,
                    patternErrorMsg: 'works.measurementbook.error.message.mbRefNumberLike',
                    url: "/measurementbooks/_search?mbRefNumberLike=|$.measurementBooks.*.mbRefNo|$.measurementBooks.*.mbRefNo",
                    autoCompleteDependancy: {
                        autoCompleteUrl: "/measurementbooks/_search?mbRefNumberLike=|$.measurementBooks.*.mbRefNo|$.measurementBooks.*.mbRefNo",
                        autoFillFields: {
                        },
                    },
                },
                {
                    name: 'loaNumberLike',
                    jsonPath: 'loaNumberLike',
                    label: 'works.measurementbook.label.loaNumberLike',
                    type: 'autoCompelete',
                    isRequired: false,
                    isDisabled: false,
                    patternErrorMsg: 'works.measurementbook.error.message.loaNumberLike',
                },
                {
                    name: 'fromDate',
                    jsonPath: 'fromDate',
                    label: 'works.measurementbook.label.fromDate',
                    type: 'datePicker',
                    isRequired: true,
                    isDisabled: false,
                    maxLength: 128,
                    minLength: 1,
                    patternErrorMsg: '',
                },
                {
                    name: 'toDate',
                    jsonPath: 'toDate',
                    label: 'works.measurementbook.label.toDate',
                    type: 'datePicker',
                    isRequired: false,
                    isDisabled: false,
                    maxLength: 128,
                    minLength: 1,
                    patternErrorMsg: '',
                },
                {
                    name: 'contractorNameLike',
                    jsonPath: 'contractorNameLike',
                    label: 'works.measurementbook.label.contractorNameLike',
                    type: 'autoCompelete',
                    isRequired: false,
                    isDisabled: false,
                    patternErrorMsg: 'works.measurementbook.error.message.contractorNameLike',
                    url: "swm-services/routes/_search?|$.routes.*.code|$.routes.*.name"
                },
                {
                    name: 'department',
                    jsonPath: 'department',
                    label: 'works.measurementbook.label.department',
                    type: 'multivaluelist',
                    isRequired: false,
                    isDisabled: false,
                    patternErrorMsg: '',
                    url: "swm-services/routes/_search?|$.routes.*.code|$.routes.*.name"
                },
                {
                    name: 'detailedEstimateNumberLike',
                    jsonPath: 'detailedEstimateNumberLike',
                    label: 'works.measurementbook.label.detailedEstimateNumberLike',
                    type: 'autoCompelete',
                    isRequired: false,
                    isDisabled: false,
                    patternErrorMsg: 'works.measurementbook.error.message.detailedEstimateNumberLike',
                    url: "swm-services/routes/_search?|$.routes.*.code|$.routes.*.name"
                },
                {
                    name: 'createdBy',
                    jsonPath: 'createdBy',
                    label: 'works.measurementbook.label.createdBy',
                    type: 'singlevaluelist',
                    isRequired: false,
                    isDisabled: false,
                    patternErrorMsg: '',
                    url: "swm-services/routes/_search?|$.routes.*.code|$.routes.*.name"
                },
                {
                    name: 'statuses',
                    jsonPath: 'statuses',
                    label: 'works.measurementbook.label.statuses',
                    type: 'singlevaluelist',
                    isRequired: false,
                    isDisabled: false,
                    patternErrorMsg: '',
                    url: "swm-services/routes/_search?|$.routes.*.code|$.routes.*.name"
                },
                {
                    name: 'workOrderNumberLike',
                    jsonPath: 'workOrderNumberLike',
                    label: 'works.measurementbook.label.workOrderNumberLike',
                    type: 'autoCompelete',
                    isRequired: false,
                    isDisabled: false,
                    patternErrorMsg: '',
                    url: "swm-services/routes/_search?|$.routes.*.code|$.routes.*.name"
                },
            ],
          },
        ],
        result: {
          header: [
            {
              label: 'works.search.result.documenttype',
            },
            {
              label: 'works.search.result.remarkstype',
            },
            {
              label: 'works.search.result.remarksDescription',
            },
            {
              label: 'works.search.result.editable',
            },
          ],
          values: ['typeOfDocument', 'remarksType', 'remarksDetails[0].remarksDescription', 'remarksDetails[0].editable'],
          resultIdKey: 'id',
          resultPath: 'remarks',
          rowClickUrlUpdate: '/update/works/remarks/{id}',
          rowClickUrlView: '/view/works/remarks/{id}',
        },
    },

    'works.view': {
    },
}
export default dat;
