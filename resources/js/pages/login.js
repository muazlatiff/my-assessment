const formLogin = document.querySelector('#form-login');
formLogin.addEventListener('submit', function(e) {
    e.preventDefault();
    
    axios({
        method: formLogin.method,
        url: formLogin.action,
        data: {
            email: formLogin.querySelector('[name="email"]').value,
            password: formLogin.querySelector('[name="password"]').value,
        },
      })
        .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Successfully Login',
            }).then(function() {
                window.location = `${APP_URL}/login_redirect?token=${response.data.token}`;
            });
        })
        .catch(function (err) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                html: buildErrorMessage(err.response.data),
            });
        });
});
