import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import history from '../store/history';

class Navigation extends Component {
  constructor() {
    super();
    this.state = { activeItem: 'Holdings' };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  componentWillMount() {
    const currentPath = history.location.pathname.slice(1);
    if (currentPath.length) {
      const componentToRender = currentPath.charAt(0).toUpperCase() + currentPath.slice(1);
      this.setState({ activeItem: componentToRender });
    }
  }

  handleItemClick (event, { name }) {
    this.setState({ activeItem: name });
    const pathExt = name.toLowerCase()
    history.push(`/${pathExt}`);
  }

  render() {
    const { activeItem } = this.state;
    return (
      <Menu tabular>
        <Menu.Item id="navigation" name='Holdings' active={activeItem === 'Holdings'} onClick={this.handleItemClick} />
        <Menu.Item id="navigation" name='Transactions' active={activeItem === 'Transactions'} onClick={this.handleItemClick} />
      </Menu>
    );
  }
}

export default Navigation;