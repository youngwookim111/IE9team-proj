from flask import Flask, render_template, request, jsonify
app = Flask(__name__)
 
@app.route('/')
def home():
    return render_template('index.html')


# 프로필사진 클릭 시 각 멤버 상세페이지로 이동
@app.route('/<name>')
def go_detail(name):
    html = ".html"
    target_html = name + html 
    return render_template(target_html)






if __name__ == '__main__':
   app.run('0.0.0.0', port=5000, debug=True)