const specs = {
    createUrl: "/post",
    searchUrl: "",
    transformers: '',
    requestObject: "complaints",
    groups: [
      {
        label: "Group One",
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
            viewAdapter: ""
          },
          {
            label: "Complaint Details",
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
        label: "Group Two",
        fields: [
          {
            width: 3,
            label: "Complaint Category",
            type: "dropdown",
            target: "complaintCategory",
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
              {
                target: "",
                type: "VISIBILITY_TOGGLE",
                toggleValue: ""
              },
              {
                target: "",
                type: "ENABLE_DISABILITY_TOGGLE",
                toggleValue: ""
              }
            ]
          },
          {
            width: 3,
            label: "Complaint Sub Category",
            type: "dropdown",
            target: "complaintSubCategory",
            dataSourceConfig : {
              key: "code",
              value: "name"
            },
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