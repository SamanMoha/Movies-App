import React from "react";
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
      {id: 0, val: '&sort_by=vote_average.asc', name: 'Filtrer par note croissant'},
      {id: 1, val: '&sort_by=vote_average.desc', name: 'Filtrer par note décroissant'}
    ]
    return (
      <>
        <select name="rateFilter" id="rate-select" className="select-filter">
          {data.map(item =>
              <option key={item.id} value={item.id}>{item.name}</option>
          )}
        </select>
      </>
    );
  }
}
export default DropdownFilter;
