const formularioOrdenamiento = document.querySelector("#formulario-ordenamiento");
const botonOrdenamiento = document.querySelector("#ejecutar-ordenamiento");
const salidaOrdenamiento = document.querySelector("#resultado-ordenamiento");

function ordenarTres(numero1, numero2, numero3) {
  let primero = numero1;
  let segundo = numero2;
  let tercero = numero3;

  if (primero > segundo) {
    [primero, segundo] = [segundo, primero];
  }

  if (segundo > tercero) {
    [segundo, tercero] = [tercero, segundo];
  }

  if (primero > segundo) {
    [primero, segundo] = [segundo, primero];
  }

  return [primero, segundo, tercero];
}

formularioOrdenamiento.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const numeros = ["numero-1", "numero-2", "numero-3"].map((id) =>
    document.getElementById(id).valueAsNumber,
  );

  if (!numeros.every(Number.isSafeInteger)) {
    salidaOrdenamiento.textContent = "Escribe tres números enteros válidos.";
    return;
  }

  const numerosOrdenados = ordenarTres(...numeros);
  salidaOrdenamiento.textContent = `Resultado: ${numerosOrdenados.join(", ")}`;
});
