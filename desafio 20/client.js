import { get, getById, add, updateById, deleteById } from "./axios.js";

console.log("-------------------------------------------------------");

console.log("Adding the first product...");

await add({
  nombre: "One Piece",
  precio: 1250,
  foto: "https://m.media-amazon.com/images/I/51xRyPQYUmL._AC_SY780_.jpg",
});

let result = await get();
console.log("GET -> ", result);

result = await add({
  nombre: "Dragon Ball",
  precio: 1100,
  foto: "https://m.media-amazon.com/images/I/71u0UjsSrnL.jpg",
});
console.log("POST -> ", result);

result = await getById(result.id);
console.log("GET by ID -> ", result);

result = await updateById(
  {
    nombre: "Naruto",
    precio: 1300,
    foto: "https://m.media-amazon.com/images/I/51gQV80M8qL._AC_SY780_.jpg",
  },
  result.id
);
console.log("PUT by ID -> ", result);

result = await deleteById(result.id);
console.log("DELETE by ID -> ", result);

result = await get();
console.log("GET -> ", result);
