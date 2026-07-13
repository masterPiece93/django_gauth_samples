FROM python:3.12-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt gunicorn

COPY . .

# Expose the port Flask will run on internally
EXPOSE 5000

# Run gunicorn (assuming your Flask instance is named 'app' inside app.py)
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]