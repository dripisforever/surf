import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Icon from '../icon';
import IconButton from '../icon-button';
import SearchBar from './SearchBar';

import './app-header.css';


function Surf({handleSearch, search}) {
  return (
    <div className="Surf">
      <SearchBar
        handleSearch={handleSearch}
        search={search}
      />
    </div>
  )
}
Surf.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired
};
export default Surf;
