
const data =require('./data');


class Controller{
    async getTodos(){
        return new Promise((resolve,_)=>resolve(data));
    }
    async getTodo(id){
        return new Promise((resolve,reject)=>{
            let todo =data.find(todo =>todo.id === parseInt(id));
            if(todo){
                resolve(todo)
            }else{
                reject('Todo with id ${id} not found ')
            }

        })
    }

    async createTodo(todo){
        return new Promise((resolve,_)=>{
            let newTodo={
                id:Math.floor(3+Math.random()*10),
                ...todo
            }
            resolve(newTodo);

        })
    }

    async updateTodo(id){
        return new Promise((resolve,reject)=>{
        let todo=data.find(todo=>todo.id===parseInt(id))
        if (!todo){
            reject(`not found the id ${id}`)
        }
        todo['completed']=true;
        resolve(todo);
    })
    }
async deleteTodo(id){
    return new Promise((resolve,reject)=>{
        let todo=find(todo=>todo.id===parseInt(id))
        if(!todo){
            reject(`Not Found The Id ${id}`)
        }
        resolve('Todo Delete SucessFully');
    })
}

}

module.exports=Controller;