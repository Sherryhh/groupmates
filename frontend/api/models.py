from index import db

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

class Group(db.Model):

    __tablename__ = "group"

    id = db.Column(db.Integer, primary_key = True)
    open = db.Column(db.Integer)
    name = db.Column(db.String(255))
    leader = db.Column(db.String(255))
    language = db.Column(db.String(255))
    skill = db.Column(db.String(255))

    def __init__(self, open, name, leader, language, skill):
        self.open = open
        self.name = name
        self.leader = leader
        self.language = language
        self.skill = skill
