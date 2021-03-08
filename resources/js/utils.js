window.buildErrorMessage = (errorResponse) => {
    let msg = '';
    if( errorResponse.errors ) {
        for(let errName in errorResponse.errors) {
            msg += `<b class="text-red-600">${errName}</b> : ${errorResponse.errors[errName][0]}<br>`;
        }
    }
    else {
        msg = errorResponse.message ?
            errorResponse.message : 'Something went wrong.<br>';
    }
    return msg;
}
