import { Person } from "./person.js";

export class Student extends Person{
    constructor(id,hoTen,diaChi,email,toan,ly,hoa){
        super(id,hoTen,diaChi,email);
        this.toan = toan;
        this.ly = ly;
        this.hoa = hoa;
    }
}