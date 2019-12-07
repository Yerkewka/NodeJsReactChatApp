import React from 'react';
import './InfoBar.css';

// Icons
import onlineIcon from '../../assets/icons/onlineIcon.png';
import closeIcon from '../../assets/icons/closeIcon.png';

const InfoBar = ({ room }) => {
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img src={onlineIcon} alt="status icon" className="onlineIcon" />
        <h3>{room}</h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/">
          <img src={closeIcon} alt="close chat icon" />
        </a>
      </div>
    </div>
  );
};

export default InfoBar;
