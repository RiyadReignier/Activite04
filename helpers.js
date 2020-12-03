exports.validateNumber = function(n){
    valid = true;
    if(n == null || !isNaN(n)){
        valid = false;
    }
    return valid;
}