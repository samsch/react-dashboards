// @flow
import React from 'react';

const Layout = props => {
  if(props.type === 'row') {
    return (
      <div className="dashboard-row" style={{minHeight: props.height}}>
        {props.children.map(childLayout=>(
          <Layout key={childLayout.id} {...childLayout} widgets={props.widgets} />
        ))}
      </div>
    );
  }
  if(props.type === 'widget') {
    const Widget = (typeof props.widget === 'string') ? (props.widgets[props.widget]) : props.widget;
    const style = {
      flex: (props.size || 10) + ' 0 auto',
    };
    return (
      <div className="dashboard-widget" style={style} >
        <Widget {...props.props} />
      </div>
    );
  }
  throw new Error('Layout must be give a type of "row" or "widget".');
};

class Dashboard extends React.PureComponent {
  static defaultProps = {
    widgets: {},
  }
  render () {
    return (
      <div className="component-dashboard">
        {this.props.layout.map(layout=>(
          <Layout key={layout.id} {...layout} widgets={this.props.widgets} />
        ))}
      </div>
    );
  }
}
Dashboard.propTypes = {
  widgets: React.PropTypes.object,
  layout: React.PropTypes.array.isRequired,
}

export default Dashboard;
