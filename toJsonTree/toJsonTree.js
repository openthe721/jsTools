; (function (window,document){
  var toJsonTree = function(oArr,opts) {
    if (!(this instanceof toJsonTree)) return new toJsonTree(oArr,opts);  
    this.opts = { rootId: 0, self: 'id', parent: 'parentId' };
    if (opts) this._extend(this.opts,opts);
    this.dataObj = {};
    this.oData = oArr || [];
    this.init();
    return this['dataObj']['branch'][0];
  }
  toJsonTree.prototype = {
    init: function () {
      var _this = this;
      this.oData.forEach(function (item) {
        if (item[_this['opts']['self']] == _this['opts']['rootId']) {
          _this.dataObj.branch = [];
          _this.dataObj.branch.push(item);
          _this._drawTree(_this.dataObj.branch);
        };
      });
    },
    _extend: function(obj1,obj2) {
      for (var k in obj2) {
        if (obj1[k]!=undefined) obj1[k]=obj2[k];
      }
      return obj1[k];
    },
    _drawTree: function (arr) {
      var _this = this;
      arr.forEach(function (item1) {
        item1.branch = [];
        _this.oData.forEach(function (item2) {
          if (item2[_this['opts']['self']]!=_this['opts']['rootId'] && item1[_this['opts']['self']]==item2[_this['opts']['parent']]) {
            item1.branch.push(item2);
            _this._drawTree(item1.branch);
          }
        });
      });
    }
  }
  window.toJsonTree=toJsonTree;
}(window,document));