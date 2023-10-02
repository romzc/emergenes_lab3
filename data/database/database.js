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

export const getTodos = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM todos", [],
        (txtObj, resultSet) => resolve(resultSet.rows._array),
        (txtObj, error) => reject(error)
      );
    });
  });
};

export const getTodo = () => {

}

export const deleteTodo = () => {
  
}
