import React from "react";
import API from "../utils/API";
import DropdownFilter from '../components/DropdownFilter'
import MultiSelectList from '../components/MultiSelectList'
import Loading from '../components/Loading'
import Cards from '../components/Cards'
import Tag from '../components/Tag'
import './Person.scss'

class Person extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ids: [1245, 3223, 11701, 85, 16828, 74568, 51329, 239019, 10990, 524],
      personData: [],
      filteredData: [],
      isLoaded: false,
      movies: [
        {
          id: null,
          title: null,
          poster_path: null,
          release_date: null,
          vote_average: null
        }
      ],
      filteredByPerson: [],
      orderBy: '&sort_by=vote_average.desc'
    }
  }

  async componentDidMount() {
  let personData = this.state.ids.map(id => {
  return API
    .get('/person/'+id+'?append_to_response=movie_credits'+this.state.orderBy)
    .then(res => res.data)
    .catch(e => console.error(e));
  })
  Promise.all(personData).then(res =>
    this.setState({personData : res, filteredData: res, isLoaded: true})
  );
 }

 getOrderedData = () => {
   let ids = this.state.filteredByPerson.length > 0 ? this.state.filteredByPerson.map(obj => obj.id) : this.state.ids

   let personData = ids.map(id => {
   return API
     .get('/person/'+id+'?append_to_response=movie_credits'+this.state.orderBy)
     .then(res => res.data)
     .catch(e => console.error(e));
   })
   Promise.all(personData).then(res =>
     this.setState({filteredData : res, isLoaded: true})
   );
 }

 onChangeFilteredByPerson = (e) => {
   if(this.state.filteredByPerson.find(obj => obj.id === parseInt(e.target.id))) {
     this.removeFilteredByPerson(e)
   } else {
     this.setState({filteredByPerson :
       [ ...this.state.filteredByPerson,
         {
           id: parseInt(e.target.id),
           text: e.target.name
         }
       ],
       isLoaded : false
     }, () => {this.getOrderedData()})
   }
 }

 removeFilteredByPerson = (e) => {
   let newList = this.state.filteredByPerson.filter(x => {
     return x.id !== parseInt(e.target.id)
   });
   this.setState({filteredByPerson : newList, isLoaded : false}, () => {this.getOrderedData()})
 }

 handleOrderByChange = (e) => {
   this.setState({orderBy: e.target.value, isLoaded : false}, () => {this.getOrderedData()});
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
    return (
      <>
      {this.state.isLoaded ?
        <>
        <div className='filter-container'>
          <div className='filters'>
            <MultiSelectList data={this.state.personData} filteredByPerson={this.state.filteredByPerson} onChangeFilteredByPerson={this.onChangeFilteredByPerson}/>
            <DropdownFilter handleOrderByChange={this.handleOrderByChange} defaultValue={this.state.orderBy}/>
          </div>
          <input className='searchBar' type="text" name="searchBar" placeholder='Rechercher...' value="" onChange={this.handleSearchChange}/>
        </div>
        <div className="tag-container">
          {this.state.filteredByPerson.map(tag =>
            <Tag data={tag} key={tag.id} removeFilteredByPerson={this.removeFilteredByPerson}/>
          )}
        </div>
        <div className='cards-container'>
        {this.state.filteredData.map(item =>
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
