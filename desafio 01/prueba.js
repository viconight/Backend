class Usuario{

    constructor(nombre, apellido , libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros || [];
        this.mascotas = mascotas || [];
    }
    
    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(mascota){
        this.mascotas.push(mascota)
        
    }

    countMascota(){
      return this.mascotas.length;
    }

    addBook(nombre, autor){
        let nuevoLibro = {nombre, autor};
        this.libros.push(nuevoLibro);
    }

    getBookNames(){

        let nombresLibro = this.libros.map((libros) => {
            return libros.nombre
        })
        return nombresLibro ;
    }



}


const usuario = new Usuario ('Victor', 'Teixeira')
console.log(`el nombre del usuario es ${usuario.getFullName()}`);
usuario.addMascota('perro')
usuario.addMascota('gato')
console.log(`el usuario ${usuario.getFullName()} tiene ${usuario.countMascota()} mascotas`)
usuario.addBook('Harry Potter', 'J.K.Rowling')
usuario.addBook('El guardian entre el centeno', 'J.D. Salinger')
console.log(`los libros de ${usuario.getFullName()} son ${usuario.getBookNames()}`)

usuario.addMascota

