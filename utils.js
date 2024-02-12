function getReqData(req){
    return new Promise((resolve,rejct)=>{
        try {
            let body='';
            req.on("data",chunk =>{
                body+=chunk.toString();
             })
             req.on('end',()=>{
                resolve(body)
             })
        } catch (error) {
            rejct(error);
        }
    })
}
module.exports={getReqData};