const request = require('supertest')('http://localhost:8080');
const expect = require('chai').expect;
const faker = require('@faker-js/faker').faker;

//cambiar los campos para lo que necesite probar el proyecto
const generatePost = () => {
    return { 
        category:'multicolor',
        title: faker.commerce.product().toString(),
        price: faker.commerce.price(100, 200, 0, '$').toString(),
        thumbnail: faker.image.imageUrl(100, 100).toString()
      };
  };

  const generatePostToUpdate = () => {
    return { 
        idprod: '63f8425cb02a2414d0f89f5e',
        category:'multicolor',
        title: faker.commerce.product().toString(),
        price: faker.commerce.price(100, 200, 0, '$').toString(),
        thumbnail: faker.image.imageUrl(100, 100).toString()
      };
  };

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  describe('test posts endpoint', () => { //descripción de qué se va a testear en general con mocha
    //GET
    describe('allProductsAdminController', () => {           
      it('testeamos que llegue la lista de productos completa', async () => {
        const res = await request.get('/api/admin');
        expect(res.status).to.eql(200);
        expect(res.body).to.be.a('array');
        const arrTest = res.body.map((item)=>(
          {
            category:item.category,
            title:item.title,
            price:item.price,
            thumbnail:item.thumbnail,
            _id:item._id
          }
        ));
        const longitud = arrTest.length;
        const numero = getRandomInt(longitud)
        expect(arrTest[numero]).to.include.all.keys( 'category', 'title', 'price', 'thumbnail', '_id');
      });
    });



    
    describe('allProductsController', () => {           //descripción de esta prueba con un método http en particular              
      it('devuelve solo el id del carrito creado y guardado en el user, no devuelve los productos porque hay que filtrar antes la categoría', async () => {  //comienza el testing "it" debería hacer tal cosa... título especifico
        const res = await request.get('/api/productos'); //hace el request tipo fetch
        expect(res.status).to.eql(200);
        expect(res.body).to.be.a('string');
      });
    });

    describe('filterByCategoryController', () => {           
        it('testeamos que llegue la lista de productos filtrada por la categoría que se mandó en postCategoryController, en este caso harcodeada multicolor', async () => {
          const res = await request.get('/api/productos/multicolor');
          expect(res.status).to.eql(200);
          expect(res.body).to.be.a('array');
          const arrTest = res.body.map((item)=>(
            {
              category:item.category,
              title:item.title,
              price:item.price,
              thumbnail:item.thumbnail,
              _id:item._id
            }
          ));
          const longitud = arrTest.length;
          const numero = getRandomInt(longitud)
          expect(arrTest[numero]).to.include.all.keys( 'category', 'title', 'price', 'thumbnail', '_id');
        });
      });

      describe('getProductController', () => {           
        it('llegue un objeto de producto según su id en params', async () => {
          const res = await request.get('/api/productos/multicolor/63f8419eb02a2414d0f89f49');
          expect(res.status).to.eql(200);
          expect(res.body).to.be.an('object').that.has.all.keys( 'category', 'title', 'price', 'thumbnail', '_id');         
        });
      });

    //POST
    
    describe('addProductAdminController', () => {
        it('deberia postear un producto (para incorporar a la base de datos luego)', async () => {
          const post = generatePost();
          const res = await request.post('/api/admin').send(post); //manda el post con los valores, y no hace falta que yo los pase a json
          expect(res.status).to.eql(201);
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('category', 'title', 'price', 'thumbnail');  
          expect(post.title).to.eql(res.body.title);
          expect(post.category).to.eql(res.body.category);
          expect(post.price).to.eql(res.body.price);
          expect(post.thumbnail).to.eql(res.body.thumbnail);
          
        });
      });
      
          
    describe('prodToUpdateAdminController', () => {
      it('deberia postear un id producto, buscarlo en la base de datos y devolver el objeto de producto', async () => {
        const post ={"_id":"63f8425cb02a2414d0f89f5e"}
        const res = await request.post('/api/admin/update').send(post); //manda el post con los valores, y no hace falta que yo los pase a json
        expect(res.status).to.eql(201);
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys('category', 'title', 'price', 'thumbnail', '_id');          
      });
    });    
  });

  describe('UpdateProductAdminController', () => {
    it('deberia postear un id producto, buscarlo en la base de datos y devolver el objeto de producto', async () => {
      const post = generatePostToUpdate()
      const res = await request.post('/api/admin/update-prod').send(post); //manda el post con los valores, y no hace falta que yo los pase a json
      expect(res.status).to.eql(201);
      expect(res.body).to.be.a('object');
      expect(res.body).to.include.keys('category', 'title', 'price', 'thumbnail', '_id');          
    });

    describe('deleteProdAdminController', () => {
      it('(hay que harcodear el _id, puse uno nuevo) debería eliminar un producto según su id y devolver el string producto eliminado', async () => {
        const post ={"_id":"64105ce4ec3ae72f190e70e8"}
        const res = await request.post('/api/admin/delete').send(post); //manda el post con los valores, y no hace falta que yo los pase a json
        expect(res.status).to.eql(201);
        expect(res.body).to.be.a('string');
        expect("producto eliminado").to.eql(res.body);
      });
    });    
  });







  //para hacer las pruebas ejecutar este archivo en la terminal con "$  npm test "
//primero abrir otra terminal y levantar el servidor