import transformers from "./transformers"

const specs = {
  createUrl: "/post",
  searchUrl: "/search",
  objectName: "location",
  idJsonPath: "code",
  transformers: transformers,
  groups: [
    {
      label: "Group One",
      fields: [
        {
          label: "First Name",
          type: "text",
          jsonPath: "nested.name",
          disabled: false,
          target: "name",
          width: 4,
          patternErrorMessage: "Please Enter a valid name",
          pattern: "",
          isRequired: true,
          viewAdapter: ""
        },
        {
          width: 4,
          label: "Country",
          type: "dropdown",
          jsonPath: "nested.location.country",
          target: "countries",
          dataSourceConfig: { key: "code", value: "name" },
          dataSource: {
            url: "http://somedatasource.com/api/...",
            request: {},
            response: {
              path: "countries"
            }
          },
          options: ["India", "USA", "AUSTRALIA"],
          dependencies: [
            {
              target: "cities",
              targetType: "dropdown",
              type: "API_CALL",
              dataSource: {
                url: "http://somedatasource.com/api/...",
                request: {},
                response: {
                  path: "cities"
                }
              }
            }
          ]
        },
        {
          width: 4,
          label: "City",
          type: "dropdown",
          jsonPath: "nested.location.city",
          target: "cities",
          dataSourceConfig: { key: "code", value: "name" }
        },
        {
          label: "Can code?",
          type: "checkbox",
          jsonPath: "nested.inner.canCode",
          target: "canCode",
          width: 4,
          viewAdapter: "",
          dependencies: [
            {
              type: "PROPERTY_TOGGLE",
              toggleProperty: "disabled",
              targets: ["name"]
            }
          ]
        },
        {
          label: "Toggle Field",
          target: "toggle-field",
          type: "label",
          hide: true,
          width: 4
        }
      ]
    }
  ],
  search: {
    groups: [
      {
        label: "Complaints Details",
        fields: [
          {
            label: "Complaint Name",
            type: "text",
            target: "name",
            jsonPath: "complaints.name",
            width: 3,
            patternErrorMessage: "Please Enter a valid name",
            pattern: "",
            isRequired: true,
            viewAdapter: "",
          },
          {
            label: "Comments",
            type: "textarea",
            target: "complaintDetails",
            jsonPath: "complaints.details",
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
            jsonPath: "complaints.category.type",
            dataSourceConfig : {
              key: "code",
              value: "name"
            },
            dataSource: {
              url: "http://somedatasource.com/api/...",
              request:{},
              response: {
                path : "complaintCategory",
              },
            },
            options: ["India", "USA", "AUSTRALIA"],
            dependencies: [
              {
                target: "complaintSubCategory",
                targetType: "dropdown",
                type: "API_CALL",
                dataSource: {
                  url: "http://somedatasource.com/api/...",
                  request:{},
                  response:  {
                    path : "complaintSubCategory",
                  },
                }
              },
            ]
          },
          {
            width: 3,
            label: "Complaint Sub Category",
            type: "dropdown",
            target: "complaintSubCategory",
            jsonPath:"complaints.category.subtype",
            dataSourceConfig : {
              key: "code",
              value: "name"
            },
          },

          {
            width: 3,
            label: "Is complaint reopened?",
            type: "checkbox",
            target: "complaintReopened",
            jsonPath:"complaints.reopened",
          },
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