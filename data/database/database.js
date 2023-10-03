import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("todo.db");

export const initializeDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(`CREATE TABLE IF NOT EXISTS
                      todos (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        title TEXT NOT NULL,
                        description TEXT NOT NULL,
                        priority INTEGER NOT NULL,
                        end_date DATE NOT NULL,
                        start_date DATETIME DEFAULT CURRENT_TIMESTAMP,
                        done BOOLEAN DEFAULT 0 )`);
  });
};

/**
 *
 * @param {string} title
 * @param {string} description
 * @param {Date} startDate
 * @param {Date} endDate
 * @param {number} priority
 * @returns
 */
export const addTodo = (title, description, endDate, priority) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Agrega ceros a la izquierda si es necesario
  const day = String(currentDate.getDate()).padStart(2, "0"); // Agrega ceros a la izquierda si es necesario
  const startDate = `${year}-${month}-${day}`;

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO todos (title, description, start_date, end_date, priority) VALUES (?, ?, ?, ?, ?)",
        [title, description, startDate, endDate, priority],
        (txtObj, result) => resolve(result.insertId),
        (txtObj, error) => reject(error)
      );
    });
  });
};


export const updateTodo = (id,title, description, endDate, priority, done) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Agrega ceros a la izquierda si es necesario
  const day = String(currentDate.getDate()).padStart(2, "0"); // Agrega ceros a la izquierda si es necesario
  const startDate = `${year}-${month}-${day}`;

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE todos SET title = ?, description = ?, start_date = ? , end_date = ? , priority = ? , done = ? WHERE id = ? ",
        [title, description, startDate, endDate, priority, done ,id],
        (txtObj, result) => resolve(result.updateTodo),
        (txtObj, error) => reject(error)
      );
    });
  });
};




export const getTodos = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM todos",
        [],
        (txtObj, resultSet) => resolve(resultSet.rows._array),
        (txtObj, error) => reject(error)
      );
    });
  });
};

export const getTodoById = (idTodo) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM todos WHERE id = ?",
        [idTodo],
        (txObject, results) => {
          const len = results.rows.length;
          if (len > 0) {
            const row = results.rows.item(0);
            resolve(row);
          } else {
            resolve(null);
          }
        },
        (txObject, error) => {
          reject(error);
        }
      );
    });
  });
};

export const deleteTodo = (idTodo) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM todos WHERE id = ?",
        [idTodo],
        (txObj, result) => {
          if (result.rowsAffected > 0) {
            resolve(true); // Éxito al eliminar
          } else {
            resolve(false); // No se encontró la tarea para eliminar
          }
        },
        (txObj, error) => {
          reject(error); // Error al eliminar
        }
      );
    });
  });
};

export const updateTodoDoneStatus = (idTodo, isDone) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE todos SET done = ? WHERE id = ?",
        [isDone ? 1 : 0, idTodo], // Convierte a 1 si isDone es verdadero, 0 si es falso
        (txObj, result) => {
          if (result.rowsAffected > 0) {
            resolve(true); // Éxito al actualizar el estado
          } else {
            resolve(false); // No se encontró la tarea para actualizar
          }
        },
        (txObj, error) => {
          reject(error); // Error al actualizar
        }
      );
    });
  });
};
