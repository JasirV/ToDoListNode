const http =require('http')
const Todo=require('./controller');
const { getReqData }=require('./utils')
const server =http.createServer(async(req,res)=>{
    if(req.url==='/api/todos'&&req.method=='GET'){
        const todos = await new Todo().getTodos();
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify(todos));
    }
    else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "GET") {

        try {
            const id = req.url.split('/')[3];
            const todo=await new Todo().getTodo(id);
            res.writeHead(200,{'Content-Type':'application/json'});        
            res.end(JSON.stringify(todo));
            
        } catch (error) {
            res.writeHead(404,{"Content-Type":"application/json"});
            res.end(JSON.stringify({message:error}));
            
        }
    }
    //delete
    else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "DELETE") {

        try {
            const id = req.url.split('/')[3];
            const message=await new Todo().deleteTodo(id);
            res.writeHead(200,{'Content-Type':'application/json'});        
            res.end(JSON.stringify(message));
            
        } catch (error) {
            res.writeHead(404,{"Content-Type":"application/json"});
            res.end(JSON.stringify({message:error}));
            
        }
    }
    //UPDATE
    else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "PATCH") {

        try {
            const id = req.url.split('/')[3];
            const update=await new Todo().updateTodo(id);
            res.writeHead(200,{'Content-Type':'application/json'});        
            res.end(JSON.stringify(update));
            
        } catch (error) {
            res.writeHead(404,{"Content-Type":"application/json"});
            res.end(JSON.stringify({message:error}));
            
        }
    }
    //Post
    else if (req.url === '/api/todos' && req.method === "POST") {

        try {

            const todoData=await getReqData(req);
            let todo=await new Todo().createTodo(JSON.parse(todoData))
            res.writeHead(200,{'Content-Type':'application/json'});        
            res.end(JSON.stringify(todo));
            
        } catch (error) {
            res.writeHead(404,{"Content-Type":"application/json"});
            res.end(JSON.stringify({message:error}));
            
        }
    }

    //NO ROTE PRESENT
    else{
        res.writeHead(404,{"Content-Type":"application/json"});
            res.end(JSON.stringify({message:"Route Not Found"}));
            
    }

}).listen(7000)