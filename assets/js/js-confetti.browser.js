var JSConfetti = (function () {
  "use strict";
  function t(t, e) {
    if (!(t instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  function e(t, e) {
    for (var i = 0; i < e.length; i++) {
      var s = e[i];
      (s.enumerable = s.enumerable || !1),
        (s.configurable = !0),
        "value" in s && (s.writable = !0),
        Object.defineProperty(t, s.key, s);
    }
  }
  function i(t, i, s) {
    return i && e(t.prototype, i), s && e(t, s), t;
  }
  function s(t) {
    return +t.replace(/px/, "");
  }
  function n(t, e) {
    var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
      s = Math.random() * (e - t) + t;
    return Math.floor(s * Math.pow(10, i)) / Math.pow(10, i);
  }
  function o(t) {
    return t[n(0, t.length)];
  }
  var a = [
    "#fcf403",
    "#62fc03",
    "#f4fc03",
    "#03e7fc",
    "#03fca5",
    "#a503fc",
    "#fc03ad",
    "#fc03c2",
  ];
  function r(t) {
    return Math.log(t) / Math.log(1920);
  }
  var h = (function () {
    function e(i) {
      t(this, e);
      var s = i.initialPosition,
        a = i.direction,
        h = i.confettiRadius,
        c = i.confettiColors,
        u = i.emojis,
        l = i.emojiSize,
        d = i.canvasWidth,
        f = i.cover_images,
        m = n(0.9, 1.7, 3) * r(d);
      (this.confettiSpeed = { x: m, y: m }),
        (this.finalConfettiSpeedX = n(0.2, 0.6, 3)),
        (this.rotationSpeed = u.length ? 0.01 : n(0.03, 0.07, 3) * r(d)),
        (this.dragForceCoefficient = n(5e-4, 9e-4, 6)),
        (this.radius = { x: h, y: h }),
        (this.initialRadius = h),
        (this.rotationAngle = "left" === a ? n(0, 0.2, 3) : n(-0.2, 0, 3)),
        (this.emojiSize = l),
        (this.emojiRotationAngle = n(0, 2 * Math.PI)),
        (this.radiusYUpdateDirection = "down");
      var p =
        "left" === a
          ? (n(82, 15) * Math.PI) / 180
          : (n(-15, -82) * Math.PI) / 180;
      (this.absCos = Math.abs(Math.cos(p))),
        (this.absSin = Math.abs(Math.sin(p)));
      var v = n(-150, 0),
        g = {
          x: s.x + ("left" === a ? -v : v) * this.absCos,
          y: s.y - v * this.absSin,
        };
      (this.currentPosition = Object.assign({}, g)),
        (this.initialPosition = Object.assign({}, g)),
        (this.color = u.length > 0 ? null : o(c)),
        (this.emoji = u.length > 0 ? o(u) : null),
        (this.cover_image = f.length > 0 ? o(f) : null),
        (this.createdAt = new Date().getTime()),
        (this.direction = a);
    }
    return (
      i(e, [
        {
          key: "draw",
          value: function (t) {
            var e = this.currentPosition,
              i = this.radius,
              s = this.color,
              n = this.emoji,
              o = this.rotationAngle,
              a = this.emojiRotationAngle,
              r = this.emojiSize,
              h = this.cover_image,
              c = window.devicePixelRatio;
            if (h) {
              var u = [h.src, -h.src.width / 2, -h.src.height / 2];
              h.width && h.height && u.push(h.width, h.height),
                t.save(),
                t.translate(c * e.x, c * e.y),
                t.rotate((a - 45) * (Math.PI / 180)),
                t.drawImage.apply(t, u),
                t.restore();
            } else
              n
                ? ((t.font = "".concat(r, "px serif")),
                  t.save(),
                  t.translate(c * e.x, c * e.y),
                  t.rotate(a),
                  (t.textAlign = "center"),
                  t.fillText(n, 0, 0),
                  t.restore())
                : s &&
                  ((t.fillStyle = s),
                  t.beginPath(),
                  t.ellipse(
                    e.x * c,
                    e.y * c,
                    i.x * c,
                    i.y * c,
                    o,
                    0,
                    2 * Math.PI
                  ),
                  t.fill());
          },
        },
        {
          key: "updatePosition",
          value: function (t, e) {
            var i = this.confettiSpeed,
              s = this.dragForceCoefficient,
              n = this.finalConfettiSpeedX,
              o = this.radiusYUpdateDirection,
              a = this.rotationSpeed,
              r = this.createdAt,
              h = this.direction,
              c = e - r;
            i.x > n && (this.confettiSpeed.x -= s * t),
              (this.currentPosition.x +=
                i.x * ("left" === h ? -this.absCos : this.absCos) * t),
              (this.currentPosition.y =
                this.initialPosition.y -
                i.y * this.absSin * c +
                (0.00125 * Math.pow(c, 2)) / 2),
              (this.rotationSpeed -= this.emoji ? 1e-4 : 1e-5 * t),
              this.rotationSpeed < 0 && (this.rotationSpeed = 0),
              this.emoji || this.cover_image
                ? (this.emojiRotationAngle +=
                    (this.rotationSpeed * t) % (2 * Math.PI))
                : "down" === o
                ? ((this.radius.y -= t * a),
                  this.radius.y <= 0 &&
                    ((this.radius.y = 0), (this.radiusYUpdateDirection = "up")))
                : ((this.radius.y += t * a),
                  this.radius.y >= this.initialRadius &&
                    ((this.radius.y = this.initialRadius),
                    (this.radiusYUpdateDirection = "down")));
          },
        },
        {
          key: "getIsVisibleOnCanvas",
          value: function (t) {
            return this.currentPosition.y < t + 100;
          },
        },
      ]),
      e
    );
  })();
  function c() {
    var t = document.createElement("canvas");
    return (
      (t.style.position = "fixed"),
      (t.style.width = "100%"),
      (t.style.height = "100%"),
      (t.style.top = "0"),
      (t.style.left = "0"),
      (t.style.zIndex = "1000"),
      (t.style.pointerEvents = "none"),
      document.body.appendChild(t),
      t
    );
  }
  function u(t) {
    var e = t.confettiRadius,
      i = void 0 === e ? 6 : e,
      s = t.confettiNumber,
      n = void 0 === s ? t.confettiesNumber || (t.emojis ? 40 : 250) : s,
      o = t.confettiColors,
      r = void 0 === o ? a : o,
      h = t.emojis,
      c = void 0 === h ? t.emojies || [] : h,
      u = t.emojiSize,
      l = void 0 === u ? 80 : u,
      d = t.cover_images,
      f = void 0 === d ? t.cover_images || [] : d;
    return (
      t.emojies &&
        console.error(
          "emojies argument is deprecated, please use emojis instead"
        ),
      t.confettiesNumber &&
        console.error(
          "confettiesNumber argument is deprecated, please use confettiNumber instead"
        ),
      {
        confettiRadius: i,
        confettiNumber: n,
        confettiColors: r,
        emojis: c,
        emojiSize: l,
        images: f,
      }
    );
  }
  var l = (function () {
    function e(i) {
      var s = this;
      t(this, e),
        (this.canvasContext = i),
        (this.shapes = []),
        (this.promise = new Promise(function (t) {
          return (s.resolvePromise = t);
        }));
    }
    return (
      i(e, [
        {
          key: "getBatchCompletePromise",
          value: function () {
            return this.promise;
          },
        },
        {
          key: "addShapes",
          value: function () {
            var t;
            (t = this.shapes).push.apply(t, arguments);
          },
        },
        {
          key: "complete",
          value: function () {
            var t;
            return (
              !this.shapes.length &&
              (null === (t = this.resolvePromise) ||
                void 0 === t ||
                t.call(this),
              !0)
            );
          },
        },
        {
          key: "processShapes",
          value: function (t, e, i) {
            var s = this,
              n = t.timeDelta,
              o = t.currentTime;
            this.shapes = this.shapes.filter(function (t) {
              return (
                t.updatePosition(n, o),
                t.draw(s.canvasContext),
                !i || t.getIsVisibleOnCanvas(e)
              );
            });
          },
        },
      ]),
      e
    );
  })();
  return (function () {
    function e() {
      var i =
        arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      t(this, e),
        (this.activeConfettiBatches = []),
        (this.canvas = i.canvas || c()),
        (this.canvasContext = this.canvas.getContext("2d")),
        (this.requestAnimationFrameRequested = !1),
        (this.lastUpdated = new Date().getTime()),
        (this.iterationIndex = 0),
        (this.loop = this.loop.bind(this)),
        requestAnimationFrame(this.loop);
    }
    return (
      i(e, [
        {
          key: "loop",
          value: function () {
            var t, e, i, n, o;
            (this.requestAnimationFrameRequested = !1),
              (t = this.canvas),
              (e = window.devicePixelRatio),
              (i = getComputedStyle(t)),
              (n = s(i.getPropertyValue("width"))),
              (o = s(i.getPropertyValue("height"))),
              t.setAttribute("width", (n * e).toString()),
              t.setAttribute("height", (o * e).toString());
            var a = new Date().getTime(),
              r = a - this.lastUpdated,
              h = this.canvas.offsetHeight,
              c = this.iterationIndex % 10 == 0;
            (this.activeConfettiBatches = this.activeConfettiBatches.filter(
              function (t) {
                return (
                  t.processShapes({ timeDelta: r, currentTime: a }, h, c),
                  !c || !t.complete()
                );
              }
            )),
              this.iterationIndex++,
              this.queueAnimationFrameIfNeeded(a);
          },
        },
        {
          key: "queueAnimationFrameIfNeeded",
          value: function (t) {
            this.requestAnimationFrameRequested ||
              this.activeConfettiBatches.length < 1 ||
              ((this.requestAnimationFrameRequested = !0),
              (this.lastUpdated = t || new Date().getTime()),
              requestAnimationFrame(this.loop));
          },
        },
        {
          key: "addConfetti",
          value: function () {
            for (
              var t =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {},
                e = u(t),
                i = e.confettiRadius,
                s = e.confettiNumber,
                n = e.confettiColors,
                o = e.emojis,
                a = e.emojiSize,
                r = e.cover_images,
                c = this.canvas.getBoundingClientRect(),
                d = c.width,
                f = c.height,
                m = (5 * f) / 7,
                p = { x: 0, y: m },
                v = { x: d, y: m },
                g = new l(this.canvasContext),
                y = 0;
              y < s / 2;
              y++
            ) {
              var C = new h({
                  initialPosition: p,
                  direction: "right",
                  confettiRadius: i,
                  confettiColors: n,
                  confettiNumber: s,
                  emojis: o,
                  emojiSize: a,
                  canvasWidth: d,
                  images: r,
                }),
                b = new h({
                  initialPosition: v,
                  direction: "left",
                  confettiRadius: i,
                  confettiColors: n,
                  confettiNumber: s,
                  emojis: o,
                  emojiSize: a,
                  canvasWidth: d,
                  images: r,
                });
              g.addShapes(C, b);
            }
            return (
              this.activeConfettiBatches.push(g),
              this.queueAnimationFrameIfNeeded(),
              g.getBatchCompletePromise()
            );
          },
        },
      ]),
      e
    );
  })();
})();
