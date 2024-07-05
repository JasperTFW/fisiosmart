const path = require('path');
const fs   = require('fs');
const {v4:uuidv4} = require('uuid');
const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );
const Usuario = require("../models/usuario");

const { response } = require('express');
const { subirArchivo } = require('../helpers/subir_archivo');

const { report } = require('process');
const { dirname } = require('path');

const cargarArchivo = async(req, res = response) => {
  
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo  ) {
      res.status(400).json({msg:'No hay archivos que subir'});
      return;
    }
    try{
  const nombre= await subirArchivo(req.files,undefined,'imgs');
  res.json({nombre});
}
catch(msg)

{
      res.status(404).json ({msg});
  }


}



const actualizarImagen = async(req, res = response ) => {
  if ( !req.usuario ) {
    return res.status(500).json({
        msg: 'Se quiere verificar el Usuario sin validar el token primero'
    });
}
const { id } = req.usuario;
  const usuario = await Usuario.default.findByPk(id);
  if (usuario) {


  // Limpiar imágenes previas
  if ( usuario.avatar ) {
      // Hay que borrar la imagen del servidor
      const pathImagen = path.join( __dirname, '../uploads/Clients', usuario.avatar );
      if ( fs.existsSync( pathImagen ) ) {
          fs.unlinkSync( pathImagen );
      }
  }


  const nombre = await subirArchivo( req.files, undefined, 'Clients' );
  usuario.avatar = nombre;

  await usuario.save();


  res.json( usuario );

}

if(!usuario)
{
  res.json({msg:`No existe un usuario con el id: ${id}`})
}

}

const mostrarImagen = async(req, res = response ) => {
  if ( !req.usuario ) {
    return res.status(500).json({
        msg: 'Se quiere verificar el Usuario sin validar el token primero'
    });
}
const { id } = req.usuario;
  
  let modelo;
  modelo = await Usuario.default.findByPk(id);

  if ( modelo.avatar ) {
    // Hay que borrar la imagen del servidor
    const pathImagen = path.join( __dirname, '../uploads/Clients', modelo.avatar );
    if ( fs.existsSync( pathImagen ) ) {
       
return res.sendFile( pathImagen )
    }
}
const pathImagen = path.join( __dirname, '../assets/no-avatar.svg');
res.sendFile( pathImagen );

}









module.exports = {
  cargarArchivo,
  actualizarImagen,
  mostrarImagen,
 // actualizarImagenCloudinary
}