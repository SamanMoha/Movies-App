import React from "react";
import API from "../../utils/API";
import './DropdownFilter.scss';

class DropdownFilter extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selectedItem : null
    }
  }

  render() {
    let data = [
      {id: 0, name: '&sort_by=vote_average.asc'},
      {id: 1, name: '&sort_by=vote_average.desc'}
    ]
    return (
      <>
        <select name="rateFilter" id="rate-select" className="select-filter">
          <option value=""> -- Please choose an option -- </option>
          {data.map(item =>
              <option key={item.id} value={item.id}>{item.name}</option>
          )}
        </select>
      </>
    );
  }
}
export default DropdownFilter;
