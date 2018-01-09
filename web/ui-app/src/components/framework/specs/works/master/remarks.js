var dat = {
    'works.search': {
      numCols: 6,
      useTimestamp: true,
      objectName: 'RemarksRequest',
      url: '/works-masters/v1/remarks/_search',
      groups: [
        {
          name: 'search',
          label: 'works.remarks.search.title',
          fields: [
            {
              name: 'typeOfDocument',
              jsonPath: 'typeOfDocument',
              label: 'works.remarks.label.typeOfDocument',
              type: 'singleValueList',
              isRequired: false,
              isDisabled: false,
              url: '/egov-mdms-service/v1/_get?&moduleName=Works&masterName=TypeOfDocument|$..code|$..code',
              patternErrorMsg: 'works.remarks.error.message.typeOfDocument',
            },
            {
                name: 'remarksType',
                jsonPath: 'remarksType',
                label: 'works.remarks.label.remarksType',
                type: 'singleValueList',
                isRequired: false,
                isDisabled: false,
                url: '/egov-mdms-service/v1/_get?&moduleName=Works&masterName=RemarksType|$..code|$..code',
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
            label: 'works.search.result.code',
          },
          {
            label: 'works.search.result.documenttype',
          },
          {
            label: 'works.search.result.description',
          },
          {
            label: 'works.search.result.type',
          },
        ],
        values: ['code', 'description', 'scheduleCategory.code', 'uom.code'],
        resultIdKey: 'code',
        resultPath: 'remarks',
        rowClickUrlUpdate: '/update/works/remarks/{code}',
        rowClickUrlView: '/view/works/remarks/{code}',
      },
    },
    'works.create': {
      numCols: 12/2,
      useTimestamp: true,
      objectName: 'remarks',
      idJsonPath: 'remarks[0].id',
      injectData: [
        {
          jsonPath: 'remarks[0].remarksDetails[0].tenantId',
          value: localStorage.getItem('tenantId'),
        },
        {
          jsonPath: 'remarks[0].remarksDetails[0].tenantId',
          value: localStorage.getItem('tenantId'),
        },
      ],
      groups: [
        {
          name: 'remarkMasterCreate',
          label: 'works.create.group.title.createRemarkMaster',
          fields: [
            {
                name: 'typeOfDocument',
                jsonPath: 'remarks[0].typeOfDocument',
                label: 'works.remarks.label.typeOfDocument',
                type: 'singleValueList',
                isRequired: true,
                isDisabled: false,
                defaultValue: '',
                maxLength: 100,
                minLength: 1,
                url: '/egov-mdms-service/v1/_get?&moduleName=Works&masterName=TypeOfDocument|$..code|$..code',
                patternErrorMsg: 'works.remarks.error.message.typeOfDocument',
            },
            
            {
                name: 'remarksType',
                jsonPath: 'remarks[0].remarksType',
                label: 'works.remarks.label.remarksType',
                type: 'singleValueList',
                isRequired: true,
                isDisabled: false,
                defaultValue: '',
                maxLength: 100,
                minLength: 1,
                url: '/egov-mdms-service/v1/_get?&moduleName=Works&masterName=RemarksType|$..code|$..code',
                patternErrorMsg: 'works.remarks.error.message.remarksType',
            },
          ],
        },
        {
            name: 'Rate Details',
            label: 'works.rate.details.label.title',
            fields: [
              {
                type: 'tableList',
                jsonPath: 'remarks[0].remarksDetails[0]',
                tableList: {
                  header: [
                    {
                      label: 'works.rate.details.label.remark',
                    },
                    {
                        label: 'works.rate.details.label.remarksDescription',
                    },
                    {
                        label: 'works.rate.details.label.editable',
                    },
                  ],
                  values: [
                    {
                      name: 'remarks',
                      pattern: '',
                      type: 'text',
                      jsonPath: 'remarks[0].remarksDetails[0].remarks',
                      displayJsonPath: 'remarks[0].remarksDetails[0].remarks',
                      isRequired: true,
                      isDisabled: false,
                    },
                    {
                        name: 'remarksDescription',
                        pattern: '',
                        type: 'text',
                        jsonPath: 'remarks[0].remarksDetails[0].remarksDescription',
                        displayJsonPath: 'remarks[0].remarksDetails[0].remarksDescription',
                        isRequired: true,
                        isDisabled: false,
                    },
                    {
                        name: 'editable',
                        pattern: '',
                        type: 'checkbox',
                        jsonPath: 'remarks[0].remarksDetails[0].editable',
                        displayJsonPath: 'remarks[0].remarksDetails[0].editable',
                        isRequired: false,
                        isDisabled: false,
                    },
                  ],
                },
              },
            ],
        },
      ],
      url: '/works-masters/v1/remarks/_create',
      tenantIdRequired: true,
    },
    'works.view': {
      numCols: 12/2,
      useTimestamp: true,
      objectName: 'remarks',
      idJsonPath: 'remarks[0].id',
      injectData: [
        {
          jsonPath: 'remarks[0].remarksDetails[0].tenantId',
          value: localStorage.getItem('tenantId'),
        },
        {
          jsonPath: 'remarks[0].remarksDetails[0].tenantId',
          value: localStorage.getItem('tenantId'),
        },
      ],
      groups: [
        {
          name: 'remarkMasterCreate',
          label: 'works.create.group.title.createRemarkMaster',
          fields: [
            {
                name: 'code',
                jsonPath: 'remarks[0].typeOfDocument',
                label: 'works.remarks.label.typeOfDocument',
                type: 'singleValueList',
                isRequired: true,
                isDisabled: false,
                defaultValue: '',
                maxLength: 100,
                minLength: 1,
                url: '/egov-mdms-service/v1/_get?&moduleName=Works&masterName=TypeOfDocument|$..code|$..code',
                patternErrorMsg: 'works.remarks.error.message.typeOfDocument',
            },
            
            {
                name: 'code',
                jsonPath: 'remarks[0].remarksType',
                label: 'works.remarks.label.remarksType',
                type: 'singleValueList',
                isRequired: true,
                isDisabled: false,
                defaultValue: '',
                maxLength: 100,
                minLength: 1,
                url: '/egov-mdms-service/v1/_get?&moduleName=Works&masterName=RemarksType|$..code|$..code',
                patternErrorMsg: 'works.remarks.error.message.remarksType',
            },
          ],
        },
        {
            name: 'Rate Details',
            label: 'works.rate.details.label.title',
            fields: [
              {
                type: 'tableList',
                jsonPath: 'remarks[0].remarksDetails[0]',
                tableList: {
                  header: [
                    {
                      label: 'works.rate.details.label.remark',
                    },
                    {
                        label: 'works.rate.details.label.remarksDescription',
                    },
                    {
                        label: 'works.rate.details.label.editable',
                    },
                  ],
                  values: [
                    {
                      name: 'remarks',
                      pattern: '',
                      type: 'text',
                      jsonPath: 'remarks[0].remarksDetails[0].remarks',
                      displayJsonPath: 'remarks[0].remarksDetails[0].remarks',
                      isRequired: true,
                      isDisabled: false,
                    },
                    {
                        name: 'remarksDescription',
                        pattern: '',
                        type: 'text',
                        jsonPath: 'remarks[0].remarksDetails[0].remarksDescription',
                        displayJsonPath: 'remarks[0].remarksDetails[0].remarksDescription',
                        isRequired: true,
                        isDisabled: false,
                    },
                    {
                        name: 'editable',
                        pattern: '',
                        type: 'checkbox',
                        jsonPath: 'remarks[0].remarksDetails[0].editable',
                        displayJsonPath: 'remarks[0].remarksDetails[0].editable',
                        isRequired: false,
                        isDisabled: false,
                    },
                  ],
                },
              },
            ],
        },
      ],
      url: '/works-masters/v1/remarks/_search?typeOfDocument={code}',
      tenantIdRequired: true,
    },
    'works.update': {
      numCols: 12/2,
      useTimestamp: true,
      objectName: 'remarks',
      idJsonPath: 'remarks[0].id',
      injectData: [
        {
          jsonPath: 'remarks[0].remarksDetails[0].tenantId',
          value: localStorage.getItem('tenantId'),
        },
        {
          jsonPath: 'remarks[0].remarksDetails[0].tenantId',
          value: localStorage.getItem('tenantId'),
        },
      ],
      groups: [
        {
          name: 'remarkMasterCreate',
          label: 'works.create.group.title.createRemarkMaster',
          fields: [
            {
                name: 'typeOfDocument',
                jsonPath: 'remarks[0].typeOfDocument',
                label: 'works.remarks.label.typeOfDocument',
                type: 'singleValueList',
                isRequired: true,
                isDisabled: false,
                defaultValue: '',
                maxLength: 100,
                minLength: 1,
                url: '/egov-mdms-service/v1/_get?&moduleName=Works&masterName=TypeOfDocument|$..code|$..code',
                patternErrorMsg: 'works.remarks.error.message.typeOfDocument',
            },
            
            {
                name: 'remarksType',
                jsonPath: 'remarks[0].remarksType',
                label: 'works.remarks.label.remarksType',
                type: 'singleValueList',
                isRequired: true,
                isDisabled: false,
                defaultValue: '',
                maxLength: 100,
                minLength: 1,
                url: '/egov-mdms-service/v1/_get?&moduleName=Works&masterName=RemarksType|$..code|$..code',
                patternErrorMsg: 'works.remarks.error.message.remarksType',
            },
          ],
        },
        {
            name: 'Rate Details',
            label: 'works.rate.details.label.title',
            fields: [
              {
                type: 'tableList',
                jsonPath: 'remarks[0].remarksDetails[0]',
                tableList: {
                  header: [
                    {
                      label: 'works.rate.details.label.remark',
                    },
                    {
                        label: 'works.rate.details.label.remarksDescription',
                    },
                    {
                        label: 'works.rate.details.label.editable',
                    },
                  ],
                  values: [
                    {
                      name: 'remarks',
                      pattern: '',
                      type: 'text',
                      jsonPath: 'remarks[0].remarksDetails[0].remarks',
                      displayJsonPath: 'remarks[0].remarksDetails[0].remarks',
                      isRequired: true,
                      isDisabled: false,
                    },
                    {
                        name: 'remarksDescription',
                        pattern: '',
                        type: 'text',
                        jsonPath: 'remarks[0].remarksDetails[0].remarksDescription',
                        displayJsonPath: 'remarks[0].remarksDetails[0].remarksDescription',
                        isRequired: true,
                        isDisabled: false,
                    },
                    {
                        name: 'editable',
                        pattern: '',
                        type: 'checkbox',
                        jsonPath: 'remarks[0].remarksDetails[0].editable',
                        displayJsonPath: 'remarks[0].remarksDetails[0].editable',
                        isRequired: false,
                        isDisabled: false,
                    },
                  ],
                },
              },
            ],
        },
      ],
      url: '/works-masters/v1/remarks/_create',
      tenantIdRequired: true,
    },
  };
  export default dat;
  