const validateRequired = (value) => !!value.length;
const validateInteger = (value) => value.match(/^[0-9]+$/);
const validateString = (value) => value.match(/^([A-Za-z0-9\s'" ]{1,255})$/);
const validateFloat = (value) => value.match(/^[0-9]+\.[0-9]+$/);

const handleValidate = (validationType, isRequired, value) => {
  let errorMessage = '';
  if (isRequired === 'required') {
    if (!validateRequired(value)) {
      errorMessage += 'Required.';
    }
  }

  switch (validationType) {
    case 'stringValidation':
      if (!validateString(value)) {
        errorMessage += 'Must be a String';
      }
      break;
    case 'integerValidation':
      if (!validateInteger(value)) {
        errorMessage += 'Must be an Integer';
      }
      break;
    case 'floatValidation':
      if (!validateFloat(value)) {
        errorMessage += 'Must be a Float';
      }
      break;
  }

  return errorMessage;
};

const handleChangeValidate = (event, validationType) => {
  const newValue = event.target.value;
  let errorMessage;
  switch (validationType) {
    case 'stringValidation':
      if (!validateString(newValue)) {
        errorMessage = 'Must be a String';
      } else {
        errorMessage = undefined;
      }
      break;
    case 'integerValidation':
      if (!validateInteger(newValue)) {
        errorMessage = 'Must be an Integer';
      } else {
        errorMessage = undefined;
      }
      break;
    case 'floatValidation':
      if (!validateFloat(newValue)) {
        errorMessage = 'Must be a Float Value';
      } else {
        errorMessage = undefined;
      }
      break;
  }
  return errorMessage;
};

export {
  handleValidate,
  validateRequired,
  validateInteger,
  validateString,
  validateFloat,
  handleChangeValidate
};
