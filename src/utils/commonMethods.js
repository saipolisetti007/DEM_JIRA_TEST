const validateRequired = (value) => String(value).length;
const validateInteger = (value) => /^-?\d+$/.exec(String(value));
const validateString = (value) => /^[A-Za-z0-9][^\r\n]*$/.exec(String(value));
const validateFloat = (value) => /^\d+(\.\d+)?$/.exec(String(value));

const handleValidate = (validationType, isRequired, value) => {
  let errorMessage = '';
  if (isRequired === 'required') {
    if (!validateRequired(value) || value == null) {
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

const handleChangeValidate = (newValue, validationType) => {
  if (!newValue) {
    return undefined;
  }
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

const parseValues = (values, stringFields) => {
  const parsedValues = {};
  Object.keys(values).forEach((key) => {
    let parsedValue = values[key];
    if (parsedValue === '') {
      parsedValues[key] = null;
    } else if (stringFields.includes(key)) {
      parsedValues[key] = parsedValue.toString();
    } else if (validateInteger(parsedValue)) {
      parsedValues[key] = parseInt(parsedValue);
    } else if (validateFloat(parsedValue)) {
      parsedValues[key] = parseFloat(parsedValue);
    } else {
      parsedValues[key] = parsedValue;
    }
  });
  return parsedValues;
};

export {
  handleValidate,
  validateRequired,
  validateInteger,
  validateString,
  validateFloat,
  handleChangeValidate,
  parseValues
};
