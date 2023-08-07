import { Student } from "../models/student.js";
import { Employee } from "../models/employee.js";
import { Customer } from "../models/customer.js";
import { ListPerson } from "../services/listperson.js";
import { Validation } from "../models/validation.js";
const listPerson = new ListPerson();
const validation = new Validation();
const domId = (id) => document.getElementById(id);
const saveData = () => {
  setLocalStorage();
  renderTable();
};
//click vào add user
window.buttonAddUser = () => {
  resetInput();
  resetError();
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
    //reset chỗ này khi người dùng sau đó chọn lại đối tượng
    resetError();
  } else if (loaiDoiTuong === "Employee") {
    domId("formdiemToan").style.display = "none";
    domId("formdiemLy").style.display = "none";
    domId("formdiemHoa").style.display = "none";
    domId("formSoNgayLamViec").style.display = "block";
    domId("formLuongTheoNgay").style.display = "block";
    domId("formTenCongTy").style.display = "none";
    domId("formTriGiaHoaDon").style.display = "none";
    domId("formDanhGia").style.display = "none";
    resetError();
  } else if (loaiDoiTuong === "Customer") {
    domId("formdiemToan").style.display = "none";
    domId("formdiemLy").style.display = "none";
    domId("formdiemHoa").style.display = "none";
    domId("formSoNgayLamViec").style.display = "none";
    domId("formLuongTheoNgay").style.display = "none";
    domId("formTenCongTy").style.display = "block";
    domId("formTriGiaHoaDon").style.display = "block";
    domId("formDanhGia").style.display = "block";
    resetError();
  } else {
    domId("formdiemToan").style.display = "none";
    domId("formdiemLy").style.display = "none";
    domId("formdiemHoa").style.display = "none";
    domId("formSoNgayLamViec").style.display = "none";
    domId("formLuongTheoNgay").style.display = "none";
    domId("formTenCongTy").style.display = "none";
    domId("formTriGiaHoaDon").style.display = "none";
    domId("formDanhGia").style.display = "none";
    resetError();
  }
};

window.layThongTinSinhVien = (isAdd) => {
  const id = domId("id").value;
  const hoTen = domId("hoTen").value;
  const diaChi = domId("diaChi").value;
  const email = domId("email").value;
  const type = domId("doiTuong").value;
  const diemToan = domId("diemToan").value;
  const diemLy = domId("diemLy").value;
  const diemHoa = domId("diemHoa").value;
  //flag
  let isValid = true;
  //validation ID
  if (isAdd) {
    isValid &=
      validation.checkEmpty(id, "errorID", "(*) Vui lòng nhập ID") &&
      validation.checkPattern(
        id,
        "errorID",
        "(*) Vui lòng nhập ID bằng chữ số",
        /^[0-9]+$/
      ) &&
      validation.checkIdTonTai(
        id,
        "errorID",
        "ID đã tồn tại",
        listPerson.listUser
      );
  }
  //validation hoTen
  isValid &=
    validation.checkEmpty(hoTen, "errorHoTen", "(*) Vui lòng nhập họ tên") &&
    validation.checkPattern(
      hoTen,
      "errorHoTen",
      "(*) Vui lòng nhập họ tên bằng chữ cái",
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵýỷỹ\\s]+$"
    );
  //validation diaChi
  isValid &= validation.checkEmpty(
    diaChi,
    "errorDiaChi",
    "(*) Vui lòng nhập địa chỉ"
  );
  //validation email
  isValid &=
    validation.checkEmpty(email, "errorEmail", "(*) Vui lòng nhập email") &&
    validation.checkPattern(
      email,
      "errorEmail",
      "(*) Vui lòng nhập email đúng định dạng",
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    );
  //validation diemToan
  isValid &=
    validation.checkEmpty(
      diemToan,
      "errorDiemToan",
      "(*)Vui lòng nhập điểm Toán"
    ) &&
    validation.checkDiem(
      diemToan,
      "errorDiemToan",
      "(*) Vui lòng nhập điểm số từ 0 đến 10"
    ) &&
    validation.checkPattern(
      diemToan,
      "errorDiemToan",
      "(*) Vui lòng nhập điểm bằng chữ số",
      /^[0-9]+$/
    );
  //validation diemLy
  isValid &=
    validation.checkEmpty(diemLy, "errorDiemLy", "(*) Vui lòng nhập điểm Lý") &&
    validation.checkDiem(
      diemLy,
      "errorDiemLy",
      "(*) Vui lòng nhập điểm số từ 0 đến 10"
    ) &&
    validation.checkPattern(
      diemLy,
      "errorDiemLy",
      "(*) Vui lòng nhập điểm bằng chữ số",
      /^[0-9]+$/
    );
  //validation diemHoa
  isValid &=
    validation.checkEmpty(
      diemHoa,
      "errorDiemHoa",
      "(*) Vui lòng nhập điểm Hóa"
    ) &&
    validation.checkDiem(
      diemHoa,
      "errorDiemHoa",
      "(*) Vui lòng nhập điểm số từ 0 đến 10"
    ) &&
    validation.checkPattern(
      diemHoa,
      "errorDiemHoa",
      "(*) Vui lòng nhập điểm bằng chữ số",
      /^[0-9]+$/
    );
  if (isValid) {
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
    let DTB = sinhVien.tinhDiemTrungBinh();
    sinhVien.diemTrungBinh = DTB;
    return sinhVien;
  }
  return null;
};
window.layThongTinGiangVien = (isAdd) => {
  const id = domId("id").value;
  const hoTen = domId("hoTen").value;
  const diaChi = domId("diaChi").value;
  const email = domId("email").value;
  const type = domId("doiTuong").value;
  const soNgayLamViec = domId("soNgayLamViec").value;
  const luongTheoNgay = domId("luongTheoNgay").value;
  //flag
  let isValid = true;
  //validation ID
  if (isAdd) {
    isValid &=
      validation.checkEmpty(id, "errorID", "(*) Vui lòng nhập ID") &&
      validation.checkPattern(
        id,
        "errorID",
        "(*) Vui lòng nhập ID bằng chữ số",
        /^[0-9]+$/
      ) &&
      validation.checkIdTonTai(
        id,
        "errorID",
        "ID đã tồn tại",
        listPerson.listUser
      );
  }
  //validation hoTen
  isValid &=
    validation.checkEmpty(hoTen, "errorHoTen", "(*) Vui lòng nhập họ tên") &&
    validation.checkPattern(
      hoTen,
      "errorHoTen",
      "(*) Vui lòng nhập họ tên bằng chữ cái",
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵýỷỹ\\s]+$"
    );
  //validation diaChi
  isValid &= validation.checkEmpty(
    diaChi,
    "errorDiaChi",
    "(*) Vui lòng nhập địa chỉ"
  );
  //validation email
  isValid &=
    validation.checkEmpty(email, "errorEmail", "(*) Vui lòng nhập email") &&
    validation.checkPattern(
      email,
      "errorEmail",
      "(*) Vui lòng nhập email đúng định dạng",
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    );
  //validation soNgayLamViec
  isValid &=
    validation.checkEmpty(
      soNgayLamViec,
      "errorSoNgayLamViec",
      "(*) Vui lòng nhập số ngày làm việc"
    ) &&
    validation.checkGiaTriAm(
      soNgayLamViec,
      "errorSoNgayLamViec",
      "(*) Vui lòng nhập số ngày làm việc >= 0"
    ) &&
    validation.checkPattern(
      soNgayLamViec,
      "errorSoNgayLamViec",
      "(*) Vui lòng nhập số ngày làm việc bằng chữ số",
      /^[0-9]+$/
    );
  //validation luongTheoNgay
  isValid &=
    validation.checkEmpty(
      luongTheoNgay,
      "errorLuongTheoNgay",
      "(*) Vui lòng nhập lương theo ngày"
    ) &&
    validation.checkGiaTriAm(
      luongTheoNgay,
      "errorLuongTheoNgay",
      "(*) Vui lòng nhập lương theo ngày >= 0"
    ) &&
    validation.checkPattern(
      luongTheoNgay,
      "errorLuongTheoNgay",
      "(*) Vui lòng nhập lương theo ngày bằng chữ số",
      /^[0-9]+$/
    );
  if (isValid) {
    const giangVien = new Employee(
      id,
      hoTen,
      diaChi,
      email,
      type,
      soNgayLamViec,
      luongTheoNgay
    );
    let tinhLuong = giangVien.tinhLuong();
    giangVien.tienLuong = tinhLuong;
    return giangVien;
  }
  return null;
};
window.layThongTinKhachHang = (isAdd) => {
  const id = domId("id").value;
  const hoTen = domId("hoTen").value;
  const diaChi = domId("diaChi").value;
  const email = domId("email").value;
  const type = domId("doiTuong").value;
  const tenCongTy = domId("tenCongTy").value;
  const triGiaHoaDon = domId("triGiaHoaDon").value;
  const danhGia = domId("danhGia").value;
  //flag
  let isValid = true;
  //validation ID
  if (isAdd) {
    isValid &=
      validation.checkEmpty(id, "errorID", "(*) Vui lòng nhập ID") &&
      validation.checkPattern(
        id,
        "errorID",
        "(*) Vui lòng nhập ID bằng chữ số",
        /^[0-9]+$/
      ) &&
      validation.checkIdTonTai(
        id,
        "errorID",
        "ID đã tồn tại",
        listPerson.listUser
      );
  }
  //validation hoTen
  isValid &=
    validation.checkEmpty(hoTen, "errorHoTen", "(*) Vui lòng nhập họ tên") &&
    validation.checkPattern(
      hoTen,
      "errorHoTen",
      "(*) Vui lòng nhập họ tên bằng chữ cái",
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵýỷỹ\\s]+$"
    );
  //validation diaChi
  isValid &= validation.checkEmpty(
    diaChi,
    "errorDiaChi",
    "(*) Vui lòng nhập địa chỉ"
  );
  //validation email
  isValid &=
    validation.checkEmpty(email, "errorEmail", "(*) Vui lòng nhập email") &&
    validation.checkPattern(
      email,
      "errorEmail",
      "(*) Vui lòng nhập email đúng định dạng",
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    );
  //validation tenCongTy
  isValid &= validation.checkEmpty(
    tenCongTy,
    "errorTenCongTy",
    "(*) Vui lòng nhập tên công ty"
  );
  //validation triGiaHoaDon
  isValid &=
    validation.checkEmpty(
      triGiaHoaDon,
      "errorTriGiaHoaDon",
      "(*) Vui lòng nhập trị giá hóa đơn"
    ) &&
    validation.checkGiaTriAm(
      triGiaHoaDon,
      "errorTriGiaHoaDon",
      "(*) Vui lòng nhập trị giá hóa đơn >= 0"
    ) &&
    validation.checkPattern(
      triGiaHoaDon,
      "errorTriGiaHoaDon",
      "(*) Vui lòng nhập trị giá hóa đơn bằng chữ số",
      /^[0-9]+$/
    );
  //validation danhGia
  isValid &= validation.checkEmpty(
    danhGia,
    "errorDanhGia",
    "(*) Vui lòng nhập đánh giá"
  );
  if (isValid) {
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
  }
  return null;
};
window.themDoiTuong = () => {
  //phải dom tới type để xác định được type là loại nào, rồi nó mới vào function nào
  const loaiDoiTuong = domId("doiTuong").value;
  if (loaiDoiTuong === "Student") {
    const sinhVien = layThongTinSinhVien(true);
    if (sinhVien) {
      if (confirm(`Are you sure to add user?`)) {
        listPerson.add(sinhVien);
        document.getElementsByClassName("close")[0].click();
        saveData();
      } else {
        document.getElementsByClassName("close")[0].click();
      }
    }
  } else if (loaiDoiTuong === "Employee") {
    const giangVien = layThongTinGiangVien(true);
    if (giangVien) {
      if (confirm(`Are you sure to add user?`)) {
        listPerson.add(giangVien);
        document.getElementsByClassName("close")[0].click();
        saveData();
      } else {
        document.getElementsByClassName("close")[0].click();
      }
    }
  } else if (loaiDoiTuong === "Customer") {
    const khachHang = layThongTinKhachHang(true);
    if (khachHang) {
      if (confirm(`Are you sure to add user?`)) {
        listPerson.add(khachHang);
        document.getElementsByClassName("close")[0].click();
        saveData();
      } else {
        document.getElementsByClassName("close")[0].click();
      }
    }
  } else if (loaiDoiTuong === "selecType") {
    const id = domId("id").value;
    const hoTen = domId("hoTen").value;
    const diaChi = domId("diaChi").value;
    const email = domId("email").value;
    const type = domId("doiTuong").value;
    //flag
    let isValid = true;
    //validation ID
    isValid &=
      validation.checkEmpty(id, "errorID", "(*) Vui lòng nhập ID") &&
      validation.checkPattern(
        id,
        "errorID",
        "(*) Vui lòng nhập ID bằng chữ số",
        /^[0-9]+$/
      ) &&
      validation.checkIdTonTai(
        id,
        "errorID",
        "ID đã tồn tại",
        listPerson.listUser
      );
    //validation hoTen
    isValid &=
      validation.checkEmpty(hoTen, "errorHoTen", "(*) Vui lòng nhập họ tên") &&
      validation.checkPattern(
        hoTen,
        "errorHoTen",
        "(*) Vui lòng nhập họ tên bằng chữ cái",
        "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
          "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
          "ụủứừỬỮỰỲỴÝỶỸửữựỳỵýỷỹ\\s]+$"
      );
    //validation diaChi
    isValid &= validation.checkEmpty(
      diaChi,
      "errorDiaChi",
      "(*) Vui lòng nhập địa chỉ"
    );
    //validation email
    isValid &=
      validation.checkEmpty(email, "errorEmail", "(*) Vui lòng nhập email") &&
      validation.checkPattern(
        email,
        "errorEmail",
        "(*) Vui lòng nhập email đúng định dạng",
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      );
    //validation type
    isValid &= validation.checkType(
      "doiTuong",
      "errorDoiTuong",
      "(*) Vui lòng chọn đối tượng"
    );
  }
};

//edit user
window.editUser = (userId) => {
  //reset error
  resetError();
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
    //bóc tách phần tử
    const { id, hoTen, diaChi, email, type, toan, ly, hoa } = user;
    domId("id").value = id;
    domId("id").disabled = true;
    domId("hoTen").value = hoTen;
    domId("diaChi").value = diaChi;
    domId("email").value = email;
    domId("doiTuong").value = type;
    domId("diemToan").value = toan;
    domId("diemLy").value = ly;
    domId("diemHoa").value = hoa;
  } else if (user.type === "Employee") {
    domId("formdiemToan").style.display = "none";
    domId("formdiemLy").style.display = "none";
    domId("formdiemHoa").style.display = "none";
    domId("formSoNgayLamViec").style.display = "block";
    domId("formLuongTheoNgay").style.display = "block";
    domId("formTenCongTy").style.display = "none";
    domId("formTriGiaHoaDon").style.display = "none";
    domId("formDanhGia").style.display = "none";
    //bóc tách phần tử
    const { id, hoTen, diaChi, email, type, soNgayLamViec, luongTheoNgay } =
      user;
    domId("id").value = id;
    domId("id").disabled = true;
    domId("hoTen").value = hoTen;
    domId("diaChi").value = diaChi;
    domId("email").value = email;
    domId("doiTuong").value = type;
    domId("soNgayLamViec").value = soNgayLamViec;
    domId("luongTheoNgay").value = luongTheoNgay;
  } else if (user.type === "Customer") {
    domId("formdiemToan").style.display = "none";
    domId("formdiemLy").style.display = "none";
    domId("formdiemHoa").style.display = "none";
    domId("formSoNgayLamViec").style.display = "none";
    domId("formLuongTheoNgay").style.display = "none";
    domId("formTenCongTy").style.display = "block";
    domId("formTriGiaHoaDon").style.display = "block";
    domId("formDanhGia").style.display = "block";
    //bóc tách phần tử
    const { id, hoTen, diaChi, email, type, tenCongTy, triGiaHoaDon, danhGia } =
      user;
    domId("id").value = id;
    domId("id").disabled = true;
    domId("hoTen").value = hoTen;
    domId("diaChi").value = diaChi;
    domId("email").value = email;
    domId("doiTuong").value = type;
    domId("tenCongTy").value = tenCongTy;
    domId("triGiaHoaDon").value = triGiaHoaDon;
    domId("danhGia").value = danhGia;
  }
};
//update user
window.updateUser = () => {
  const loaiDoiTuong = domId("doiTuong").value;
  if (loaiDoiTuong === "Student") {
    //fasle ở đây là để không check trùng id nếu trong t/h update đối tượng
    const sinhVien = layThongTinSinhVien(false);
    if (sinhVien) {
      if (confirm(`Are you sure to update user?`)) {
        listPerson.update(sinhVien);
        saveData();
        document.getElementsByClassName("close")[0].click();
      } else {
        document.getElementsByClassName("close")[0].click();
      }
    }
  } else if (loaiDoiTuong === "Employee") {
    const giangVien = layThongTinGiangVien(false);
    if (giangVien) {
      if (confirm(`Are you sure to update user?`)) {
        listPerson.update(giangVien);
        saveData();
        document.getElementsByClassName("close")[0].click();
      } else {
        document.getElementsByClassName("close")[0].click();
      }
    }
  } else if (loaiDoiTuong === "Customer") {
    const khachHang = layThongTinKhachHang(false);
    if (khachHang) {
      if (confirm(`Are you sure to update user?`)) {
        listPerson.update(khachHang);
        saveData();
        document.getElementsByClassName("close")[0].click();
      } else {
        document.getElementsByClassName("close")[0].click();
      }
    }
  } else {
    document.getElementsByClassName("close")[0].click();
  }
};
//setLocalStorage
const setLocalStorage = () => {
  const stringify = JSON.stringify(listPerson.listUser);
  localStorage.setItem("LIST_PERSON_KEY", stringify);
};
//getLocalStorage
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
//renderTable
const renderTable = (data = listPerson.listUser) => {
  const content = data.reduce((total, element) => {
    if (element) {
      const numberFormat = new Intl.NumberFormat("VN-vn");
      if (element.type === "Student") {
        total += `
          <tr>
            <td>${element.id}</td>
            <td>${element.hoTen}</td>
            <td>${element.diaChi}</td>
            <td>${element.email}</td>
            <td>${element.type}</td>
            <td>Điểm Toán: ${element.toan}, Điểm Lý: ${element.ly}, Điểm Hóa: ${
          element.hoa
        }<br/> -> Điểm Trung Bình: ${element.diemTrungBinh.toFixed(1)}</td>
            <td>
              <button class ='btn btn-primary' data-toggle="modal" data-target="#myModal" onclick = "editUser('${
                element.id
              }')">Sửa</button>
              <button onclick="deleteUser('${
                element.id
              }')" class ='btn btn-danger'>Xóa</button>
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
            <td>Số Ngày Làm Việc: ${element.soNgayLamViec}, Lương Theo Ngày: ${
          element.luongTheoNgay
        } <br/>-> Tiền Lương: ${numberFormat.format(element.tienLuong)}đ</td>
            <td>
              <button class ='btn btn-primary' data-toggle="modal" data-target="#myModal" onclick = "editUser('${
                element.id
              }')">Sửa</button>
              <button onclick="deleteUser('${
                element.id
              }')" class ='btn btn-danger'>Xóa</button>
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
            <td>Tên Công Ty: ${element.tenCongTy}, Trị Giá Hóa Đơn: ${element.triGiaHoaDon}, Đánh Giá: ${element.danhGia}</td>
            <td>
              <button class ='btn btn-primary' data-toggle="modal" data-target="#myModal" onclick = "editUser('${element.id}')">Sửa</button>
              <button onclick="deleteUser('${element.id}')" class ='btn btn-danger'>Xóa</button>
            </td>
          </tr>
        `;
        return total;
      }
    }
  }, "");
  if (content) {
    domId("tblDanhSachDoiTuong").innerHTML = content;
  }
};
//delete user
window.deleteUser = (id) => {
  if (confirm(`Are you sure to delete user?`)) {
    listPerson.delete(id);
    saveData();
  }
};
//sort by name
window.sortName = () => {
  const sort = domId("mySelect2").value;
  if (sort === "aToZ") {
    let listHoTen = listPerson.listUser;
    listHoTen.sort((a, b) => {
      if (
        a.hoTen.split(" ").pop().toLowerCase() <
        b.hoTen.split(" ").pop().toLowerCase()
      ) {
        return -1;
      }
      if (
        a.hoTen.split(" ").pop().toLowerCase() >
        b.hoTen.split(" ").pop().toLowerCase()
      ) {
        return 1;
      }
      return 0;
    });
    renderTable(listHoTen);
  } else if (sort === "zToA") {
    let listHoTen = listPerson.listUser;
    listHoTen.sort((a, b) => {
      if (
        a.hoTen.split(" ").pop().toLowerCase() <
        b.hoTen.split(" ").pop().toLowerCase()
      ) {
        return 1;
      }
      if (
        a.hoTen.split(" ").pop().toLowerCase() >
        b.hoTen.split(" ").pop().toLowerCase()
      ) {
        return -1;
      }
      return 0;
    });
    renderTable(listHoTen);
  } else {
    //lấy data dưới localStrorage để render lại bảng ban đầu
    getLocalStorage();
    renderTable();
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
    if (filterStudent.length === 0) {
      domId("tblDanhSachDoiTuong").innerHTML = "";
    } else {
      renderTable(filterStudent);
    }
  } else if (sortType === "Employee") {
    const filterEmployee = listPerson.listUser.filter((element) => {
      if (element.type === "Employee") {
        return true;
      }
      return false;
    });
    if (filterEmployee.length === 0) {
      domId("tblDanhSachDoiTuong").innerHTML = "";
    } else {
      renderTable(filterEmployee);
    }
  } else if (sortType === "Customer") {
    const filterCustomer = listPerson.listUser.filter((element) => {
      if (element.type === "Customer") {
        return true;
      }
      return false;
    });
    if (filterCustomer.length === 0) {
      domId("tblDanhSachDoiTuong").innerHTML = "";
    } else {
      renderTable(filterCustomer);
    }
  } else {
    renderTable(listPerson.listUser);
  }
};
//RESET INPUT
const resetInput = () => {
  domId("id").value = "";
  domId("id").disabled = false;
  domId("hoTen").value = "";
  domId("diaChi").value = "";
  domId("email").value = "";
  domId("diemToan").value = "";
  domId("diemLy").value = "";
  domId("diemHoa").value = "";
  domId("soNgayLamViec").value = "";
  domId("luongTheoNgay").value = "";
  domId("tenCongTy").value = "";
  domId("triGiaHoaDon").value = "";
  domId("danhGia").value = "";
};
//RESET ERROR
const resetError = () => {
  domId("errorID").innerHTML = "";
  domId("errorHoTen").innerHTML = "";
  domId("errorDiaChi").innerHTML = "";
  domId("errorEmail").innerHTML = "";
  domId("errorDiemToan").innerHTML = "";
  domId("errorDiemLy").innerHTML = "";
  domId("errorDiemHoa").innerHTML = "";
  domId("errorSoNgayLamViec").innerHTML = "";
  domId("errorLuongTheoNgay").innerHTML = "";
  domId("errorTenCongTy").innerHTML = "";
  domId("errorTriGiaHoaDon").innerHTML = "";
  domId("errorDanhGia").innerHTML = "";
  domId("errorDoiTuong").innerHTML = "";
};
//validation keyup id
const checkId = domId("id");
if (checkId) {
  checkId.addEventListener("click", () => {
    domId("id").addEventListener("keyup", checkClickID);
  });
}
const checkClickID = () => {
  const id = domId("id").value;
  let isValid = true;
  isValid &=
    validation.checkEmpty(id, "errorID", "(*) Vui lòng nhập ID") &&
    validation.checkPattern(
      id,
      "errorID",
      "(*) Vui lòng nhập ID bằng chữ số",
      /^[0-9]+$/
    ) &&
    validation.checkIdTonTai(
      id,
      "errorID",
      "ID đã tồn tại",
      listPerson.listUser
    );
};
//validation keyup hoTen
const checkHoTen = domId("hoTen");
if (checkHoTen) {
  checkHoTen.addEventListener("click", () => {
    console.log(123);
    domId("hoTen").addEventListener("keyup", checkClickHoTen);
  });
}
const checkClickHoTen = () => {
  const hoTen = domId("hoTen").value;
  let isValid = true;
  isValid &=
    validation.checkEmpty(hoTen, "errorHoTen", "(*) Vui lòng nhập họ tên") &&
    validation.checkPattern(
      hoTen,
      "errorHoTen",
      "(*) Vui lòng nhập họ tên bằng chữ cái",
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵýỷỹ\\s]+$"
    );
};
//validation keyup diaChi
const checkDiaChi = domId("diaChi");
if (checkDiaChi) {
  checkDiaChi.addEventListener("click", () => {
    domId("diaChi").addEventListener("keyup", checkClickDiaChi);
  });
}
const checkClickDiaChi = () => {
  const diaChi = domId("diaChi").value;
  let isValid = true;
  isValid &= validation.checkEmpty(
    diaChi,
    "errorDiaChi",
    "(*) Vui lòng nhập địa chỉ"
  );
};
//validation keyup email
const checkEmail = domId("email");
if (checkEmail) {
  checkEmail.addEventListener("click", () => {
    domId("email").addEventListener("keyup", checkClickEmail);
  });
}
const checkClickEmail = () => {
  const email = domId("email").value;
  let isValid = true;
  isValid &=
    validation.checkEmpty(email, "errorEmail", "(*) Vui lòng nhập email") &&
    validation.checkPattern(
      email,
      "errorEmail",
      "(*) Vui lòng nhập email đúng định dạng",
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    );
};
//validation keyup diemToan
const checkDiemToan = domId("diemToan");
if (checkDiemToan) {
  checkDiemToan.addEventListener("click", () => {
    domId("diemToan").addEventListener("keyup", checkClickDiemToan);
  });
}
const checkClickDiemToan = () => {
  const diemToan = domId("diemToan").value;
  let isValid = true;
  isValid &=
    validation.checkEmpty(
      diemToan,
      "errorDiemToan",
      "(*) Vui lòng nhập điểm Toán"
    ) &&
    validation.checkDiem(
      diemToan,
      "errorDiemToan",
      "(*) Vui lòng nhập điểm số từ 0 đến 10"
    ) &&
    validation.checkPattern(
      diemToan,
      "errorDiemToan",
      "(*) Vui lòng nhập điểm bằng chữ số",
      /^[0-9]+$/
    );
};
//validation keyup diemLy
const checkDiemLy = domId("diemLy");
if (checkDiemLy) {
  checkDiemLy.addEventListener("click", () => {
    domId("diemLy").addEventListener("keyup", checkClickDiemLy);
  });
}
const checkClickDiemLy = () => {
  const diemLy = domId("diemLy").value;
  let isValid = true;
  isValid &=
    validation.checkEmpty(diemLy, "errorDiemLy", "(*) Vui lòng nhập điểm Lý") &&
    validation.checkDiem(
      diemLy,
      "errorDiemLy",
      "(*) Vui lòng nhập điểm số từ 0 đến 10"
    ) &&
    validation.checkPattern(
      diemLy,
      "errorDiemLy",
      "(*) Vui lòng nhập điểm bằng chữ số",
      /^[0-9]+$/
    );
};
//validation keyup diemHoa
const checkDiemHoa = domId("diemHoa");
if (checkDiemHoa) {
  checkDiemHoa.addEventListener("click", () => {
    domId("diemHoa").addEventListener("keyup", checkClickDiemHoa);
  });
}
const checkClickDiemHoa = () => {
  const diemHoa = domId("diemHoa").value;
  let isValid = true;
  isValid &=
    validation.checkEmpty(
      diemHoa,
      "errorDiemHoa",
      "(*) Vui lòng nhập điểm Hóa"
    ) &&
    validation.checkDiem(
      diemHoa,
      "errorDiemHoa",
      "(*) Vui lòng nhập điểm số từ 0 đến 10"
    ) &&
    validation.checkPattern(
      diemHoa,
      "errorDiemHoa",
      "(*) Vui lòng nhập điểm bằng chữ số",
      /^[0-9]+$/
    );
};
//valition keyup soNgayLamViec
const checkSoNgayLamViec = domId("soNgayLamViec");
if (checkSoNgayLamViec) {
  checkSoNgayLamViec.addEventListener("click", () => {
    domId("soNgayLamViec").addEventListener("keyup", checkClickSoNgayLamViec);
  });
}
const checkClickSoNgayLamViec = () => {
  const soNgayLamViec = domId("soNgayLamViec").value;
  let isValid = true;
  isValid &=
    validation.checkEmpty(
      soNgayLamViec,
      "errorSoNgayLamViec",
      "(*) Vui lòng nhập số ngày làm việc"
    ) &&
    validation.checkGiaTriAm(
      soNgayLamViec,
      "errorSoNgayLamViec",
      "(*) Vui lòng nhập số ngày làm việc >= 0"
    ) &&
    validation.checkPattern(
      soNgayLamViec,
      "errorSoNgayLamViec",
      "(*) Vui lòng nhập số ngày làm việc bằng chữ số",
      /^[0-9]+$/
    );
};
//validation keyup luongTheoNgay
const checkLuongTheoNgay = domId("luongTheoNgay");
if (checkLuongTheoNgay) {
  checkLuongTheoNgay.addEventListener("click", () => {
    domId("luongTheoNgay").addEventListener("keyup", checkClickLuongTheoNgay);
  });
}
const checkClickLuongTheoNgay = () => {
  const luongTheoNgay = domId("luongTheoNgay").value;
  let isValid = true;
  isValid &=
    validation.checkEmpty(
      luongTheoNgay,
      "errorLuongTheoNgay",
      "(*) Vui lòng nhập lương theo ngày"
    ) &&
    validation.checkGiaTriAm(
      luongTheoNgay,
      "errorLuongTheoNgay",
      "(*) Vui lòng nhập lương theo ngày >= 0"
    ) &&
    validation.checkPattern(
      luongTheoNgay,
      "errorLuongTheoNgay",
      "(*) Vui lòng nhập lương theo ngày bằng chữ số",
      /^[0-9]+$/
    );
};
//validation keyup tenCongTy
const checkTenCongTy = domId("tenCongTy");
if (checkTenCongTy) {
  checkTenCongTy.addEventListener("click", () => {
    domId("tenCongTy").addEventListener("keyup", checkClickTenCongTy);
  });
}
const checkClickTenCongTy = () => {
  const tenCongTy = domId("tenCongTy").value;
  let isValid = true;
  isValid &= validation.checkEmpty(
    tenCongTy,
    "errorTenCongTy",
    "(*) Vui lòng nhập tên công ty"
  );
};
//validation keyup triGiaHoaDon
const checkTriGiaHoaDon = domId("triGiaHoaDon");
if (checkTriGiaHoaDon) {
  checkTriGiaHoaDon.addEventListener("click", () => {
    domId("triGiaHoaDon").addEventListener("keyup", checkClickTriGiaHoaDon);
  });
}
const checkClickTriGiaHoaDon = () => {
  const triGiaHoaDon = domId("triGiaHoaDon").value;
  let isValid = true;
  isValid &=
    validation.checkEmpty(
      triGiaHoaDon,
      "errorTriGiaHoaDon",
      "(*) Vui lòng nhập trị giá hóa đơn"
    ) &&
    validation.checkGiaTriAm(
      triGiaHoaDon,
      "errorTriGiaHoaDon",
      "(*) Vui lòng nhập trị giá hóa đơn >= 0"
    ) &&
    validation.checkPattern(
      triGiaHoaDon,
      "errorTriGiaHoaDon",
      "(*) Vui lòng nhập trị giá hóa đơn bằng chữ số",
      /^[0-9]+$/
    );
};
//validation keyup danhGia
const checkDanhGia = domId("danhGia");
if (checkDanhGia) {
  checkDanhGia.addEventListener("click", () => {
    domId("danhGia").addEventListener("keyup", checkClickDanhGia);
  });
}
const checkClickDanhGia = () => {
  const danhGia = domId("danhGia").value;
  let isValid = true;
  isValid &= validation.checkEmpty(
    danhGia,
    "errorDanhGia",
    "(*) Vui lòng nhập đánh giá"
  );
};

