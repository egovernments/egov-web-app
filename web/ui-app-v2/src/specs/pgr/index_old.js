import transformers from "./transformers";

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
            },
            {
              type: "VISIBILITY_TOGGLE",
              toggleValue: "",
              affectants: [
                {
                  target: "name",
                  isGroup: true
                }
              ]
            },
            { target: "", type: "ENABLE_DISABILITY_TOGGLE", toggleValue: "" }
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
          viewAdapter: ""
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
