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
class Login extends PureComponent {

  render() {
    const { dispatch, loading } = this.props

    const handleOk = values => {
      dispatch({ type: 'login/login', payload: values })
    }

    return (
      <Fragment>
        <div className={styles.form}>
          <div className={styles.logo}>
            {/* <img alt="logo" src={config.logoPath} /> */}
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
                htmlType="submit"
                loading={loading.effects.login}
              >
                <Trans>Sign in</Trans>
              </Button>

              <Button
                type="secondary"
                onClick={() => history.push('/signup')}
              >
                <Trans>Sign up</Trans>
              </Button>
            </Row>
          </Form>
        </div>
      </Fragment>
    )
  }
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Login