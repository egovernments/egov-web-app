## UI Autogen

App is bootstrapped with Create React App and uses Redux for State Management. https://github.com/reactjs/redux/blob/master/docs/basics/DataFlow.md

### Specs

The Specs can render the screens of the following types

   + Create
   + Update - fields in the create screen + plus search API call.searchApiCall => Filters => FormData => View Render
   + View - Create Screen Fields => View Adapters for each Create Field => Search Api Call => Filters =>  FormData - View Render 
   + Search

An example specs may look like this.
  `specs = {
    createUrl: "",
    viewUrl: "",
    searchUrl: "",
    groups: [
      {
        label: "Group One",
        fields: [
          {
            label: "First Name",
            jsonPath : "",
            type: "text",
            target: "name",
            width: "",
            viewAdapter: ""
          },
          {
            width: "",
            jsonPath : "",
            label: "Country",
            type: "dropdown",
            target: "country",
            sourceUrl: "http://somedatasource.com/api/...",
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
            width: "",
            label: "City",
            type: "dropdown",
            target: "country"
          }
        ]
      }
    ],
    search: {
    searchParams : [{param1 : value1, param2 : value2}]
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
 }`


### Writing New Components

Every Component should be written with its accompanying HoC(Higher Order Component).
All the API calls, logic, event binding, redux subscriptions should happen in the HoC.  
The presentation components should be purely dumb. It should ideally be stateless, without implementing 
any lifecycle methods. 


### Actions

Here are the main actions the framework can do.

SET_SPECS
SET_MODULE_NAME
SET_ACTION_NAME
HANDLE_CHANGE
SET_DROPDOWN_DATA
SET_FORM_DATA
SUBMIT_FORM_DATA
RESET_FORM_DATA
API_CALL
API_WAITING
API_SUCCESS
API_FAILED
SET_ROUTE



## Redux State
`{
  specs: {},
  form: {},
  dropdownData: {},
  moduleAction: "",
  moduleName: "",
  moduleMaster: "",
  loadingStatus: false
}`


### Extending the framework
 The extensibility to the framework is provided by Redux middlewares.
 Example Middleware

`const middleware = store => next => action => {
  const { type } = action;
  switch (type) {
    case "SET_FORM_DATA":
      //do something with the middleware
      break;
    default:
      break;
  }
  next(action);
}`

### Performance Considerations

+ Bundle Size - Can be reduced be using Code Splitting. Code Splitting can happen at two levels.

    1) Resource Level
        The main bundle is split into module level bundles which loads the resource only when requrired.
        Ensures caching of smaller bundles by the browser.
        Resource Level Code Splitting requires the create-react-app to be ejected. 

    2) Dynamic imports 
        This is Promise based import of files.

+ Minimizing Wasteful Renders
   The lifecycle method componentShouldUpdate hook can be used to prevent unecessary renders or PureComponents can be 


## Proposed Folder Structure

  + src
    + actions - Framework Actions 
    + components - Atomic Level Components such as TextField, TextLabel, SelectField
    + constants
    + containers - The components can be wrapped in a container component which implements the business logic.
    + hocs - Higer Order Components
    + middlewares - A middleware to redux actions
    + reducers 
    + specs - Contains all the UI Autogen Specs 
    + store - redux store
    + styles

  
### Future Roadmap
   The Framework and components will be published as npm packages. 
