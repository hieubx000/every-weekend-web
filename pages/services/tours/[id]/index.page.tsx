import { FC, memo, useState } from "react";

import styles from "./style.module.scss";
import MainLayout from "@/components/layouts/MainLayout";
import { Image } from "antd";
import { Mock_Data_Tours } from "@/public/assets/mockData/tour";

type Props = {};

const TourDetail: FC<Props> = ({}) => {
  const data = Mock_Data_Tours[0];
  const [imageUrls, setImageUrls] = useState(
    data.imageUrls.map((item, index) => {
      if (index < 5) return item;
    }),
  );

  console.log(imageUrls);
  

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.images}>
          <Image.PreviewGroup
            preview={{
              onChange: (current, prev) =>
                console.log(`current index: ${current}, prev index: ${prev}`),
            }}>
            <div className={styles.images_grid}>
              {imageUrls.map((item, index) => (
                <Image
                  className={styles.images_grid_item}
                  key={index}
                  src={item}
                  onClick={() => {
                    // setImageUrls(data.imageUrls)
                  }}
                />
              ))}
            </div>
          </Image.PreviewGroup>
        </div>
      </div>
    </MainLayout>
  );
};

export default memo(TourDetail);
