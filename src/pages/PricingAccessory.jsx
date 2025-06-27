import React from "react";

const PricingAccessory = () => {
  return (
    <div className="bg-yellow-200 min-h-screen py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-center text-yellow-800 mb-6">BẢNG GIÁ PHỤ KIỆN XE SỐ</h2>
        <table className="w-full border border-yellow-800">
          <thead>
            <tr className="bg-yellow-400 text-yellow-900">
              <th className="p-2 border border-yellow-800">Phụ Kiện</th>
              <th className="p-2 border border-yellow-800">Tính Năng</th>
              <th className="p-2 border border-yellow-800">Giá</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Ốp bầu lọc gió", "Trang trí, làm nổi bật phần đuôi xe", "169.000đ"],
              ["Ốp chắn bùn trước", "Trang trí, làm nổi bật phần chắn bùn trước", "52.000đ"],
              ["Ốp chắn bùn sau", "Trang trí, làm nổi bật phần chắn bùn sau", "52.000đ"],
              ["Ốp mặt nạ trước", "Tăng vẻ sang trọng cho phần đầu xe", "195.000đ"],
              ["Ốp nắp bình xăng", "Trang trí, làm nổi bật phần thn xe", "79.000đ"],
              ["Thảm lót chân", "Trang trí, làm nổi bật phần sàn xe", "299.000đ"],
              ["Ốp két tản nhiệt", "Trang trí, làm nổi bật phần thân xe", "195.000đ"],
              ["Ốp pô", "Trang trí, làm nổi bật phần đuôi xe", "156.000đ"]
            ].map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-yellow-100" : "bg-white"}>
                {row.map((cell, i) => (
                  <td key={i} className="p-2 border border-yellow-800 text-center">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 text-yellow-800">
          <h2 className="text-3xl font-bold text-center text-yellow-800 mb-6">BẢNG GIÁ PHỤ KIỆN XE GA</h2>
        <table className="w-full border border-yellow-800">
          <thead>
            <tr className="bg-yellow-400 text-yellow-900">
              <th className="p-2 border border-yellow-800">Phụ Kiện</th>
              <th className="p-2 border border-yellow-800">Tính Năng</th>
              <th className="p-2 border border-yellow-800">Giá</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Ốp lọc gió", "Trang trí và bảo vệ bầu lọc gió, tăng điểm nhấn cho phần thân sau xe", "200.000đ"],
              ["Ốp chắn bùn trước", " Trang trí, bảo vệ chắn bùn trước, hạn chế bám bẩn khi di chuyển", "75.000đ"],
              ["Ốp chắn bùn sau", "Trang trí, bảo vệ chắn bùn sau, giúp xe sạch sẽ và nổi bật hơn", "75.000đ"],
              ["Ốp mặt nạ trước", "Tăng vẻ thời trang và sang trọng cho phần đầu xe, tạo điểm nhấn nổi bật", "250.000đ"],
              ["Ốp nắp bình xăng", "Trang trí, bảo vệ nắp bình xăng, tăng thêm sự tinh tế cho xe", "95.000đ"],
              ["Thảm lót chân", "Bảo vệ sàn xe, chống trơn trượt, tăng tính thẩm mỹ cho khu vực để chân", "350.000đ"],
              ["Ốp két tản nhiệt", "Trang trí, bảo vệ két nước tản nhiệt, giúp xe nổi bật hơn và tránh va quẹt nhẹ", "220.000đ"],
              ["Ốp pô", "Trang trí và bảo vệ ống pô, tạo điểm nhấn thể thao cho phần đuôi xe", "170.000đ"]
            ].map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-yellow-100" : "bg-white"}>
                {row.map((cell, i) => (
                  <td key={i} className="p-2 border border-yellow-800 text-center">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default PricingAccessory;
