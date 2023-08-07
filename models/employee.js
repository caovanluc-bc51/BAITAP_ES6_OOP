import { Person } from "./person.js";

export class Employee extends Person{
    constructor(id,hoTen,diaChi,email,type,soNgayLamViec,luongTheoNgay){
        super(id,hoTen,diaChi,email,type);
        this.soNgayLamViec = soNgayLamViec;
        this.luongTheoNgay = luongTheoNgay;
    }
    tinhLuong(){
        return (this.soNgayLamViec * this.luongTheoNgay);
    }
}