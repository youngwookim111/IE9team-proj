from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
app = Flask(__name__)
 
@app.route('/')
def home():
    return render_template('index.html')

client = MongoClient('mongodb+srv://sparta:test@cluster0.q4j284y.mongodb.net/?retryWrites=true&w=majority')
db = client.dbsparta

# 프로필사진 클릭 시 각 멤버 상세페이지로 이동
@app.route('/<name>')
def go_detail(name):
    html = ".html"
    target_html = name + html 
    return render_template(target_html)

# 방명록
@app.route("/writegb", methods=["POST"])
def guestbook_post():
    nickname_receive = request.form['nickname_give']
    comment_receive = request.form['comment_give']
    member_name_receive = request.form['member_name_give']
    doc = {
        'nickname':nickname_receive,
        'comment' :comment_receive,
        'member_name' :member_name_receive
     }
    db.IE9.insert_one(doc)
    nickname_receive = request.form['nickname_give']

    return jsonify({'msg': '저장완료!'})

# 멤버 방명록 조회
@app.route("/guestbookmem", methods=["POST"])
def guestbook_get():
    member_name = request.form['member_name_give']
    all_comments = list(db.IE9.find({'member_name':member_name},{'_id':False}))
    return jsonify({'result': all_comments})  

# 전체 방명록 조회
@app.route("/guestbook")
def guestbook_all():
    all_comments = list(db.IE9.find({},{'_id':False}))
    return jsonify({'result': all_comments})  

if __name__ == '__main__':
   app.run('0.0.0.0', port=5000, debug=True)