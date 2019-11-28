import React from "react";
import './DropdownFilter.scss';

class DropdownFilter extends React.Component {

  render() {
    let data = [
      {id: 0, val: '&sort_by=vote_average.asc', name: 'Filtrer par note croissant'},
      {id: 1, val: '&sort_by=vote_average.desc', name: 'Filtrer par note décroissant'}
    ]
    return (
      <>
        <select id="rate-select" className="select-filter" defaultValue={this.props.defaultValue} onChange={this.props.handleOrderByChange} >
          {data.map(item =>
              <option key={item.id} value={item.val}>{item.name}</option>
          )}
        </select>
      </>
    );
  }
}
export default DropdownFilter;
