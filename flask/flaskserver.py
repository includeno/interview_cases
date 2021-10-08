import os

from flask_cors import CORS
from flask import Flask, jsonify,session, redirect, url_for, escape
from flask import request


#实例化，可视为固定格式
app = Flask(__name__)
CORS(app, supports_credentials=True)
#如果app.secret_key未设置,则Flask将不允许你设置或访问会话字典。
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'

data={}

#检测服务器连接成功
@app.route('/connect', methods=["get"])
def connect():
    ret = {'code': 0,'message':'succeed'}
    return jsonify(ret)

@app.route('/problem', methods=["get"])
def getProblem():
    
    return "hello world succeed"

@app.route('/problem', methods=["post"])
def postProblem():
    title=request.form.get("title")
    answer=request.form.get("answer")
    #eval(answer) js中json化的数组还原
    tag=request.form.get("tag")
    entry={"title":title,"answer":eval(answer),"tag":tag}
    
    if(len(data)==0 or title not in data):
        data[title]=entry
        print("entry:"+str(entry))
    else:
        print("update"+str(entry))
        data[title]=entry
    ret = {'code': 0,'message':'succeed'}
    
    return jsonify(ret)

@app.route('/problem', methods=["put"])
def putProblem():
    print("method:put")
    title=request.form.get("title")
    answer=request.form.get("answer")
    #eval(answer) js中json化的数组还原
    tag=request.form.get("tag")
    entry={"title":title,"answer":eval(answer),"tag":tag}
    
    if(len(data)==0 or title not in data):
        data[title]=entry
        print("entry:"+str(entry))
    else:
        print("update"+str(entry))
        data[title]=entry
    ret = {'code': 0,'message':'succeed'}
    
    return jsonify(ret)

@app.route('/problemList', methods=["get"])
def getProblemList():
    ans=[]
    for key in data:
        ans.append(data[key])
    ret = {'code': 0,'message':'succeed','data':ans}
    
    return jsonify(ret)

if __name__ == '__main__':
    # app.run(host, port, debug, options)
    # 默认值：host="127.0.0.1", port=5000, debug=False
    
    app.run(host="0.0.0.0", port=3000)