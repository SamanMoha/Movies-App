import React from "react";
import './MultiSelectList.scss';
import myArrow from './arrow-down.svg';

class MultiSelectList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showList: false,
      data: this.props.data
    }

    this.setWrapperRef = this.setWrapperRef.bind(this);
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

  onClickDropDon = (e) => {
    this.setState({showList: !this.state.showList})
  }

  render() {
    return (
      <>
        <div className="multiselect-filter" ref={this.setWrapperRef}>
          <p onClick={this.onClickDropDon}>Filtrer par acteur(s) <img src={myArrow} className='arrow-down'/> </p>
          {this.state.showList &&
            <ul>
              {this.state.data.map(item =>
                  <li key={item.id} id={item.id}>
                    <input type="checkbox"
                      id={item.id}
                      name={item.name}
                      checked={this.props.filteredByPerson.find(obj => obj.id === item.id)}
                      onChange={this.props.onChangeFilteredByPerson}/>
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
