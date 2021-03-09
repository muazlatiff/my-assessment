/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*************************************!*\
  !*** ./resources/js/pages/users.js ***!
  \*************************************/
var _users_list = document.querySelector('#users-list');

var buildPagination = function buildPagination(currentPage, curIndex, last) {
  if (last <= 8 || curIndex < 2) {
    return "<a href=\"javascript:\" class=\"relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 paging-nav\" data-page=\"".concat(curIndex + 1, "\">\n            ").concat(curIndex + 1, "\n        </a>");
  }

  if (last > 8 && (curIndex === 2 || curIndex === 5)) {
    return "<span class=\"relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700\">\n            ...\n        </span>";
  }

  if (last > 8 && curIndex === 3) {
    var median = Math.floor(last / 2);
    return "<a href=\"javascript:\" class=\"relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 paging-nav\" data-page=\"".concat(curIndex + 1, "\">\n            ").concat(median, "\n        </a>\n        <a href=\"javascript:\" class=\"relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 paging-nav\" data-page=\"").concat(curIndex + 1, "\">\n            ").concat(median + 1, "\n        </a>");
  }

  if (last > 8 && curIndex === 6) {
    return "<a href=\"javascript:\" class=\"relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 paging-nav\" data-page=\"".concat(curIndex + 1, "\">\n            ").concat(last - 1, "\n        </a>\n        <a href=\"javascript:\" class=\"relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 paging-nav\" data-page=\"").concat(curIndex + 1, "\">\n            ").concat(last, "\n        </a>");
  }

  return null;
};

var fetchUser = function fetchUser() {
  var currentPage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var perPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  axios({
    method: 'GET',
    url: "".concat(APP_URL, "/api/users"),
    data: {
      page: currentPage,
      perPage: perPage
    }
  }).then(function (response) {
    var last_page = response.data.last_page;
    var iteratePagingNav = last_page <= 8 ? last_page : 8;
    Array.from(Array(iteratePagingNav).keys()).reverse().forEach(function (i) {
      _users_list.querySelector('.paging-prev.before-nav').insertAdjacentHTML('afterend', buildPagination(currentPage, i, last_page));
    });
    $(_users_list).find('.paging-prev').attr('data-page', response.data.current_page > 1 ? response.data.current_page - 1 : 1);
    $(_users_list).find('.paging-next').attr('data-page', response.data.current_page < response.data.last_page ? response.data.current_page + 1 : response.data.last_page);
    _users_list.querySelector('.paging-from').innerHTML = response.data.from;
    _users_list.querySelector('.paging-to').innerHTML = response.data.to;
    _users_list.querySelector('.paging-total').innerHTML = response.data.total;
    response.data.data.forEach(function (user) {
      _users_list.querySelector('tbody').innerHTML = "<tr>\n                        <td class=\"px-6 py-4 whitespace-nowrap\">\n                            <div class=\"text-sm font-medium text-gray-900\">".concat(user.name, "</div>\n                        </td>\n                        <td class=\"px-6 py-4 whitespace-nowrap\">\n                            <div class=\"text-sm font-medium text-gray-900\">").concat(user.email, "</div>\n                        </td>\n                        <td class=\"px-6 py-4 whitespace-nowrap text-right text-sm font-medium\">\n                            <a href=\"javascript:\" class=\"text-indigo-600 hover:text-indigo-900\" data-edit=\"").concat(user.id, "\">\n                                Edit\n                            </a>\n                            <a href=\"javascript:\" class=\"text-red-600 hover:text-red-900 ml-2\" ").concat(!user.me ? "data-delete=\"".concat(user.id, "\"") : '', ">\n                                ").concat(!user.me ? 'Delete' : '', "\n                            </a>\n                        </td>\n                    </tr>");
    });
    preloadElement(_users_list, true);
  });
};

$(document).on('click', '#add-user', function () {
  $('#backdrop-add-user').removeClass('hidden');
  $('#modal-add-user').removeClass('hidden');
});
$(document).on('click', '#modal-close-add-user', function () {
  $('#backdrop-add-user').addClass('hidden');
  $('#modal-add-user').addClass('hidden');
});
$(document).on('click', '#excel-import', function () {
  $('#backdrop-excel-import').removeClass('hidden');
  $('#modal-excel-import').removeClass('hidden');
});
$(document).on('click', '#modal-close-excel-import', function () {
  $('#backdrop-excel-import').addClass('hidden');
  $('#modal-excel-import').addClass('hidden');
});
fetchUser();
/******/ })()
;