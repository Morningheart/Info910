/*######################################################
Import
######################################################*/
import express = require('express')
import * as MD5 from 'md5'
import cors = require('cors')
import * as bodyParser from 'body-parser'
import * as fs from "fs"
import multer = require("multer")


import {test} from "./module/test"


// const Profil =require("./routes/profil.js");


/*######################################################
Constante
######################################################*/
const corsOptions ={
   origin:'*',            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
export const app  = express()
app.use(express.static("www"));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors(corsOptions))

var upload = multer({ dest: process.env.PATH_FILE })


const pathRouteur = "/api";

let IP = "";
let PORT = 0;

//BDD
let BDD : any = null;

/*######################################################
Variable Global
######################################################*/

let Doc = "";


class fnObj {
    PORT: number;
    IP: string;
    BDD: any;


    addRoute: (path: string, input: string[], output: string[], desc: string, callback: any, appli?: any) => void;
    addPost: (path: string, input: string[], output: string[], desc: string, callback: any, img?: string, appli?: any) => void;
    
    estEmail: (email: string) => boolean;
    estScript: (txt: string) => boolean;
    estVide: (txt: string) => boolean;

    repErr: (err: string | string[]) => { status: number; err: string | string[]; data: { id: number; }; };
    repData: (data: any) => { status: number; err: any; data: any; };
    repOK: () => { status: number; err: any; data: { id: number; }; };

	constructor(){
		this.PORT = PORT;
		this.IP = IP;
		this.BDD = BDD;

		this.addRoute = addRoute;
		this.addPost = addPost;

		this.estEmail = estEmail;
		this.estScript = estScript;
		this.estVide = estVide;

		this.repErr = repErr;
		this.repData = repData;
		this.repOK = repOK;

	}
}
let objTransit : fnObj|undefined = undefined;

/*######################################################
Groupe
######################################################*/


function setupRoute(){
	Doc = Doc + "";
	//Doc = Doc + "# 1) Image\n| TYPE  |  ROUTE |  DESC |  INPUT | OUTPUT  |\n| ------------ | ------------ | ------------ | ------------ | ------------ |\n";
	//Img.add(objTransit);
	//Doc = Doc + "|\n<br>\n";

	Doc = Doc + "# 1) Test\n| TYPE  |  ROUTE |  DESC |  INPUT | OUTPUT  |\n| ------------ | ------------ | ------------ | ------------ | ------------ |\n";
	test(objTransit)
	Doc = Doc + "|\n<br>\n";

	
}





/*######################################################
Fonction
######################################################*/

function estVide(txt : string) {
	txt = txt.split(" ").join("");
	txt = txt.split("\n").join("");
	txt = txt.split("\r").join("");
	txt = txt.split("\t").join("");
	return txt == "";
}

function estScript(txt : string) {
	let bool = true;
	bool = bool && txt.split("<").length==1;
	bool = bool && txt.split(">").length==1;
	bool = bool && txt.split("`").length==1;
	bool = bool && txt.split("'").length==1;	
	bool = bool && txt.split("CREATE TABLE").length==1;
	return !bool;
}

function estEmail(email : string){
  let match = email.match(
   /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/
  );
  if (match != null) {
  	return email == match[0];
  }else{
  	return false
  }
};
function addRoute(path : string,input : Array<string>,output : Array<string>,desc :string,callback:any,appli = app) {

	Doc = Doc + "| GET  |  "+path+" |  "+desc+"  |  "+input.join("<br>")+"  |  "+output.join("<br>")+"  |\n";


	appli.get(pathRouteur+path, (req : any,res : any) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
	  	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	  	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
		callback(req,res);
	});
}
function addPost(path : string,input : Array<string>,output : Array<string>,desc :string,callback:any,img="",appli = app) {
	Doc = Doc + "| POST |  "+path+" |  "+desc+"  |  "+input.join("<br>")+"  |  "+output.join("<br>")+"  |\n";
	
	if(img==""){
		appli.post(pathRouteur+path, (req:any,res:any) => {
			console.log("addPost : "+path);

			res.setHeader('Access-Control-Allow-Origin', '*');
		  	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
		  	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
			callback(req,res);
		});
	}else{

		appli.post(pathRouteur+path,upload.single(img), (req:any,res:any) => {
			console.log("addPost Image : "+path);
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
			res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
			callback(req,res);
		});
	}
}
function repErr(err: string | Array<string>) {
	return {"status":0,"err":err,"data":{"id":0}}
}
function repData(data : any) {
	return {"status":1,"err":[],"data":data}

}
function repOK() {
	return {"status":1,"err":[],"data":{"id":0}}

}


/*######################################################
Main
######################################################*/


function main(){
	objTransit = new fnObj();
	//ajout des routes :
	setupRoute();

	fs.writeFileSync("doc.md",Doc);

}
/*######################################################
export
######################################################*/


export	function init (port : number,bdd:any,ip:string) {
		PORT = port;
		BDD = bdd;
		IP = ip;
		main();
	}


