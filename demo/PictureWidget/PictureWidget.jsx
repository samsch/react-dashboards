import React from 'react';
import defaultPicture from './pingux.png';

class PictureWidget extends React.PureComponent {
  render () {
    return (
      <div className="widget-picture">
        <h2>{this.props.title}</h2>
        <div className="picture-wrapper">
          <img src={this.props.pictureUrl || defaultPicture} alt={this.props.alt} />
        </div>
      </div>
    );
  }
}
PictureWidget.propTypes = {
  title: React.PropTypes.string,
  pictureUrl: React.PropTypes.string,
  alt: React.PropTypes.string,
}
PictureWidget.defaultProps = {
  title: 'Default title',
};

export default PictureWidget;
