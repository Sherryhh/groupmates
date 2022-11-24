import sys
sys.path.append("..")
from index import db

class Group(db.Model):

    __tablename__ = "group"
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key = True, autoincrement=True)
    open = db.Column(db.Integer)
    name = db.Column(db.String(255))
    leader = db.Column(db.String(255))
    language = db.Column(db.String(255))
    skill = db.Column(db.String(255))
    members = db.relationship('Student', backref='group', lazy=True)
    groupRequests = db.relationship('GroupRequest', backref = 'group', lazy = 'dynamic', foreign_keys = 'GroupRequest.receiverId')
    def __init__(self, open, name, leader, language, skill):
        self.open = open
        self.name = name
        self.leader = leader
        self.language = language
        self.skill = skill

    def editGroupInfo(self, query, name, language, skill):
        query.update({'name':name, 'language':language, "skill":skill})
        try:
            db.session.commit()
            return True
        except:
            return False

    def editGroupLeader(self, query, leader):
        query.update({'leader':leader})
        try:
            db.session.commit()
            return True
        except:
            return False

    def getAllGroupRequests(self):
        res = []
        for r in self.groupRequests:
            # check whether the request is active (was not accepted or declined)
            # if r.status != 0:
            #     continue
            student = r.sender
            # check whether the student has already joined a group
            if student.open == 0 and student.groupId != r.receiverId:
                continue
            res.append({"id": r.id, "status":r.status, "studentId":student.id, "name":student.name, "email":student.email, "year":student.year, "major": student.major,
            'first':student.first, 'second':student.second, 'third':student.third, \
            'server':student.server, 'client':student.client, 'intro':student.intro})
        return res
