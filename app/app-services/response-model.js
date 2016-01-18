// Model WebServices Classes
// Always use these classes for all angularJS services

var AbstractResponse = {
  success: null
};

// Child Class : ErrorResponse
var ErrorResponse = Object.create(AbstractResponse);
ErrorResponse.success = false;
ErrorResponse.message = "Error : no details";

// Child Class : SuccessResponse
var SuccessResponse = Object.create(AbstractResponse);
SuccessResponse.success = true;
SuccessResponse.data = null;