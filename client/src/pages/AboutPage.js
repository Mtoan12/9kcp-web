import { useEffect } from "react";

const AboutPage = () => {
  useEffect(() => {
    document.title = "About";
  }, []);

  return (
    <div>
      Chúng tôi ra đời với sứ mệnh mang đến không gian làm việc độc đáo và sáng
      tạo cho mọi người.
      <br />
      <b>CẢM HỨNG HƠN?</b>
      <br />
      Đó luôn là mục tiêc chúng tôi hướng đến.
      <br />
      Và cũng là tinh thần "More inspirational" chúng tôi khát khao truyền tải.
      <br />
      Với những sản phẩm được lựa chọn một cách tỉ mỉ và cẩn thận trong khâu
      đánh giá chất lượng. Chắc chắn, điều này sẽ giúp các bạn có một trải
      nghiệm hoàn hảo khi sử dụng sản phẩm của chúng tôi. Chúc các bạn luôn vui
      vẻ, sáng tạo và tràn đầy năng lượng mỗi khi bắt đầu làm việc. Thanks!
    </div>
  );
};
export default AboutPage;
