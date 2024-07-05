"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Contenedores = connection_1.default.define('dbtr_users_owners', {
      
    avatar: {
        type: sequelize_1.DataTypes.STRING
    },
   
    Nombre_Ap: {
        type: sequelize_1.DataTypes.STRING
    },
    
    phone: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING
    },
    
    ci: {
        type: sequelize_1.DataTypes.STRING
    },
    ci_front: {
        type: sequelize_1.DataTypes.STRING
    },
    ci_back: {
        type: sequelize_1.DataTypes.STRING
    },
    licencia: {
        type: sequelize_1.DataTypes.STRING
    },
    licencia_front: {
        type: sequelize_1.DataTypes.STRING
    },
    licencia_back: {
        type: sequelize_1.DataTypes.STRING
    },
   
    owner: {
        type: sequelize_1.DataTypes.BOOLEAN
    },

});

exports.default = Contenedores;
//# sourceMappingURL=usuario.js.map