import { prepareFormData } from "../../../utils/commons";

const viewModelToBusinessModelTransformer = (formKey, state) => {
  const { previousRoute } = state.app;
  const form = state.form[formKey];
  const { fields: otpFields } = form;
  let fields;

  if (previousRoute.endsWith("register")) {
    fields = state.form["register"].fields;
    fields = {
      ...otpFields,
      username: {
        jsonPath: "User.username",
        value: fields.phone.value,
      },
      name: {
        jsonPath: "User.name",
        value: fields.name.value,
      },
      tenantId: {
        jsonPath: "User.tenantId",
        value: fields.city.value,
      },
    };
    debugger;
  } else if (previousRoute.endsWith("login")) {
    fields = state.form["login"].fields;
    fields = {
      ...fields,
      username: {
        jsonPath: "username",
        value: fields.phone.value,
      },
      scope: {
        jsonPath: "login.scope",
        value: "read",
      },
      grant_type: {
        jsonPath: "login.grant_type",
        value: "password",
      },
      tenantId: {
        jsonPath: "login.tenantId",
        value: "PB",
      },
    };
  }
  return prepareFormData(fields);
};

export default {
  viewModelToBusinessModelTransformer,
};
