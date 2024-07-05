"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { createServer } =  require('http');
const bodyParser = require('body-parser');
const express_1 = __importDefault(require("express"));
const owners_api = __importDefault(require("../routes/owners"));
const usuario_1 = __importDefault(require("../routes/usuario"));
const APIauth = __importDefault(require("../routes/auth"));
const Trucks = __importDefault(require("../models/trucks"));
const trucks = __importDefault(require("../routes/trucks"));
const fileUpload = require('express-fileupload');
const { socketController } = require('../sockets/controller');


const cors_1 = __importDefault(require("cors"));
const connection = __importDefault(require("../db/connection"));
class Server {


    
    constructor() {
       
        this.apiPaths = {
            
            owners: '/api/personal_data/owners',
            trucks: '/api/tecnical_stats/trucks',
// Endpoints de Clientes
            
            APIauth: '/api/auth/clients',
            usuarios: '/api/personal_data/clients',
            uploads_clients: '/api/uploads/clients',
// Endpoints de Owners
            APIauth_owners: '/api/auth/owners',
            uploads_owners: '/api/uploads/owners',
            
// Endpoints de Trucks

            trucks: '/api/tecnical_stats/trucks',
        };
       
          
      
        
      
        this.app = express_1.default();
        this.port = process.env.PORT || '8075';
        this.server = createServer(this.app);
        this.io = require('socket.io')(this.server);
        // Métodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
        //Sockets
        this.socket();        
       
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection.default.authenticate();
//                yield connections_1.default.authenticate();
                console.log('RESERVAS_TRUCK_SERVER: Corriendo sin Problemas!!!');
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }

    

    
    middlewares() {
        // CORS
        this.app.use(cors_1.default());
        // Lectura del body
        this.app.use(express_1.default.json());
        // Carpeta pública
        this.app.use(express_1.default.static('public'));
        //FileUpload
       this.app.use(fileUpload({useTempFiles:true,
            tempFileDir : '/tmp/'}));
      


              
       

    }
    routes() {
       
    

       this.app.use(this.apiPaths.usuarios, usuario_1.default);
       this.app.use(this.apiPaths.APIauth, APIauth.default);
       this.app.use(this.apiPaths.trucks, trucks.default);
       this.app.use(this.apiPaths.owners, owners_api.default);
       
       
       
       this.app.use(this.apiPaths.uploads_clients, require('../routes/uploads_clients_avatar'));
     //  this.app.use(this.apiPaths.uploads_lic_front, require('../routes/uploads_trucks_circul_front'));
     //  this.app.use(this.apiPaths.uploads_lic_back, require('../routes/uploads_trucks_circul_back'));
        
        
       
        
    }


    socket(){
        this.io.on('connection', socketController);
    }


    listen() {
        this.server.listen(this.port, () => {
            console.log('RESERVAS_TRUCK_SERVER: Corriendo Sobre el Puerto ' + this.port);
        });
       
    }


    
}

exports.default = Server;
//# sourceMappingURL=server.js.map