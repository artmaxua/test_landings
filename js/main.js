!(function(a) {
  "use strict";
  "function" == typeof define && define.amd ? define(["jquery"], a) : "undefined" != typeof exports ? (module.exports = a(require("jquery"))) : a(jQuery);
})(function(a) {
  "use strict";
  var b = window.Slick || {};
  (b = (function() {
    function c(c, d) {
      var f,
        e = this;
      (e.defaults = {
        accessibility: !0,
        adaptiveHeight: !1,
        appendArrows: a(c),
        appendDots: a(c),
        arrows: !0,
        asNavFor: null,
        prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
        nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
        autoplay: !1,
        autoplaySpeed: 3e3,
        centerMode: !1,
        centerPadding: "50px",
        cssEase: "ease",
        customPaging: function(b, c) {
          return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c + 1);
        },
        dots: !1,
        dotsClass: "slick-dots",
        draggable: !0,
        easing: "linear",
        edgeFriction: 0.35,
        fade: !1,
        focusOnSelect: !1,
        infinite: !0,
        initialSlide: 0,
        lazyLoad: "ondemand",
        mobileFirst: !1,
        pauseOnHover: !0,
        pauseOnFocus: !0,
        pauseOnDotsHover: !1,
        respondTo: "window",
        responsive: null,
        rows: 1,
        rtl: !1,
        slide: "",
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: !0,
        swipeToSlide: !1,
        touchMove: !0,
        touchThreshold: 5,
        useCSS: !0,
        useTransform: !0,
        variableWidth: !1,
        vertical: !1,
        verticalSwiping: !1,
        waitForAnimate: !0,
        zIndex: 1e3
      }),
        (e.initials = {
          animating: !1,
          dragging: !1,
          autoPlayTimer: null,
          currentDirection: 0,
          currentLeft: null,
          currentSlide: 0,
          direction: 1,
          $dots: null,
          listWidth: null,
          listHeight: null,
          loadIndex: 0,
          $nextArrow: null,
          $prevArrow: null,
          slideCount: null,
          slideWidth: null,
          $slideTrack: null,
          $slides: null,
          sliding: !1,
          slideOffset: 0,
          swipeLeft: null,
          $list: null,
          touchObject: {},
          transformsEnabled: !1,
          unslicked: !1
        }),
        a.extend(e, e.initials),
        (e.activeBreakpoint = null),
        (e.animType = null),
        (e.animProp = null),
        (e.breakpoints = []),
        (e.breakpointSettings = []),
        (e.cssTransitions = !1),
        (e.focussed = !1),
        (e.interrupted = !1),
        (e.hidden = "hidden"),
        (e.paused = !0),
        (e.positionProp = null),
        (e.respondTo = null),
        (e.rowCount = 1),
        (e.shouldClick = !0),
        (e.$slider = a(c)),
        (e.$slidesCache = null),
        (e.transformType = null),
        (e.transitionType = null),
        (e.visibilityChange = "visibilitychange"),
        (e.windowWidth = 0),
        (e.windowTimer = null),
        (f = a(c).data("slick") || {}),
        (e.options = a.extend({}, e.defaults, d, f)),
        (e.currentSlide = e.options.initialSlide),
        (e.originalSettings = e.options),
        "undefined" != typeof document.mozHidden
          ? ((e.hidden = "mozHidden"), (e.visibilityChange = "mozvisibilitychange"))
          : "undefined" != typeof document.webkitHidden && ((e.hidden = "webkitHidden"), (e.visibilityChange = "webkitvisibilitychange")),
        (e.autoPlay = a.proxy(e.autoPlay, e)),
        (e.autoPlayClear = a.proxy(e.autoPlayClear, e)),
        (e.autoPlayIterator = a.proxy(e.autoPlayIterator, e)),
        (e.changeSlide = a.proxy(e.changeSlide, e)),
        (e.clickHandler = a.proxy(e.clickHandler, e)),
        (e.selectHandler = a.proxy(e.selectHandler, e)),
        (e.setPosition = a.proxy(e.setPosition, e)),
        (e.swipeHandler = a.proxy(e.swipeHandler, e)),
        (e.dragHandler = a.proxy(e.dragHandler, e)),
        (e.keyHandler = a.proxy(e.keyHandler, e)),
        (e.instanceUid = b++),
        (e.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
        e.registerBreakpoints(),
        e.init(!0);
    }
    var b = 0;
    return c;
  })()),
    (b.prototype.activateADA = function() {
      var a = this;
      a.$slideTrack
        .find(".slick-active")
        .attr({ "aria-hidden": "false" })
        .find("a, input, button, select")
        .attr({ tabindex: "0" });
    }),
    (b.prototype.addSlide = b.prototype.slickAdd = function(b, c, d) {
      var e = this;
      if ("boolean" == typeof c) (d = c), (c = null);
      else if (0 > c || c >= e.slideCount) return !1;
      e.unload(),
        "number" == typeof c
          ? 0 === c && 0 === e.$slides.length
            ? a(b).appendTo(e.$slideTrack)
            : d
            ? a(b).insertBefore(e.$slides.eq(c))
            : a(b).insertAfter(e.$slides.eq(c))
          : d === !0
          ? a(b).prependTo(e.$slideTrack)
          : a(b).appendTo(e.$slideTrack),
        (e.$slides = e.$slideTrack.children(this.options.slide)),
        e.$slideTrack.children(this.options.slide).detach(),
        e.$slideTrack.append(e.$slides),
        e.$slides.each(function(b, c) {
          a(c).attr("data-slick-index", b);
        }),
        (e.$slidesCache = e.$slides),
        e.reinit();
    }),
    (b.prototype.animateHeight = function() {
      var a = this;
      if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
        var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
        a.$list.animate({ height: b }, a.options.speed);
      }
    }),
    (b.prototype.animateSlide = function(b, c) {
      var d = {},
        e = this;
      e.animateHeight(),
        e.options.rtl === !0 && e.options.vertical === !1 && (b = -b),
        e.transformsEnabled === !1
          ? e.options.vertical === !1
            ? e.$slideTrack.animate({ left: b }, e.options.speed, e.options.easing, c)
            : e.$slideTrack.animate({ top: b }, e.options.speed, e.options.easing, c)
          : e.cssTransitions === !1
          ? (e.options.rtl === !0 && (e.currentLeft = -e.currentLeft),
            a({ animStart: e.currentLeft }).animate(
              { animStart: b },
              {
                duration: e.options.speed,
                easing: e.options.easing,
                step: function(a) {
                  (a = Math.ceil(a)),
                    e.options.vertical === !1 ? ((d[e.animType] = "translate(" + a + "px, 0px)"), e.$slideTrack.css(d)) : ((d[e.animType] = "translate(0px," + a + "px)"), e.$slideTrack.css(d));
                },
                complete: function() {
                  c && c.call();
                }
              }
            ))
          : (e.applyTransition(),
            (b = Math.ceil(b)),
            e.options.vertical === !1 ? (d[e.animType] = "translate3d(" + b + "px, 0px, 0px)") : (d[e.animType] = "translate3d(0px," + b + "px, 0px)"),
            e.$slideTrack.css(d),
            c &&
              setTimeout(function() {
                e.disableTransition(), c.call();
              }, e.options.speed));
    }),
    (b.prototype.getNavTarget = function() {
      var b = this,
        c = b.options.asNavFor;
      return c && null !== c && (c = a(c).not(b.$slider)), c;
    }),
    (b.prototype.asNavFor = function(b) {
      var c = this,
        d = c.getNavTarget();
      null !== d &&
        "object" == typeof d &&
        d.each(function() {
          var c = a(this).slick("getSlick");
          c.unslicked || c.slideHandler(b, !0);
        });
    }),
    (b.prototype.applyTransition = function(a) {
      var b = this,
        c = {};
      b.options.fade === !1
        ? (c[b.transitionType] = b.transformType + " " + b.options.speed + "ms " + b.options.cssEase)
        : (c[b.transitionType] = "opacity " + b.options.speed + "ms " + b.options.cssEase),
        b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c);
    }),
    (b.prototype.autoPlay = function() {
      var a = this;
      a.autoPlayClear(), a.slideCount > a.options.slidesToShow && (a.autoPlayTimer = setInterval(a.autoPlayIterator, a.options.autoplaySpeed));
    }),
    (b.prototype.autoPlayClear = function() {
      var a = this;
      a.autoPlayTimer && clearInterval(a.autoPlayTimer);
    }),
    (b.prototype.autoPlayIterator = function() {
      var a = this,
        b = a.currentSlide + a.options.slidesToScroll;
      a.paused ||
        a.interrupted ||
        a.focussed ||
        (a.options.infinite === !1 &&
          (1 === a.direction && a.currentSlide + 1 === a.slideCount - 1
            ? (a.direction = 0)
            : 0 === a.direction && ((b = a.currentSlide - a.options.slidesToScroll), a.currentSlide - 1 === 0 && (a.direction = 1))),
        a.slideHandler(b));
    }),
    (b.prototype.buildArrows = function() {
      var b = this;
      b.options.arrows === !0 &&
        ((b.$prevArrow = a(b.options.prevArrow).addClass("slick-arrow")),
        (b.$nextArrow = a(b.options.nextArrow).addClass("slick-arrow")),
        b.slideCount > b.options.slidesToShow
          ? (b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
            b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
            b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.prependTo(b.options.appendArrows),
            b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.appendTo(b.options.appendArrows),
            b.options.infinite !== !0 && b.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"))
          : b.$prevArrow
              .add(b.$nextArrow)
              .addClass("slick-hidden")
              .attr({ "aria-disabled": "true", tabindex: "-1" }));
    }),
    (b.prototype.buildDots = function() {
      var c,
        d,
        b = this;
      if (b.options.dots === !0 && b.slideCount > b.options.slidesToShow) {
        for (b.$slider.addClass("slick-dotted"), d = a("<ul />").addClass(b.options.dotsClass), c = 0; c <= b.getDotCount(); c += 1)
          d.append(a("<li />").append(b.options.customPaging.call(this, b, c)));
        (b.$dots = d.appendTo(b.options.appendDots)),
          b.$dots
            .find("li")
            .first()
            .addClass("slick-active")
            .attr("aria-hidden", "false");
      }
    }),
    (b.prototype.buildOut = function() {
      var b = this;
      (b.$slides = b.$slider.children(b.options.slide + ":not(.slick-cloned)").addClass("slick-slide")),
        (b.slideCount = b.$slides.length),
        b.$slides.each(function(b, c) {
          a(c)
            .attr("data-slick-index", b)
            .data("originalStyling", a(c).attr("style") || "");
        }),
        b.$slider.addClass("slick-slider"),
        (b.$slideTrack = 0 === b.slideCount ? a('<div class="slick-track"/>').appendTo(b.$slider) : b.$slides.wrapAll('<div class="slick-track"/>').parent()),
        (b.$list = b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent()),
        b.$slideTrack.css("opacity", 0),
        (b.options.centerMode === !0 || b.options.swipeToSlide === !0) && (b.options.slidesToScroll = 1),
        a("img[data-lazy]", b.$slider)
          .not("[src]")
          .addClass("slick-loading"),
        b.setupInfinite(),
        b.buildArrows(),
        b.buildDots(),
        b.updateDots(),
        b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0),
        b.options.draggable === !0 && b.$list.addClass("draggable");
    }),
    (b.prototype.buildRows = function() {
      var b,
        c,
        d,
        e,
        f,
        g,
        h,
        a = this;
      if (((e = document.createDocumentFragment()), (g = a.$slider.children()), a.options.rows > 1)) {
        for (h = a.options.slidesPerRow * a.options.rows, f = Math.ceil(g.length / h), b = 0; f > b; b++) {
          var i = document.createElement("div");
          for (c = 0; c < a.options.rows; c++) {
            var j = document.createElement("div");
            for (d = 0; d < a.options.slidesPerRow; d++) {
              var k = b * h + (c * a.options.slidesPerRow + d);
              g.get(k) && j.appendChild(g.get(k));
            }
            i.appendChild(j);
          }
          e.appendChild(i);
        }
        a.$slider.empty().append(e),
          a.$slider
            .children()
            .children()
            .children()
            .css({ width: 100 / a.options.slidesPerRow + "%", display: "inline-block" });
      }
    }),
    (b.prototype.checkResponsive = function(b, c) {
      var e,
        f,
        g,
        d = this,
        h = !1,
        i = d.$slider.width(),
        j = window.innerWidth || a(window).width();
      if (
        ("window" === d.respondTo ? (g = j) : "slider" === d.respondTo ? (g = i) : "min" === d.respondTo && (g = Math.min(j, i)),
        d.options.responsive && d.options.responsive.length && null !== d.options.responsive)
      ) {
        f = null;
        for (e in d.breakpoints)
          d.breakpoints.hasOwnProperty(e) && (d.originalSettings.mobileFirst === !1 ? g < d.breakpoints[e] && (f = d.breakpoints[e]) : g > d.breakpoints[e] && (f = d.breakpoints[e]));
        null !== f
          ? null !== d.activeBreakpoint
            ? (f !== d.activeBreakpoint || c) &&
              ((d.activeBreakpoint = f),
              "unslick" === d.breakpointSettings[f]
                ? d.unslick(f)
                : ((d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f])), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)),
              (h = f))
            : ((d.activeBreakpoint = f),
              "unslick" === d.breakpointSettings[f]
                ? d.unslick(f)
                : ((d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f])), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)),
              (h = f))
          : null !== d.activeBreakpoint && ((d.activeBreakpoint = null), (d.options = d.originalSettings), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b), (h = f)),
          b || h === !1 || d.$slider.trigger("breakpoint", [d, h]);
      }
    }),
    (b.prototype.changeSlide = function(b, c) {
      var f,
        g,
        h,
        d = this,
        e = a(b.currentTarget);
      switch (
        (e.is("a") && b.preventDefault(),
        e.is("li") || (e = e.closest("li")),
        (h = d.slideCount % d.options.slidesToScroll !== 0),
        (f = h ? 0 : (d.slideCount - d.currentSlide) % d.options.slidesToScroll),
        b.data.message)
      ) {
        case "previous":
          (g = 0 === f ? d.options.slidesToScroll : d.options.slidesToShow - f), d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide - g, !1, c);
          break;
        case "next":
          (g = 0 === f ? d.options.slidesToScroll : f), d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide + g, !1, c);
          break;
        case "index":
          var i = 0 === b.data.index ? 0 : b.data.index || e.index() * d.options.slidesToScroll;
          d.slideHandler(d.checkNavigable(i), !1, c), e.children().trigger("focus");
          break;
        default:
          return;
      }
    }),
    (b.prototype.checkNavigable = function(a) {
      var c,
        d,
        b = this;
      if (((c = b.getNavigableIndexes()), (d = 0), a > c[c.length - 1])) a = c[c.length - 1];
      else
        for (var e in c) {
          if (a < c[e]) {
            a = d;
            break;
          }
          d = c[e];
        }
      return a;
    }),
    (b.prototype.cleanUpEvents = function() {
      var b = this;
      b.options.dots &&
        null !== b.$dots &&
        a("li", b.$dots)
          .off("click.slick", b.changeSlide)
          .off("mouseenter.slick", a.proxy(b.interrupt, b, !0))
          .off("mouseleave.slick", a.proxy(b.interrupt, b, !1)),
        b.$slider.off("focus.slick blur.slick"),
        b.options.arrows === !0 &&
          b.slideCount > b.options.slidesToShow &&
          (b.$prevArrow && b.$prevArrow.off("click.slick", b.changeSlide), b.$nextArrow && b.$nextArrow.off("click.slick", b.changeSlide)),
        b.$list.off("touchstart.slick mousedown.slick", b.swipeHandler),
        b.$list.off("touchmove.slick mousemove.slick", b.swipeHandler),
        b.$list.off("touchend.slick mouseup.slick", b.swipeHandler),
        b.$list.off("touchcancel.slick mouseleave.slick", b.swipeHandler),
        b.$list.off("click.slick", b.clickHandler),
        a(document).off(b.visibilityChange, b.visibility),
        b.cleanUpSlideEvents(),
        b.options.accessibility === !0 && b.$list.off("keydown.slick", b.keyHandler),
        b.options.focusOnSelect === !0 &&
          a(b.$slideTrack)
            .children()
            .off("click.slick", b.selectHandler),
        a(window).off("orientationchange.slick.slick-" + b.instanceUid, b.orientationChange),
        a(window).off("resize.slick.slick-" + b.instanceUid, b.resize),
        a("[draggable!=true]", b.$slideTrack).off("dragstart", b.preventDefault),
        a(window).off("load.slick.slick-" + b.instanceUid, b.setPosition),
        a(document).off("ready.slick.slick-" + b.instanceUid, b.setPosition);
    }),
    (b.prototype.cleanUpSlideEvents = function() {
      var b = this;
      b.$list.off("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.off("mouseleave.slick", a.proxy(b.interrupt, b, !1));
    }),
    (b.prototype.cleanUpRows = function() {
      var b,
        a = this;
      a.options.rows > 1 && ((b = a.$slides.children().children()), b.removeAttr("style"), a.$slider.empty().append(b));
    }),
    (b.prototype.clickHandler = function(a) {
      var b = this;
      b.shouldClick === !1 && (a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault());
    }),
    (b.prototype.destroy = function(b) {
      var c = this;
      c.autoPlayClear(),
        (c.touchObject = {}),
        c.cleanUpEvents(),
        a(".slick-cloned", c.$slider).detach(),
        c.$dots && c.$dots.remove(),
        c.$prevArrow &&
          c.$prevArrow.length &&
          (c.$prevArrow
            .removeClass("slick-disabled slick-arrow slick-hidden")
            .removeAttr("aria-hidden aria-disabled tabindex")
            .css("display", ""),
          c.htmlExpr.test(c.options.prevArrow) && c.$prevArrow.remove()),
        c.$nextArrow &&
          c.$nextArrow.length &&
          (c.$nextArrow
            .removeClass("slick-disabled slick-arrow slick-hidden")
            .removeAttr("aria-hidden aria-disabled tabindex")
            .css("display", ""),
          c.htmlExpr.test(c.options.nextArrow) && c.$nextArrow.remove()),
        c.$slides &&
          (c.$slides
            .removeClass("slick-slide slick-active slick-center slick-visible slick-current")
            .removeAttr("aria-hidden")
            .removeAttr("data-slick-index")
            .each(function() {
              a(this).attr("style", a(this).data("originalStyling"));
            }),
          c.$slideTrack.children(this.options.slide).detach(),
          c.$slideTrack.detach(),
          c.$list.detach(),
          c.$slider.append(c.$slides)),
        c.cleanUpRows(),
        c.$slider.removeClass("slick-slider"),
        c.$slider.removeClass("slick-initialized"),
        c.$slider.removeClass("slick-dotted"),
        (c.unslicked = !0),
        b || c.$slider.trigger("destroy", [c]);
    }),
    (b.prototype.disableTransition = function(a) {
      var b = this,
        c = {};
      (c[b.transitionType] = ""), b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c);
    }),
    (b.prototype.fadeSlide = function(a, b) {
      var c = this;
      c.cssTransitions === !1
        ? (c.$slides.eq(a).css({ zIndex: c.options.zIndex }), c.$slides.eq(a).animate({ opacity: 1 }, c.options.speed, c.options.easing, b))
        : (c.applyTransition(a),
          c.$slides.eq(a).css({ opacity: 1, zIndex: c.options.zIndex }),
          b &&
            setTimeout(function() {
              c.disableTransition(a), b.call();
            }, c.options.speed));
    }),
    (b.prototype.fadeSlideOut = function(a) {
      var b = this;
      b.cssTransitions === !1
        ? b.$slides.eq(a).animate({ opacity: 0, zIndex: b.options.zIndex - 2 }, b.options.speed, b.options.easing)
        : (b.applyTransition(a), b.$slides.eq(a).css({ opacity: 0, zIndex: b.options.zIndex - 2 }));
    }),
    (b.prototype.filterSlides = b.prototype.slickFilter = function(a) {
      var b = this;
      null !== a && ((b.$slidesCache = b.$slides), b.unload(), b.$slideTrack.children(this.options.slide).detach(), b.$slidesCache.filter(a).appendTo(b.$slideTrack), b.reinit());
    }),
    (b.prototype.focusHandler = function() {
      var b = this;
      b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function(c) {
        c.stopImmediatePropagation();
        var d = a(this);
        setTimeout(function() {
          b.options.pauseOnFocus && ((b.focussed = d.is(":focus")), b.autoPlay());
        }, 0);
      });
    }),
    (b.prototype.getCurrent = b.prototype.slickCurrentSlide = function() {
      var a = this;
      return a.currentSlide;
    }),
    (b.prototype.getDotCount = function() {
      var a = this,
        b = 0,
        c = 0,
        d = 0;
      if (a.options.infinite === !0)
        for (; b < a.slideCount; ) ++d, (b = c + a.options.slidesToScroll), (c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow);
      else if (a.options.centerMode === !0) d = a.slideCount;
      else if (a.options.asNavFor)
        for (; b < a.slideCount; ) ++d, (b = c + a.options.slidesToScroll), (c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow);
      else d = 1 + Math.ceil((a.slideCount - a.options.slidesToShow) / a.options.slidesToScroll);
      return d - 1;
    }),
    (b.prototype.getLeft = function(a) {
      var c,
        d,
        f,
        b = this,
        e = 0;
      return (
        (b.slideOffset = 0),
        (d = b.$slides.first().outerHeight(!0)),
        b.options.infinite === !0
          ? (b.slideCount > b.options.slidesToShow && ((b.slideOffset = b.slideWidth * b.options.slidesToShow * -1), (e = d * b.options.slidesToShow * -1)),
            b.slideCount % b.options.slidesToScroll !== 0 &&
              a + b.options.slidesToScroll > b.slideCount &&
              b.slideCount > b.options.slidesToShow &&
              (a > b.slideCount
                ? ((b.slideOffset = (b.options.slidesToShow - (a - b.slideCount)) * b.slideWidth * -1), (e = (b.options.slidesToShow - (a - b.slideCount)) * d * -1))
                : ((b.slideOffset = (b.slideCount % b.options.slidesToScroll) * b.slideWidth * -1), (e = (b.slideCount % b.options.slidesToScroll) * d * -1))))
          : a + b.options.slidesToShow > b.slideCount && ((b.slideOffset = (a + b.options.slidesToShow - b.slideCount) * b.slideWidth), (e = (a + b.options.slidesToShow - b.slideCount) * d)),
        b.slideCount <= b.options.slidesToShow && ((b.slideOffset = 0), (e = 0)),
        b.options.centerMode === !0 && b.options.infinite === !0
          ? (b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2) - b.slideWidth)
          : b.options.centerMode === !0 && ((b.slideOffset = 0), (b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2))),
        (c = b.options.vertical === !1 ? a * b.slideWidth * -1 + b.slideOffset : a * d * -1 + e),
        b.options.variableWidth === !0 &&
          ((f =
            b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow)),
          (c = b.options.rtl === !0 ? (f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0) : f[0] ? -1 * f[0].offsetLeft : 0),
          b.options.centerMode === !0 &&
            ((f =
              b.slideCount <= b.options.slidesToShow || b.options.infinite === !1
                ? b.$slideTrack.children(".slick-slide").eq(a)
                : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow + 1)),
            (c = b.options.rtl === !0 ? (f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0) : f[0] ? -1 * f[0].offsetLeft : 0),
            (c += (b.$list.width() - f.outerWidth()) / 2))),
        c
      );
    }),
    (b.prototype.getOption = b.prototype.slickGetOption = function(a) {
      var b = this;
      return b.options[a];
    }),
    (b.prototype.getNavigableIndexes = function() {
      var e,
        a = this,
        b = 0,
        c = 0,
        d = [];
      for (a.options.infinite === !1 ? (e = a.slideCount) : ((b = -1 * a.options.slidesToScroll), (c = -1 * a.options.slidesToScroll), (e = 2 * a.slideCount)); e > b; )
        d.push(b), (b = c + a.options.slidesToScroll), (c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow);
      return d;
    }),
    (b.prototype.getSlick = function() {
      return this;
    }),
    (b.prototype.getSlideCount = function() {
      var c,
        d,
        e,
        b = this;
      return (
        (e = b.options.centerMode === !0 ? b.slideWidth * Math.floor(b.options.slidesToShow / 2) : 0),
        b.options.swipeToSlide === !0
          ? (b.$slideTrack.find(".slick-slide").each(function(c, f) {
              return f.offsetLeft - e + a(f).outerWidth() / 2 > -1 * b.swipeLeft ? ((d = f), !1) : void 0;
            }),
            (c = Math.abs(a(d).attr("data-slick-index") - b.currentSlide) || 1))
          : b.options.slidesToScroll
      );
    }),
    (b.prototype.goTo = b.prototype.slickGoTo = function(a, b) {
      var c = this;
      c.changeSlide({ data: { message: "index", index: parseInt(a) } }, b);
    }),
    (b.prototype.init = function(b) {
      var c = this;
      a(c.$slider).hasClass("slick-initialized") ||
        (a(c.$slider).addClass("slick-initialized"),
        c.buildRows(),
        c.buildOut(),
        c.setProps(),
        c.startLoad(),
        c.loadSlider(),
        c.initializeEvents(),
        c.updateArrows(),
        c.updateDots(),
        c.checkResponsive(!0),
        c.focusHandler()),
        b && c.$slider.trigger("init", [c]),
        c.options.accessibility === !0 && c.initADA(),
        c.options.autoplay && ((c.paused = !1), c.autoPlay());
    }),
    (b.prototype.initADA = function() {
      var b = this;
      b.$slides
        .add(b.$slideTrack.find(".slick-cloned"))
        .attr({ "aria-hidden": "true", tabindex: "-1" })
        .find("a, input, button, select")
        .attr({ tabindex: "-1" }),
        b.$slideTrack.attr("role", "listbox"),
        b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c) {
          a(this).attr({ role: "option", "aria-describedby": "slick-slide" + b.instanceUid + c });
        }),
        null !== b.$dots &&
          b.$dots
            .attr("role", "tablist")
            .find("li")
            .each(function(c) {
              a(this).attr({ role: "presentation", "aria-selected": "false", "aria-controls": "navigation" + b.instanceUid + c, id: "slick-slide" + b.instanceUid + c });
            })
            .first()
            .attr("aria-selected", "true")
            .end()
            .find("button")
            .attr("role", "button")
            .end()
            .closest("div")
            .attr("role", "toolbar"),
        b.activateADA();
    }),
    (b.prototype.initArrowEvents = function() {
      var a = this;
      a.options.arrows === !0 &&
        a.slideCount > a.options.slidesToShow &&
        (a.$prevArrow.off("click.slick").on("click.slick", { message: "previous" }, a.changeSlide), a.$nextArrow.off("click.slick").on("click.slick", { message: "next" }, a.changeSlide));
    }),
    (b.prototype.initDotEvents = function() {
      var b = this;
      b.options.dots === !0 && b.slideCount > b.options.slidesToShow && a("li", b.$dots).on("click.slick", { message: "index" }, b.changeSlide),
        b.options.dots === !0 &&
          b.options.pauseOnDotsHover === !0 &&
          a("li", b.$dots)
            .on("mouseenter.slick", a.proxy(b.interrupt, b, !0))
            .on("mouseleave.slick", a.proxy(b.interrupt, b, !1));
    }),
    (b.prototype.initSlideEvents = function() {
      var b = this;
      b.options.pauseOnHover && (b.$list.on("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.on("mouseleave.slick", a.proxy(b.interrupt, b, !1)));
    }),
    (b.prototype.initializeEvents = function() {
      var b = this;
      b.initArrowEvents(),
        b.initDotEvents(),
        b.initSlideEvents(),
        b.$list.on("touchstart.slick mousedown.slick", { action: "start" }, b.swipeHandler),
        b.$list.on("touchmove.slick mousemove.slick", { action: "move" }, b.swipeHandler),
        b.$list.on("touchend.slick mouseup.slick", { action: "end" }, b.swipeHandler),
        b.$list.on("touchcancel.slick mouseleave.slick", { action: "end" }, b.swipeHandler),
        b.$list.on("click.slick", b.clickHandler),
        a(document).on(b.visibilityChange, a.proxy(b.visibility, b)),
        b.options.accessibility === !0 && b.$list.on("keydown.slick", b.keyHandler),
        b.options.focusOnSelect === !0 &&
          a(b.$slideTrack)
            .children()
            .on("click.slick", b.selectHandler),
        a(window).on("orientationchange.slick.slick-" + b.instanceUid, a.proxy(b.orientationChange, b)),
        a(window).on("resize.slick.slick-" + b.instanceUid, a.proxy(b.resize, b)),
        a("[draggable!=true]", b.$slideTrack).on("dragstart", b.preventDefault),
        a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition),
        a(document).on("ready.slick.slick-" + b.instanceUid, b.setPosition);
    }),
    (b.prototype.initUI = function() {
      var a = this;
      a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.show(), a.$nextArrow.show()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.show();
    }),
    (b.prototype.keyHandler = function(a) {
      var b = this;
      a.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
        (37 === a.keyCode && b.options.accessibility === !0
          ? b.changeSlide({ data: { message: b.options.rtl === !0 ? "next" : "previous" } })
          : 39 === a.keyCode && b.options.accessibility === !0 && b.changeSlide({ data: { message: b.options.rtl === !0 ? "previous" : "next" } }));
    }),
    (b.prototype.lazyLoad = function() {
      function g(c) {
        a("img[data-lazy]", c).each(function() {
          var c = a(this),
            d = a(this).attr("data-lazy"),
            e = document.createElement("img");
          (e.onload = function() {
            c.animate({ opacity: 0 }, 100, function() {
              c.attr("src", d).animate({ opacity: 1 }, 200, function() {
                c.removeAttr("data-lazy").removeClass("slick-loading");
              }),
                b.$slider.trigger("lazyLoaded", [b, c, d]);
            });
          }),
            (e.onerror = function() {
              c
                .removeAttr("data-lazy")
                .removeClass("slick-loading")
                .addClass("slick-lazyload-error"),
                b.$slider.trigger("lazyLoadError", [b, c, d]);
            }),
            (e.src = d);
        });
      }
      var c,
        d,
        e,
        f,
        b = this;
      b.options.centerMode === !0
        ? b.options.infinite === !0
          ? ((e = b.currentSlide + (b.options.slidesToShow / 2 + 1)), (f = e + b.options.slidesToShow + 2))
          : ((e = Math.max(0, b.currentSlide - (b.options.slidesToShow / 2 + 1))), (f = 2 + (b.options.slidesToShow / 2 + 1) + b.currentSlide))
        : ((e = b.options.infinite ? b.options.slidesToShow + b.currentSlide : b.currentSlide),
          (f = Math.ceil(e + b.options.slidesToShow)),
          b.options.fade === !0 && (e > 0 && e--, f <= b.slideCount && f++)),
        (c = b.$slider.find(".slick-slide").slice(e, f)),
        g(c),
        b.slideCount <= b.options.slidesToShow
          ? ((d = b.$slider.find(".slick-slide")), g(d))
          : b.currentSlide >= b.slideCount - b.options.slidesToShow
          ? ((d = b.$slider.find(".slick-cloned").slice(0, b.options.slidesToShow)), g(d))
          : 0 === b.currentSlide && ((d = b.$slider.find(".slick-cloned").slice(-1 * b.options.slidesToShow)), g(d));
    }),
    (b.prototype.loadSlider = function() {
      var a = this;
      a.setPosition(), a.$slideTrack.css({ opacity: 1 }), a.$slider.removeClass("slick-loading"), a.initUI(), "progressive" === a.options.lazyLoad && a.progressiveLazyLoad();
    }),
    (b.prototype.next = b.prototype.slickNext = function() {
      var a = this;
      a.changeSlide({ data: { message: "next" } });
    }),
    (b.prototype.orientationChange = function() {
      var a = this;
      a.checkResponsive(), a.setPosition();
    }),
    (b.prototype.pause = b.prototype.slickPause = function() {
      var a = this;
      a.autoPlayClear(), (a.paused = !0);
    }),
    (b.prototype.play = b.prototype.slickPlay = function() {
      var a = this;
      a.autoPlay(), (a.options.autoplay = !0), (a.paused = !1), (a.focussed = !1), (a.interrupted = !1);
    }),
    (b.prototype.postSlide = function(a) {
      var b = this;
      b.unslicked ||
        (b.$slider.trigger("afterChange", [b, a]), (b.animating = !1), b.setPosition(), (b.swipeLeft = null), b.options.autoplay && b.autoPlay(), b.options.accessibility === !0 && b.initADA());
    }),
    (b.prototype.prev = b.prototype.slickPrev = function() {
      var a = this;
      a.changeSlide({ data: { message: "previous" } });
    }),
    (b.prototype.preventDefault = function(a) {
      a.preventDefault();
    }),
    (b.prototype.progressiveLazyLoad = function(b) {
      b = b || 1;
      var e,
        f,
        g,
        c = this,
        d = a("img[data-lazy]", c.$slider);
      d.length
        ? ((e = d.first()),
          (f = e.attr("data-lazy")),
          (g = document.createElement("img")),
          (g.onload = function() {
            e
              .attr("src", f)
              .removeAttr("data-lazy")
              .removeClass("slick-loading"),
              c.options.adaptiveHeight === !0 && c.setPosition(),
              c.$slider.trigger("lazyLoaded", [c, e, f]),
              c.progressiveLazyLoad();
          }),
          (g.onerror = function() {
            3 > b
              ? setTimeout(function() {
                  c.progressiveLazyLoad(b + 1);
                }, 500)
              : (e
                  .removeAttr("data-lazy")
                  .removeClass("slick-loading")
                  .addClass("slick-lazyload-error"),
                c.$slider.trigger("lazyLoadError", [c, e, f]),
                c.progressiveLazyLoad());
          }),
          (g.src = f))
        : c.$slider.trigger("allImagesLoaded", [c]);
    }),
    (b.prototype.refresh = function(b) {
      var d,
        e,
        c = this;
      (e = c.slideCount - c.options.slidesToShow),
        !c.options.infinite && c.currentSlide > e && (c.currentSlide = e),
        c.slideCount <= c.options.slidesToShow && (c.currentSlide = 0),
        (d = c.currentSlide),
        c.destroy(!0),
        a.extend(c, c.initials, { currentSlide: d }),
        c.init(),
        b || c.changeSlide({ data: { message: "index", index: d } }, !1);
    }),
    (b.prototype.registerBreakpoints = function() {
      var c,
        d,
        e,
        b = this,
        f = b.options.responsive || null;
      if ("array" === a.type(f) && f.length) {
        b.respondTo = b.options.respondTo || "window";
        for (c in f)
          if (((e = b.breakpoints.length - 1), (d = f[c].breakpoint), f.hasOwnProperty(c))) {
            for (; e >= 0; ) b.breakpoints[e] && b.breakpoints[e] === d && b.breakpoints.splice(e, 1), e--;
            b.breakpoints.push(d), (b.breakpointSettings[d] = f[c].settings);
          }
        b.breakpoints.sort(function(a, c) {
          return b.options.mobileFirst ? a - c : c - a;
        });
      }
    }),
    (b.prototype.reinit = function() {
      var b = this;
      (b.$slides = b.$slideTrack.children(b.options.slide).addClass("slick-slide")),
        (b.slideCount = b.$slides.length),
        b.currentSlide >= b.slideCount && 0 !== b.currentSlide && (b.currentSlide = b.currentSlide - b.options.slidesToScroll),
        b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0),
        b.registerBreakpoints(),
        b.setProps(),
        b.setupInfinite(),
        b.buildArrows(),
        b.updateArrows(),
        b.initArrowEvents(),
        b.buildDots(),
        b.updateDots(),
        b.initDotEvents(),
        b.cleanUpSlideEvents(),
        b.initSlideEvents(),
        b.checkResponsive(!1, !0),
        b.options.focusOnSelect === !0 &&
          a(b.$slideTrack)
            .children()
            .on("click.slick", b.selectHandler),
        b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0),
        b.setPosition(),
        b.focusHandler(),
        (b.paused = !b.options.autoplay),
        b.autoPlay(),
        b.$slider.trigger("reInit", [b]);
    }),
    (b.prototype.resize = function() {
      var b = this;
      a(window).width() !== b.windowWidth &&
        (clearTimeout(b.windowDelay),
        (b.windowDelay = window.setTimeout(function() {
          (b.windowWidth = a(window).width()), b.checkResponsive(), b.unslicked || b.setPosition();
        }, 50)));
    }),
    (b.prototype.removeSlide = b.prototype.slickRemove = function(a, b, c) {
      var d = this;
      return (
        "boolean" == typeof a ? ((b = a), (a = b === !0 ? 0 : d.slideCount - 1)) : (a = b === !0 ? --a : a),
        d.slideCount < 1 || 0 > a || a > d.slideCount - 1
          ? !1
          : (d.unload(),
            c === !0
              ? d.$slideTrack.children().remove()
              : d.$slideTrack
                  .children(this.options.slide)
                  .eq(a)
                  .remove(),
            (d.$slides = d.$slideTrack.children(this.options.slide)),
            d.$slideTrack.children(this.options.slide).detach(),
            d.$slideTrack.append(d.$slides),
            (d.$slidesCache = d.$slides),
            void d.reinit())
      );
    }),
    (b.prototype.setCSS = function(a) {
      var d,
        e,
        b = this,
        c = {};
      b.options.rtl === !0 && (a = -a),
        (d = "left" == b.positionProp ? Math.ceil(a) + "px" : "0px"),
        (e = "top" == b.positionProp ? Math.ceil(a) + "px" : "0px"),
        (c[b.positionProp] = a),
        b.transformsEnabled === !1
          ? b.$slideTrack.css(c)
          : ((c = {}),
            b.cssTransitions === !1 ? ((c[b.animType] = "translate(" + d + ", " + e + ")"), b.$slideTrack.css(c)) : ((c[b.animType] = "translate3d(" + d + ", " + e + ", 0px)"), b.$slideTrack.css(c)));
    }),
    (b.prototype.setDimensions = function() {
      var a = this;
      a.options.vertical === !1
        ? a.options.centerMode === !0 && a.$list.css({ padding: "0px " + a.options.centerPadding })
        : (a.$list.height(a.$slides.first().outerHeight(!0) * a.options.slidesToShow), a.options.centerMode === !0 && a.$list.css({ padding: a.options.centerPadding + " 0px" })),
        (a.listWidth = a.$list.width()),
        (a.listHeight = a.$list.height()),
        a.options.vertical === !1 && a.options.variableWidth === !1
          ? ((a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow)), a.$slideTrack.width(Math.ceil(a.slideWidth * a.$slideTrack.children(".slick-slide").length)))
          : a.options.variableWidth === !0
          ? a.$slideTrack.width(5e3 * a.slideCount)
          : ((a.slideWidth = Math.ceil(a.listWidth)), a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0) * a.$slideTrack.children(".slick-slide").length)));
      var b = a.$slides.first().outerWidth(!0) - a.$slides.first().width();
      a.options.variableWidth === !1 && a.$slideTrack.children(".slick-slide").width(a.slideWidth - b);
    }),
    (b.prototype.setFade = function() {
      var c,
        b = this;
      b.$slides.each(function(d, e) {
        (c = b.slideWidth * d * -1),
          b.options.rtl === !0
            ? a(e).css({ position: "relative", right: c, top: 0, zIndex: b.options.zIndex - 2, opacity: 0 })
            : a(e).css({ position: "relative", left: c, top: 0, zIndex: b.options.zIndex - 2, opacity: 0 });
      }),
        b.$slides.eq(b.currentSlide).css({ zIndex: b.options.zIndex - 1, opacity: 1 });
    }),
    (b.prototype.setHeight = function() {
      var a = this;
      if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
        var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
        a.$list.css("height", b);
      }
    }),
    (b.prototype.setOption = b.prototype.slickSetOption = function() {
      var c,
        d,
        e,
        f,
        h,
        b = this,
        g = !1;
      if (
        ("object" === a.type(arguments[0])
          ? ((e = arguments[0]), (g = arguments[1]), (h = "multiple"))
          : "string" === a.type(arguments[0]) &&
            ((e = arguments[0]),
            (f = arguments[1]),
            (g = arguments[2]),
            "responsive" === arguments[0] && "array" === a.type(arguments[1]) ? (h = "responsive") : "undefined" != typeof arguments[1] && (h = "single")),
        "single" === h)
      )
        b.options[e] = f;
      else if ("multiple" === h)
        a.each(e, function(a, c) {
          b.options[a] = c;
        });
      else if ("responsive" === h)
        for (d in f)
          if ("array" !== a.type(b.options.responsive)) b.options.responsive = [f[d]];
          else {
            for (c = b.options.responsive.length - 1; c >= 0; ) b.options.responsive[c].breakpoint === f[d].breakpoint && b.options.responsive.splice(c, 1), c--;
            b.options.responsive.push(f[d]);
          }
      g && (b.unload(), b.reinit());
    }),
    (b.prototype.setPosition = function() {
      var a = this;
      a.setDimensions(), a.setHeight(), a.options.fade === !1 ? a.setCSS(a.getLeft(a.currentSlide)) : a.setFade(), a.$slider.trigger("setPosition", [a]);
    }),
    (b.prototype.setProps = function() {
      var a = this,
        b = document.body.style;
      (a.positionProp = a.options.vertical === !0 ? "top" : "left"),
        "top" === a.positionProp ? a.$slider.addClass("slick-vertical") : a.$slider.removeClass("slick-vertical"),
        (void 0 !== b.WebkitTransition || void 0 !== b.MozTransition || void 0 !== b.msTransition) && a.options.useCSS === !0 && (a.cssTransitions = !0),
        a.options.fade && ("number" == typeof a.options.zIndex ? a.options.zIndex < 3 && (a.options.zIndex = 3) : (a.options.zIndex = a.defaults.zIndex)),
        void 0 !== b.OTransform &&
          ((a.animType = "OTransform"),
          (a.transformType = "-o-transform"),
          (a.transitionType = "OTransition"),
          void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)),
        void 0 !== b.MozTransform &&
          ((a.animType = "MozTransform"),
          (a.transformType = "-moz-transform"),
          (a.transitionType = "MozTransition"),
          void 0 === b.perspectiveProperty && void 0 === b.MozPerspective && (a.animType = !1)),
        void 0 !== b.webkitTransform &&
          ((a.animType = "webkitTransform"),
          (a.transformType = "-webkit-transform"),
          (a.transitionType = "webkitTransition"),
          void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)),
        void 0 !== b.msTransform && ((a.animType = "msTransform"), (a.transformType = "-ms-transform"), (a.transitionType = "msTransition"), void 0 === b.msTransform && (a.animType = !1)),
        void 0 !== b.transform && a.animType !== !1 && ((a.animType = "transform"), (a.transformType = "transform"), (a.transitionType = "transition")),
        (a.transformsEnabled = a.options.useTransform && null !== a.animType && a.animType !== !1);
    }),
    (b.prototype.setSlideClasses = function(a) {
      var c,
        d,
        e,
        f,
        b = this;
      (d = b.$slider
        .find(".slick-slide")
        .removeClass("slick-active slick-center slick-current")
        .attr("aria-hidden", "true")),
        b.$slides.eq(a).addClass("slick-current"),
        b.options.centerMode === !0
          ? ((c = Math.floor(b.options.slidesToShow / 2)),
            b.options.infinite === !0 &&
              (a >= c && a <= b.slideCount - 1 - c
                ? b.$slides
                    .slice(a - c, a + c + 1)
                    .addClass("slick-active")
                    .attr("aria-hidden", "false")
                : ((e = b.options.slidesToShow + a),
                  d
                    .slice(e - c + 1, e + c + 2)
                    .addClass("slick-active")
                    .attr("aria-hidden", "false")),
              0 === a ? d.eq(d.length - 1 - b.options.slidesToShow).addClass("slick-center") : a === b.slideCount - 1 && d.eq(b.options.slidesToShow).addClass("slick-center")),
            b.$slides.eq(a).addClass("slick-center"))
          : a >= 0 && a <= b.slideCount - b.options.slidesToShow
          ? b.$slides
              .slice(a, a + b.options.slidesToShow)
              .addClass("slick-active")
              .attr("aria-hidden", "false")
          : d.length <= b.options.slidesToShow
          ? d.addClass("slick-active").attr("aria-hidden", "false")
          : ((f = b.slideCount % b.options.slidesToShow),
            (e = b.options.infinite === !0 ? b.options.slidesToShow + a : a),
            b.options.slidesToShow == b.options.slidesToScroll && b.slideCount - a < b.options.slidesToShow
              ? d
                  .slice(e - (b.options.slidesToShow - f), e + f)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")
              : d
                  .slice(e, e + b.options.slidesToShow)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")),
        "ondemand" === b.options.lazyLoad && b.lazyLoad();
    }),
    (b.prototype.setupInfinite = function() {
      var c,
        d,
        e,
        b = this;
      if ((b.options.fade === !0 && (b.options.centerMode = !1), b.options.infinite === !0 && b.options.fade === !1 && ((d = null), b.slideCount > b.options.slidesToShow))) {
        for (e = b.options.centerMode === !0 ? b.options.slidesToShow + 1 : b.options.slidesToShow, c = b.slideCount; c > b.slideCount - e; c -= 1)
          (d = c - 1),
            a(b.$slides[d])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", d - b.slideCount)
              .prependTo(b.$slideTrack)
              .addClass("slick-cloned");
        for (c = 0; e > c; c += 1)
          (d = c),
            a(b.$slides[d])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", d + b.slideCount)
              .appendTo(b.$slideTrack)
              .addClass("slick-cloned");
        b.$slideTrack
          .find(".slick-cloned")
          .find("[id]")
          .each(function() {
            a(this).attr("id", "");
          });
      }
    }),
    (b.prototype.interrupt = function(a) {
      var b = this;
      a || b.autoPlay(), (b.interrupted = a);
    }),
    (b.prototype.selectHandler = function(b) {
      var c = this,
        d = a(b.target).is(".slick-slide") ? a(b.target) : a(b.target).parents(".slick-slide"),
        e = parseInt(d.attr("data-slick-index"));
      return e || (e = 0), c.slideCount <= c.options.slidesToShow ? (c.setSlideClasses(e), void c.asNavFor(e)) : void c.slideHandler(e);
    }),
    (b.prototype.slideHandler = function(a, b, c) {
      var d,
        e,
        f,
        g,
        j,
        h = null,
        i = this;
      return (
        (b = b || !1),
        (i.animating === !0 && i.options.waitForAnimate === !0) || (i.options.fade === !0 && i.currentSlide === a) || i.slideCount <= i.options.slidesToShow
          ? void 0
          : (b === !1 && i.asNavFor(a),
            (d = a),
            (h = i.getLeft(d)),
            (g = i.getLeft(i.currentSlide)),
            (i.currentLeft = null === i.swipeLeft ? g : i.swipeLeft),
            i.options.infinite === !1 && i.options.centerMode === !1 && (0 > a || a > i.getDotCount() * i.options.slidesToScroll)
              ? void (
                  i.options.fade === !1 &&
                  ((d = i.currentSlide),
                  c !== !0
                    ? i.animateSlide(g, function() {
                        i.postSlide(d);
                      })
                    : i.postSlide(d))
                )
              : i.options.infinite === !1 && i.options.centerMode === !0 && (0 > a || a > i.slideCount - i.options.slidesToScroll)
              ? void (
                  i.options.fade === !1 &&
                  ((d = i.currentSlide),
                  c !== !0
                    ? i.animateSlide(g, function() {
                        i.postSlide(d);
                      })
                    : i.postSlide(d))
                )
              : (i.options.autoplay && clearInterval(i.autoPlayTimer),
                (e =
                  0 > d
                    ? i.slideCount % i.options.slidesToScroll !== 0
                      ? i.slideCount - (i.slideCount % i.options.slidesToScroll)
                      : i.slideCount + d
                    : d >= i.slideCount
                    ? i.slideCount % i.options.slidesToScroll !== 0
                      ? 0
                      : d - i.slideCount
                    : d),
                (i.animating = !0),
                i.$slider.trigger("beforeChange", [i, i.currentSlide, e]),
                (f = i.currentSlide),
                (i.currentSlide = e),
                i.setSlideClasses(i.currentSlide),
                i.options.asNavFor && ((j = i.getNavTarget()), (j = j.slick("getSlick")), j.slideCount <= j.options.slidesToShow && j.setSlideClasses(i.currentSlide)),
                i.updateDots(),
                i.updateArrows(),
                i.options.fade === !0
                  ? (c !== !0
                      ? (i.fadeSlideOut(f),
                        i.fadeSlide(e, function() {
                          i.postSlide(e);
                        }))
                      : i.postSlide(e),
                    void i.animateHeight())
                  : void (c !== !0
                      ? i.animateSlide(h, function() {
                          i.postSlide(e);
                        })
                      : i.postSlide(e))))
      );
    }),
    (b.prototype.startLoad = function() {
      var a = this;
      a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.hide(), a.$nextArrow.hide()),
        a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.hide(),
        a.$slider.addClass("slick-loading");
    }),
    (b.prototype.swipeDirection = function() {
      var a,
        b,
        c,
        d,
        e = this;
      return (
        (a = e.touchObject.startX - e.touchObject.curX),
        (b = e.touchObject.startY - e.touchObject.curY),
        (c = Math.atan2(b, a)),
        (d = Math.round((180 * c) / Math.PI)),
        0 > d && (d = 360 - Math.abs(d)),
        45 >= d && d >= 0
          ? e.options.rtl === !1
            ? "left"
            : "right"
          : 360 >= d && d >= 315
          ? e.options.rtl === !1
            ? "left"
            : "right"
          : d >= 135 && 225 >= d
          ? e.options.rtl === !1
            ? "right"
            : "left"
          : e.options.verticalSwiping === !0
          ? d >= 35 && 135 >= d
            ? "down"
            : "up"
          : "vertical"
      );
    }),
    (b.prototype.swipeEnd = function(a) {
      var c,
        d,
        b = this;
      if (((b.dragging = !1), (b.interrupted = !1), (b.shouldClick = b.touchObject.swipeLength > 10 ? !1 : !0), void 0 === b.touchObject.curX)) return !1;
      if ((b.touchObject.edgeHit === !0 && b.$slider.trigger("edge", [b, b.swipeDirection()]), b.touchObject.swipeLength >= b.touchObject.minSwipe)) {
        switch ((d = b.swipeDirection())) {
          case "left":
          case "down":
            (c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide + b.getSlideCount()) : b.currentSlide + b.getSlideCount()), (b.currentDirection = 0);
            break;
          case "right":
          case "up":
            (c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide - b.getSlideCount()) : b.currentSlide - b.getSlideCount()), (b.currentDirection = 1);
        }
        "vertical" != d && (b.slideHandler(c), (b.touchObject = {}), b.$slider.trigger("swipe", [b, d]));
      } else b.touchObject.startX !== b.touchObject.curX && (b.slideHandler(b.currentSlide), (b.touchObject = {}));
    }),
    (b.prototype.swipeHandler = function(a) {
      var b = this;
      if (!(b.options.swipe === !1 || ("ontouchend" in document && b.options.swipe === !1) || (b.options.draggable === !1 && -1 !== a.type.indexOf("mouse"))))
        switch (
          ((b.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1),
          (b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold),
          b.options.verticalSwiping === !0 && (b.touchObject.minSwipe = b.listHeight / b.options.touchThreshold),
          a.data.action)
        ) {
          case "start":
            b.swipeStart(a);
            break;
          case "move":
            b.swipeMove(a);
            break;
          case "end":
            b.swipeEnd(a);
        }
    }),
    (b.prototype.swipeMove = function(a) {
      var d,
        e,
        f,
        g,
        h,
        b = this;
      return (
        (h = void 0 !== a.originalEvent ? a.originalEvent.touches : null),
        !b.dragging || (h && 1 !== h.length)
          ? !1
          : ((d = b.getLeft(b.currentSlide)),
            (b.touchObject.curX = void 0 !== h ? h[0].pageX : a.clientX),
            (b.touchObject.curY = void 0 !== h ? h[0].pageY : a.clientY),
            (b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curX - b.touchObject.startX, 2)))),
            b.options.verticalSwiping === !0 && (b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curY - b.touchObject.startY, 2)))),
            (e = b.swipeDirection()),
            "vertical" !== e
              ? (void 0 !== a.originalEvent && b.touchObject.swipeLength > 4 && a.preventDefault(),
                (g = (b.options.rtl === !1 ? 1 : -1) * (b.touchObject.curX > b.touchObject.startX ? 1 : -1)),
                b.options.verticalSwiping === !0 && (g = b.touchObject.curY > b.touchObject.startY ? 1 : -1),
                (f = b.touchObject.swipeLength),
                (b.touchObject.edgeHit = !1),
                b.options.infinite === !1 &&
                  ((0 === b.currentSlide && "right" === e) || (b.currentSlide >= b.getDotCount() && "left" === e)) &&
                  ((f = b.touchObject.swipeLength * b.options.edgeFriction), (b.touchObject.edgeHit = !0)),
                b.options.vertical === !1 ? (b.swipeLeft = d + f * g) : (b.swipeLeft = d + f * (b.$list.height() / b.listWidth) * g),
                b.options.verticalSwiping === !0 && (b.swipeLeft = d + f * g),
                b.options.fade === !0 || b.options.touchMove === !1 ? !1 : b.animating === !0 ? ((b.swipeLeft = null), !1) : void b.setCSS(b.swipeLeft))
              : void 0)
      );
    }),
    (b.prototype.swipeStart = function(a) {
      var c,
        b = this;
      return (
        (b.interrupted = !0),
        1 !== b.touchObject.fingerCount || b.slideCount <= b.options.slidesToShow
          ? ((b.touchObject = {}), !1)
          : (void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (c = a.originalEvent.touches[0]),
            (b.touchObject.startX = b.touchObject.curX = void 0 !== c ? c.pageX : a.clientX),
            (b.touchObject.startY = b.touchObject.curY = void 0 !== c ? c.pageY : a.clientY),
            void (b.dragging = !0))
      );
    }),
    (b.prototype.unfilterSlides = b.prototype.slickUnfilter = function() {
      var a = this;
      null !== a.$slidesCache && (a.unload(), a.$slideTrack.children(this.options.slide).detach(), a.$slidesCache.appendTo(a.$slideTrack), a.reinit());
    }),
    (b.prototype.unload = function() {
      var b = this;
      a(".slick-cloned", b.$slider).remove(),
        b.$dots && b.$dots.remove(),
        b.$prevArrow && b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.remove(),
        b.$nextArrow && b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.remove(),
        b.$slides
          .removeClass("slick-slide slick-active slick-visible slick-current")
          .attr("aria-hidden", "true")
          .css("width", "");
    }),
    (b.prototype.unslick = function(a) {
      var b = this;
      b.$slider.trigger("unslick", [b, a]), b.destroy();
    }),
    (b.prototype.updateArrows = function() {
      var b,
        a = this;
      (b = Math.floor(a.options.slidesToShow / 2)),
        a.options.arrows === !0 &&
          a.slideCount > a.options.slidesToShow &&
          !a.options.infinite &&
          (a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
          a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
          0 === a.currentSlide
            ? (a.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"))
            : a.currentSlide >= a.slideCount - a.options.slidesToShow && a.options.centerMode === !1
            ? (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"))
            : a.currentSlide >= a.slideCount - 1 &&
              a.options.centerMode === !0 &&
              (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")));
    }),
    (b.prototype.updateDots = function() {
      var a = this;
      null !== a.$dots &&
        (a.$dots
          .find("li")
          .removeClass("slick-active")
          .attr("aria-hidden", "true"),
        a.$dots
          .find("li")
          .eq(Math.floor(a.currentSlide / a.options.slidesToScroll))
          .addClass("slick-active")
          .attr("aria-hidden", "false"));
    }),
    (b.prototype.visibility = function() {
      var a = this;
      a.options.autoplay && (document[a.hidden] ? (a.interrupted = !0) : (a.interrupted = !1));
    }),
    (a.fn.slick = function() {
      var f,
        g,
        a = this,
        c = arguments[0],
        d = Array.prototype.slice.call(arguments, 1),
        e = a.length;
      for (f = 0; e > f; f++) if (("object" == typeof c || "undefined" == typeof c ? (a[f].slick = new b(a[f], c)) : (g = a[f].slick[c].apply(a[f].slick, d)), "undefined" != typeof g)) return g;
      return a;
    });
});
!(function(a, b, c, d) {
  "use strict";
  function e(a, b, c) {
    return setTimeout(j(a, c), b);
  }
  function f(a, b, c) {
    return Array.isArray(a) ? (g(a, c[b], c), !0) : !1;
  }
  function g(a, b, c) {
    var e;
    if (a)
      if (a.forEach) a.forEach(b, c);
      else if (a.length !== d) for (e = 0; e < a.length; ) b.call(c, a[e], e, a), e++;
      else for (e in a) a.hasOwnProperty(e) && b.call(c, a[e], e, a);
  }
  function h(b, c, d) {
    var e = "DEPRECATED METHOD: " + c + "\n" + d + " AT \n";
    return function() {
      var c = new Error("get-stack-trace"),
        d =
          c && c.stack
            ? c.stack
                .replace(/^[^\(]+?[\n$]/gm, "")
                .replace(/^\s+at\s+/gm, "")
                .replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@")
            : "Unknown Stack Trace",
        f = a.console && (a.console.warn || a.console.log);
      return f && f.call(a.console, e, d), b.apply(this, arguments);
    };
  }
  function i(a, b, c) {
    var d,
      e = b.prototype;
    (d = a.prototype = Object.create(e)), (d.constructor = a), (d._super = e), c && la(d, c);
  }
  function j(a, b) {
    return function() {
      return a.apply(b, arguments);
    };
  }
  function k(a, b) {
    return typeof a == oa ? a.apply(b ? b[0] || d : d, b) : a;
  }
  function l(a, b) {
    return a === d ? b : a;
  }
  function m(a, b, c) {
    g(q(b), function(b) {
      a.addEventListener(b, c, !1);
    });
  }
  function n(a, b, c) {
    g(q(b), function(b) {
      a.removeEventListener(b, c, !1);
    });
  }
  function o(a, b) {
    for (; a; ) {
      if (a == b) return !0;
      a = a.parentNode;
    }
    return !1;
  }
  function p(a, b) {
    return a.indexOf(b) > -1;
  }
  function q(a) {
    return a.trim().split(/\s+/g);
  }
  function r(a, b, c) {
    if (a.indexOf && !c) return a.indexOf(b);
    for (var d = 0; d < a.length; ) {
      if ((c && a[d][c] == b) || (!c && a[d] === b)) return d;
      d++;
    }
    return -1;
  }
  function s(a) {
    return Array.prototype.slice.call(a, 0);
  }
  function t(a, b, c) {
    for (var d = [], e = [], f = 0; f < a.length; ) {
      var g = b ? a[f][b] : a[f];
      r(e, g) < 0 && d.push(a[f]), (e[f] = g), f++;
    }
    return (
      c &&
        (d = b
          ? d.sort(function(a, c) {
              return a[b] > c[b];
            })
          : d.sort()),
      d
    );
  }
  function u(a, b) {
    for (var c, e, f = b[0].toUpperCase() + b.slice(1), g = 0; g < ma.length; ) {
      if (((c = ma[g]), (e = c ? c + f : b), e in a)) return e;
      g++;
    }
    return d;
  }
  function v() {
    return ua++;
  }
  function w(b) {
    var c = b.ownerDocument || b;
    return c.defaultView || c.parentWindow || a;
  }
  function x(a, b) {
    var c = this;
    (this.manager = a),
      (this.callback = b),
      (this.element = a.element),
      (this.target = a.options.inputTarget),
      (this.domHandler = function(b) {
        k(a.options.enable, [a]) && c.handler(b);
      }),
      this.init();
  }
  function y(a) {
    var b,
      c = a.options.inputClass;
    return new (b = c ? c : xa ? M : ya ? P : wa ? R : L)(a, z);
  }
  function z(a, b, c) {
    var d = c.pointers.length,
      e = c.changedPointers.length,
      f = b & Ea && d - e === 0,
      g = b & (Ga | Ha) && d - e === 0;
    (c.isFirst = !!f), (c.isFinal = !!g), f && (a.session = {}), (c.eventType = b), A(a, c), a.emit("hammer.input", c), a.recognize(c), (a.session.prevInput = c);
  }
  function A(a, b) {
    var c = a.session,
      d = b.pointers,
      e = d.length;
    c.firstInput || (c.firstInput = D(b)), e > 1 && !c.firstMultiple ? (c.firstMultiple = D(b)) : 1 === e && (c.firstMultiple = !1);
    var f = c.firstInput,
      g = c.firstMultiple,
      h = g ? g.center : f.center,
      i = (b.center = E(d));
    (b.timeStamp = ra()), (b.deltaTime = b.timeStamp - f.timeStamp), (b.angle = I(h, i)), (b.distance = H(h, i)), B(c, b), (b.offsetDirection = G(b.deltaX, b.deltaY));
    var j = F(b.deltaTime, b.deltaX, b.deltaY);
    (b.overallVelocityX = j.x),
      (b.overallVelocityY = j.y),
      (b.overallVelocity = qa(j.x) > qa(j.y) ? j.x : j.y),
      (b.scale = g ? K(g.pointers, d) : 1),
      (b.rotation = g ? J(g.pointers, d) : 0),
      (b.maxPointers = c.prevInput ? (b.pointers.length > c.prevInput.maxPointers ? b.pointers.length : c.prevInput.maxPointers) : b.pointers.length),
      C(c, b);
    var k = a.element;
    o(b.srcEvent.target, k) && (k = b.srcEvent.target), (b.target = k);
  }
  function B(a, b) {
    var c = b.center,
      d = a.offsetDelta || {},
      e = a.prevDelta || {},
      f = a.prevInput || {};
    (b.eventType !== Ea && f.eventType !== Ga) || ((e = a.prevDelta = { x: f.deltaX || 0, y: f.deltaY || 0 }), (d = a.offsetDelta = { x: c.x, y: c.y })),
      (b.deltaX = e.x + (c.x - d.x)),
      (b.deltaY = e.y + (c.y - d.y));
  }
  function C(a, b) {
    var c,
      e,
      f,
      g,
      h = a.lastInterval || b,
      i = b.timeStamp - h.timeStamp;
    if (b.eventType != Ha && (i > Da || h.velocity === d)) {
      var j = b.deltaX - h.deltaX,
        k = b.deltaY - h.deltaY,
        l = F(i, j, k);
      (e = l.x), (f = l.y), (c = qa(l.x) > qa(l.y) ? l.x : l.y), (g = G(j, k)), (a.lastInterval = b);
    } else (c = h.velocity), (e = h.velocityX), (f = h.velocityY), (g = h.direction);
    (b.velocity = c), (b.velocityX = e), (b.velocityY = f), (b.direction = g);
  }
  function D(a) {
    for (var b = [], c = 0; c < a.pointers.length; ) (b[c] = { clientX: pa(a.pointers[c].clientX), clientY: pa(a.pointers[c].clientY) }), c++;
    return { timeStamp: ra(), pointers: b, center: E(b), deltaX: a.deltaX, deltaY: a.deltaY };
  }
  function E(a) {
    var b = a.length;
    if (1 === b) return { x: pa(a[0].clientX), y: pa(a[0].clientY) };
    for (var c = 0, d = 0, e = 0; b > e; ) (c += a[e].clientX), (d += a[e].clientY), e++;
    return { x: pa(c / b), y: pa(d / b) };
  }
  function F(a, b, c) {
    return { x: b / a || 0, y: c / a || 0 };
  }
  function G(a, b) {
    return a === b ? Ia : qa(a) >= qa(b) ? (0 > a ? Ja : Ka) : 0 > b ? La : Ma;
  }
  function H(a, b, c) {
    c || (c = Qa);
    var d = b[c[0]] - a[c[0]],
      e = b[c[1]] - a[c[1]];
    return Math.sqrt(d * d + e * e);
  }
  function I(a, b, c) {
    c || (c = Qa);
    var d = b[c[0]] - a[c[0]],
      e = b[c[1]] - a[c[1]];
    return (180 * Math.atan2(e, d)) / Math.PI;
  }
  function J(a, b) {
    return I(b[1], b[0], Ra) + I(a[1], a[0], Ra);
  }
  function K(a, b) {
    return H(b[0], b[1], Ra) / H(a[0], a[1], Ra);
  }
  function L() {
    (this.evEl = Ta), (this.evWin = Ua), (this.pressed = !1), x.apply(this, arguments);
  }
  function M() {
    (this.evEl = Xa), (this.evWin = Ya), x.apply(this, arguments), (this.store = this.manager.session.pointerEvents = []);
  }
  function N() {
    (this.evTarget = $a), (this.evWin = _a), (this.started = !1), x.apply(this, arguments);
  }
  function O(a, b) {
    var c = s(a.touches),
      d = s(a.changedTouches);
    return b & (Ga | Ha) && (c = t(c.concat(d), "identifier", !0)), [c, d];
  }
  function P() {
    (this.evTarget = bb), (this.targetIds = {}), x.apply(this, arguments);
  }
  function Q(a, b) {
    var c = s(a.touches),
      d = this.targetIds;
    if (b & (Ea | Fa) && 1 === c.length) return (d[c[0].identifier] = !0), [c, c];
    var e,
      f,
      g = s(a.changedTouches),
      h = [],
      i = this.target;
    if (
      ((f = c.filter(function(a) {
        return o(a.target, i);
      })),
      b === Ea)
    )
      for (e = 0; e < f.length; ) (d[f[e].identifier] = !0), e++;
    for (e = 0; e < g.length; ) d[g[e].identifier] && h.push(g[e]), b & (Ga | Ha) && delete d[g[e].identifier], e++;
    return h.length ? [t(f.concat(h), "identifier", !0), h] : void 0;
  }
  function R() {
    x.apply(this, arguments);
    var a = j(this.handler, this);
    (this.touch = new P(this.manager, a)), (this.mouse = new L(this.manager, a)), (this.primaryTouch = null), (this.lastTouches = []);
  }
  function S(a, b) {
    a & Ea ? ((this.primaryTouch = b.changedPointers[0].identifier), T.call(this, b)) : a & (Ga | Ha) && T.call(this, b);
  }
  function T(a) {
    var b = a.changedPointers[0];
    if (b.identifier === this.primaryTouch) {
      var c = { x: b.clientX, y: b.clientY };
      this.lastTouches.push(c);
      var d = this.lastTouches,
        e = function() {
          var a = d.indexOf(c);
          a > -1 && d.splice(a, 1);
        };
      setTimeout(e, cb);
    }
  }
  function U(a) {
    for (var b = a.srcEvent.clientX, c = a.srcEvent.clientY, d = 0; d < this.lastTouches.length; d++) {
      var e = this.lastTouches[d],
        f = Math.abs(b - e.x),
        g = Math.abs(c - e.y);
      if (db >= f && db >= g) return !0;
    }
    return !1;
  }
  function V(a, b) {
    (this.manager = a), this.set(b);
  }
  function W(a) {
    if (p(a, jb)) return jb;
    var b = p(a, kb),
      c = p(a, lb);
    return b && c ? jb : b || c ? (b ? kb : lb) : p(a, ib) ? ib : hb;
  }
  function X() {
    if (!fb) return !1;
    var b = {},
      c = a.CSS && a.CSS.supports;
    return (
      ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function(d) {
        b[d] = c ? a.CSS.supports("touch-action", d) : !0;
      }),
      b
    );
  }
  function Y(a) {
    (this.options = la({}, this.defaults, a || {})),
      (this.id = v()),
      (this.manager = null),
      (this.options.enable = l(this.options.enable, !0)),
      (this.state = nb),
      (this.simultaneous = {}),
      (this.requireFail = []);
  }
  function Z(a) {
    return a & sb ? "cancel" : a & qb ? "end" : a & pb ? "move" : a & ob ? "start" : "";
  }
  function $(a) {
    return a == Ma ? "down" : a == La ? "up" : a == Ja ? "left" : a == Ka ? "right" : "";
  }
  function _(a, b) {
    var c = b.manager;
    return c ? c.get(a) : a;
  }
  function aa() {
    Y.apply(this, arguments);
  }
  function ba() {
    aa.apply(this, arguments), (this.pX = null), (this.pY = null);
  }
  function ca() {
    aa.apply(this, arguments);
  }
  function da() {
    Y.apply(this, arguments), (this._timer = null), (this._input = null);
  }
  function ea() {
    aa.apply(this, arguments);
  }
  function fa() {
    aa.apply(this, arguments);
  }
  function ga() {
    Y.apply(this, arguments), (this.pTime = !1), (this.pCenter = !1), (this._timer = null), (this._input = null), (this.count = 0);
  }
  function ha(a, b) {
    return (b = b || {}), (b.recognizers = l(b.recognizers, ha.defaults.preset)), new ia(a, b);
  }
  function ia(a, b) {
    (this.options = la({}, ha.defaults, b || {})),
      (this.options.inputTarget = this.options.inputTarget || a),
      (this.handlers = {}),
      (this.session = {}),
      (this.recognizers = []),
      (this.oldCssProps = {}),
      (this.element = a),
      (this.input = y(this)),
      (this.touchAction = new V(this, this.options.touchAction)),
      ja(this, !0),
      g(
        this.options.recognizers,
        function(a) {
          var b = this.add(new a[0](a[1]));
          a[2] && b.recognizeWith(a[2]), a[3] && b.requireFailure(a[3]);
        },
        this
      );
  }
  function ja(a, b) {
    var c = a.element;
    if (c.style) {
      var d;
      g(a.options.cssProps, function(e, f) {
        (d = u(c.style, f)), b ? ((a.oldCssProps[d] = c.style[d]), (c.style[d] = e)) : (c.style[d] = a.oldCssProps[d] || "");
      }),
        b || (a.oldCssProps = {});
    }
  }
  function ka(a, c) {
    var d = b.createEvent("Event");
    d.initEvent(a, !0, !0), (d.gesture = c), c.target.dispatchEvent(d);
  }
  var la,
    ma = ["", "webkit", "Moz", "MS", "ms", "o"],
    na = b.createElement("div"),
    oa = "function",
    pa = Math.round,
    qa = Math.abs,
    ra = Date.now;
  la =
    "function" != typeof Object.assign
      ? function(a) {
          if (a === d || null === a) throw new TypeError("Cannot convert undefined or null to object");
          for (var b = Object(a), c = 1; c < arguments.length; c++) {
            var e = arguments[c];
            if (e !== d && null !== e) for (var f in e) e.hasOwnProperty(f) && (b[f] = e[f]);
          }
          return b;
        }
      : Object.assign;
  var sa = h(
      function(a, b, c) {
        for (var e = Object.keys(b), f = 0; f < e.length; ) (!c || (c && a[e[f]] === d)) && (a[e[f]] = b[e[f]]), f++;
        return a;
      },
      "extend",
      "Use `assign`."
    ),
    ta = h(
      function(a, b) {
        return sa(a, b, !0);
      },
      "merge",
      "Use `assign`."
    ),
    ua = 1,
    va = /mobile|tablet|ip(ad|hone|od)|android/i,
    wa = "ontouchstart" in a,
    xa = u(a, "PointerEvent") !== d,
    ya = wa && va.test(navigator.userAgent),
    za = "touch",
    Aa = "pen",
    Ba = "mouse",
    Ca = "kinect",
    Da = 25,
    Ea = 1,
    Fa = 2,
    Ga = 4,
    Ha = 8,
    Ia = 1,
    Ja = 2,
    Ka = 4,
    La = 8,
    Ma = 16,
    Na = Ja | Ka,
    Oa = La | Ma,
    Pa = Na | Oa,
    Qa = ["x", "y"],
    Ra = ["clientX", "clientY"];
  x.prototype = {
    handler: function() {},
    init: function() {
      this.evEl && m(this.element, this.evEl, this.domHandler), this.evTarget && m(this.target, this.evTarget, this.domHandler), this.evWin && m(w(this.element), this.evWin, this.domHandler);
    },
    destroy: function() {
      this.evEl && n(this.element, this.evEl, this.domHandler), this.evTarget && n(this.target, this.evTarget, this.domHandler), this.evWin && n(w(this.element), this.evWin, this.domHandler);
    }
  };
  var Sa = { mousedown: Ea, mousemove: Fa, mouseup: Ga },
    Ta = "mousedown",
    Ua = "mousemove mouseup";
  i(L, x, {
    handler: function(a) {
      var b = Sa[a.type];
      b & Ea && 0 === a.button && (this.pressed = !0),
        b & Fa && 1 !== a.which && (b = Ga),
        this.pressed && (b & Ga && (this.pressed = !1), this.callback(this.manager, b, { pointers: [a], changedPointers: [a], pointerType: Ba, srcEvent: a }));
    }
  });
  var Va = { pointerdown: Ea, pointermove: Fa, pointerup: Ga, pointercancel: Ha, pointerout: Ha },
    Wa = { 2: za, 3: Aa, 4: Ba, 5: Ca },
    Xa = "pointerdown",
    Ya = "pointermove pointerup pointercancel";
  a.MSPointerEvent && !a.PointerEvent && ((Xa = "MSPointerDown"), (Ya = "MSPointerMove MSPointerUp MSPointerCancel")),
    i(M, x, {
      handler: function(a) {
        var b = this.store,
          c = !1,
          d = a.type.toLowerCase().replace("ms", ""),
          e = Va[d],
          f = Wa[a.pointerType] || a.pointerType,
          g = f == za,
          h = r(b, a.pointerId, "pointerId");
        e & Ea && (0 === a.button || g) ? 0 > h && (b.push(a), (h = b.length - 1)) : e & (Ga | Ha) && (c = !0),
          0 > h || ((b[h] = a), this.callback(this.manager, e, { pointers: b, changedPointers: [a], pointerType: f, srcEvent: a }), c && b.splice(h, 1));
      }
    });
  var Za = { touchstart: Ea, touchmove: Fa, touchend: Ga, touchcancel: Ha },
    $a = "touchstart",
    _a = "touchstart touchmove touchend touchcancel";
  i(N, x, {
    handler: function(a) {
      var b = Za[a.type];
      if ((b === Ea && (this.started = !0), this.started)) {
        var c = O.call(this, a, b);
        b & (Ga | Ha) && c[0].length - c[1].length === 0 && (this.started = !1), this.callback(this.manager, b, { pointers: c[0], changedPointers: c[1], pointerType: za, srcEvent: a });
      }
    }
  });
  var ab = { touchstart: Ea, touchmove: Fa, touchend: Ga, touchcancel: Ha },
    bb = "touchstart touchmove touchend touchcancel";
  i(P, x, {
    handler: function(a) {
      var b = ab[a.type],
        c = Q.call(this, a, b);
      c && this.callback(this.manager, b, { pointers: c[0], changedPointers: c[1], pointerType: za, srcEvent: a });
    }
  });
  var cb = 2500,
    db = 25;
  i(R, x, {
    handler: function(a, b, c) {
      var d = c.pointerType == za,
        e = c.pointerType == Ba;
      if (!(e && c.sourceCapabilities && c.sourceCapabilities.firesTouchEvents)) {
        if (d) S.call(this, b, c);
        else if (e && U.call(this, c)) return;
        this.callback(a, b, c);
      }
    },
    destroy: function() {
      this.touch.destroy(), this.mouse.destroy();
    }
  });
  var eb = u(na.style, "touchAction"),
    fb = eb !== d,
    gb = "compute",
    hb = "auto",
    ib = "manipulation",
    jb = "none",
    kb = "pan-x",
    lb = "pan-y",
    mb = X();
  V.prototype = {
    set: function(a) {
      a == gb && (a = this.compute()), fb && this.manager.element.style && mb[a] && (this.manager.element.style[eb] = a), (this.actions = a.toLowerCase().trim());
    },
    update: function() {
      this.set(this.manager.options.touchAction);
    },
    compute: function() {
      var a = [];
      return (
        g(this.manager.recognizers, function(b) {
          k(b.options.enable, [b]) && (a = a.concat(b.getTouchAction()));
        }),
        W(a.join(" "))
      );
    },
    preventDefaults: function(a) {
      var b = a.srcEvent,
        c = a.offsetDirection;
      if (this.manager.session.prevented) return void b.preventDefault();
      var d = this.actions,
        e = p(d, jb) && !mb[jb],
        f = p(d, lb) && !mb[lb],
        g = p(d, kb) && !mb[kb];
      if (e) {
        var h = 1 === a.pointers.length,
          i = a.distance < 2,
          j = a.deltaTime < 250;
        if (h && i && j) return;
      }
      return g && f ? void 0 : e || (f && c & Na) || (g && c & Oa) ? this.preventSrc(b) : void 0;
    },
    preventSrc: function(a) {
      (this.manager.session.prevented = !0), a.preventDefault();
    }
  };
  var nb = 1,
    ob = 2,
    pb = 4,
    qb = 8,
    rb = qb,
    sb = 16,
    tb = 32;
  (Y.prototype = {
    defaults: {},
    set: function(a) {
      return la(this.options, a), this.manager && this.manager.touchAction.update(), this;
    },
    recognizeWith: function(a) {
      if (f(a, "recognizeWith", this)) return this;
      var b = this.simultaneous;
      return (a = _(a, this)), b[a.id] || ((b[a.id] = a), a.recognizeWith(this)), this;
    },
    dropRecognizeWith: function(a) {
      return f(a, "dropRecognizeWith", this) ? this : ((a = _(a, this)), delete this.simultaneous[a.id], this);
    },
    requireFailure: function(a) {
      if (f(a, "requireFailure", this)) return this;
      var b = this.requireFail;
      return (a = _(a, this)), -1 === r(b, a) && (b.push(a), a.requireFailure(this)), this;
    },
    dropRequireFailure: function(a) {
      if (f(a, "dropRequireFailure", this)) return this;
      a = _(a, this);
      var b = r(this.requireFail, a);
      return b > -1 && this.requireFail.splice(b, 1), this;
    },
    hasRequireFailures: function() {
      return this.requireFail.length > 0;
    },
    canRecognizeWith: function(a) {
      return !!this.simultaneous[a.id];
    },
    emit: function(a) {
      function b(b) {
        c.manager.emit(b, a);
      }
      var c = this,
        d = this.state;
      qb > d && b(c.options.event + Z(d)), b(c.options.event), a.additionalEvent && b(a.additionalEvent), d >= qb && b(c.options.event + Z(d));
    },
    tryEmit: function(a) {
      return this.canEmit() ? this.emit(a) : void (this.state = tb);
    },
    canEmit: function() {
      for (var a = 0; a < this.requireFail.length; ) {
        if (!(this.requireFail[a].state & (tb | nb))) return !1;
        a++;
      }
      return !0;
    },
    recognize: function(a) {
      var b = la({}, a);
      return k(this.options.enable, [this, b])
        ? (this.state & (rb | sb | tb) && (this.state = nb), (this.state = this.process(b)), void (this.state & (ob | pb | qb | sb) && this.tryEmit(b)))
        : (this.reset(), void (this.state = tb));
    },
    process: function(a) {},
    getTouchAction: function() {},
    reset: function() {}
  }),
    i(aa, Y, {
      defaults: { pointers: 1 },
      attrTest: function(a) {
        var b = this.options.pointers;
        return 0 === b || a.pointers.length === b;
      },
      process: function(a) {
        var b = this.state,
          c = a.eventType,
          d = b & (ob | pb),
          e = this.attrTest(a);
        return d && (c & Ha || !e) ? b | sb : d || e ? (c & Ga ? b | qb : b & ob ? b | pb : ob) : tb;
      }
    }),
    i(ba, aa, {
      defaults: { event: "pan", threshold: 10, pointers: 1, direction: Pa },
      getTouchAction: function() {
        var a = this.options.direction,
          b = [];
        return a & Na && b.push(lb), a & Oa && b.push(kb), b;
      },
      directionTest: function(a) {
        var b = this.options,
          c = !0,
          d = a.distance,
          e = a.direction,
          f = a.deltaX,
          g = a.deltaY;
        return (
          e & b.direction ||
            (b.direction & Na
              ? ((e = 0 === f ? Ia : 0 > f ? Ja : Ka), (c = f != this.pX), (d = Math.abs(a.deltaX)))
              : ((e = 0 === g ? Ia : 0 > g ? La : Ma), (c = g != this.pY), (d = Math.abs(a.deltaY)))),
          (a.direction = e),
          c && d > b.threshold && e & b.direction
        );
      },
      attrTest: function(a) {
        return aa.prototype.attrTest.call(this, a) && (this.state & ob || (!(this.state & ob) && this.directionTest(a)));
      },
      emit: function(a) {
        (this.pX = a.deltaX), (this.pY = a.deltaY);
        var b = $(a.direction);
        b && (a.additionalEvent = this.options.event + b), this._super.emit.call(this, a);
      }
    }),
    i(ca, aa, {
      defaults: { event: "pinch", threshold: 0, pointers: 2 },
      getTouchAction: function() {
        return [jb];
      },
      attrTest: function(a) {
        return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & ob);
      },
      emit: function(a) {
        if (1 !== a.scale) {
          var b = a.scale < 1 ? "in" : "out";
          a.additionalEvent = this.options.event + b;
        }
        this._super.emit.call(this, a);
      }
    }),
    i(da, Y, {
      defaults: { event: "press", pointers: 1, time: 251, threshold: 9 },
      getTouchAction: function() {
        return [hb];
      },
      process: function(a) {
        var b = this.options,
          c = a.pointers.length === b.pointers,
          d = a.distance < b.threshold,
          f = a.deltaTime > b.time;
        if (((this._input = a), !d || !c || (a.eventType & (Ga | Ha) && !f))) this.reset();
        else if (a.eventType & Ea)
          this.reset(),
            (this._timer = e(
              function() {
                (this.state = rb), this.tryEmit();
              },
              b.time,
              this
            ));
        else if (a.eventType & Ga) return rb;
        return tb;
      },
      reset: function() {
        clearTimeout(this._timer);
      },
      emit: function(a) {
        this.state === rb && (a && a.eventType & Ga ? this.manager.emit(this.options.event + "up", a) : ((this._input.timeStamp = ra()), this.manager.emit(this.options.event, this._input)));
      }
    }),
    i(ea, aa, {
      defaults: { event: "rotate", threshold: 0, pointers: 2 },
      getTouchAction: function() {
        return [jb];
      },
      attrTest: function(a) {
        return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & ob);
      }
    }),
    i(fa, aa, {
      defaults: { event: "swipe", threshold: 10, velocity: 0.3, direction: Na | Oa, pointers: 1 },
      getTouchAction: function() {
        return ba.prototype.getTouchAction.call(this);
      },
      attrTest: function(a) {
        var b,
          c = this.options.direction;
        return (
          c & (Na | Oa) ? (b = a.overallVelocity) : c & Na ? (b = a.overallVelocityX) : c & Oa && (b = a.overallVelocityY),
          this._super.attrTest.call(this, a) &&
            c & a.offsetDirection &&
            a.distance > this.options.threshold &&
            a.maxPointers == this.options.pointers &&
            qa(b) > this.options.velocity &&
            a.eventType & Ga
        );
      },
      emit: function(a) {
        var b = $(a.offsetDirection);
        b && this.manager.emit(this.options.event + b, a), this.manager.emit(this.options.event, a);
      }
    }),
    i(ga, Y, {
      defaults: { event: "tap", pointers: 1, taps: 1, interval: 300, time: 250, threshold: 9, posThreshold: 10 },
      getTouchAction: function() {
        return [ib];
      },
      process: function(a) {
        var b = this.options,
          c = a.pointers.length === b.pointers,
          d = a.distance < b.threshold,
          f = a.deltaTime < b.time;
        if ((this.reset(), a.eventType & Ea && 0 === this.count)) return this.failTimeout();
        if (d && f && c) {
          if (a.eventType != Ga) return this.failTimeout();
          var g = this.pTime ? a.timeStamp - this.pTime < b.interval : !0,
            h = !this.pCenter || H(this.pCenter, a.center) < b.posThreshold;
          (this.pTime = a.timeStamp), (this.pCenter = a.center), h && g ? (this.count += 1) : (this.count = 1), (this._input = a);
          var i = this.count % b.taps;
          if (0 === i)
            return this.hasRequireFailures()
              ? ((this._timer = e(
                  function() {
                    (this.state = rb), this.tryEmit();
                  },
                  b.interval,
                  this
                )),
                ob)
              : rb;
        }
        return tb;
      },
      failTimeout: function() {
        return (
          (this._timer = e(
            function() {
              this.state = tb;
            },
            this.options.interval,
            this
          )),
          tb
        );
      },
      reset: function() {
        clearTimeout(this._timer);
      },
      emit: function() {
        this.state == rb && ((this._input.tapCount = this.count), this.manager.emit(this.options.event, this._input));
      }
    }),
    (ha.VERSION = "2.0.8"),
    (ha.defaults = {
      domEvents: !1,
      touchAction: gb,
      enable: !0,
      inputTarget: null,
      inputClass: null,
      preset: [[ea, { enable: !1 }], [ca, { enable: !1 }, ["rotate"]], [fa, { direction: Na }], [ba, { direction: Na }, ["swipe"]], [ga], [ga, { event: "doubletap", taps: 2 }, ["tap"]], [da]],
      cssProps: { userSelect: "none", touchSelect: "none", touchCallout: "none", contentZooming: "none", userDrag: "none", tapHighlightColor: "rgba(0,0,0,0)" }
    });
  var ub = 1,
    vb = 2;
  (ia.prototype = {
    set: function(a) {
      return la(this.options, a), a.touchAction && this.touchAction.update(), a.inputTarget && (this.input.destroy(), (this.input.target = a.inputTarget), this.input.init()), this;
    },
    stop: function(a) {
      this.session.stopped = a ? vb : ub;
    },
    recognize: function(a) {
      var b = this.session;
      if (!b.stopped) {
        this.touchAction.preventDefaults(a);
        var c,
          d = this.recognizers,
          e = b.curRecognizer;
        (!e || (e && e.state & rb)) && (e = b.curRecognizer = null);
        for (var f = 0; f < d.length; )
          (c = d[f]), b.stopped === vb || (e && c != e && !c.canRecognizeWith(e)) ? c.reset() : c.recognize(a), !e && c.state & (ob | pb | qb) && (e = b.curRecognizer = c), f++;
      }
    },
    get: function(a) {
      if (a instanceof Y) return a;
      for (var b = this.recognizers, c = 0; c < b.length; c++) if (b[c].options.event == a) return b[c];
      return null;
    },
    add: function(a) {
      if (f(a, "add", this)) return this;
      var b = this.get(a.options.event);
      return b && this.remove(b), this.recognizers.push(a), (a.manager = this), this.touchAction.update(), a;
    },
    remove: function(a) {
      if (f(a, "remove", this)) return this;
      if ((a = this.get(a))) {
        var b = this.recognizers,
          c = r(b, a);
        -1 !== c && (b.splice(c, 1), this.touchAction.update());
      }
      return this;
    },
    on: function(a, b) {
      if (a !== d && b !== d) {
        var c = this.handlers;
        return (
          g(q(a), function(a) {
            (c[a] = c[a] || []), c[a].push(b);
          }),
          this
        );
      }
    },
    off: function(a, b) {
      if (a !== d) {
        var c = this.handlers;
        return (
          g(q(a), function(a) {
            b ? c[a] && c[a].splice(r(c[a], b), 1) : delete c[a];
          }),
          this
        );
      }
    },
    emit: function(a, b) {
      this.options.domEvents && ka(a, b);
      var c = this.handlers[a] && this.handlers[a].slice();
      if (c && c.length) {
        (b.type = a),
          (b.preventDefault = function() {
            b.srcEvent.preventDefault();
          });
        for (var d = 0; d < c.length; ) c[d](b), d++;
      }
    },
    destroy: function() {
      this.element && ja(this, !1), (this.handlers = {}), (this.session = {}), this.input.destroy(), (this.element = null);
    }
  }),
    la(ha, {
      INPUT_START: Ea,
      INPUT_MOVE: Fa,
      INPUT_END: Ga,
      INPUT_CANCEL: Ha,
      STATE_POSSIBLE: nb,
      STATE_BEGAN: ob,
      STATE_CHANGED: pb,
      STATE_ENDED: qb,
      STATE_RECOGNIZED: rb,
      STATE_CANCELLED: sb,
      STATE_FAILED: tb,
      DIRECTION_NONE: Ia,
      DIRECTION_LEFT: Ja,
      DIRECTION_RIGHT: Ka,
      DIRECTION_UP: La,
      DIRECTION_DOWN: Ma,
      DIRECTION_HORIZONTAL: Na,
      DIRECTION_VERTICAL: Oa,
      DIRECTION_ALL: Pa,
      Manager: ia,
      Input: x,
      TouchAction: V,
      TouchInput: P,
      MouseInput: L,
      PointerEventInput: M,
      TouchMouseInput: R,
      SingleTouchInput: N,
      Recognizer: Y,
      AttrRecognizer: aa,
      Tap: ga,
      Pan: ba,
      Swipe: fa,
      Pinch: ca,
      Rotate: ea,
      Press: da,
      on: m,
      off: n,
      each: g,
      merge: ta,
      extend: sa,
      assign: la,
      inherit: i,
      bindFn: j,
      prefixed: u
    });
  var wb = "undefined" != typeof a ? a : "undefined" != typeof self ? self : {};
  (wb.Hammer = ha),
    "function" == typeof define && define.amd
      ? define(function() {
          return ha;
        })
      : "undefined" != typeof module && module.exports
      ? (module.exports = ha)
      : (a[c] = ha);
})(window, document, "Hammer");
var componentsSlider = $(".slider").slick({ infinite: !0, slidesToScroll: 1, autoplaySpeed: 4000, autoplay: !0, dots: !0 });
("use strict");
var favSpeed = 500;
var favImgs = ["img/favicon1.png", "img/favicon2.png"],
  favCounter = 0;
setInterval(function() {
  $("link[rel='icon']").remove();
  $("link[rel='shortcut icon']").remove();
  $("head").append('<link rel="icon" href="' + favImgs[favCounter] + '" type="image/gif">');
  if (favCounter == favImgs.length - 1) favCounter = 0;
  else favCounter++;
}, favSpeed);
var countdown = document.getElementsByClassName("js-countdown");
if (countdown.length !== 0) {
  var countLength = countdown.length;
  var number = 83;
  var order = 2;
  var numberStr = String(number);
  var minProdCount = 1;
  var maxProdCount = 5;
  var minTimer = 10000,
    maxTimer = 50000;
  if (!isNaN(parseInt(countdown[0].innerText)) && parseInt(countdown[0].innerText) > 5) {
    number = countdown[0].innerText.trim();
  }
  if (isStorage()) {
    var lastNumber = parseInt(localStorage.getItem("lastNumber"));
    if (!isNaN(lastNumber)) {
      number = lastNumber;
    }
  }
  updateCounters();
  var timer = setInterval(doCountdown, getRandomInt(minTimer, maxTimer));
} else {
  console.warn('You have to add "js-countdown" class for any DOM element');
}
function prettyNumber(num, order) {
  var numStr = num.toString();
  while (numStr.length < order) {
    numStr = "0" + numStr;
  }
  return numStr;
}
function updateCounters() {
  while (countLength) {
    var countDigits = countdown[countLength - 1].querySelectorAll(".js-count-digit");
    var countDigitsLength = countDigits.length;
    var isAfterZeros = !1;
    if (countDigitsLength === 0) {
      numberStr = prettyNumber(number, 2);
      countdown[countLength - 1].innerText = numberStr;
    } else {
      numberStr = prettyNumber(number, countDigitsLength);
      for (var i = 0; i < countDigitsLength; i++) {
        if (!isAfterZeros) {
          var classes = countDigits[i].className.split(" ");
          if (+numberStr[i] == 0) {
            if (classes.indexOf("passive") == -1) {
              countDigits[i].className += " passive";
            }
          } else {
            isAfterZeros = !0;
          }
        }
        countDigits[i].innerText = numberStr[i];
      }
    }
    countLength--;
  }
  if (isStorage()) {
    localStorage.setItem("lastNumber", numberStr);
  }
}
function doCountdown() {
  countLength = countdown.length;
  if (number > 5) {
    number -= getRandomInt(minProdCount, maxProdCount);
  } else {
    clearInterval(timer);
    return 5;
  }
  updateCounters();
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function isStorage() {
  if (window.localStorage !== undefined) {
    return !0;
  } else {
    return !1;
  }
}
function Count(element, minStep, maxStep, speed) {
  this.count = element;
  this.countVal = 0;
  this.maxVal = parseInt(element.innerHTML);
  this.minStep = minStep;
  this.maxStep = maxStep;
  this.speed = speed || 100;
  this.interval;
  this._setVal(this.countVal);
  return this;
}
Count.prototype._setVal = function(val) {
  this.count.innerHTML = val + "%";
};
Count.prototype._getOffsetTop = function(elem) {
  var box = elem.getBoundingClientRect(),
    body = document.body,
    docEl = document.documentElement,
    scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  clientTop = docEl.clientTop || body.clientTop || 0;
  var top = box.top + scrollTop - clientTop,
    bottom = top + elem.offsetHeight;
  return { top: top, bottom: bottom };
};
Count.prototype.startCount = function() {
  var _this = this;
  clearInterval(_this.interval);
  _this.interval = setInterval(function() {
    _this.countVal += Math.floor(Math.random() * (_this.maxStep - _this.minStep)) + _this.minStep;
    if (_this.countVal >= _this.maxVal) {
      _this.countVal = _this.maxVal;
      clearInterval(_this.interval);
    }
    _this._setVal(_this.countVal);
  }, _this.speed);
  return _this;
};
Count.prototype.restartCount = function() {
  var _this = this;
  clearInterval(_this.interval);
  _this.countVal = 0;
  _this._setVal(_this.countVal);
  return _this;
};
$(document).ready(function() {
  var navbar = $(".navbar"),
    jsNavbarPoint = $(".js-button"),
    windowHeigth,
    jsNavbarShowTop,
    jsNavbarShowBottom,
    animateItems = $(".js-animation"),
    percents = [];
  animateItems.each(function() {
    percents.push(new Count(this.querySelector(".js-percent"), 1, 5, 30));
  });
  function detectSize() {
    windowHeigth = window.innerHeight;
    jsNavbarShowTop = jsNavbarPoint.offset().top + jsNavbarPoint.innerHeight();
    jsNavbarShowBottom = jsNavbarPoint.eq(1).offset().top;
  }
  function hideMenu() {
    navbar.removeClass("fixed");
  }
  function showMenu() {
    navbar.addClass("fixed");
  }
  function animateScroll(element, speed) {
    $("html, body").animate({ scrollTop: element.offset().top }, speed);
  }
  detectSize();
  $(window).on("resize", function() {
    detectSize();
  });
  $(".js-to-form").on("click", function() {
    noScroll.off();
    $(".js-scroll-animation img:last-of-type").css("opacity", 0);
    var scrolledTop = $(window).scrollTop(),
      docHeight = $(document).outerHeight(!0);
    id = $(this).attr("href") + 2;
    hideMenu();
    animateScroll($(id), 900);
  });
  $(window).on("scroll", function() {
    var scrolledTop = $(window).scrollTop(),
      scrolledBottom = scrolledTop + windowHeigth;
    if (scrolledTop >= jsNavbarShowTop) {
      if (scrolledBottom >= jsNavbarShowBottom) {
        hideMenu();
      } else {
        showMenu();
      }
    } else {
      hideMenu();
    }
    animateItems.each(function(index) {
      var offsetTop = $(this).offset().top,
        offsetBottom = offsetTop + $(this).innerHeight();
      if (scrolledBottom > offsetTop && scrolledTop < offsetBottom) {
        $(this).addClass("is-animated");
        percents[index].startCount();
      } else {
        $(this).removeClass("is-animated");
        percents[index].restartCount();
      }
    });
  });
  $(".js-open-answer").click(function() {
    $(this)
      .closest(".question-wrap")
      .find(".answer")
      .slideToggle("slow");
  });
});
