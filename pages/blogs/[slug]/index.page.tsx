import { FC, memo, useState, useEffect, useCallback } from "react";

import MainLayout from "@/components/layouts/MainLayout";

import styles from "./style.module.scss";
import { Col, Divider, Image, Row } from "antd";
import { useRouter } from "next/router";
import { ClockCircleOutlined, FacebookOutlined } from "@ant-design/icons";
import moment from "moment";
import {
  convertDatePickerToEndDate,
  convertEnumToCategory,
  convertIso8061ToDate,
  convertTimestampToDate,
} from "@/utils/converts";
import parse from "html-react-parser";
import { routerPathConstant } from "@/constants/routerConstant";
import Slider from "@ant-design/react-slick";
import Blogcard from "@/components/common/Blogcard";
import { handleError } from "@/utils/helper";
import { getAllBlogApi, getBlogBySlugApi } from "@/api/services/blog";
import { Blog } from "@/types/common";

type Props = {};

const sliderSettings = {
  dots: true,
  infinite: true,
  arrows: true,
  speed: 500,
  fade: true,
  swipeToSlide: true,
  // slidesToShow: 3,
  // slidesToScroll: 3,
  rows: 3,
  slidesPerRow: 3,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        // slidesToScroll: 2,
        slidesPerRow: 2,
      },
    },
    {
      breakpoint: 576,
      settings: {
        // slidesToScroll: 1,
        slidesPerRow: 1,
        dots: false,
      },
    },
  ],
};

const BlogDetail: FC<Props> = ({}) => {
  const router = useRouter();
  const [blog, setBlog] = useState<Blog>();
  const [blogs, setBlogs] = useState<Blog[]>();

  const getData = useCallback(async () => {
    const slug = router.query.slug ? router.query.slug.toString() : "";
    if (slug) {
      try {
        const response = await getBlogBySlugApi(slug);
        setBlog({
          id: response.data.data.id,
          title: response.data.data.title,
          category: response.data.data.category,
          imageUrl: response.data.data.imageUrl,
          status: response.data.data.status,
          content: response.data.data.content,
          summary: response.data.data.summary,
          createdAt: convertIso8061ToDate(response.data.data.createdAt),
          slug: response.data.data.slug,
        });
        const res = await getAllBlogApi({ page: 1, limit: 6 });
        setBlogs(res.data.data);
      } catch (error) {
        handleError(error);
      }
    }
  }, [router]);

  useEffect(() => {
    getData();
  }, [router]);

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.main_wrap}>
            <Image preview={false} src="/assets/images/BannerDetail.png" />
            <div className={styles.breadcrumb}>
              <div onClick={() => router.push("/")}>
                <img
                  alt=""
                  src="/assets/icons/home.svg"
                  width={20}
                  height={20}
                />
              </div>
              <div style={{ paddingLeft: 5, paddingRight: 5 }}>
                <img alt="" src="/assets/icons/arow-button-small.svg" />
              </div>
              <div className="hover bold" onClick={() => router.push("/blogs")}>
                Blog
              </div>
              <div style={{ paddingLeft: 5, paddingRight: 5 }}>
                <img alt="" src="/assets/icons/default/arow-button-small.svg" />
              </div>
              <div style={{ cursor: "pointer" }}>{blog?.title}</div>
            </div>
            <div className={styles.main_wrap_body}>
              <div className={styles.main_wrap_body_content}>
                <p className={styles.main_wrap_body_content_title}>
                  {blog?.title}
                </p>
                <p className={styles.main_wrap_body_content_summary}>
                  {blog?.summary}
                </p>
                <Divider />
                <div>
                  <ClockCircleOutlined style={{ color: "#838383" }} />
                  <span className={styles.main_wrap_body_content_time}>
                    {blog?.createdAt}
                  </span>
                </div>
                <div className={styles.main_wrap_body_content_detail}>
                  <div className={styles.main_wrap_body_content_detail_img}>
                    <Image preview={false} src={blog?.imageUrl} />
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <span className={styles.main_wrap_body_content_detail_text}>
                      {blog?.content}
                    </span>
                  </div>
                </div>
                <Divider />
                <div className={`mt-4 ${styles.social_sharing}`}>
                  <div className={styles.title}>Chia sẻ bài viết </div>
                  <div className={`${styles.btn_soccial}`}>
                    <FacebookOutlined
                      style={{ color: "var(--primary-color)", fontSize: 40 }}
                      className="cursor-pointer"
                      //   onClick={() => sharePostFb()}
                    />
                  </div>
                </div>
                {/* {blogs?.newTag?.length > 0 ? (
                  <>
                    <Divider />
                    <div className={styles.tags}>
                      {(blogs?.newTag || []).map((item, index) => (
                        <div
                          key={index}
                          className={`${styles.tags_item} cursor-pointer`}
                          onClick={() => changeRouteByTag(item)}>
                          {`#${item.title}`}
                        </div>
                      ))}
                    </div>
                  </>
                ) : null} */}
              </div>
              <div className={styles.main_wrap_body_relative}>
                <span className={styles.main_wrap_body_relative_title}>
                  Xem nhiều nhất
                </span>
                <Divider />
                <>
                  {(blogs || []).map((item, index) => (
                    <div
                      key={index}
                      className={styles.item}
                      onClick={() =>
                        router.push(
                          `/${routerPathConstant.blogs}/${item?.slug}`,
                        )
                      }>
                      <div>
                        <Image
                          preview={false}
                          src={item?.imageUrl}
                          style={{ borderRadius: "6px" }}
                          width={160}
                          height={90}
                        />
                      </div>
                      <div className={styles.item_content}>
                        <p className={styles.item_content_title}>
                          {item?.title}
                        </p>
                        <div className={styles.item_category}>
                          {convertEnumToCategory(item.category)}
                        </div>
                        <div>
                          <ClockCircleOutlined style={{ color: "#838383" }} />
                          <span className={styles.item_time}>
                            {convertIso8061ToDate(item?.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              </div>
            </div>
            <div className={styles.main_wrap_another}>
              <span
                className={`${styles.main_wrap_another_title} mb-4 d-block`}>
                Bài viết liên quan
              </span>
              <div>
                <Row gutter={28}>
                  {(blogs || []).map((item, index) => (
                    <Col span={8} style={{ margin: "12px 0" }}>
                      {blog && <Blogcard item={item} />}
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default memo(BlogDetail);
