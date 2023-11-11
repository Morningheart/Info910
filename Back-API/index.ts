/*######################################################
Import
######################################################*/

import * as express from 'express';
import { Express } from 'express';
import * as EXP from './express/exp';

import * as fs from 'fs';

import * as dotenv from 'dotenv';

import * as http from 'http';

import * as https from 'https';
import { ServerOptions } from 'https';

dotenv.config();

import * as BDD from './bdd/bdd';

/*######################################################
Constant
######################################################*/
const app: Express = express();
const PORT: number = 8081;

//DB
const host: string = process.env.HOST ?? '';
const user: string = process.env.MYSQL_USER ?? '';
const mdp: string = process.env.MYSQL_PASSWORD ?? '';
const database: string = process.env.MYSQL_DATABASE ?? '';

/*######################################################
BDD
######################################################*/

/*######################################################
Function
######################################################*/
function findlast() {
  let nb = 1;
  while (fs.existsSync('./https/privkey' + nb + '.pem')) {
    nb++;
  }
  return nb - 1;
}
function newServer(app) {
  if (process.env.isHTTPS == 'true') {
    let nb = findlast();
    const options: ServerOptions = {
      key: fs.readFileSync('./https/privkey' + nb + '.pem').toString(),
      cert: fs.readFileSync('./https/fullchain' + nb + '.pem').toString(),
    };
    return https.createServer(options, app);
  } else {
    return http.createServer(app);
  }
}

/*######################################################
main
######################################################*/
function main() {
  let bdd: any = BDD.init(host, user, mdp, database); //Creation de l'instance de la BDD

  EXP.init(PORT, bdd, host); //Initialisation du serveur express
  const server = newServer(EXP.app); //Creation du serveur http
  server.listen(PORT); //Ecoute du serveur http

  console.log('Serveur => ON');
}
main();
