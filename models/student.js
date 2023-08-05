import { Person } from "./person.js";

export class Student extends Person{
    constructor(id,hoTen,diaChi,email,type,toan,ly,hoa){
        super(id,hoTen,diaChi,email,type);
        this.toan = toan;
        this.ly = ly;
        this.hoa = hoa;
    };
    tinhDiemTrungBinh(){
        return (parseFloat(this.toan) + parseFloat(this.ly) + parseFloat(this.hoa)) / 3;
    }

}
