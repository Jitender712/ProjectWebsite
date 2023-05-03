
// Log Success Message
module.exports.logSuccess = (module, message, data) => {
    console.log(module, ">> ", message, data ? ': ' + data : "");
};

// Log Error Message
module.exports.logError = (module, message, data) => {
    console.error(module, ">> ", message, data ? ': ' + data : "");
};