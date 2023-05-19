import '../css/main.css'
import './matter.min.js'
import './matter-wrap.min.js'
import './matter-collision-events.min.js'

Matter.use(MatterWrap);
Matter.use('matter-collision-events')
let chooseTimer = setTimeout(0)
const tvScreen = document.getElementById('screen-on')
const hoveredStrip = {elem: document.getElementsByClassName('hover'), state: true};
let tvOff = setTimeout(turnOff, 0)
function turnOff(){
  tvScreen.parentElement.classList.add('off')
}           
var t,
  e = {},
  n =
    ((e.width = window.innerWidth), //elements size for understandable reasons
    (e.height = window.innerHeight),
    (e.centerX = e.width / 2), //elements spawn offset
    (e.centerY = e.height / 2),
    (e.offsetX = e.width / 2),
    (e.offsetY = e.height / 2),
    Matter.Engine),
  i = Matter.Render,
  o = Matter.Runner,
  r = (Matter.Common, Matter.World),
  a = Matter.Bodies,
  bd = Matter.Body,
  s = (Matter.Body, Matter.Events),
  d = Matter.Query,
  c = Matter.MouseConstraint,
  l = Matter.Mouse,
  n = n.create(),
  h = n.world,
  u = i.create({
    engine: n,
    element: document.getElementById("debug"),
    options: {
      width: window.innerWidth, //size where canvas exists and you can interact with the elements
      height: window.innerHeight,
      background: "transparent",
      wireframeBackground: "transparent",
      hasBounds: !0,
      enabled: !0,
      wireframes: !0,
      showSleeping: !0,
      showDebug: 1,
      showBroadphase: !0,
      showBounds: !0,
      showVelocity: !0,
      showCollisions: !0,
      showAxes: !1,
      showPositions: !0,
      showAngleIndicator: !0,
      showIds: !0,
      showShadows: !1,
    },
  }),
  i = (i.run(u), o.create()),
  o = (o.run(i, n), { isStatic: !0, restitution: 0.8, friction: 1 }),
  
  f =(document.querySelectorAll(".matter-body")),
  m = [],
  w = [],
  g = 0;
function makeWorld() {
  document.getElementsByTagName("main")[0].style.visibility = "visible";
  let y = 0;
  for (y = f.length; g < y; g++) {
    f[g].classList.contains("strip")
      ? (t = a.rectangle(
          e.centerX + Math.floor((Math.random() * e.width) / 2) - e.width / 4,
          e.centerY + Math.floor((Math.random() * e.height) / 2) - e.height / 4,
          (e.width * f[g].offsetWidth) / window.innerWidth,
          (e.height * f[g].offsetHeight) / window.innerHeight,
          {
            restitution: 0.63,
            friction: 0,

            frictionAir: 0.001,
            frictionStatic: 0,
            density: 1,
            chamfer: { radius: 24 },
            angle: 2 * Math.random() - 1,
            plugin: {
              wrap: {
                min: {
                  x: 5,
                  y: 5
                },
                max: {
                  x: window.innerWidth-10,
                  y: window.innerHeight-10
                }
              }
            }
          }
        ) )
      : f[g].classList.contains("page-nav")
      ? (t = a.rectangle(
          e.centerX + Math.floor((Math.random() * e.width) / 2) - e.width / 4,
          e.centerY + Math.floor((Math.random() * e.height) / 2) - e.height / 4,
          (e.width * f[g].offsetWidth) / window.innerWidth,
          (e.width * f[g].offsetWidth) / window.innerWidth,
          {
            restitution: 0.5,
            friction: 0,
            frictionAir: 0.001,
            frictionStatic: 0,
            density: 1,
            chamfer: { radius: 24 },
            angle: 2 * Math.random() - 1,
            plugin: {
              wrap: {
                min: {
                  x: 0,
                  y: 0
                },
                max: {
                  x: window.innerWidth,
                  y: window.innerHeight
                }
              }
            }
          }
        ))
      : f[g].classList.contains('tv') 
      ? (t = a.rectangle(
        e.centerX + Math.floor((Math.random() * e.width) / 2) - e.width / 4,
        e.centerY + Math.floor((Math.random() * e.height) / 2) - e.height / 4,
        (e.width * f[g].offsetWidth) / window.innerWidth,
        (e.height * f[g].offsetHeight) / window.innerHeight,
        {
          restitution: 0.6,
          friction: 0,
          frictionAir: 0.05,
          frictionStatic: 0,
          density: 7.5,
          angle: 2 * Math.random() - 1,
          plugin: {
            wrap: {
              min: {
                x: 0,
                y: 0
              },
              max: {
                x: window.innerWidth,
                y: window.innerHeight
              }
            }
          }
        }
      ) )
      : f[g].classList.contains("disturber") &&
        ((t = a.circle(
          e.centerX + Math.floor((Math.random() * e.width) / 2) - e.width / 4,
          e.centerY + Math.floor((Math.random() * e.width) / 2) - e.width / 4,
          16,
          {
            restitution: 0.5,
            friction: 0,
            frictionAir: 0,
            frictionStatic: 0,
            density: 1,
            angle: 0,
          }
        )),
        w.push(t)),
      (f[g].id = t.id),
      m.push(t);
  }
  r.add(n.world, m), (n.world.gravity.y = 0);
  var M,
    p,
    b,
    v,
    W,
    B,
    i = l.create(u.canvas),
    h = c.create(n, {
      mouse: i,
      constraint: { stiffness: 1, render: { visible: !1 } },
    });
  function T() {
    for (
      var t = document.getElementsByClassName("hover"), e = 0;
      e < t.length;
      e++
    ){
      t[e].classList.remove("hover");
    }
    document.body.style.cursor = "auto";
  }
  r.add(n.world, h),
    (u.mouse = i),
    s.on(h, "mousemove", function (t) {
      (M = t.mouse.absolute.x),
        (p = t.mouse.absolute.y),
        d.point(m, { x: M, y: p }).length       //*events that happen when body is hovered
          ? (T(),
            (t = d.point(m, { x: M, y: p })[0].id),
            (document.getElementById(t).className += " hover"), //*adding hover class 
            (document.body.style.cursor = "pointer"))
          : T();
          const elem = hoveredStrip.elem[0]
          if (elem && hoveredStrip.state && (elem.id !== tvScreen.parentNode.id)){
            clearTimeout(tvOff);
            hoveredStrip.state = false;
            tvScreen.style.backgroundImage = `url(${elem.dataset.img})`
            tvScreen.parentElement.classList.remove('off')
          } else if (!elem && !hoveredStrip.state){
            hoveredStrip.state = true
            tvOff = setTimeout(turnOff, 300)
          }
    }),
    s.on(h, "mousedown", function (t) {
      (b = t.mouse.absolute.x), (v = t.mouse.absolute.y);
    }),
    s.on(h, "mouseup", function (t) {
      var e, n;
      (W = t.mouse.absolute.x),
        (B = t.mouse.absolute.y),
        b == W &&
          v == B &&
          (d.point(m, { x: W, y: B }).length &&
            ((e = d.point(m, { x: W, y: B })[0].id),
            (n = document.getElementById(e).getAttribute("data-url"))),
          e) &&
          null != n &&
          (window.location.href = n),
        T();
    }),
    window.requestAnimationFrame(function t() {
      for (var e = 0, n = w.length; e < n; e++)
        (w[e].force.y += 2 * Math.round(Math.random()) - 1),
          (w[e].force.x += 2 * Math.round(Math.random()) - 1);
      for (e = 0, n = f.length; e < n; e++) {
        for (var i = f[e], o = null, r = 0, a = m.length; r < a; r++)
          if (m[r].id == i.id) {
            o = m[r];
            break;
          }
        null !== o &&
          ((i.style.transform =
            "translate( " +
            (o.position.x - i.offsetWidth / 2) +
            "px, " +
            (o.position.y - i.offsetHeight / 2) +
            "px )"),
          (i.style.transform += "rotate( " + o.angle + "rad )"));
      }
      window.requestAnimationFrame(t);
    });
  var x = document.querySelector("#toggle-debug");
  let aniOn;
  let aniOff;
  let waitOff;
  let waitAniOff;
  x.onclick = function () {
    x.classList.contains("on")
      ? ((x.className = "off"),
        clearTimeout(waitAniOff),
        clearTimeout(waitOff),
        (aniOff = setTimeout(function () {
          (document.getElementById("debug").style.opacity = 0),
            clearTimeout(aniOff);
        }, 1200)))
      : ((x.className = "on"),
        (aniOn = setTimeout(function () {
          (document.getElementById("debug").style.opacity = 1),
            clearTimeout(aniOn);
        }, 800)),
        (waitAniOff = setTimeout(function () {
          (x.className = "off"), clearTimeout(waitAniOff);
        }, 38000)),
        (waitOff = setTimeout(function () {
          (document.getElementById("debug").style.opacity = 0),
            clearTimeout(waitOff);
        }, 222222)));   //! fix timing for debug//
  };
}
function debounce(n, i, o) {
    var r;
    return function () {
        var t = this,
          e = arguments;
        clearTimeout(r),
          (r = setTimeout(function () {
              (r = null), o || n.apply(t, e);
      }, i)),
      o && !r && n.apply(t, e);
  };
}



const refreshWorld = debounce(function () {
    location.reload();
  }, 500);


  makeWorld();
console.dir(f)

for (let i = 0; i<f.length; i++){
  if (!f[i].classList.contains('tv')){
  m[i].onCollide(glow.bind(f[i]))
  m[i].onCollideActive(glow.bind(f[i]))}
}

function glow(){
  this.classList.add('show-glow')
  this.timeout = setTimeout(noGlow.bind(this), 600)
}

function noGlow(){
  this.classList.remove('show-glow')
}
document.getElementById('btn-reset').addEventListener('click', refreshWorld)
window.addEventListener("resize", refreshWorld);

//* unsuccessful try to make resizing better. 
// TODO this will have to save every objects rotation, then set to 0, scale correctly, set rotation back, hope nothing collides and explodes
// console.log(m[1])
// console.log(f[1])
// function updateCanvas() {
//   u.canvas.width = window.innerWidth;
//   u.canvas.height = window.innerHeight;
//   for (let i =1; i<2; i++){
//     const { min, max} = m[i].bounds;
//     const bodyW = max.x - min.x;
//     const bodyH = max.y - min.y;
//     const scaleX = bodyW/(window.innerWidth*0.15)
//     const scaleY = bodyH/(window.innerHeight * 0.8)
//     console.log(bodyH)
//     // console.log(window.innerHeight * 0.08)
//     // b.scale(m[i], scaleX, scaleY)
//   }
// }