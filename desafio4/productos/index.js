const fs = require('fs');

module.exports = class Container {
  constructor(file) {
    this.file = file;
  }

  async save(producto) {
    try {
          if (!this.knowIfExists(this.file)) {
                console.log(
                      `No se encontro el archivo ${this.file}\n se procede a crear uno nuevo`
                );
                let arrayProductos = [];
                producto["id"] = 1;
                arrayProductos.push(producto);
                console.log("se esta agregando el producto");
                await this.writeFile(
                      this.file,
                      arrayProductos
                );
                console.log(
                      `Se agrego un nuevo producto con la id ${producto["id"]}`
                );
                return producto["id"];
          } else {
                if (this.writeFile(this.file)) {
                      const data = await this.readFile(this.file);
                      if (data.length === 0) {
                            producto["id"] = 1;
                      } else {
                            let lastId = data[data.length - 1].id;
                            producto["id"] = lastId + 1;
                      }
                      data.push(producto);
                      console.log("se esta agregando el producto");
                      this.writeFile(this.file, data);
                      console.log(
                            `Se agrego un nuevo producto con la id ${producto["id"]}`
                      );
                      return producto["id"];
                }
          }
    } catch (error) {
          console.log(error.message);
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

  async writeFile(file, contenido) {
    try {
      await fs.writeFileSync(
        file,
         JSON.stringify(contenido, null, 2),
         "utf-8"
        );
    } catch (error) {
        console.log(error.message);
    }
  }

  async readFile(file) {
    try {
          const data = await fs.readFileSync(file, "utf-8");
          return JSON.parse(data);
    } catch (error) {
          console.log(error.message);
    }
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
                      this.writeFile(this.file, data);
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

