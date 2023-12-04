import React from 'react';
import './Sidebar.css'; // Make sure to create this CSS file

const Sidebar = ({ onDragStart }) => {
  return (
    <aside>
      <div className="dndnode rectangle" onDragStart={(event) => onDragStart(event, 'rectangle')} draggable></div>
      <div className="dndnode circle" onDragStart={(event) => onDragStart(event, 'circle')} draggable></div>
      <div className="dndnode triangle" onDragStart={(event) => onDragStart(event, 'triangle')} draggable></div>
    </aside>
  );
};

export default Sidebar;
