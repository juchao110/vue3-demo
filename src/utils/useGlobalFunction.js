/*
 **全局公用方法
 */

export default function() {
  function setLocal(key, value) {
    localStorage.setItem(key, value)
  }

  function getLocal(key) {
    return localStorage.getItem(key)
  }

  function removeLocal(key) {
    localStorage.removeItem(key)
  }
  return {
    setLocal,
    getLocal,
    removeLocal
  }
}