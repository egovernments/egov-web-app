import transformers from "./transfomers";

const specs = {
  createUrl: "",
  searchUrl: "",
  transfomers: transformers,
  groups: [
    {
      label: "Group One",
      fields: [
        {
          label: "First Name",
          type: "text",
          target: "name",
          width: 4,
          viewAdapter: ""
        },
        {
          width: 4,
          label: "Country",
          type: "dropdown",
          target: "countries",
          dataSource: "http://somedatasource.com/api/...",
          options: ["India", "USA", "AUSTRALIA"],
          dependency: [
            {
              target: "",
              type: "API_CALL",
              dataSource: "...some url with selected value"
            },
            {
              target: "",
              type: "VISIBILITY_TOGGLE",
              toggleValue: ""
            },
            {
              target: "",
              type: "INTERACTIVITY_TOGGLE",
              toggleValue: ""
            }
          ]
        },
        {
          width: 4,
          label: "City",
          type: "dropdown",
          target: "cities"
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
