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

  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
</head>

<body>

  <div id="react-container"></div>
  
  <script src="{{ asset('js/app.js') }}"></script>
  <script src="{{ route('custom-js', 'gorest.js') }}"></script>

</body>

</html>
