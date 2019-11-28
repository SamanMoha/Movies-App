import React from "react";
import './Tag.scss';

class Tag extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <p key={this.props.data.id} className="tag" title={this.props.data.text}>
        {this.props.data.text}
        <span title="supprimer" className="close" id={this.props.data.id} onClick={this.props.removeFilteredByPerson}></span>
      </p>
    );
  }
}
export default Tag;
