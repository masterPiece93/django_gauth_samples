.PHONY: all runserver venv clean


# Define variables

# Color Codes
RED := \033[0;31m
GREEN := \033[0;32m
YELLOW := \033[0;33m
BLUE := \033[0;34m
BOLD := \033[1m
NC := \033[0m # No Color (resets to default)
# Dev
VENV_DIR := venv
PYTHON := $(VENV_DIR)/bin/python
PIP := $(VENV_DIR)/bin/pip

# QA - code quality
QA_VENV_DIR := venvQA
PYTHONQA := $(QA_VENV_DIR)/bin/python
PIPQA := $(QA_VENV_DIR)/bin/pip

REQUIREMENTS_FILE := requirements/requirements.txt
QA_REQUIREMENTS_FILE := requirements/qa.requirements.txt

all: $(VENV_DIR) migrate runserver

# Target to run the Django development server
migrate:
	@echo "\n| Applying Migrations..."
	$(PYTHON) manage.py migrate

runserver: $(VENV_DIR) list
	@echo "\n| Starting Django development server..."
	$(PYTHON) manage.py runserver localhost:8000

list:
	@echo "\n| Listing installed packages in $(VENV_DIR):"
	@if [ -d "$(VENV_DIR)" ]; then \
		./$(VENV_DIR)/bin/pip list --not-required; \
	else \
		echo "Virtual environment '$(VENV_DIR)' not found. Run 'make venv' first."; \
	fi

# Target to create and set up the virtual environment
$(VENV_DIR):
	@echo "\n| Creating virtual environment..."
	python3 -m venv $(VENV_DIR)
	@echo "\n| Installing/Upgrading pip in virtual environment..."
	$(PIP) install --upgrade pip
	@echo "\n| Installing project requirements..."
	$(PIP) install -r $(REQUIREMENTS_FILE)

$(QA_VENV_DIR):
	@echo "\n$(BOLD)|$(GREEN) Creating QA virtual environment $(BOLD)...$(NC)"
	python3 -m venv $(QA_VENV_DIR)
	@echo "$\n(BOLD)|$(GREEN) Installing/Upgrading pip in virtual environment $(BOLD)...$(NC)"
	$(PIPQA) install --upgrade pip
	@echo "\n$(BOLD)|$(GREEN) Installing QA requirements $(BOLD)...$(NC)"
	$(PIPQA) install -r $(QA_REQUIREMENTS_FILE)

lint-stage-1: $(QA_VENV_DIR)
	@echo -e "$(BLUE)Checking Code Quality with PyLint $(NC)..."
	$(PYTHONQA) -m pylint my_django_project/ --load-plugins pylint_django
lint-stage-2: $(QA_VENV_DIR)
	@echo "\n$(BOLD)|$(GREEN) Checking Code Quality with Black in ./app and ./my_django_project $(BOLD)...$(NC)"
	$(PYTHONQA) -m black ./app ./my_django_project
	@echo "\n$(BOLD)|$(GREEN) Checking Code Quality with Vulture in ./app and ./my_django_project $(BOLD)...$(NC)"
	$(PYTHONQA) -m vulture ./app ./my_django_project --min-confidence 100 
	@echo "\n$(BOLD)|$(GREEN) Checking Code Quality with Ruff in ./app $(BOLD)...$(NC)"
	$(PYTHONQA) -m ruff check ./app
typecheck: $(QA_VENV_DIR)
	$(PYTHONQA) -m mypy ./app ./my_django_project

# Target to clean up the virtual environment and database
clean:
	@echo "Cleaning up virtual environment and database..."
	rm -rf $(VENV_DIR) $(QA_VENV_DIR) db.sqlite3
