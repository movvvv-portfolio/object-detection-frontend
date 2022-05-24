////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// 주소
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
const backend_base_url = "http://127.0.0.1:9999"
const frontend_base_url = "http://127.0.0.1:5500"


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// 회원가입
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
async function userSignup() {
    // input 연결
    const signupData = {
        user_id: document.getElementById("Input-sign-id").value,
        email: document.getElementById("Input-sign-email").value,
        password: document.getElementById("Input-sign-password").value,
        password_check: document.getElementById("Input-sign-password-check").value,
        user_age: document.getElementById("Input-sign-age").value,
    }

    // 회원가입 api 연결
    const response = await fetch(`${backend_base_url}/signup`, {
        method: "POST",
        body: JSON.stringify(signupData)
    })

    console.log(response)

    // app.py 연결 확인
    response_json = await response.json()
    console.log(response_json)

    // 연결상태 = status 가 200 (정상 수신) 일 경우
    if (response_json.sign_error == 770) {
        alert("아이디 혹은 이메일을 입력하세요.")
        return
    } else if (response_json.sign_error == 771) {
        alert("이메일 형식이 아닙니다.")
        return
    } else if (response_json.sign_error == 772) {
        alert("비밀번호를 입력하세요.")
        return
    } else if (response_json.sign_error == 773) {
        alert("비밀번호를 확인해주세요.")
        return
    } else if (response_json.sign_error == 774) {
        alert("나이를 입력해주세요.")
        return
    } else if (response_json.sign_error == 775) {
        alert("중복된 아이디입니다.")
        return
    } else if (response_json.sign_error == 776) {
        alert("중복된 이메일입니다.")
        return
    } else {
        alert("가입 완료!")
        window.location.replace(`${frontend_base_url}/templates/login.html`);
    }
}


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// 로그인
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
async function userLogin() {
    // 로그인 입력
    const loginData = {
        user_id: document.getElementById("Input-login-id").value,
        password: document.getElementById("Input-login-password").value,
    }

    // 로그인 연결
    const response = await fetch(`${backend_base_url}/login`, {
        method: 'POST',
        body: JSON.stringify(loginData)

    })

    response_json = await response.json();
    console.log(response_json)
    localStorage.setItem("token", response_json.token)

    if (response.status === 401) {
        alert("아이디와 비밀번호를 확인해주세요.")
        return
    } else if (response.status === 200) {
        alert("로그인 완료!")
        window.location.replace(`${frontend_base_url}/templates/post.html`);
    }
}

async function getName() {
    const response = await fetch(`${backend_base_url}/getuserinfo`, {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    })

    // status 200 확인 조건문
    if (response.status == 200) {
        response_json = await response.json()
        console.log(response_json)
        return response_json.email
    } else {
        return null
    }
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// 카카오톡 로그인
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
async function getkakao() {
    // 로그인 연결
    let url = new URL(window.location.href).searchParams.get('code')

    if (url != null) {
        const code_url = { code: url }
        const response = await fetch(`${backend_base_url}/oauth`, {
            method: 'POST',
            body: JSON.stringify(code_url)
        })

        console.log(response)
        response_json = await response.json();
        console.log(response_json)
        localStorage.setItem("token", response_json.token)
        window.location.reload()
    }

    // window.location.replace(`${frontend_base_url}/templates/post.html`)

}



////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// 로그아웃 기능
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function logout() {
    localStorage.removeItem("token")
    window.location.replace(`${frontend_base_url}/templates/post.html`);
}


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// 포스트
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
async function postCalculator(formData) {
    const response = await fetch(`${backend_base_url}/calculator`, {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': localStorage.getItem("token")
        },
    })
    response_json = await response.json()
    console.log(response_json)
    return response_json
}
// 게시물 저장(원본 데이터)
async function postFile(result_id) {
    const response = await fetch(`${backend_base_url}/post`, {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': localStorage.getItem("token")
        },
    })
    response_json = await response.json()
    console.log(response_json)
    return response_json
}

// 확인 버튼 클릭 시 모달 숨김
async function deleteResult(result_id) {
    const response = await fetch(`${backend_base_url}/result/${result_id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    })
    response_json = await response.json()
    console.log(response_json)
    return response_json
}