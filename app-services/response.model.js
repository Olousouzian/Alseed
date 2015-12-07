// Model WebServices Classes

var AbstractResponse = {
  success: null
};

// Child Class : Error
var ErrorResponse = Object.create(AbstractResponse);
ErrorResponse.success = false;
ErrorResponse.message = "Error : no details";

// Child Class : Success
var SuccessResponse = Object.create(AbstractResponse);
SuccessResponse.success = true;
SuccessResponse.data = null;