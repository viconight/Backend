const fs = require('fs');

class Container {
  constructor(file) {
    this.file = file;
  }

  knowIfExists(file) {
    try {
          if (!fs.existsSync(file)) {
                throw new Error("El archivo no se encontro!!");
          } else {
                return true;
          }
    } catch (error) {
          console.log(error.message);
    }
}
  async save(objeto) {
    try {
      for (let i = 0; i < objeto.length; i++) {
        objeto[i].id = 1 + i;
      }
      console.log(`se guardaron ${objeto.length} productos!`);
      await fs.promises.writeFile(this.file, JSON.stringify(objeto));
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const contenido = await this.getAll();
      let buscarId = contenido.find((prod) => prod.id === id);
      console.log(buscarId);
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      let contenido = await fs.promises.readFile(this.file, 'utf-8');
      console.log(contenido);
      return JSON.parse(contenido);
    } catch (error) {
      console.log(error);
    }
  }

  async modify(id, contenido) {
    try {
          
          if (this.knowIfExists(this.file)) {
                let data = await this.readFile(this.file);

                
                let dataId = data.filter((item) => item.id === id);
                if (dataId.length === 0) {
                      throw new Error("No se encontro el ID");
                } else {
                      data = data.filter((item) => item.id !== id);
                      dataId = { id: id, ...contenido };
                      data.push(dataId);
                      this.writeFile(this.archivo, data);
                      console.log(`se modifico la Id:${id}`);
                }
          }
    } catch (error) {
          console.log(error.message);
    }
}

  async deleteById(id) {
    try {
      const contenido = await this.getAll();
      const deleted = contenido.filter((producto) => producto.id !== id);
      await fs.promises.writeFile(this.file, JSON.stringify(deleted, null, 4));
      console.log('Borrado');
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.file, []);
      console.log('Borrados todos los productos');
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Container;