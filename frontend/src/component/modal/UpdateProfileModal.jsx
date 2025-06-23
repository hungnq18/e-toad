import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../Button';

function UpdateProfileModal({ onClose }) {
    const { user, updateUserProfile } = useAuth(); // Lấy hàm updateUserProfile từ context

    // State cho form
    const [formData, setFormData] = useState({
        fullName: user?.fullName || '',
        email: user?.email || '',
        phone: user?.phone || '',
        bio: user?.bio || '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await updateUserProfile(formData); // Gọi hàm từ context để cập nhật
            alert('Cập nhật thông tin thành công!');
            onClose(); // Đóng modal
        } catch (err) {
            setError(err.message || 'Lỗi khi cập nhật thông tin.');
        } finally {
            setLoading(false);
        }
    };

    return (
        // Lớp phủ modal
        <div 
            className="fixed inset-0 bg-transpanrent bg-opacity-10 flex justify-center items-center z-50"
            onClick={onClose} // Đóng modal khi nhấn ra ngoài
        >
            {/* Nội dung modal */}
            <div 
                className="bg-white rounded-xl p-8 shadow-2xl w-full max-w-md transform transition-all"
                onClick={(e) => e.stopPropagation()} // Ngăn việc đóng modal khi nhấn vào nội dung
            >
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Cập nhật thông tin</h2>
                <form onSubmit={handleSubmit}>
                    {/* Trường Họ và tên */}
                    <div className="mb-5">
                        <label htmlFor="fullName" className="block text-gray-700 font-semibold mb-2">Họ và tên</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Email */}
                    <div className="mb-5">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Số điện thoại */}
                    <div className="mb-5">
                        <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">Số điện thoại</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    {/* Bio */}
                    <div className="mb-5">
                        <label htmlFor="bio" className="block text-gray-700 font-semibold mb-2">Giới thiệu</label>
                        <textarea
                            id="bio"
                            name="bio"
                            rows="3"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={formData.bio}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <div className="flex justify-end gap-4 mt-8">
                        <Button type="button" onClick={onClose} style={{ backgroundColor: '#E5E7EB', color: '#374151' }}>
                            Hủy
                        </Button>
                        <Button type="submit" style={{ backgroundColor: '#F97316', color: '#FFFFFF' }} disabled={loading}>
                            {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateProfileModal; 