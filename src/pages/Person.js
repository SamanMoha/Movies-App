import React from "react";
import API from "../utils/API";

class Person extends React.Component {
  constructor(props) {
    super(props)
    this.state = { personData: [] }
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
    this.setState({personData : res})
  );
 }

  render() {
    console.log("PEr ", this.state.personData)
    return (
      <h1>Cest toto</h1>
    );
  }
}
export default Person;
