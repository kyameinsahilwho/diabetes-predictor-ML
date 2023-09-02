@echo off

rem Start the frontend application
start cmd /k "cd my-app && npm run dev"

rem Start the backend application
start cmd /k "call .venv\Scripts\activate.bat && cd ddbackend && python manage.py runserver"