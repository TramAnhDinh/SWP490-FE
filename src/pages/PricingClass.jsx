import React from "react";

const PricingClass = () => {
    return (
      <div className="bg-yellow-100 p-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Bảng Giá Kính Xe Hơi</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full mb-8">
              <thead>
                <tr className="bg-yellow-200">
                  <th className="p-2 border border-white">Loại kính</th>
                  <th className="p-2 border border-white">Cao cấp</th>
                  <th className="p-2 border border-white">Siêu cao cấp</th>
                  <th className="p-2 border border-white">Siêu đặc biệt</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Kính lái", "N 90", "ICE 90", "ICE 90"],
                  ["Kính sườn trước","N 30 / N 20", "N 15", "ICE 40 / ICE 20"],
                  ["Kính sườn giữa","N 30 / N 20", "N 15", "ICE 40 / ICE 20"],
                  ["Kính sườn sau","N 30 / N 20", "N 15", "ICE 40 / ICE 20"],
                  ["Kính lưng","N 30 / N 20", "N 15", "ICE 40 / ICE 20"],
                  ["SEDAN","5.500.000", "8.000.000", "11.000.000"],
                  ["SUV","6.000.000", "9.000.000", "12.000.000"]
                ].map((row, index) => (
                  <tr key={index} className="odd:bg-gray-200">
                    {row.map((cell, i) => (
                      <td key={i} className="p-2 border border-white text-center">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
  
            <h2 className="text-2xl font-bold mb-4 text-center">Bảng Giá Decal Xe Hơi</h2>
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-yellow-200">
                  <th className="p-2 border border-white">Chất liệu</th>
                  <th className="p-2 border border-white">Xe cỡ nhỏ, Hatchback</th>
                  <th className="p-2 border border-white">Xe Sedan</th>
                  <th className="p-2 border border-white">Xe SUV	</th>
                  <th className="p-2 border border-white">Xe bán tải</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Thông dụng", "9.000.000", "10.000.000", "11.000.000", "12.000.000"],
                  ["Cao cấp", "12.000.000", "15.000.000 - 17.000.000", "17.000.000 - 20.000.000", "17.000.000 - 20.000.000"],
                  ["Siêu cấp", "25.000.000", "30.000.000 - 35.000.000", "30.000.000 - 35.000.000", "30.000.000 - 35.000.000"]
                  // ["Báo giá có thể thay đổi theo giá vật liệu và yêu cầu, quý khách có thể liên hệ trực tiếp với chúng tôi"]
                ].map((row, index) => (
                  <tr key={index} className="odd:bg-gray-200">
                    {row.map((cell, i) => (
                      <td key={i} className="p-2 border border-white text-center">{cell}</td>
                    ))}
                  </tr> 
                ))}
                <tr className="bg-yellow-100">
                  <td colSpan={5} className="p-2 border border-white text-center font-medium">
                    Báo giá có thể thay đổi theo giá vật liệu và yêu cầu, quý khách có thể liên hệ trực tiếp với chúng tôi
                  </td>
                </tr>
              </tbody>
            </table>
       </div>
      </div>
    </div>
   )
  };
  
  export default PricingClass;
  