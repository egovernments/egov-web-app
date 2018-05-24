import formSubmit from "./formSubmit";
import validation from "./validation";
import formHooks from "./formHooks.js";
import translateFieldText from "./translateFieldText";
import initForm from "./initForm";

const composedMiddleware = [initForm, formSubmit, translateFieldText, validation, formHooks];
export default composedMiddleware;
