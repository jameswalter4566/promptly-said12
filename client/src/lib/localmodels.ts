import { CustomModel } from "./types";
import { invoke } from "@tauri-apps/api/tauri";

export const defaultLocalModels: CustomModel[] = [
  {
    id: "local-default",
    name: "Local Default Model",
    provider: "local",
    description: "Default local model",
    maxTokens: 8192,
    thumbnailUrl: "",
    endpoint: "http://localhost:11434/v1",
    requiresAuth: false,
    apiKey: ""
  }
];

export const modelService = {
  getAvailableModels: async (endpoint: string): Promise<CustomModel[]> => {
    try {
      const models = await invoke<any[]>("list_models");
      return models.map((model: any) => ({
        id: String(model.id),
        name: model.name,
        provider: "local",
        description: model.description || "Local model",
        thumbnailUrl: "",
        endpoint: endpoint,
        requiresAuth: false,
        apiKey: "",
        maxTokens: model.parameters?.max_tokens || 8192
      }));
    } catch (error) {
      console.error('Error fetching local models:', error);
      return [];
    }
  }
};

export const getLocalModels = async (): Promise<CustomModel[]> => {
  try {
    const models = await invoke<any[]>("list_models");
    
    return models.map((model: any) => ({
      id: String(model.id),
      name: model.name,
      provider: "local",
      description: "Local model",
      thumbnailUrl: "",
      endpoint: "http://localhost:11434/v1",
      requiresAuth: false,
      apiKey: "",
      maxTokens: model.parameters?.max_tokens || 8192
    }));
  } catch (error) {
    console.error('Error fetching local models:', error);
    return [];
  }
};

export const isLocalModelAvailable = async (): Promise<boolean> => {
  try {
    const models = await getLocalModels();
    return models.length > 0;
  } catch (error) {
    return false;
  }
};