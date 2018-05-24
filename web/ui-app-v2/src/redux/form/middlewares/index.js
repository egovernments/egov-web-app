import { compose } from "redux";
import formSubmit from "./formSubmit";
import validation from "./validation";
import translateFieldText from "./translateFieldText";
import initForm from "./initForm";

const composedMiddleware = [initForm, formSubmit, translateFieldText, validation];
export default composedMiddleware;
