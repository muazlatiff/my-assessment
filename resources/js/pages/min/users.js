/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*************************************!*\
  !*** ./resources/js/pages/users.js ***!
  \*************************************/
var _users_list = document.querySelector('#users-list');

var buildPagination = function buildPagination(currentPage, curIndex, last) {
  if (last <= 8 || curIndex < 2) {
    return "<a href=\"javascript:\" class=\"relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 paging-nav\" data-page=\"".concat(curIndex + 1, "\">\n            ").concat(curIndex + 1, "\n        </a>");
  }

  if (last > 8 && (curIndex === 2 || curIndex === 5)) {
    return "<span class=\"relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 paging-nav\">\n            ...\n        </span>";
  }

  if (last > 8 && curIndex === 3) {
    var median = Math.floor(last / 2);
    return "<a href=\"javascript:\" class=\"relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 paging-nav\" data-page=\"".concat(curIndex + 1, "\">\n            ").concat(median, "\n        </a>\n        <a href=\"javascript:\" class=\"relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 paging-nav\" data-page=\"").concat(curIndex + 1, "\">\n            ").concat(median + 1, "\n        </a>");
  }

  if (last > 8 && curIndex === 6) {
    return "<a href=\"javascript:\" class=\"relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 paging-nav\" data-page=\"".concat(curIndex + 1, "\">\n            ").concat(last - 1, "\n        </a>\n        <a href=\"javascript:\" class=\"relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 paging-nav\" data-page=\"").concat(curIndex + 1, "\">\n            ").concat(last, "\n        </a>");
  }

  return null;
};

var fetchUser = function fetchUser() {
  var currentPage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var perPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  preloadElement(_users_list, false);
  axios({
    method: 'GET',
    url: "".concat(APP_URL, "/api/users?page=").concat(currentPage, "&perPage=").concat(perPage)
  }).then(function (response) {
    $(_users_list).find('.paging-nav').remove();
    var last_page = response.data.last_page;
    var iteratePagingNav = last_page <= 8 ? last_page : 8;
    Array.from(Array(iteratePagingNav).keys()).reverse().forEach(function (i) {
      _users_list.querySelector('.paging-prev.before-nav').insertAdjacentHTML('afterend', buildPagination(currentPage, i, response.data.last_page));
    });
    $(_users_list).find(".paging-nav[data-page=\"".concat(response.data.current_page, "\"]")).addClass('bg-blue-100');
    $(_users_list).find('.paging-prev').attr('data-page', response.data.current_page > 1 ? response.data.current_page - 1 : 1);
    $(_users_list).find('.paging-next').attr('data-page', response.data.current_page < response.data.last_page ? response.data.current_page + 1 : response.data.last_page);
    _users_list.querySelector('.paging-from').innerHTML = response.data.from;
    _users_list.querySelector('.paging-to').innerHTML = response.data.to;
    _users_list.querySelector('.paging-total').innerHTML = response.data.total;
    _users_list.querySelector('tbody').innerHTML = '';
    response.data.data.forEach(function (user) {
      _users_list.querySelector('tbody').innerHTML += "<tr>\n                        <td class=\"px-6 py-4 whitespace-nowrap\">\n                            <div class=\"text-sm font-medium text-gray-900\">".concat(user.name, "</div>\n                        </td>\n                        <td class=\"px-6 py-4 whitespace-nowrap\">\n                            <div class=\"text-sm font-medium text-gray-900\">").concat(user.email, "</div>\n                        </td>\n                        <td class=\"px-6 py-4 whitespace-nowrap text-right text-sm font-medium\">\n                            <a href=\"javascript:\" class=\"text-indigo-600 hover:text-indigo-900\" data-edit=\"").concat(user.id, "\">\n                                Edit\n                            </a>\n                            ").concat(!user.me ? "<a href=\"javascript:\" class=\"text-red-600 hover:text-red-900 ml-2\" data-delete=\"".concat(user.id, "\">\n                                    Delete\n                                </a>") : '<span class="text-green-900 ml-2">Myself</span>', "\n                        </td>\n                    </tr>");
    });
    preloadElement(_users_list, true);
  });
};

var showUser = function showUser(url, _callback) {
  axios({
    method: 'GET',
    url: url
  }).then(function (response) {
    $('#form-add-user').find('[name="name"]').val(response.data.name);
    $('#form-add-user').find('[name="email"]').val(response.data.email);

    _callback();
  })["catch"](function (err) {// error handling
  });
};

var deleteUser = function deleteUser(user_id) {
  preloadElement(_users_list, false);
  axios({
    method: 'DELETE',
    url: "".concat(APP_URL, "/api/users/").concat(user_id),
    data: {}
  }).then(function (response) {
    Swal.fire({
      icon: 'success',
      title: "Successfully Delete User"
    }).then(function () {
      fetchUser();
      preloadElement(_users_list, true);
    });
  })["catch"](function (err) {
    Swal.fire({
      icon: 'error',
      title: "Delete User Failed",
      html: buildErrorMessage(err.response.data)
    }).then(function () {
      preloadElement(_users_list, true);
    });
  });
};

var addEditUser = function addEditUser() {
  preloadElement($('#modal-add-user'), false);

  var _method = $('#form-add-user').attr('method');

  axios({
    method: _method,
    url: $('#form-add-user').attr('action'),
    data: {
      name: $('#form-add-user').find('[name="name"]').val(),
      email: $('#form-add-user').find('[name="email"]').val(),
      password: $('#form-add-user').find('[name="password"]').val()
    }
  }).then(function (response) {
    Swal.fire({
      icon: 'success',
      title: "Successfully ".concat(_method !== 'PATCH' ? 'Add' : 'Edit', " User")
    }).then(function () {
      fetchUser();
      $('#modal-close-add-user').trigger('click');
      preloadElement($('#modal-add-user'), true);
    });
  })["catch"](function (err) {
    Swal.fire({
      icon: 'error',
      title: "".concat(_method !== 'PATCH' ? 'Add' : 'Edit', " User Failed"),
      html: buildErrorMessage(err.response.data)
    }).then(function () {
      preloadElement($('#modal-add-user'), true);
    });
  });
};

var openModalAddEdit = function openModalAddEdit() {
  var user_id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  if (!user_id) {
    $('#title-add-user').html('Add User');
    $('#btn-add-user').html('Add');
    $('#form-add-user').attr('method', 'POST');
    $('#form-add-user').attr('action', "".concat(APP_URL, "/api/users"));
  } else {
    $('#title-add-user').html('Edit User');
    $('#btn-add-user').html('Edit');
    $('#form-add-user').attr('method', 'PATCH');
    $('#form-add-user').attr('action', "".concat(APP_URL, "/api/users/").concat(user_id));
  }

  $('#backdrop-add-user').removeClass('hidden');
  $('#modal-add-user').removeClass('hidden');
};

var closeModalAddEdit = function closeModalAddEdit() {
  var user_id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  $('#backdrop-add-user').addClass('hidden');
  $('#modal-add-user').addClass('hidden');
}; // modal add user


$(document).on('click', '#add-user', function () {
  openModalAddEdit();
}); // modal edit user

$(document).on('click', '#users-list a[data-edit]', function () {
  var user_id = $(this).attr('data-edit');
  showUser("".concat(APP_URL, "/api/users/").concat(user_id), function () {
    openModalAddEdit(user_id);
  });
});
$(document).on('click', '#modal-close-add-user', function () {
  closeModalAddEdit();
  $('#form-add-user').trigger('reset');
}); // modal excel import

$(document).on('click', '#excel-import', function () {
  $('#backdrop-excel-import').removeClass('hidden');
  $('#modal-excel-import').removeClass('hidden');
});
$(document).on('click', '#modal-close-excel-import', function () {
  $('#backdrop-excel-import').addClass('hidden');
  $('#modal-excel-import').addClass('hidden');
}); // submit add user

$(document).on('click', '#btn-add-user', function () {
  $('#submit-add-user').trigger('click');
});
$(document).on('submit', '#form-add-user', function (e) {
  e.preventDefault();
  addEditUser();
}); // submit delete user

$(document).on('click', '#users-list a[data-delete]', function () {
  var user_id = $(this).attr('data-delete');
  deleteUser(user_id);
});
/**
 * EXCEL
 */

var file = null;

var submitExcelImport = function submitExcelImport() {
  var formData = new FormData();
  formData.append('action', $('input[name="action"]:checked').val());
  formData.append('excel', file);
  preloadElement($('#modal-excel-import'), false);
  axios.post($('#form-excel-import').attr('action'), formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(function (response) {
    Swal.fire({
      icon: 'success',
      title: "Successfully imported excel with action"
    }).then(function () {
      fetchUser();
      $('#reset-excel-import').trigger('click');
      $('#modal-close-excel-import').trigger('click');
    });
    preloadElement($('#modal-excel-import'), true);
  })["catch"](function (err) {
    Swal.fire({
      icon: 'error',
      title: "Import excel with action Failed",
      html: buildErrorMessage(err.response.data)
    });
    preloadElement($('#modal-excel-import'), true);
  });
};

var onExcelSelected = function onExcelSelected() {
  var reader = new FileReader();
  $('#no-excel-import').addClass('hidden');

  reader.onload = function (ev) {
    $('#input-excel-import').removeAttr('required');
    $('#has-excel-import').html(file.name);
    $('#has-excel-import').removeClass('hidden');
    $('#reset-excel-import').removeClass('hidden');
  };

  reader.readAsDataURL(file);
}; // select file for excel import


$('#input-excel-import').on('change', function (e) {
  e.preventDefault();
  file = e.target.files[0];
  onExcelSelected();
});

$('#holder-excel-import')[0].ondragover = function () {
  $(this).addClass('hover');
  return false;
};

$('#holder-excel-import')[0].ondrop = function (e) {
  e.preventDefault();
  file = e.dataTransfer.files[0];
  onExcelSelected();
};

$(document).on('click', '#reset-excel-import', function () {
  $('#input-excel-import').attr('required', true);
  $('#form-excel-import').trigger('reset');
  $('#no-excel-import').removeClass('hidden');
  $('#has-excel-import').addClass('hidden');
  $('#reset-excel-import').addClass('hidden');
}); // submit excel import

$(document).on('click', '#btn-excel-import', function () {
  $('#submit-excel-import').trigger('click');
});
$(document).on('submit', '#form-excel-import', function (e) {
  e.preventDefault();
  submitExcelImport();
});
/**
 * NAVIGATE PAGINATION
 */

$(document).on('click', '.paging-prev', function () {
  fetchUser($(this).attr('data-page'));
});
$(document).on('click', '.paging-next', function () {
  fetchUser($(this).attr('data-page'));
});
$(document).on('click', '.paging-nav', function () {
  fetchUser($(this).attr('data-page'));
});
$(document).ready(function () {
  fetchUser();
});
/******/ })()
;