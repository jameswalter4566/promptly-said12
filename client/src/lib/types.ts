import { Node as ReactFlowNode, Edge } from 'reactflow';

export interface StoreState {
  settings: GlobalSettings;
  selectedNodes: Node<any>[]; // Add selectedNodes
}

export interface GlobalSettings {
  version?: number;
  temperature: number;
  top_p: number;
  max_tokens: number;
  frequency_penalty: number;
  presence_penalty: number;
  streaming: boolean;
  primaryColor: string;
  snapToGrid: boolean;
  doubleClickZoom: boolean;
  panOnDrag: boolean;
  panOnScroll: boolean;
  zoomOnScroll: boolean;
  fitViewOnInit: boolean;
  systemPrompt: string;
  lastSelectedModel: string;
  openai: {
    apiKey: string;
  };
  xai: {
    apiKey: string;
  };
  perplexity: {
    apiKey: string;
  };
  deepseek: {
    apiKey: string;
  };
  groq: {
    apiKey: string;
  };
  openrouter: {
    apiKey: string;
  };
  anthropic: {
    apiKey: string;
  };
  google: {
    apiKey: string;
  };
  boards: Board[];
  currentBoardId: string;
  customModels: CustomModel[];
  ragEnabled: boolean;
  ragConfig: {
    chunkSize: number;
    chunkOverlap: number;
    supportedModels: string[];
  };
  ragDocuments: RAGDocument[];
  ragWebsites: RAGWebsite[];
  hotkeys: {
    newNode: string;
    newBoard: string;
    deleteBoard: string;
    dNode: string;
  };
}

export interface Board {
  id: string;
  name: string;
  nodes: Node<any>[];
  edges: Edge[];
}

export interface Node<T = any> extends ReactFlowNode<T> {
  id: string;
  type: string;
}

export interface CustomModel {
  id: string;
  name: string;
  provider: 'openai' | 'anthropic';
  endpoint: string;
  apiKey?: string;
  requiresAuth: boolean;
  maxTokens: number;
}

export interface RAGDocument {
  id: string;
  name: string;
  content: string;
  chunks: string[];
  embeddings: number[][];
}

export interface RAGWebsite {
  id: string;
  url: string;
  content: string;
  chunks: string[];
  embeddings: number[][];
}