import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Button, Row, Input, Form } from 'antd'
import { GlobalFooter } from 'components'
import { GithubOutlined } from '@ant-design/icons'
import { t, Trans } from "@lingui/macro"
import { setLocale } from 'utils'
import config from 'utils/config'
import { history } from 'umi'

import styles from './index.less'

const FormItem = Form.Item

@connect(({ loading, dispatch }) => ({ loading, dispatch }))
class Signup extends PureComponent {

  render() {
    const { dispatch,   loading } = this.props

    const handleOk = values => {
      dispatch({ type: 'login/login', payload: values })
    }
    let footerLinks = [
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/zuiidea/antd-admin',
        blankTarget: true,
      },
    ]

    if (config.i18n) {
      footerLinks = footerLinks.concat(
        config.i18n.languages.map(item => ({
          key: item.key,
          title: (
            <span onClick={setLocale.bind(null, item.key)}>{item.title}</span>
          ),
        }))
      )
    }

    return (
      <Fragment>
        <div className={styles.form}>
          <div className={styles.logo}>
            <img alt="logo" src={config.logoPath} />
            <span>{config.siteName}</span>
          </div>
          <Form
            onFinish={handleOk}
            >
            <FormItem name="username"
              rules={[{ required: true }]} hasFeedback>
                <Input
                  placeholder={t`Username`}
                />
            </FormItem>
            <Trans id="Password" render={({translation}) => (
              <FormItem name="password" rules={[{ required: true }]} hasFeedback>
              <Input type='password' placeholder={translation} required />
              </FormItem>)}
            />
            <Row>
            <Button
              type="primary"
              onClick={() => history.push('/login')}
            >
              <Trans>Sign up</Trans>
            </Button>
              <p>
                <span className="margin-right">
                  <Trans>Username</Trans>
                  ：guest
                </span>
                <span>
                  <Trans>Password</Trans>
                  ：guest
                </span>
              </p>
            </Row>
          </Form>
        </div>
        <div className={styles.footer}>
          <GlobalFooter links={footerLinks} copyright={config.copyright} />
        </div>
      </Fragment>
    )
  }
}

Signup.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Signup
