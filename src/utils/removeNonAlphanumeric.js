/**
 * It removes non alphanumeric chars from input value.
 */
const removeNonAlphanumericChars = value => {
    const alphaNumericChars = value.replace(/[^0-9a-z]/gi, '');
    return alphaNumericChars;
}
export default removeNonAlphanumericChars;