import { Node as ReactFlowNode, Edge } from 'reactflow';

export interface StoreState {
  settings: GlobalSettings;
  selectedNodes: Node<any>[];
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
  rag: {
    enabled: boolean;
    documents: RAGDocument[];
    websites: RAGWebsite[];
    similarityThreshold: number;
    chunkSize: number;
    embeddingModel: string;
    modelStatus: 'loading' | 'error' | 'unloaded' | 'loaded';
    modelProgress?: number;
    modelError?: string;
    supportedModels: string[];
  };
  hotkeys: {
    newNode: string;
    newBoard: string;
    deleteBoard: string;
    dNode: string;
  };
  [key: string]: any; // Add index signature for dynamic access
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
  data: T;
}

export interface CustomModel {
  id: string;
  name: string;
  provider: 'openai' | 'anthropic' | 'local';
  description: string;
  maxTokens: number;
  thumbnailUrl: string;
  endpoint: string;
  requiresAuth: boolean;
  apiKey?: string;
}

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  maxTokens: number;
  thumbnailUrl: string;
}

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  image_url?: string;
  metrics?: {
    totalTime?: number;
    totalTokens?: number;
    tokensPerSecond?: number;
  };
}

export interface APIResponseMetrics {
  completion_tokens?: number;
  prompt_tokens?: number;
  total_tokens?: number;
  model?: string;
}

export interface RAGDocument {
  id: string;
  filename: string;
  timestamp: string;
  size: number;
  chunks: any[];
}

export interface RAGWebsite {
  id: string;
  url: string;
  title?: string;
  dateScraped: string;
}