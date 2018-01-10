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
                name: 'mbRefNo',
                jsonPath: 'mbRefNo',
                label: 'works.measurementbook.label.mbRefNo',
                type: 'singleValueList',
                isRequired: false,
                isDisabled: false,
                url: '/egov-mdms-service/v1/_get?&moduleName=Works&masterName=TypeOfDocument|$..code|$..name',
                patternErrorMsg: 'works.remarks.error.message.typeOfDocument',
              },
              {
                  name: 'remarksType',
                  jsonPath: 'remarksType',
                  label: 'works.remarks.label.remarksType',
                  type: 'singleValueList',
                  isRequired: false,
                  isDisabled: false,
                  url: '/egov-mdms-service/v1/_get?&moduleName=Works&masterName=RemarksType|$..code|$..name',
                  patternErrorMsg: 'works.remarks.error.message.remarksType',
              },
              {
                  name: 'remarksDescription',
                  jsonPath: 'remarksDescription',
                  label: 'works.remarks.label.remarksDescription',
                  type: 'text',
                  isRequired: false,
                  isDisabled: false,
                  patternErrorMsg: 'works.remarks.error.message.remarksDescription',
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
