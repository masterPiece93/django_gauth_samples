Directory Structure Inspiration
```shell
my_project/
│
├── docker-compose.yml
│
├── nginx/
│   └── default.conf
│
├── django_app/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── manage.py (and other Django files...)
│
└── flask_app/
    ├── Dockerfile
    ├── requirements.txt
    └── app.py (and other Flask files...)
```

Directory Structure
```shell
demo/sample1/
├── client
│   ├── app.py
│   ├── docker
│   ├── requirements.txt
│   ├── static
│   └── templates
├── docker-compose.yml
├── nginx
│   └── default.conf
├── README.md
├── server
│   ├── api
│   ├── db.sqlite3              # Auto Generated
│   ├── docker
│   ├── manage.py
│   ├── requirements.txt
│   └── server
└── venv                        # To be created by You
```

## Pre-requisite

- Docker

## Running the demo

First time Run
```shell
python3 manage.py migrate
```
- it will generate `db.sqlite3` file, which will be included in docker container in consequent runs

Run
```shell
docker compose up -d --build
```

Close
```shell
docker compose down -v
```

Cleanup
```shell
docker system prune --all
```
- run this when you have done playing around


Then open the app at **http://127.0.0.1/** (Flask) and the API at
**http://127.0.0.1/api/ping/** (Django).


## Experiments

1. expiring session in a custom time
    ```shell
    GOOGLE_SESSION_AUTO_REFRESH=False
    GOOGLE_SESSION_MAX_AGE=60*30
    ```
    - expires session in 30 min
2. expiring session if no user activity for 3 min
    ```shell
    GOOGLE_SESSION_AUTO_REFRESH=False
    GOOGLE_SESSION_MAX_AGE=60*30
    GOOGLE_SESSION_IDLE_TIMEOUT=60*3
    ```
    - expires session on in-activity ( any protected api call / `/gauth/session` call ) of 3 min .
    - expires session altogether after 30 min .
3. auto refresh
    ```shell
    GOOGLE_SESSION_AUTO_REFRESH=True
    ```
    - expires session in 7 days
4. auto refresh + manual capping
    ```shell
    GOOGLE_SESSION_AUTO_REFRESH=True
    GOOGLE_SESSION_MAX_AGE=60*30
    GOOGLE_SESSION_IDLE_TIMEOUT=60*3
    ```
    - if `GOOGLE_SESSION_AUTO_REFRESH` is true , neither `GOOGLE_SESSION_MAX_AGE` nor `GOOGLE_SESSION_IDLE_TIMEOUT` stop the session from expiring .



## Troubleshooting

### `http://localhost` redirects to `https://` and fails to load

This stack only serves plain **HTTP** on port 80. If your browser silently
upgrades `http://localhost` to `https://localhost`, the connection will fail
(there is no TLS listener). A tell-tale sign is that the page loads fine in an
**incognito window** but not in your normal profile.

This is a browser-side behavior, not a problem with the containers. It is
usually caused by one of:

- A cached **HSTS** policy for `localhost`. HSTS is keyed by hostname and is
  shared across *every* project you run on `localhost`, so another app you ran
  previously may have set it.
- Chrome's **"Always use secure connections"** (HTTPS-First) setting.
- A previously cached **301 redirect** to HTTPS on `localhost`.

**Fixes:**

- Quick workaround: use **http://127.0.0.1/** instead of `http://localhost/`.
  It is a separate HSTS key and usually bypasses a poisoned `localhost` entry.
- Clear the HSTS entry (Chrome): open `chrome://net-internals/#hsts`, and under
  **"Delete domain security policies"** enter `localhost` and click **Delete**.
- Optionally, in `chrome://settings/security`, turn off
  **"Always use secure connections"**.
- Then hard-reload `http://localhost/`.

### Django static files (admin / DRF browsable API) look unstyled

Under gunicorn, Django does **not** serve static files itself. They are
collected into `STATIC_ROOT` at container startup and served by Nginx from a
shared `static_volume` via the `location /static/` block. If static assets
404 after changing static files, rebuild and recreate the volume:

```shell
docker compose down -v && docker compose up -d --build
```