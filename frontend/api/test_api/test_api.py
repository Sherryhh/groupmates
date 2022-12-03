import json
import pytest
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
import pymysql
import sys
sys.path.append("..")
from api import Group
from api import Student
from api import GroupRequest, IndividualRequest
from index import app
from flask.testing import FlaskClient


'''
Use fixture to set Testing Context
The following are testing context
'''
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


# The following are API tests for each API endpoint
def test_getUserInfo(client: FlaskClient):
    response = client.get('/api/v1/getUserInfo', query_string={
        'userId': 8
    })
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert data
    assert data['name'] == 'Emma'


def test_editUserInfo(client: FlaskClient, _db):
    response = client.get('/api/v1/editUserInfo', query_string={
        'userId': 1,
        'name': "Anna",
        'email': "anna@g.ucla.edu",
        'year': "Senior",
        'major': "Math",
        'intro': "I am the best student!",
    })
    assert response.status_code == 200
    student = Student.query.filter_by(id=1).first()
    assert student.name == "Anna"
    assert student.email == "anna@g.ucla.edu"
    assert student.year == "Senior"
    assert student.major == "Math"
    assert student.intro == "I am the best student!"


def test_editProgrammingLanguage(client: FlaskClient):
    response = client.get('/api/v1/editProgrammingLanguage', query_string={
        'userId': 3,
        'first': "Python",
        'second': "Java",
        'third': "C++"
    })
    assert response.status_code == 200
    student = Student.query.filter_by(id=3).first()
    assert student.first == "Python"
    assert student.second == "Java"
    assert student.third == "C++"


def test_editUserRating(client: FlaskClient):
    response = client.get('/api/v1/editUserRating', query_string={
        'userId': 3,
        'frontendSkillScore': 5,
        'backendSkillScore': 5
    })
    assert response.status_code == 200
    student = Student.query.filter_by(id=3).first()
    assert student.frontendSkillScore == 5
    assert student.backendSkillScore == 5


def test_editFrameworks(client: FlaskClient):
    response = client.get('/api/v1/editFrameworks', query_string={
        'userId': 3,
        'server': '["Flask"]',
        'client': '["React"]'
    })
    assert response.status_code == 200
    student = Student.query.filter_by(id=3).first()
    assert student.server == '["Flask"]'
    assert student.client == '["React"]'


def test_getAllGroupInfo(client: FlaskClient):
    response = client.get('/api/v1/getAllGroupInfo', query_string={
        'open': 1
    })
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert data


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
    group = Group.query.filter_by(id=1).first()
    assert group.name == 'Apple'
    assert group.language == 'Python'
    assert group.skill == 'C++'


def test_editGroupLeader(client: FlaskClient):
    response = client.get('/api/v1/editGroupLeader', query_string={
        'groupId': 1,
        'leader': 'TestGroupRequest'
    })
    assert response.status_code == 200
    group = Group.query.filter_by(id=1).first()
    assert group.leader == 'TestGroupRequest'


def test_getRequest(client: FlaskClient):
    response = client.get('/api/v1/getRequest', query_string={
        'userId': 3,
    })
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert data


def test_searchByName(client: FlaskClient):
    response = client.get('/api/v1/searchByName', query_string={
        'userId': 3,
        'target': 'Anna'
    })
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert data
    assert any(d['name'] == 'Anna' for d in data)

    response = client.get('/api/v1/searchByName', query_string={
        'userId': 3,
        'target': 'Lucy'
    })
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert len(data) == 0


def test_sortIndividuals(client: FlaskClient):
    response = client.get('/api/v1/sortIndividuals', query_string={
        'userId': 1,
        'open': 1
    })
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert data


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


def test_changeGroupOpeness(client: FlaskClient):
    response = client.get('/api/v1/changeGroupOpeness', query_string={
        'open': 0,
        'groupId': 1
    })
    assert response.status_code == 200
    group = Group.query.filter_by(id=1).first()
    assert group.open == 0


def test_changeGroupOpeness_back(client: FlaskClient):
    response = client.get('/api/v1/changeGroupOpeness', query_string={
        'open': 1,
        'groupId': 1
    })
    assert response.status_code == 200
    group = Group.query.filter_by(id=1).first()
    assert group.open == 1


'''These test cases are design to test the databases'''
def test_student_table(_db):
    student = Student.query.filter_by(id=3).first()
    assert student.name == "Emily"
    assert student.major == 'Computer Science'
    assert student.frontendSkillScore == 5
    assert student.backendSkillScore == 5
    assert student.intro == 'Hi, this is Emily!'


def test_group_table(_db):
    group = Group.query.filter_by(id=3).first()
    assert group.name == "TestGroup1"
    assert group.leader == "TestUser1"
    assert group.language == "Python"
    assert group.skill == "C++"


def test_group_request_table(_db):
    group_request = GroupRequest.query.filter_by(id=1).first()
    assert group_request.senderId == 4
    assert group_request.receiverId == 5


def test_individual_request_table(_db):
    request = IndividualRequest.query.filter_by(senderId=11).all()
    assert any (r.receiverId == 12 for r in request)


'''This test case is generate to cover the case when a user change the group name'''
def test_changeGroupName(client: FlaskClient):
    response = client.get('/api/v1/editGroupInfo', query_string={
        'groupId': 3,
        'open': 1,
        'name': 'TestGroup2',
        'language': 'Python',
        'skill': 'C++'
    })
    assert response.status_code == 200

    response = client.get('/api/v1/getGroupInfo', query_string={
        'userId': 9
    })
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert data
    assert data['name'] == "TestGroup2"


def test_changeGroupNameBack(client: FlaskClient):
    response = client.get('/api/v1/editGroupInfo', query_string={
        'groupId': 3,
        'open': 1,
        'name': 'TestGroup1',
        'language': 'Python',
        'skill': 'C++'
    })
    assert response.status_code == 200

    response = client.get('/api/v1/getGroupInfo', query_string={
        'userId': 9
    })
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert data
    assert data['name'] == "TestGroup1"


'''This test case is used to cover the case of send a request and check the request'''
def test_SendAndCheckIndividualRequest(client: FlaskClient):
    response = client.get('/api/v1/sendIndividualRequest', query_string={
        'userId': 11,
        'target': 12
    })
    assert response.status_code == 200

    response = client.get('/api/v1/checkRequest', query_string={
        'sender': 11,
    })
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert any(d['receiver'] == 12 for d in data)
    assert any(d['sender'] == 11 for d in data)


'''
This test case is used to cover the entire process for 
sending a group request and accepting a group request
and get updated the group infomation
'''
def test_sendGroupRequest_handleRequest(client: FlaskClient):
    org_count = GroupRequest.query.count()
    response = client.get('/api/v1/sendGroupRequest', query_string={
        'userId': 11,
        'target': 3
    })
    counter = GroupRequest.query.count()
    assert response.status_code == 200
    assert counter - org_count == 1

    group_request = GroupRequest.query.filter_by(id=counter).first()
    assert group_request.senderId == 11
    assert group_request.receiverId == 3
    
    response = client.get('/api/v1/handleRequest', query_string={
        'userId': 9,
        'requestId': counter,
        'status': 1
    })
    # assert response.status_code == 200
    student = Student.query.filter_by(id=11).first()
    assert student.open == 0
    assert student.groupId == 3

    response = client.get('/api/v1/getGroupInfo', query_string={
        'userId': 11
    })
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert data["groupId"] == 3
    



