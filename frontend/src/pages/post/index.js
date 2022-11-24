import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Row, Table, Button, Dropdown, Menu } from 'antd'
import { Link } from 'umi'
import { stringify } from 'qs'
import { Page, DropOption } from 'components'
import List from './components/List'
import styles from './components/List.less'
import axios from 'axios'
import store from 'store'

// @connect(({ post, loading }) => ({ post, loading }))
class Post extends PureComponent {
  constructor(props) {
    super(props);
    this.a = []
    this.state = {
      all_data: [],
      member_data: [],
    }
    this.displayGroupInfo()
  }

  displayGroupInfo(){
    console.log('get all group info')
    const url = '/api/v1/getAllGroupInfo';
    axios.get(url,{
      params: {
        open: 1,
      },                                   
    }).then((response) => {
      this.a = response['data']
      const all_data = []
      for (let index = 0; index < this.a.length; index++) {
        const newItem = {
          "id": this.a[index].key,
          "name": this.a[index].name,
          "language": this.a[index].language,
          "skill": this.a[index].skill,
          "leader": this.a[index].leader
        }
        all_data.push(newItem)
      }
      this.setState({
        all_data: all_data,
      })
    }).catch(error => {
        console.log('Get children list', error);
    });
    
    console.log('get all unopen users')
    const url2 = '/api/v1/getAllUserInfo';
    axios.get(url2,{
      params: {
        open: 0,
      },                                   
    }).then((response) => {
      let a = response['data']
      console.log(a)
      const member_data = []
      for (let i = 0; i < a.length; i++) {
        const newItem = {
          "id": a[i].id,
          "name": a[i].name,
          "email": a[i].email,
          "major": a[i].major,
          "grade": a[i].year,
          "language": this.getProgrammngLanguage(a[i]),
          "skill": this.getSkills(a[i]),
          "intro": a[i].intro,
          "groupId": a[i].groupId,
        }
        member_data.push(newItem)
      }
      console.log(member_data)
      this.setState({
        member_data: member_data,
      })
    }).catch(error => {
        console.log('Get children list', error);
    });
  }

  sendGroupRequest(id){
    console.log('send request')
    const url = '/api/v1/sendGroupRequest'
    axios.get(url,{
      params: {
        userId: store.get('user').id,
        target: id,
      },                                   
    }).then((response) => {
    }).catch(error => {
      console.log('Get children list', error);
    });

  }

  getProgrammngLanguage(data){
    let languages = []
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

  // get listProps() {
  //   const { post, loading, location } = this.props
  //   const { list, pagination } = post
  //   const { query, pathname } = location

  //   return {
  //     pagination,
  //     dataSource: list,
  //     loading: loading.effects['post/query'],
  //     onJoinItem(page) {
  //     },
  //     onHideItem(page) {
  //     },
  //   }
  // }

  render() {
    const { ...tableProps } = this.props
    const columns = [
      {
        title: 'Team Name',
        dataIndex: 'name',
        key: 'name',
        // render: (text, record)=><Link to={`post/${record.id}`}>{text}</Link>,
        render: (text, record) => {
          const items = []
          for (let i = 0; i < this.state.all_data.length; i++) {
            if (this.state.all_data[i].id == record.id) {
              let tmp = "N/A"
              if (this.state.all_data[i].leader != ""){
                tmp = this.state.all_data[i].leader
              }
              items.push(
                {label: 'Group-leader: '+ tmp, key: '1'}
              )
              break
            }
          }
          
          let count = 0
          for (let i = 0; i < this.state.member_data.length; i++) {
            if (this.state.member_data[i].groupId == record.id) {
              count++
              let tmp = "N/A"
              let intro = "N/A"
              if (this.state.member_data[i].intro != "") {
                intro = this.state.member_data[i].intro
              }
              if (this.state.member_data[i].name != ""){
                tmp = "Member" + count + ": " + this.state.member_data[i].name + ";  " 
                    + "Email: " + this.state.member_data[i].email + ";  " 
                    + "Major: " + this.state.member_data[i].major + ";  "
                    + "Grade: " + this.state.member_data[i].grade + ";  "
                    // + "Language:" + this.state.member_data[i].language + "; "
                    // + "Skill:" + this.state.member_data[i].skill + "; "
                    + "Intro: " + intro
              }
              items.push(
                {label: tmp, key: count + 1}
              )
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
        title: 'Languages',
        dataIndex: 'language',
        key: 'language',
      },
      {
        title: 'Looking for...',
        dataIndex: 'skill',
        key: 'skill',
      },
      {
        title: 'Join Request',
        render: (text, record) => {
          return (
            <Button
            type="primary"
                  onClick={() => {
                    this.sendGroupRequest(record.id)
                  }}
                >
              Send
            </Button>
          )
        },
      },
    ]

    return (
      <Page inner>
        {(
          <Row style={{ marginBottom: 16, fontSize: 20 }}>Looking for Groups</Row>
        )}
        {/* <List {...this.listProps} /> */}
        <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => `Total ${total} Items`,
        }}
        bordered
        scroll={{ x: 1200 }}
        className={styles.table}
        dataSource={this.state.all_data}
        columns={columns}
        simple
        rowKey={record => record.id}
      />
      </Page>
    )
  }
}

Post.propTypes = {
  post: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default Post
