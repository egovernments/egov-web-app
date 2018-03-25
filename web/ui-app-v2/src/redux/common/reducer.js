import * as commonTypes from "./actionTypes";

const intialState = {
  objects: {},
};

const commonReducer = (state = intialState, action) => {
  switch (action.type) {
    case commonTypes.ASYNC_PENDING:
      return {
        ...state,
        objects: {
          ...state.objects,
          [action.object]: {
            error: false,
            errorMessage: "",
            loading: true,
          },
        },
      };

    case commonTypes.ASYNC_COMPLETE:
      return {
        ...state,
        objects: {
          ...state.objects,
          [action.object]: {
            error: false,
            errorMessage: "",
            loading: false,
          },
        },
      };

    case commonTypes.ASYNC_ERROR:
      return {
        ...state,
        objects: {
          ...state.objects,
          [action.object]: {
            error: true,
            errorMessage: action.payload,
            loading: false,
          },
        },
      };

    default:
      return state;
  }
};
export default commonReducer;
