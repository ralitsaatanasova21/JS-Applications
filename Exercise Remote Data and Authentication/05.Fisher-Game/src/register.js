window.addEventListener('load', () => {
    let form = document.querySelector('form#register');
    form.addEventListener('submit', registerUser);
})

async function registerUser(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let email = formData.get('email');
    let password = formData.get('password');
    let rePass = formData.get('rePass');

    let obj = {
        email,
        password,
        rePass
    };

    let userInfo = await createRegister(obj);
    let userData = {
        id: userInfo._id,
        email: userInfo.email,
        token: userInfo.accessToken
    };
    localStorage.setItem('userData',JSON.stringify(userData));
    window.location = './index.html';
}

async function createRegister(obj) {
    let url = `http://localhost:3030/users/register`;
    try{
    let response = await fetch(url, {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(obj)
    })

    if(response.ok != true) {
        let error = await response.json();
        throw new Error(error.message);
    }

    let data = await response.json();
    return data;
    }catch(error) {
      alert(error);
    }
}