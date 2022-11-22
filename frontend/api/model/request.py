import sys
sys.path.append("..")
from index import db

class IndividualRequest(db.Model):

    __tablename__ = "individualRequest"
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key = True)
    sender = db.Column(db.Integer, db.ForeignKey('student.id'))
    receiver = db.Column(db.Integer, db.ForeignKey('student.id'))
    status = db.Column(db.Integer)
    count = 2

    def __init__(self, sender, receiver, status):
        self.count += 1
        self.id = self.count
        self.sender = sender
        self.receiver = receiver
        self.status = status

class GroupRequest(db.Model):

    __tablename__ = "groupRequest"
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key = True)
    sender = db.Column(db.Integer, db.ForeignKey('student.id'))
    receiver = db.Column(db.Integer, db.ForeignKey('group.id'))
    status = db.Column(db.Integer)

    def __init__(self, sender, receiver, status):
        self.sender = sender
        self.receiver = receiver
        self.status = status
