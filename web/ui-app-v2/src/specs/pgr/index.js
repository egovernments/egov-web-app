const specs = {
  createUrl: "/post",
  searchUrl: "",
  transformers: "",
  objectName: "complaints",
  idJsonPath: "code",
  groups: [
    {
      label: "Complaints Details",
      fields: [
        {
          label: "Complaint Name",
          type: "text",
          target: "name",
          jsonPath: "name",
          width: 3,
          patternErrorMessage: "Please Enter a valid name",
          pattern: "",
          viewAdapter: "",
          isRequired: true
        },
        {
          label: "Comments",
          type: "textarea",
          target: "complaintDetails",
          jsonPath: "details",
          width: 3,
          patternErrorMessage: "Please Enter a valid name",
          pattern: "",
          isRequired: true,
          viewAdapter: ""
        }
      ]
    },
    {
      label: "Complaint Category",
      fields: [
        {
          width: 3,
          label: "Complaint Type",
          type: "dropdown",
          target: "complaintCategory",
          jsonPath: "category.type",
          dataSourceConfig: {
            key: "code",
            value: "name"
          },
          dataSource: {
            url: "http://somedatasource.com/api/...",
            request: {},
            response: {
              path: "complaintCategory"
            }
          },
          options: ["India", "USA", "AUSTRALIA"],
          dependencies: [
            {
              target: "complaintSubCategory",
              targetType: "dropdown",
              type: "API_CALL",
              dataSource: {
                url: "http://somedatasource.com/api/...",
                request: {},
                response: {
                  path: "complaintSubCategory"
                }
              }
            }
          ]
        },
        {
          width: 3,
          label: "Complaint Sub Category",
          type: "dropdown",
          target: "complaintSubCategory",
          jsonPath: "category.subcategory",
          dataSourceConfig: {
            key: "code",
            value: "name"
          }
        },

        {
          width: 3,
          label: "Is complaint reopened?",
          type: "checkbox",
          target: "complaintReopened",
          jsonPath: "reopened",
          dependencies: [
            {
              type: "PROPERTY_TOGGLE",
              toggleProperty: "disabled",
              targets: []
            }
          ]
        }
      ]
    }
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
