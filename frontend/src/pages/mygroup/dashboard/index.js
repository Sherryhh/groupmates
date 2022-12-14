import React, { PureComponent } from 'react'
import { Page } from 'components'
import { Row, Col, Card, Form, Input, Select, Button, Table} from 'antd'
import styles from './index.less'
const FormItem = Form.Item;
import store from 'store'
import axios from 'axios';
import { DropOption } from 'components'

class Chart extends PureComponent {
  constructor() {
    super()
    this.state = {
      basicInfoEditing: false,
      name: "",
      language: "",
      skill: "",
      hasGroup:false,
      userId: store.get('user').id,
      members:[],
      leader: "",
      membersId:[],
      membersName:[],
      membersEmail:[],
      groupId: 0,
      click: false,
    }
    this.getGroupInfo();
  }

  getGroupInfo(){
      console.log('get my group info')
      const url = '/api/v1/getGroupInfo';
      axios.get(url,{
        params: {
          userId: this.state.userId,
        },
      }).then((response) => {
        console.log(response)
        if(response['data']['hasGroup'] == true){
          const members = []
          let membersId = []
          let membersName = []
          let membersEmail = []
          for (let index = 0; index < response['data']['members'].length; index++) {
            const newItem = {
              "id": response['data']['members'][index].id,
              "name": response['data']['members'][index].name,
              "email": response['data']['members'][index].email,
            }
            members.push(newItem)
            membersId.push(response['data']['members'][index].id)
            membersName.push(response['data']['members'][index].name)
            membersEmail.push(response['data']['members'][index].email)
          }
          if (response['data']['open'] == '0') {
            this.setState({
              click: true
            })
          }
          this.setState({
              groupId: response['data']['groupId'],
              hasGroup: true,
              name: response['data']['name'],
              language: response['data']['language'],
              skill: response['data']['skill'],
              leader: response['data']['leader'],
              members:members,
              membersId:membersId,
              membersName:membersName,
              membersEmail:membersEmail,
          })
          console.log(this.state.members)
        }
      }).catch(error => {
          console.log('Get my group info', error);
      });
  };

  editGroupInfo(){
    const url = '/api/v1/editGroupInfo';
    axios.get(url,{
      params: {
        groupId: this.state.groupId,
        name:this.state.name,
        language:this.state.language,
        skill:this.state.skill,
      },
    }).then((response) => {
      console.log(response)
    }).catch(error => {
        console.log('Edit group information', error);
    });
  };

  componentDidMount() {
    this.getGroupInfo();
  }

  handleMenuClick = (record, e) => {
    console.log(record.name)
    const url = '/api/v1/editGroupLeader';
    axios.get(url,{
      params: {
        groupId: this.state.groupId,
        leader:record.name,
      },
    }).then((response) => {
      console.log(response)
      this.getGroupInfo()
    }).catch(error => {
        console.log('Edit group leader', error);
    });
  };

  handleGroupChange(open) {
    console.log("Change status")
    const url = '/api/v1/changeGroupOpeness';
    axios.get(url,{
      params: {
        open: open,
        groupId: this.state.groupId,
      },
    }).then((response) => {
      this.getGroupInfo()
    }).catch(error => {
        console.log('Change group open', error);
    });
  }

  render() {
    const members = []
    for (let i = 0; i < this.state.membersId.length; i++) {
      const newItem = {
        "id": this.state.membersId[i],
        "name": this.state.membersName[i],
        "email": this.state.membersEmail[i],
      }
      members.push(newItem)
    }
    const {...tableProps } = this.props
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Leader',
        key: 'operation',
        render: (text, record) => {
          return (
            <DropOption
              onMenuClick={e => this.handleMenuClick(record, e)}
              menuOptions={[
                { key: '1', name: `Select as Leader` }
              ]}
            />
          )
        },
      },
    ]
    console.log(this.state.click)
    return (
      <Page
        className={styles.dashboard}
      >
        <Row gutter={24}>
        <Col lg={30} md={24}>

          <Card
            bordered={false}
            bodyStyle={{
              padding: '5px 36px 14px 0',
            }}
          >
          <div className={styles.quote}>
          Group information
          <div className={styles.edit}>
          {this.state.hasGroup ? (
            this.state.basicInfoediting ? (
             <Button
              type="primary"
                    onClick={() => {
                      this.setState({ basicInfoediting: false });
                      this.editGroupInfo();
                    }}
                  >
                    submit
              </Button>
            ) : (
              <Button
              type="primary"
                    onClick={() => {
                      this.setState({ basicInfoediting: true });
                    }}
                  >
                    Edit
                  </Button>
            )
          ):(
            <div></div>
          )}
          {this.state.hasGroup ? (
            this.state.click ? (
            <Button
            onClick={() => {
              this.setState({ click: false });
              this.handleGroupChange(1)
            }}
            >
              Open
            </Button>
          ):(
            <Button
            onClick={() => {
              this.setState({ click: true });
              this.handleGroupChange(0)
              }}
            >
              Close
            </Button>
          )
          ):(
            <div></div>
          )}
          </div>
          <Form
            className={styles.form}>
            <Row>
            <FormItem style={{ margin: "10px", width: "200px" }}>
            Name
            {this.state.basicInfoediting ? (
              <Input
                placeholder={"Your name"}
                value={this.state.name}
                onChange={(e)=>{
                  this.setState({name: e.target.value});
                }}
              />
            ) : (
              <Input
                disabled = {true}
                value={this.state.name}
              />
            )}
            </FormItem>
            <FormItem style={{ margin: "10px", width: "300px" }}>
            Language
            {this.state.basicInfoediting ? (
              <Input
                value={this.state.language}
                onChange={(e)=>{
                  this.setState({language: e.target.value});
                }}
              />
            ) : (
              <Input
                disabled = {true}
                value={this.state.language}
              />
            )}
            </FormItem>
            <FormItem style={{ margin: "10px", width: "300px" }}>
            Skill
            {this.state.basicInfoediting ? (
              <Input
                value={this.state.skill}
                onChange={(e)=>{
                  this.setState({skill: e.target.value});
                }}
              />
            ) : (
              <Input
                disabled = {true}
                value={this.state.skill}
              />
            )}
            </FormItem>
            </Row>
            <FormItem style={{ margin: "10px", width: "300px" }}>
            Group Leader
            <Input
              disabled = {true}
              value={this.state.leader}
            />
            </FormItem>
            <FormItem style={{ margin: "10px", width: "1000px" }}>
            Group Members
            <Table
            {...tableProps}
            pagination={{
              ...tableProps.pagination,
              showTotal: total => `Total ${total} Items`,
            }}
            bordered
            scroll={{ x: 1200 }}
            className={styles.table}
            dataSource={members}
            columns={columns}
            simple
            rowKey={record => record.id}
          />
            </FormItem>
            </Form>
            </div>
          </Card>
          </Col>
          </Row>
      </Page>
    )
  }
}

export default Chart
