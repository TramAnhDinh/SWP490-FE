// import React from "react";

// const PricingService = () => {
//   return (
//     <div className="bg-[#ffe6cc] min-h-screen p-4">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-md">
//         <h2 className="text-center text-3xl font-bold text-[#cc6600] mb-4">Dịch vụ in decal / PET</h2>
//         <div className="grid grid-cols-2 gap-6">
//           <table className="w-full text-center border-collapse">
//             <thead>
//               <tr className="bg-[#ffcc99] text-[#cc6600]">
//                 <th className="p-2 border">Số lượng</th>
//                 <th className="p-2 border">Dịch Vụ</th>
//                 <th className="p-2 border">Mô Tả</th>
//                 <th className="p-2 border">Giá Tham Khảo</th>
//               </tr>
//             </thead>
//             <tbody>
//               {["1-5", "6-10", "11-20", ">20"].map((range, i) => (
//                 <tr key={i} className="odd:bg-[#ffe6cc]">
//                   <td className="p-2 border">{range}</td>
//                   <td className="p-2 border">{["100.000", "90.000", "80.000", "70.000"][i]}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <table className="w-full text-center border-collapse">
//             <thead>
//               <tr className="bg-[#ffcc99] text-[#cc6600]">
//                 <th className="p-2 border">Phụ thu từ vùng in thứ 2</th>
//                 <th className="p-2 border">Giá</th>
//               </tr>
//             </thead>
//             <tbody>
//               {["A6", "A5", "A4", "A3"].map((size, i) => (
//                 <tr key={i} className="odd:bg-[#ffe6cc]">
//                   <td className="p-2 border">{size}</td>
//                   <td className="p-2 border">{["15.000", "20.000", "30.000", "50.000"][i]}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Phần mới: PET kỹ thuật số */}
//         <div className="mt-8">
//           <h2 className="text-center text-3xl font-bold text-[#cc6600] mb-4">PET kỹ thuật số</h2>
//           <table className="w-full text-center border-collapse">
//             <thead>
//               <tr className="bg-[#ffcc99] text-[#cc6600]">
//                 <th className="p-2 border">Mô tả sản phẩm</th>
//                 <th className="p-2 border">Giá</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr className="odd:bg-[#ffe6cc]">
//                 <td className="p-2 border">PET KTS in theo yêu cầu, khổ ngang 56cm</td>
//                 <td className="p-2 border">110.000/mét</td>
//               </tr>
//             </tbody>
//           </table>
//           <div className="mt-4 text-[#cc6600] text-sm">
//             <p>- Sản phẩm PET kỹ thuật số chất lượng cao, hình in sắc nét, màu sắc sinh động.</p>
//             <p>- Giá trên đã bao gồm in và bế hình in theo yêu cầu.</p>
//             <p>- Giá trên chưa bao gồm 10% VAT.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PricingService;

import React from "react";

const PricingService = () => {
  return (
    <div className="bg-[#ffe6cc] min-h-screen p-4">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-center text-3xl font-bold text-[#cc6600] mb-6">Bảng Giá Dịch Vụ Dán Decal Xe</h2>

        {/* Dán decal xe máy */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-[#cc6600] mb-4 text-center">Dịch Vụ Dán Decal Xe Máy</h3>
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-[#ffcc99] text-[#cc6600]">
                <th className="p-2 border">Dịch Vụ</th>
                <th className="p-2 border">Mô Tả</th>
                <th className="p-2 border">Giá Tham Khảo</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Dán decal toàn bộ xe máy", "Thay đổi màu sắc, bảo vệ sơn zin", "800.000đ - 1.800.000đ"],
                ["Dán chống xước xe máy", "Dán trong suốt, bảo vệ sơn zin", "300.000đ - 700.000đ"],
                ["Dán tem trùm xe máy", "Thiết kế và dán tem theo yêu cầu", "1.500.000đ - 2.500.000đ"],
                ["Dán decal chi tiết xe máy", "Dán các chi tiết nhỏ: mặt nạ, chắn bùn, nắp xăng", "50.000đ - 300.000đ"]
              ].map((item, i) => (
                <tr key={i} className="odd:bg-[#ffe6cc]">
                  <td className="p-2 border">{item[0]}</td>
                  <td className="p-2 border">{item[1]}</td>
                  <td className="p-2 border">{item[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Dán decal ô tô */}
        {/* <div className="mb-8">
          <h3 className="text-2xl font-semibold text-[#cc6600] mb-4 text-center">Dịch Vụ Dán Decal Ô Tô</h3>
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-[#ffcc99] text-[#cc6600]">
                <th className="p-2 border">Dịch Vụ</th>
                <th className="p-2 border">Mô Tả</th>
                <th className="p-2 border">Giá Tham Khảo</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Dán decal toàn bộ ô tô", "Thay đổi màu sắc, bảo vệ sơn zin", "6.000.000đ - 20.000.000đ"],
                ["Dán đổi màu từng phần ô tô", "Dán nắp capo, nóc xe, gương, cửa", "500.000đ - 3.000.000đ"],
                ["Dán chống xước ô tô", "Dán trong suốt, bảo vệ sơn zin", "4.000.000đ - 12.000.000đ"],
                ["Dán tem trùm ô tô", "Thiết kế và dán tem theo yêu cầu", "8.000.000đ - 25.000.000đ"],
                ["Dán decal chi tiết ô tô", "Dán logo, sọc thể thao, chi tiết nhỏ", "300.000đ - 2.000.000đ"]
              ].map((item, i) => (
                <tr key={i} className="odd:bg-[#ffe6cc]">
                  <td className="p-2 border">{item[0]}</td>
                  <td className="p-2 border">{item[1]}</td>
                  <td className="p-2 border">{item[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}

        {/* Phụ thu tháo gỡ decal */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-[#cc6600] mb-4 text-center">Phụ Thu Tháo Gỡ Decal</h3>
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-[#ffcc99] text-[#cc6600]">
                <th className="p-2 border">Dịch Vụ</th>
                <th className="p-2 border">Giá Tham Khảo</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Tháo decal xe máy", "300.000đ - 600.000đ"],
                // ["Tháo decal ô tô", "800.000đ - 1.500.000đ"]
              ].map((item, i) => (
                <tr key={i} className="odd:bg-[#ffe6cc]">
                  <td className="p-2 border">{item[0]}</td>
                  <td className="p-2 border">{item[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-[#cc6600] text-sm">
          <p>- Giá trên là giá tham khảo, có thể thay đổi tùy vào kích thước, chất liệu decal và mẫu xe.</p>
          <p>- Dịch vụ thiết kế decal theo yêu cầu, báo giá chi tiết sau khi tư vấn.</p>
          <p>- Giá chưa bao gồm 10% VAT.</p>
        </div>
      </div>
    </div>
  );
};

export default PricingService;
