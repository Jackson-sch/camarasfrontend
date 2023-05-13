const BASE_URL = "http://localhost:5000/api/v1";

export async function createIncidencia(incidencia) {
  try {
    const res = await fetch(`${BASE_URL}/incidencias`, {
      method: "POST",
      body: JSON.stringify(incidencia),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Error ${res.status} (${res.statusText})`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
}

/**
 * Hace una solicitud GET al punto final `/Incidencias`, y devuelve la propiedad 'Incidencias' del
 * Datos de respuesta.
 * @returns una matriz de Incidencias.
 */
export async function getIncidencias() {
  try {
    const response = await fetch(`${BASE_URL}/incidencias?isDeleted=false`, {
      method: "GET",
    });
    const data = await response.json();
    return data.data; // se cambia data.Incidencias a data.data
  } catch (error) {
    throw new Error(`Error conseguir incidencias: ${error.message}`);
  }
}

export async function findDeletedIncidencias() {
  try {
    const response = await fetch(`${BASE_URL}/incidencias/deleted-incidencias`, {
      method: "GET",
    });
    const data = await response.json();
    return data.data; // se cambia data.Incidencias a data.data
  } catch (error) {
    throw new Error(`Error conseguir incidencias: ${error.message}`);
  }
}

/**
 * Toma una ID, realiza una solicitud de eliminación al servidor y devuelve la respuesta
 * @param id - la identificación de la incidencia para eliminar
 * @returns la respuesta del servidor.
 */
export async function deleteIncidencia(id) {
  const url = `${BASE_URL}/incidencias/${id}?isDeleted=true`;
  console.log(url)
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Error al eliminar la incidencia ${id}: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al eliminar la incidencia ${id}: ${error.message}`);
  }
}

/* crea la funcion async editIncidencia */

export async function editIncidencia(id, incidencia) {
  console.log('Editando Incidencia', id)
  const url = `${BASE_URL}/incidencias/${id}`;
  
  try {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(incidencia),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Error al editar la incidencia ${id}: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al editar la incidencia ${id}: ${error.message}`);
  }
}

// funcion para restaurar una incidencia cuyo campo isDeleted es true pasarlo a false
export async function restoreIncidencia(id) {
  const url = `${BASE_URL}/incidencias/${id}`;

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Error al restaurar la incidencia ${id}: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al restaurar la incidencia ${id}: ${error.message}`);
  } 
}