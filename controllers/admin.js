
const logger = require("../logger/winston-logger")
const {
    allProductsAdmin,
    saveProd,
    getProductAdmin,
    updateProd,
    deleteProdAdmin
  } = require ("../services/admin")

        const allProductsAdminController = async (req, res)=>{
        //const { username, password, nombre } = req.user;
        //const user = { username, password, nombre };
        const productos = await allProductsAdmin()        
        //res.render("vista-productos", {user, productos});
        res.status(200).json(productos)
        logger.log("info", "/api/admin - GET")
      }

      const addProductAdminController = async (req, res)=>{
      
        const newProd = {
          category: req.body.category,
          title: req.body.title,
          price: req.body.price,
          thumbnail: req.body.thumbnail
        }
        const save = saveProd(newProd)
        res.status(201).json(newProd)
        //res.redirect("/api/admin")
        
        logger.log("info", "/api/admin - POST")
      }

      const prodToUpdateAdminController = async (req, res)=>{
        //const {idprod} = req.body;
        const idprod = req.body;
        const producto = await getProductAdmin(idprod)
        res.status(201).json(producto)
        //res.render("modificar-producto", {producto})
        
      logger.log("info", "/api/admin/update - POST")
      }

      const UpdateProductAdminController = async (req, res)=>{
        const idprod = req.body.idprod;
        const newTitle = req.body.title;
        const newPrice = req.body.price;
        const newThumbnail = req.body.thumbnail;
        const newCategory = req.body.category;
        const updatedProd = await updateProd(idprod, newTitle, newPrice, newThumbnail, newCategory)
        res.status(201).json(updatedProd)
        //res.redirect("/api/admin")
        logger.log("info", "/api/admin/update-prod POST")

      }

      const deleteProdAdminController = async (req, res)=>{
        const {idprod} = req.body;
        const productoEliminado = await deleteProdAdmin(idprod);
        logger.log("info", productoEliminado)
        logger.log("info", "/api/admin/delete - POST")
        //res.redirect("/api/admin")
        res.status(201).json(productoEliminado)
      }
      

module.exports = {
  allProductsAdminController,
  addProductAdminController,
  prodToUpdateAdminController,
  UpdateProductAdminController,
  deleteProdAdminController
}


