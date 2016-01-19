
var AbstractResponse = {
  success: null
};

var ErrorResponse = Object.create(AbstractResponse);
ErrorResponse.success = false;
ErrorResponse.message = "Error : no details";

var SuccessResponse = Object.create(AbstractResponse);
SuccessResponse.success = true;
SuccessResponse.data = null;