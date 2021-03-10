# My Assessment

#### After fresh Clone
1. Configure ```.env``` for your environment.

2. Install required packages:
```bash
composer install
```

3. Run these in this order:
```bash
php artisan key:generate
php artisan passport:install
php artisan migrate
php artisan db:seed
php artisan serve
```

4. Preview on ```http://localhost:8000```

5. Excel test file is in ```/storage/users.xlsx```

<hr>

## Back-end

Requirements:
1. You are required to do CRUD functions using User Model (Login & Register is not consider as CRUD)
2. The CRUD functions need to be REST API
3. Your API can only be accessed if user is authenticated through Laravel Passport
4. All of your inputs need to be validated. (```php artisan make:request```)
5. You are also required to filter and have pagination when getting all users and when retrieving the data,
only need to show name and email using transformer. (```php artisan make:resource```)
6. You also need to have a function to import excel/csv files to Create, Update and Delete users.
(package: https://github.com/Maatwebsite/Laravel-Excel)
7. The project progress can be tracked using any version-control system (e.g: Upload in GitHub)

Below are the marks allocated for the assessment:
| Assessment | Evaluation |
| --------- | --------- |
| 1. Complete all requirements | 7 |
| 2. Using Request (validation) & Transformer (json) | 1 |
| 3. Can track progress through GitHub | 1 |
| 4. Deliver before due | 1 |

## Front-end

Requirements:
1. You are required to build a web app using GO REST Post Model (https://gorest.co.in/).
2. The web app can do the CRUD functions on Post Model.
3. You are also required to handle the response callback if the response return errors or fail validation. (It
is not a front-end validation, you need to do AJAX handling response)
4. The web app needs to have filters and pagination when getting all posts.
5. The web app must be responsive.
6. Project progress can be tracked using any version-control system (e.g: Upload in GitHub)

Below are the marks allocated for the assessment:
| Assessment | Evaluation |
| --------- | --------- |
| 1. Complete all requirements | 6 |
| 2. Using a front-end framework | 1 |
| 3. Well structured JavaScript  | 1 |
| 4. Well structured CSS  | 1 |
| 5. Deliver before due | 1 |
