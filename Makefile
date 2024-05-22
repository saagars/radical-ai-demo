APP_INTERFACE ?= 127.0.0.1:8087

default: install

install:
	pip install -r requirements.txt --no-cache-dir

clean:
	pip uninstall -r requirements.txt --no-cache-dir

run:
	python -m flask --app flask_app.py run