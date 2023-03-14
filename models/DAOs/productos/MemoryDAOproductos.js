const logger = require("../../../logger/winston-logger")

class MemoryDAOproductos{
    constructor(){
        this.arrMem = [];
    }

    
    getAll(){
        try{
            const productos = this.arrMem;
            return productos
        }
        catch(err){
            return []
        }
    }

    async findById(_id){
        const prod = this.arrMem.find((item)=> item._id == _id)
        return prod
    }

    saveNew(ob){
        try{
            const productos = this.getAll();
            let _id;
            if (!productos || !productos.length){
                _id =1
            }else{
                productos.forEach( ob =>{
                    _id  = ob._id
                });
                _id = _id+1
            }
            const nuevo = {...ob, _id}
            const guardar = productos.length ? [...productos, nuevo] : [nuevo];
            this.arrMem = guardar;
            logger.log("info", "nuevo producto guardado")
            return _id
        }
        catch(error){
            logger.log("error", "no se pudo guardar")
        }
    }
    async deleteById(idprod){
        try{
            const objs =  this.getAll();
            const obj = objs.find((item)=> item._id == idprod)
            if (!obj){
                logger.log("error", 'No se encontró qué borrar')
            } else{
                const newArr = objs.filter(ob => ob._id != idprod);
                this.arrMem = newArr;
            }
        }
        catch(err){
            logger.log("error", "no se pudo eliminar")
        }    
    }

    listCategory(categorySelect){
        const categoryProductos = this.arrMem.filter((item)=> item.category == categorySelect)
        return categoryProductos
    } 

    

    findProdUpdate(idprod, title, price, thumbnail, category){
        const newObj = {
            _id:idprod,
            title,
            price,
            thumbnail,
            category
        }
        try{ 
            const objs = this.getAll();
            const quitarObj = objs.filter((item)=> item._id != idprod);
            const newArr = [...quitarObj, newObj];
            this.arrMem = newArr;
            return newObj
        }
        catch(err){
            logger.log("error", err)
        }
    }

    

}

module.exports = MemoryDAOproductos