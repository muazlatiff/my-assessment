const formRegister = document.querySelector('#form-register');
formRegister.addEventListener('submit', function(e) {
    e.preventDefault();
    
    axios({
        method: formRegister.method,
        url: formRegister.action,
        data: {
            name: formRegister.querySelector('[name="name"]').value,
            email: formRegister.querySelector('[name="email"]').value,
            password: formRegister.querySelector('[name="password"]').value,
        },
      })
        .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Successfully Registered',
                html: `<p>You can now login.</p>
                    <p class="navigate"><a href="${APP_URL}/login">Go to Login</a></p>`,
            }).then(function() {
                $(formRegister).trigger('reset');
            });
        })
        .catch(function (err) {
            Swal.fire({
                icon: 'error',
                title: 'Register Failed',
                html: buildErrorMessage(err.response.data),
            });
        });
});
