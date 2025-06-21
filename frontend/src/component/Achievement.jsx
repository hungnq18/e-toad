import React from 'react';

const AchievementCard = ({ icon, title, description, date, status = false, reward }) => {
    return (
        /* Frame 110 */

        <div className={`bg-white rounded-xl p-4 ${status ? 'bg-orange-50' : ''} h-full border-2 border-[#FED7AA] ` }>
            <div className="flex items-start gap-3 rounded-full">
                <div className="flex-shrink-0">
                    {icon}
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h3 className="text-base font-medium text-gray-900">{title}</h3>
                        {status && (
                            <span className="px-2 py-1 text-xs font-medium text-orange-600 bg-orange-100 rounded-full">
                                Hoàn thành
                            </span>
                        )}
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{description}</p>
                    {reward && <p className="mt-1 text-sm text-orange-600">Đạt {reward}</p>}
                    {date && <p className="mt-1 text-xs text-gray-500">Đạt được: {date}</p>}
                </div>
            </div>
        </div>
    )
}

const Achievement = () => {
    const achievements = [
        {
            icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.2428 10.6265C15.0989 8.49224 15.527 7.42511 16.2224 7.27721C16.4053 7.23832 16.5943 7.23832 16.7771 7.27721C17.4726 7.42511 17.9006 8.49224 18.7567 10.6265C19.2436 11.8402 19.487 12.447 19.9425 12.8598C20.0702 12.9756 20.2089 13.0787 20.3566 13.1677C20.883 13.485 21.5402 13.5438 22.8546 13.6616C25.0796 13.8608 26.1921 13.9605 26.5319 14.5948C26.6022 14.7262 26.6501 14.8684 26.6734 15.0156C26.786 15.7263 25.9682 16.4704 24.3324 17.9585L23.8782 18.3718C23.1135 19.0675 22.7311 19.4154 22.5099 19.8495C22.3773 20.11 22.2883 20.3904 22.2466 20.6797C22.1772 21.162 22.2891 21.6666 22.5131 22.6759L22.5931 23.0365C22.9947 24.8466 23.1955 25.7516 22.9448 26.1965C22.7197 26.596 22.3049 26.8519 21.8468 26.8737C21.3368 26.8981 20.6181 26.3125 19.1808 25.1413C18.2339 24.3697 17.7604 23.9839 17.2348 23.8332C16.7545 23.6954 16.2451 23.6954 15.7648 23.8332C15.2391 23.9839 14.7657 24.3697 13.8187 25.1413C12.3814 26.3125 11.6628 26.8981 11.1527 26.8737C10.6946 26.8519 10.2799 26.596 10.0547 26.1965C9.80408 25.7516 10.0049 24.8466 10.4065 23.0365L10.4865 22.6759C10.7104 21.6666 10.8224 21.162 10.7529 20.6797C10.7112 20.3904 10.6223 20.11 10.4896 19.8495C10.2684 19.4154 9.88607 19.0675 9.12134 18.3718L8.66711 17.9585C7.0314 16.4704 6.21354 15.7263 6.32617 15.0156C6.3495 14.8684 6.39733 14.7262 6.4677 14.5948C6.80743 13.9605 7.91994 13.8608 10.145 13.6616C11.4593 13.5438 12.1165 13.485 12.643 13.1677C12.7906 13.0787 12.9293 12.9756 13.0571 12.8598C13.5126 12.447 13.756 11.8402 14.2428 10.6265Z" stroke="#F97316" strokeWidth="2" />
                </svg>
            ),
            title: "Người mới",
            description: "Hoàn thành đăng ký tài khoản",
            date: "15/03/2024",
            status: true
        },
        {
            icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M26.6667 10.6667H8" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M26.6667 16H8" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M26.6667 21.3333H8" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.33333 10.6667H5.34667" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.33333 16H5.34667" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.33333 21.3333H5.34667" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: "Học giả",
            description: "Đạt 1000 xu",
            status: false,
            reward: "1000 xu"
        },
        {
            icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 2.66667L20.12 11.0133L29.3333 12.36L22.6667 18.8533L24.24 28.0267L16 23.6933L7.76 28.0267L9.33333 18.8533L2.66667 12.36L11.88 11.0133L16 2.66667Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: "Khám phá",
            description: "Hoàn thành 1 phòng học ảo",
            status: false
        },
        {
            icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 20C20.4183 20 24 16.4183 24 12C24 7.58172 20.4183 4 16 4C11.5817 4 8 7.58172 8 12C8 16.4183 11.5817 20 16 20Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12.2133 18.4933L11.3333 28L16 25.3333L20.6667 28L19.7867 18.48" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: "Bậc thầy",
            description: "Đạt cấp độ 10",
            status: false
        },
        {
            icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 29.3333C23.3638 29.3333 29.3333 23.3638 29.3333 16C29.3333 8.63619 23.3638 2.66666 16 2.66666C8.63619 2.66666 2.66666 8.63619 2.66666 16C2.66666 23.3638 8.63619 29.3333 16 29.3333Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M21.3333 10.6667L14.6667 17.3333" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10.6667 14.6667L14.6667 17.3333" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: "Siêu sao",
            description: "Đạt 5000 xu",
            status: false,
            reward: "5000 xu"
        },
        {
            icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 29.3333C23.3638 29.3333 29.3333 23.3638 29.3333 16C29.3333 8.63619 23.3638 2.66666 16 2.66666C8.63619 2.66666 2.66666 8.63619 2.66666 16C2.66666 23.3638 8.63619 29.3333 16 29.3333Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M21.3333 21.3333L16 16V8" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: "Huyền thoại",
            description: "Đạt cấp độ 20",
            status: false
        }
    ];

    return (
        <div className="bg-white rounded-xl p-4 w-full">
            <div className="flex items-center gap-2 mb-4">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.5 12L16.5 7L26.5 12L16.5 17L6.5 12Z" stroke="#F97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M26.5 12V17" stroke="#F97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M10.5 15V21.4286C10.5 21.4286 11.0455 24 16.5 24C21.9545 24 22.5 21.4286 22.5 21.4286V15" stroke="#F97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

                <h2 className="text-lg font-semibold text-gray-900">Thành tích đạt được</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">Các cột mốc bạn đã đạt được trong hành trình học tập</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch rounded-full">
                {achievements.map((achievement, index) => (
                    <AchievementCard key={index} {...achievement} />
                ))}
            </div>
        </div>
    )
}

export default Achievement 