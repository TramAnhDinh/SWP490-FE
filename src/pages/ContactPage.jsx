import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../redux/slices/contactSlice.js';
import {
  MapPin,
  Mail,
  Phone,
  CreditCard,
  Clock,
  Send,
  MessageCircle,
  Building2,
  Globe
} from 'lucide-react';
import { toast } from 'react-toastify';

const ContactPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      dispatch(addContact(form));
      toast.success('Gửi thông tin thành công! Chúng tôi sẽ liên hệ lại sớm nhất.');
      setForm({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Địa chỉ",
      content: "88/32 Bà Huyện Thanh Quan, Phường Võ Thị Sáu, Quận 3, TP.HCM",
      color: "text-red-500"
    },
    {
      icon: Phone,
      title: "Hotline",
      content: "098 608 6487",
      color: "text-green-500"
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@potato.decal",
      color: "text-blue-500"
    },
    {
      icon: Clock,
      title: "Giờ làm việc",
      content: "Thứ 2 - Thứ 7: 8:00 - 18:00",
      color: "text-purple-500"
    },
    {
      icon: Building2,
      title: "Công ty",
      content: "CÔNG TY TNHH DECAL POTATO",
      color: "text-orange-500"
    },
    {
      icon: CreditCard,
      title: "MST",
      content: "0215721565",
      color: "text-indigo-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">
            Liên hệ với chúng tôi
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto animate-fade-in">
            Hãy để lại thông tin, chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Thông tin liên hệ */}
          <div className="space-y-8">
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Thông tin liên hệ
              </h2>
              <p className="text-gray-600 mb-8">
                Chúng tôi luôn sẵn sàng hỗ trợ và tư vấn cho bạn về các dịch vụ decal chất lượng cao.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg bg-gray-100 ${info.color}`}>
                      <info.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {info.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {info.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bản đồ */}
            <div className="animate-fade-in">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Vị trí của chúng tôi
              </h3>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <MapPin className="w-5 h-5 text-red-500" />
                    <span className="font-medium">88/32 Bà Huyện Thanh Quan, Quận 3, TP.HCM</span>
                  </div>
                </div>
                <div className="w-full h-80">
                  <iframe
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4611603998987!2d106.6845102287784!3d10.775936439594317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3b1ebfe1a5%3A0xcac24288e9601e3d!2zODgvMzIgQsOgIEh1eeG7h24gVGhhbmggUXVhbiwgUGjGsOG7nW5nIDksIFF14bqtbiAzLCBI4buTIENow60gTWluaCwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1719738262891!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* Form liên hệ */}
          <div className="animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Gửi tin nhắn
                </h2>
                <p className="text-gray-600">
                  Điền thông tin bên dưới để chúng tôi có thể liên hệ lại với bạn
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Nhập họ và tên của bạn"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Nhập địa chỉ email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Nhập số điện thoại"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nội dung
                  </label>
                  <textarea
                    name="message"
                    placeholder="Nhập nội dung tin nhắn của bạn..."
                    value={form.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Đang gửi...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Gửi tin nhắn</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Chúng tôi sẽ phản hồi trong vòng 24 giờ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

