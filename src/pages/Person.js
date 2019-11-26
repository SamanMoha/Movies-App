import React from "react";
import API from "../utils/API";
import DropdownFilter from '../components/DropdownFilter'
import MultiSelectList from '../components/MultiSelectList'
import Loading from '../components/Loading'
import Cards from '../components/Cards'
import './Person.scss'

class Person extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      personData: [],
      isLoaded: false,
      movies: [
        {
          id: null,
          title: null,
          poster_path: null,
          release_date: null,
          vote_average: null
        }
      ]
    }
  }

  async componentDidMount() {
  const ids = [1245, 3223, 11701, 85, 16828, 74568, 51329, 239019, 10990, 524]
   // //let userData = await API.get('/person/'+id)
   // console.log("response ", userData)

  let personData = ids.map(id => {
  return API
    .get('/person/'+id+'?append_to_response=movie_credits')
    .then(res => res.data)
    .catch(e => console.error(e));
  })
  Promise.all(personData).then(res =>
    this.setState({personData : res, isLoaded: true})
  );
 }

 /** Search method */
handleSearchChange = (e) => {
  console.log("search ", e)
    /** Variable to hold the original version of the list */
    let currentList = this.state.data;
    /** Variable to hold the filtered list before putting into state */
    let newList = [];
    /** If the search bar isn't empty */
    if (e !== "") {
        /** Use .filter() to determine which items should be displayed */
        newList = currentList.filter(item => {
            const lc = item.text.toLowerCase();
            const filter = e.toLowerCase();
            /** check to see if the current list item includes the search term
             * If it does, it will be added to newList. Using lowercase eliminates
             * issues with capitalization in search terms and search content
             * */
            return lc.includes(filter);
        });
    } else {
        newList = currentList;
    }
    this.setState({
        filtered: newList
    });
}

  render() {
    console.log("PEr ", this.state.personData)
    console.log("movies ", this.state.movies)
    return (
      <>
      {this.state.isLoaded ?
        <>
        <div className='filter-container'>
          <DropdownFilter/>
          <MultiSelectList data={this.state.personData}/>
          <input type="text" name="searchBar" placeholder='Rechercher...' value="" onChange={this.handleSearchChange}/>
        </div>
        <div className='cards-container'>
        {this.state.personData.map(item =>
          item.movie_credits.cast ?
          item.movie_credits.cast.map( i =>
          <Cards key={i.id} id={i.id} title={i.title} imgSrc={i.backdrop_path}/>
        ) : null

        )}
        </div>
        </>
      : <Loading/> }
      </>
    );
  }
}
export default Person;
