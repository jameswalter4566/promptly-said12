import { Node, Edge as FlowEdge } from 'reactflow';

export interface Board {
  id: string;
  name: string;
  nodes: Node[];  // Changed from ReactFlowNode
  edges: FlowEdge[];  // Changed from Edge and imported from reactflow
  createdAt: number;
}
