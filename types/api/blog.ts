declare namespace Blog {
  interface BlogDataPayload {
    title: string;
    category: string;
    imageUrl: string;
    summary: string;
    content: number;
    status: number;
    createdAt?: string;
    slug?: string;
  }
}
