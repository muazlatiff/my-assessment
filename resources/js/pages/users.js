const _users_list = document.querySelector('#users-list');

const buildPagination = (currentPage, curIndex, last) => {
    if( last <= 8 || curIndex < 2 ) {
        return `<a href="javascript:" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 paging-nav" data-page="${curIndex+1}">
            ${curIndex+1}
        </a>`;
    }
    if( last > 8 && (curIndex === 2 || curIndex === 5) ) {
        return `<span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
            ...
        </span>`;
    }
    if( last > 8 && curIndex === 3 ) {
        let median = Math.floor(last/2);
        return `<a href="javascript:" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 paging-nav" data-page="${curIndex+1}">
            ${median}
        </a>
        <a href="javascript:" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 paging-nav" data-page="${curIndex+1}">
            ${median+1}
        </a>`;
    }
    if( last > 8 && curIndex === 6 ) {
        return `<a href="javascript:" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 paging-nav" data-page="${curIndex+1}">
            ${last-1}
        </a>
        <a href="javascript:" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 paging-nav" data-page="${curIndex+1}">
            ${last}
        </a>`;
    }
    return null;
}

const fetchUser = (currentPage=1, perPage=10) => {
    axios({
        method: 'GET',
        url: `${APP_URL}/api/users`,
        data: {
            page: currentPage,
            perPage: perPage,
        },
      })
        .then(function (response) {
            const last_page = response.data.last_page;
            const iteratePagingNav = last_page <=8 ? last_page : 8;
            Array.from(Array(iteratePagingNav).keys()).reverse().forEach(function(i) {
                _users_list.querySelector('.paging-prev.before-nav').insertAdjacentHTML('afterend', buildPagination(currentPage, i, last_page));
            });
            
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
    
            response.data.data.forEach(function(user) {
                _users_list.querySelector('tbody').innerHTML = 
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
                            <a href="javascript:" class="text-red-600 hover:text-red-900 ml-2" ${!user.me ? `data-delete="${user.id}"` : ''}>
                                ${!user.me ? 'Delete' : ''}
                            </a>
                        </td>
                    </tr>`;
            });
    
            preloadElement(_users_list, true);
        });
}

$(document).on('click', '#add-user', function() {
    $('#backdrop-add-user').removeClass('hidden');
    $('#modal-add-user').removeClass('hidden');
});
$(document).on('click', '#modal-close-add-user', function() {
    $('#backdrop-add-user').addClass('hidden');
    $('#modal-add-user').addClass('hidden');
});

$(document).on('click', '#excel-import', function() {
    $('#backdrop-excel-import').removeClass('hidden');
    $('#modal-excel-import').removeClass('hidden');
});
$(document).on('click', '#modal-close-excel-import', function() {
    $('#backdrop-excel-import').addClass('hidden');
    $('#modal-excel-import').addClass('hidden');
});

fetchUser();
