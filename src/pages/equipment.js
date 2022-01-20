import './equipment.css'

import FormValidator from '../js/components/FormValidator.js';

import {
  raschetValidatorConfig,
} from '../js/utils/constants.js';

import {
  renderLoading
} from'../js/utils/utils.js';


const raschetForm = document.forms.formRaschetPopup;
const raschetSubmitButton = raschetForm.querySelector('.raschet-bem__submit-button');

const raschetValidatorForm = new FormValidator(raschetValidatorConfig, raschetForm);
raschetValidatorForm.enableValidation();

