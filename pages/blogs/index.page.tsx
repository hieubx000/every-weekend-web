import { FC, memo, useState, useEffect, useCallback } from "react";

import styles from "./style.module.scss";
import MainLayout from "@/components/layouts/MainLayout";
import Blogcard from "@/components/common/Blogcard";
import { Segmented } from "antd";
import { blogCategory } from "@/utils/initData";
import { SegmentedValue } from "antd/es/segmented";
import { useRouter } from "next/router";
import { Blog } from "@/types/common";
import { handleError } from "@/utils/helper";
import { getAllBlogApi } from "@/api/services/blog";
import { convertIso8061ToDate } from "@/utils/converts";

type Props = {};

const Blogs: FC<Props> = ({}) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [category, setCategory] = useState<SegmentedValue>(0);
  const router = useRouter();

  const getData = useCallback(async () => {
    try {
      const response = await getAllBlogApi({
        category: category && category !== 0 ? category : "",
      });

      const data: Blog[] = [];
      response.data.data.map((item: any) => {
        data.push({
          id: item._id,
          title: item.title,
          category: item.category,
          imageUrl: item.imageUrl,
          content: item.content,
          status: item.status,
          summary: item.summary,
          createdAt: convertIso8061ToDate(item.createdAt),
          slug: item.slug,
        });
      });
      setBlogs(data);
    } catch (error) {
      handleError(error);
    }
  }, [category]);

  useEffect(() => {
    getData();
  }, [category]);

  useEffect(() => {
    if (router.query.category) {
      setCategory(parseInt(router.query.category.toString()));
    }
  }, [router]);

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.segmented}>
          <Segmented
            value={category}
            size="large"
            onChange={(e) => {
              setCategory(e);
              router.push({ query: { ...router.query, category: e } });
            }}
            block
            options={[
              { label: "Tất cả danh mục", value: 0 },
              ...blogCategory.map((item) => {
                return { label: item.name, value: item.id };
              }),
            ]}
          />
        </div>
        <div className={styles.wrap}>
          <div className={styles.wrap_list}>
            {blogs.map((item, index) => (
              <Blogcard key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default memo(Blogs);
