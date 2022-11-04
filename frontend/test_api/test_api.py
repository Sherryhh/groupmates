import json
import pytest
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import pymysql
import sys
sys.path.append("..")
from api.model import Student, Group

# Use fixture to set Testing Context
# The following are testing context

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


# The following are Student API tests for each API endpoint

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
        'frontendSkillScore': 5,
        'backendSkillScore': 4
    })
    assert response.status_code == 200


def test_editFrameworks(client, route_editFrameworks):
    response = client.get('/api/v1/editFrameworks', json={
        'userId': 3,
        'server': "Flask",
        'client': "React"
    })
    assert response.status_code == 200

def test_getUserInfo(client):
    response = client.get('/api/v1/getUserInfo', json={
        'userId': 4
    })
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert data
    assert data['name'] == 'Sam'


def test_get_user_info_from_db(app, _db):
    student = Student.query.filter_by(id=3).first()
    assert student.name == "Dexter"
    assert student.major == 'Electrical and Computer Engineering'
    assert student.frontendSkillScore == 5
    assert student.backendSkillScore == 5
    assert student.intro == 'I want to die! Who can save me, God!!'


def test_get_user_info_from_db_2(app, _db):
    student = Student.query.filter_by(id=4).first()
    assert student.name == "Sam"
    assert student.major == 'CS'
    assert student.email == 'sam@g.ucla.edu'
    assert student.year == 'Senior'
    assert student.intro == 'I am the best student!'
    assert student.frontendSkillScore == 5
    assert student.backendSkillScore == 4
    assert student.server == 'Flask'
    assert student.client == 'React'
    assert student.first == 'C'
    assert student.second == 'C++'
    assert student.third == 'Java'


def test_option_on_multiple_rules(app, client):
    @app.route("/api/v1/getUserInfo", methods=["GET", "POST"])
    def func():
        return "Hello World"

    @app.route("/api/v1/getUserInfo", methods=["PUT"])
    def func2():
        return "Aha!"

    rv = client.open("/api/v1/getUserInfo", method="OPTIONS")
    assert sorted(rv.allow) == ["GET", "HEAD", "OPTIONS", "POST", "PUT"]


# All following tests are written in advance for unimplemented API endpoints

def test_getAllStudentsInfo(client):
    response = client.get('/api/v1/getAllStudentsInfo')
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert data
    assert '3' in data

def test_getAllIndividualRequests(client):
    response = client.get('/api/v1/getAllIndividualRequests', json={
        'userId': 3
    })
    assert response.status_code == 200
    data = json.loads(response.get_data(as_test=True))
    assert data is not None

def test_sendIndividualRequest(client):
    response = client.post('/api/v1/sendIndividualRequest', json={
        'userId': 3
    })
    assert response.status_code == 200

def test_sendGroupRequest(client):
    response = client.post('/api/v1/sendGroupRequest', json={
        'userId': 3,
        'groupId': 1
    })
    assert response.status_code == 200


# The following are Group API tests for each API endpoint

def test_getGroupInfo(client):
    response = client.get('/api/v1/getGroupInfo', json={
        'groupId': 1
    })
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert data
    assert data['groupId'] == 1

def test_getAllGroupInfo(client):
    response = client.get('/api/v1/getAllGroupInfo')
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert data
    assert data['1']

def test_getAllGroupRequest(client):
    response = client.get('/api/v1/getAllGroupRequest', json={
        'groupId': 1
    })
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert data is not None

def test_getAllMember(client):
    response = client.get('/api/v1/getAllMember', json={
        'groupId': 1
    })
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert data

def test_changeGroupName(client):
    response = client.post('/api/v1/changeGroupName', json={
        'groupId': 1,
        'name': 'BugMakers'
    })
    assert response.status_code == 200

    response = client.get('/api/v1/getGroupInfo', json={
        'groupId': 1
    })
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert data
    assert data['name'] == 'BugMakers'

def test_setMissingSkill(client):
    pass

# The following are IndividualRequest API tests for each API endpoint

def test_acceptRequest(client):
    response = client.post('/api/v1/acceptRequest', json={
        'userId': 3,
        'requestId': 2
    })
    assert response.status_code == 200

def test_declineRequest(client):
    response = client.post('/api/v1/declineRequest', json={
        'userId': 3,
        'requestId': 2
    })
    assert response.status_code == 200

# The following are GroupRequest API tests for each API endpoint
def test_groupAcceptRequest(client):
    pass

def test_groupDeclineRequest(client):
    pass