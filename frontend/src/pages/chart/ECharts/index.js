import React, { PureComponent } from 'react'
import { Page } from 'components'
import { Row, Col, Card, Form, Input, Select, Button} from 'antd'
import styles from './index.less'
const FormItem = Form.Item;
import store from 'store'
import axios from 'axios';


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
          for (let index = 0; index < response['data']['members'].length; index++) {
            const newItem = {
              "id": response['data']['members'][index].id,
              "name": response['data']['members'][index].name,
              "email": response['data']['members'][index].email,
            }
            members.push(newItem)
          }
          this.setState({
              hasGroup: true,
              name: response['data']['name'],
              language: response['data']['language'],
              skill: response['data']['skill'],
              members:members,
          })
          console.log(this.state.members)
        }
      }).catch(error => {
          console.log('Get my group info', error);
      });
  };

  componentDidMount() {
    this.getGroupInfo();
  }

  render() {
    return (
      <Page
        // loading={loading.models.dashboard && sales.length === 0}
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
          {this.state.basicInfoediting ? (
           <Button
            type="primary"
                  onClick={() => {
                    this.setState({ basicInfoediting: false });
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
            Group Members
            <div className={styles.info}>
            <table>
                <thead>
                  <tr>
                  <th>id</th>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.members.map((d) => (
                    <tr key={d.id}>
                      <td>{d.id}</td>
                      <td>{d.name}</td>
                      <td>{d.email}</td>
                    </tr>
                  ))}
                  </tbody>
              </table>
            </div>
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
