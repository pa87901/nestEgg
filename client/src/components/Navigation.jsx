import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

class Navigation extends Component {
  constructor() {
    super();
    this.state = { activeItem: 'Holdings' };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick (event, { name }) {
    this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state;
    return (
      <Menu tabular>
        <Menu.Item id="navigation" name='holdings' active={activeItem === 'Holdings'} onClick={this.handleItemClick} />
        <Menu.Item id="navigation" name='transactions' active={activeItem === 'Transactions'} onClick={this.handleItemClick} />
      </Menu>
    );
  }
}

export default Navigation;