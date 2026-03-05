function getSuspender(promise) {
  let status = "pending"; // Estado inicial de la promesa
  let response; // Variable para almacenar el resultado de la promesa

  const suspender = promise.then(
    (res) => {
      status = "success";
      response = res;
    },
    (err) => {
      status = "error";
      response = err;
    },
  );

  const read = () => {
    switch (status) {
      case "pending":
        throw suspender;
      case "error":
        throw response;
      default:
        return response;
    }
  };
  return { read }; // Devuelve una función para leer el resultado de la promesa
}

export const fetchData = (url) => {
  const promise = fetch(url) // Realiza una solicitud GET a la URL especificada y devuelve una promesa
    .then((response) => response.json()) // Convierte la respuesta a formato JSON
    .then((data) => data); // Devuelve los datos obtenidos

  return getSuspender(promise); // Devuelve el resultado de la función getSuspender, que maneja el estado de carga y error
};
