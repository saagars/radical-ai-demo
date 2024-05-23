APP_INTERFACE ?= 127.0.0.1:8087

default: install-server

install-server:
	pip install -r requirements.txt --no-cache-dir

clean:
	pip uninstall -r requirements.txt --no-cache-dir

run-server:
	python -m flask --app flask_app.py run

install-frontend:
	cd frontend/ && npm i

run-frontend:
	cd frontend/ && npm start