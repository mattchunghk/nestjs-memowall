console.log('js running');
window.onload = () => {
  init();
  // load();
};

function init() {
  loadMemos();
  document
    .querySelector('#memo-form')
    .addEventListener('submit', submitMemoForm);
  document.querySelector('#admin-form').addEventListener('submit', login);
  document.querySelector('#admin-logout').addEventListener('submit', logout);
}
const socket = io('http://localhost:3000/');
function handleSubmitNewMemo() {
  socket.emit('message');
}

// socket.on('message', () => {
//   console.log('io is good');
//   handleSubmitNewMemo(loadMemos());
// });

// const socket = io.connect();
socket.on('message', () => {
  loadMemos();
  console.log('io good');
});

async function loadMemos() {
  const res = await fetch('/memo'); // Fetch from the correct url
  const memos = await res.json();
  const memosContainer = document.querySelector('#memo-row');
  const adminText = document.querySelector('.admin-txt');
  if (res.ok) {
    memosContainer.innerHTML = '';

    for (let memo of memos) {
      memosContainer.innerHTML += `
            <div class="col-xxl-3 col-xl-4 col-lg-6 col-md-6
            col-sm-12 col-6">
        <div class="memo-box-none">
            <div class="trash"><i class="bi bi-trash3"></i></div>
            <div class="write"><i class="bi
                        bi-pencil-square"></i></div>
            <div class="like"><i class="bi
                        bi-hand-thumbs-up"></i></div>
                        ${
                          memo.likes_num == null
                            ? `<div class="count">0</div>`
                            : `<div class="count">${memo.likes_num}</div>`
                        }
                        
            <form method="post" action="">

                <div class="memo">
                    <input type="text" class="memo-input" value="${
                      memo.content
                    }" onClick="this.select()">
                ${
                  memo.image == 'None'
                    ? ''
                    : `<img class="photo-img" src="/uploads/${memo.image}" alt="memo-phot">`
                }
                </div>
            </form>
        </div>
    </div>
</div>
</div>`;
    }

    const memoDivs = [...document.querySelectorAll('.memo-box-none')];
    for (let index in memoDivs) {
      const memoDiv = memoDivs[index];

      memoDiv
        .querySelector('.trash')
        .addEventListener('click', async (event) => {
          // Do your fetch  logic here
          const res = await fetch(`/memo/delete/id/${memos[index].id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          // console.log(res);
          if (res.ok) {
            // memoDiv.querySelector('.count').innerHTML = memos[index].like.length;
            adminText.style.color = 'Black';
            handleSubmitNewMemo();
          } else {
            adminText.innerHTML = `Please Login!`;
            adminText.style.color = 'Red';
            setTimeout(function () {
              adminText.innerHTML = `Administration`;
              adminText.style.color = 'Black';
            }, 2000);
          }

          // loadMemos();
        });

      memoDiv
        .querySelector('.write')
        .addEventListener('click', async (event) => {
          // Do your fetch  logic here
          let text = memoDiv.querySelector('.memo-input').value;
          console.log(memos[index]);
          const res = await fetch(
            `/memo/update/?id=${memos[index].id}&update=${text}`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );
          // console.log(res);
          if (res.ok) {
            adminText.style.color = 'Black';
            handleSubmitNewMemo();
          } else {
            adminText.innerHTML = `Please Login!`;
            adminText.style.color = 'Red';
            setTimeout(function () {
              adminText.innerHTML = `Administration`;
              adminText.style.color = 'Black';
            }, 2000);
          }

          // loadMemos();
        });

      memoDiv
        .querySelector('.like')
        .addEventListener('click', async (event) => {
          // Do your fetch  logic here

          const res = await fetch(`/admin/like/?id=${memos[index].id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (res.ok) {
            adminText.style.color = 'Black';
            handleSubmitNewMemo();
          } else {
            adminText.innerHTML = `Please Login!`;
            adminText.style.color = 'Red';
            setTimeout(function () {
              adminText.innerHTML = `Administration`;
              adminText.style.color = 'Black';
            }, 2000);
          }
        });
    }
  }

  // if (res.status(200)) {
  //     loadMemos();
  // }

  // loadMemos();
}

async function submitMemoForm(event) {
  event.preventDefault();
  const adminText = document.querySelector('.admin-txt');

  // Serialize the Form afterwards
  const form = event.target;
  const formData = new FormData();

  formData.append('memoText', form.memoText.value);
  formData.append('memoFile', form.memoFile.files[0]);

  const res = await fetch('/memo/memo-formidable', {
    method: 'POST',
    body: formData,
  });

  if (res.ok) {
    document.querySelector('#memo-form').reset();
    handleSubmitNewMemo();
  } else {
    adminText.innerHTML = `Please Login`;
    adminText.style.color = 'Red';
    setTimeout(function () {
      adminText.innerHTML = `Administration`;
      adminText.style.color = 'Black';
    }, 2000);
  }
}

async function login(event) {
  event.preventDefault();

  // Serialize the Form afterwards
  const form = event.target;

  const formObject = {};
  const adminText = document.querySelector('.admin-txt');
  formObject['username'] = form.username.value;
  formObject['password'] = form.password.value;

  const res = await fetch('/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formObject),
  });

  if (res.ok) {
    adminText.style.color = 'Black';
    adminText.innerHTML = `Hi, ${form.username.value}!`;
    form.reset();
  } else {
    adminText.innerHTML = `Incorrect!`;
  }

  // window.location = '/admin.html'
}

async function logout(event) {
  event.preventDefault();
  const adminText = document.querySelector('.admin-txt');

  const res = await fetch('/admin/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.ok) {
    adminText.style.color = 'Black';
    adminText.innerHTML = `Logged Out`;
    setTimeout(function () {
      adminText.innerHTML = `Administration`;
      adminText.style.color = 'Black';
    }, 3000);
  }

  // window.location = '/admin.html'
}

const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password-text');

togglePassword.addEventListener('click', function (e) {
  // toggle the type attribute
  const type =
    password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
  // toggle the eye slash icon
  this.classList.toggle('fa-eye-slash');
});

// async function load() {
//     const adminText = document.querySelector(".admin-txt");
//     let url = 'https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en';
//     let obj = await (await fetch(url)).json();
//     console.log(obj.soilTemp[0].value);
//     adminText.innerHTML = obj.soilTemp[0].value + "ºc"
// }
