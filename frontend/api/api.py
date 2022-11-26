from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from index import app, db
from model.Group import Group
from model.student import Student
from model.request import IndividualRequest, GroupRequest
import sys

# userInfo = {'name':'Emma', 'email':'emma@g.ucla.edu', 'year':'Freshman', 'major':'Computer Science', 'intro':'123', 'first':'Java', 'second':'Python', 'third':'C++'}

@app.route('/api/v1/getUserInfo', methods=['GET'])
def get_user_info():
    userId  = request.args.get('userId')
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
    return jsonify(res), 200

@app.route('/api/v1/getAllUserInfo', methods=['GET'])
def get_all_user_info():
    isOpen = request.args.get('open')
    students = Student.query.filter_by(open=isOpen).all()
    res = []
    for student in students:
        res.append({"id": student.id, "name":student.name, "email":student.email, "year":student.year, "major": student.major,
        'first':student.first, 'second':student.second, 'third':student.third, \
        'server':student.server, 'client':student.client, 'groupId':student.groupId, 'intro':student.intro})
    return jsonify(res), 200

@app.route('/api/v1/getGroupInfo', methods=['GET'])
def get_group_info():
    userId = request.args.get('userId')
    student = Student.query.filter_by(id=userId).first()
    if student.open == 1:
        return {"hasGroup":False}, 200
    group = Group.query.filter_by(id=student.groupId).first()
    members = []
    for student in group.members:
        members.append({"id": student.id, "name":student.name, "email":student.email, "year":student.year, "major": student.major,
        'first':student.first, 'second':student.second, 'third':student.third, \
        'server':student.server, 'client':student.client})
    return {"groupId":group.id, "hasGroup":True,"name":group.name, "leader":group.leader, "language":group.language, "skill":group.skill,"members":members}

@app.route('/api/v1/editGroupInfo',methods=['GET'])
def edit_group_info():
    groupId  = request.args.get('groupId')
    name  = request.args.get('name')
    language = request.args.get('language')
    skill = request.args.get('skill')
    query = Group.query.filter_by(id=groupId)
    group = query.first()
    success = group.editGroupInfo(query, name, language, skill)
    if success:
        return {"msg":"Edit successfully!"},200
    else:
        return {"msg":"Unable to update group info."}, 500

@app.route('/api/v1/editGroupLeader',methods=['GET'])
def edit_group_leader():
    groupId  = request.args.get('groupId')
    leader = request.args.get('leader')
    query = Group.query.filter_by(id=groupId)
    group = query.first()
    success = group.editGroupLeader(query, leader)
    if success:
        return {"msg":"Edit successfully!"},200
    else:
        return {"msg":"Unable to update group leader."}, 500

@app.route('/api/v1/getRequest', methods=['GET'])
def get_request():
    userId = request.args.get('userId')
    student = Student.query.filter_by(id=userId).first()
    if student.open == 1: # return group requests
        res = student.getAllIndividualRequests()
    else:
        group = Group.query.filter_by(id=student.groupId).first()
        res = group.getAllGroupRequests()
    res = sorted(res, key=lambda d: d['status'])
    print(res)
    return jsonify(res), 200

@app.route('/api/v1/searchByName', methods=['GET'])
def searchByName():
    userId  = request.args.get('userId')
    target =  request.args.get('target')
    cur = Student.query.filter_by(id=userId).first()
    students = Student.query.filter(Student.name.contains(target))
    res = cur.searchByName(students)
    return jsonify(res), 200

@app.route('/api/v1/sortIndividuals', methods=['GET'])
def sortIndividuals():
    userId  = request.args.get('userId')
    isOpen = request.args.get('open')
    cur = Student.query.filter_by(id=userId).first()
    students = Student.query.filter_by(open=isOpen).all()
    res = cur.sortIndividuals(students)
    print(res)
    return jsonify(res), 200

@app.route('/api/v1/sendIndividualRequest', methods=['GET'])
def sendIndividualRequest():
    userId = request.args.get('userId')
    target = request.args.get('target')
    student = Student.query.filter_by(id=userId).first()
    success = student.sendIndividualRequest(target)
    if success:
        return {"msg":"Send successfully!"},200
    else:
        return {"msg":"Unable to send."}, 500

@app.route('/api/v1/sendGroupRequest', methods=['GET'])
def sendGroupRequest():
    userId = request.args.get('userId')
    target = request.args.get('target')
    student = Student.query.filter_by(id=userId).first()
    success = student.sendGroupRequest(target)
    if success:
        return {"msg":"Send successfully!"},200
    else:
        return {"msg":"Unable to send."}, 500

@app.route('/api/v1/handleRequest', methods=['GET'])
def handleRequest():
    userId = request.args.get('userId')
    requestId = request.args.get('requestId')
    status = request.args.get('status')
    student = Student.query.filter_by(id=userId).first()
    if student.open == 1: # return individual requests
        r = IndividualRequest.query.filter_by(id=requestId).first()
        success = r.handleIndividualRequest(status)
        if success:
            return {"msg":"Request processed successfully!"},200
        else:
            return {"msg":"Fail to handle the request."}, 500
    else:
        r = GroupRequest.query.filter_by(id=requestId).first()
        success = r.handleGroupRequest(status)
        if success:
            return {"msg":"Request processed successfully!"},200
        else:
            return {"msg":"Fail to handle the request."}, 500

@app.route('/api/v1/checkRequest', methods=['GET'])
def checkRequest():
    senderId = request.args.get('sender')
    requests = IndividualRequest.query.filter_by(senderId=senderId).all()
    res = []
    for r in requests:
        res.append({"sender": r.senderId, "receiver": r.receiverId})
    print(res)
    return jsonify(res), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug = True)
