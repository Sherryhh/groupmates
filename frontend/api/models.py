from index import db

# class Test(db.Model):

    # __tablename__ = "students"
    #
    # id = db.Column(db.Integer, primary_key = True)
    # name = db.Column(db.String(255))
    #
    # def __init__(self, name):
    #     self.name = name

class Student(db.Model):

    __tablename__ = "student"

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

    def __init__(self, name, email, year, major, intro, server, client, frontendSkillScore, backendSkillScore):
        self.name = name
        self.email = email
        self.year = year
        self.major = major
        self.intro = intro
        self.server = server
        self.client = client
        self.frontendSkillScore = frontendSkillScore
        self.backendSkillScore = backendSkillScore
