import transformers from "./transformers"

const specs = {
    createUrl: "/post",
    searchUrl: "",
    transformers: transformers,
    objectName: "complaints",
    idJsonPath: "complaints.code",
    groups: [
      {
        label: "Add Stores",
        fields: [
          {
            width: 4,
            target: 'code',
            jsonPath: 'stores[0].code',
            label: 'Store Code',
            pattern: '^[a-zA-Z0-9]+$',
            type: 'text',
            isRequired: true,
            isDisabled: false,
            defaultValue: '',
            maxLength: 50,
            patternErrorMsg: 'Invalid Code', // Invalid PAN NO (max:)
          },
          {
            width: 4,
            target: 'name',
            jsonPath: 'stores[0].name',
            label: 'Store Name',
            pattern: '^[a-zA-Z ]+$',
            type: 'text',
            isRequired: true,
            isDisabled: false,
            defaultValue: '',
            maxLength: 50,
            patternErrorMsg: 'Invalid Name',
          },

          {
            width: 4,
            label: "Department Name",
            type: "dropdown",
            target: "Department",
            jsonPath: "stores[0].department.code",
            dataSourceConfig : {
              key: "code",
              value: "name"
            },
            dataSource: {
              request:{
                url: "/egov-mdms-service/v1/_get?&moduleName=common-masters&masterName=Department",
                searchKey: "",
                path:""
              },
              response: {
                path : "Department",
              },
            },
            options: ["India", "USA", "AUSTRALIA"],
            dependencies: [
              {
                target: "Employee",
                targetType: "dropdown",
                type: "API_CALL",
                dataSource: {
                  request: {
                    url: "http://somedatasource.com/category",
                    searchKey : "categoryType",
                    path: "complaints.category.type"
                  }
                }
              },
            ]
          },

          {
            width: 4,
            target: 'description',
            jsonPath: 'stores[0].description',
            label: 'Store Description',
            pattern: '^[a-zA-Z0-9 ]+$',
            type: 'textarea',
            isRequired: true,
            isDisabled: false,
            defaultValue: '',
            maxLength: 1000,
            patternErrorMsg: 'inventory.create.field.message.description',
          },

          {
            width: 4,
            label: "Office Location",
            type: "dropdown",
            target: "location",
            jsonPath: "stores[0].officeLocation.code",
            dataSourceConfig : {
              key: "code",
              value: "name"
            },
            dataSource: {
              request:{
                url: "/egov-mdms-service/v1/_get?&moduleName=inventory&masterName=Location",
                searchKey: "",
                path:""
              },
              response: {
                path : "Department",
              },
            },
          },

          {
            width: 4,
            target: 'isCentralStore',
            jsonPath: 'stores[0].isCentralStore',
            label: 'Is Central Store?',
            pattern: '',
            type: 'checkbox',
            isRequired: false,
            isDisabled: false,
            defaultValue: '',
            patternErrorMsg: '',
          },

          {
            width: 4,
            target: 'billingAddress',
            jsonPath: 'stores[0].billingAddress',
            label: 'Billing Address',
            pattern: '^[a-zA-Z0-9 ]+$',
            type: 'textarea',
            isRequired: true,
            isDisabled: false,
            defaultValue: '',
            maxLength: 1000,
            patternErrorMsg: 'Invalid Address',
          },
          {
            width:4,
            target: 'deliveryAddress',
            jsonPath: 'stores[0].deliveryAddress',
            label: 'Delivery Address',
            pattern: '^[a-zA-Z0-9 ]+$',
            type: 'textarea',
            isRequired: true,
            isDisabled: false,
            defaultValue: '',
            maxLength: 1000,
            patternErrorMsg: 'Invalid Address',
          },

          {
            width: 4,
            label: "Store Incharge",
            type: "dropdown",
            target: "Employee",
            jsonPath:"stores[0].storeInCharge.code",
            dataSourceConfig : {
              key: "code",
              value: "name"
            },
          },

          {
            width: 4,
            target: 'contactNo1',
            jsonPath: 'stores[0].contactNo1',
            label: 'Contact No 1',
            pattern: '^[0-9]*$',
            type: 'text',
            isRequired: true,
            isDisabled: false,
            defaultValue: '',
            maxLength: 10,
            patternErrorMsg: 'Invalid Phone Number',
          },
          {
            width: 4,
            target: 'contactNo2',
            jsonPath: 'stores[0].contactNo2',
            label: 'Contact No 2',
            pattern: '^[0-9]*$',
            type: 'text',
            isRequired: false,
            isDisabled: false,
            maxLength: 10,
            patternErrorMsg: 'Invalid Phone Number',
          },
          {
            width: 4,
            target: 'email',
            jsonPath: 'stores[0].email',
            label: 'Email',
            pattern: '^$|([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$',
            type: 'text',
            isRequired: true,
            isDisabled: false,
            defaultValue: '',
            maxLength: 30,
            patternErrorMsg: 'Invalid Email Id',
          },
          {
            width: 4,
            target: 'active',
            jsonPath: 'stores[0].active',
            label: 'Active',
            pattern: '',
            type: 'checkbox',
            isRequired: false,
            isDisabled: false,
            defaultValue: true,
            patternErrorMsg: '',
          },
        ]
      },
      
    ],
    search: {
      groups: [
        {
          label: "Search Group One",
          fields: [
            {
              label: "First Name",
              type: "text",
              target: "name",
              width: "",
              viewAdapter: ""
            }
          ]
        }
      ]
    }
  };
  
  export default specs;