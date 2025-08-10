/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiHelpers } from '@buffbyte/utils';
import type { AxiosResponse } from 'axios';

export class ApiService {
  static async getDashboardData(): Promise<AxiosResponse<any>> { 
    return apiHelpers.get('/app/dashboard');
  }
  static async getContentChats(): Promise<AxiosResponse<any>> {
    return apiHelpers.get('/app/content/chats');
  }
  static async getScriptChats(): Promise<AxiosResponse<any>> {
    return apiHelpers.get('/app/video/chats');
  }

  static async analyzeContent(content: string): Promise<AxiosResponse<any>> { 
    const payload = {
      content,
      type: 'content',
    }
    return this.analyze(payload);
  }

  static async analyzeScript(script: string): Promise<AxiosResponse<any>> { 
    const payload = {
      content: script,
      type: 'video',
    }
    return this.analyze(payload);
  }
  static async analyze(payload: any): Promise<AxiosResponse<any>> {
    return apiHelpers.post('/app/analyze', payload);
  }
}