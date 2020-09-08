// In the following line, you should include the prefixes of implementations you want to test.
window.indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB;
// DON'T use "var indexedDB = ..." if you're not in a function.
// Moreover, you may need references to some window.IDB* objects:
window.IDBTransaction = window.IDBTransaction ||
  window.webkitIDBTransaction ||
  window.msIDBTransaction || { READ_WRITE: "readwrite" }; // This line should only be needed if it is needed to support the object's constants for older browsers
window.IDBKeyRange =
  window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

if (!window.indexedDB) {
  alert(
    "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available."
  );
}

const request = window.indexedDB.open("funfood");

request.onerror = function (event) {
  console.log("No database found.");
};

const data = [
  {
    id: 1,
    name: "orange juice",
    description: "Freshly brewed orange juice",
    price: 18.0,
    url: "assets/images/cups/all-berry-bang-cup.png",
  },
  {
    id: 2,
    name: "apple juice",
    description: "Freshly brewed apple juice",
    price: 19.5,
    url: "assets/images/cups/Banana-Buzz-cup.png",
  },
  {
    id: 3,
    name: "pineapple juice",
    description: "Freshly brewed pineapple juice",
    price: 28.0,
    url: "assets/images/cups/Berry-Crush-cup.png",
  },
  {
    id: 4,
    name: "grape juice",
    description: "Freshly brewed grape juice",
    price: 38.0,
    url: "assets/images/cups/Energiser-Blend-cup.png",
  },
  {
    id: 5,
    name: "strawberry juice",
    description: "Freshly brewed strawberry juice",
    price: 18.0,
    url: "assets/images/cups/all-berry-bang-cup.png",
  },
];

request.onsuccess = function () {
  console.log("You're ready to rock!");
};

request.onupgradeneeded = function (event) {
  const db = event.target.result;
  console.log("loading...");
  if (event.oldVersion <= 2) {
    try {
      db.deleteObjectStore("juices");
    } catch (err) {
      console.log("Database already deleted", err);
    }
  }
  const objectStore = db.createObjectStore("juices", { keyPath: "id" });

  objectStore.transaction.oncomplete = function () {
    const juiceObjectStore = db
      .transaction("juices", "readwrite")
      .objectStore("juices");
    data.forEach((item) => juiceObjectStore.add(item));
    juiceObjectStore.onsuccess = function () {
      console.log("Data loaded successfully!");
    };
    juiceObjectStore.onerror = function () {
      console.log("Failed to load data.");
    };
  };
  console.log("Boom! Let's run!");
};

function getData(items) {
  return new Promise(function (res, rej) {
    const results = [];
    request.onsuccess = function (event) {
      const db = event.target.result;
      const objectStore = db.transaction("juices").objectStore("juices");
      items.forEach(({ id, qty, remark }) => {
        objectStore.get(id).onsuccess = function (e) {
          const result = e.target.result;
          if (result !== undefined) {
            result["qty"] = qty;
            result["remark"] = remark;
            results.push(result);
            if (results.length === items.length) {
              res(results);
            }
          }
        };
      });
    };
  });
}
