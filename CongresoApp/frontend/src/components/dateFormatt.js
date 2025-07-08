

  export const timeFormat = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const horas = date.getHours();    // 0-23
    const minutos = date.getMinutes(); // 0-59

    return `${horas}:${minutos.toString().padStart(2, '0')}`;
  };