import db from '@/api/pouchDB'


// https://bl.ocks.org/nolanlawson/3e096160b848689f1058
var docs = [];

function binarySearch(arr, docId) {
  var low = 0,
    high = arr.length,
    mid;
  while (low < high) {
    mid = (low + high) >>> 1; // faster version of Math.floor((low + high) / 2)
    arr[mid]._id < docId ? low = mid + 1 : high = mid
  }
  return low;
}

function onDeleted(id) {
  var index = binarySearch(docs, id);
  var doc = docs[index];
  if (doc && doc._id === id) {
    docs.splice(index, 1);
  }
}

function onUpdatedOrInserted(newDoc) {
  var index = binarySearch(docs, newDoc._id);
  var doc = docs[index];
  if (doc && doc._id === newDoc._id) { // update
    docs[index] = newDoc;
  } else { // insert
    docs.splice(index, 0, newDoc);
  }
}

function arrayToObj(allDocs) {
  var obj = {}
  allDocs.forEach(element => {
    obj[element._id] = element

  });
  return obj
}

function fetchInitialDocs() {
  return db.allDocs({
    include_docs: true
  }).then(function (res) {
    docs = res.rows.map(function (row) {
      return row.doc;
    });
    state.docs = arrayToObj(docs)
    console.log('TCL: fetchInitialDocs -> state.docs', state.docs);
    state.docsIsInitialized = true
  });
}

function reactToChanges() {
  db.changes({
    live: true,
    since: 'now',
    include_docs: true
  }).on('change', function (change) {
    if (change.deleted) {
      // change.id holds the deleted id
      onDeleted(change.id);
    } else { // updated/inserted
      // change.doc holds the new doc
      onUpdatedOrInserted(change.doc);
    }
    state.docs = arrayToObj(docs)
    console.log('TCL: reactToChanges -> state.docs', state.docs);
    // renderDocs();
  }).on('error', console.log.bind(console));
}

fetchInitialDocs()
  .then(reactToChanges)
  .catch(console.log.bind(console));


const state = {
  docs: {},
  docsIsInitialized: false,
  isOnline: false,
  me: null
};

const getters = {
  isOnline(state) {
    return state.isOnline;
  },
  docs(state) {
    return state.docs
  },
  docsIsInitialized(state) {
    return state.docsIsInitialized
  }
};

const actions = {
    isOnline({ state }, payload) {
        state.isOnline = payload;
        console.log('TCL: -----------------------------------------------');
        console.log('TCL: isOnline -> state.isOnline', state.isOnline);
        console.log('TCL: -----------------------------------------------');
  },
};

export default {
  state,
  getters,
  actions
};
