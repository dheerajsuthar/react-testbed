import React, { Component } from 'react';
import './App.css';

class HighLighter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
      isDirty: false,
      selection: '',
      anchorNode: '?',
      focusNode: '?',
      selectionStart: '?',
      selectionEnd: '?',
      first: '',
      middle: '',
      last: ''
    };
    this.onMouseUpHandler = this.onMouseUpHandler.bind(this);
  }

  onMouseUpHandler(e) {
    e.preventDefault();
    const selectionObj = (window.getSelection && window.getSelection());
    const selection = selectionObj.toString();
    const anchorNode = selectionObj.anchorNode;
    const focusNode = selectionObj.focusNode;
    let selectionStart = selectionObj.anchorOffset;

    if (anchorNode.parentNode.getAttribute('data-order')
      && anchorNode.parentNode.getAttribute('data-order') === 'middle') {
      selectionStart += this.state.selectionStart;
    }
    if (anchorNode.parentNode.getAttribute('data-order')
      && anchorNode.parentNode.getAttribute('data-order') === 'last') {
      selectionStart += this.state.selectionEnd;
    }
    const selectionEnd = selectionStart + selection.length;
    const first = this.state.text.slice(0, selectionStart);
    const middle = this.state.text.slice(selectionStart, selectionEnd);
    const last = this.state.text.slice(selectionEnd);
    const range = selectionObj.getRangeAt(0);
    const span = document.createElement('span');
    debugger;
    span.setAttribute('class', 'test');
    debugger;
    this.setState({
      selection,
      range,
      anchorNode,
      focusNode,
      selectionStart,
      selectionEnd,
      first,
      middle,
      last
    });

  }

  render() {
    if (!this.state.selection) {
      return (
        <span
          onMouseUp={this.onMouseUpHandler}>{this.state.text}
        </span>
      )
    } else {
      return (
        <span
          onMouseUp={this.onMouseUpHandler}>
          <span
            data-order="first" >
            {this.state.first}
          </span>
          <span
            data-order="middle"
            className="test">
            {this.state.middle}
          </span>
          <span
            data-order="last">
            {this.state.last}
          </span>
        </span>
      )
    }

  }
}


class App extends Component {
  render() {
    const text = `We present the first class of mathematically rigorous, general, .`;
    return (
      <HighLighter
        text={text}
        customClass='test'
      />
    );
  }
}

export default App;
