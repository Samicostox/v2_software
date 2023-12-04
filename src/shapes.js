
import React, { useState } from 'react';
import { Handle } from 'reactflow';




// Add your shape components here (RectangleNode, CircleNode, TriangleNode)
export const RectangleNode = ({ id, data }) => {
    const [size, setSize] = useState({ width: 200, height: 100 });

    // Function to handle resizing
    const handleResize = (event) => {
      setSize({ width: event.target.value, height: size.height });
    };
  
    const nodeStyle = {
      padding: 10,
      border: '1px solid black',
      backgroundColor: data.style?.backgroundColor || 'white',
      color: 'black',
      fontSize: '14px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: size.width,
      height: size.height
    };
  
    return (
      <div style={nodeStyle}>
        <Handle type="target" position="top" id={`${id}_t`} />
        <Handle type="source" position="right" id={`${id}_r`} />
        <Handle type="target" position="bottom" id={`${id}_b`} />
        <Handle type="source" position="left" id={`${id}_l`} />
        {data.label}
        {/* Resize input */}
        <input type="range" min="100" max="300" value={size.width} onChange={handleResize} />
      </div>
    );
  };
  
  
  export const CircleNode = ({ id, data }) => {
    const nodeStyle = {
      padding: 10,
      borderRadius: '50%',
      border: '1px solid black',
      backgroundColor: data.style?.backgroundColor || 'white',
      color: 'black',
      width: 50,
      height: 50,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      fontSize : '12px'
  
    };
  
    return (
      <div style={nodeStyle}>
        {/* Top Handle */}
        <Handle type="target" position="top" id={`${id}_t`} style={{ borderRadius: '50%' }} />
        {/* Right Handle */}
        <Handle type="source" position="right" id={`${id}_r`} style={{ borderRadius: '50%' }} />
        {/* Bottom Handle */}
        <Handle type="target" position="bottom" id={`${id}_b`} style={{ borderRadius: '50%' }} />
        {/* Left Handle */}
        <Handle type="source" position="left" id={`${id}_l`} style={{ borderRadius: '50%' }} />
  
        {data.label}
      </div>
    );
  };
  export const TriangleNode = ({ id, data }) => {
    const triangleHeight = 100; // Height of the triangle
    const triangleBase = 100; // Base of the triangle
  
    const nodeStyle = {
      width: 0,
      height: 0,
      borderLeft: `${triangleBase / 2}px solid transparent`,
      borderRight: `${triangleBase / 2}px solid transparent`,
      borderBottom: `${triangleHeight}px solid ${data.style?.backgroundColor || 'white'}`,
      position: 'relative',
    };
  
    const labelStyle = {
      position: 'absolute',
      top: `${triangleHeight / 2}px`, // Adjust to center in the triangle
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      color: 'black',
      fontSize: '14px',
      pointerEvents: 'none',
      width: `${triangleBase}px`, // Ensure the text width is the same as the base of the triangle
    };
  
    return (
      <div style={nodeStyle}>
        {/* Top (Middle of Base) Handle */}
        <Handle type="target" position="top" id={`${id}_t`} style={{ top: `${triangleHeight}px`, left: '50%', transform: 'translateX(-50%)' }} />
        {/* Right (Middle of Right Side) Handle */}
        <Handle type="source" position="right" id={`${id}_r`} style={{ top: `${triangleHeight / 2}px`, right: `-${triangleBase / 4}px` }} />
        {/* Left (Middle of Left Side) Handle */}
        <Handle type="source" position="left" id={`${id}_l`} style={{ top: `${triangleHeight / 2}px`, left: `-${triangleBase / 4}px` }} />
  
        <div style={labelStyle}>{data.label}</div>
      </div>
    );
  };