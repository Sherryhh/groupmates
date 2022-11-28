import json
import pytest
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
import pymysql

# import from model has conflict with import routes in the index.py

# import sys
# sys.path.append("..")
# from model.Group import Group
# from model.student import Student
# from model.request import IndividualRequest
from index import app
from flask.testing import FlaskClient

# Use fixture to set Testing Context
# The following are testing context
@pytest.fixture(scope='session')
def application():
    '''
    Create a Flask app context for the tests.
    '''
    application = Flask(__name__)

    application.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:12345678@localhost:3306/groupmates'
    return application


@pytest.fixture(scope='session')
def _db(application):
    '''
    Provide the transactional fixtures with access to the database via a Flask-SQLAlchemy
    database connection.
    '''
    db = SQLAlchemy(application)
    with app.app_context():
        db.create_all()
    return db


@pytest.fixture
def client():
    with app.test_client() as client:
        yield client


# The following are Student API tests for each API endpoint
def test_getUserInfo(client: FlaskClient):
    response = client.get('/api/v1/getUserInfo', query_string={
        'userId': 8
    })
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert data
    assert data['name'] == 'Emma'


def test_editUserInfo(client: FlaskClient):
    response = client.get('/api/v1/editUserInfo', query_string={
        'userId': 1,
        'name': "Anna",
        'email': "anna@g.ucla.edu",
        'year': "Senior",
        'major': "Math",
        'intro': "I am the best student!",
    })
    assert response.status_code == 200
    # assert Student.query.filter_by(id=3).first().name == "Sam"


def test_editProgrammingLanguage(client: FlaskClient):
    response = client.get('/api/v1/editProgrammingLanguage', query_string={
        'userId': 3,
        'first': "Python",
        'second': "Java",
        'third': "C++"
    })
    assert response.status_code == 200


def test_editUserRating(client: FlaskClient):
    response = client.get('/api/v1/editUserRating', query_string={
        'userId': 3,
        'frontendSkillScore': 5,
        'backendSkillScore': 5
    })
    assert response.status_code == 200


def test_editFrameworks(client: FlaskClient):
    response = client.get('/api/v1/editFrameworks', query_string={
        'userId': 3,
        'server': '["Flask"]',
        'client': '["React"]'
    })
    assert response.status_code == 200


def test_getAllGroupInfo(client: FlaskClient):
    response = client.get('/api/v1/getAllGroupInfo', query_string={
        'open': 1
    })
    assert response.status_code == 200


def test_getAllUserInfo(client: FlaskClient):
    response = client.get('/api/v1/getAllUserInfo', query_string={
        'open': 1
    })
    assert response.status_code == 200


def test_getGroupInfo(client: FlaskClient):
    response = client.get('/api/v1/getGroupInfo', query_string={
        'userId': 8
    })
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert data
    assert data['hasGroup'] == False


def test_editGroupInfo(client: FlaskClient):
    response = client.get('/api/v1/editGroupInfo', query_string={
        'groupId': 1,
        'open': 1,
        'name': 'Apple',
        'language': 'Python',
        'skill': 'C++'
    })
    assert response.status_code == 200


def test_editGroupLeader(client: FlaskClient):
    response = client.get('/api/v1/editGroupLeader', query_string={
        'groupId': 1,
        'leader': 'TestGroupRequest'
    })
    assert response.status_code == 200


def test_getRequest(client: FlaskClient):
    response = client.get('/api/v1/getRequest', query_string={
        'userId': 3,
    })
    assert response.status_code == 200


def test_searchByName(client: FlaskClient):
    response = client.get('/api/v1/searchByName', query_string={
        'userId': 1,
        'target': 'An'
    })
    assert response.status_code == 200


def test_sortIndividuals(client: FlaskClient):
    response = client.get('/api/v1/sortIndividuals', query_string={
        'userId': 1,
        'open': 1
    })
    assert response.status_code == 200


def test_sendIndividualRequest(client: FlaskClient):
    response = client.get('/api/v1/sendIndividualRequest', query_string={
        'userId': 1,
        'target': 1
    })
    assert response.status_code == 200


def test_sendGroupRequest(client: FlaskClient):
    response = client.get('/api/v1/sendGroupRequest', query_string={
        'userId': 1,
        'target': 3
    })
    assert response.status_code == 200


def test_handleRequest(client: FlaskClient):
    response = client.get('/api/v1/handleRequest', query_string={
        'userId': 1,
        'requestId': 3,
        'status': 0
    })
    assert response.status_code == 200


def test_checkRequest(client: FlaskClient):
    response = client.get('/api/v1/checkRequest', query_string={
        'senderId': 1
    })
    assert response.status_code == 200


# def test_get_user_info_from_db(app, _db):
#     student = Student.query.filter_by(id=3).first()
#     assert student.name == "Dexter"
#     assert student.major == 'Electrical and Computer Engineering'
#     assert student.frontendSkillScore == 5
#     assert student.backendSkillScore == 5
#     assert student.intro == 'I want to die! Who can save me, God!!'


# def test_get_user_info_from_db_2(client):
#     student = Student.query.filter_by(id=4).first()
#     assert student.name == "Sam"
#     assert student.major == 'CS'
#     assert student.email == 'sam@g.ucla.edu'
#     assert student.year == 'Senior'
#     assert student.intro == 'I am the best student!'
#     assert student.frontendSkillScore == 5
#     assert student.backendSkillScore == 4
#     assert student.server == 'Flask'
#     assert student.client == 'React'
#     assert student.first == 'C'
#     assert student.second == 'C++'
#     assert student.third == 'Java'


# def test_option_on_multiple_rules(app, client):
#     @app.route("/api/v1/getUserInfo", methods=["GET", "POST"])
#     def func():
#         return "Hello World"

#     @app.route("/api/v1/getUserInfo", methods=["PUT"])
#     def func2():
#         return "Aha!"

#     rv = client.open("/api/v1/getUserInfo", method="OPTIONS")
#     assert sorted(rv.allow) == ["GET", "HEAD", "OPTIONS", "POST", "PUT"]
