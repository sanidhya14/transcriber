#!/bin/bash
#Execute from server root directory

# Create and activate the virtual environment
virtualenv venv
source venv/bin/activate

# Install requirements
pip3 install -r requirements/base.txt

# Run subsequent commands within the same shell session
python manage.py runserver

# Deactivate the virtual environment when done
deactivate
