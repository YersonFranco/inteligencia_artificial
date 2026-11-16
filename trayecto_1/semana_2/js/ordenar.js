const formularioOrdenamiento = document.querySelector("#formulario-ordenamiento");
const botonOrdenamiento = document.querySelector("#ejecutar-ordenamiento");
const salidaOrdenamiento = document.querySelector("#resultado-ordenamiento");
const registroPruebas = document.querySelector("#registro-pruebas");
const botonDescargaRegistro = document.querySelector("#descargar-registro");
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

botonDescargaRegistro.addEventListener("click", () => {
  const aprobadas = resultadosPrueba.filter(({ correcto }) => correcto).length;
  const lineasRegistro = [
    "REGISTRO DE PRUEBAS — ORDENAMIENTO DE TRES NÚMEROS",
    `Fecha de generación: ${new Intl.DateTimeFormat("es-CO", { dateStyle: "long", timeStyle: "short" }).format(new Date())}`,
    "Entorno: práctica interactiva en el navegador.",
    "Procedimiento: comparar las posiciones 1–2, luego 2–3 y finalmente 1–2; intercambiar solo cuando el valor izquierdo es mayor.",
    "",
    ...resultadosPrueba.map(({ nombre, entrada, esperado, obtenido, correcto }, indice) =>
      `${indice + 1}. ${nombre}\n   Entrada: ${entrada.join(", ")}\n   Esperado: ${esperado.join(", ")}\n   Obtenido: ${obtenido.join(", ")}\n   Estado: ${correcto ? "Correcto" : "Revisar"}`,
    ),
    "",
    `Resumen: ${aprobadas} de ${resultadosPrueba.length} casos correctos.`,
    "El archivo ordenar.py contiene la versión equivalente del algoritmo en Python.",
  ];
  const archivo = new Blob([lineasRegistro.join("\n")], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(archivo);
  const enlaceDescarga = document.createElement("a");
  enlaceDescarga.href = url;
  enlaceDescarga.download = "registro_pruebas_ordenamiento.txt";
  document.body.append(enlaceDescarga);
  enlaceDescarga.click();
  enlaceDescarga.remove();
  URL.revokeObjectURL(url);
});

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
