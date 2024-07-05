const { response } = require('express');
const bcryptjs = require('bcryptjs');
const uuid = require('uuid');
const Usuario = require('../models/usuario');
//const googleVerify = require('../helpers/google-verify');
const jwt = require('jsonwebtoken');

//const bcryptjs = require('bcryptjs')
const { generarJWT } = require('../helpers/generar-jwt');
const { default: usuario } = require('../models/usuario');



const verifyAdmin = async(req, res = response) => {
 
   
   
    const { id }= req.usuario;

   

    try {
    
        
     const usuario = await  Usuario.default.findOne({where: {id} })

     //Verificar si el usuario existe

        if ( !usuario ) {
            return res.status(403).json({
                msg: 'Usuario Incorrecto'
            });
        }
const token =jwt.sign({
    name:usuario.user_nombre,
    id:usuario.id}, process.env.SECRETORPRIVATEKEY)

    res.header('auth_token',token).json({
       //id: usuario.id,
       avatar: usuario.avatar,
       Nombre: usuario.user_nombre,
       // password: usuario.password,
      
       Role:usuario.user_role,
       // phone:usuario.phone,
       Correo:usuario.user_correo,
       // ci: usuario.ci,
       // ci_front: usuario.ci_front,
       // ci_back: usuario.ci_back,
       // licencia: usuario.licencia,
       // licencia_front: usuario.licencia_front,
       // licencia_back: usuario.licencia_back,
       // owner: usuario.owner,
       token:token
    })
        
    } 
   
   
    
    
    catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }   

}




const login = async(req, res = response) => {
 
   
   
    const { user_nombre,user_contraseña }= req.body;

   

    try {
    
        
     const usuario = await  Usuario.default.findOne({where: {user_nombre} })

     //Verificar si el usuario existe

        if ( !usuario ) {
            return res.status(403).json({
                msg: 'Usuario Incorrecto'
            });
        }
const validate = await bcryptjs.compare(user_contraseña,usuario.user_contraseña);
if(!validate){
    return res.status(403).json({msg:"Contraseña Incorrecta"});
}
const token =jwt.sign({
    name:usuario.user_nombre,
    id:usuario.id}, process.env.SECRETORPRIVATEKEY)

    res.header('auth_token',token).json({
       id: usuario.id,
       avatar: usuario.avatar,
       user_nombre: usuario.user_nombre,
      // password: usuario.password,
      
       status:usuario.status,
       Telefono:usuario.user_telefono,
       email:usuario.user_correo,
       
       token:token,
       
       redirectTo: '/user_page.html'


    })


       console.log('Nuevo Inicio de Sesión ' + usuario.id); 
    } 
   
   
    
    
    catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }   

}


const register = async(req, res) => {
    const {user_nombre, user_contraseña } = req.body;
    try {



   
const existeUser = await Usuario.default.findOne({
            where: {
               user_nombre: user_nombre,
              // password:password
               
            }
        });
        
        if (existeUser) {
            return res.status(409).json({
             
                msg: 'Este Usuario ya está Registrado en Nuetro Sistema'
            });
        }
        
    const jero = uuid.v4();

    const usuario = new Usuario.default(req.body);
usuario.id=jero;
usuario.owner=0;
usuario.status=0;
 //Encriptar la contraseña

 const salt =bcryptjs.genSaltSync();
 usuario.user_contraseña =bcryptjs.hashSync( user_contraseña, salt);

await usuario.save();
    
    const token =jwt.sign({
        name:usuario.user_nombre,
        id:usuario.id
    }, process.env.SECRETORPRIVATEKEY)
   
       
    res.header('auth_token',token).json({
        id: usuario.id,
               avatar: usuario.avatar,
               Nombre: usuario.user_nombre,
               status:usuario.status,
               phone:usuario.user_telefono,
               email:usuario.user_correo,
               redirectTo: '/index.html',
               
              
               token:token
    })
       
    }
    
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ups!! El servidor tiene un Error.... Por favor...Hable con el administrador'
        });
    }

}


module.exports = {
    login,
    register,
    verifyAdmin,
   // googleSignin
}
