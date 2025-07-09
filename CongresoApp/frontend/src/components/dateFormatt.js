

  export const timeFormat = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const horas = date.getHours();    // 0-23
    const minutos = date.getMinutes(); // 0-59

    return `${horas}:${minutos.toString().padStart(2, '0')}`;
  };

  export const formatDownloadICS = (horaInicioISO, horaFinISO) => {
  const inicio = new Date(horaInicioISO);
  const fin = new Date(horaFinISO);

  const fecha = inicio.toISOString().split('T')[0]; // YYYY-MM-DD

  const hora = inicio.toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/Mexico_City',
  });

  const duracionMin = Math.round((fin - inicio) / 60000);

  return { fecha, hora, duracionMin };
}