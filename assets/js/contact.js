let boxes = document.querySelectorAll('input[type="checkbox"]');
for (let i of boxes) {
  i.onclick = function () {
    let pai = this.closest(".contact__checkboxbtn");

    if (this.checked) {
      pai.style.backgroundColor = "white";
      pai.style.color = "#0a0a0b";
      var t = console.log(this.checked.value);
    } else {
      pai.style.backgroundColor = "transparent";
      pai.style.color = "white";
    }
  };
}

const tel = document.getElementById("telefone"); // Seletor do campo de telefone

tel.addEventListener("keypress", (e) => mascaraTelefone(e.target.value)); // Dispara quando digitado no campo
tel.addEventListener("change", (e) => mascaraTelefone(e.target.value)); // Dispara quando autocompletado o campo

const mascaraTelefone = (valor) => {
  valor = valor.replace(/\D/g, "");
  valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
  valor = valor.replace(/(\d)(\d{4})$/, "$1-$2");
  tel.value = valor; // Insere o(s) valor(es) no campo
};

//submitForm

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBEQ0BYpUMB8cWGZ5g8iuHD3yAsWVeT7AI",
  authDomain: "testesendemail-2664c.firebaseapp.com",
  databaseURL: "https://testesendemail-2664c-default-rtdb.firebaseio.com",
  projectId: "testesendemail-2664c",
  storageBucket: "testesendemail-2664c.appspot.com",
  messagingSenderId: "843112139677",
  appId: "1:843112139677:web:f242674c3a0c75ee2cbd74",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Refernece contactInfo collections
let contactInfo = firebase.database().ref("infos");

// Listen for a submit
document.querySelector(".contact-form").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var array = [];
  var checkboxes = document.querySelectorAll("input[type=checkbox]:checked");

  for (var i = 0; i < checkboxes.length; i++) {
    array.push(checkboxes[i].value);
  }

  //   Get input Values
  let service = array;
  let name = document.querySelector(".name").value;
  let email = document.querySelector(".email").value;
  let phone = document.querySelector(".phone").value;
  let company = document.querySelector(".company").value;
  let origin = document.querySelector(".origin").value;
  let message = document.querySelector(".message").value;
  console.log(service, name, email, phone, company, origin, message);

  let dataForm = {
    service: service,
    name: name,
    email: email,
    phone: phone,
    company: company,
    origin: origin,
    message: message,
  };

  let success = "";

  // saveContactInfo(service, name, email, phone, company, origin, message);
  // sendEmail(service, name, email, phone, company, origin, message);
  fetch("https://formsubmit.co/ajax/ganhandorendaextra9@gmail.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(dataForm),
  })
    .then((response) => response.json())
    .then((data) => data.success)
    .catch((error) => console.log(error));

  myFunction();

  document.querySelector(".contact-form").reset();
}

function myFunction() {
  // Get the snackbar DIV
  var x = document.getElementById("snackbar");

  // Add the "show" class to DIV
  x.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}

// function sendEmail() {
//   // https://github.com/github/fetch
//   fetch("https://formsubmit.co/ajax/ganhandorendaextra9@gmail.com", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//     body: JSON.stringify({
//       name: "FormSubmit",
//       message: "I'm from Devro LABS",
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) => console.log(data))
//     .catch((error) => console.log(error));
// }

// Save infos to Firebase
function saveContactInfo(
  service,
  name,
  email,
  phone,
  company,
  origin,
  message
) {
  let newContactInfo = contactInfo.push();

  newContactInfo.set({
    service: service,
    name: name,
    email: email,
    phone: phone,
    company: company,
    origin: origin,
    message: message,
  });
}
