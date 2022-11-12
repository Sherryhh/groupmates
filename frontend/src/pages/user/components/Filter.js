import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'
import { Trans } from "@lingui/macro"
import { t } from "@lingui/macro"
import { Button, Row, Col, DatePicker, Form, Input, Cascader } from 'antd'

const { Search } = Input

const ColProps = {
  // xl: 24,
  // sm: 12,
  style: {
    fontSize: 20,
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  // xl: 96,
}

class Filter extends Component {
  formRef = React.createRef()

  handleSubmit = () => {
    const { onFilterChange } = this.props
    const values = this.formRef.current.getFieldsValue()
    const fields = this.handleFields(values)
    onFilterChange(fields)
  }

  handleChange = (key, values) => {
    const { onFilterChange } = this.props
    let fields = this.formRef.current.getFieldsValue()
    fields[key] = values
    fields = this.handleFields(fields)
    onFilterChange(fields)
  }
  
  handleReset = () => {
    const fields = this.formRef.current.getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    this.formRef.current.setFieldsValue(fields)
    this.handleSubmit()
  }

  render() {
    const { onSort, filter } = this.props
    const { name } = filter

    return (
      <Form ref={this.formRef} name="control-ref" initialValues={{ name }}>
        <Row gutter={24}>
          <Col {...ColProps} xl={{ span: 6 }} md={{ span: 1 }}>
            Looking for individuals
          </Col>
          <Col {...ColProps} xl={{ span: 4 }} md={{ span: 1 }}>
          </Col>
          <Col {...ColProps} xl={{ span: 4 }} md={{ span: 1 }}>
            <Form.Item name="name">
              <Search
                placeholder={'Search Name'}
                onSearch={this.handleSubmit}
              />
            </Form.Item>
          </Col>
          <Col
            {...TwoColProps}
            xl={{ span: 10 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
          >
            <Row type="flex" justify="space-between">
              <div>
                <Button
                  type="primary" htmlType="submit"
                  className="margin-right"
                  onClick={this.handleSubmit}
                >
                  Search
                </Button>
                <Button onClick={this.handleReset}>
                  Reset
                </Button>
              </div>
              <Button type="ghost" onClick={onSort}>
                Sort
              </Button>
            </Row>
          </Col>
        </Row>
      </Form>
    )
  }
}

Filter.propTypes = {
  onSort: PropTypes.func,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Filter
