import { useEffect, useState } from "react"; // Importa useEffect y useState de React para manejar el estado y los efectos secundarios

export function useFetch(url) {
  const [data, setData] = useState(null); // Estado para almacenar los datos obtenidos
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos
  const [error, setError] = useState(null); // Estado para manejar errores
  const [controller, setController] = useState(null); // Estado para almacenar el controlador de aborto

  useEffect(() => {
    const abortController = new AbortController(); // Crea un nuevo controlador de aborto
    setController(abortController); // Almacena el controlador en el estado
    setLoading(true);

    fetch(url, { signal: abortController.signal }) // Realiza la solicitud fetch con la señal de aborto
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.log("Reques cancelled");
        } else {
          setError(error);
        }
      })
      .finally(() => setLoading(false));

    return () => {
      abortController.abort(); // Cancela la solicitud si el componente se desmonta
    };
  }, []); // Se agrega url como dependencia para que reaccione si cambia

  const handleCancelRequest = () => {
    if (controller) {
      controller.abort(); // Cancela la solicitud si el controlador existe
    }
  };

  return { data, loading, error, handleCancelRequest }; // Devuelve los datos, el estado de carga, el error y la función para cancelar la solicitud
}
