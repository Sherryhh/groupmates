import React, { PureComponent, useState, useEffect } from 'react'
import { Table } from 'antd'
import { t } from "@lingui/macro"
import { Ellipsis, DropOption } from 'components'
import styles from './List.less'
import PropTypes from 'prop-types'
import store from "store"
import axios from 'axios';

// function read(){
//   const [state, setstate] = useState({});
//   const [loading, setloading] = useState(true);
//   useEffect(() => {
//     getData();
//   }, []);
//   const getData = async () => {
//     const url = '/api/v1/displayGroupInfo';
//     await axios.get(url,{
//       params: {
//         groupId: store.get('user').id,
//       },                                   
//     }).then(
//       res => {
//         setloading(false);
//         setstate(
//           res.data.map(row => ({
//             name: row.name,
//             leader: row.leader,
//             language: row.language,
//             skill: row.skill,
//           }))
//         );
//       }
//     );
//   };
//   columns = [
//     {
//       title: t`Team Name`,
//       dataIndex: 'name',
//     },
//     {
//       title: t`Group Leader`,
//       dataIndex: 'leader',
//     },
//     {
//       title: t`Languages`,
//       dataIndex: 'language',
//     },
//     {
//       title: t`Looking for...`,
//       dataIndex: 'skill',
//     },
//   ];
//   return columns
// }

class List extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name:"",
      email:"",
      leader:"",
      skill:"",
    };
    this.displayGroupInfo()
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
    const url = '/api/v1/displayGroupInfo';
    axios.get(url,{
      params: {
        groupId: store.get('user').id,
      },                                   
    }).then((response) => {
      console.log(response)
      this.setState({
        name: response['data']['name'],
        leader: response['data']['leader'],
        language: response['data']['language'],
        skill: response['data']['skill'],
      })
    }).catch(error => {
        console.log('Get children list', error);
    });
  }

  render() {
    const { onInviteItem, onJoinItem, onLearnItem, ...tableProps } = this.props
    const columns = [
      // ...read(),
      {
        title: t`Team Name`,
        // dataIndex: 'name',
      },
      {
        title: t`Group Leader`,
        // dataIndex: 'leader',
      },
      {
        title: t`Languages`,
        // dataIndex: 'language',
      },
      {
        title: t`Looking for...`,
        // dataIndex: 'skill',
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
