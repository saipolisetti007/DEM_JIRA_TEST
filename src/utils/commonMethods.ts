// Validate if the value is required (non-empty)
const validateRequired = (value: any): number => String(value).length;
// Validate if the value is an integer
const validateInteger = (value: any): RegExpExecArray | null => /^-?\d+$/.exec(String(value));
// Validate if the value is a string (alphanumeric and not containing newlines)
const validateString = (value: any): RegExpExecArray | null =>
  /^[A-Za-z0-9][^\r\n]*$/.exec(String(value));
// Validate if the value is a float
const validateFloat = (value: any): RegExpExecArray | null => /^\d+(\.\d+)?$/.exec(String(value));

// Handle validation based on the type and requirement
const handleValidate = (validationType: string, isRequired: string, value: any): string => {
  let errorMessage = '';
  // Check if the value is required and not provided
  if (isRequired === 'required' && (!validateRequired(value) || value == null)) {
    errorMessage += 'Required.';
  }

  // Perform specific validation based on the validation type
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

// Handle change validation based on the new value and validation type
const handleChangeValidate = (newValue: any, validationType: string): string | undefined => {
  if (!newValue) {
    return undefined;
  }
  let errorMessage: string | undefined;
  // Perform specific validation based on the validation type
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

// Parse values based on their types and convert them accordingly
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
