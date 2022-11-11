import React, { PureComponent } from 'react'
import { Page } from 'components'
import { Row, Col, Card, Form, Input, Select, Button} from 'antd'
import styles from './index.less'
const FormItem = Form.Item;
class Chart extends PureComponent {
  constructor() {
    super()
    this.state = {
      basicInfoEditing: false,
      name: "",
    }
  }
  render() {
    return (
      <Page className={styles.dashboard}>
          <Row gutter={24}>
          <Col lg={30} md={24}>
            <Card
              bordered={false}
              bodyStyle={{
                padding: '5px 36px 14px 0',
              }}
            >
              <div className={styles.quote}>
              Group Information
              <div className={styles.edit}>
                {this.state.basicInfoediting ? (
                  <Button
                  type="primary"
                        onClick={() => {
                          this.setState({ basicInfoediting: false });
                          // this.editUserInfo();
                        }}
                      >
                        submit
                      </Button>
                ) : (
                  <Button
                  type="primary"
                        onClick={() => {
                          this.setState({ basicInfoediting: true });
                        }}
                      >
                        Edit
                      </Button>
                )}
              </div>
              <Form
                className={styles.form}>
                <Row>
                <FormItem style={{ margin: "10px", width: "200px" }}>
                Group Name
                {this.state.basicInfoediting ? (
                  <Input
                    placeholder={"Group Name"}
                    value={this.state.name}
                    onChange={(e)=>{
                      this.setState({name: e.target.value});
                    }}
                  />
                ) : (
                  <Input
                    disabled = {true}
                    value={this.state.name}
                  />
                )}
                </FormItem>
                </Row>
              </Form>
              </div>
            </Card>

        </Col>
        </Row>
      </Page>
    )
  }
}

export default Chart
