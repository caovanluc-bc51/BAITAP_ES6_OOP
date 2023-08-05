export class ListPerson {
  listUser = [];
  //add user
  add = (user) => {
    this.listUser = [...this.listUser, user];
  };
  //delete user
  delete = (id) => {
    const index = this.listUser.findIndex((element) => {
      return element.id === id;
    });
    this.listUser.splice(index, 1);
  };
  //findById
  findById(id) {
    const existedUser = this.listUser.find((element) =>{
        return element.id === id;
    });
    return existedUser;
  };
  //update user
  update(user){
    const index = this.listUser.findIndex((element) =>{
        return element.id === user.id;
    });
    this.listUser[index] = user;
  };
}
