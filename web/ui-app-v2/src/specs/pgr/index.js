import transformers from "./transfomers";

const specs = {
  createUrl: "/post",
  searchUrl: "",
  transformers: transformers,
  groups: [
    {
      label: "Group One",
      fields: [
        {
          label: "First Name",
          type: "text",
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
          target: "countries",
          dataSource: {
            url: "http://somedatasource.com/api/...",
            request:{},
            response: {
              path : "countries",
              config: {
                key: "code",
                value: "name"
              }
            },
          },
          options: ["India", "USA", "AUSTRALIA"],
          dependencies: [
            {
              target: "cities",
              type: "API_CALL",
              dataSource: {
                url: "http://somedatasource.com/api/...",
                request:{},
                response:  {
                  path : "cities",
                  config: {
                    key: "code",
                    value: "name"
                  }
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
          label: "Cities",
          type: "dropdown",
          target: "cities",
        },
        {
          label: "Can code?",
          type: "checkbox",
          target: "canCode",
          width: 4,
          viewAdapter: ""
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
