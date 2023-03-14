// 프로필사진 클릭 시 각 멤버 상세페이지로 이동 (팝업으로 띄우기)
function go_detail_page(name) {

    //창 크기 지정
    let width = 1200;
    let height = 900;
    //pc화면기준 가운데 정렬
    let left = (window.screen.width / 2) - (width / 2);
    let top = (window.screen.height / 4);

    //윈도우 속성
    let windowStatus = 'width=' + width + ', height=' + height + ', left=' + left + ', top=' + top + ', scrollbars=yes, status=yes, resizable=yes, titlebar=yes';

    //연결하고싶은url
    const url = `${name}`;

    //등록된 url 및 window 속성 기준으로 팝업창을 연다.
    window.open(url, "hello popup", windowStatus);

}
// function go_detail_page(name) {
//     window.open(`${name}`, '_blank');
// }

window.onload = function () {
    let open_btn = document.querySelector('.open_btn')
    let close_btn = document.querySelector('.close_btn')
    let open_list = document.querySelector('.open_list')
    let r_c_btn_box = document.querySelector('.r_c_btn_box')
    let r_btn_box = document.querySelector('.r_btn_box')
    console.log(open_btn, open_list, close_btn)

    open_btn.addEventListener('click', function () {
        open_list.style.display = 'block'
        r_btn_box.style.display = 'none'
        close_btn.style.display = 'block'
        r_c_btn_box.style.display = 'block'
    })


    close_btn.addEventListener('click', function () {
        open_list.style.display = 'none'
        r_btn_box.style.display = 'block'
        r_c_btn_box.style.display = 'none'
    })


}


// 방명록 
function save_comment() {
    let name = document.getElementById("member_name").value;
    let nickname = $('#nickname').val()
    let comment = $('#comment').val()

    let formData = new FormData();
    formData.append("nickname_give", nickname);
    formData.append("comment_give", comment);

    fetch('/guestbook', { method: "POST", body: formData, })
        .then((res) => res.json())
        .then((data) => {
            alert(data["msg"]);
            console.log('name')
            window.location.reload()

        });
}
function show_comment() {
    fetch('/guestbook').then((res) => res.json()).then((data) => {
        let rows = data['result']
        $('#comment-list').empty()
        rows.forEach((a) => {
            let nickname = a['nickname']
            let comment = a['comment']

            let temp_html = `
            <div class="card">
            <div class="card-body">
                <blockquote class="blockquote mb-0">
                    <p>${comment}</p>
                    <footer class="blockquote-footer">${nickname}</footer>
                </blockquote>
            </div>
        </div>
            `

            $('#comment-list').append(temp_html)

        })
    })
}
$(document).ready(function () {
    show_comment()
});