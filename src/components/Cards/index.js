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
        <span className='title'>{this.props.movieData.title}</span>
        <img className="movie-photo" src={"https://image.tmdb.org/t/p/original/"+this.props.movieData.backdrop_path} alt={this.props.movieData.title}/>
        <img className="movie-poster" src={"https://image.tmdb.org/t/p/w500/"+this.props.movieData.poster_path} alt={this.props.movieData.title}/>
          <div className="movie-infos">
            <p> <b>Date de sortie:</b> {this.props.movieData.release_date}</p>
            <p> <b> Note:</b> {this.props.movieData.vote_average}</p>
            <p>{this.props.movieData.overview}</p>
          </div>
      </div>
    );
  }
}
export default Cards;
