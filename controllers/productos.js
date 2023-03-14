
const logger = require("../logger/winston-logger")
const {
    getAllProducts,
    filterByCategory,
    getProduct
  } = require ("../services/productos")
  


  const allProductsController = async (req, res)=>{
    //const user = req.user;
    //const id = user.carritoactual;
    //res.render("nuestros-productos", {data: {id}})     
    //esta ruta devuelve un id que depende del user de session y no hay session en el testing
    //incorporamos un objeto de user de session harcodeado para poder hacer el testing y devolver el valor de carritoactual
    const user = {
      "_id": {
        "$oid": "63f668c3d030cf7021ab5219"
      },
      "username": "melicarrito@gmail.com",
      "password": "$2b$10$jFgcEq2.2sd7FOQ6DuA2XuyO8m6Rw.5kzgI5mS2Ft8agpZmFvAge6",
      "nombre": "Melina",
      "apellido": "Señoráns Pérez",
      "edad": "33",
      "direccion": "Siempreviva 900",
      "telefono": "+541127204753",
      "avatar": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUQEhIVFRUVFQ8VFRUVEBUVFRUWFRUWFhUVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGC4lHyUtKy0tLS0tLS0tLS0tLS0tLS0wKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAACAwABBAUGB//EADQQAAICAQMCBAQFBAMAAwAAAAABAhEDBBIhMUEFUWFxEyKBkaGxwdHwMkJS4QYUIxWS8f/EABkBAAMBAQEAAAAAAAAAAAAAAAABBAMCBf/EACQRAQEAAgICAgEFAQAAAAAAAAABAhEDIRIxBEETIlFhceGR/9oADAMBAAIRAxEAPwD0em6fY1wiYtIjfFGMbVcY80y4QosclY3KkgciphokkFELUQ9gcYh7RyAraTYOjEJQAFKJaQ1RCjAAVtL2jthNoAqiKI2UStoUFtAuI7aVQqZaiShhEhADRFAOgkuDqETsLobtLcQBNA7RzRTQAmgWhrgC4gCqIG0CwAaBkg7AkMFuIuWMdQMhBkeMg5sgGy4vY3wXBngjTgZzDokhkUDtDHCSaCjEuSDrgYSCLkg4BSiBBUQtoaRdDIFBKJaQaQAFFJB0RgCpF8EmihUwvJyS0UokaONulAyYRSQjMS496DSBi+KGJnccUNFNBkcTogJF0HRTQwTNAOBooXKIgQ0A4mhxAkhGQ0C0MkgaAFtCpI0SQqQAqiBUQRlY4/Y040JxxNMBQUW2w65QW0ucO4wugtpcEMUQIKiHQaiCzqBAuxKJQyLlPanJ9jHj8XjVyTivNrp7geK5Kwz+n5o4um1H9vPPoyTl5vDKRVw8Hnja9ZHMmrXPqU2cDTqeP5oO4vqtya+nkdfBnUlceTXDlmTLPiuJk2SxTn60Lk11t/Udz",
      "carritoactual": "640e2aba4a592e5f4fb5b18b"
    }
    const idcarrito = user.carritoactual;
    res.status(200).json(idcarrito)
    logger.log("info", "/api/productos - GET  allProductsController")
  }

  const postCategoryController = async (req, res)=>{
    const {category} = req.body;
    //res.redirect(`/api/productos/${category}`)
    res.status(200).json(category)
  }

  const filterByCategoryController = async (req, res)=>{
    //const user = req.user;
    //const id = user.carritoactual; 
    const {category} = req.params;    
    const todosProd = await filterByCategory(category)
    //res.render("nuestros-productos", {data:{ category, id, todosProd}})
    res.status(200).json(todosProd)
    logger.log("info", "/api/productos/:category - GET  filterByCategoryController")
  }

  const postCategoryAndProdController = async (req, res)=>{
    const {idprod} = req.body;
    const {categoryname} = req.body;
    const category = categoryname
    logger.log("info", "/api/productos/:category - POST  postCategoryAndProdController")
    //res.redirect(`/api/productos/${category}/${idprod}`)   
    //res.status(200).json(category)
    }

    const getProductController = async (req, res)=>{      
        const {id} = req.params;
        const prod = await getProduct(id)
        //const idcarrito = req.user.carritoactual
        //res.render("detalle-producto", {data:{idcarrito, prod}})
        logger.log("info", "/api/productos/:category/:id - GET  getProductController")
        res.status(200).json(prod)
      }
    
    const keepShoppingController = async (req, res)=>{ 

    //incorporamos un objeto de user de session harcodeado para poder hacer el testing y devolver el valor de carritoactual
    const user = {
      "_id": {
        "$oid": "63f668c3d030cf7021ab5219"
      },
      "username": "melicarrito@gmail.com",
      "password": "$2b$10$jFgcEq2.2sd7FOQ6DuA2XuyO8m6Rw.5kzgI5mS2Ft8agpZmFvAge6",
      "nombre": "Melina",
      "apellido": "Señoráns Pérez",
      "edad": "33",
      "direccion": "Siempreviva 900",
      "telefono": "+541127204753",
      "avatar": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUQEhIVFRUVFQ8VFRUVEBUVFRUWFRUWFhUVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGC4lHyUtKy0tLS0tLS0tLS0tLS0tLS0wKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAACAwABBAUGB//EADQQAAICAQMCBAQFBAMAAwAAAAABAhEDBBIhMUEFUWFxEyKBkaGxwdHwMkJS4QYUIxWS8f/EABkBAAMBAQEAAAAAAAAAAAAAAAABBAMCBf/EACQRAQEAAgICAgEFAQAAAAAAAAABAhEDIRIxBEETIlFhceGR/9oADAMBAAIRAxEAPwD0em6fY1wiYtIjfFGMbVcY80y4QosclY3KkgciphokkFELUQ9gcYh7RyAraTYOjEJQAFKJaQ1RCjAAVtL2jthNoAqiKI2UStoUFtAuI7aVQqZaiShhEhADRFAOgkuDqETsLobtLcQBNA7RzRTQAmgWhrgC4gCqIG0CwAaBkg7AkMFuIuWMdQMhBkeMg5sgGy4vY3wXBngjTgZzDokhkUDtDHCSaCjEuSDrgYSCLkg4BSiBBUQtoaRdDIFBKJaQaQAFFJB0RgCpF8EmihUwvJyS0UokaONulAyYRSQjMS496DSBi+KGJnccUNFNBkcTogJF0HRTQwTNAOBooXKIgQ0A4mhxAkhGQ0C0MkgaAFtCpI0SQqQAqiBUQRlY4/Y040JxxNMBQUW2w65QW0ucO4wugtpcEMUQIKiHQaiCzqBAuxKJQyLlPanJ9jHj8XjVyTivNrp7geK5Kwz+n5o4um1H9vPPoyTl5vDKRVw8Hnja9ZHMmrXPqU2cDTqeP5oO4vqtya+nkdfBnUlceTXDlmTLPiuJk2SxTn60Lk11t/Udz",
      "carritoactual": "640e2aba4a592e5f4fb5b18b"
    }
    const idcarrito = user.carritoactual;
    res.status(200).json(idcarrito)
        //const user = req.user;
        //const carrito = user.carritoactual;
        /*
        if(carrito != "empty"){             
        res.redirect("/api/productos")
        logger.log("info", "/api/productos/seguir-comprando - GET  keepShoppingController")
        }
        else{
            res.redirect("/api/carrito")
        }
        */
      }
    

module.exports = {
  allProductsController,
  postCategoryController,
  filterByCategoryController,
  postCategoryAndProdController,
  getProductController,
  keepShoppingController
}


