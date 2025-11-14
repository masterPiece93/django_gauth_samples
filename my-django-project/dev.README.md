# 

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd my-django-project
   ```

## Setup [ manual ]

1. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

2. Install the required packages:
   ```
   pip install django
   ```

3. Run the migrations:
   ```
   python manage.py migrate
   ```

4. Start the development server:
   ```
   python manage.py runserver localhost:8000
   ```

## Setup [ automatic ] `Prefferd`

1. Run :
    ```
    make runserver
    ```
    - takes care of creating virtual environment
    - takes care of installing requirements
    - takes care of applying necessary migrations
    - takes care of running the server


## Help

**Ubuntu Developers**

Use this command to generate folder structure
```sh
tree -I "venv|*.pyc|__pycache__"
```