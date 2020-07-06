function isCompletedABoolean(completed) {
  return typeof completed === 'boolean';
}

function isValidMonth(month) {
  const validMonths = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', ''];

  return validMonths.includes(month);
}

function isValidYear(year) {
  const yearRegex = /^[12][0-9]{3}$/;

  return year === '' || yearRegex.test(year);
}

function initMonth(month) {
  const errorMessage = 'Invalid month must be an empty string or strings digits 1 through 12';

  if (isValidMonth(month)) {
    return month;
  } else {
    throw new TypeError(errorMessage);
  }
}

function initTitleOrDescription(titleOrDescription) {
  const titleOrDescriptionRegex = /[0-9a-z]/i;
  const trimmedTitleOrDescription = titleOrDescription.trim();
  const errorMessage = 'Title or Description must have at least on alphanumeric character';

  if (titleOrDescriptionRegex.test(trimmedTitleOrDescription)) {
    return trimmedTitleOrDescription;
  } else {
    throw new TypeError(errorMessage);
  }
}

function initYear(year) {
  const errorMessage = 'Invalid year must be an empty string or a valid 4 digit year';

  if (isValidYear(year)) {
    return year;
  } else {
    throw new TypeError(errorMessage);
  }
}
