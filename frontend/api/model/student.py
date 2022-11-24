import sys
sys.path.append("..")
from index import db
import json
from model.request import IndividualRequest, GroupRequest

class Student(db.Model):

    __tablename__ = "student"
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(255))
    email = db.Column(db.String(255))
    year = db.Column(db.String(45))
    major = db.Column(db.String(255))
    intro = db.Column(db.String(255))
    first = db.Column(db.String(45))
    second = db.Column(db.String(45))
    third = db.Column(db.String(45))
    server = db.Column(db.String(255))
    client = db.Column(db.String(255))
    frontendSkillScore = db.Column(db.Integer)
    backendSkillScore = db.Column(db.Integer)
    open = db.Column(db.Integer)
    groupId = db.Column(db.Integer, db.ForeignKey('group.id'))
    individualRequests = db.relationship('IndividualRequest', backref = 'student', lazy = 'dynamic', foreign_keys = 'IndividualRequest.receiverId')

    def __init__(self, name, email, year, major, intro, first, second, third, server, client, frontendSkillScore, backendSkillScore, open):
        self.name = name
        self.email = email
        self.year = year
        self.major = major
        self.intro = intro
        self.first = first
        self.second = second
        self.third = third
        self.server = server
        self.client = client
        self.frontendSkillScore = frontendSkillScore
        self.backendSkillScore = backendSkillScore
        self.open = open

    def getUserInfo(self):
        return {"name":self.name, "email":self.email, "year":self.year, "major": self.major, "intro": self.intro,     \
        'first':self.first, 'second':self.second, 'third':self.third, \
        'server':self.server, 'client':self.client, \
        'frontendSkillScore':self.frontendSkillScore, 'backendSkillScore':self.backendSkillScore}

    def editUserInfo(self, query, name, email, year, major, intro):
        query.update({'name':name, 'email':email,'year':year,'major':major, 'intro':intro})
        try:
            db.session.commit()
            return True
        except:
            return False

    def editProgrammingLanguage(self, query, first, second, third):
        query.update({'first':first, 'second':second,'third':third})
        try:
            db.session.commit()
            return True
        except:
            return False

    def editUserRating(self, query, frontendSkillScore, backendSkillScore):
        query.update({'frontendSkillScore':frontendSkillScore, 'backendSkillScore':backendSkillScore})
        try:
            db.session.commit()
            return True
        except:
            return False

    def editFrameworks(self, query, serverSide, clientSide):
        query.update({'server':serverSide, 'client':clientSide})
        try:
            db.session.commit()
            return True
        except:
            return False


    def getAllStudentsInfo():
        pass

    def getAllIndividualRequests(self):
        res = []
        for r in self.individualRequests:
            # check whether the request is already inactive (already accepted or declined)
            # if r.status != 0:
            #     continue
            student = r.sender
            # check whether the student has already joined a group
            if student.open == 0:
                continue
            res.append({"id": r.id, "status":r.status, "studentId":student.id, "name":student.name, "email":student.email, "year":student.year, "major": student.major,
            'first':student.first, 'second':student.second, 'third':student.third, \
            'server':student.server, 'client':student.client})
        return sorted(res, key=lambda d: d['status'])

    def sendIndividualRequest(self, targetStudentId):
        r = IndividualRequest(self.id, targetStudentId, 1)
        try:
            db.session.add(r)
            db.session.commit()
            return True
        except:
            return False

    def sendGroupRequest(self, targetGroupId):
        r = GroupRequest(self.id, targetGroupId, 1)
        try:
            db.session.add(r)
            db.session.commit()
            return True
        except:
            return False

    def sortIndividuals(self, allStudents):
        currLanuages = set([self.first, self.second, self.third])
        yearConvert = {"Freshman": 1, "Sophomore": 2, "Junior": 3, "Senior": 4}
        dictStudents = []
        for student in allStudents:
            if student.id == self.id:
                continue
            d = {"id": student.id, "name":student.name, "email":student.email, "year":student.year, "major": student.major, "intro": student.intro,     \
                'first':student.first, 'second':student.second, 'third':student.third, \
                'server':student.server, 'client':student.client, \
                'frontendSkillScore':student.frontendSkillScore, 'backendSkillScore':student.backendSkillScore, 'total': 0}
            sLanuages = set([student.first, student.second, student.third])
            languageScore = len(currLanuages.intersection(sLanuages))/len(currLanuages.union(sLanuages))*0.25
            if self.first == student.first:
                languageScore += 0.25
            if self.second == student.second:
                languageScore += 0.25
            if self.third == student.third:
                languageScore += 0.25
            crossScore = (self.backendSkillScore * student.frontendSkillScore + self.frontendSkillScore * student.backendSkillScore)/50
            gradeScore = 1 - abs(yearConvert[self.year] - yearConvert[student.year])/4
            totalScore = languageScore*0.4+crossScore*0.4+gradeScore*0.2
            d['total'] = totalScore
            dictStudents.append(d)
        return sorted(dictStudents, key=lambda student: student['total'], reverse=True)

    def searchByName(self, allStudents):
        allStudent = []
        for student in allStudents:
            if student.open == 0 or student.id == self.id:
                continue
            allStudent.append(student)
        return self.sortIndividuals(allStudent)
