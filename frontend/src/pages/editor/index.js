import { Component } from 'react'
import { Editor, Page } from 'components'

export default class EditorPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editorContent: null,
    }
  }

  onEditorStateChange = editorContent => {
    this.setState({
      editorContent,
    })
  }

  render() {
    return (
      <Page inner>
      </Page>
    )
  }
}
