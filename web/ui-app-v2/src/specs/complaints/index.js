const specs = {
    createUrl: "/post",
    searchUrl: "",
    transformers: '',
    groups: [
      {
        label: "Group One",
        fields: [
          {
            label: "Complaint Name",
            type: "text",
            target: "name",
            width: 4,
            patternErrorMessage: "Please Enter a valid name",
            pattern: "",
            isRequired: true,
            viewAdapter: ""
          },
          {
            label: "Complaint Details",
            type: "textarea",
            target: "complaintDetails",
            width: 4,
            patternErrorMessage: "Please Enter a valid name",
            pattern: "",
            isRequired: true,
            viewAdapter: ""
          },
          {
            width: 4,
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
            width: 4,
            label: "complaintSubCategory",
            type: "dropdown",
            target: "cities",
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