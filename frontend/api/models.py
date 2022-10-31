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

    def __init__(self, name, email, year, major):
        self.name = name
        self.email = email
        self.year = year
        self.major = major
