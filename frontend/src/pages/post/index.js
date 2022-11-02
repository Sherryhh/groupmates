import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Row } from 'antd'
import { history } from 'umi'
import { stringify } from 'qs'
import { Page } from 'components'
import List from './components/List'


@connect(({ post, loading }) => ({ post, loading }))
class Post extends PureComponent {
  handleTabClick = key => {
    const { pathname } = this.props.location

    history.push({
      pathname,
      search: stringify({
        status: key,
      }),
    })
  }

  get listProps() {
    const { post, loading, location } = this.props
    const { list, pagination } = post
    const { query, pathname } = location

    return {
      pagination,
      dataSource: list,
      loading: loading.effects['post/query'],
      onJoinItem(page) {
      },
      onHideItem(page) {
      },
      onLearnItem(page) {
      },
    }
  }

  render() {
    const { location } = this.props
    const { query } = location

    return (
      <Page inner>
        {(
          <Row style={{ marginBottom: 16, fontSize: 20 }}>Looking for Groups</Row>
        )}
        <List {...this.listProps} />
      </Page>
    )
  }
}

Post.propTypes = {
  post: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default Post
