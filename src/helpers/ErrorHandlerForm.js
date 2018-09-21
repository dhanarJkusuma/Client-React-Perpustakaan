class ErrorHandlerForm {
    static collectErrorAttributeMessage = (errors) => {
        if(errors === null || typeof errors === 'undefined'){
            return "";
        }
        var msg = "";
        errors.forEach((e, index) => {
            msg += e;
        })
        return msg;
    }
}

export default ErrorHandlerForm