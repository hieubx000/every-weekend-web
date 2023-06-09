import { FC, memo } from "react";

import { Image } from "antd";
import { convertTimestampToDate } from "@/utils/converts";

import styles from "./style.module.scss";
import { useRouter } from "next/router";
import { routerPathConstant } from "@/constants/routerConstant";
import { Blog } from "@/types/common";

type Props = {
  item: Blog;
};

const BlogCard: FC<Props> = ({ item }) => {
  const router = useRouter();
  
  return (
    <div
      key={item.id}
      className={styles.news}
      onClick={() => router.push(`/${routerPathConstant.blogs}/${item.slug}`)}>
      <div className={styles.new_image}>
        <Image preview={false} src={item.imageUrl} className={styles.image} />
      </div>
      <div className={styles.news_content}>
        <p className={styles.item_content_title}>{item.title}</p>
        <div className={styles.category_box}>
          <div className={styles.category_title}>
            <span className={styles.start_time}>Tiêu đề blog - </span>
            {item.createdAt}
          </div>
        </div>
        <span className={styles.news_summary}>{item.summary}</span>
      </div>
    </div>
  );
};

export default memo(BlogCard);
