from index import db

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

    def __init__(self, name, email, year, major, intro, first, second, third, server, client, frontendSkillScore, backendSkillScore):
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

    def getAllIndividualRequests():
        pass

    def sendIndividualRequest(targetStudentId):
        pass

    def sendGroupRequest(targetGroupId):
        pass
