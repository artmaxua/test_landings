(function(root) {
  "use strict";
  var isOn = false;
  var scrollbarSize;
  var scrollTop;

  function getScrollbarSize() {
    if (typeof scrollbarSize !== "undefined") return scrollbarSize;

    var doc = document.documentElement;
    var dummyScroller = document.createElement("div");
    dummyScroller.setAttribute("style", "width:99px;height:99px;" + "position:absolute;top:-9999px;overflow:scroll;");
    doc.appendChild(dummyScroller);
    scrollbarSize = dummyScroller.offsetWidth - dummyScroller.clientWidth;
    doc.removeChild(dummyScroller);
    return scrollbarSize;
  }

  function hasScrollbar() {
    return document.documentElement.scrollHeight > window.innerHeight;
  }

  function on(options) {
    if (typeof document === "undefined" || isOn) return;
    var doc = document.documentElement;
    scrollTop = window.pageYOffset;
    if (hasScrollbar()) {
      doc.style.width = "calc(100% - " + getScrollbarSize() + "px)";
    } else {
      doc.style.width = "100%";
    }
    doc.style.position = "fixed";
    doc.style.top = -scrollTop + "px";
    doc.style.overflow = "hidden";
    isOn = true;
  }

  function off() {
    if (typeof document === "undefined" || !isOn) return;
    var doc = document.documentElement;
    doc.style.width = "";
    doc.style.position = "";
    doc.style.top = "";
    doc.style.overflow = "";
    window.scroll(0, scrollTop);
    isOn = false;
  }

  function toggle() {
    if (isOn) {
      off();
      return;
    }
    on();
  }

  var noScroll = {
    on: on,
    off: off,
    toggle: toggle
  };

  if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = noScroll;
  } else {
    root.noScroll = noScroll;
  }

  function ScrollAnim(elemUnder, elemAbove) {
    this.elemUnder = elemUnder;
    this.elemAbove = elemAbove;
    this.opacity = 1;
    this.step = 10;
    this.touchStep = 2;

    this.resetHelpers();
    this._setEvents();
  }

  ScrollAnim.prototype.resetHelpers = function() {
    this.halfWH = root.innerHeight / 2;
    this.animationStart = $(this.elemUnder).offset().top + $(this.elemUnder).height() / 2;
  };

  ScrollAnim.prototype._getScrolledCenter = function() {
    return $(root).scrollTop() + this.halfWH;
  };

  ScrollAnim.prototype._setEvents = function() {
    var _this = this,
      stopScroll = false;
    $(root)
      .on("resize", function() {
        _this.resetHelpers();
      })
      .on("scroll", function(evt) {
        var windowScrolled = _this._getScrolledCenter();
        if (windowScrolled >= _this.animationStart && _this.opacity > 0) {
          noScroll.on();
          stopScroll = true;
        }
      })
      .on("mousewheel", function(evt) {
        if (stopScroll && _this.opacity > 0) {
          _this.opacity -= (0.1 * 10) / (_this.step - 1);
          $(_this.elemAbove).css("opacity", _this.opacity);
        } else {
          noScroll.off();
          stopScroll = false;
        }
      })
      .on("touchmove", function(evt) {
        if (stopScroll && _this.opacity > 0) {
          _this.opacity -= (0.1 * 10) / (_this.touchStep - 1);
          $(_this.elemAbove).css("opacity", _this.opacity);
        } else {
          noScroll.off();
          stopScroll = false;
        }
      });
  };

  $(document).ready(function() {
    if (isMobile.apple.phone) {
      $(".js-scroll-animation").addClass("is-iphone");
    }
    var elemS = $(".js-scroll-animation:not(.is-iphone)").children();
    if (elemS) {
      new ScrollAnim(elemS.get(0), elemS.get(1));
    }
  });
})(window);
