import { Person } from "./person.js";

export class Employee extends Person{
    constructor(id,hoTen,diaChi,email,soNgayLamViec,luongTheoNgay){
        super(id,hoTen,diaChi,email);
        this.soNgayLamViec = soNgayLamViec;
        this.luongTheoNgay = luongTheoNgay;
    }
}