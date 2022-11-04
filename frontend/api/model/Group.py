from ..index import db

class Group(db.Model):

    __tablename__ = "group"
    __table_args__ = {'extend_existing': True}

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
