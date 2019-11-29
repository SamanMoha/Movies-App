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
      filteredByPerson: [],
      orderBy: '&sort_by=vote_average.asc',
      searchData: []
    }
  }

  async componentDidMount() {
    //'api_key': 'b5cb676487907eeeaf0fdbe36ce765ff',
  let personData = this.state.ids.map(id => {
  return API
    .get('person/'+id+'?api_key=b5cb676487907eeeaf0fdbe36ce765ff&append_to_response=movie_credits&language=fr'+this.state.orderBy)
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
     .get('person/'+id+'?api_key=b5cb676487907eeeaf0fdbe36ce765ff&append_to_response=movie_credits&language=fr'+this.state.orderBy)
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

  render() {
    return (
      <>
      {this.state.isLoaded ?
        <>
        <div className='filter-container'>
          <MultiSelectList data={this.state.personData} filteredByPerson={this.state.filteredByPerson} onChangeFilteredByPerson={this.onChangeFilteredByPerson}/>
          <DropdownFilter handleOrderByChange={this.handleOrderByChange} defaultValue={this.state.orderBy}/>
        </div>
        <div className="tag-container">
          {this.state.filteredByPerson.map(tag =>
            <Tag data={tag} key={tag.id} removeFilteredByPerson={this.removeFilteredByPerson}/>
          )}
        </div>
        <div className='cards-container'>
        {this.state.filteredData.map(item =>
          item && item.movie_credits ?
          item.movie_credits.cast.map( i =>
            <Cards key={i.id} id={i.id} movieData={i} title={i.title} imgSrc={i.backdrop_path}/>
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
