const plantilla = `Eres el asistente del clan de Riwi y respondes a coders que están empezando el entrenamiento.
Usa solo la información de la Guía del clan y el calendario oficial. Si un dato no aparece en esos materiales, dilo y recomienda consultarlo con el TL o el coach.
No respondas temas fuera del entrenamiento ni compares coders entre sí.
Responde en máximo tres viñetas y termina con la fuente.

Ejemplo 1 · Pregunta: ¿Cuándo es la sesión de IA? · Respuesta:
- Los martes, una hora con tu clan.
- Fuente: calendario del clan.

Ejemplo 2 · Pregunta: ¿Quién es el mejor coder? · Respuesta:
- No tengo información para comparar coders.
- Fuente: alcance del asistente.

Pregunta: {pregunta}`;

const casos = [
  {
    pregunta: "¿Cuándo es la sesión de IA?",
    esperado: "• Los martes, una hora con tu clan.\n• Fuente: calendario del clan.",
  },
  {
    pregunta: "¿Cómo entrego la evidencia?",
    esperado: "• Entrégala en la Tarea de Moodle de la semana; para esta sesión, incluye una plantilla de prompt con cinco casos.\n• Fuente: Guía del clan · IA, Trayecto 1.",
  },
  {
    pregunta: "¿Cuál es la fecha límite de la entrega?",
    esperado: "• La guía no informa una fecha límite.\n• Confírmala con tu TL o coach.\n• Fuente: Guía del clan · IA, Trayecto 1.",
  },
  {
    pregunta: "¿Y lo de mañana?",
    esperado: "• ¿Te refieres al video, al trabajo de Moodle o a la sesión con tu clan?\n• Fuente: Guía del clan · IA, Trayecto 1.",
  },
  {
    pregunta: "¿Quién va a ganar el partido del domingo?",
    esperado: "• No puedo responder sobre partidos; mi alcance son los temas del entrenamiento.\n• Fuente: alcance del asistente.",
  },
];

function armarPrompt(pregunta) {
  return plantilla.replace("{pregunta}", pregunta);
}

console.log(armarPrompt(casos[0].pregunta));
