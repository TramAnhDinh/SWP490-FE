import React from "react";

const PricingTable = () => {
  return (
    <>
    <div className="bg-yellow-100 py-10 px-5">
      <h2 className="text-4xl font-bold text-center mb-8 text-yellow-700">Dán chống xước Nylon 3 lớp siêu trong</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bảng Xe Ga */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-2xl font-bold mb-4 text-yellow-700">Dán chống xước xe ga</h3>
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-yellow-200">
                {/* <th className="p-2 border">Số lượng</th> */}
                <th className="p-2 border">Loại xe</th>
                <th className="p-2 border">Giá</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* <td className="p-2 border">&lt;10</td> */}
                <td className="p-2 border">Xe PCX</td>
                <td className="p-2 border">800.000đ</td>
              </tr>
              <tr>
                {/* <td className="p-2 border">10-20</td> */}
                <td className="p-2 border">Xe Grande</td>
                <td className="p-2 border">650.000đ</td>
              </tr>
              <tr>
                {/* <td className="p-2 border">21-30</td> */}
                <td className="p-2 border">Xe SH Mode</td>
                <td className="p-2 border">680.000đ</td>
              </tr>
              <tr>
                {/* <td className="p-2 border">31-40</td> */}
                <td className="p-2 border">Xe SH VN 2013-2016</td>
                <td className="p-2 border">700.000đ</td>
              </tr>
              <tr>
                {/* <td className="p-2 border">41-50</td> */}
                <td className="p-2 border">Xe SH VN 2017-2022</td>
                <td className="p-2 border">750.000đ</td>
              </tr>
              <tr>
                {/* <td className="p-2 border">51-60</td> */}
                <td className="p-2 border">Xe SH Ý</td>
                <td className="p-2 border">700.000đ</td>
              </tr>
              <tr>
                {/* <td className="p-2 border">61-80</td> */}
                <td className="p-2 border">Xe Vision</td>
                <td className="p-2 border">650.000đ</td>
              </tr>
              <tr>
                {/* <td className="p-2 border">81-100</td> */}
                <td className="p-2 border">Xe Lead</td>
                <td className="p-2 border">680.000đ</td>
              </tr>
              <tr>
                {/* <td className="p-2 border">101-200</td> */}
                <td className="p-2 border">Xe NVX</td>
                <td className="p-2 border">700.000đ</td>
              </tr>
              <tr>
                {/* <td className="p-2 border">201-500</td> */}
                <td className="p-2 border">Xe Janus</td>
                <td className="p-2 border">650.000đ</td>
              </tr>
              <tr>
                <td className="p-2 border">Các dòng xe ga khác</td>
                <td className="p-2 border px-4 py-2 text-center" colSpan="3">Báo giá</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bảng Xe Số */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-2xl font-bold mb-4 text-yellow-700">Dán chống xước Xe Số</h3>
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-yellow-200">
                <th className="p-2 border">Loại xe</th>
                <th className="p-2 border">Giá</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border">Xe Wave</td>
                <td className="p-2 border">600.000đ</td>
              </tr>
              <tr>
                <td className="p-2 border">Xe Future</td>
                <td className="p-2 border">600.000đ</td>
              </tr>
              <tr>
                <td className="p-2 border">205.000</td>
                <td className="p-2 border">210.000</td>
              </tr>
              <tr>
                <td className="p-2 border">195.000</td>
                <td className="p-2 border">200.000</td>
              </tr>
              <tr>
                <td className="p-2 border">185.000</td>
                <td className="p-2 border">190.000</td>
              </tr>
              <tr>
                <td className="p-2 border">175.000</td>
                <td className="p-2 border">180.000</td>
              </tr>
              <tr>
                <td className="p-2 border">165.000</td>
                <td className="p-2 border">170.000</td>
              </tr>
              <tr>
                <td className="p-2 border">155.000</td>
                <td className="p-2 border">165.000</td>
              </tr>
              <tr>
                <td className="p-2 border">145.000</td>
                <td className="p-2 border">160.000</td>
              </tr>
              <tr>
                <td className="p-2 border px-4 py-2 text-center" colSpan="2">Báo giá</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bảng Áo Polo */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-0">
          <h3 className="text-2xl font-bold mb-4 text-yellow-700">Áo Polo</h3>
          <table className="w-full text-center border-collapse mb-0">
            <thead>
              <tr className="bg-yellow-200">
                <th className="p-2 border">Số lượng</th>
                <th className="p-2 border">Cá sấu poly</th>
                <th className="p-2 border">Cá sấu 65% cotton cao cấp</th>
                <th className="p-2 border">Cá sấu 100% cotton</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border">10-20</td>
                <td className="p-2 border">190.000</td>
                <td className="p-2 border">220.000</td>
                <td className="p-2 border">250.000</td>
              </tr>
              <tr>
                <td className="p-2 border">21-30</td>
                <td className="p-2 border">175.000</td>
                <td className="p-2 border">200.000</td>
                <td className="p-2 border">230.000</td>
              </tr>
              <tr>
                <td className="p-2 border">31-40</td>
                <td className="p-2 border">165.000</td>
                <td className="p-2 border">190.000</td>
                <td className="p-2 border">220.000</td>
              </tr>
              <tr>
                <td className="p-2 border">41-50</td>
                <td className="p-2 border">155.000</td>
                <td className="p-2 border">180.000</td>
                <td className="p-2 border">210.000</td>
              </tr>
              <tr>
                <td className="p-2 border">51-60</td>
                <td className="p-2 border">145.000</td>
                <td className="p-2 border">170.000</td>
                <td className="p-2 border">200.000</td>
              </tr>
              <tr>
                <td className="p-2 border">61-80</td>
                <td className="p-2 border">135.000</td>
                <td className="p-2 border">160.000</td>
                <td className="p-2 border">190.000</td>
              </tr>
              <tr>
                <td className="p-2 border">81-100</td>
                <td className="p-2 border">125.000</td>
                <td className="p-2 border">150.000</td>
                <td className="p-2 border">180.000</td>
              </tr>
              <tr>
                <td className="p-2 border">101-300</td>
                <td className="p-2 border">115.000</td>
                <td className="p-2 border">140.000</td>
                <td className="p-2 border">170.000</td>
              </tr>
              <tr>
                <td className="p-2 border">&gt;300</td>
                <td className="p-2 border px-4 py-2 text-center" colSpan="4">Báo giá</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Bảng New Arrival kế bên Áo Polo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  <div className="bg-white rounded-2xl shadow-lg p-6 w-full md:w-auto mx-auto"> {/* Tăng chiều rộng và căn giữa */}
    <h3 className="text-2xl font-bold mb-4 text-yellow-700">New Arrival</h3>
    <table className="w-full text-center border-collapse mb-0">
      <thead>
        <tr className="bg-yellow-200">
          <th className="p-2 w-28 border w-full">Số lượng</th>
          <th className="p-2 px-4 border">Cá sấu Cafe</th>
          <th className="p-2 px-4 border">Đen/trắng</th>
          <th className="p-2 px-4 border">Khác</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-2 border">10-20</td>
          <td className="p-2 px-4 border">270.000</td>
          <td className="p-2 px-4 border">-</td>
          <td className="p-2 px-4 border">-</td>
        </tr>
        <tr>
          <td className="p-2 border">21-30</td>
          <td className="p-2 px-4 border">250.000</td>
          <td className="p-2 px-4 border">-</td>
          <td className="p-2 px-4 border">-</td>
        </tr>
        <tr>
          <td className="p-2 border">31-40</td>
          <td className="p-2 px-4 border px-4 py-2 text-center" colSpan="4">240.000</td>
        </tr>
        <tr>
          <td className="p-2 border">41-50</td>
          <td className="p-2 px-4 border px-4 py-2 text-center" colSpan="4">230.000</td>
        </tr>
        <tr>
          <td className="p-2 border">51-60</td>
          <td className="p-2 px-4 border px-4 py-2 text-center" colSpan="4">220.000</td>
        </tr>
        <tr>
          <td className="p-2 border">61-80</td>
          <td className="p-2 px-4 border px-4 py-2 text-center" colSpan="4">210.000</td>
        </tr>
        <tr>
         <td className="border p-2 min-w-[120px] text-center">81-100</td>
          <td className="p-2 px-4 border px-4 py-2 text-center" colSpan="4">200.000</td>
        </tr>
        <tr>
          <td className="p-2 border">101-300</td>
          <td className="p-2 px-4 border px-4 py-2 text-center" colSpan="4">190.000</td>
        </tr>
        <tr>
          <td className="p-2 border">&gt;30</td>
          <td className="p-2 px-4 border px-4 py-2 text-center" colSpan="4">Báo giá</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

 </div>
</div>
     </>
  );
};

export default PricingTable;

