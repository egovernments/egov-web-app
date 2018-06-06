import formSubmit from "./formSubmit";
import validation from "./validation";
import formHooks from "./formHooks.js";
import initField from "./initField.js";
import translateFieldText from "./translateFieldText";
import initForm from "./initForm";

const composedMiddleware = [initForm, formHooks, initField, formSubmit, translateFieldText, validation];
export default composedMiddleware;
