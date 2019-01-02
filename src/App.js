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
    const anchorOffset = selectionObj.anchorOffset;
    const focusOffset = selectionObj.focusOffset;
    const forward = (focusOffset - anchorOffset)>0;
    let selectionStart = forward? anchorOffset: focusOffset;

    console.log({
      anchorNode,
      focusNode,
      position: anchorNode.compareDocumentPosition(focusNode),
      anchorOffset: selectionObj.anchorOffset,
      focusOffset: selectionObj.focusOffset
    });

    if (anchorNode.parentNode.getAttribute('data-order')
      && anchorNode.parentNode.getAttribute('data-order') === 'middle') {
      selectionStart += this.state.selectionStart;
    }
    if (anchorNode.parentNode.getAttribute('data-order')
      && anchorNode.parentNode.getAttribute('data-order') === 'last') {
      selectionStart += this.state.selectionEnd;
    }
    const selectionEnd = selectionStart + selection.length;
    console.log(selectionStart,selectionEnd);
    
    const first = this.state.text.slice(0, selectionStart);
    const middle = this.state.text.slice(selectionStart, selectionEnd);
    const last = this.state.text.slice(selectionEnd);
    const span = document.createElement('span');

    this.props.customClass ? span.setAttribute('class', this.props.customClass) :
      span.setAttribute('class', 'test');
    this.setState({
      selection,
      anchorNode,
      focusNode,
      selectionStart,
      selectionEnd,
      first,
      middle,
      last
    });
    if (this.props.selectionHandler) {
      this.props.selectionHandler({
        selection,
        selectionStart,
        selectionEnd
      });
    }
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
  constructor() {
    super();
    this.selectionHandler = this.selectionHandler.bind(this);
  }

  selectionHandler(selection) {
   //do something with selection
  }
  render() {
    const text = `We present the first class of mathematically rigorous, general, .`;
    return (
      <HighLighter
        text={text}
        selectionHandler={this.selectionHandler}
        customClass='test'
      />
    );
  }
}

export default App;
