import formHoc from "hocs/form";
import GenericForm from "../GenericForm";

const BasicInformationHOC = formHoc({ formKey: "basicInformation" })(GenericForm);
const PropertyAddressHOC = formHoc({ formKey: "propertyAddress" })(GenericForm);
const PlotInformationHOC = formHoc({ formKey: "plotInformation" })(GenericForm);
const OwnershipTypeHOC = formHoc({ formKey: "ownershipType" })(GenericForm);

export { BasicInformationHOC, PropertyAddressHOC, PlotInformationHOC, OwnershipTypeHOC };
