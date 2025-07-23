import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function From() {
  const [formData, setFormData] = useState({
    tenHang: "",
    maSanPham: "",
    soLuong: "",
    mucDich: "",
    hanCan: "",
  });

  const pdfRef = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const exportPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save("phieu_nhap_kho.pdf");
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Phiếu Nhập Kho</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          name="tenHang"
          placeholder="Tên hàng hóa"
          value={formData.tenHang}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="maSanPham"
          placeholder="Mã sản phẩm"
          value={formData.maSanPham}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="soLuong"
          placeholder="Số lượng yêu cầu"
          value={formData.soLuong}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="mucDich"
          placeholder="Mục đích nhập hàng"
          value={formData.mucDich}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="date"
          name="hanCan"
          placeholder="Hạn cần có hàng"
          value={formData.hanCan}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      <button
        onClick={exportPDF}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Tải phiếu nhập kho (PDF)
      </button>

      {/* Mẫu PDF */}
      <div
        ref={pdfRef}
        className="bg-white p-8 mt-8 border border-gray-300 text-sm"
      >
        <div className="text-center font-bold text-lg mb-4">PHIẾU NHẬP KHO</div>
        <p>
          <strong>Tên hàng hóa:</strong> {formData.tenHang}
        </p>
        <p>
          <strong>Mã sản phẩm:</strong> {formData.maSanPham}
        </p>
        <p>
          <strong>Số lượng yêu cầu:</strong> {formData.soLuong}
        </p>
        <p>
          <strong>Mục đích nhập:</strong> {formData.mucDich}
        </p>
        <p>
          <strong>Hạn cần có hàng:</strong> {formData.hanCan}
        </p>

        <div className="grid grid-cols-4 mt-8 gap-4 text-center">
          <div>
            <p>Người lập phiếu</p>
            <br />
            <br />
            Ký, họ tên
          </div>
          <div>
            <p>Người giao hàng</p>
            <br />
            <br />
            Ký, họ tên
          </div>
          <div>
            <p>Thủ kho</p>
            <br />
            <br />
            Ký, họ tên
          </div>
          <div>
            <p>Kế toán trưởng</p>
            <br />
            <br />
            Ký, họ tên
          </div>
        </div>
      </div>
    </div>
  );
}
