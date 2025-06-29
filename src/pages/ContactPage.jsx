import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../redux/slices/contactSlice.js';
import { MapPin, Mail, Phone, CreditCard } from 'lucide-react';

const ContactPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addContact(form));
    alert('Gửi thông tin thành công!');
    setForm({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Liên hệ</h2>
      <div className="grid grid-cols-2 gap-8">
        
        {/* Thông tin liên hệ */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold mb-4">CÔNG TY TNHH DECAL POTATO</h3>
          <p className="flex items-center">
            <MapPin className="mr-2" /> Địa chỉ: 88/32 Bà Huyện Thanh Quan, Phường Võ Thị Sáu, Quận 3, TP.HCM
          </p>
          <p className="flex items-center">
            <Mail className="mr-2" /> Email: info@potato.decal
          </p>
          <p className="flex items-center">
            <Phone className="mr-2" /> Hotline: 098 608 6487
          </p>
          <p className="flex items-center">
            <CreditCard className="mr-2" /> MST: 0215721565
          </p>

          {/* Google Map trực tiếp bằng iframe */}
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Bản đồ</h3>
            {/* Dòng này là dấu chỉ địa điểm */}
            <p className="flex items-center text-gray-700 mb-2">
              <MapPin className="mr-2 text-red-500" />88/32 Bà Huyện Thanh Quan, Quận 3, TP.HCM
            </p>
            <div className="w-full h-64 rounded-md overflow-hidden shadow-md">
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

        {/* Form liên hệ */}
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 shadow-md rounded-md">
          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Điện thoại"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="message"
            placeholder="Nội dung"
            value={form.message}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
          >
            Gửi thông tin
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;

