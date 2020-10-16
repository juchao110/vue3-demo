const router = {
  namespaced: true,
  state: {
    routes: []
  },
  actions: {

  },
  mutations: {

  }
}

function loadView(view) {
  return () => import(`@/views${view}`);
}

function doTree(data, id) {
  if (data.length < 1) return []
  const parent = checkChild(data, id)
  return parent
};

function checkChild(data, pid) {
  let arr = [];
  data.forEach((e, index) => {
    if (e.parentId == pid) {
      e.children = checkChild(data, e.moduleId);
      arr.push(e);
    }
  })
  return _.sortBy(arr, 'sortNo');
};
export default router