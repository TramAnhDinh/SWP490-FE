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
                <th className="p-2 border">Màu xe</th>
                <th className="p-2 border">Giá công</th>
                <th className="p-2 border">Giá tổng</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* <td className="p-2 border">&lt;10</td> */}
                <td className="p-2 border">Xe PCX</td>
                <td className="p-2 border">Đỏ</td>
                <td className="p-2 border">100.000đ</td>
                <td className="p-2 border">800.000đ</td>
              </tr>
              <tr>
                {/* <td className="p-2 border">10-20</td> */}
                <td className="p-2 border">Xe Grande</td>
                <td className="p-2 border">Trắng</td>
                <td className="p-2 border">70.000đ</td>
                <td className="p-2 border">650.000đ</td>
              </tr>
              <tr>
                {/* <td className="p-2 border">21-30</td> */}
                <td className="p-2 border">Xe SH Mode</td>
                <td className="p-2 border">Xanh</td>
                <td className="p-2 border">80.000đ</td>
                <td className="p-2 border">680.000đ</td>
              </tr>
              <tr>
                {/* <td className="p-2 border">31-40</td> */}
                <td className="p-2 border">Xe SH VN 2013-2016</td>
                <td className="p-2 border">Đen</td>
                <td className="p-2 border">90.000đ</td>
                <td className="p-2 border">700.000đ</td>
              </tr>
              <tr>
                {/* <td className="p-2 border">41-50</td> */}
                <td className="p-2 border">Xe SH VN 2017-2022</td>
                <td className="p-2 border">Đỏ</td>
                <td className="p-2 border">100.000đ</td>
                <td className="p-2 border">750.000đ</td>
              </tr>
              <tr>
                {/* <td className="p-2 border">51-60</td> */}
                <td className="p-2 border">Xe SH Ý</td>
                <td className="p-2 border">Xám</td>
                <td className="p-2 border">100.000đ</td>
                <td className="p-2 border">700.000đ</td>
              </tr>
              <tr>
                {/* <td className="p-2 border">61-80</td> */}
                <td className="p-2 border">Xe Vision</td>
                <td className="p-2 border">Trắng</td>
                <td className="p-2 border">50.000đ</td>
                <td className="p-2 border">650.000đ</td>
              </tr>
              <tr>
                {/* <td className="p-2 border">81-100</td> */}
                <td className="p-2 border">Xe Lead</td>
                <td className="p-2 border">Bạc</td>
                <td className="p-2 border">70.000đ</td>
                <td className="p-2 border">680.000đ</td>
              </tr>
              <tr>
                {/* <td className="p-2 border">101-200</td> */}
                <td className="p-2 border">Xe NVX</td>
                <td className="p-2 border">Đen nhám</td>
                <td className="p-2 border">90.000đ</td>
                <td className="p-2 border">700.000đ</td>
              </tr>
              <tr>
                {/* <td className="p-2 border">201-500</td> */}
                <td className="p-2 border">Xe Janus</td>
                <td className="p-2 border">Xanh ngọc</td>
                <td className="p-2 border">60.000đ</td>
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
                <th className="p-2 border">Màu xe</th>
                <th className="p-2 border">Giá công</th>
                <th className="p-2 border">Giá</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border">Xe Wave</td>
                <th className="p-2 border font-normal">Đen</th>
                <th className="p-2 border font-normal">75.000đ</th>
                <td className="p-2 border">600.000đ</td>
              </tr>
              <tr>
                <td className="p-2 border">Xe Future</td>
                <th className="p-2 border font-normal">Xanh</th>
                <th className="p-2 border font-normal">85.000đ</th>
                <td className="p-2 border">600.000đ</td>
              </tr>
              <tr>
                <td className="p-2 border">Xe Sirius</td>
                <th className="p-2 border font-normal">Vàng</th>
                <th className="p-2 border font-normal">60.000đ</th>
                <td className="p-2 border">600.000đ</td>
              </tr>
              <tr>
                <td className="p-2 border">Xe Winner</td>
                <th className="p-2 border font-normal">Trắng</th>
                <th className="p-2 border font-normal">100.000đ</th>
                <td className="p-2 border">700.000đ</td>
              </tr>
              <tr>
                <td className="p-2 border">Xe Exciter</td>
                <th className="p-2 border font-normal">Xanh đen</th>
                <th className="p-2 border font-normal">80.000đ</th>
                <td className="p-2 border">750.000đ</td>
              </tr>
              <tr>
                <td className="p-2 border">Các dòng xe số khác</td>
                <td className="p-2 border px-4 py-2 text-center" colSpan="3">Báo giá</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bảng decal Xe ga */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-2xl font-bold mb-4 text-yellow-700">Dán Decal Xe Ga</h3>
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-yellow-200">
                <th className="p-2 border">Loại xe</th>
                <th className="p-2 border">Màu xe</th>
                <th className="p-2 border">Giá công</th>
                <th className="p-2 border">Giá decal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border">Xe Vision</td>
                <th className="p-2 border font-normal">Trắng</th>
                <th className="p-2 border font-normal">100.000đ</th>
                <td className="p-2 border">650.000đ</td>
              </tr>
              <tr>
                <td className="p-2 border">Xe Lead</td>
                <th className="p-2 border font-normal">Xanh đen</th>
                <th className="p-2 border font-normal">80.000đ</th>
                <td className="p-2 border">700.000đ</td>
              </tr>
              <tr>
                <td className="p-2 border">Xe Grande</td>
                <th className="p-2 border font-normal">Xanh</th>
                <th className="p-2 border font-normal">85.000đ</th>
                <td className="p-2 border">690.000đ</td>
              </tr>
              <tr>
                <td className="p-2 border">Xe Janus</td>
                <th className="p-2 border font-normal">Vàng</th>
                <th className="p-2 border font-normal">60.000đ</th>
                <td className="p-2 border">640.000đ</td>
              </tr>
              <tr>
                <td className="p-2 border">Xe SH Mode</td>
                <th className="p-2 border font-normal">Trắng</th>
                <th className="p-2 border font-normal">100.000đ</th>
                <td className="p-2 border">730.000đ</td>
              </tr>
              <tr>
                <td className="p-2 border">Xe SH VN</td>
                <td className="p-2 border font-normal">Đen</td>
                <td className="p-2 border font-normal">75.000đ</td>
                <td className="p-2 border">720.000đ</td>
            </tr>
            <tr>
                <td className="p-2 border">Xe SH Ý</td>
                <td className="p-2 border font-normal">Xanh</td>
                <td className="p-2 border font-normal">85.000đ</td>
                <td className="p-2 border">740.000đ</td>
          </tr>
          <tr>
                <td className="p-2 border">Xe NVX</td>
                <td className="p-2 border font-normal">Xanh đen</td>
                <td className="p-2 border font-normal">80.000đ</td>
                <td className="p-2 border">710.000đ</td>
          </tr>
          <tr>
                <td className="p-2 border">Xe PCX</td>
                <td className="p-2 border font-normal">Đen</td>
                <td className="p-2 border font-normal">75.000đ</td>
                <td className="p-2 border">800.000đ</td>
            </tr>
              <tr>
                <td className="p-2 border">Các dòng xe số khác</td>
                <td className="p-2 border px-4 py-2 text-center" colSpan="3">Báo giá</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Bảng decal Xe số */}
<div className="bg-white rounded-2xl shadow-lg p-6">
  <h3 className="text-2xl font-bold mb-4 text-yellow-700">Dán Decal Xe Số</h3>
  <table className="w-full text-center border-collapse">
    <thead>
      <tr className="bg-yellow-200">
        <th className="p-2 border">Loại xe</th>
        <th className="p-2 border">Màu xe</th>
        <th className="p-2 border">Giá công</th>
        <th className="p-2 border">Giá decal</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="p-2 border">Xe Wave</td>
        <td className="p-2 border font-normal">Đen</td>
        <td className="p-2 border font-normal">75.000đ</td>
        <td className="p-2 border">580.000đ</td>
      </tr>
      <tr>
        <td className="p-2 border">Xe Future</td>
        <td className="p-2 border font-normal">Xanh</td>
        <td className="p-2 border font-normal">85.000đ</td>
        <td className="p-2 border">620.000đ</td>
      </tr>
      <tr>
        <td className="p-2 border">Xe Sirius</td>
        <td className="p-2 border font-normal">Vàng</td>
        <td className="p-2 border font-normal">60.000đ</td>
        <td className="p-2 border">590.000đ</td>
      </tr>
      <tr>
        <td className="p-2 border">Xe Jupiter</td>
        <td className="p-2 border font-normal">Xanh đen</td>
        <td className="p-2 border font-normal">80.000đ</td>
        <td className="p-2 border">615.000đ</td>
      </tr>
      <tr>
        <td className="p-2 border">Xe Winner</td>
        <td className="p-2 border font-normal">Trắng</td>
        <td className="p-2 border font-normal">100.000đ</td>
        <td className="p-2 border">700.000đ</td>
      </tr>
      <tr>
        <td className="p-2 border">Xe Exciter</td>
        <td className="p-2 border font-normal">Xanh đen</td>
        <td className="p-2 border font-normal">80.000đ</td>
        <td className="p-2 border">730.000đ</td>
      </tr>
      <tr>
        <td className="p-2 border">Các dòng xe số khác</td>
        <td className="p-2 border px-4 py-2 text-center" colSpan="3">Báo giá</td>
      </tr>
    </tbody>
  </table>
  </div>
 </div>
</div>
     </>
  );
};

export default PricingTable;

