const fs = require('fs');

class Container {
  constructor(file) {
    this.file = file;
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