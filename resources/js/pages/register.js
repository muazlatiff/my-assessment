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
                html: 'You can now login.',
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
