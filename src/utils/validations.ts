const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const validateCardNumber = (number: string) => {
    const cardRegex = /^[0-9]{16}$/;
    return cardRegex.test(number.replace(/\s/g, ''));
  };
  
  const validateExpiry = (expiry: string) => {
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    return expiryRegex.test(expiry);
  };
  
  const validateCVC = (cvc: string) => {
    const cvcRegex = /^[0-9]{3,4}$/;
    return cvcRegex.test(cvc);
  };
  
  const validatePostalCode = (code: string) => {
    const postalRegex = /^[0-9]{5,6}$/;
    return postalRegex.test(code);
  };
  

  export { validateEmail, validateCardNumber, validateExpiry, validateCVC, validatePostalCode };