var express = require('express');
const pool = require('../../models/db');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel');

/* GET users listing. */
router.get('/',async function(req, res, next) {

  var novedades = await novedadesModel.getNovedades();

  res.render('admin/novedades', {
    layout: 'admin/layout',
    usuario: req.session.nombre,
    novedades
  });
});

router.get('/eliminar/:id', async (req, res, next) => {
  var id = req.params.id;
  await novedadesModel.deleteNovedadesById(id);
  res.redirect('/admin/novedades')
});

router.get('/agregar', (req, res, next) => {
  res.render('admin/agregar', {
      layout: 'admin/layout'
  })
});



router.post('/agregar',async (req,res,next) => {

     console.log(req.body)
     try{
         if (req.body.nombre != "" && req.body.apellido != "" && req.
         body.email != "" && req.body.steam != "") {
             await novedadesModel.insertNovedad (req.body);
             res.redirect('/admin/novedades')

         } else {
             res.render('admin/agregar', {
                 layout:'admin/layout',
                 error:true,
                 message:'Todos los campos son requeridos'
             })
         }    
     } catch (error) {
         console.log(error)
         res.render('admin/agregar',{
             layout:'admin/layout',
             error:true,
             message:'No se cargo la novedad'
         })
     }    
})

router.get('/modificar/:id', async (req, res, next) => {
  var id = req.params.id;
  var novedad = await novedadesModel.getNovedadesById(id);

  res.render('admin/modificar', {
    layout: 'admin/layout',
    novedad
  });
});  


router.post ('/modificar', async (req, res, next) => {
  try {
    var obj = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      steam: req.body.steam
    }

    console.log(obj)
    await novedadesModel.modificarNovedadById(obj, req.body.id);
    res.redirect('/admin/novedades');
   } catch (error) {
    console.log(error)
    res.render('admin/modificar', {
      layout: 'admin/layout',
      error:true,
      message: 'no se modificó la novedad'
    })
  }
});

module.exports = router;