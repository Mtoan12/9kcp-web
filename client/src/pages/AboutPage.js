import { useEffect } from "react";

const AboutPage = () => {
  useEffect(() => {
    document.title = "About";
  }, []);

  return (
    <div className="lg:container lg:px-5">
      <div className="lg:grid lg:grid-cols-1">
        <p>
          Chúng tôi ra đời với sứ mệnh mang đến không gian làm việc độc đáo và
          sáng tạo cho mọi người.
        </p>
        <br />
        <b>CẢM HỨNG HƠN?</b>
        <br />
        <p>Đó luôn là mục tiêc chúng tôi hướng đến.</p>
        <br />
        <p>
          Và cũng là tinh thần "More inspirational" chúng tôi khát khao truyền
          tải.
        </p>
        <br />
        <p>
          Với những sản phẩm được lựa chọn một cách tỉ mỉ và cẩn thận trong khâu
          đánh giá chất lượng. Chắc chắn, điều này sẽ giúp các bạn có một trải
          nghiệm hoàn hảo khi sử dụng sản phẩm của chúng tôi. Chúc các bạn luôn
          vui vẻ, sáng tạo và tràn đầy năng lượng mỗi khi bắt đầu làm việc.
          Thanks!
        </p>
      </div>
    </div>
  );
};
export default AboutPage;
