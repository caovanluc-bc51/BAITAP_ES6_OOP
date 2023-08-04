import { Person } from "./person.js";

export class Customer extends Person{
    constructor(id,hoTen,diaChi,email,tenCongTy,triGiaHoaDon,danhGia){
        super(id,hoTen,diaChi,email);
        this.tenCongTy = tenCongTy;
        this.triGiaHoaDon = triGiaHoaDon;
        this.danhGia = danhGia;
    }
}