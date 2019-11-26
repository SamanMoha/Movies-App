import React from "react";
import './Cards.scss';

class Cards extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selectedItem : null,
      isHover: false
    }
  }

  onHover = () => { this.setState({isHover: true}) }

  onUnHover = () => { this.setState({isHover: false}) }

  render() {
    return (
      <div className='info-cards' onMouseOver={this.onHover} onMouseOut={this.onUnHover}>
        <span className='title'>{this.props.title}</span>
        <img src={"https://image.tmdb.org/t/p/original/"+this.props.imgSrc} alt={this.props.title}/>
          <div className="on-hover">
            <button>Plus dinfos</button>
          </div>
      </div>
    );
  }
}
export default Cards;
