import pytest
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import pymysql
from models import Student, Group


@pytest.fixture(scope='session')
def app():
    '''
    Create a Flask app context for the tests.
    '''
    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:12345678@localhost:3306/groupmates'
    return app


@pytest.fixture(scope='session')
def _db(app):
    '''
    Provide the transactional fixtures with access to the database via a Flask-SQLAlchemy
    database connection.
    '''
    db = SQLAlchemy(app=app)
    with app.app_context():
        db.create_all()
    return db


@pytest.fixture
def app_config():
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:12345678@localhost:3306/groupmates'
    db = SQLAlchemy(app)


@pytest.fixture
def client(app):
    return app.test_client()


@pytest.fixture(scope='function')
def route_getUserInfo(app, client):
    @app.route("/api/v1/getUserInfo", methods=["GET"])
    def index():
        return "Hello World"


@pytest.fixture(scope='function')
def route_editUserInfo(app, client):
    @app.route("/api/v1/editUserInfo", methods=["GET"])
    def index1():
        return "Aha!"


@pytest.fixture(scope='function')
def route_editProgrammingLanguage(app, client):
    @app.route("/api/v1/editProgrammingLanguage", methods=["GET"])
    def index2():
        return "Aha!"


@pytest.fixture(scope='function')
def route_editUserRating(app, client):
    @app.route("/api/v1/editUserRating", methods=["GET"])
    def index3():
        return "Aha!"


@pytest.fixture(scope='function')
def route_editFrameworks(app, client):
    @app.route("/api/v1/editFrameworks", methods=["GET"])
    def index4():
        return "Aha!"


def test_editUserInfo(client, route_editUserInfo):
    response = client.get('/api/v1/editUserInfo', json={
        'userId': 3,
        'name': "Sam",
        'email': "sam@g.ucla.edu",
        'year': "Senior",
        'major': "CS",
        'intro': "I am the best student!"
    })
    assert response.status_code == 200


def test_editProgrammingLanguage(client, route_editProgrammingLanguage):
    response = client.get('/api/v1/editProgrammingLanguage', json={
        'userId': 3,
        'first': "C",
        'second': "C++",
        'third': "Java"
    })
    assert response.status_code == 200


def test_editUserRating(client, route_editUserRating):
    response = client.get('/api/v1/editUserRating', json={
        'userId': 3,
        'frontendSkillScore': "5",
        'backendSkillScore': "4"
    })
    assert response.status_code == 200


def test_editUserRating(client, route_editFrameworks):
    response = client.get('/api/v1/editFrameworks', json={
        'userId': 3,
        'server': "x",
        'client': "y"
    })
    assert response.status_code == 200


def test_get_user_info_from_db(app, _db):
    student = Student.query.filter_by(id=3).first()
    assert student.name == "Dexter"
    assert student.major == 'Electrical and Computer Engineering'
    assert student.frontendSkillScore == 5
    assert student.backendSkillScore == 5
    assert student.intro == 'I want to die! Who can save me, God!!'


def test_option_on_multiple_rules(app, client):
    @app.route("/api/v1/getUserInfo", methods=["GET", "POST"])
    def func():
        return "Hello World"

    @app.route("/api/v1/getUserInfo", methods=["PUT"])
    def func2():
        return "Aha!"

    rv = client.open("/api/v1/getUserInfo", method="OPTIONS")
    assert sorted(rv.allow) == ["GET", "HEAD", "OPTIONS", "POST", "PUT"]
