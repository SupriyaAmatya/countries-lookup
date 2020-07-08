import React, { Component } from 'react';
import './selectbox.css';
import '../../../styles/styles.css';

class SelectBox extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: this.props.items || [],
      showItems: false,
      selectedItem: ''
    }
  }

  dropDown = () => {
    this.setState(prevState => ({
      showItems: !prevState.showItems
    }))
  }

  selectItem = (item) => {
    const region = item.value;
    this.setState({
      selectedItem: region,
      showItems: false
    })
    this.props.onRegionFilter(region);
  }

  reset = () => {
    this.setState({
      selectedItem: '',
      showItems: true
    })

    this.props.onRegionFilter("");
  }

  render() {

    return (
      <div className="filter-region">
        <div className="select-box__container"  onClick={this.dropDown}>
          <div className="selected-item__text">
            {
              this.state.selectedItem ?
                <span className="cross-icon" onClick={this.reset}>
                  <i className="fas fa-times"></i>
                </span> : null
            }

            {this.state.selectedItem ? this.state.selectedItem : 'Filter by Region'}
          </div>
          <div className="select-box--arrow">
            <i className={`${this.state.showItems ? 'fas fa-angle-down arrow-up' : 'fas fa-angle-down arrow-down'}`}></i>
          </div>
        </div>

        <div style={{ display: this.state.showItems ? 'block' : 'none' }} className="dropdown-box">
          {
            this.state.items.map(item =>
              <div
                key={item.id}
                onClick={() => this.selectItem(item)} 
                className={this.state.selectedItem === item ? 'item selected' : 'item'}
                >
                {item.value}
              </div>)
          }
        </div>
      </div>
    );
  }
}

export default SelectBox;
