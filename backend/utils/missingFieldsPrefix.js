export const getMissingFieldsPrefix = (fields) => {
  let missingFieldsPrefix = "";
  let count = 0;

  const { email, password, name } = fields;
  if (!email) {
    missingFieldsPrefix += "Email";
    count++;
  }
  if (!name) {
    missingFieldsPrefix += count? ', ': '';
    missingFieldsPrefix += "Name";
    count++;
  }
 
  if (!password) {
    missingFieldsPrefix += count? ', ': '';
    missingFieldsPrefix += "Password";
    count++;
  }
  if(!count) {
    return '';
  }
  missingFieldsPrefix += count > 1? " are" : ' is'
  
  return  missingFieldsPrefix
};