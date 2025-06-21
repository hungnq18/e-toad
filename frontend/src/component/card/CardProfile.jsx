import Button from '../Button';

function CardProfile() {
    return (
        <div className="flex flex-col items-center bg-white rounded-3xl p-10 shadow-md w-full ">
            {/* Avatar */}
            <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Avatar"
                className="w-30 h-30 rounded-full object-cover border-4 border-white shadow"
            />
            {/* Tên và cấp độ */}
            <h2 className="text-2xl font-bold text-[#353535] pt-5">Hưng</h2>
            <span className="bg-orange-100 text-orange-500 text-xs font-semibold px-3 py-1 rounded-full mt-1 mb-4">
                Cấp độ 1
            </span>
            {/* Email */}
            <div className="w-full mb-3 pt-5">
                <span className="font-semibold text-md text-[#353535]">Email</span>
                <div className="text-gray-500 text-sm pt-3">hungthe189908@fpt.edu.vn</div>
            </div>
            {/* Số điện thoại */}
            <div className="w-full mb-3 pt-5">
                <span className="font-semibold text-sm text-[#353535] pt-5">Số điện thoại</span>
                <div className="text-gray-500 text-sm pt-3">Chưa cập nhật</div>
            </div>
            {/* Giới thiệu */}
            <div className="w-full mb-3 pt-5">
                <span className="font-semibold text-sm text-[#353535]">Giới thiệu</span>
                <div className="text-gray-500 text-sm pt-3">
                    Yêu thích chơi quiz và học hỏi kiến thức mới mỗi ngày!
                </div>
            </div>
            {/* Ngày tham gia */}
            <div className="w-full flex items-center gap-2 mb-4 mt-1">
                <span className="text-orange-500">
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="6.48633" width="18" height="15" rx="2" stroke="#F97316" stroke-width="2" />
                        <path d="M3 10.4863C3 8.60071 3 7.6579 3.58579 7.07211C4.17157 6.48633 5.11438 6.48633 7 6.48633H17C18.8856 6.48633 19.8284 6.48633 20.4142 7.07211C21 7.6579 21 8.60071 21 10.4863H3Z" fill="#F97316" />
                        <path d="M7 3.48633L7 6.48633" stroke="#F97316" stroke-width="2" stroke-linecap="round" />
                        <path d="M17 3.48633L17 6.48633" stroke="#F97316" stroke-width="2" stroke-linecap="round" />
                        <rect x="7" y="12.4863" width="4" height="2" rx="0.5" fill="#F97316" />
                        <rect x="7" y="16.4863" width="4" height="2" rx="0.5" fill="#F97316" />
                        <rect x="13" y="12.4863" width="4" height="2" rx="0.5" fill="#F97316" />
                        <rect x="13" y="16.4863" width="4" height="2" rx="0.5" fill="#F97316" />
                    </svg>

                </span>
                <span className="text-gray-500 text-sm">Tham gia từ 15/03/2024</span>
            </div>
            {/* Nút */}
            <div className="flex w-full gap-3">
                <Button style ={{ fontWeight: "500", fontSize: '15px'}} >Đăng xuất</Button>
                <Button style={{ backgroundColor: '#F97316', color: '#FFFFFF', fontWeight: "500", fontSize: '15px' }}
                    onHover={(e) => e.currentTarget.style.color = '#FF8A00'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#FFFFFF'}>Cập nhật</Button>

            </div>
        </div>
    );
}

export default CardProfile;