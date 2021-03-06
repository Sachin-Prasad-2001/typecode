import React, { useEffect, useState } from 'react';
import data from '../../code';
import "./editor.css";
import highlight from 'highlight.js';
import { findDOMNode } from 'react-dom';
import { Container } from 'semantic-ui-react';

const Cursor = props => {
  useEffect(() => {
    const cursorStyle = document.getElementById(String(props.active)).style;
    cursorStyle.background = 'green'
  })

  return (
    <span id={props.id}>{props.children}</span>
  )
}

class Editor extends React.Component {
  state = {
    totalTyped: 0,
    idx: 0
  }
  componentDidMount() {
    highlight.highlightBlock(findDOMNode(this.refs.code))
    document.addEventListener('keypress', this.handleKeyDown)
  }

  componentDidUpdate() {
    highlight.initHighlighting.called = false;
    highlight.highlightBlock(findDOMNode(this.refs.code))
    console.log(this.state.idx)
  }

  handleKeyDown(evt) {
    console.log(evt.key)
    console.log(this.state)
  }

  render() {
    return (
      <Container >
        <h1>Total Typed: {this.state.totalTyped}</h1>
        <pre>
          <code ref='code' className={'javascript'}>
            {[...data].map((r, i) =>
              <Cursor key={i} active={this.state.idx} id={i}>{r}</Cursor>)}
          </code>
        </pre>
      </Container>
    )
  }
}

export default Editor;