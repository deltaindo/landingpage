export interface Training {
  id: string;
  name: string;
  duration: string;
  certification: string;
  category: "kemnaker" | "bnsp" | "migas";
  description?: string;
  price?: number;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  company: string;
  rating: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
