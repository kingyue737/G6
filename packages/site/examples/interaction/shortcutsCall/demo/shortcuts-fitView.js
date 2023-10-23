import { Graph, extend, Extensions } from '@antv/g6';

const ExtGraph = extend(Graph, {
  behaviors: {
    'shortcuts-call': Extensions.ShortcutsCall,
  },
});

const container = document.getElementById('container');

const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 30;
const graph = new ExtGraph({
  container: 'container',
  width,
  height,
  layout: {
    type: 'grid',
  },
  node: {
    labelShape: {
      text: {
        fields: ['id'],
        formatter: (model) => model.id,
      },
    },
  },
  data: {
    nodes: [
      { id: 'node1', data: {} },
      { id: 'node2', data: {} },
      { id: 'node3', data: {} },
      { id: 'node4', data: {} },
      { id: 'node5', data: {} },
    ],
    edges: [
      {
        id: 'edge1',
        source: 'node1',
        target: 'node2',
        data: {},
      },
      { id: 'edge2', source: 'node1', target: 'node3', data: {} },
      { id: 'edge3', source: 'node1', target: 'node4', data: {} },
      { id: 'edge4', source: 'node2', target: 'node3', data: {} },
      { id: 'edge5', source: 'node3', target: 'node4', data: {} },
      { id: 'edge6', source: 'node4', target: 'node5', data: {} },
    ],
  },
  modes: {
    default: [
      {
        key: 'shortcuts-call-zoomout',
        type: 'shortcuts-call',
        trigger: 'shift',
        combinedKey: '_',
        functionName: 'zoom',
        functionParams: [0.9, undefined, { duration: 500, easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)' }],
      },
      {
        key: 'shortcuts-call-zoomin',
        type: 'shortcuts-call',
        trigger: 'shift',
        combinedKey: '+',
        functionName: 'zoom',
        functionParams: [1.1, undefined, { duration: 500, easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)' }],
      },
      {
        key: 'shortcuts-call-fitview',
        type: 'shortcuts-call',
        trigger: 'shift',
        combinedKey: 'f',
        functionName: 'fitView',
        functionParams: [undefined, { duration: 500, easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)' }],
      },
    ],
  },
});

const btnContainer = document.createElement('div');
btnContainer.style.position = 'absolute';
container.appendChild(btnContainer);
const tip = document.createElement('span');
tip.innerHTML =
  '👉 Press [Shift +] to zoom in  <br/> 👉 Press [Shift -] to zoom out <br/> 👉 Press [Shift f] to fit view';
btnContainer.appendChild(tip);
container.appendChild(btnContainer);

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight - 30]);
  };