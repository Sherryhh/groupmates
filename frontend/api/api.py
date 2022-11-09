from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from index import app, db
from models import Group
from model.student import Student
import sys

# userInfo = {'name':'Emma', 'email':'emma@g.ucla.edu', 'year':'Freshman', 'major':'Computer Science', 'intro':'123', 'first':'Java', 'second':'Python', 'third':'C++'}

@app.route('/api/v1/getUserInfo', methods=['GET'])
def get_user_info():
    userId  = request.args.get('userId')
    print(userId)
    student = Student.query.filter_by(id=userId).first()
    res = student.getUserInfo()
    return res, 200

@app.route('/api/v1/editUserInfo',methods=['GET'])
def edit_user_info():
    userId  = request.args.get('userId')
    name  = request.args.get('name')
    email = request.args.get('email')
    year = request.args.get('year')
    major = request.args.get('major')
    intro = request.args.get('intro')
    query = Student.query.filter_by(id=userId)
    student = query.first()
    success = student.editUserInfo(query, name, email, year, major, intro)
    if success:
        return {"msg":"Edit successfully!"},200
    else:
        return {"msg":"Unable to update user info."}, 500

@app.route('/api/v1/editProgrammingLanguage',methods=['GET'])
def edit_programming_language():
    userId = request.args.get('userId')
    first  = request.args.get('first')
    second = request.args.get('second')
    third = request.args.get('third')
    query = Student.query.filter_by(id=userId)
    student = query.first()
    success = student.editProgrammingLanguage(query, first, second, third)
    if success:
        return {"msg":"Edit successfully!"},200
    else:
        return {"msg":"Unable to update programming language."}, 500

@app.route('/api/v1/editUserRating',methods=['GET'])
def edit_user_rating():
    userId = request.args.get('userId')
    frontendSkillScore  = request.args.get('frontendSkillScore')
    backendSkillScore = request.args.get('backendSkillScore')
    query = Student.query.filter_by(id=userId)
    student = query.first()
    success = student.editUserRating(query, frontendSkillScore, backendSkillScore)
    if success:
        return {"msg":"Edit successfully!"},200
    else:
        return {"msg":"Unable to update user rating."}, 500


@app.route('/api/v1/editFrameworks',methods=['GET'])
def edit_frameworks():
    userId = request.args.get('userId')
    server  = request.args.getlist('server')
    client = request.args.getlist('client')
    query = Student.query.filter_by(id=userId)
    student = query.first()
    success = student.editFrameworks(query, server, client)
    if success:
        return {"msg":"Edit successfully!"},200
    else:
        return {"msg":"Unable to update user frameworks."}, 500

# @app.route('/api/v1/signin',methods=['GET'])
# def signin():
#     username = request.args.get('username')
#     password = request.args.get('password')
#     try:
#         return {"msg":"Edit successfully!"}, 200
#     except:
#         return {"msg":"Unable to update user rating."}, 500

# @app.route('/insertUserInfo')
# def test():
#     student = Student('Emma','emma@g.ucla.edu','Freshman','Computer Science')
#     with app.app_context():
#         db.session.add(student)
#         db.session.commit()
#
# @app.route('/insert')
# def insert_user_info():
#     print('test')
#     student = Test('test')
#     with app.app_context():
#         db.session.add(student)
#         db.session.commit()

@app.route('/api/v1/getAllGroupInfo', methods=['GET'])
def get_all_group_info():
    isOpen = request.args.get('open')
    groups = Group.query.filter_by(open=isOpen).all()
    res = []
    for group in groups:
        res.append({"key":group.id, "name":group.name, "leader":group.leader, "language":group.language, "skill": group.skill})
    return res, 200

@app.route('/api/v1/getAllUserInfo', methods=['GET'])
def get_all_user_info():
    isOpen = request.args.get('open')
    students = Student.query.filter_by(open=isOpen).all()
    res = []
    for student in students:
        res.append({"id": student.id, "name":student.name, "email":student.email, "year":student.year, "major": student.major,
        'first':student.first, 'second':student.second, 'third':student.third, \
        'server':student.server, 'client':student.client})
    return res, 200
    
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug = True)
    print(sys.__doc__)
