import sys
sys.path.append("..")
from index import db

class Group(db.Model):

    __tablename__ = "group"
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key = True)
    open = db.Column(db.Integer)
    name = db.Column(db.String(255))
    leader = db.Column(db.String(255))
    language = db.Column(db.String(255))
    skill = db.Column(db.String(255))
    members = db.relationship('Student', backref='group', lazy=True)

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
