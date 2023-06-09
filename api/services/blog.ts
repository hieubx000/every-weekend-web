import { AxiosResponse } from "axios";
import requestApi from "../requestApi";

export const postCreateBlogApi = async (
  data: Blog.BlogDataPayload,
): Promise<AxiosResponse> => {
  const res = await requestApi().post("/blog", data);

  return res;
};

export const patchUpdateBlogApi = async (
  id: string,
  data: Blog.BlogDataPayload,
): Promise<AxiosResponse> => {
  const res = await requestApi().patch(`/blog/${id}`, data);

  return res;
};

export const getAllBlogApi = async (params?: any): Promise<AxiosResponse> => {
  const res = await requestApi().get("/blog", { params: params });

  return res;
};

export const getBlogByIdApi = async (id: string): Promise<AxiosResponse> => {
  const res = await requestApi().get(`/blog/${id}`);

  return res;
};

export const getBlogBySlugApi = async (
  slug: string,
): Promise<AxiosResponse> => {
  const res = await requestApi().get(`/blog/slug/${slug}`);

  return res;
};

export const deleteBlogApi = async (id: string): Promise<AxiosResponse> => {
  const res = await requestApi().delete(`/blog/${id}`);

  return res;
};
