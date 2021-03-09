<!doctype html>

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link href="{{ asset('css/app.css') }}" rel="stylesheet">

  <title>Login : {{ env('APP_NAME') }} - Muaz</title>
  <meta name="app-url" content="{{ env('APP_URL') }}" />

  @if( session('access_token') )
  <meta name="token" content="{{ session('access_token') }}" />
  @endif
</head>

<body>

  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">

          <div>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Login
            </h2>
          </div>
          <form class="mt-8 space-y-6" id="form-login" method="POST" action="{{ url('api/login') }}">
            <div class="rounded-md shadow-sm -space-y-px">
              <div>
                <label for="email-address" class="sr-only">Email address</label>
                <input id="email-address" name="email" type="email" autocomplete="email" required
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address">
              </div>

              <div>
                <label for="password" class="sr-only">Password</label>
                <input id="password" name="password" type="password" autocomplete="current-password" required
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password">
              </div>
            </div>

            <div>
              <button type="submit"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                  <!-- Heroicon name: login -->
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </span>
                Login
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  </div>

  <script src="{{ asset('js/app.js') }}"></script>
  <script src="{{ route('custom-js', 'login.js') }}"></script>

</body>

</html>
