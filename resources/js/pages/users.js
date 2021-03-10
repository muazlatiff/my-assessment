const _users_list = document.querySelector('#users-list');

const buildPagination = (currentPage, curIndex, last) => {
    if( last <= 8 || curIndex < 2 ) {
        return `<a href="javascript:" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 paging-nav" data-page="${curIndex+1}">
            ${curIndex+1}
        </a>`;
    }
    if( last > 8 && (curIndex === 2 || curIndex === 5) ) {
        return `<span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 paging-nav">
            ...
        </span>`;
    }
    if( last > 8 && curIndex === 3 ) {
        let median = Math.floor(last/2);
        return `<a href="javascript:" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 paging-nav" data-page="${curIndex+1}">
            ${median}
        </a>
        <a href="javascript:" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 paging-nav" data-page="${curIndex+1}">
            ${median+1}
        </a>`;
    }
    if( last > 8 && curIndex === 6 ) {
        return `<a href="javascript:" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 paging-nav" data-page="${curIndex+1}">
            ${last-1}
        </a>
        <a href="javascript:" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 paging-nav" data-page="${curIndex+1}">
            ${last}
        </a>`;
    }

    return null;
}

const fetchUser = (currentPage=1, perPage=10) => {
    preloadElement(_users_list, false);

    axios({
        method: 'GET',
        url: `${APP_URL}/api/users?page=${currentPage}&perPage=${perPage}`,
      })
        .then(function (response) {
            $(_users_list).find('.paging-nav').remove();
            const last_page = response.data.last_page;
            const iteratePagingNav = last_page <= 8 ? last_page : 8;
            Array.from(Array(iteratePagingNav).keys()).reverse().forEach(function(i) {
                _users_list.querySelector('.paging-prev.before-nav').insertAdjacentHTML('afterend', buildPagination(currentPage, i, response.data.last_page));
            });
            
            $(_users_list).find(`.paging-nav[data-page="${response.data.current_page}"]`).addClass('bg-blue-100');
            $(_users_list).find('.paging-prev').attr(
                'data-page',
                response.data.current_page > 1 ? response.data.current_page - 1 : 1
            );
            $(_users_list).find('.paging-next').attr(
                'data-page',
                response.data.current_page < response.data.last_page ? response.data.current_page + 1 : response.data.last_page
            );

            _users_list.querySelector('.paging-from').innerHTML = response.data.from;
            _users_list.querySelector('.paging-to').innerHTML = response.data.to;
            _users_list.querySelector('.paging-total').innerHTML = response.data.total;
    
            _users_list.querySelector('tbody').innerHTML = '';
            response.data.data.forEach(function(user) {
                _users_list.querySelector('tbody').innerHTML += 
                    `<tr>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-gray-900">${user.name}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-gray-900">${user.email}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a href="javascript:" class="text-indigo-600 hover:text-indigo-900" data-edit="${user.id}">
                                Edit
                            </a>
                            ${!user.me ? 
                                `<a href="javascript:" class="text-red-600 hover:text-red-900 ml-2" data-delete="${user.id}">
                                    Delete
                                </a>` :
                                '<span class="text-green-900 ml-2">Myself</span>'}
                        </td>
                    </tr>`;
            });
    
            preloadElement(_users_list, true);
        });
}

const showUser = (url, _callback) => {
    axios({
        method: 'GET',
        url: url,
      })
        .then(function (response) {
            $('#form-add-user').find('[name="name"]').val(response.data.name);
            $('#form-add-user').find('[name="email"]').val(response.data.email);
            _callback();
        })
        .catch(function (err) {
            // error handling
        });
};

const deleteUser = (user_id) => {
    preloadElement(_users_list, false);
    axios({
        method: 'DELETE',
        url: `${APP_URL}/api/users/${user_id}`,
        data: {
        },
      })
        .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: `Successfully Delete User`,
            }).then(function() {
                fetchUser();
                preloadElement(_users_list, true);
            });
        })
        .catch(function (err) {
            Swal.fire({
                icon: 'error',
                title: `Delete User Failed`,
                html: buildErrorMessage(err.response.data),
            }).then(function() {
                preloadElement(_users_list, true);
            });
        });
}

const addEditUser = () => {
    preloadElement($('#modal-add-user'), false);
    let _method = $('#form-add-user').attr('method');
    axios({
        method: _method,
        url: $('#form-add-user').attr('action'),
        data: {
            name: $('#form-add-user').find('[name="name"]').val(),
            email: $('#form-add-user').find('[name="email"]').val(),
            password: $('#form-add-user').find('[name="password"]').val(),
        },
      })
        .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: `Successfully ${_method!=='PATCH' ? 'Add' : 'Edit'} User`,
            }).then(function() {
                fetchUser();
                $('#modal-close-add-user').trigger('click');
                preloadElement($('#modal-add-user'), true);
            });
        })
        .catch(function (err) {
            Swal.fire({
                icon: 'error',
                title: `${_method!=='PATCH' ? 'Add' : 'Edit'} User Failed`,
                html: buildErrorMessage(err.response.data),
            }).then(function() {
                preloadElement($('#modal-add-user'), true);
            });
        });
};

const openModalAddEdit = (user_id=0) => {
    if( !user_id ) {
        $('#title-add-user').html('Add User');
        $('#btn-add-user').html('Add');
        $('#form-add-user').attr('method', 'POST');
        $('#form-add-user').attr('action', `${APP_URL}/api/users`);
    }
    else {
        $('#title-add-user').html('Edit User');
        $('#btn-add-user').html('Edit');
        $('#form-add-user').attr('method', 'PATCH');
        $('#form-add-user').attr('action', `${APP_URL}/api/users/${user_id}`);
    }

    $('#backdrop-add-user').removeClass('hidden');
    $('#modal-add-user').removeClass('hidden');
}

const closeModalAddEdit = (user_id=0) => {
    $('#backdrop-add-user').addClass('hidden');
    $('#modal-add-user').addClass('hidden');
}

// modal add user
$(document).on('click', '#add-user', function() {
    openModalAddEdit();
});
// modal edit user
$(document).on('click', '#users-list a[data-edit]', function() {
    let user_id = $(this).attr('data-edit');
    showUser(`${APP_URL}/api/users/${user_id}`, function() {
        openModalAddEdit(user_id);
    });
});
$(document).on('click', '#modal-close-add-user', function() {
    closeModalAddEdit();
    $('#form-add-user').trigger('reset');
});

// modal excel import
$(document).on('click', '#excel-import', function() {
    $('#backdrop-excel-import').removeClass('hidden');
    $('#modal-excel-import').removeClass('hidden');
});
$(document).on('click', '#modal-close-excel-import', function() {
    $('#backdrop-excel-import').addClass('hidden');
    $('#modal-excel-import').addClass('hidden');
});

// submit add user
$(document).on('click', '#btn-add-user', function() {
    $('#submit-add-user').trigger('click');
});
$(document).on('submit', '#form-add-user', function(e) {
    e.preventDefault();
    addEditUser();
});

// submit delete user
$(document).on('click', '#users-list a[data-delete]', function() {
    let user_id = $(this).attr('data-delete');
    deleteUser(user_id);
});

/**
 * EXCEL
 */
let file = null;
const submitExcelImport = () => {
    const formData = new FormData();
    formData.append('action', $('input[name="action"]:checked').val());
    formData.append('excel', file);

    preloadElement($('#modal-excel-import'), false);
    axios.post($('#form-excel-import').attr('action'), formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: `Successfully imported excel with action`,
            }).then(function() {
                fetchUser();
                $('#reset-excel-import').trigger('click');
                $('#modal-close-excel-import').trigger('click');
            });
            preloadElement($('#modal-excel-import'), true);
        })
        .catch(function (err) {
            Swal.fire({
                icon: 'error',
                title: `Import excel with action Failed`,
                html: buildErrorMessage(err.response.data),
            });
            preloadElement($('#modal-excel-import'), true);
        });
};

const onExcelSelected = () => {
    const reader = new FileReader();
    $('#no-excel-import').addClass('hidden');
    reader.onload = function (ev) {
        $('#input-excel-import').removeAttr('required');
        $('#has-excel-import').html(file.name);
        $('#has-excel-import').removeClass('hidden');
        $('#reset-excel-import').removeClass('hidden');
    }
    reader.readAsDataURL(file);
}

// select file for excel import
$('#input-excel-import').on('change', function(e) {
    e.preventDefault();
    file = e.target.files[0];
    onExcelSelected();
});
$('#holder-excel-import')[0].ondragover = function() {
    $(this).addClass('hover'); 
    return false;
};
$('#holder-excel-import')[0].ondrop = function(e) {
    e.preventDefault();
    file = e.dataTransfer.files[0];
    onExcelSelected();
};
$(document).on('click', '#reset-excel-import', function() {
    $('#input-excel-import').attr('required', true);
    $('#form-excel-import').trigger('reset');
    $('#no-excel-import').removeClass('hidden');
    $('#has-excel-import').addClass('hidden');
    $('#reset-excel-import').addClass('hidden');
});

// submit excel import
$(document).on('click', '#btn-excel-import', function() {
    $('#submit-excel-import').trigger('click');
});
$(document).on('submit', '#form-excel-import', function(e) {
    e.preventDefault();
    submitExcelImport();
});

/**
 * NAVIGATE PAGINATION
 */
$(document).on('click', '.paging-prev', function() {
    fetchUser( $(this).attr('data-page') );
});
$(document).on('click', '.paging-next', function() {
    fetchUser( $(this).attr('data-page') );
});
$(document).on('click', '.paging-nav', function() {
    fetchUser( $(this).attr('data-page') );
});

$(document).ready(function() {
    fetchUser();
});
