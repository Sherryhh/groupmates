from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
# CORS(app)
app.config ['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:123456@localhost:3306/groupmates'
db = SQLAlchemy(app)
