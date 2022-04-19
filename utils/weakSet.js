class WeakSet {
  constructor() {
    this.hashMap = {};
    this.garbageCollectorTimer = setInterval(
      this.garbageCollector,
      process.env.GARBAGE_CHECK_INTERVAL
    );
  }

  insert(key, age = undefined) {
    age = Number(age || process.env.DEFAULT_AGE);
    this.hashMap[key] = Date.now() + age;
  }

  contains(key) {
    return this.hashMap[key] > Date.now();
  }

  garbageCollector() {
    Object.keys(this.hashMap).forEach((key) => {
      if (Date.now() > this.hashMap[key]) delete this.hashMap[key];
    });
  }
}

module.exports = WeakSet;
