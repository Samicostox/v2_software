import React, { useState, useEffect } from 'react';

const TopBar = ({ selectedNode, setNodes }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [currentColor, setCurrentColor] = useState('#000000');
  const [fontSize, setFontSize] = useState(14);

  useEffect(() => {
    if (selectedNode) {
      // Update currentColor and fontSize when the selectedNode changes
      const nodeColor = selectedNode.style?.backgroundColor;
      const nodeFontSize = selectedNode.style?.fontSize?.replace('px', ''); // Assuming fontSize is like '14px'

      if (nodeColor) {
        setCurrentColor(nodeColor);
      }
      if (nodeFontSize) {
        setFontSize(nodeFontSize);
      }
    }
  }, [selectedNode]);

  const changeNodeFontSize = (newFontSize) => {
    if (selectedNode) {
      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === selectedNode.id) {
            return {
              ...n,
              style: { ...n.style, fontSize: `${newFontSize}px` }
            };
          }
          return n;
        })
      );
    }
  };

  const handleFontSizeChange = (e) => {
    const newSize = e.target.value;
    setFontSize(newSize);
    changeNodeFontSize(newSize);
  };


  const changeNodeColor = (color) => {
    setCurrentColor(color); // Update the current color state
    if (selectedNode) {
      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === selectedNode.id) {
            // Update the color in data.style for custom nodes
            if (n.type === 'rectangle' || n.type === 'circle' || n.type === 'triangle') {
              return {
                ...n,
                data: { ...n.data, style: { ...n.data.style, backgroundColor: color } }
              };
            } 
            // Update the color in style for default nodes
            else {
              return {
                ...n,
                style: { ...n.style, backgroundColor: color }
              };
            }
          }
          return n;
        })
      );
    }
  };
  const onCustomColorChange = (e) => {
    changeNodeColor(e.target.value);
  };

  return (
    <nav style={{
      backgroundColor: 'white',
      padding: '10px 20px',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      {selectedNode && (
        <>
          <div>
            <span style={{ marginRight: '10px' }}>Node: {selectedNode.data.label}</span>
            {/* Bucket Icon and Color Line */}
            <div style={{ cursor: 'pointer' }} onClick={() => setShowColorPicker(!showColorPicker)}>
              <span>🪣</span> {/* Replace with an actual icon if available */}
              <div style={{ height: '2px', backgroundColor: currentColor, width: '50px', marginLeft: '5px' }}></div>
            </div>
            {showColorPicker && (
              <input type="color" value={currentColor} onChange={onCustomColorChange} style={{ marginLeft: '10px' }} />
            )}
          </div>
  
          <div style={{ marginLeft: '20px' }}>
            <label htmlFor="fontSizeInput" style={{ marginRight: '5px' }}>Font Size: </label>
            <input 
              id="fontSizeInput"
              type="number" 
              value={fontSize} 
              onChange={handleFontSizeChange} 
              style={{ width: '60px' }} 
            />
          </div>
        </>
      )}
    </nav>
  );
};

export default TopBar;
