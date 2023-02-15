let element = (id) => document.getElementById(id);

let classes = (classes) => document.getElementsByClassName(classes);

let user_entries = [];

function fillTable() {
  let o = localStorage.getItem("user_entries");
  if (o) {
    user_entries = JSON.parse(o);
  } else {
    user_entries = [];
  }
  return user_entries;
}
user_entries = fillTable();

let username = element("name"),
  email = element("email"),
  password = element("password"),
  tc = element("tc"),
  dob = element("dob");

let errormsg = classes("errormsg");

let form = element("form");

function verify(elem, message, cnd) {
  if (cnd) {
    elem.style.border = "2px solid red";
    elem.setCustomValidity(message);
    elem.reportValidity();
  } else {
    elem.style.border = "2px solid green";
    elem.setCustomValidity("");
  }
}

function checkDOB() {
  let age = new Date().getFullYear() - new Date(dob.value).getFullYear();
  if (age < 18 || age > 55) {
    return false;
  } else {
    return true;
  }
}
let e_mail = "Username must be at least 3 characters long";
let message_email = "Email must be valid";
let message_agree = "You must agree to the terms and conditions";
let message_dob = "You age must be between 18 and 55 to continue";

username.addEventListener("input", (e) => {
  let cond_name = username.value.length < 3;
  e.preventDefault();
  verify(username, e_mail, cond_name);
});

email.addEventListener("input", (e) => {
  let cond_email = !(email.value.includes("@") && email.value.includes("."));
  e.preventDefault();
  verify(email, message_email, cond_email);
});

dob.addEventListener("input", (e) => {
  let cond_dob = !checkDOB();
  e.preventDefault();
  verify(dob, message_dob, cond_dob);
});
tc.addEventListener("input", (e) => {
  let cond_agree = !tc.checked;
  e.preventDefault();
  verify(tc, message_agree, cond_agree);
});

function makeoect() {
  let check = false;
  if (tc.checked) {
    check = true;
  }
  let o = {
    name: username.value,
    email: email.value,
    password: password.value,
    dob: dob.value,
    checked: check,
  };
  return o;
}

function displayTable() {
  let table = element("user-table");
  let e = user_entries;
  let str = `<tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Dob</th>
                    <th>Accepted terms?</th>
                </tr>\n`;
  for (let i = 0; i < e.length; i++) {
    str += `<tr>
                    <td>${e[i].name}</td>
                    <td>${e[i].email}</td>
                    <td>${e[i].password}</td>
                    <td>${e[i].dob}</td>
                    <td>${e[i].checked}</td>
                </tr>\n`;
  }
  table.innerHTML = str;
}

form.addEventListener("submit", (e) => {
  let cond_agree = !tc.checked;
  e.preventDefault();
  if (!cond_agree) {
    let o = makeoect();
    user_entries.push(o);
    localStorage.setItem("user_entries", JSON.stringify(user_entries));
  }
  displayTable();
});
window.onload = (event) => {
  displayTable();
};
