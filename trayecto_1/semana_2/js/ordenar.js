const formularioOrdenamiento = document.querySelector("#formulario-ordenamiento");
const botonOrdenamiento = document.querySelector("#ejecutar-ordenamiento");
const salidaOrdenamiento = document.querySelector("#resultado-ordenamiento");
const registroPruebas = document.querySelector("#registro-pruebas");
const casosPrueba = [
  { nombre: "Desordenados", entrada: [7, 2, 5], esperado: [2, 5, 7] },
  { nombre: "Orden inverso", entrada: [9, 5, 1], esperado: [1, 5, 9] },
  { nombre: "Valores repetidos", entrada: [5, 1, 5], esperado: [1, 5, 5] },
  { nombre: "Números negativos", entrada: [-3, 5, -1], esperado: [-3, -1, 5] },
  { nombre: "Todos iguales", entrada: [4, 4, 4], esperado: [4, 4, 4] },
];
const resultadosPrueba = [];

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

function ejecutarRegistroPruebas() {
  casosPrueba.forEach(({ nombre, entrada, esperado }) => {
    const obtenido = ordenarTres(...entrada);
    const correcto = obtenido.every((numero, indice) => numero === esperado[indice]);
    resultadosPrueba.push({ nombre, entrada, esperado, obtenido, correcto });

    const fila = document.createElement("tr");
    const valores = [
      nombre,
      entrada.join(", "),
      esperado.join(", "),
      obtenido.join(", "),
    ];

    valores.forEach((valor) => {
      const celda = document.createElement("td");
      celda.textContent = valor;
      fila.append(celda);
    });

    const celdaEstado = document.createElement("td");
    const estado = document.createElement("span");
    estado.className = correcto ? "badge text-bg-success" : "badge text-bg-danger";
    estado.textContent = correcto ? "Correcto" : "Revisar";
    celdaEstado.append(estado);
    fila.append(celdaEstado);
    registroPruebas.append(fila);
  });
}

ejecutarRegistroPruebas();

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
