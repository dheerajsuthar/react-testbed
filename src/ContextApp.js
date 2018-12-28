import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const theme = {
  light: {
    color: 'yellow'
  },
  dark: {
    color: 'blue'
  }
};

const ThemeContext = React.createContext(theme.dark);

class ThemedButton extends React.Component {
  static contextType = ThemeContext;
  render() {
    return (
      <button style={{ backgroundColor: this.context.color }}>Change theme</button>
    );
  }
}
class ContextApp extends Component {
  render() {
    return (
      <div>
        <section>
          <ThemedButton />
          <ThemeContext.Provider value={theme.light}>
           <ThemeContext.Consumer>
             {(context) => <button style={{backgroundColor: context.color}}>Light Theme</button>}
           </ThemeContext.Consumer>
          </ThemeContext.Provider>
        </section>
      </div>
    );
  }
}

export default ContextApp;
