export const validateRequired = (value) => {
    let error
    if (!value) {
        error = 'Field Required';
    }
    return error
}