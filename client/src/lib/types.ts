import { Node, Edge as FlowEdge } from 'reactflow';

export interface Board {
  id: string;
  name: string;
  nodes: Node[];
  edges: FlowEdge[];
  createdAt?: number;
}

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  image_url?: string;
  metrics?: {
    tokensPerSecond?: number;
    totalTokens?: number;
    totalTime?: number;
  };
}

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  maxTokens: number;
  thumbnailUrl: string;
}

export interface CustomModel extends AIModel {
  endpoint: string;
  requiresAuth: boolean;
  apiKey?: string;
}

export interface APIResponseMetrics {
  completion_tokens?: number;
  prompt_tokens?: number;
  total_tokens?: number;
  model?: string;
}

export interface GlobalSettings {
  version: number;
  primaryColor: string;
  boards: Board[];
  currentBoardId: string;
  openai: { apiKey: string };
  deepseek: { apiKey: string };
  perplexity: { apiKey: string };
  xai: { apiKey: string };
  groq: { apiKey: string };
  openrouter: { apiKey: string };
  anthropic: { apiKey: string };
  google: { apiKey: string };
  customModels: CustomModel[];
  temperature: number;
  top_p: number;
  max_tokens: number;
  frequency_penalty: number;
  presence_penalty: number;
  systemPrompt: string;
  snapToGrid: boolean;
  doubleClickZoom: boolean;
  panOnDrag: boolean;
  panOnScroll: boolean;
  zoomOnScroll: boolean;
  fitViewOnInit: boolean;
  lastSelectedModel: string;
  streaming: boolean;
  rag?: {
    enabled: boolean;
    similarityThreshold: number;
    chunkSize: number;
    documents: any[];
    websites: any[];
    supportedModels: string[];
    embeddingModel: string;
    modelStatus: string;
  };
  hotkeys: {
    newNode: string;
    newBoard: string;
    deleteBoard: string;
    dNode: string;
  };
  [key: string]: any; // Add index signature
}

export interface StoreState {
  settings: GlobalSettings;
  setSettings: (settings: GlobalSettings) => void;
  clearAllData: () => Promise<void>;
  updateCustomModels: (models: CustomModel[]) => void;
  selectedNodes?: Node[];
}