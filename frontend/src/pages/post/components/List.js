import React, { PureComponent, useState, useEffect } from 'react'
import { Table } from 'antd'
import { t } from "@lingui/macro"
import { Ellipsis, DropOption } from 'components'
import styles from './List.less'
import PropTypes from 'prop-types'
import axios from 'axios';

const all_data = [{"id":3, "open": 1, "name":"Peach", "leader":"Yellow", "language":"Python", "skill":"Java"},
{"id":4, "open": 1, "name":"Kiwi", "leader":"Green","language":"Java", "skill":"Python" }]
let hasPushed = false
class List extends PureComponent {
  constructor(props) {
    super(props);
    this.a = []
    if (hasPushed == false) {
      this.displayGroupInfo()
      hasPushed = true
    }
    // this.displayGroupInfo()
  }
  handleMenuClick = (record) => {
    const { onJoinItem, onLearnItem, onHideItem } = this.props
    if (e.key === '1') {
      onJoinItem(record.id)
    } else if (e.key === '2') {
      onLearnItem(record.id)
    } else if (e.key === '3') {
      onHideItem(record.id)
    }
  }

  displayGroupInfo(){
    console.log('get group info')
    const url = '/api/v1/getGroupInfo';
    axios.get(url,{
      params: {
        open: 1,
      },                                   
    }).then((response) => {
      this.a = response['data']
      for (let index = 0; index < this.a.length; index++) {
        const newItem = {
          "id": this.a[index].key,
          "name": this.a[index].name,
          "leader": this.a[index].leader,
          "language": this.a[index].language,
          "skill": this.a[index].skill,
        }
        all_data.push(newItem)
      }
    }).catch(error => {
        console.log('Get children list', error);
    });
  }

  render() {
    const { onInviteItem, onJoinItem, onLearnItem, ...tableProps } = this.props
    // const datas = [{"id":1, "open": 1, "name":"Apple", "leader":"Red", "language":"Python", "skill":"Java"},
    // {"id":2, "open": 1, "name":"Pear", "leader":"Green","language":"Java", "skill":"Python" }]
    // console.log(datas)
    // for (let index = 0; index < this.a.length; index++) {
    //   const newItem = {
    //     "id": this.a[index].key,
    //     "name": this.a[index].name,
    //     "leader": this.a[index].leader,
    //     "language": this.a[index].language,
    //     "skill": this.a[index].skill,
    //   }
    //   all_data.push(newItem)
    // }
    
    const columns = [
      {
        title: t`Team Name`,
        dataIndex: 'name',
        key: 'name',
        // render: () => <text>{this.state.name}</text>,
      },
      {
        title: t`Group Leader`,
        dataIndex: 'leader',
        key: 'leader',
        // render: () => <text>{this.state.leader}</text>,
      },
      {
        title: t`Languages`,
        dataIndex: 'language',
        key: 'language',
        // render: () => <text>{this.state.language}</text>,
      },
      {
        title: t`Looking for...`,
        dataIndex: 'skill',
        key: 'skill',
        // render: () => <text>{this.state.skill}</text>,
      },
      {
        title: t`Options`,
        render: (text, record) => {
          return (
            <DropOption
              onMenuClick={e => this.handleMenuClick(record, e)}
              menuOptions={[
                { key: '1', name: t`Ask to Join` },
                { key: '2', name: t`Learn More` },
                { key: '3', name: t`Hide this Group` }
              ]}
            />
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
  onLearnItem: PropTypes.func,
}
export default List
