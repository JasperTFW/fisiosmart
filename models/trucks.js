"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Contenedores = connection_1.default.define('dbtr_trucks_registers', {
      
   
    uuid: {
        type: sequelize_1.DataTypes.STRING
    },
    truck_picture: {
        type: sequelize_1.DataTypes.STRING
    },
    modelo: {
        type: sequelize_1.DataTypes.STRING
    },
    matricula: {
        type: sequelize_1.DataTypes.STRING
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    propietario: {
        type: sequelize_1.DataTypes.STRING
    },
    driver_1: {
        type: sequelize_1.DataTypes.STRING
    },
    driver_2: {
        type: sequelize_1.DataTypes.STRING
    },
    circulacion: {
        type: sequelize_1.DataTypes.STRING
    },
    circul_front: {
        type: sequelize_1.DataTypes.STRING
    },
    circul_back: {
        type: sequelize_1.DataTypes.STRING
    },
    capacidad: {
        type: sequelize_1.DataTypes.STRING
    },

});

exports.default = Contenedores;
//# sourceMappingURL=usuario.js.map