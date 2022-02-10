import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './header.scss';
import { Link } from 'gatsby';

const Header = () => {
  const isDark = false;

  return (
    <Fragment>
      <header
        id="header"
        className={
          isDark
            ? 'DarkModeHeader box-shadow-header positionStickyHeader'
            : 'lightModeHeader box-shadow-header positionStickyHeader'
        }
      >
        <div className="learnHeader">
          <div className="headerWrapper">
            <div id="navBrand" className="navLeft">
              <div className="brand">
                <Link to="/">
                  <h1 className={isDark ? 'title-A white' : 'title-A black'}>UZAKU式麻雀学習（中译）</h1>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

Header.propTypes = {
  location: PropTypes.object,
};

export default Header;
