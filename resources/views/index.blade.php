<!doctype html>

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link href="{{ asset('css/app.css') }}" rel="stylesheet">

  <title>{{ env('APP_NAME') }} - Muaz</title>
  <meta name="app-url" content="{{ env('APP_URL') }}" />

  @if( session('access_token') )
  <meta name="token" content="{{ session('access_token') }}" />
  @endif
</head>

<body>

  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="py-12 bg-white">
    <div class="mb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Back-end : {{ auth()->guard('api')->user() ? 'Authenticated' : '' }}
        </p>
      </div>

      <hr>

      <div class="mt-10">
        <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-1 md:gap-x-8 md:gap-y-10">
          
          @if( !auth()->guard('api')->user() )
          <div class="flex justify-center navigate">
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <!-- Heroicon name: user-add -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
            </div>
            <div class="ml-4 flex items-center">
              <dt class="text-lg leading-6 font-medium text-gray-900">
                <a href="{{ url('register') }}">Register</a>
              </dt>
            </div>
          </div>

          <div class="flex justify-center navigate">
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <!-- Heroicon name: login -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </div>
            </div>
            <div class="ml-4 mr-4 flex items-center">
              <dt class="text-lg leading-6 font-medium text-gray-900">
                <a href="{{ url('login') }}">Login</a>
              </dt>
            </div>
          </div>

          @else
          <div class="flex justify-center navigate">
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <!-- Heroicon name: users -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <div class="ml-4 mr-3 flex items-center">
              <dt class="text-lg leading-6 font-medium text-gray-900">
                <a href="{{ url('users') }}">Users</a>
              </dt>
            </div>
          </div>

          <div class="flex justify-center navigate">
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <!-- Heroicon name: logout -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
            </div>
            <div class="ml-4 flex items-center">
              <dt class="text-lg leading-6 font-medium text-gray-900">
                <a href="{{ url('logout') }}">Logout</a>
              </dt>
            </div>
          </div>
          @endif
          
        </dl>
      </div>
    </div>

    <hr>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Front-end
        </p>
      </div>

      <hr>

      <div class="mt-10">
        <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-1 md:gap-x-8 md:gap-y-10">
          
          <div class="flex justify-center navigate">
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center h-12 w-12 rounded-md bg-white text-white">
                <img src="https://gorest.co.in/favicon.ico" alt="gorest-logo" />
              </div>
            </div>
            <div class="ml-4 mr-2 flex items-center">
              <dt class="text-lg leading-6 font-medium text-gray-900">
                <a href="{{ url('gorest') }}">GOREST</a>
              </dt>
            </div>
          </div>
          
        </dl>
      </div>
    </div>
  </div>


</body>

</html>