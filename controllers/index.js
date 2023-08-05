import { Student } from "../models/student.js";
import { Employee } from "../models/employee.js";
import { Customer } from "../models/customer.js";
import { ListPerson } from "../services/listperson.js";
const listPerson = new ListPerson();
const domId = (id) => document.getElementById(id);
const saveData = () => {
  setLocalStorage();
  renderTable();
};
//click vào add user
window.buttonAddUser = () => {
  domId("doiTuong").selectedIndex = 0;
  domId("formdiemToan").style.display = "none";
  domId("formdiemLy").style.display = "none";
  domId("formdiemHoa").style.display = "none";
  domId("formSoNgayLamViec").style.display = "none";
  domId("formLuongTheoNgay").style.display = "none";
  domId("formTenCongTy").style.display = "none";
  domId("formTriGiaHoaDon").style.display = "none";
  domId("formDanhGia").style.display = "none";
  const buttonAdd = `<button 
                      class="btn btn-success"
                      id="addUser"
                      onclick ="themDoiTuong()">
                      Add User
                    </button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = buttonAdd;
};
//khi chọn đối tượng sẽ dom tới function này - sự kiện onchange
window.layDoiTuong = () => {
  const loaiDoiTuong = domId("doiTuong").value;
  if (loaiDoiTuong === "Student") {
    domId("formdiemToan").style.display = "block";
    domId("formdiemLy").style.display = "block";
    domId("formdiemHoa").style.display = "block";
    domId("formSoNgayLamViec").style.display = "none";
    domId("formLuongTheoNgay").style.display = "none";
    domId("formTenCongTy").style.display = "none";
    domId("formTriGiaHoaDon").style.display = "none";
    domId("formDanhGia").style.display = "none";
  } else if (loaiDoiTuong === "Employee") {
    domId("formdiemToan").style.display = "none";
    domId("formdiemLy").style.display = "none";
    domId("formdiemHoa").style.display = "none";
    domId("formSoNgayLamViec").style.display = "block";
    domId("formLuongTheoNgay").style.display = "block";
    domId("formTenCongTy").style.display = "none";
    domId("formTriGiaHoaDon").style.display = "none";
    domId("formDanhGia").style.display = "none";
  } else if (loaiDoiTuong === "Customer") {
    domId("formdiemToan").style.display = "none";
    domId("formdiemLy").style.display = "none";
    domId("formdiemHoa").style.display = "none";
    domId("formSoNgayLamViec").style.display = "none";
    domId("formLuongTheoNgay").style.display = "none";
    domId("formTenCongTy").style.display = "block";
    domId("formTriGiaHoaDon").style.display = "block";
    domId("formDanhGia").style.display = "block";
  } else {
    domId("formdiemToan").style.display = "none";
    domId("formdiemLy").style.display = "none";
    domId("formdiemHoa").style.display = "none";
    domId("formSoNgayLamViec").style.display = "none";
    domId("formLuongTheoNgay").style.display = "none";
    domId("formTenCongTy").style.display = "none";
    domId("formTriGiaHoaDon").style.display = "none";
    domId("formDanhGia").style.display = "none";
  }
};
window.layThongTinSinhVien = () => {
  const id = domId("id").value;
  const hoTen = domId("hoTen").value;
  const diaChi = domId("diaChi").value;
  const email = domId("email").value;
  const type = domId("doiTuong").value;
  const diemToan = domId("diemToan").value;
  const diemLy = domId("diemLy").value;
  const diemHoa = domId("diemHoa").value;
  const sinhVien = new Student(
    id,
    hoTen,
    diaChi,
    email,
    type,
    diemToan,
    diemLy,
    diemHoa
  );
  return sinhVien;
};
window.layThongTinGiangVien = () => {
  const id = domId("id").value;
  const hoTen = domId("hoTen").value;
  const diaChi = domId("diaChi").value;
  const email = domId("email").value;
  const type = domId("doiTuong").value;
  const soNgayLamViec = domId("soNgayLamViec").value;
  const luongTheoNgay = domId("luongTheoNgay").value;
  const giangVien = new Employee(
    id,
    hoTen,
    diaChi,
    email,
    type,
    soNgayLamViec,
    luongTheoNgay
  );
  return giangVien;
};
window.layThongTinKhachHang = () => {
  const id = domId("id").value;
  const hoTen = domId("hoTen").value;
  const diaChi = domId("diaChi").value;
  const email = domId("email").value;
  const type = domId("doiTuong").value;
  const tenCongTy = domId("tenCongTy").value;
  const triGiaHoaDon = domId("triGiaHoaDon").value;
  const danhGia = domId("danhGia").value;
  const khachHang = new Customer(
    id,
    hoTen,
    diaChi,
    email,
    type,
    tenCongTy,
    triGiaHoaDon,
    danhGia
  );
  return khachHang;
};
window.themDoiTuong = () => {
  const loaiDoiTuong = domId("doiTuong").value;
  if (loaiDoiTuong === "Student") {
    const sinhVien = layThongTinSinhVien();
    listPerson.add(sinhVien);
  } else if (loaiDoiTuong === "Employee") {
    const giangVien = layThongTinGiangVien();
    listPerson.add(giangVien);
  } else if (loaiDoiTuong === "Customer") {
    const khachHang = layThongTinKhachHang();
    listPerson.add(khachHang);
  }
  saveData();
};
const setLocalStorage = () => {
  const stringify = JSON.stringify(listPerson.listUser);
  localStorage.setItem("LIST_PERSON_KEY", stringify);
};
const getLocalStorage = () => {
  const stringify = localStorage.getItem("LIST_PERSON_KEY");
  if (stringify) {
    listPerson.listUser = JSON.parse(stringify);
  }
};
window.onload = () => {
  getLocalStorage();
  renderTable();
};
const renderTable = (data = listPerson.listUser) => {
  const content = data.reduce((total, element) => {
    if (element.type === "Student") {
      total += `
        <tr>
          <td>${element.id}</td>
          <td>${element.hoTen}</td>
          <td>${element.diaChi}</td>
          <td>${element.email}</td>
          <td>${element.type}</td>
          <td>Điểm Toán:${element.toan}, Điểm Lý:${element.ly}, Điểm Hóa:${element.hoa},Điểm Trung Bình:</td>
          <td>
            <button class ='btn btn-primary' data-toggle="modal" data-target="#myModal" onclick = "editUser('${element.id}')">Sửa</button>
            <button onclick="deleteUser('${element.id}')" class ='btn btn-danger'>Xóa</button>
          </td>
        </tr>
      `;
      return total;
    } else if (element.type === "Employee") {
      total += `
        <tr>
          <td>${element.id}</td>
          <td>${element.hoTen}</td>
          <td>${element.diaChi}</td>
          <td>${element.email}</td>
          <td>${element.type}</td>
          <td>Số Ngày Làm Việc:${element.soNgayLamViec}, Lương Theo Ngày:${element.luongTheoNgay}</td>
          <td>
            <button class ='btn btn-primary' data-toggle="modal" data-target="#myModal" onclick = "editUser('${element.id}')">Sửa</button>
            <button onclick="deleteUser('${element.id}')" class ='btn btn-danger'>Xóa</button>
          </td>
        </tr>
      `;
      return total;
    } else if (element.type === "Customer") {
      total += `
        <tr>
          <td>${element.id}</td>
          <td>${element.hoTen}</td>
          <td>${element.diaChi}</td>
          <td>${element.email}</td>
          <td>${element.type}</td>
          <td>Tên Công Ty:${element.tenCongTy}, Trị Giá Hóa Đơn:${element.triGiaHoaDon}, Đánh Giá:${element.danhGia}</td>
          <td>
            <button class ='btn btn-primary' data-toggle="modal" data-target="#myModal" onclick = "editUser('${element.id}')">Sửa</button>
            <button onclick="deleteUser('${element.id}')" class ='btn btn-danger'>Xóa</button>
          </td>
        </tr>
      `;
      return total;
    }
  }, "");
  domId("tblDanhSachDoiTuong").innerHTML = content;
};
//delete user
window.deleteUser = (id) => {
  listPerson.delete(id);
  saveData();
};
//edit user
window.editUser = (userId) => {
  document.getElementsByClassName("modal-title")[0].innerHTML = "Edit User";
  const buttonAdd = `<button 
                      class="btn btn-success"
                      id="updateUser"
                      onclick ="updateUser()">
                      Update User
                    </button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = buttonAdd;
  const user = listPerson.findById(userId);
  if (user.type === "Student") {
    domId("formdiemToan").style.display = "block";
    domId("formdiemLy").style.display = "block";
    domId("formdiemHoa").style.display = "block";
    domId("formSoNgayLamViec").style.display = "none";
    domId("formLuongTheoNgay").style.display = "none";
    domId("formTenCongTy").style.display = "none";
    domId("formTriGiaHoaDon").style.display = "none";
    domId("formDanhGia").style.display = "none";

    domId("id").value = user.id;
    domId("hoTen").value = user.hoTen;
    domId("diaChi").value = user.diaChi;
    domId("email").value = user.email;
    domId("doiTuong").value = user.type;
    domId("diemToan").value = user.toan;
    domId("diemLy").value = user.ly;
    domId("diemHoa").value = user.hoa;
  } else if (user.type === "Employee") {
    domId("formdiemToan").style.display = "none";
    domId("formdiemLy").style.display = "none";
    domId("formdiemHoa").style.display = "none";
    domId("formSoNgayLamViec").style.display = "block";
    domId("formLuongTheoNgay").style.display = "block";
    domId("formTenCongTy").style.display = "none";
    domId("formTriGiaHoaDon").style.display = "none";
    domId("formDanhGia").style.display = "none";

    domId("id").value = user.id;
    domId("hoTen").value = user.hoTen;
    domId("diaChi").value = user.diaChi;
    domId("email").value = user.email;
    domId("doiTuong").value = user.type;
    domId("soNgayLamViec").value = user.soNgayLamViec;
    domId("luongTheoNgay").value = user.luongTheoNgay;
  } else if (user.type === "Customer") {
    domId("formdiemToan").style.display = "none";
    domId("formdiemLy").style.display = "none";
    domId("formdiemHoa").style.display = "none";
    domId("formSoNgayLamViec").style.display = "none";
    domId("formLuongTheoNgay").style.display = "none";
    domId("formTenCongTy").style.display = "block";
    domId("formTriGiaHoaDon").style.display = "block";
    domId("formDanhGia").style.display = "block";

    domId("id").value = user.id;
    domId("hoTen").value = user.hoTen;
    domId("diaChi").value = user.diaChi;
    domId("email").value = user.email;
    domId("doiTuong").value = user.type;
    domId("tenCongTy").value = user.tenCongTy;
    domId("triGiaHoaDon").value = user.triGiaHoaDon;
    domId("danhGia").value = user.danhGia;
  }
};
//update user
window.updateUser = () => {
  const loaiDoiTuong = domId("doiTuong").value;
  if (loaiDoiTuong === "Student") {
    const sinhVien = layThongTinSinhVien();
    listPerson.update(sinhVien);
  } else if (loaiDoiTuong === "Employee") {
    const giangVien = layThongTinGiangVien();
    listPerson.update(giangVien);
  } else if (loaiDoiTuong === "Customer") {
    const khachHang = layThongTinKhachHang();
    listPerson.update(khachHang);
  }
  saveData();
};
//sort by name
window.sortName = () => {
  const sort = domId("mySelect2").value;
  if (sort === "aToZ") {
    let listHoTen = listPerson.listUser;
    listHoTen.sort((a, b) => {
      if (a.hoTen < b.hoTen) {
        return -1;
      }
      if (a.hoTen > b.hoTen) {
        return 1;
      }
      return 0;
    });
    renderTable(listHoTen);
  } else if (sort === "zToA") {
    let listHoTen = listPerson.listUser;
    listHoTen.sort((a, b) => {
      if (a.hoTen < b.hoTen) {
        return 1;
      }
      if (a.hoTen > b.hoTen) {
        return -1;
      }
      return 0;
    });
    renderTable(listHoTen);
  }
};
//sort type
window.sortType = () => {
  const sortType = domId("mySelectType").value;
  if (sortType === "Student") {
    const filterStudent = listPerson.listUser.filter((element) => {
      if (element.type === "Student") {
        return true;
      }
      return false;
    });
    renderTable(filterStudent);
  } else if (sortType === "Employee") {
    const filterEmployee = listPerson.listUser.filter((element) => {
      if (element.type === "Employee") {
        return true;
      }
      return false;
    });
    renderTable(filterEmployee);
  } else if (sortType === "Customer") {
    const filterCustomer = listPerson.listUser.filter((element) => {
        if (element.type === "Customer") {
          return true;
        }
        return false;
      });
      renderTable(filterCustomer);
  }else{
    renderTable(listPerson.listUser);
  }
};
