import React from "react";
import bannerAwardFPT from "../assets/image/award-about-fpt.png";
import bannerAboutFPT from "../assets/image/banner-about-fpt.png";
import bannerHistoryFPT from "../assets/image/banner-history-about-fpt.png";
import bannerInternationalFPT from "../assets/image/international-fpt-banner.png";
import bannerMajorFPT from "../assets/image/major-fpt-banner.png";
import CoinRain from '../component/CoinRain';
import Notification from '../component/Notification';
import { useCompleteAction } from '../hooks/useCompleteAction';
import { useCompletionState } from '../hooks/useCompletionState';

import { Collapse } from "antd";
import "./AboutFPT2.css";

const { Panel } = Collapse;

function MajorCollapse({ id, src, desc, label, childrenData }) {
  return (
    <div className="rounded-lg border border-[#F97316] bg-[#FFF1E0] my-4">
      {/* Wrapper giữ bo góc đúng */}
      <div className="overflow-hidden rounded-lg">
        {/* Vùng cuộn: KHÔNG phải Collapse mà wrapper của nó */}
        <div
          className="overflow-y-auto custom-scroll"
          style={{ maxHeight: "405px" }}
        >
          <Collapse className="custom-collapse" accordion>
            <Panel
              header={
                <span className="text-[#F97316] font-bold capitalize">
                  {label}
                </span>
              }
              key={id}
              className="custom-panel"
              style={{
                backgroundColor: "#FFF1E0",
                borderRadius: "8px",
              }}
            >
              <p className="text-[#444] text-sm mb-2">{desc}</p>
              <a
                href={src}
                className="!text-[#F97316] text-sm font-medium hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Xem Thêm
              </a>

              {/* Children collapses */}
              {childrenData && childrenData.length > 0 && (
                <div className="mt-4 space-y-2">
                  {childrenData.map((child) => (
                    <Collapse
                      key={child.id}
                      className="!mb-2 ml-4 custom-collapse"
                      accordion
                    >
                      <Panel
                        header={
                          <span className="text-[#F97316] font-medium capitalize">
                            {child.label}
                          </span>
                        }
                        key={child.id}
                        className="custom-panel"
                        style={{
                          backgroundColor: "#FFF7EB",
                          border: "1px solid #FDBA74",
                          borderRadius: "6px",
                        }}
                      >
                        <p className="text-[#444] text-sm mb-2">{child.desc}</p>
                        <a
                          href={child.src}
                          className="!text-[#F97316] text-sm font-medium hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Xem Thêm
                        </a>
                      </Panel>
                    </Collapse>
                  ))}
                </div>
              )}
            </Panel>
          </Collapse>
        </div>
      </div>
    </div>
  );
}

function AboutFPT2() {
  const { isCompleted: achievementsCompleted, markAsCompleted: markAchievementsCompleted } = useCompletionState('aboutfpt2_achievements');
  const { isCompleted: internationalCompleted, markAsCompleted: markInternationalCompleted } = useCompletionState('aboutfpt2_international');
  
  const { handleComplete: handleAchievementsComplete, notification: achievementsNotification, hideNotification: hideAchievementsNotification, showCoinRain: showAchievementsCoinRain, hideCoinRain: hideAchievementsCoinRain } = useCompleteAction('aboutfpt2_achievements', 15);
  const { handleComplete: handleInternationalComplete, notification: internationalNotification, hideNotification: hideInternationalNotification, showCoinRain: showInternationalCoinRain, hideCoinRain: hideInternationalCoinRain } = useCompleteAction('aboutfpt2_international', 25);

  const majors = [
    {
      id: 1,
      src: "https://daihoc.fpt.edu.vn/nganh-hoc/cong-nghe-thong-tin/",
      desc: "Đại học FPT đào tạo Công nghệ thông tin (CNTT) với mong muốn cung cấp nguồn nhân lực chất lượng cao ngành này cho Tập đoàn FPT cũng như cho các tập đoàn toàn cầu và các doanh nghiệp Việt Nam.",
      label: "Công Nghệ Thông Tin",
      childrenKey: "IT",
    },
    {
      id: 2,
      src: "https://daihoc.fpt.edu.vn/nganh-hoc/quan-tri-kinh-doanh/",
      desc: "Chương trình Quản trị Kinh doanh tại Trường Đại học FPT cung cấp nhiều chuyên ngành hấp dẫn và cơ hội thực tập quốc tế, giúp sinh viên phát triển kỹ năng và kiến thức cần thiết cho sự nghiệp.",
      label: "Quản Trị Kinh Doanh",
      childrenKey: "QTKD",
    },
    {
      id: 3,
      src: "https://daihoc.fpt.edu.vn/nganh-hoc/cong-nghe-truyen-thong/",
      desc: "Hiện tại, ngành Công nghệ truyền thông tại Đại học FPT gồm có 2 chuyên ngành là Quản trị Truyền thông đa phương tiện và Quan hệ công chúng. ",
      label: "Công Nghệ Truyền Thông",
      childrenKey: "CNTT",
    },
    {
      id: 4,
      src: "https://daihoc.fpt.edu.vn/nganh-hoc/ngon-ngu-anh/",
      desc: "Tiềm năng toàn cầu của ngành Ngôn ngữ Anh, trong năm 2025 Tiếng Anh là ngôn ngữ toàn cầu, \"chìa khóa\" mở ra cơ hội học tập, làm việc và giao lưu quốc tế.",
      label: "Ngôn ngữ Anh",
      childrenKey: "NNA",
    },
    {
      id: 5,
      src: "https://daihoc.fpt.edu.vn/nganh-hoc/ngon-ngu-trung-quoc/",
      desc: "Chuyên ngành ngôn ngữ Trung tại Trường Đại học FPT tạo ra đột phá về chất lượng đào tạo bằng cách chú trọng vào phương pháp tích hợp nội dung và ngôn ngữ",
      label: "Ngôn Ngữ Trung Quốc",
      childrenKey: "NNT",
    },
    {
      id: 6,
      src: "https://daihoc.fpt.edu.vn/nganh-hoc/nganh-ngon-ngu-nhat/",
      desc: "Học Ngôn ngữ Nhật tại ĐH FPT là học gì? Ngành Ngôn ngữ Nhật của ĐH FPT là sự kết hợp của 5 khối kiến thức: kiến thức chuyên môn, kiến thức xã hội, kỹ năng mềm, ngoại ngữ và định hướng công nghiệp.",
      label: "Ngôn Ngữ Nhật",
      childrenKey: "NNN",
    },
    {
      id: 7,
      src: "https://daihoc.fpt.edu.vn/nganh-hoc/nganh-ngon-ngu-han-quoc/",
      desc: "Khám phá ngành Ngôn ngữ Hàn Quốc tại Trường Đại học FPT với chương trình đào tạo chất lượng cao, kết hợp giữa kiến thức ngôn ngữ, văn hóa và kỹ năng ứng dụng thực tế.",
      label: "Ngôn Ngữ Hàn Quốc",
      childrenKey: "NNHQ",
    },
  ];

  const majorsChildren = {
    IT: [
      {
        id: 1.1,
        src: "https://daihoc.fpt.edu.vn/nganh-hoc/cong-nghe-thong-tin/an-toan-thong-tin/",
        desc: "Chương trình đào tạo chuyên ngành An toàn thông tin tại Trường Đại học FPT được thiết kế để đáp ứng nhu cầu cao của thị trường, khẳng định vị thế dẫn đầu trong lĩnh vực Cyber Security.",
        label: "An Toàn Thông Tin",
      },
      {
        id: 1.2,
        src: "https://daihoc.fpt.edu.vn/nganh-hoc/cong-nghe-thong-tin/cong-nghe-o-to-so/",
        desc: "Ngành Công nghệ ô tô số (ASE) đang bùng nổ toàn cầu, đặc biệt trong bối cảnh xe tự lái và phương tiện thông minh trở thành xu hướng chủ đạo.",
        label: "Công Nghệ Ô Tô Số",
      },
      {
        id: 1.3,
        src: "https://daihoc.fpt.edu.vn/nganh-hoc/cong-nghe-thong-tin/chuyen-doi-so/",
        desc: "Trong bối cảnh chuyển đổi số đang là trụ cột phát triển của nền kinh tế và xã hội, Nghị quyết 57-NQ/TW năm 2024 của Bộ Chính trị đã khẳng định rõ vai trò chiến lược của nguồn nhân lực chất lượng cao trong các lĩnh vực như trí tuệ nhân tạo (AI), dữ liệu số, công nghệ lõi và công nghiệp bán dẫn.",
        label: "Chuyển Đổi Số",
      },
      {
        id: 1.4,
        src: "https://daihoc.fpt.edu.vn/nganh-hoc/cong-nghe-thong-tin/ky-thuat-phan-mem/",
        desc: "Ngành kỹ thuật phần mềm dự đoán tạo ra nhiều cơ hội việc làm cho kỹ sư phần mềm, với nhu cầu chiếm 25,7% tổng số việc làm trong IT từ năm 2022-2032, theo Cục Thống kê Lao động Hoa Kỳ.",
        label: "Kỹ Thuật Phần Mềm",
      },
      {
        id: 1.5,
        src: "https://daihoc.fpt.edu.vn/nganh-hoc/cong-nghe-thong-tin/thiet-ke-my-thuat-so/",
        desc: "Quy mô ngành AR/VR toàn cầu dự kiến tăng từ 3,5 tỷ USD (2017) lên 198 tỷ USD (2025), thúc đẩy phát triển các lĩnh vực như Metaverse, giáo dục và giải trí​. Metaverse và các công nghệ như AR, VR, Hologram mở ra cơ hội lớn, định hình tương lai của nghệ thuật và thiết kế số​.",
        label: "Thiết kế mỹ thuật số",
      },
      {
        id: 1.6,
        src: "https://daihoc.fpt.edu.vn/nganh-hoc/cong-nghe-thong-tin/thiet-ke-vi-mach-ban-dan/",
        desc: "Ngành Thiết kế vi mạch bán dẫn đang trên đà phát triển mạnh mẽ trên toàn cầu, với dự báo giá trị thị trường từ 573 tỷ USD năm 2022 tăng lên khoảng 1,3 ngàn tỷ USD vào năm 2029. Sự bùng nổ của các công nghệ như trí tuệ nhân tạo, Internet of Things (IoT), và các ứng dụng điện tử tiêu dùng đang thúc đẩy nhu cầu ngày càng cao về vi mạch bán dẫn.",
        label: "Thiết kế vi mạch bán dẫn",
      },
      {
        id: 1.7,
        src: "https://daihoc.fpt.edu.vn/nganh-hoc/cong-nghe-thong-tin/tri-tue-nhan-tao-ai/",
        desc: "Ngành Trí tuệ nhân tạo (AI) đang khẳng định vị thế của mình như một động lực chính thúc đẩy sự phát triển kinh tế toàn cầu, từ y tế, tài chính đến giáo dục. Theo báo cáo của McKinsey, AI có thể tạo ra giá trị kinh tế lên đến 13.000 tỷ USD vào năm 2030, trở thành nguồn lực thiết yếu trong bối cảnh kinh tế mới.",
        label: "Trí tuệ nhân tạo (AI)",
      },
    ],
    QTKD: [
      {
        id: 2.1,
        src: "https://daihoc.fpt.edu.vn/nganh-hoc/quan-tri-kinh-doanh/cong-nghe-tai-chinh-fintech/",
        desc: "Thị trường Công nghệ tài chính quốc tế (Fintech) ngày càng sôi động với 75% người dùng toàn cầu sử dụng ít nhất một dịch vụ Công nghệ tài chính (Fintech)",
        label: "Công nghệ tài chính (Fintech)",
      },
      {
        id: 2.2,
        src: "https://daihoc.fpt.edu.vn/nganh-hoc/quan-tri-kinh-doanh/digital-marketing/",
        desc: "Digital Marketing là một trong những lĩnh vực phát triển nhanh nhất trên toàn cầu. Theo Forbes, ngành này nằm trong top 10 kỹ năng có nhu cầu cao nhất năm 2024, với quy mô thị trường dự kiến đạt 1,5 nghìn tỷ USD vào năm 2030.",
        label: "Digital Marketing",
      },
      {
        id: 2.3,
        src: "https://daihoc.fpt.edu.vn/nganh-hoc/quan-tri-kinh-doanh/kinh-doanh-quoc-te/",
        desc: "Cùng với xu hướng toàn cầu hóa, nhu cầu nguồn nhân lực chất lượng cao trong lĩnh vực kinh doanh quốc tế không ngừng tăng trưởng. ",
        label: "Kinh Doanh Quốc Tế",
      },
      {
        id: 2.4,
        src: "https://daihoc.fpt.edu.vn/nganh-hoc/quan-tri-kinh-doanh/logistics-quan-ly-chuoi-cung-ung/",
        desc: "Việt Nam là trung tâm logistics quan trọng tại Đông Nam Á, thu hút đầu tư từ Samsung, Intel, Nike. Ngành logistics đóng góp 4-5% GDP, tăng trưởng 12-14%/năm, với thương mại điện tử dự kiến đạt 22 tỷ USD vào năm 2025. Tuy nhiên, ngành cần thêm 200.000 lao động chất lượng cao vào năm 2030, mở ra cơ hội lớn cho sinh viên theo học lĩnh vực này.",
        label: "Logistics & Quản lý chuỗi cung ứng toàn cầu",
      },
      {
        id: 2.5,
        src: "https://daihoc.fpt.edu.vn/nganh-hoc/quan-tri-kinh-doanh/quan-tri-khach-san/",
        desc: "Ngành Khách sạn, một phần không thể tách rời của ngành Du lịch, cũng thừa hưởng sự phát triển do sự tăng trưởng của lượng khách du lịch quốc tế. Nhu cầu về dịch vụ chất lượng cao ngày càng tăng, thúc đẩy nhu cầu về nhân lực chất lượng cao và đào tạo chuyên sâu trong ngành.",
        label: "Quản trị khách sạn",
      },
      {
        id: 2.6,
        src: "https://daihoc.fpt.edu.vn/nganh-hoc/quan-tri-kinh-doanh/quan-tri-dich-vu-du-lich-lu-hanh/",
        desc: "Ngành Quản trị dịch vụ du lịch & lữ hành đóng góp đáng kể vào kinh tế toàn cầu, dự kiến chiếm 11,5% GDP thế giới vào năm 2029. Mỗi năm, hàng tỷ người đi du lịch, tạo tiềm năng lớn cho ngành. Việt Nam, với ngành công nghiệp không khói này, đang được ưu tiên phát triển để tận dụng lợi thế từ sự gia tăng của du khách quốc tế.",
        label: "Quản trị dịch vụ du lịch & lữ hành",
      },
      {
        id: 2.7,
        src: "https://daihoc.fpt.edu.vn/nganh-hoc/quan-tri-kinh-doanh/tai-chinh-doanh-nghiep",
        desc: "Chuyên ngành Tài chính doanh nghiệp tại Trường Đại học FPT là sự kết hợp giữa kiến thức học thuật chuyên sâu, kỹ năng thực tiễn và tư duy hội nhập toàn cầu. Với môi trường học tập hiện đại, kết nối doanh nghiệp và cơ hội phát triển nghề nghiệp rõ ràng, chương trình này không chỉ giúp sinh viên sẵn sàng đáp ứng nhu cầu thị trường mà còn mở ra cánh cửa để chinh phục các đỉnh cao trong lĩnh vực tài chính.",
        label: "Tài chính doanh nghiệp",
      },
      {
        id: 2.8,
        src: "https://daihoc.fpt.edu.vn/nganh-hoc/quan-tri-kinh-doanh/ngan-hang-so-tai-chinh/",
        desc: "Chuyên ngành Ngân hàng số – Tài chính (Digital Banking and Finance) tại Trường Đại học FPT cung cấp cho người học nền tảng vững chắc về tài chính, công nghệ và thực tế doanh nghiệp. Đây là lựa chọn hoàn hảo giúp sinh viên có cơ hội trở thành chuyên gia dẫn đầu xu hướng trong nền kinh tế số.",
        label: "Ngân hàng số – Tài chính (Digital Banking and Finance)",
      },
      {
        id: 2.9,
        src: "https://daihoc.fpt.edu.vn/nganh-hoc/quan-tri-kinh-doanh/tai-chinh-dau-tu/",
        desc: "Chuyên ngành Tài chính đầu tư tại Trường Đại học FPT là sự kết hợp hài hòa giữa kiến thức chuyên sâu về đầu tư, kỹ năng phân tích tài chính hiện đại và tư duy chiến lược toàn cầu. Với chương trình học tập tiên tiến, môi trường thực hành thực tế và mạng lưới kết nối doanh nghiệp rộng khắp, ngành học này không chỉ trang bị cho sinh viên khả năng nắm bắt xu hướng thị trường mà còn tạo tiền đề vững chắc để thành công trong lĩnh vực đầu tư tài chính.",
        label: "Tài chính đầu tư",
      },
    ],
    CNTT: [
      {
        id: 3.1,
        src: "https://daihoc.fpt.edu.vn/nganh-hoc/cong-nghe-truyen-thong/quan-he-cong-chung/",
        desc: "Trên quy mô toàn cầu, ngành PR ngày càng phát triển nhờ sự hỗ trợ của công nghệ mới như AI và Big Data. Tại Mỹ, ngành dự kiến có thêm khoảng 27.100 việc làm mỗi năm trong thập kỷ tới với tốc độ tăng trưởng nhanh hơn mức trung bình. Các doanh nghiệp quốc tế đang tìm kiếm chuyên gia PR để xây dựng chiến lược truyền thông toàn cầu, tạo cơ hội hấp dẫn cho những sinh viên tốt nghiệp có khả năng hội nhập quốc tế. ",
        label: "Quan hệ công chúng (PR)",
      },
      {
        id: 3.2,
        src: "https://daihoc.fpt.edu.vn/nganh-hoc/cong-nghe-truyen-thong/truyen-thong-da-phuong-tien/",
        desc: "Theo Cục Thống kê Lao động Mỹ, số lượng công việc trong ngành truyền thông và báo chí dự kiến tăng trưởng với 109.500 vị trí mới mỗi năm đến 2033. Điều này cho thấy ngành này đang thu hút mạnh mẽ trên quy mô toàn cầu nhờ sự mở rộng của các nền tảng số và nhu cầu sản xuất nội dung đa phương tiện.",
        label: "Truyền thông đa phương tiện",
      },
    ],
    NNA: [
      {
        id: 4.1,
        src: "https://daihoc.fpt.edu.vn/nganh-hoc/ngon-ngu-anh/",
        desc: "Nhu cầu của thị trường lao động thế giới về người sử dụng tiếng Anh là công cụ chính trong công việc ngày càng cao. Theo dự báo trên Glassdoor 2023, nhu cầu tuyển dụng các vị trí viết nội dung, truyền thông, thương hiệu dành cho cử nhân Ngôn ngữ Anh tăng trưởng từ 6 – 16% đến năm 2031. ",
        label: "Chuyên Ngành Ngôn ngữ Anh",
      },
    ],
    NNT: [
      {
        id: 5.1,
        src: "https://daihoc.fpt.edu.vn/nganh-hoc/ngon-ngu-trung-quoc/nganh-ngon-ngu-trung-quoc/",
        desc: "Tiếng Trung là ngôn ngữ được sử dụng nhiều nhất thế giới với hơn 1,4 tỷ người bản ngữ. Không chỉ mở ra cánh cửa giao tiếp với cộng đồng người Hoa rộng lớn, tiếng Trung còn là \"công cụ vàng\" để nắm bắt cơ hội trong thị trường lao động sôi động và hội nhập kinh tế toàn cầu.",
        label: "Song ngữ Trung – Anh",
      },
    ],
    NNN: [
      {
        id: 6.1,
        src: "https://daihoc.fpt.edu.vn/nganh-hoc/nganh-ngon-ngu-nhat/ngon-ngu-nhat/",
        desc: "Tiếng Nhật là ngôn ngữ chính của nền kinh tế lớn thứ ba thế giới và ngôn ngữ đứng thứ 9 về số lượng người sử dụng trên toàn cầu. Với hơn 30.000 công ty Nhật Bản hoạt động trên khắp thế giới, việc học tiếng Nhật mang lại những cơ hội và lợi thế vượt trội trong sự nghiệp, đặc biệt trong bối cảnh toàn cầu hóa như hiện nay.",
        label: "Song ngữ Nhật – Anh",
      },
    ],
    NNHQ: [
      {
        id: 7.1,
        src: "https://daihoc.fpt.edu.vn/nganh-hoc/ngon-ngu-han-quoc/",
        desc: "Ngôn ngữ Hàn Quốc đang ngày càng thu hút sự quan tâm trên thế giới, không chỉ bởi đây là ngôn ngữ của xứ sở kim chi với nền văn hóa đặc sắc, mà còn là \"chìa khóa\" mở ra nhiều cơ hội nghề nghiệp hấp dẫn trong bối cảnh kinh tế toàn cầu hóa.",
        label: "Song ngữ Hàn – Anh",
      },
    ],
  };

  const onAchievementsComplete = async () => {
    const success = await handleAchievementsComplete();
    if (success) {
      markAchievementsCompleted();
    }
  };

  const onInternationalComplete = async () => {
    const success = await handleInternationalComplete();
    if (success) {
      markInternationalCompleted();
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FEF4F0]">
      <div className="relative w-full aspect-[7/3] md:h-[500px]">
        {/* Banner Image */}
        <img className="object-cover w-full h-full" src={bannerAboutFPT} alt="banner" />

        {/* Overlay */}
        <div className="absolute inset-0 z-10 bg-black/40" />

        {/* Text Content */}
        <div className="absolute bottom-6 left-1/2 z-20 px-4 text-center transform -translate-x-1/2 md:bottom-10">
          <h3 className="text-xl md:text-5xl font-bold text-[#F97316]">
            Về đại học FPT
          </h3>
          <p className="mx-auto mt-2 max-w-md text-xs md:text-lg text-slate-100">
            Khám phá hành trình 18 năm phát triển của FPT University – nơi đào
            tạo những nhân tài công nghệ hàng đầu Việt Nam.
          </p>
        </div>
      </div>

      <div className="relative mx-auto my-10 w-5/6">
        <h3 className="text-[#F97316] font-bold text-2xl md:text-3xl">
          Lịch sử hình thành
        </h3>

        {/* Wrapper relative để ảnh và overlay khớp nhau */}
        <div className="relative">
          <img
            className="h-[400px] w-full object-cover md:rounded-t-[100px] rounded-br-xl rounded-t-2xl"
            src={bannerHistoryFPT}
            alt=""
          />

          <div
            className="absolute inset-0 w-full md:w-3/5 h-full bg-[#F97316] text-white 
                  rounded-2xl md:rounded-tl-[100px] md:rounded-br-[100px] md:rounded-tr-[10px] 
                  p-4 sm:p-6 md:p-10 lg:p-16 flex flex-col justify-center"
          >
            <p className="mb-4 text-sm font-semibold sm:text-base md:text-lg lg:text-xl">
              FPT University được thành lập năm 2006, là trường đại học tư thục
              đầu tiên của Tập đoàn FPT.
            </p>

            <span className="mb-2 text-sm font-bold sm:text-base md:text-xl">
              Các mốc quan trọng
            </span>

            <ul className="pl-5 space-y-1 text-xs list-disc sm:text-sm md:text-base lg:text-lg">
              <li>2006: Thành lập FPT University tại Hà Nội</li>
              <li>2009: Mở rộng cơ sở tại TP.HCM</li>
              <li>2012: Khai trương campus Đà Nẵng</li>
              <li>2018: Ra mắt campus Cần Thơ và Quy Nhơn</li>
              <li>2024: Đạt 50,000+ sinh viên trên toàn quốc</li>
            </ul>
          </div>
        </div>
      </div>

      {/* award fpt */}
      <div
        className="w-full min-h-[400px] flex items-center justify-center relative px-4 py-10 md:py-0"
        style={{
          backgroundImage: `url(${bannerAwardFPT})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Black overlay */}
        <div className="absolute inset-0 z-10 bg-black opacity-60" />

        {/* content */}
        <div className="flex relative z-20 flex-col justify-center items-center mx-auto w-full max-w-6xl h-full text-white">
          <h3 className="text-[#F97316] text-2xl md:text-3xl font-bold mb-2 text-center">
            Thành tựu nổi bật
          </h3>
          <p className="px-2 mb-6 text-sm text-center md:text-base md:px-0">
            Đạt chứng nhận quốc tế ABET, top 3 trường đại học công nghệ hàng đầu
            Việt Nam...
          </p>

          {/* Card list */}
          <div className="flex flex-col gap-4 justify-center items-center px-4 w-full md:flex-row">
            <div className="w-full md:w-1/2 bg-[#FEF4F0] rounded-xl text-left p-4 shadow-md">
              <h4 className="text-[#F97316] font-semibold text-lg mb-1">
                ABET Accreditation
              </h4>
              <p className="text-[#686868] text-sm">
                Chứng nhận chất lượng giáo dục quốc tế
              </p>
            </div>

            <div className="w-full md:w-1/2 bg-[#FEF4F0] rounded-xl text-left p-4 shadow-md">
              <h4 className="text-[#F97316] font-semibold text-lg mb-1">
                Top 3 IT University
              </h4>
              <p className="text-[#686868] text-sm">
                Xếp hạng hàng đầu về đào tạo IT
              </p>
            </div>
          </div>

          <button 
            className={`!mt-8 px-6 py-3 rounded-full cursor-pointer transition-all duration-300 border ${
              achievementsCompleted 
                ? 'bg-gray-500 text-white border-gray-500' 
                : 'bg-[#F97316] text-white hover:!text-[#F97316] hover:bg-[#FFF1E0] border-[#F97316]'
            }`}
            onClick={onAchievementsComplete}
            // disabled={achievementsCompleted}
          >
            
            {achievementsCompleted ? 'Đã hoàn thành' : 'Hoàn thành'}
          </button>
          
        </div>
      </div>

      {/* major education */}
      <div className="flex gap-4 py-10 mx-auto w-5/6">
        <div className="hidden md:w-2/3 md:block lg:block lg:w-3/4">
          <img
            src={bannerMajorFPT}
            alt="banner-major-fpt"
            className="object-cover w-full h-[600px] rounded-tl-[50px] rounded-br-[50px]"
          />
        </div>

        <div className="w-full lg:w-2/5 md:w-1/3">
          <div>
            <h4 className="text-[#F97316] text-3xl !font-bold md:text-xl">
              Chương trình đào tạo
            </h4>
            <p className="text-[#686868] text-base md:text-sm">
              Hơn 20 chuyên ngành từ Công nghệ thông tin đến Kinh doanh, thiết
              kế theo chuẩn quốc tế. Các ngành đào tạo chính
            </p>
          </div>

          {/* majors */}
          <div>
            <h4 className="text-xl md:text-base">Các ngành đào tạo chính</h4>

            <div className="overflow-hidden rounded-lg border border-[#F97316] bg-[#FFF1E0]">
              <div className="overflow-y-auto px-6 max-h-[400px] custom-scroll">
                {majors.map((major) => {
                  const nestedColapse = majorsChildren[major.childrenKey] || [];
                  return (
                    <MajorCollapse
                      key={major.id}
                      desc={major.desc}
                      label={major.label}
                      src={major.src}
                      id={major.id}
                      childrenData={nestedColapse}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* international fpt */}
      <div
        className="w-full min-h-[400px] flex items-center justify-center relative px-4 py-10 md:py-0"
        style={{
          backgroundImage: `url(${bannerInternationalFPT})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Black overlay */}
        <div className="absolute inset-0 z-10 bg-black opacity-60" />

        {/* content */}
        <div className="flex relative z-20 flex-col justify-center items-center mx-auto w-full max-w-6xl h-full text-white">
          <h3 className="text-[#F97316] text-2xl md:text-3xl font-bold mb-2 text-center">
            Hợp tác quốc tế
          </h3>
          <p className="px-2 mb-6 text-sm text-center md:text-base md:px-0">
            Liên kết với hơn 50 trường đại học hàng đầu thế giới, cơ hội du học
            và trao đổi sinh viên
          </p>

          {/* Card list */}
          <div className="flex flex-col gap-4 justify-center items-center px-4 w-full md:flex-row">
            <div className="w-full md:w-1/2 bg-[#FEF4F0] rounded-xl text-left p-4 shadow-md">
              <h4 className="text-[#F97316] font-semibold text-lg mb-1">
                Carnegie Mellon University
              </h4>
              <p className="text-[#686868] text-sm">
                Hợp tác chương trình thạc sĩ
              </p>
            </div>

            <div className="w-full md:w-1/2 bg-[#FEF4F0] rounded-xl text-left p-4 shadow-md">
              <h4 className="text-[#F97316] font-semibold text-lg mb-1">
                University of Greenwich
              </h4>
              <p className="text-[#686868] text-sm">
                Chương trình liên kết quốc tế
              </p>
            </div>
          </div>

          <button 
            className={`!mt-8 px-6 py-3 rounded-full cursor-pointer transition-all duration-300 border ${
              internationalCompleted 
                ? 'bg-gray-500 text-white border-gray-500' 
                : 'bg-[#F97316] text-white hover:!text-[#F97316] hover:bg-[#FFF1E0] border-[#F97316]'
            }`}
            onClick={onInternationalComplete}
            disabled={internationalCompleted}
          >
            {internationalCompleted ? 'Đã hoàn thành' : 'Hoàn thành'}
          </button>
        </div>
      </div>

      {(achievementsNotification || internationalNotification) && (
        <Notification
          message={achievementsNotification?.message || internationalNotification?.message}
          type={achievementsNotification?.type || internationalNotification?.type}
          duration={achievementsNotification?.duration || internationalNotification?.duration}
          onClose={achievementsNotification ? hideAchievementsNotification : hideInternationalNotification}
        />
      )}
      {(showAchievementsCoinRain || showInternationalCoinRain) && (
        <CoinRain onEnd={showAchievementsCoinRain ? hideAchievementsCoinRain : hideInternationalCoinRain} />
      )}
    </div>
  );
}

export default AboutFPT2;
