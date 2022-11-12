import React, {PureComponent} from 'react'
import { Page } from 'components'
import { Table, Button } from 'antd'
import styles from './index.less'
import { t } from "@lingui/macro"
import PropTypes from 'prop-types'
import { DropOption } from 'components'
import { Link } from 'umi'

class Chart extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      type: '',
    }
  }

  handleMenuClick = (record, e) => {
  }

  render() {
    const {...tableProps } = this.props
    const all_data = [
      {"id":1, "type": "group", "name":"Apple", "language":"Python", "skill":"React"},
      {"id":3, "type": "student", "name":"Dexter", "language":"Python", "skill":"Flask"}
    ]
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record)=><Link to={`user/${record.id}`}>{text}</Link>,
      },
      {
        title: 'Programming Language',
        dataIndex: 'language',
        key: 'language',
      },
      {
        title: 'Frameworks',
        dataIndex: 'skill',
        key: 'skill',
      },
      {
        title: 'Request',
        key: 'operation',
        fixed: 'right',
        render: (text, record) => {
          return (
            <DropOption
              onMenuClick={e => this.handleMenuClick(record, e)}
              menuOptions={[
                { key: '1', name: t`Accept` },
                { key: '2', name: t`Reject` }
              ]}
            />
          )
        },
      },
    ]
    return (
      <Page>
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
      </Page>
    )
  }
}

export default Chart
