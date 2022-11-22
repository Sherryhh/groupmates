import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Row, Table, Button } from 'antd'
import { Link } from 'umi'
import { stringify } from 'qs'
import { Page } from 'components'
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
      all_data: []
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
        }
        all_data.push(newItem)
      }
      this.setState({
        all_data: all_data,
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
