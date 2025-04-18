interface SessionData {
  userData: any;
  templateType: string;
}

interface SessionStorage extends Storage {
  data: Map<string, SessionData>;
  get(key: string): SessionData | undefined;
  set(key: string, value: SessionData): void;
  has(key: string): boolean;
  delete(key: string): boolean;
  // Storage interface implementation
  length: number;
  clear(): void;
  getItem(key: string): string | null;
  key(index: number): string | null;
  removeItem(key: string): void;
  setItem(key: string, value: string): void;
}

declare global {
  var sessionStorage: SessionStorage;
}
