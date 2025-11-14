# My Django Project

This is a Django project that demonstrates usage of `django-gauth` in your Django Project .
* For `UI` : It use a server-side rendering of web pages using JavaScript and CSS .
* For `API` : It uses standard django views .

> NOTE : In this Demo , Django wsgi is the server , hosting both `UI` and `API`.\
>        For seperately hosted `UI` ( *via Nginx / Apache / Gunicorn* etc ) on Cliet-Side Frameworks ( like *React/Angular/Vue/NextJs* etc ), you can follow the `UI` codebase ( *views + Js* ) and replicate the same in your system . 

## Necessary
<details>
  <summary><b>Necessary Pre-requisite's</b></summary>
  
  **GCP idp client**

   - please get your GCP web idp client created ( by your DevOps Team )
      - procure CLIENT_ID and CLIENT_SECRET for your idp
      - set these values in a `my-django-project/.env` file in project folder

   - please set the redirect url in your GCP client as following
      ```
      localhost:8000/gauth/login-callback
      ```
      - `/gauth` is the path by which you register `django-gauth` in your project
   
   **PAT**

   - please procure GitHub PAT for `django-gauth`
      - without this the package won't be installed from within requirements
   - after procuring PAT , set it in `requirements/dev.requirements.3.12.txt` file .
      ```
      # django_gauth==1.0.0
      git+https://xavient:<GITHUB_PAT>@github.com/xavient/django-gauth.git@release/v1.0.0#egg=django_gauth
      # <GITHUB_PAT> replace with your value
      ```
</details>

<br>

## Project Structure

```sh
.
├── app
│   ├── admin.py
│   ├── apps.py
│   ├── __init__.py
│   ├── middleware.py
│   ├── migrations
│   │   └── __init__.py
│   ├── models.py
│   ├── static
│   │   ├── css
│   │   │   ├── base
│   │   │   │   └── style.css
│   │   │   └── styles.css
│   │   └── js
│   │       ├── base
│   │       │   └── popup_handling.js
│   │       ├── flash_message.js
│   │       ├── global.js
│   │       ├── user_bio
│   │       │   └── login_scheme_handling.js
│   │       └── user_view
│   │           └── login_scheme_handling.js
│   ├── templates
│   │   ├── base.html
│   │   ├── user_bio.html
│   │   └── user_view.html
│   ├── tests.py
│   └── views.py
├── db.sqlite3
├── dev.README.md
├── Makefile
├── manage.py
├── my_django_project
│   ├── asgi.py
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── README.md
└── requirements
    ├── dev.requirements.3.12.txt
    ├── qa.requirements.txt
    └── requirements.txt
```
* `db.sqlite3` will be created automatically on first project run .
* `.env` file is not shown , as it will be created by you .
* There are 3 UI components :
   * base component : which demonstrates conventional seperate page redirection type login effect
      * `templates/base.html` is containing structure of this component
      * `static/css/base` is containing cosmetics of this component
      * `static/js/base` is containing logic of this component

   * user view component : which demonstrates advanced single page redirection type login effect ( via QPA )
      * `templates/user_view.html` is containing structure of this component
      * `static/js/user_view` is containing logic of this component

   * user bio component : which demonstrates advanced single page redirection type login effect ( via HPA )
      * `templates/user_bio.html` is containing structure of this component
      * `static/js/user_bio` is containing logic of this component

# Installation

1. Download
   - Navigate to [Repo](https://github.com/xavient/django_gauth_quickstarters)
   - spot the green color `code` icon and click on it
   - find `Download ZIP` button at bottom, and click on it
   - you'll have the codebase

2. open the downloaded folder
   ```
   cd my-django-project/ # ubuntu
   ```
3. create `.env`:
   - create a file named : `.env`
      ```
      touch .env # ubuntu
      ```
   - copy everything from `.env.template` in 
      ```
      cp ../.env.template .env # ubuntu
      ```
   - populate the variables in `.env` with values ( as per [prerequisites](#necessary) )
3. Run :
   - for **1st time** :
      ```
      make all
      ```
      - This will take care of elementry django setup tasks like
         - migrations handling
         - creating db.sqlite ( for storing sessions )
         - etc...etc...

   - for **2nd time** & forever onwards :
      ```
      make runserver
      ```

## Usage

- Access the application at `http://localhost:8000/`.
- The application includes server-side rendering of web pages, styled with CSS and enhanced with JavaScript.

## Guide

Please watch the video below , to understand how to use this Demo

## Code WalkThrough

1. overview
2. Understanding Authentication : seperate Tab redirection
3. Understanding Landing Page Customization Config
4. Understanding Authentication : same page redirection via Query Params
5. Understanding Authentication : same page redirection via Headers

---

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.