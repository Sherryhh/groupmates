import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Avatar } from 'antd'
import { DropOption } from 'components'
import { t } from "@lingui/macro"
import { Trans } from "@lingui/macro"
import { Link } from 'umi'
import styles from './List.less'

const { confirm } = Modal

class List extends PureComponent {
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

  render() {
    const { onInviteItem, onHideItem, ...tableProps } = this.props

    const columns = [
      {
        title: <Trans>Name</Trans>,
        dataIndex: 'name',
        key: 'name',
      },
      { 
        title: <Trans>Email</Trans>,
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: <Trans>Grade</Trans>,
        dataIndex: 'Grade',
        key: 'grade',
      },
      {
        title: <Trans>Programming Language</Trans>,
        dataIndex: 'language',
        key: 'language',
      },
      {
        title: <Trans>Frameworks</Trans>,
        dataIndex: 'frameworks',
        key: 'frameworks',
      },
      {
        title: <Trans>Option</Trans>,
        key: 'operation',
        fixed: 'right',
        render: (text, record) => {
          return (
            <DropOption
              onMenuClick={e => this.handleMenuClick(record, e)}
              menuOptions={[
                { key: '1', name: t`Send Invite` },
                { key: '2', name: t`Hide this Person` }
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
        className={styles.table}
        bordered
        scroll={{ x: 1200 }}
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
