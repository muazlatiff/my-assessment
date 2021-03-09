<!doctype html>

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link href="{{ asset('css/app.css') }}" rel="stylesheet">

  <title>Users List : {{ env('APP_NAME') }} - Muaz</title>
  <meta name="app-url" content="{{ env('APP_URL') }}" />

  @if( session('access_token') )
  <meta name="token" content="{{ session('access_token') }}" />
  @endif
</head>

<body>

  <div class="container m-auto p-8 flex flex-col justify-center">

    <div class="py-5 flex justify-center rounded-lg text-lg" role="group">
      <button id="add-user" class="bg-white text-blue-500 hover:bg-blue-500 hover:text-white border border-r-0 border-blue-500 rounded-l-lg px-4 py-2 mx-0 outline-none focus:shadow-outline">
        Add a User
      </button>
      <button id="excel-import" class="bg-white text-blue-500 hover:bg-blue-500 hover:text-white border border-blue-500  px-4 py-2 mx-0 outline-none focus:shadow-outline">
        Using Excel Import
      </button>
    </div>

    <div class="px-4 pb-5 sm:px-6 flex justify-center">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Users List
      </h3>
    </div>

    <!-- SVG Loader -->
    <div id="loader" class="flex justify-center">
      <svg version="1.1" id="L7" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
        <path fill="#2b2bb9" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3
        c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z">
            <animateTransform 
              attributeName="transform" 
              attributeType="XML" 
              type="rotate"
              dur="2s" 
              from="0 50 50"
              to="360 50 50" 
              repeatCount="indefinite" />
        </path>
        <path fill="#2b2bb9" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7
        c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z">
            <animateTransform 
              attributeName="transform" 
              attributeType="XML" 
              type="rotate"
              dur="1s" 
              from="0 50 50"
              to="-360 50 50" 
              repeatCount="indefinite" />
        </path>
        <path fill="#2b2bb9" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5
        L82,35.7z">
            <animateTransform 
              attributeName="transform" 
              attributeType="XML" 
              type="rotate"
              dur="2s" 
              from="0 50 50"
              to="360 50 50" 
              repeatCount="indefinite" />
        </path>
      </svg>
    </div>

    <!-- This example requires Tailwind CSS v2.0+ -->
    <div id="users-list" class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 hidden">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                  <span class="sr-only">Delete</span>
                </th>
              </tr>
            </thead>

            <tbody class="bg-white divide-y divide-gray-200">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">Jane Cooper</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">jane@cooper</div>
                  </td>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                  <a href="#" class="text-red-600 hover:text-red-900 ml-2">Delete</a>
                </td>
              </tr>
              
            </tbody>
          </table>
        </div>
      </div>

      <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <a href="javascript:" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 paging-prev" data-page="">
            Previous
          </a>
          <a href="javascript:" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 paging-next" data-page="">
            Next
          </a>
        </div>

        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing
              <span class="font-medium paging-from">1</span>
              to
              <span class="font-medium paging-to">10</span>
              of
              <span class="font-medium paging-total">97</span>
              results
            </p>
          </div>

          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <a href="javascript:" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 before-nav paging-prev" data-page="">
                <span class="sr-only">Previous</span>
                <!-- Heroicon name: solid/chevron-left -->
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </a>

              <a href="javascript:" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 paging-next" data-page="">
                <span class="sr-only">Next</span>
                <!-- Heroicon name: solid/chevron-right -->
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>

  </div>

  <!-- This example requires Tailwind CSS v2.0+ -->
  <div id="backdrop-add-user" class="fixed z-10 inset-0 overflow-y-auto hidden">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <div id="modal-add-user" class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full transition ease-out duration-300 hidden"
      role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        <div class="flex justify-between border-double border-4 border-light-blue-500">
          <div id="title-add-user" class="p-3">
            Add a User
          </div>
          <div>
            <button id="modal-close-add-user" type="button" class="p-3 flex flex-col items-center text-gray-400 hover:text-gray-500">
              <svg
                class="w-7 h-7"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <form class="mt-8 space-y-6" id="form-add-user" method="" action="">
            <div class="rounded-md shadow-sm -space-y-px">
              <div>
                <label for="name" class="sr-only">Name</label>
                <input id="name" name="name" type="text"
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Name">
              </div>

              <div>
                <label for="email-address" class="sr-only">Email address</label>
                <input id="email-address" name="email" type="email" autocomplete="email"
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address">
              </div>

              <div>
                <label for="password" class="sr-only">Password</label>
                <input id="password" name="password" type="password" autocomplete="current-password"
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password">
              </div>
            </div>

            <button id="submit-add-user" type="submit" class="p-5 hidden"></button>
          </form>
        </div>

        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button id="btn-add-user" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
            Add
          </button>
        </div>
      </div>
    </div>
  </div>

  <div id="backdrop-excel-import" class="fixed z-10 inset-0 overflow-y-auto hidden">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <div id="modal-excel-import" class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full transition ease-out duration-300 hidden"
      role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        <div class="flex justify-between border-double border-4 border-light-blue-500">
          <div class="p-3">
            Import Excel File
          </div>
          <div>
            <button id="modal-close-excel-import" type="button" class="p-3 flex flex-col items-center text-gray-400 hover:text-gray-500">
              <svg
                class="w-7 h-7"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="flex flex-col align-center text-center ">
            <h3><b><u>IMPORTANT</u></b></h3>
            <p><b>The excel must be in format:</b></p>
            <ul class="pl-5">
              <li><small>- 1st Row is Heading column.</small></li>
              <li>
                <small>- Heading column must contains column name</small>
                <code>name</code>, <code>email</code>, <code>password</code>.
              </li>
              <li>
                <small>- Column name</small> <code>password</code>
                <small>is optional for update & delete.</small>
              </li>
            </ul>
          </div>

          <div class="p-3 flex justify-center">
            <label for="action-add-excel-import" class="p-2 flex items-center cursor-pointer">
              <!-- toggle -->
              <div class="relative">
                <input id="action-add-excel-import" type="radio" class="hidden" name="action" value="store" checked />
                <div class="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                <div class="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0"></div>
              </div>
              <!-- label -->
              <div class="ml-3 text-gray-700 font-medium">Add</div>
            </label>

            <label for="action-update-excel-import" class="p-2 flex items-center cursor-pointer">
              <!-- toggle -->
              <div class="relative">
                <input id="action-update-excel-import" type="radio" class="hidden" name="action" value="update" />
                <div class="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                <div class="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0"></div>
              </div>
              <!-- label -->
              <div class="ml-3 text-gray-700 font-medium">Edit</div>
            </label>

            <label for="action-destroy-excel-import" class="p-2 flex items-center cursor-pointer">
              <!-- toggle -->
              <div class="relative">
                <input id="action-destroy-excel-import" type="radio" class="hidden" name="action" value="destroy" />
                <div class="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                <div class="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0"></div>
              </div>
              <!-- label -->
              <div class="ml-3 text-gray-700 font-medium">Delete</div>
            </label>
          </div>

          <form id="form-excel-import" method="POST" action="{{ url('api/excel_import') }}">
            <button id="reset-excel-import" type="button" class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hidden">
              Again
            </button>
            <div class="shadow sm:rounded-md sm:overflow-hidden">
              <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div>
                  <div id="holder-excel-import" class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div class="space-y-1 text-center">
                      <div id="no-excel-import">
                        <div class="flex text-sm text-gray-600">
                          <label for="input-excel-import" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                            <span>Upload excel file</span>
                            <input id="input-excel-import" name="excel" type="file" class="sr-only" accept=".xlsx,.xls,.csv" required>
                          </label>
                          <p class="pl-1">or drag and drop</p>
                        </div>
                        <p class="text-xs text-gray-500">
                          xls, xlsx & csv
                        </p>
                      </div>
                      <p id="has-excel-import" class="text-xs text-gray-500"></p>
                    </div>
                  </div>
                </div>
              </div>

              <button id="submit-excel-import" type="submit" class="p-5 hidden"></button>
            </div>
          </form>
        </div>

        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button id="btn-excel-import" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
            Proceed
          </button>
        </div>
      </div>
    </div>
  </div>

  <script src="{{ asset('js/app.js') }}"></script>
  <script src="{{ route('custom-js', 'users.js') }}"></script>

</body>

</html>
