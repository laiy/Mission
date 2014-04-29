(function() {

  function drag(obj, distanceBetweenObjAndClientX, distanceBetweenObjAndClientY) {
    var onDrag = true;
    document.onmouseup = function() {
      onDrag = false;
    };
    document.onmousemove = function(ev) {
      if (onDrag){
        obj.style.left = ev.clientX - distanceBetweenObjAndClientX + 'px';
        obj.style.top = ev.clientY - distanceBetweenObjAndClientY + 'px';
      }
    }
  }

  window.onload = function() {
    document.onmousedown = function(ev) {
      if (ev.target.getAttribute('class') == 'ball') {
        var distanceBetweenObjAndClientX = ev.clientX - ev.target.offsetLeft;
        var distanceBetweenObjAndClientY = ev.clientY - ev.target.offsetTop;
        drag(ev.target, distanceBetweenObjAndClientX, distanceBetweenObjAndClientY);
      }
    };
  }

})();
