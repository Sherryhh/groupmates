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
import axios from 'axios';
import styles from './index.less'

const FormItem = Form.Item

@connect(({ loading, dispatch }) => ({ loading, dispatch }))
class Signup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
    }
  }

  addUser() {
    console.log('add current user')
    const url = '/api/v1/addUser';
    axios.get(url,{
      params: {
        name: this.state.name,
        password: this.state.password
      },                                   
    }).then((response) => {
      console.log(response)
    }).catch(error => {
        console.log('Get children list', error);
    });
    history.push('/login')
  }

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
                  placeholder={`Username`}
                  value={this.state.name}
                  onChange={(e)=>{
                    this.setState({name: e.target.value});
                  }}
                />
            </FormItem>
            <FormItem name="password" rules={[{ required: true }]} hasFeedback>
            <Input  placeholder={`Password`} type='password' value={this.state.password} required 
            onChange={(e)=>{
                  this.setState({password: e.target.value});
                }}/>
            </FormItem>
            <Row>
            <Button
              type="primary"
              onClick={() => this.addUser()}
            >
              Sign up
            </Button>
            </Row>
          </Form>
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
