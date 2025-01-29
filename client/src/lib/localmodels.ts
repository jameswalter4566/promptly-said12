import { CustomModel } from "./types";
import { invoke } from "@tauri-apps/api/tauri";

export const getLocalModels = async (): Promise<CustomModel[]> => {
  try {
    const models = await invoke<any[]>("list_models");
    
    return models.map(model => ({
      id: String(model.id),
      name: model.name,
      provider: "local",
      thumbnailUrl: "",
      endpoint: "http://localhost:11434/v1",
      requiresAuth: false,
      apiKey: "",
      contextWindow: model.context_window || 8192,
      maxTokens: model.parameters?.max_tokens || 4096,
      temperature: model.parameters?.temperature || 0.7,
      topP: model.parameters?.top_p || 0.9,
      frequencyPenalty: model.parameters?.frequency_penalty || 0,
      presencePenalty: model.parameters?.presence_penalty || 0
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