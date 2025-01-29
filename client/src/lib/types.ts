import { Position } from "reactflow";

export interface GlobalSettings {
  temperature: number;
  top_p: number;
  max_tokens: number;
  frequency_penalty: number;
  presence_penalty: number;
  rag: {
    enabled: boolean;
    documents: { id: string }[];
    websites: { id: string }[];
  };
  systemPrompt: string;
  lastSelectedModel: string;
  openai?: {
    apiKey: string;
  };
  xai?: {
    apiKey: string;
  };
  perplexity?: {
    apiKey: string;
  };
  deepseek?: {
    apiKey: string;
  };
  groq?: {
    apiKey: string;
  };
  openrouter?: {
    apiKey: string;
  };
  anthropic?: {
    apiKey: string;
  };
  google?: {
    apiKey: string;
  };
  boards: Board[];
  currentBoardId: string;
}

export interface Board {
  id: string;
  nodes: Node<any>[];
  edges: Edge[];
}

export interface Edge {
  id: string;
  source: string;
  target: string;
}

export interface StoreState {
  settings: GlobalSettings;
  selectedNodes: Node<any>[];  // Add this line
}

export interface Node<T = any> {
  id: string;
  type: string;
  data: T;
  position: Position;
}
