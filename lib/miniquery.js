class SweetSelector {
  static select(param) {
    var value = param.split('')[0];
    switch (value) {
      case '#':
        param = param.split('#').join('');
        return [document.getElementById(param)]
        break;
      case '.':
        param = param.split('.').join('');
        return document.getElementsByClassName(param)
        break;
      default:
        return document.getElementsByTagName(param)
      break;
    }
  }
}

class DOM {
  static hide(param) {
    var arr = SweetSelector.select(param);
    for(var i = 0;i<arr.length;i++){
      arr[i].style.display = 'none';
    }
  }
  static show(param) {
    var arr = SweetSelector.select(param);
    for(var i = 0;i<arr.length;i++){
      arr[i].style.display = 'block';
    }
  }
  static addClass(param, className) {
    var arr = SweetSelector.select(param);
    for(var i = 0;i<arr.length;i++){
      arr[i].classList.add(className);
    }
  }
  static removeClass(param, className) {
    var arr = SweetSelector.select(param);
    for(var i = 0;i<arr.length;i++){
      arr[i].classList.remove(className)
    }
  }
}

class EventDispatcher {
  static on(param, action, func) {
    var eve = new Event(action);
    var arr = SweetSelector.select(param);
    for(var i = 0;i<arr.length;i++) {
      arr[i].addEventListener(action, func)
    }
  }
  static trigger(param, action) {
    var eve = new Event(action);
    var arr = SweetSelector.select(param);
    for(var i = 0;i<arr.length;i++) {
      arr[i].dispatchEvent(eve);
    }
  }
}

class AjaxWrapper {
  static request(data){
    var req = new XMLHttpRequest();
    req.open(data.type, data.url);
    req.addEventListener("load", data.success);
    req.addEventListener("error", data.fail);
    req.send()
  }
}
//
// function miniquery(param){
//   var arr = SweetSelector.select(param);
//   function hide(param){
//     DOM.hide(param);
//     return this;
//   }
//   function show(param){
//     DOM.show(param);
//     return this;
//   }
// }

class Miniquery {
  constructor(param){
    this.param = param;
  }
  hide(){
    DOM.hide(this.param);
    return this;
  }
  show(){
    DOM.show(this.param);
    return this;
  }
  on(action, func){
    EventDispatcher.on(this.param, action, func);
    return this;
  }
  trigger(action){
    EventDispatcher.trigger(this.param, action);
  }
  ajax(data){
    AjaxWrapper.request(data);
  }
}

var miniquery = function(param){
  return new Miniquery(param)
}

var $ = miniquery;
