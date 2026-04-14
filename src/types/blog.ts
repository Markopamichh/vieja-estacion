export interface BlogPostData {
  title: string;
  description: string;
  content: string;
  heroImage: string;
  pubDate: Date;
  author?: string;
  published?: boolean;
}

export interface CreatePostRequest {
  token: string;
  title: string;
  description: string;
  content: string;
  heroImage: string;
  pubDate: string;
  published?: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  error?: string;
}

export interface UploadImageResponse {
  success: boolean;
  url?: string;
  error?: string;
}
