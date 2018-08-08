import React from "react";
import PropTypes from "prop-types";

export default class Header extends React.Component {
  render() {
    console.log("header children", this.props.children);
    return (
      <h2 className={this.props.className}>
        {this.props.children.map(span => {
          return <span className={span.className}>{span.value}</span>;
        })}
      </h2>
    );
  }
}
