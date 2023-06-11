declare namespace Blog {
  interface BlogDataPayload {
    title: string;
    category: number;
    imageUrl: string;
    summary: string;
    content: number;
    status: number;
    createdAt?: string;
    slug?: string;
  }
}
