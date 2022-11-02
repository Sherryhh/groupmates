import { Mock, Constant } from './_utils'

const { ApiPrefix, Color } = Constant

const Dashboard = Mock.mock({
})

module.exports = {
  [`GET ${ApiPrefix}/dashboard`](req, res) {
    res.json(Dashboard)
  },
}
