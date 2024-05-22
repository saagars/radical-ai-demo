import os

from flask import Flask
# from app.models import sqlite_db as db
# from flask_login import LoginManager

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"