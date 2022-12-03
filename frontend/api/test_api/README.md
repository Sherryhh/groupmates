# API TESTING

The ``*.csv`` data should be imported to the MySQL server from ``data`` folder.

To run the test, we should enter ``python -m pytest``



## This part of tests are design to check the single APIs

## TEST #1: test_getUserInfo()
### Objective

```
we want to ensure getUserInfo()perform correctly with a status_code = 200
```

### Input

```
	response = client.get('/api/v1/getUserInfo', query_string={
        'userId': 8
    })
```

### Output

```
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert data
    assert data['name'] == 'Emma'
```



The output matches our expectation.



## TEST #2: test_editUserInfo()

### Objective

```
we want to ensure editUserInfo() perform correctly with a status_code = 200
```

### Input

```
    response = client.get('/api/v1/editUserInfo', query_string={
        'userId': 1,
        'name': "Anna",
        'email': "anna@g.ucla.edu",
        'year': "Senior",
        'major': "Math",
        'intro': "I am the best student!",
    })
```

### Output

```
    assert response.status_code == 200
    student = Student.query.filter_by(id=1).first()
    assert student.name == "Anna"
    assert student.email == "anna@g.ucla.edu"
    assert student.year == "Senior"
    assert student.major == "Math"
    assert student.intro == "I am the best student!"
```





## TEST #3: test_editProgrammingLanguage()

### Objective

```
we want to ensure editProgrammingLanguage() perform correctly with a status_code = 200
```

### Input

```
	response = client.get('/api/v1/editProgrammingLanguage', query_string={
        'userId': 3,
        'first': "Python",
        'second': "Java",
        'third': "C++"
    })
```

### Output

```
    assert response.status_code == 200
    student = Student.query.filter_by(id=3).first()
    assert student.first == "Python"
    assert student.second == "Java"
    assert student.third == "C++"
```



The output matches our expectation.



## TEST #4: test_editUserRating()

### Objective

```
we want to ensure editUserRating() perform correctly with a status_code = 200
```

### Input

```
    response = client.get('/api/v1/editUserRating', query_string={
        'userId': 3,
        'frontendSkillScore': 5,
        'backendSkillScore': 5
    })
```

### Output

```
    assert response.status_code == 200
    student = Student.query.filter_by(id=3).first()
    assert student.frontendSkillScore == 5
    assert student.backendSkillScore == 5
```



The output matches our expectation.



## TEST #5: test_editFrameworks()

### Objective

```
we want to ensure editUserRating() perform correctly with a status_code = 200
```

### Input

```
    response = client.get('/api/v1/editFrameworks', query_string={
        'userId': 3,
        'server': '["Flask"]',
        'client': '["React"]'
    })
```

### Output

```
    assert response.status_code == 200
    student = Student.query.filter_by(id=3).first()
    assert student.server == '["Flask"]'
    assert student.client == '["React"]'
```



The output matches our expectation.



## TEST #6: test_getAllGroupInfo()

### Objective

```
we want to ensure getAllGroupInfo() perform correctly with a status_code = 200
```

### Input

```
    response = client.get('/api/v1/getAllGroupInfo', query_string={
        'open': 1
    })
```

### Output

```
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert data
```

The output matches our expectation.



## TEST #7: test_getGroupInfo()

### Objective

```
we want to ensure getGroupInfo() perform correctly with a status_code = 200
```

### Input

```
    response = client.get('/api/v1/getGroupInfo', query_string={
        'userId': 8
    })
```

### Output

```
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert data
    assert data['hasGroup'] == False
```

The output matches our expectation.



## TEST #8: test_editGroupInfo()

### Objective

```
we want to ensure editGroupInfo() perform correctly with a status_code = 200
```

### Input

```
    response = client.get('/api/v1/editGroupInfo', query_string={
        'groupId': 1,
        'open': 1,
        'name': 'Apple',
        'language': 'Python',
        'skill': 'C++'
    })
```

### Output

```
    assert response.status_code == 200
    group = Group.query.filter_by(id=1).first()
    assert group.name == 'Apple'
    assert group.language == 'Python'
    assert group.skill == 'C++'
```

The output matches our expectation. 



## TEST #9: test_editGroupLeader()

### Objective

```
we want to ensure editGroupLeader() perform correctly with a status_code = 200
```

### Input

```
    response = client.get('/api/v1/editGroupLeader', query_string={
        'groupId': 1,
        'leader': 'TestGroupRequest'
    })
```

### Output

```
    assert response.status_code == 200
    group = Group.query.filter_by(id=1).first()
    assert group.leader == 'TestGroupRequest'
```

The output matches our expectation. 



## TEST #10: test_getRequest()

### Objective

```
we want to ensure getRequest() perform correctly with a status_code = 200
```

### Input

```
    response = client.get('/api/v1/getRequest', query_string={
        'userId': 3,
    })
```

### Output

```
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert data
```

The output matches our expectation. 



## TEST #11: test_searchByName()

### Objective

```
we want to ensure searchByName() perform correctly with a status_code = 200
```

### Input

This test case verifies the situation when there is user has the target prefix.

```
    response = client.get('/api/v1/searchByName', query_string={
        'userId': 3,
        'target': 'Anna'
    })
```

### Output

```
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert data
    assert any(d['name'] == 'Anna' for d in data)
```



### Another input:

This test case verifies the situation when there is no user has the target prefix.

```
    response = client.get('/api/v1/searchByName', query_string={
        'userId': 3,
        'target': 'Lucy'
    })
```

### Output

```
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert len(data) == 0
```

The output matches our expectation. 



## TEST #12: test_sortIndividuals()

### Objective

```
we want to ensure sortIndividuals() perform correctly with a status_code = 200
```

### Input

```
    response = client.get('/api/v1/sortIndividuals', query_string={
        'userId': 1,
        'open': 1
    })
```

### Output

```
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert data
```

The output matches our expectation. 



## TEST #13: test_sendIndividualRequest()

### Objective

```
we want to ensure sendIndividualRequest() perform correctly with a status_code = 200
```

### Input

```
    response = client.get('/api/v1/sendIndividualRequest', query_string={
        'userId': 1,
        'target': 1
    })
```

### Output

```
	assert response.status_code == 200
```

The output matches our expectation. 





## TEST #14: test_sendGroupRequest

### Objective

```
we want to ensure sendGroupRequest() perform correctly with a status_code = 200
```

### Input

```
    response = client.get('/api/v1/sendGroupRequest', query_string={
        'userId': 1,
        'target': 3
    })
```

### Output

```
	assert response.status_code == 200
```

The output matches our expectation. 



## TEST #15: test_handleRequest()

### Objective

```
we want to ensure handleRequest() perform correctly with a status_code = 200
```

### Input

```
    response = client.get('/api/v1/handleRequest', query_string={
        'userId': 1,
        'requestId': 3,
        'status': 0
    })
```

### Output

```
assert response.status_code == 200
```

The output matches our expectation. 



## TEST #15: test_checkRequest()

### Objective

```
we want to ensure checkRequest() perform correctly with a status_code = 200
```

### Input

```
    response = client.get('/api/v1/checkRequest', query_string={
        'senderId': 1
    })
```

### Output

```
    assert response.status_code == 200
```

The output matches our expectation. 



## TEST #16: test_changeGroupOpeness()

### Objective

```
we want to ensure changeGroupOpeness() perform correctly with a status_code = 200
```

### Input

```
    response = client.get('/api/v1/changeGroupOpeness', query_string={
        'open': 0,
        'groupId': 1
    })
```

### Output

```
    assert response.status_code == 200
    group = Group.query.filter_by(id=1).first()
    assert group.open == 0
```

The output matches our expectation. 



## TEST #17: test_changeGroupOpeness_back()

### Objective

```
we want to ensure changeGroupOpeness() perform correctly with a status_code = 200
```

### Input

```
    response = client.get('/api/v1/changeGroupOpeness', query_string={
        'open': 1,
        'groupId': 1
    })
```

### Output

```
    assert response.status_code == 200
    group = Group.query.filter_by(id=1).first()
    assert group.open == 1
```

The output matches our expectation. 



## This part of tests are design to test the MySQL databases

## TEST #18: test_student_table

### Objective

```
This test check the Student table
```

### Input

```
    student = Student.query.filter_by(id=3).first()
```

### Output

```
    assert student.name == "Emily"
    assert student.major == 'Computer Science'
    assert student.frontendSkillScore == 5
    assert student.backendSkillScore == 5
    assert student.intro == 'Hi, this is Emily!'
```

The output matches our expectation. 



## TEST #19: test_group_table()

### Objective

```
This test check the Group table
```

### Input

```
    group = Group.query.filter_by(id=3).first()
```

### Output

```
    assert group.name == "TestGroup1"
    assert group.leader == "TestUser1"
    assert group.language == "Python"
    assert group.skill == "C++"
```

The output matches our expectation. 



## TEST #20: test_group_request_table()

### Objective

```
This test check the GroupRequest table
```

### Input

```
    group_request = GroupRequest.query.filter_by(id=1).first()
```

### Output

```
    assert group_request.senderId == 4
    assert group_request.receiverId == 5
```

The output matches our expectation. 



## TEST #21: test_individual_request_table()

### Objective

```
This test check the IndividualRequest table
```

### Input

```
    request = IndividualRequest.query.filter_by(senderId=11).all()
```

### Output

```
    assert any (r.receiverId == 12 for r in request)
```

The output matches our expectation. 



## This part of tests are design to simulate and test the combination of several operations

## TEST #22: test_changeGroupName()

### Actual use case scenario: 

User A change the group name and other group member B check the group information and see the updates

### Objective

```
we want to ensure changeGroupName() perform correctly with a status_code = 200 and then we want to call getGroupInfo() to ensure changeGroupName is done successfully
```

### Input

```
    response = client.get('/api/v1/editGroupInfo', query_string={
        'groupId': 3,
        'open': 1,
        'name': 'TestGroup2',
        'language': 'Python',
        'skill': 'C++'
    })
    # ===========================================================
    #                        followed by
    # ===========================================================
    response = client.get('/api/v1/getGroupInfo', query_string={
        'userId': 9
    })
```

### Output

```
    assert response.status_code == 200
    # ===========================================================
    #                        followed by
    # ===========================================================
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert data
    assert data['name'] == "TestGroup2"
```

The output matches our expectation. 



## TEST #23: test_SendAndCheckIndividualRequest()

### Actual use case scenario: 

User A send an individual request to user B and user B should be able to see the request.

### Objective

```
we want to ensure sendIndividualRequest() perform correctly with a status_code = 200 and then we want to call checkRequest() to ensure the request is successfully recorded.
```

### Input

```
    response = client.get('/api/v1/sendIndividualRequest', query_string={
        'userId': 11,
        'target': 12
    })
    # ===========================================================
    #                        followed by
    # ===========================================================
    response = client.get('/api/v1/checkRequest', query_string={
        'sender': 11,
    })
```

### Output

```
    assert response.status_code == 200
    # ===========================================================
    #                        followed by
    # ===========================================================
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert any(d['receiver'] == 12 for d in data)
```

The output matches our expectation. 



## TEST #24: test_sendGroupRequest_handleRequest()

## Actual use case scenario: 

User A send a join group request to group B. Group member in group B accept the request and check for the updated group information

### Objective

```
we want to ensure sendGroupRequest() perform correctly with a status_code = 200 and then we want to call handleRequest() to accept the requestl, and then we call getGroupInfo() to ensure the group is updated.
```

### Input

```
    org_count = GroupRequest.query.count()
    response = client.get('/api/v1/sendGroupRequest', query_string={
        'userId': 11,
        'target': 3
    })
    counter = GroupRequest.query.count()
    # ===========================================================
    #                        followed by
    # ===========================================================
    group_request = GroupRequest.query.filter_by(id=counter).first()
    # ===========================================================
    #                        followed by
    # ===========================================================
    response = client.get('/api/v1/handleRequest', query_string={
        'userId': 9,
        'requestId': counter,
        'status': 1
    })
    # ===========================================================
    #                        followed by
    # ===========================================================
    response = client.get('/api/v1/getGroupInfo', query_string={
        'userId': 11
    })
```

### Output

```
    assert response.status_code == 200
    assert counter - org_count == 1
    # ===========================================================
    #                        followed by
    # ===========================================================
    assert group_request.senderId == 11
    assert group_request.receiverId == 3
    # ===========================================================
    #                        followed by
    # ===========================================================
    student = Student.query.filter_by(id=11).first()
    assert student.open == 0
    assert student.groupId == 3
    # ===========================================================
    #                        followed by
    # ===========================================================
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert data["groupId"] == 3
```

The output matches our expectation. 

