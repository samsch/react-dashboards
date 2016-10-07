// @flow
import React from 'react';
import './App.scss';
import { Dashboard } from './Dashboard';
import { PictureWidget } from './PictureWidget';

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
                textWidget: props => (
                  <div>
                    <h2>Text Widget</h2>
                    <p>
                      {props.text || 'Text example in a text widget.'}
                    </p>
                  </div>
                ),
                pictureWidget: PictureWidget,
              }}
              layout={[
                {
                  id: 'row1',
                  type: 'row',
                  height: '10rem',
                  children: [
                    {
                      id: 'w1',
                      type: 'widget',
                      size: 20,
                      widget: 'textWidget',
                      //widget: 'textWidget',
                      props: {
                        text: 'Hey there! Check out the customizations you can do!',
                      }
                    },
                    {
                      id: 'w2',
                      type: 'widget',
                      size: 5,
                      widget: 'pictureWidget',
                      //widget: 'pictureWidget',
                      props: {
                        title: 'This is a picture Widget!',
                      }
                    }
                  ],
                },
                {
                  id: 'row2',
                  type: 'row',
                  height: '10rem',
                  children: [
                    {
                      id: 'w3',
                      type: 'widget',
                      widget: 'textWidget',
                      props: {
                        text: 'Pizza is relatively healthy.',
                      }
                    },
                    {
                      id: 'w4',
                      type: 'widget',
                      widget: 'pictureWidget',
                      props: {
                        title: 'This is a picture Widget!',
                      }
                    },
                    {
                      id: 'w5',
                      type: 'widget',
                      size: 20,
                      widget: 'textWidget',
                      props: {
                        text: 'Green beans are not very tasty.',
                      }
                    },
                    {
                      id: 'w6',
                      type: 'widget',
                      widget: 'pictureWidget',
                      props: {
                        title: 'This is another picture Widget!',
                      }
                    },
                    {
                      id: 'w7',
                      type: 'widget',
                      size: 5,
                      widget: 'textWidget',
                      props: {
                        text: 'Ice cream and cake are a very good deserts.',
                      }
                    },
                  ],
                },
              ]}
            />
          </main>
        </div>
      </div>
    );
  }
}

export default App
