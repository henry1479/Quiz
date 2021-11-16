export const createControl =(config,validation) => {
    return {
        ...config,
        validation,
        valid: !validation,
        touched: false,
        value: '',
    }
}


export const validate = (value, validation = null) => {
    if(!validation) {
        return true
    }

    let isValid = true
    if (validation.required) {
        isValid = value.trim() !== '' && isValid
    }

    return isValid
}


export const validateForms = (formControls) => {
    let isValid = true;

   for (let control in formControls) {
       if (formControls.hasOwnProperty(control)) {
           isValid = formControls[control].valid && isValid
       }
   }
    
    return isValid
}