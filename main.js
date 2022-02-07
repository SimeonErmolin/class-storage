class Storage {
  constructor(key, storageType = localStorage, defaultValue) {
    this.key = key;
    this.storageType = storageType;
    this.defaultValue = defaultValue;

    let keysList;
    !storageType.keysList ? keysList = new Set() : keysList = new Set(JSON.parse(storageType.getItem(key)));
    this.keysList = keysList;

    if (defaultValue) {
      this.set(defaultValue)
    }
  }

  get() {
    console.log(this.storageType.getItem(this.key))
  }

  set(value) {
    this.keysList.add(value);
    this.updateLocal();
  }

  clear() {
    this.keysList.clear();
    this.updateLocal();
  }

  isEmpty() {
    let keys = Object.keys(this.keysList);
    let index = 0;

    for (let key of keys) {
      index++;
      if (key == this.key) break;
    }

    return (this.storageType.key(index) == null || this.storageType.key(index) == undefined)
  }

  updateLocal() {
    this.storageType.setItem(this.key, JSON.stringify([...this.keysList]));
  }
}
