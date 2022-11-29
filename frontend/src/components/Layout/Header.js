import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Menu, Layout, Avatar, Popover, Badge, List } from 'antd'
import { Ellipsis } from 'components'
import {
  BellOutlined,
  RightOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import { Trans } from "@lingui/macro"
import classnames from 'classnames'
import config from 'config'
import styles from './Header.less'

const { SubMenu } = Menu

class Header extends PureComponent {
  handleClickMenu = e => {
    e.key === 'SignOut' && this.props.onSignOut()
  }
  render() {
    const {
      fixed,
      username,
      collapsed,
      onCollapseChange,
    } = this.props

    const rightContent = [
      <Menu key="user" mode="horizontal" onClick={this.handleClickMenu}>
        <Fragment>
          <span style={{ color: '#999', marginRight: 4 }}>
            Hi,
          </span>
          <span>{username}</span>
        </Fragment>
        <Menu.Item key="SignOut">
          Sign out
        </Menu.Item>
      </Menu>,
    ]

    return (
      <Layout.Header
        className={classnames(styles.header, {
          [styles.fixed]: fixed,
          [styles.collapsed]: collapsed,
        })}
        id="layoutHeader"
      >
        <div
          className={styles.button}
          onClick={onCollapseChange.bind(this, !collapsed)}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
        <div className={styles.rightContainer}>{rightContent}</div>
      </Layout.Header>
    )
  }
}

Header.propTypes = {
  fixed: PropTypes.bool,
  user: PropTypes.object,
  menus: PropTypes.array,
  collapsed: PropTypes.bool,
  onSignOut: PropTypes.func,
  notifications: PropTypes.array,
  onCollapseChange: PropTypes.func,
  onAllNotificationsRead: PropTypes.func,
}

export default Header
