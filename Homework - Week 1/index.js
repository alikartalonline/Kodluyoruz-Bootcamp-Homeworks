
// Post Button 
let postButton = document.querySelector('#postButton');
postButton.innerHTML = "Postları Yükle";
postButton.classList.add('btn', 'btn-primary', 'mt-3');
let postList = document.querySelector('#postList');
let postLoading = document.querySelector('#postLoading');


postButton.addEventListener('click', function () {

  this.style.backgroundColor = "red";

  postLoading.innerHTML = `<h3>LOADING ...</h3>`;

  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(json => json.slice(0, 10))
    .then(resJson => {
      resJson.forEach(item => {
        let liDOM = document.createElement('li');
        liDOM.classList.add('list-group-item');
        liDOM.innerHTML = `<div class="card">
                <div class="card-body">
                <h5 class="card-title text-danger">${item.id}. ${item.title.slice(0, 1).toUpperCase()}${item.title.slice(1, item.title.length - 1).toLowerCase()}</h5>
                <p>${item.body.slice(0, 1).toUpperCase()}${item.body.slice(1, item.body.length - 1).toLowerCase()}</p>
                </div>
                </div>`
        postList.appendChild(liDOM);

      })
    })
    .then(() => postLoading.innerHTML = `<h3></h3>`)
    .finally(() => postLoading.appendChild(postList))
});



// User Button
let userButton = document.querySelector('#userButton');
userButton.innerHTML = "Kullanıcıları Yükle";
userButton.classList.add('btn', 'btn-warning', 'mt-3');
let userList = document.querySelector('#userList')

// Fetch Api
let users = [];
const loadUsers = () => {

  fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(res => {
      users = res.map((x, index) => {
        x.orderNo = index + 1
        return x
      })
      renderUsers(users)
    }).catch(err => {
      console.error(err)
    })
}

// User Button 'Click' for Users
userButton.addEventListener("click", loadUsers)

// Users info and Table (start)
let user = {}
const renderUsers = (users = []) => {
  userList.innerHTML = "";

  let table = document.createElement("table");
  table.classList.add("table");

  let thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
    <th scope="col" id="reverseId">Id</th>
    <th scope="col" id="reverseSıraNo">Sıra No</th>
    <th scope="col" id="reverseName">Name</th>
    <th scope="col" id="reverseEmail">Email</th>
    <th scope="col" id="reversePhone">Phone</th>
    <th scope="col" id="reverseWebsite">Website</th>
    <th scope="col" id="reverseActions">Actions</th>
    </tr>`;
  table.appendChild(thead);

  let tbody = document.createElement("tbody");

  tbody.innerHTML = users.map((user, index) => {
    return `<tr>
    <th scope="row">${user.id}</th>
    <th>${index + 1}</th>
    <td>${user.name}</td>
    <td>${user.email}</td>
    <td>${user.phone}</td>
    <td>${user.website}</td>
    <td>

    <button type="button" class="btn btn-danger btn-sm remove" data-id="${user.id}">Sil</button>

    <button type="button" data-bs-toggle="collapse" data-bs-target="#userNone" aria-expanded="false" aria-controls="userNone" class="btn btn-warning btn-sm update" data-id="${user.id}">Düzenle</button>

    </td>
  </tr>`}).join(" ");


  table.appendChild(tbody)
  userList.appendChild(table)

  // istersek butona da çevirebiliriz başlıkları
  // document.querySelector("#nameSort").classList.add("btn", "text-dark");
  document.querySelector("#reverseId").addEventListener("click", reverseItems)
  document.querySelector("#reverseSıraNo").addEventListener("click", reverseItems)
  document.querySelector("#reverseName").addEventListener("click", reverseItems)
  document.querySelector("#reverseEmail").addEventListener("click", reverseItems)
  document.querySelector("#reversePhone").addEventListener("click", reverseItems)
  document.querySelector("#reverseWebsite").addEventListener("click", reverseItems)
  document.querySelector("#reverseActions").addEventListener("click", reverseItems)


  function reverseItems() {
    tbody.innerHTML = users.map((user, index) => {
      return `<tr>
  <th scope="row">${user.id}</th>
  <th>${index + 1}</th>
  <td>${user.name}</td>
  <td>${user.email}</td>
  <td>${user.phone}</td>
  <td>${user.website}</td>
  <td>

  <button type="button" class="btn btn-danger btn-sm remove" data-id="${user.id}">Sil</button>

  <button type="button" data-bs-toggle="collapse" data-bs-target="#userNone" aria-expanded="false" aria-controls="userNone" class="btn btn-warning btn-sm update" data-id="${user.id}">Düzenle</button>

  </td>
</tr>`}).reverse().join(" ")

    table.appendChild(tbody)
    userList.appendChild(table)

  };


  document.querySelectorAll(".remove").forEach(button => {
    button.addEventListener('click', function () {
      const status = confirm("Kaydı silmek için emin misiniz?")
      if (status) {
        const id = this.getAttribute("data-id");
        renderUsers(users.filter(x => x.id != id))
      }
    })
  })


  document.querySelectorAll(".update").forEach(button => {
    button.addEventListener("click", function () {
      const id = this.getAttribute("data-id")
      const _user = users.find(user => user.id == id)
      fillUser(_user)
      toggleUser()
      toggleTable("none")
    })
  })

}
// Users info and Table (end)


const toggleTable = (display = "none") => {
  document.querySelector("#user").style.display = display
}

const toggleUser = (display = "block") => {
  document.querySelector("#user-form").style.display = display
}


const fillUser = (user) => {
  document.querySelector("#labelName").value = user.name
  document.querySelector("#labelPhone").value = user.phone
  document.querySelector("#labelWebSite").value = user.website
  document.querySelector("#labelEmail").value = user.email
  document.querySelector("#userId").value = user.id
}


const updateUser = () => {
  try {
    const name = document.querySelector("#labelName").value
    const phone = document.querySelector("#labelPhone").value
    const webSite = document.querySelector("#labelWebSite").value
    const email = document.querySelector("#labelEmail").value
    const userId = document.querySelector("#userId").value

    const index = users.findIndex(user => user.id == userId)
    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Token": window.localStorage.getItem("token")
      }
    })
      .then(response => response.json())
      .then(response => {
        const { status } = response
        if (status == true) {
          users[index] = { name, phone, website: webSite, email, id: userId }
          renderUsers(users)
          toggleTable("block");
          toggleUser("none");
          alert("Güncelleme işlemi başarıyla gerçekleşti")
        } else {
          alert("Güncelleme işlemi sırasında bir hata oluştu, çünkü Api'ye müdahale edemiyoruz şu an, bu bölümü sonra düzelteceğiz :)")
        }
      })

  } catch (error) {
    console.error(error)
    alert("Bizden kaynaklı bir hata oluştu özür dileriz")
    toggleTable("block");
    toggleUser("none");
  }

}
document.querySelector("#cancel").addEventListener("click", () => {
  toggleTable("block");
  toggleUser("none");
})


document.querySelector("#save").addEventListener("click", updateUser)


//footer
let footer = document.querySelector("#alikartalonline")
footer.innerHTML = `${new Date().getFullYear()} Copyright: <a class="alikartalonline" href="https://github.com/alikartalonline"> alikartalonline <svg height="20" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true" class="octicon octicon-mark-github v-align-middle">
<path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
</svg></a>`




