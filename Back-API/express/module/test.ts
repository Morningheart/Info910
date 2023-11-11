export function test(ENV : any){

    ENV.addRoute("/test",[],["text/html"],"test api" ,(req:any,res:any)=> {
        var repList = ["C bon", "Un essai", "ça marche", "c'est aléatoire"];
        res.status(200).json(ENV.repData(repList[Math.floor(Math.random() * repList.length)]));
    })
}