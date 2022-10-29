import React, { PureComponent, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Row, Col, Card, Form, Input, Select, Button} from 'antd'
import { Color } from 'utils'
import { Page, ScrollBar } from 'components'
import {
  NumberCard,
  Quote,
  Sales,
  Weather,
  RecentSales,
  Comments,
  Completed,
  Browser,
  Cpu,
  User,
} from './components'
import styles from './index.less'
import store from 'store'

const FormItem = Form.Item;
const { Option } = Select;

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}

@connect(({ app, dashboard, loading }) => ({
  dashboard,
  loading,
}))
class Dashboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      basicInfoEditing: false,
      languageInfoEditing: false,
      frameworkInfoEditing: false,
      ratingInfoEditing: false,
      name:"Emma",
      email:"emma@ucla.edu",
      year:"Freshman",
      major:"Computer Science",
      intro:"",
      first:"",
      second:"",
      third:"",
      server:["Django"],
      client:[],
      frontendSkillScore:"3",
      backendSkillScore:"5",
    };
  }
  render() {
    const userDetail = store.get('user')
    const { avatar, username } = userDetail
    const { dashboard, loading } = this.props
    const {
      weather,
      sales,
      quote,
      numbers,
      recentSales,
      comments,
      completed,
      browser,
      cpu,
      user,
    } = dashboard

    const numberCards = numbers.map((item, key) => (
      <Col key={key} lg={6} md={12}>
        <NumberCard {...item} />
      </Col>
    ))

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
          Basic information
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
                placeholder={"Your name"}
                value={this.state.name}
              />
            )}
            </FormItem>
            <FormItem style={{ margin: "10px", width: "200px" }}>
            Email
            {this.state.basicInfoediting ? (
              <Input
                placeholder={"Your email"}
                value={this.state.email}
                onChange={(e)=>{
                  this.setState({email: e.target.value});
                }}
              />
            ) : (
              <Input
                value={this.state.email}
              />
            )}
            </FormItem>
            <FormItem style={{ margin: "10px", width: "200px" }}>
            Year
            {this.state.basicInfoediting ? (
              <Select
              value={this.state.year}
              onChange={value => {
                this.setState({ year: value });
              }}
              >
                  <Option value="Freshman">Freshman</Option>
                  <Option value="Sophomore">Sophomore</Option>
                  <Option value="Junior">Junior</Option>
                  <Option value="Senior">Senior</Option>
                </Select>
            ) : (
              <Input
                value={this.state.year}
              />
            )}
            </FormItem >
            </Row>
            <Row>
            <FormItem style={{ margin: "10px", width: "300px" }}>
            Major
            {this.state.basicInfoediting ? (
              <Select defaultValue={this.state.major}
              onChange={value => {
                this.setState({ major: value });
              }}
              >
                  <Option value="Computer Science">Computer Science</Option>
                  <Option value="Electrical and Computer Engineering">Electrical and Computer Engineering</Option>
                  <Option value="Statistics">Statistics</Option>
                  <Option value="Math">Math</Option>
                </Select>
            ) : (
              <Input
                value={this.state.major}
              />
            )}
            </FormItem>
            <FormItem style={{ margin: "10px", width: "600px" }}>
            Self-introduction
            {this.state.basicInfoediting ? (
              <Input
                placeholder={"optional"}
                value={this.state.intro}
                onChange={(e)=>{
                  this.setState({intro: e.target.value});
                }}
              />
            ) : (
              <Input
                value={this.state.intro}
              />
            )}
            </FormItem>
            </Row>
            </Form>
            </div>
          </Card>

          <Card
            bordered={false}
            bodyStyle={{
              padding: '5px 36px 14px 0',
            }}
          >
          <div className={styles.quote}>
          Programming Languages
          <div className={styles.edit}>
          {this.state.languageInfoEditing ? (
           <Button
            type="primary"
                  onClick={() => {
                    this.setState({ languageInfoEditing: false });
                  }}
                >
                  submit
                </Button>
          ) : (
            <Button
            type="primary"
                  onClick={() => {
                    this.setState({ languageInfoEditing: true });
                  }}
                >
                  Edit
                </Button>
          )}
          </div>
          <Form
            className={styles.form}>
            <Row>
            <FormItem style={{ margin: "10px", width: "300px" }}>
            Choice 1: Primary Language
            {this.state.languageInfoEditing ? (
              <Select defaultValue={this.state.first}
              onChange={value => {
                this.setState({ first: value });
              }}
              >
              <Option value="Python">Python</Option>
              <Option value="Java">Java</Option>
              <Option value="C++">C++</Option>
              <Option value="Golang">Golang</Option>
                </Select>
            ) : (
              <Input
                value={this.state.first}
              />
            )}

            </FormItem >
            <FormItem style={{ margin: "10px", width: "300px" }}>
            Choice 2: Secondary Language
            {this.state.languageInfoEditing ? (
              <Select defaultValue={this.state.second}
              onChange={value => {
                this.setState({ second: value });
              }}
              >
              <Option value="Python">Python</Option>
              <Option value="Java">Java</Option>
              <Option value="C++">C++</Option>
              <Option value="Golang">Golang</Option>
                </Select>
            ) : (
              <Input
                value={this.state.second}
              />
            )}
            </FormItem >
            <FormItem style={{ margin: "10px", width: "300px" }}>
            Choice 3: Back-up Language
            {this.state.languageInfoEditing ? (
              <Select defaultValue={this.state.third}
              onChange={value => {
                this.setState({ third: value });
              }}
              >
              <Option value="Python">Python</Option>
              <Option value="Java">Java</Option>
              <Option value="C++">C++</Option>
              <Option value="Golang">Golang</Option>
                </Select>
            ) : (
              <Input
                value={this.state.third}
              />
            )}
            </FormItem >
            </Row>
            </Form>
          </div>
          </Card>

          <Card
            bordered={false}
            bodyStyle={{
              padding: '5px 36px 14px 0',
            }}
          >
          <div className={styles.quote}>
          Frameworks and Libraries
          <div className={styles.edit}>
          {this.state.frameworkInfoEditing ? (
           <Button
            type="primary"
                  onClick={() => {
                    this.setState({ frameworkInfoEditing: false });
                  }}
                >
                  submit
                </Button>
          ) : (
            <Button
            type="primary"
                  onClick={() => {
                    this.setState({ frameworkInfoEditing: true });
                  }}
                >
                  Edit
                </Button>
          )}
          </div>
          <Form
            className={styles.form}>
            <FormItem style={{ margin: "20px", width: "300px" }}>
            Server-Side
            {this.state.frameworkInfoEditing ? (
              <Select mode="tags" defaultValue={this.state.server}
              onChange={value => {
                this.setState({ server: value });
              }}>
                  <Option value="Springboot">Spring Boot</Option>
                  <Option value="Django">Django</Option>
                  <Option value="Flask">Flask</Option>
                  <Option value="Express">Express</Option>
                </Select>
            ) : (
              <Input
                value={this.state.server}
              />
            )}
            </FormItem >
            <FormItem style={{ margin: "20px", width: "300px" }}>
            Client-side
            {this.state.frameworkInfoEditing ? (
              <Select mode="tags" defaultValue={this.state.client}
              onChange={value => {
                this.setState({ client: value });
              }}>
              <Option value="React">React</Option>
              <Option value="Angular">Angular</Option>
              <Option value="Vue">Vue</Option>
              </Select>
            ) : (
              <Input
                value={this.state.client}
              />
            )}
            </FormItem >
            </Form>
          </div>
          </Card>

          <Card
            bordered={false}
            bodyStyle={{
              padding: '5px 36px 14px 0',
            }}
          >
          <div className={styles.quote}>
          Rate my Skills
          <div className={styles.edit}>
          {this.state.ratingInfoEditing ? (
           <Button
            type="primary"
                  onClick={() => {
                    this.setState({ ratingInfoEditing: false });
                  }}
                >
                  submit
                </Button>
          ) : (
            <Button
            type="primary"
                  onClick={() => {
                    this.setState({ ratingInfoEditing: true });
                  }}
                >
                  Edit
                </Button>
          )}
          </div>
          <Form
            className={styles.form}>
            <FormItem style={{ margin: "20px", width: "300px" }}>
            My Frontend Skill Score
            {this.state.ratingInfoEditing ? (
              <Select defaultValue={this.state.frontendSkillScore}
              onChange={value => {
                this.setState({ frontendSkillScore: value });
              }}>
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                  <Option value="4">4</Option>
                  <Option value="5">5</Option>
                </Select>
            ) : (
              <Input
                value={this.state.frontendSkillScore}
              />
            )}
            </FormItem >
            <FormItem style={{ margin: "20px", width: "300px" }}>
            My Backend Skill Score
            {this.state.ratingInfoEditing ? (
              <Select defaultValue={this.state.backendSkillScore}
              onChange={value => {
                this.setState({ backendSkillScore: value });
              }}>
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                  <Option value="4">4</Option>
                  <Option value="5">5</Option>
                </Select>
            ) : (
              <Input
                value={this.state.backendSkillScore}
              />
            )}
            </FormItem >
            </Form>
          </div>
          </Card>

        </Col>
        </Row>
      </Page>
    )
  }
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
}

export default Dashboard
