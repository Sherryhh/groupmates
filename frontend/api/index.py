from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import pymysql
pymysql.install_as_MySQLdb()

app = Flask(__name__)
app.config ['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:123456@localhost:3306/groupmates'
db = SQLAlchemy(app)
