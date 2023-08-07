export class Validation {
  checkEmpty(value, errorId, mess) {
    if (value === "") {
      //show error để thông báo
      document.getElementById(errorId).innerHTML = mess;
      document.getElementById(errorId).style.display = "block";
      return false;
    }
    //hide error
    document.getElementById(errorId).innerHTML = "";
    document.getElementById(errorId).style.display = "none";
    return true;
  };
  checkType(idSelect, errorId, mess) {
    const selectType = document.getElementById(idSelect);
    if (selectType.selectedIndex !== 0) {
      document.getElementById(errorId).innerHTML = "";
      document.getElementById(errorId).style.display = "none";
      return true;
    }
    document.getElementById(errorId).innerHTML = mess;
    document.getElementById(errorId).style.display = "block";
    return false;
  };
  checkPattern(value, errorId, mess, letter) {
    if (value.match(letter)) {
      //true
      document.getElementById(errorId).innerHTML = "";
      document.getElementById(errorId).style.display = "none";
      return true;
    }
    //false
    document.getElementById(errorId).innerHTML = mess;
    document.getElementById(errorId).style.display = "block";
    return false;
  };
  checkDiem(value, errorId, mess) {
    if (parseFloat(value) < 0 ||  parseFloat(value) > 10) {
      document.getElementById(errorId).innerHTML = mess;
      document.getElementById(errorId).style.display = "block";
      return false;
    }
    document.getElementById(errorId).innerHTML = "";
    document.getElementById(errorId).style.display = "none";
    return true;
  };
  checkGiaTriAm(value, errorId, mess) {
    if (parseFloat(value) < 0) {
      document.getElementById(errorId).innerHTML = mess;
      document.getElementById(errorId).style.display = "block";
      return false;
    }
    document.getElementById(errorId).innerHTML = "";
    document.getElementById(errorId).style.display = "none";
    return true;
  };
  checkIdTonTai(value, errorId, mess, listuser) {
    let isExist = false;
    for (const index in listuser) {
      let user = listuser[index];
      if (user.id == value) {
        isExist = true;
        break;
      }
    }
    if (isExist) {
      document.getElementById(errorId).innerHTML = mess;
      document.getElementById(errorId).style.display = "block";
      return false;
    }
    document.getElementById(errorId).innerHTML = "";
    document.getElementById(errorId).style.display = "none";
    return true;
  }
}
