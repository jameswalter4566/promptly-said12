import { CustomModel } from './types'
import ollamaLogo from '@/assets/ollama-logo.svg'

export const defaultLocalModels: CustomModel[] = []

export class ModelService {
    private static instance: ModelService;
    private localModelsCache: Map<string, CustomModel[]> = new Map();
    
    static getInstance(): ModelService {
      if (!ModelService.instance) {
        ModelService.instance = new ModelService();
      }
      return ModelService.instance;
    }
  
    async getAvailableModels(endpoint: string): Promise<CustomModel[]> {
      const cachedModels = this.localModelsCache.get(endpoint);
      if (cachedModels) {
        return cachedModels;
      }
    
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
    
        const response = await fetch(`${endpoint}/models`, {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json'
          }
        });
    
        clearTimeout(timeoutId);
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Response is not JSON');
        }
    
        const data = await response.json();
        
        if (!data || (!'object' in data && !Array.isArray(data))) {
          throw new Error('Invalid response structure');
        }
    
        const modelIds = this.extractModelIds(data);
        if (!modelIds.length) {
          console.warn('No models found in response');
          return [];
        }
    
        const localModels = modelIds.map(id => ({
          id: `${endpoint}-${id}`,
          name: id,
          provider: 'openai',
          description: `${id} model running locally`,
          endpoint: endpoint,
          requiresAuth: false,
          maxTokens: 8192,
          thumbnailUrl: ollamaLogo
        }));
    
        this.localModelsCache.set(endpoint, localModels);
        return localModels;
    
      } catch (error) {
        if (error instanceof TypeError && error.message === 'Load failed') {
          console.warn('Connection failed to endpoint:', endpoint);
        } else if (error instanceof SyntaxError) {
          console.warn('Invalid JSON response from endpoint:', endpoint);
        } else {
          console.warn('Failed to fetch local models:', error);
        }
        return [];
      }
    }

    clearCache(endpoint?: string) {
      if (endpoint) {
        this.localModelsCache.delete(endpoint);
      } else {
        this.localModelsCache.clear();
      }
    }
  
    private extractModelIds(data: any): string[] {
      if ('object' in data && data.object === 'list') {
        return data.data.map((model: any) => model.id);
      }
      
      if (Array.isArray(data)) {
        return data.map((model: any) => model.id);
      }
      
      return [];
    }
}
  
export const modelService = ModelService.getInstance();