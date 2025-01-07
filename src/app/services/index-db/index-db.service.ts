import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';

@Injectable({
  providedIn: 'root'
})
export class IndexDbService {

  private dbPromise: Promise<IDBPDatabase>;

  constructor() {
    this.dbPromise = openDB('localDB', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('items')) {
          db.createObjectStore('client_ruc', { keyPath: 'client_ruc' });
          db.createObjectStore('client_name', { keyPath: 'client_name' });
          db.createObjectStore('document_number', { keyPath: 'document_number' });
          db.createObjectStore('document_location', { keyPath: 'document_location' });
        }
      },
    });
  }

  async addItems(items: any[], table: string) {
    console.log('items: ', items.length);

    // Verificar que cada item tenga la propiedad client_ruc
  /* items = items.map(item => {
    if (!item.client_ruc) {
      console.error('Item without client_ruc: ', item);
      throw new Error('Item does not contain client_ruc');
    }
    return item;
  }); */

    const db = await this.dbPromise;
    const tx = db.transaction(table, 'readwrite');
    items.forEach((item) => tx.objectStore(table).put(item));
    await tx.done;
  }

  async getFilteredItems(query: string, table: string): Promise<any[]> {
    const db = await this.dbPromise;
    const tx = db.transaction(table, 'readonly');
    const store = tx.objectStore(table);
    const allItems = await store.getAll();

    // Filtrar los items localmente
    return allItems
      .filter((item: any) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 4); // Limitar a 4 resultados
  }

  // Función para obtener la conexión a la base de datos
  private async getDb() {
    return await this.dbPromise;
  }

  async searchRecords(query: string, table: string): Promise<any[]> {
    const db = await this.getDb();
    const store = db.transaction(table, 'readonly').objectStore(table);

    // Obtener todos los registros (sin límite)
    const allRecords = await store.getAll();
    console.log('tabla: ', table);
    // Filtrar los resultados basados en la consulta
    if (table == 'client_ruc') {
      const filteredResults = allRecords.filter(record =>
        record.client_ruc.toLowerCase().includes(query.toLowerCase())
      );
      // Devolver los primeros 4 registros
      return filteredResults.slice(0, 4);
    }

    if (table == 'client_name') {
      const filteredResults = allRecords.filter(record =>
        record.client_name.toLowerCase().includes(query.toLowerCase())
      );
      // Devolver los primeros 4 registros
      return filteredResults.slice(0, 4);
    }

    if (table == 'document_location') {
      const filteredResults = allRecords.filter(record =>
        record.document_location.toLowerCase().includes(query.toLowerCase())
      );
      // Devolver los primeros 4 registros
      return filteredResults.slice(0, 4);
    }


      const filteredResults = allRecords.filter(record =>
        record.document_location.toLowerCase().includes(query.toLowerCase())
      );
      // Devolver los primeros 4 registros
      return filteredResults.slice(0, 4);


  }


}
