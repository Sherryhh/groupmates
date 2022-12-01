import React, {PureComponent} from 'react'
import { Page } from 'components'
import { Table, Button, Row, Dropdown, Menu } from 'antd'
import styles from './index.less'
import { DropOption } from 'components'
import store from 'store'
import axios from 'axios';

class Chart extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      type: '',
      userId: store.get('user').id,
      requests: [],
    }
  }

  handleRequest(id, status){
    console.log('handle request info')
    const url = '/api/v1/handleRequest';
    axios.get(url,{
      params: {
        userId: this.state.userId,
        requestId: id,
        status: status,
      },
    }).then((response) => {
      this.getRequestInfo()
    }).catch(error => {
        console.log('Get request info', error);
    });
  }

  handleMenuClick = (record, e) => {
    if (e.key === '1') {
      this.handleRequest(record.id, 1)
    } else if (e.key === '2') {
      this.handleRequest(record.id, 2)
    }
  }

  getProgrammngLanguage(data){
    let languages = []
    console.log(data.first)
    if (data.first != "") {
      languages.push(data.first)
    }
    if (data.second != "") {
      languages.push(data.second)
    }
    if (data.third != "") {
      languages.push(data.third)
    }
    if (languages.length == 0) {
      return ""
    } else {
      let language = languages[0]
      for (let j = 1; j < languages.length; j++) {
        language = language + ", " + languages[j]
      }
      return language
    }
  }

  getSkills(data){
    let s = ""
    if (data.server != "") {
      let all_s = JSON.parse(data.server)
      s = all_s[0]
      for (let j = 1; j < all_s.length; j++) {
        s = s + ", " + all_s[j]
      }
    }
    let c = ""
    if (data.client != "") {
      let all_c = JSON.parse(data.client)
      c = all_c[0]
      for (let j = 1; j < all_c.length; j++) {
        c = c + ", " + all_c[j]
      }
    }
    if (s == "" && c == ""){
      return ""
    } else if (s == "") {
      return c
    } else if (c == "") {
      return s
    } else {
      return s+", "+c
    }
  }

  getRequestInfo(){
    console.log('get request info')
    const url = '/api/v1/getRequest';
    axios.get(url,{
      params: {
        userId: this.state.userId,
      },
    }).then((response) => {
      let data = response['data']
      console.log(data)
      let requests = []
      for (let index = 0; index < data.length; index++) {
        const newItem = {
          "id": data[index].id,
          "studentId": data[index].studentId,
          "name": data[index].name,
          "email": data[index].email,
          "major": data[index].major,
          "year": data[index].year,
          "languages": this.getProgrammngLanguage(data[index]),
          "skills": this.getSkills(data[index]),
          "status":data[index].status,
          "intro":data[index].intro,
        }
        requests.push(newItem)
      }
      this.setState({
        requests: requests
      })
      console.log(this.state.requests)
    }).catch(error => {
        console.log('Get request info', error);
    });
  }

  componentDidMount() {
    this.getRequestInfo();
  }

  render() {
    const {...tableProps } = this.props
    const columns = [
      {
        title: 'Student Name',
        dataIndex: 'name',
        key: 'name',
        // render: (text, record)=><Link to={`user/${record.id}`}>{text}</Link>,
        render: (text, record) => {
          const items = []
          for (let i = 0; i < this.state.requests.length; i++) {
            if (this.state.requests[i].id == record.id) {
              let tmp = "N/A"
              if (this.state.requests[i].intro != ""){
                tmp = this.state.requests[i].intro
              }
              items.push(
                {label: 'Self-introduction: '+ tmp, key: '1'}
              )
              break
            }
          }
          console.log(items)
          return (
            <Dropdown menu={{items}} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
              {text}
            </a>
          </Dropdown>
          )
        },
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Major',
        dataIndex: 'major',
        key: 'major',
      },
      {
        title: 'Grade',
        dataIndex: 'year',
        key: 'year',
      },
      {
        title: 'Programming Languages',
        dataIndex: 'languages',
        key: 'languages',
      },
      {
        title: 'Skills',
        dataIndex: 'skills',
        key: 'skills',
      },
      {
        title: 'Action',
        key: 'operation',
        render: (text, record) => {
          console.log(record)
          if(record.status === 0) {
            return (
              <div>
              <DropOption
                onMenuClick={e => this.handleMenuClick(record, e)}
                menuOptions={[
                  { key: '1', name: `Accept` },
                  { key: '2', name: `Reject` }
                ]}
              />
            </div>
            )
          } else {
            if(record.status === 1) {
              return (
              <div>
                Accepted
              </div>
              )
            } else {
              return (
              <div>
                Declined
              </div>
              )
            }
          }
        },
      },
    ]
    return (
      <Page>
        <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => `Total ${total} Items`,
        }}
        bordered
        scroll={{ x: 1200 }}
        className={styles.table}
        dataSource={this.state.requests}
        columns={columns}
        simple
        rowKey={record => record.id}
      />
      </Page>
    )
  }
}

export default Chart
