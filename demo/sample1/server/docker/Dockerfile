FROM python:3.12-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt gunicorn

COPY . .

# Not to be done in production, but for demo purposes we can run migrations at container startup
RUN python3 manage.py migrate

# Expose the port Django will run on internally
EXPOSE 8000

# Collect static files into STATIC_ROOT (a volume shared with Nginx), then
# start gunicorn. Running collectstatic at startup keeps the shared volume in
# sync with the image every time the container boots.
# # django-gauth >= 0.3.1
# CMD ["sh", "-c", "python manage.py collectstatic --noinput && gunicorn --bind 0.0.0.0:8000 server.wsgi:application"]
# # django-gauth <= 0.3.0
CMD ["sh", "-c", "python manage.py collectstatic --noinput && python3 manage.py runserver 0.0.0.0:8000"]

