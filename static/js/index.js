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


    // window.open(`${name}`, '_blank');
}




window.onload = function () {
    let open_btn = document.querySelector('.open_btn')
    let close_btn = document.querySelector('.close_btn')
    let close_btn_img = document.querySelector('.close_btn img')
    let hide_list = document.querySelector('.hide_list')
    console.log(close_btn_img, close_btn)

    open_btn.addEventListener('click', function () {
        hide_list.style.display = 'block'
        open_btn.style.display = 'none'
        close_btn.style.display = 'flex'
        close_btn_img.style.transform = 'rotate(180deg)'
    })

    close_btn.addEventListener('click', function () {
        hide_list.style.display = 'none'
        open_btn.style.display = 'flex'
        close_btn.style.display = 'none'
    })

}


// 방명록 
function save_comment() {
    let name = $('#name').val()
    let comment = $('#comment').val()

    let formData = new FormData();
    formData.append("name_give", name);
    formData.append("comment_give", comment);

    fetch('/guestbook', { method: "POST", body: formData, })
        .then((res) => res.json())
        .then((data) => {
            alert(data["msg"]);
            window.location.reload()
        });
}
function show_comment() {
    fetch('/guestbook').then((res) => res.json()).then((data) => {
        let rows = data['result']
        $('#comment-list').empty()
        rows.forEach((a) => {
            let name = a['name']
            let comment = a['comment']

            let temp_html = `
            <div class="card">
            <div class="card-body">
                <blockquote class="blockquote mb-0">
                    <p>${comment}</p>
                    <footer class="blockquote-footer">${name}</footer>
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