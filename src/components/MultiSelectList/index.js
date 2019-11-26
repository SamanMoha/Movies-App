import React from "react";
import './MultiSelectList.scss';

class MultiSelectList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selectedItems : [],
      showList: false,
      data: this.props.data
    }

    this.setWrapperRef = this.setWrapperRef.bind(this);
    //this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

   setWrapperRef(node) {
     this.wrapperRef = node;
   }

   handleClickOutside = (event) => {
     if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
       this.setState({showList: false})
     }
   }

  onChangeSelection = (e) => {
    console.log("click ", e.target)
    e.stopPropagation();
    //console.log("id ", this.state.selectedItems.includes(e.target.id))
    if(this.state.selectedItems.includes(parseInt(e.target.id))) {
      let list = this.state.selectedItems
      list.splice( list.indexOf(e.target.id), 1 )
      this.setState({selectedItems : list})

    } else {
      //console.log("else")
      this.setState({selectedItems : [...this.state.selectedItems, parseInt(e.target.id)]})
    }
  }

  onClickListItem = (e) => {
    console.log("onClickListItem")
    e.stopPropagation();
    this.onChangeSelection(e);
  }

  onClickDropDon = (e) => {
    this.setState({showList: !this.state.showList})
  }

  render() {
    //console.log("selected ", this.state.selectedItems)

    return (
      <>
        <div className="multiselect-filter" ref={this.setWrapperRef}>
          <p onClick={this.onClickDropDon}>Filtrer par acteur(s)</p>
          {this.state.showList &&
            <ul>
              {this.state.data.map(item =>
                  <li key={item.id} id={item.id} onClick={this.onClickListItem}>
                    <input type="checkbox" id={item.id} name={item.name} checked={this.state.selectedItems.includes(item.id)} onChange={this.onChangeSelection}/>
                    <label htmlFor="scales">{item.name}</label>
                  </li>
              )}
            </ul>
          }
        </div>

      </>
    );
  }
}
export default MultiSelectList;
