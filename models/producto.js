var config  = require('../config/config.js');
connection = config.connection;
var async   = require('async');

var Producto = {};

//  Agregar producto
Producto.save = function(datos,callback){
    connection.query('INSERT INTO pagina_producto SET ?', datos, 
        function (err, result) {
            if (err)
                callback(err,null);
            else
                callback(null,datos.insertId);
                
        }
    );
}

Producto.getProducto = function (id,callback) {
    connection.query('SELECT prod.*,pagina_nombre from pagina_producto prod INNER JOIN pagina p on producto_pagina_id = pagina_id  WHERE producto_id =  ?', id, 
        function (err, result) {
            if (err)
                callback(err,null);
            else
                callback(null,result[0])
                
        }
    );
}

Producto.misProductos = function(pagina_id,callback){
    connection.query('SELECT *,(SELECT imagen_url from pagina_producto_imagen WHERE imagen_producto_id = producto_id LIMIT 1) as producto_foto from pagina_producto WHERE producto_pagina_id =  ?',pagina_id , function(err, rows){        
        if (err) 
            callback(err,null);
        else
            if (rows[0]==undefined) {
                callback(null,null);
            }else{
                callback(null,rows);                
            }
    });
}

Producto.getCategorias = function(callback){
    connection.query('SELECT * from pagina_producto_categoria', function(err, rows){        
        if (err) 
            callback(err,null);
        else
            callback(null,rows);
    });
}

Producto.getImagenes = function(id,callback){
    connection.query('SELECT * from pagina_producto_imagen where imagen_producto_id = ?',id, function(err, rows){        
        if (err) 
            callback(err,null);
        else
            callback(null,rows);
    });
}

Producto.imagen = function (data,callback) {
    connection.query('INSERT into pagina_producto_imagen set ?',data, function(err, rows){        
        if (err) 
            callback(err,null);
        else
            callback(null,rows);
    });
}

Producto.owner = function (usuario_id, producto_id, done) {
    
    async.waterfall([
        function(callback){
            //  Primero checamos cuál es la página 
            connection.query("SELECT producto_pagina_id from pagina_producto where producto_id = ?",[producto_id], function(err, rows){
                if (err) 
                    callback(err,null,null);
                else{
                    callback(null,usuario_id,rows[0].producto_pagina_id);
                }
            });              
        },
        function(usuario_id,pagina_id, callback){
            connection.query("SELECT pagina_id from usuario_pagina where usuario_id = ? and pagina_id = ?",[usuario_id,pagina_id], function(err, rows){
                if (err) 
                    callback(err,null);
                else{
                    if (rows[0]==undefined) {
                        callback(null,null);
                    }else{          
                        callback(null,rows[0].pagina_id);                 
                   }
                }
            });     
        }
    ], function (err, result) {
       if (err) {
        done(err,null);
       } else{
        done(null,result);
       };
    });

            
}


module.exports = Producto;