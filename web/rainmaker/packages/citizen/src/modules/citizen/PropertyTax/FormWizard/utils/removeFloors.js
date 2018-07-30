import { removeForm } from "egov-ui-kit/redux/form/actions";
import { setFieldProperty } from "egov-ui-kit/redux/form/actions";

export const removeFormKey = (formKey, field, dispatch, state) => {
  let { form } = state;
  const floorCards =
    form &&
    Object.keys(form).filter((key, index) => {
      if (key.includes("customSelect") || key.includes("floorDetails")) {
        return key;
      }
    });
  if (floorCards.length > 0) {
    if (formKey === "basicInformation") {
      if (window.confirm("Are you sure you want delete the floor details entered?")) {
        dispatch(setFieldProperty("plotDetails", "floorCount", "value", 0));
      }
    }
    if (window.confirm("Are you sure you want delete the floors entered?")) {
      floorCards.forEach((floorFormKey) => {
        floorFormKey && dispatch(removeForm(floorFormKey));
      });
    }
  }
};
