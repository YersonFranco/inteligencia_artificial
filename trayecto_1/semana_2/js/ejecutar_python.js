const formularioOrdenamiento = document.querySelector("#formulario-ordenamiento");
const botonOrdenamiento = document.querySelector("#ejecutar-ordenamiento");
const salidaOrdenamiento = document.querySelector("#resultado-ordenamiento");

let interpretePython;
let fuenteOrdenamiento;

function prepararPython() {
  if (!interpretePython) {
    interpretePython = loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.29.2/full/",
    });
  }

  return interpretePython;
}

async function cargarFuenteOrdenamiento() {
  if (!fuenteOrdenamiento) {
    fuenteOrdenamiento = fetch("python/ordenar.py").then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error("No se pudo cargar ordenar.py");
      }

      return respuesta.text();
    });
  }

  return fuenteOrdenamiento;
}

formularioOrdenamiento.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const numeros = ["numero-1", "numero-2", "numero-3"].map((id) =>
    document.getElementById(id).valueAsNumber,
  );

  if (!numeros.every(Number.isSafeInteger)) {
    salidaOrdenamiento.textContent = "Escribe tres números enteros válidos.";
    return;
  }

  botonOrdenamiento.disabled = true;
  salidaOrdenamiento.textContent = "Preparando Python y ejecutando el algoritmo…";

  try {
    const [pyodide, codigoFuente] = await Promise.all([
      prepararPython(),
      cargarFuenteOrdenamiento(),
    ]);

    pyodide.globals.set("codigo_fuente", codigoFuente);
    pyodide.runPython(
      'namespace_ordenamiento = {"__name__": "ordenar"}; exec(compile(codigo_fuente, "ordenar.py", "exec"), namespace_ordenamiento)',
    );

    pyodide.globals.set("numero_1", numeros[0]);
    pyodide.globals.set("numero_2", numeros[1]);
    pyodide.globals.set("numero_3", numeros[2]);

    const resultadoPython = pyodide.runPython(
      'namespace_ordenamiento["ordenar_tres"](int(numero_1), int(numero_2), int(numero_3))',
    );
    const numerosOrdenados = resultadoPython.toJs();
    resultadoPython.destroy();

    salidaOrdenamiento.textContent = `Resultado: ${numerosOrdenados.join(", ")}`;
  } catch (error) {
    console.error(error);
    fuenteOrdenamiento = undefined;
    salidaOrdenamiento.textContent = "No se pudo cargar el ejercicio. Ábrelo con un servidor local y revisa tu conexión.";
  } finally {
    botonOrdenamiento.disabled = false;
  }
});
