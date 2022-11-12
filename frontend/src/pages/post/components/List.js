import React, { PureComponent, useState, useEffect } from 'react'
import { Table, Button } from 'antd'
import { Ellipsis, DropOption } from 'components'
import styles from './List.less'
import PropTypes from 'prop-types'
import axios from 'axios';
import { Link } from 'umi'

class List extends PureComponent {
  constructor(props) {
    super(props);
    this.a = []
    this.state = {
      id: [],
      name: [],
      language: [],
      skill: [],
    }
    this.displayGroupInfo()
  }
  handleMenuClick = (record) => {
    const { onJoinItem, onHideItem } = this.props
    if (e.key === '1') {
      onJoinItem(record.id)
    } else if (e.key === '2') {
      onHideItem(record.id)
    }
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
      let ids = []
      let names = []
      let languages = []
      let skills = []
      for (let index = 0; index < this.a.length; index++) {
        ids.push(this.a[index].key)
        names.push(this.a[index].name)
        languages.push(this.a[index].language)
        skills.push(this.a[index].skill)
      }
      this.setState({
        id: ids,
        name: names,
        language: languages,
        skill: skills
      })
    }).catch(error => {
        console.log('Get children list', error);
    });
  }

  render() {
    const { onInviteItem, onJoinItem, ...tableProps } = this.props
    const all_data = []
    for (let i = 0; i < this.a.length; i++) {
      const newItem = {
            "id": this.state.id[i],
            "name": this.state.name[i],
            "language": this.state.language[i],
            "skill": this.state.skill[i],
      }
      all_data.push(newItem)
    }
    const columns = [
      {
        title: 'Team Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record)=><Link to={`post/${record.id}`}>{text}</Link>,
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
        title: 'Join Reques',
        render: (text, record) => {
          return (
            // <DropOption
            //   onMenuClick={e => this.handleMenuClick(record, e)}
            //   menuOptions={[
            //     { key: '1', name: 'Ask to Join` },
            //     { key: '2', name: 'Hide this Group` },
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
          showTotal: total => `Total ${total} Items`,
        }}
        bordered
        scroll={{ x: 1200 }}
        className={styles.table}
        dataSource={all_data}
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    )
  }
}

List.propTypes = {
  onJoinItem: PropTypes.func,
  onHideItem: PropTypes.func,
}
export default List
