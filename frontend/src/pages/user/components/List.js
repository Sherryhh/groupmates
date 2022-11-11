import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Button } from 'antd'
import { DropOption } from 'components'
import { t } from "@lingui/macro"
import { Trans } from "@lingui/macro"
import { Link } from 'umi'
import styles from './List.less'
import axios from 'axios'
import e from 'cors'
const { confirm } = Modal

class List extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      counts: 0,
      id: [],
      name: [],
      email: [],
      grade: [],
      language: [],
      skill: [],
    }
    this.displayUserInfo()
  }

  handleMenuClick = (record, e) => {
    const { onInviteItem, onHideItem } = this.props

    if (e.key === '1') {
      confirm({
        title: t`Are you sure to send invitation?`,
        onOk() {
          onInviteItem(record.id)
        },
      })
    } else if (e.key == '2') {
      confirm({
        title: t`Are you sure to hide this person?`,
        onOk() {
          onHideItem(record.id)
        },
      })
    }
  }

  displayUserInfo() {
    console.log('get all user info')
    const url = '/api/v1/getAllUserInfo';
    axios.get(url,{
      params: {
        open: 1,
      },                                   
    }).then((response) => {
      let a = response['data']
      console.log(a)
      let ids = []
      let names = []
      let emails = []
      let grades = []
      let languages = []
      let skills = []
      for (let index = 0; index < a.length; index++) {
        ids.push(a[index].id)
        names.push(a[index].name)
        emails.push(a[index].email)
        grades.push(a[index].year)
        let non_empty = []
        if (a[index].first != "") {
          non_empty.push(a[index].first)
        }
        if (a[index].second != "") {
          non_empty.push(a[index].second)
        }
        if (a[index].third != "") {
          non_empty.push(a[index].third)
        }
        if (non_empty.length == 0) {
          languages.push("")
        } else {
          let res = non_empty[0]
          for (let j = 1; j < non_empty.length; j++) {
            res = res + ", " + non_empty[j]
          }
          languages.push(res)
        }
        let s = ""
        if (a[index].server != "") {
          let all_s = JSON.parse(a[index].server)
          s = all_s[0]
          for (let j = 1; j < all_s.length; j++) {
            s = s + ", " + all_s[j]
          }
        }
        let c = ""
        if (a[index].client != "") {
          let all_c = JSON.parse(a[index].client)
          c = all_c[0]
          for (let j = 1; j < all_c.length; j++) {
            c = c + ", " + all_c[j]
          }
        }
        if (s == "" && c == ""){
          skills.push("")
        } else if (s == "") {
          skills.push(c)
        } else if (c == "") {
          skills.push(s)
        } else {
          skills.push(s+", "+c)
        }
      }
      this.setState({
        counts: a.length,
        id: ids,
        name: names,
        email: emails,
        grade: grades,
        language: languages,
        skill: skills
      })
    }).catch(error => {
        console.log('Get children list', error);
    });
  }

  render() {
    const { onInviteItem, onHideItem, ...tableProps } = this.props
    const all_data = []
    for (let i = 0; i < this.state.counts; i++) {
      const newItem = {
        "id": this.state.id[i],
        "name": this.state.name[i],
        "email": this.state.email[i],
        "grade": this.state.grade[i],
        "language": this.state.language[i],
        "skill": this.state.skill[i],
      }
      all_data.push(newItem)
    }

    const columns = [
      {
        title: <Trans>Name</Trans>,
        dataIndex: 'name',
        key: 'name',
        render: (text, record)=><Link to={`user/${record.id}`}>{text}</Link>,
      },
      { 
        title: <Trans>Email</Trans>,
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: <Trans>Grade</Trans>,
        dataIndex: 'grade',
        key: 'grade',
      },
      {
        title: <Trans>Programming Language</Trans>,
        dataIndex: 'language',
        key: 'language',
      },
      {
        title: <Trans>Frameworks</Trans>,
        dataIndex: 'skill',
        key: 'skill',
      },
      {
        title: <Trans>Invitation</Trans>,
        key: 'operation',
        fixed: 'right',
        render: (text, record) => {
          return (
            // <DropOption
            //   onMenuClick={e => this.handleMenuClick(record, e)}
            //   menuOptions={[
            //     { key: '1', name: t`Send Invite` },
            //     { key: '2', name: t`Hide this Person` }
            //   ]}
            // />
            <Button
            type="primary"
                  onClick={() => {
                  }}
                >
              Send
            </Button>
          )
        },
      },
    ]

    return (
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => t`Total ${total} Items`,
        }}
        className={styles.table}
        bordered
        scroll={{ x: 1200 }}
        dataSource={all_data}
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    )
  }
}

List.propTypes = {
  onInviteItem: PropTypes.func,
  onHideItem: PropTypes.func,
}

export default List
