// @flow
import React from 'react';
import './App.scss';
import { Dashboard } from '../lib';
import '../lib/dashboard.css';
import { PictureWidget } from './PictureWidget';

const TextWidget = props => (
  <div>
    <h2>Text Widget</h2>
    <p>
      {props.text || 'Text example in a text widget.'}
    </p>
  </div>
);

class App extends React.PureComponent {
  render() {
    return (
      <div className="app">
        <div className="header">
          <h1>React Dashboards Framework</h1>
        </div>
        <div className="body">
          <div className="sidebar">
            <h2>Options</h2>
          </div>
          <main>
            <Dashboard
              widgets={{
                topRight: TextWidget,
                topLeft: PictureWidget,
                topCenter: TextWidget,
                bottomRight: TextWidget,
              }}
            />
          </main>
        </div>
      </div>
    );
  }
}

export default App
