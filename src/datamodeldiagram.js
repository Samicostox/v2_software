import React, { useCallback, useState,useEffect,useRef  } from 'react';
import 'reactflow/dist/style.css';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import Sidebar from './sidebar';
import { RectangleNode, CircleNode, TriangleNode } from './shapes'; 

import './App.css';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
} from 'reactflow';







const nodeTypes = {
  rectangle: RectangleNode,
  circle: CircleNode,
  triangle: TriangleNode,
};


  const initialNodes = [
    { id: 'start', type: 'input', position: { x: 150, y: 5 }, data: { label: 'Start' }, style: { backgroundColor: '#d3d3d3' } },
    { id: 'start', type: 'input', position: { x: 150, y: 5 }, data: { label: 'Start' }, style: { backgroundColor: '#d3d3d3' } },
    { id: 'login', position: { x: 150, y: 50 }, data: { label: 'Login' }, style: { backgroundColor: '#add8e6' } },
    { id: 'success_login', type: 'triangle', position: { x: 150, y: 150 }, data: { label: 'Success', style: { backgroundColor: '#90ee90' } } },
    { id: 'fail_login', type: 'triangle', position: { x: 150, y: 250 }, data: { label: 'Fail' , style: { backgroundColor: '#ffcccb' }},  },
    { id: 'register', position: { x: 300, y: 50 }, data: { label: 'Register' }, style: { backgroundColor: '#add8e6' } },
    { id: 'email_verification', position: { x: 450, y: 50 }, data: { label: 'Email Verification' }, style: { backgroundColor: '#add8e6' } },
    { id: 'admin_page', position: { x: 150, y: 350 }, data: { label: 'Admin Page' }, style: { backgroundColor: '#ffffe0' } },
    { id: 'navbar', type: 'rectangle', position: { x: 300, y: 350 }, data: { label: '' , style: { backgroundColor: '#d3d3d3', width: 300, height: 50 }} }, // Navbar as a visual element
    { id: 'dashboard_page', position: { x: 450, y: 350 }, data: { label: 'Dashboard Page' }, style: { backgroundColor: '#ffffe0' } },
    { id: 'ongoing_complaints', position: { x: 150, y: 450 }, data: { label: 'Ongoing Complaints' }, style: { backgroundColor: '#ffffe0' } },
    { id: 'account_venue_form', position: { x: 150, y: 550 }, data: { label: 'Account Venue Form' }, style: { backgroundColor: '#ffffe0' } },
  ];
  
  const initialEdges = [
    { id: 'e-start-login', source: 'start', target: 'login', animated: true },
    { id: 'e-login-success_login', source: 'login', target: 'success_login', animated: true },
    { id: 'e-login-fail_login', source: 'login', target: 'fail_login', animated: true },
    { id: 'e-success_login-admin_page', source: 'success_login', target: 'admin_page', animated: true },
    { id: 'e-fail_login-register', source: 'fail_login', target: 'register', animated: true },
    { id: 'e-register-email_verification', source: 'register', target: 'email_verification', animated: true },
    { id: 'e-admin_page-ongoing_complaints', source: 'admin_page', target: 'ongoing_complaints', animated: true },
    { id: 'e-admin_page-account_venue_form', source: 'admin_page', target: 'account_venue_form', animated: true },
    { id: 'e-admin_page-dashboard_page', source: 'admin_page', target: 'dashboard_page', animated: true },
  ];
  

  

const defaultColors = ['#FF5733', '#33FF57', '#3357FF', '#FFFF33', '#FF33FF', '#33FFFF'];

export default function DataModelDiagram() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodeName, setNodeName] = useState('');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [colorPickerPosition, setColorPickerPosition] = useState({ x: 0, y: 0 });
  const [usedColors, setUsedColors] = useState(new Set());
  const [customColor, setCustomColor] = useState('#000000');
  const [reactFlowInstance, setReactFlowInstance] = useState(null);


  const reactFlowWrapper = useRef(null);
  let id = 0;
  const getId = () => `dndnode_${id++}`;

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
  
      if (!reactFlowInstance || !reactFlowWrapper.current) {
        return;
      }
  
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) {
        return;
      }
  
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
  
      // Generate a label based on the node type
      const label = type.charAt(0).toUpperCase() + type.slice(1) + ' Node';
  
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: label },
      };
  
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );
  
  const exportDiagramAsPdf = async () => {
    const flowContainer = document.querySelector('.react-flow__container');
    if (flowContainer) {
        const canvas = await html2canvas(flowContainer);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [canvas.width, canvas.height]
        });
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save('diagram.pdf');
    }
};

const onDragOver = useCallback((event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
}, []);



const onDragStart = useCallback((event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  }, []);

  useEffect(() => {
    const colorsInUse = new Set(nodes.map(node => node.style?.backgroundColor).filter(Boolean));
    setUsedColors(colorsInUse);
  }, [nodes]);


    const onConnect = useCallback(
      (params) => setEdges((eds) => addEdge(params, eds)),
      [setEdges],
    );
  
    const onNodeClick = useCallback((event, node) => {
      setSelectedNode(node);
      setNodeName(node.data.label);
      setShowColorPicker(true);
      setColorPickerPosition({ x: event.clientX, y: event.clientY });
    }, []);

    const changeNodeColor = useCallback((color) => {
      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === selectedNode.id) {
            // For custom nodes
            if (n.type === 'rectangle' || n.type === 'circle' || n.type === 'triangle') {
              return {
                ...n,
                data: { ...n.data, style: { backgroundColor: color } }
              };
            } 
            // For default nodes or any other custom types not specified
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
      setShowColorPicker(false);
    }, [selectedNode, setNodes]);
    
    
      const onCustomColorChange = useCallback((e) => {
        setCustomColor(e.target.value);
      }, []);
    
      const onCustomColorKeyDown = useCallback((e) => {
        if (e.key === 'Enter') {
          changeNodeColor(customColor);
        }
      }, [customColor, changeNodeColor]);
    
      const onCustomColorBlur = useCallback(() => {
        changeNodeColor(customColor);
      }, [customColor, changeNodeColor]);
  
    const updateNodeName = useCallback(() => {
      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === selectedNode.id) {
            return {
              ...n,
              data: { ...n.data, label: nodeName }
            };
          }
          return n;
        })
      );
      setSelectedNode(null);
      setNodeName('');
    }, [nodeName, selectedNode, setNodes]);
  
    const addNewNode = useCallback(() => {
      const newNodeId = `node_${nodes.length + 1}`;
      const newNode = {
        id: newNodeId,
        data: { label: `Node ${nodes.length + 1}` },
        position: { x: window.innerWidth / 2 - 100, y: window.innerHeight / 2 - 50 } // Adjust for node size
      };
      setNodes((nds) => nds.concat(newNode));
      setSelectedNode(newNode);
      setNodeName(newNode.data.label);
    }, [nodes, setNodes]);
  
    return (
      <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
        <Sidebar onDragStart={onDragStart} />
        <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ flex: 1, position: 'relative' }}>
          {/* Color Picker */}
          {showColorPicker && (
            <div style={{ position: 'absolute', left: colorPickerPosition.x, top: colorPickerPosition.y, zIndex: 5, padding: '10px', backgroundColor: '#fff', boxShadow: '0 0 10px rgba(0,0,0,0.2)' }}>
              {([...usedColors].length ? [...usedColors] : defaultColors).map(color => (
                <div key={color} style={{ background: color, width: '25px', height: '25px', display: 'inline-block', cursor: 'pointer', margin: '5px' }}
                  onClick={() => changeNodeColor(color)} />
              ))}
              <input type="color" value={customColor} onChange={onCustomColorChange} onKeyDown={onCustomColorKeyDown} onBlur={onCustomColorBlur} />
            </div>
          )}
          {/* Node Name Input */}
          {selectedNode && (
            <div style={{ position: 'absolute', zIndex: 4, left: 10, top: 10 }}>
              <input
                value={nodeName}
                onChange={(e) => setNodeName(e.target.value)}
                onBlur={updateNodeName}
                style={{ padding: '5px' }}
              />
            </div>
          )}
          {/* Add Node and Export PDF Button */}
          <button onClick={exportDiagramAsPdf} style={{ position: 'absolute', right: 20, top: 20, zIndex: 4 }}>Export as PDF</button>
          <button onClick={addNewNode} style={{ position: 'absolute', left: 20, bottom: 20, zIndex: 4, padding: '10px' }}>Add Node</button>
          {/* React Flow */}
          <ReactFlow
            onInit={setReactFlowInstance}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            fitView
            nodeTypes={nodeTypes}
          >
            <Controls />
            <MiniMap />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </div>
      </div>
    );
          }    