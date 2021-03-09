window.APP_URL = document.querySelector('meta[name="app-url"]').content;

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

window.preloadElement = (_element, toShow=true, loaderID='#loader') => {
    const _loader = document.querySelector(loaderID);
    if( toShow ) {
        _loader.addClass('hidden');
        _element.removeClass('hidden');
    }
    else {
        _element.addClass('hidden');
        _loader.removeClass('hidden');
    }
}

Element.prototype.addClass = function (classToAdd) {
    const classes = this.className.split(' ');
    if (classes.indexOf(classToAdd) === -1) classes.push(classToAdd);
    this.className = classes.join(' ');
}

Element.prototype.removeClass = function (classToRemove) {
    const classes = this.className.split(' ');
    const idx =classes.indexOf(classToRemove);
    if (idx !== -1) {
        classes.splice(idx,1);
    }
    this.className = classes.join(' ');
}
