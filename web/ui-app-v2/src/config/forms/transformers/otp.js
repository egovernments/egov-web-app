import { prepareFormData } from "utils/commons";

const viewModelToBusinessModelTransformer = (form, state) => {
  const { previousRoute } = state.app;
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
  } else if (previousRoute.endsWith("login")) {
    fields = state.form["login"].fields;
    fields = {
      password: {
        jsonPath: "login.password",
        value: otpFields.otp.value,
      },
      username: {
        jsonPath: "login.username",
        value: fields.phone.value,
      },
      // ,
      // scope: {
      //   jsonPath: "login.scope",
      //   value: "read",
      // },
      // grant_type: {
      //   jsonPath: "login.grant_type",
      //   value: "password",
      // },
      // tenantId: {
      //   jsonPath: "login.tenantId",
      //   value: "pb",
      // },
    };
  }
  return prepareFormData({ ...form, fields });
};

export default {
  viewModelToBusinessModelTransformer,
};
