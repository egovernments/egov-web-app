const specs = {
  createUrl: "/inventory-services/stores/_create",
  objectName: "stores",
  idJsonPath: "complaints.code",
  groups: [
    {
      label: "Add Stores",
      fields: [
        {
          width: 4,
          target: "code",
          jsonPath: "stores[0].code",
          label: "Store Code",
          pattern: "^[a-zA-Z0-9]+$",
          type: "text",
          isRequired: true,
          disabled: false,
          defaultValue: "",
          maxLength: 50,
          patternErrorMessage: "Invalid Code"
        },
        {
          width: 4,
          target: "name",
          jsonPath: "stores[0].name",
          label: "Store Name",
          pattern: "^[a-zA-Z ]+$",
          type: "text",
          isRequired: true,
          disabled: false,
          defaultValue: "",
          maxLength: 50,
          patternErrorMessage: "Invalid Name"
        },

        {
          width: 4,
          label: "Department Name",
          type: "dropdown",
          target: "Department",
          jsonPath: "stores[0].department.code",
          dataSourceConfig: {
            key: "$..code",
            value: "$..name"
          },
          dataSource: {
            url:
              "/egov-mdms-service/v1/_get?tenantId=default&moduleName=common-masters&masterName=Department"
          },
          dependencies: [
            {
              target: "Employee",
              targetType: "dropdown",
              type: "API_CALL",
              dataSource: {
                url: "/hr-employee/employees/_search",
                searchKey: "departmentCode"
              }
            }
          ]
        },

        {
          width: 4,
          target: "description",
          jsonPath: "stores[0].description",
          label: "Store Description",
          pattern: "^[a-zA-Z0-9 ]+$",
          type: "textarea",
          isRequired: true,
          disabled: false,
          defaultValue: "",
          maxLength: 1000,
          patternErrorMessage: "Invalid Description"
        },

        {
          width: 4,
          label: "Office Location",
          type: "dropdown",
          target: "location",
          jsonPath: "stores[0].officeLocation.code",
          dataSourceConfig: {
            key: "$..code",
            value: "$..name"
          },
          dataSource: {
            url:
              "/egov-mdms-service/v1/_get?tenantId=default&moduleName=inventory&masterName=Location"
          }
        },

        {
          width: 4,
          target: "isCentralStore",
          jsonPath: "stores[0].isCentralStore",
          label: "Is Central Store?",
          type: "checkbox",
          isRequired: false,
          disabled: false,
          defaultValue: "",
          patternErrorMessage: ""
        },
        {
          width: 4,
          target: "billingAddress",
          jsonPath: "stores[0].billingAddress",
          label: "Billing Address",
          pattern: "^[a-zA-Z0-9 ]+$",
          type: "textarea",
          isRequired: true,
          disabled: false,
          defaultValue: "",
          maxLength: 1000,
          patternErrorMessage: "Invalid Address"
        },
        {
          width: 4,
          target: "deliveryAddress",
          jsonPath: "stores[0].deliveryAddress",
          label: "Delivery Address",
          pattern: "^[a-zA-Z0-9 ]+$",
          type: "textarea",
          isRequired: true,
          disabled: false,
          defaultValue: "",
          maxLength: 1000,
          patternErrorMessage: "Invalid Address"
        },
        {
          width: 4,
          label: "Store Incharge",
          type: "dropdown",
          target: "Employee",
          jsonPath: "stores[0].storeInCharge.code",
          dataSourceConfig: {
            key: "code",
            value: "name"
          }
        },
        {
          width: 4,
          target: "contactNo1",
          jsonPath: "stores[0].contactNo1",
          label: "Contact No 1",
          pattern: "^[0-9]*$",
          type: "text",
          isRequired: true,
          disabled: false,
          defaultValue: "",
          maxLength: 10,
          patternErrorMessage: "Invalid Phone Number"
        },
        {
          width: 4,
          target: "contactNo2",
          jsonPath: "stores[0].contactNo2",
          label: "Contact No 2",
          pattern: "^[0-9]*$",
          type: "text",
          isRequired: false,
          disabled: false,
          maxLength: 10,
          patternErrorMessage: "Invalid Phone Number"
        },
        {
          width: 4,
          target: "email",
          jsonPath: "stores[0].email",
          label: "Email",
          pattern:
            "^$|([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$",
          type: "text",
          isRequired: true,
          disabled: false,
          maxLength: 30,
          patternErrorMessage: "Invalid Email Id"
        },
        {
          width: 4,
          target: "active",
          jsonPath: "stores[0].active",
          label: "Active",
          pattern: "",
          type: "checkbox",
          disabled: false,
          defaultValue: true,
          patternErrorMessage: ""
        }
      ]
    }
  ],
  search: {
    url: "/inventory-services/stores/_search",
    searchKey: "codes"
  }
};

export default specs;
