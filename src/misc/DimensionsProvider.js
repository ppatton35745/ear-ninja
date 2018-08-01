import React from "react";
import Dimensions from "react-dimensions";

class DimensionsProvider extends React.Component {
  render() {
    return (
      <div className={this.props.className} fuck="me">
        {this.props.children({
          containerWidth: this.props.containerWidth,
          containerHeight: this.props.containerHeight
        })}
      </div>
    );
  }
}

export default Dimensions()(DimensionsProvider);
