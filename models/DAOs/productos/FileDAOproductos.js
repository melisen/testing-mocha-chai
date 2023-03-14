const logger = require("../../../logger/winston-logger")
const fs = require("fs") ;

class FileDAOproductos {
    constructor(ruta){
        this.ruta=ruta  
    }

    async saveNew(objProd){
        try{
            const objs = await this.getAll();
            console.log(objs.length)
            let _id;
            if (!objs || !objs.length){
                _id =1
            }else{
                objs.forEach( ob =>{
                    _id  = ob._id
                });
                _id = _id+1
            }            
            const guardar = objs.length>0 ? [...objs, {...objProd, _id}] :[{...objProd, _id}]
            logger.log("info", guardar)
            const guardado = await fs.promises.writeFile(this.ruta, JSON.stringify(guardar), {encoding:'utf-8'})
            logger.log("info", "guardado")
        }
        catch(error){
            logger.log("error", "no se pudo guardar")
        }
    }

    async getAll(){
        try{
            const objetos = await fs.promises.readFile(this.ruta, 'utf-8');
            if(!objetos.length){
            return []
            }else{
                const res = await JSON.parse(objetos);
                return res
                
            }           
        }
        catch(err){
            logger.log("error", "no se pudo obtener")
        }
    }

    async findById(_id){
        try{
            const todos = await this.getAll()
            const buscado = todos.find(ob => ob._id == _id);
                if(buscado){
                    return buscado
                }else{
                    logger.log("error", "no existe")
                }
        }
        catch(err){
            logger.log("error", "no se pudo buscar por id")
        }            
    }

    async deleteById(id){
        try{
            const objs = await this.getAll();
            const obj = objs.find((item)=> item._id == id)
            if (!obj){
                logger.log("error", 'No se encontró qué borrar')
            } else{
                const newArr = objs.filter(ob => ob._id != id);
                const eliminar = await fs.promises.writeFile(this.ruta, JSON.stringify(newArr), {encoding:'utf-8'})
                return "eliminado"
            }
        }
        catch(err){
            logger.log("error", "no se pudo eliminar")
        }
    }
    

    async listCategory(categorySelect){
        const todosProd = await this.getAll()
        const categoryProductos = todosProd.filter((item)=> item.category == categorySelect)
        return categoryProductos
    }

    async findProdUpdate(idprod, title, price, thumbnail, category){
        try{ 
            const newObj = {
                _id:idprod,
                title,
                price,
                thumbnail,
                category
            }
            const objs = await this.getAll();
            const quitarObj = objs.filter((item)=> item._id != idprod)
            const newArr = [...quitarObj, newObj];
            await fs.promises.writeFile(this.ruta, JSON.stringify(newArr), { encoding: 'utf-8'})
            return newObj
        } 
        catch (error) {
            logger.log("error", error)
        }
    }

}

module.exports = FileDAOproductos