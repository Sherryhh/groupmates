import sys
sys.path.append("..")
from index import db
from sqlalchemy.orm import *
from model.Group import Group

class IndividualRequest(db.Model):

    __tablename__ = "individualRequest"
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key = True)
    senderId = db.Column(db.Integer, db.ForeignKey('student.id'))
    receiverId = db.Column(db.Integer, db.ForeignKey('student.id'))
    status = db.Column(db.Integer)

    sender = relationship('Student', foreign_keys='IndividualRequest.senderId')
    receiver = relationship('Student', foreign_keys='IndividualRequest.receiverId')

    def __init__(self, senderId, receiverId, status):
        self.senderId = senderId
        self.receiverId = receiverId
        self.status = status

    def handleIndividualRequest(self, status):
        # check whether the sender of the request has already joined a group
        # if self.sender.open == 0:
        #     return False
        self.status = int(status)
        if self.status == 1: # accepted
            # set sender and receiver's open status to be false (they have formed a group)
            self.receiver.open = 0
            # create a new group
            if self.sender.open == 0:
                self.receiver.groupId = self.sender.groupId
            else:
                self.sender.open = 0
                group = Group(open=1, leader=self.receiver.name, language="", skill="", name=self.receiver.name)
                try:
                    db.session.add(group)
                    db.session.flush()
                    # set two new members' group id to the newly create group
                    self.sender.groupId = group.id
                    self.receiver.groupId = group.id
                except Exception as e:
                    print(e)
                    return False
        db.session.commit()
        return True


class GroupRequest(db.Model):

    __tablename__ = "groupRequest"
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key = True)
    senderId = db.Column(db.Integer, db.ForeignKey('student.id'))
    receiverId = db.Column(db.Integer, db.ForeignKey('group.id'))
    status = db.Column(db.Integer)

    sender = relationship('Student', foreign_keys='GroupRequest.senderId')
    receiver = relationship('Group', foreign_keys='GroupRequest.receiverId')

    def __init__(self, senderId, receiverId, status):
        self.senderId = senderId
        self.receiverId = receiverId
        self.status = status

    def handleGroupRequest(self, status):
        # check whether the sender of the request has already joined a group
        if self.sender.open == 0:
            return False
        self.status = int(status)
        if self.status == 1: # accepted
            # set sender and receiver's open status to be false (they have formed a group)
            self.sender.open = 0
            self.sender.groupId = self.receiverId
        db.session.commit()
        return True
