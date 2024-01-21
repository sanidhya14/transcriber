# Overview

This is the Django hosted backend for the application.

## TODO
- [] Perform VAD filtering before diarization
- [] Manage audio loading & processing only once for each transcription job
- [] Maintain new API for model/dependency management
- [] Add tests for APIs
- [] Update notifications for transcription & diarization statuses (per audio chunk processing [30s for transcription])
- [] Fix for slow diarization (see bug fix required)
- [] Handle multiple media formats (audio & video)

## Project structure: [Remove once setup]

```
my_project/
|-- manage.py # Django management script
|-- my_project/ # Project settings and configuration
| |-- **init**.py
| |-- settings/
| | |-- base.py # Common settings
| | |-- production.py # Production-specific settings
| | |-- ...
| |-- urls.py # Main URL routing
| |-- wsgi.py # WSGI entry point
|-- apps/ # Directory for individual apps
| |-- app1/
| | |-- **init**.py
| | |-- models.py
| | |-- views.py
| | |-- ...
| |-- app2/
| | |-- **init**.py
| | |-- models.py
| | |-- views.py
| | |-- ...
|-- static/ # Static files (CSS, JS, images)
|-- templates/ # HTML templates
|-- media/ # User-uploaded media files
|-- logs/ # Log files
|-- staticfiles/ # Collectstatic output (for serving static files)
|-- requirements/
| |-- base.txt # Common requirements
| |-- production.txt # Production-specific requirements
|-- scripts/ # Deployment and management scripts
|-- Dockerfile # Docker configuration
|-- docker-compose.yml # Docker Compose configuration
|-- README.md # Project documentation
|-- LICENSE # Project license
```

## Run Instructions

### A. Run for development mode

This will keep current session in virtual envionment. Useful for active development.

1. Create and activate the virtual environment

```
conda create --name [env name]
conda activate [env name]
```

2. Install requirements

```
pip3 install -r requirements/base.txt
```

3. Run Server

```
python3 manage.py runserver
```

4. Deactivate virtual env

```
conda deactivate
```

### B. Run for Testing

This will simply initiate the server with pre-defined script.

1. Run

```
./scripts/run_server.sh
```
