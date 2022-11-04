# API TESTING

## TEST #1: test editUserInfo()
### Objective

```
we want to ensure editUserInfo() perform correctly and get a status_code = 200
```

### Input

```
response = client.get('/api/v1/editUserInfo', json={
        'userId': 3,
        'name': "Sam",
        'email': "sam@g.ucla.edu",
        'year': "Senior",
        'major': "CS",
        'intro': "I am the best student!"
    })
```

### Output

```
response.status_code == 200
```



The output matches our expectation.



## TEST #2: test editProgrammingLanguage()

### Objective

```
we want to ensure editProgrammingLanguage() perform correctly and get a status_code = 200
```

### Input

```
    response = client.get('/api/v1/editProgrammingLanguage', json={
        'userId': 3,
        'first': "C",
        'second': "C++",
        'third': "Java"
    })
```

### Output

```
response.status_code == 200
```





## TEST #3: test test_editUserRating()

### Objective

```
we want to ensure test_editUserRating() perform correctly and get a status_code = 200
```

### Input

```
    response = client.get('/api/v1/editUserRating', json={
        'userId': 3,
        'frontendSkillScore': 5,
        'backendSkillScore': 4
    })
```

### Output

```
response.status_code == 200
```



The output matches our expectation.



## TEST #4: test editFrameworks()

### Objective

```
we want to ensure editFrameworks() perform correctly and get a status_code = 200
```

### Input

```
    response = client.get('/api/v1/editFrameworks', json={
        'userId': 3,
        'server': "Flask",
        'client': "React"
    })
```

### Output

```
response.status_code == 200
```



The output matches our expectation.



## TEST #5: test getUserInfo()

### Objective

```
we want to ensure getUserInfo() perform correctly and get a status_code = 200
and if we preload the MySQL schema with name "Sam" with userID = 3, we can retrieve "Sam" with userID = 3 from the database.
```

### Input

```
    response = client.get('/api/v1/getUserInfo', json={
        'userId': 3
    })
```

### Output

```
response.status_code == 200
data = json.loads(response.get_data(as_text=True))
data['name'] == 'Sam'
```



The output matches our expectation.



## TEST #6: test getUserInfo()

### Objective

```
we want to ensure getUserInfo() perform correctly and get a status_code = 200
and if we preload the MySQL schema with name "Sam" with userID = 3, we can retrieve "Sam" with userID = 3 from the database.
```

### Input

```
    response = client.get('/api/v1/getUserInfo', json={
        'userId': 4
    })
```

### Output

```
response.status_code == 200
data = json.loads(response.get_data(as_text=True))
data['name'] == 'Sam'
```

The output matches our expectation. We can successfully retrieve "Sam".



## TEST #7: test test_get_user_info_from_db()

### Objective

```
we want to ensure we can connnect to database and retrieve the correct information
```

### Input

```
db fixture for connecting to db
student = Student.query.filter_by(id=3).first()
```

### Output

```
student.name == "Dexter"
student.major == 'Electrical and Computer Engineering'
student.frontendSkillScore == 5
student.backendSkillScore == 5
student.intro == 'I want to die! Who can save me, God!!'
```

The output matches our expectation. We successfully retrieve the correct information.



## TEST #8: test test_get_user_info_from_db_2()

### Objective

```
we want to ensure we can connnect to database and retrieve the correct information
```

### Input

```
input the _db fixture for connecting to db
student = Student.query.filter_by(id=4).first()
```

### Output

```
student.name == "Sam"
student.major == 'CS'
student.email == 'sam@g.ucla.edu'
student.year == 'Senior'
student.intro == 'I am the best student!'
student.frontendSkillScore == 5
student.backendSkillScore == 4
student.server == 'Flask'
student.client == 'React'
student.first == 'C'
student.second == 'C++'
student.third == 'Java'
```

The output matches our expectation. We successfully retrieve the correct information.



\# All following tests are written in advance for unimplemented API endpoints

We should be able to use this as testing skeleton once the implementations are done



## TEST #9: test getAllStudentsInfo()

### Objective

```
we want to ensure getAllStudentsInfo() perform correctly and get a status_code = 200
and the result is not null
```

### Input

```
response = client.get('/api/v1/getAllStudentsInfo')
```

### Desired Output

```
response.status_code == 200
data = json.loads(response.get_data(as_text=True))
data is not None
```





## TEST #10: test getAllIndividualRequests()

### Objective

```
we want to ensure getAllIndividualRequests() perform correctly and get a status_code = 200
and the result is not None
```

### Input

```
    response = client.post('/api/v1/sendIndividualRequest', json={
        'userId': 3
    })
```

### Desired Output

```
response.status_code == 200
data = json.loads(response.get_data(as_text=True))
data is not None
```



## TEST #11: test sendIndividualRequest()

### Objective

```
we want to ensure sendIndividualRequest() perform correctly and get a status_code = 200
and the result is not None
```

### Input

```
    response = client.post('/api/v1/sendIndividualRequest', json={
        'userId': 3
    })
```

### Desired Output

```
response.status_code == 200
data = json.loads(response.get_data(as_text=True))
data is not None
```





## TEST #12: test sendGroupRequest()

### Objective

```
we want to ensure sendGroupRequest() perform correctly and get a status_code = 200
```

### Input

```
    response = client.post('/api/v1/sendGroupRequest', json={
        'userId': 3,
        'groupId': 1
    })
```

### Desired Output

```
response.status_code == 200
```





## TEST #13: test getGroupInfo()

### Objective

```
we want to ensure getGroupInfo() perform correctly and get a status_code = 200
and it contains the groupId
```

### Input

```
    response = client.get('/api/v1/getGroupInfo', json={
        'groupId': 1
    })
```

### Desired Output

```
response.status_code == 200
```





## TEST #14: test getAllGroupInfo()

### Objective

```
we want to ensure getAllGroupInfo() perform correctly and get a status_code = 200
and the result exits
```

### Input

```
response = client.get('/api/v1/getAllGroupInfo')
```

### Desired Output

```
response.status_code == 200
```





## TEST #15: test getAllGroupRequest()

### Objective

```
we want to ensure getAllGroupRequest() perform correctly and get a status_code = 200
and the result is not None
```

### Input

```
response = client.get('/api/v1/getAllGroupRequest', json={
        'groupId': 1
    })
```

### Desired Output

```
response.status_code == 200
assert data is not None
```



## TEST #15: test getAllMember()

### Objective

```
we want to ensure getAllMember() perform correctly and get a status_code = 200
and the result exists
```

### Input

```
    response = client.get('/api/v1/getAllMember', json={
        'groupId': 1
    })
```

### Desired Output

```
response.status_code == 200
assert data exists
```



## TEST #16: test changeGroupName()

### Objective

```
we want to ensure getAllMember() perform correctly and get a status_code = 200; then call getGroupInfo() again to check whether the group name changes to 'BugMakers'
```

### Input

```
    response = client.post('/api/v1/changeGroupName', json={
        'groupId': 1,
        'name': 'BugMakers'
    })
    
    response = client.get('/api/v1/getGroupInfo', json={
        'groupId': 1
    })
```

### Desired Output

```
response.status_code == 200

data['name'] == 'BugMakers'
```





## TEST #17: test acceptRequest()

### Objective

```
we want to ensure acceptRequest() perform correctly and get a status_code = 200
```

### Input

```
response = client.post('/api/v1/acceptRequest', json={
        'userId': 3,
        'requestId': 2
    })
```

### Desired Output

```
response.status_code == 200
```





## TEST #18: test declineRequest()

### Objective

```
we want to ensure declineRequest() perform correctly and get a status_code = 200
```

### Input

```
response = client.post('/api/v1/declineRequest', json={
        'userId': 3,
        'requestId': 2
    })
```

### Desired Output

```
response.status_code == 200
```



## TEST #19: test searchByName()

### Objective

```
we want to ensure searchByName() perform correctly and get a status_code = 200, and the userId corresponds to the name we are searching.
```

### Input

```
response = client.get('/api/v1/searchByName', json={
        'name': "Sam"
    })
```

### Desired Output

```
response.status_code == 200
'userId' == 3
```



## TEST #20: test sortIndividuals()

### Objective

```
we want to ensure sortIndividuals() perform correctly and get a status_code = 200
```

### Input

```
response = client.get('/api/v1/sortIndividuals')
```

### Desired Output

```
response.status_code == 200
```



