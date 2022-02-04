class Storage {
  constructor(key, storageType, dafaultValue) {
    this.key = key;
    this.storageType = storageType;
    this.dafaultValue = dafaultValue;

    let keysList;
    !storageType.keysList ? keysList = new Set() : keysList = new Set(JSON.parse(storageType.getItem(key)));
    this.keysList = keysList;

    if (dafaultValue) {
      this.set(dafaultValue)
    }
  }

  get() {
    let value = "";

    for (let val of this.keysList) {
      value += `${val}, `;
    }

    console.log(value);
  }

  set(value) {
    console.log(this.keysList.add(value));
    this.updateLocal()
  }

  clear() {
    console.log(this.keysList.clear());
    this.updateLocal()
  }

  isEmpty() {
    let keys = Object.keys(this.keysList);
    let index = 0;
    
    for (let key of keys) {
      index++;
      if (key == this.key) break;
    }

    if (this.storageType.key(index) == null || undefined) {
      console.log(true)
    }
  }

  updateLocal() {
    this.storageType.setItem(this.key, JSON.stringify([...this.keysList]));
  }
}
