import React, { PureComponent } from 'react'
import { Table } from 'antd'
import { t } from "@lingui/macro"
import { Ellipsis, DropOption } from 'components'
import styles from './List.less'
import PropTypes from 'prop-types'

class List extends PureComponent {
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

  render() {
    const { onInviteItem, onJoinItem, onLearnItem, ...tableProps } = this.props
    const columns = [
      {
        title: t`Team Name`,
        dataIndex: 'title',
        render: text => (
          <Ellipsis tooltip length={30}>
            {text}
          </Ellipsis>
        ),
      },
      {
        title: t`Group Leader`,
        dataIndex: 'author',
      },
      {
        title: t`Languages`,
        dataIndex: 'categories',
      },
      {
        title: t`Looking for...`,
        dataIndex: 'comments',
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
