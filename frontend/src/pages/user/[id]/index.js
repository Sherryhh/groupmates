import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Page } from 'components'
import styles from './index.less'
import { Row, Col, Button, Popconfirm, Form, Input, Table } from 'antd'

@connect(({ userDetail }) => ({ userDetail }))
class UserDetail extends PureComponent {
  render() {
    return (
      <Page inner>
        <Row>hiiii</Row>
      </Page>
    )
  }
}

UserDetail.propTypes = {
  userDetail: PropTypes.object,
}

export default UserDetail
