// src/lib/client/cache/indexedDB.ts
class CSVCache {
  private dbName = "csvDataCache";
  private version = 1;
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(
        this.dbName,
        this.version
      );

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest)
          .result;

        if (!db.objectStoreNames.contains("csvData")) {
          const store = db.createObjectStore("csvData", {
            keyPath: "key"
          });
          store.createIndex("timestamp", "timestamp", {
            unique: false
          });
        }
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve();
      };

      request.onerror = (event) => {
        reject(new Error("Failed to open IndexedDB"));
      };
    });
  }

  async get(key: string): Promise<any | null> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(
        ["csvData"],
        "readonly"
      );
      const store = transaction.objectStore("csvData");
      const request = store.get(key);

      request.onsuccess = () => {
        const result = request.result;
        // Check if data is expired (24 hours)
        if (
          result &&
          Date.now() - result.timestamp <
            24 * 60 * 60 * 1000
        ) {
          resolve(result.data);
        } else {
          resolve(null);
        }
      };

      request.onerror = () => resolve(null);
    });
  }

  async set(key: string, data: any): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(
        ["csvData"],
        "readwrite"
      );
      const store = transaction.objectStore("csvData");
      const item = {
        key,
        data,
        timestamp: Date.now()
      };

      const request = store.put(item);

      request.onsuccess = () => resolve();
      request.onerror = () =>
        reject(new Error("Failed to cache data"));
    });
  }

  async clear(): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(
        ["csvData"],
        "readwrite"
      );
      const store = transaction.objectStore("csvData");
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () =>
        reject(new Error("Failed to clear cache"));
    });
  }
}

export const csvCache = new CSVCache();
