import time
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from index import app, db
from models import Student

# userInfo = {'name':'Emma', 'email':'emma@g.ucla.edu', 'year':'Freshman', 'major':'Computer Science', 'intro':'123', 'first':'Java', 'second':'Python', 'third':'C++'}

@app.route('/api/v1/getUserInfo')
def get_user_info():
    userId  = request.args.get('userId')
    student = Student.query.filter_by(id=userId).first()
    return {"name":student.name, "email":student.email, "year":student.year, "major": student.major, "intro": student.intro,     \
    'first':student.first, 'second':student.second, 'third':student.third, \
    'server':student.server, 'client':student.client, \
    'frontendSkillScore':student.frontendSkillScore, 'backendSkillScore':student.backendSkillScore}, 200

@app.route('/api/v1/editUserInfo',methods=['GET'])
def edit_user_info():
    userId  = request.args.get('userId')
    name  = request.args.get('name')
    email = request.args.get('email')
    year = request.args.get('year')
    major = request.args.get('major')
    intro = request.args.get('intro')
    update = Student.query.filter_by(id=userId).update({'name':name, 'email':email,'year':year,'major':major, 'intro':intro})
    try:
        db.session.commit()
        return {"msg":"Edit successfully!"},200
    except:
        return {"msg":"Unable to update user info."}, 500

@app.route('/api/v1/editProgrammingLanguage',methods=['GET'])
def edit_programming_language():
    userId = request.args.get('userId')
    first  = request.args.get('first')
    second = request.args.get('second')
    third = request.args.get('third')
    update = Student.query.filter_by(id=userId).update({'first':first, 'second':second,'third':third}) # update the database
    try:
        db.session.commit()
        return {"msg":"Edit successfully!"},200
    except:
        return {"msg":"Unable to update programming language."}, 500

@app.route('/api/v1/editUserRating',methods=['GET'])
def edit_user_rating():
    userId = request.args.get('userId')
    frontendSkillScore  = request.args.get('frontendSkillScore')
    backendSkillScore = request.args.get('backendSkillScore')
    update = Student.query.filter_by(id=userId).update({'frontendSkillScore':frontendSkillScore, 'backendSkillScore':backendSkillScore}) # update the database
    try:
        db.session.commit()
        return {"msg":"Edit successfully!"}, 200
    except:
        return {"msg":"Unable to update user rating."}, 500


@app.route('/api/v1/editFrameworks',methods=['GET'])
def edit_frameworks():
    userId = request.args.get('userId')
    server  = request.args.getlist('server')
    client = request.args.getlist('client')
    update = Student.query.filter_by(id=userId).update({'server':server, 'client':client}) # update the database
    try:
        db.session.commit()
        return {"msg":"Edit successfully!"}, 200
    except:
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

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug = True)
