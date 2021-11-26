const express = require('express');
const multiparty = require('multiparty');
const cors = require('cors');
const app = express();
app.use(express.json());//解析json编码数据
app.use(cors());//不加上这句代码跨域访问时会出现错误，加上就不会出现跨域错误情况
const port = 3000

var data={}

app.get('/connect', (req, res) => {
    let ans={'code': 0,'message':'succeed'}
    res.send(JSON.stringify(ans))
})

const updateData=(req, res) => {
    let form = new multiparty.Form();
    form.parse(req, function(err,fields,file){
        //console.log(fields);
        const title=fields["title"]
        //const { title,answer,tag } = fields;
        let entry={"title":fields["title"],"answer":fields["answer"],"tag":fields["tag"]}
        if(data[title]==null){
            console.log("insert");
            data[title]=entry;

        }
        else{
            console.log("update");
            data[title]=entry;
        }
        let ans={'code': 0,'message':'succeed'}
        res.send(JSON.stringify(ans));
    });
    
}

app.post('/problem', updateData);
app.put('/problem', updateData);

app.get('/problemList',(req,res)=>{
    let ans=[];
    for(key in data){
        let entry=data[key];
        entry["title"]=String(entry["title"]);
        entry["tag"]=String(entry["tag"]);
        entry["answer"]=JSON.parse(entry["answer"]);
        ans.push(entry);
    }
    
    ret = {'code': 0,'message':'succeed','data':ans}
    res.send(JSON.stringify(ret));
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})