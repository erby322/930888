var zUp = 4;
var poppers = "";

function setDefaultLocal() {
  console.log("setting up for the first time...");
  var boxes = document.getElementsByClassName("box");
  for (i in boxes) localStorage.setItem(boxes[i].id, "closed");
  localStorage.setItem("about", "open");
  localStorage.setItem("updates", "open");
}

function vis(id) {
  box = document.getElementById(id);
  box.classList.toggle("closed");
  if (box.classList.contains("closed")) {
    var frames = document.getElementsByTagName("iframe");
    for (var i = 0; i < frames.length; i++) {
      if (box.contains(frames[i])) {
        frames[i].src = "";
      }
    }
    
  //  document.getElementsByClass("menu").style.pointerEvents = none;
  //figure this out later maybe. deactivate menu item when box is visible
  } else {
    box.style.zIndex = zUp;
    zUp++;
  }
  setVis(id);
}

function checkVis() {
  for (id in localStorage) {
    if (!localStorage.hasOwnProperty(id) || id == "undefined" || id.substring(0, 2) == "--") continue;
    console.log("checking "+id+"...");
    var checker = localStorage.getItem(id);
    var boxIsClosed = document.getElementById(id).classList.contains("closed");
    if (checker == "closed" && !boxIsClosed) document.getElementById(id).classList.toggle("closed");
    if (checker == "open" && boxIsClosed) document.getElementById(id).classList.toggle("closed");
  }
}

function checkPos() {
  for (id in localStorage) {
    if (id.substring(0, 2) == "--") {
      document.querySelector(":root").style.setProperty(id, localStorage.getItem(id));
    }
  }
}

function setVis(id) {
  if (localStorage.getItem(id) == "closed") {
    localStorage.setItem(id, "open");
    if (id == "clipBox") {
      document.getElementById("clipVisBox").innerHTML = "<img class='clipButts' src='clip uncheck.png'>"
    }
  } else {
    localStorage.setItem(id, "closed");
    if (id == "clipBox") {
      document.getElementById("clipVisBox").innerHTML = "<img class='clipButts' src='clip check.png'>"
    }
  }
  console.log("setVis for "+id+": "+localStorage.getItem(id));
}

function popout(id) {
  if (poppers != id) {
    var box = document.getElementById(id);
    console.log(id);
    var url = "";
    if (box.classList.contains("text")) {
      for (i in document.getElementsByClassName("popper")) {
        url = id+".txt";
        document.getElementsByClassName("popper")[i].innerHTML = "<a href='"+url+"' target='_blank'>&#8599;</a>";
      }
    } else {
      var frames = document.getElementsByTagName("iframe");
      for (var i = 0; i < frames.length; i++) {
        if (box.contains(frames[i])) {
          if (id == "splat") url = "https://mastodon.social/@splatoon";
          else url = frames[i].src;
          document.getElementsByClassName("popper")[i].innerHTML = "<a href='"+url+"' target='_blank'>&#8599;</a>";
          break;
        } 
      }
    }
    poppers = id;
  }
}

function fillTwines() {
  //FIGURE OUT HOW YOU DID THIS TWO YEARS AGO 
  
  // filler = document.getElementById("fT");
  // entries = "yes";
  
  // filler.innerHTML = entries;
}

function opnBit(bitsy, ttl) {
  frame = document.getElementById("gameFrame");
  frame.src = "/b/"+bitsy+".html";
  vis("gamer");
  document.getElementById("gmrhd").innerHTML = ttl + " - BitsyBrowse";
}

function opnTwi(twine) {
  frame = document.getElementById("twiFrame");
  frame.src = "/t/"+twine+".html";
  vis("twiney");
  ttl = frame.contentDocument.title;
  document.getElementById("twihd").innerHTML = ttl + " - Twine Diary";
}

function opnSplat() {
  frame = document.getElementById("splFrame");
  frame.src = "https://www.mastofeed.com/api/feed?url=https%3A%2F%2Fmastodon.social%2Fusers%2Fsplatoon.atom&theme=dark&size=90&header=false&replies=false&boosts=false";
  vis("splat");
}

function opnAqua() {
  frame = document.getElementById("aquaFrame");
  frame.src = "/aquarium/index.html";
  vis("aqua");
}

setTimeout(function(){agex("updates", "updFill", 6)}, 300);
setTimeout(function(){agex("pronouns", "proFill", 1)}, 500);

// ------ originally copypasted from W3, yikes ------

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "h")) document.getElementById(elmnt.id + "h").onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
    
    elmnt.style.zIndex = zUp;
    zUp++;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    localStorage.setItem("--"+elmnt.id+"-y", ((elmnt.offsetTop - pos2) + "px"));
    localStorage.setItem("--"+elmnt.id+"-x", ((elmnt.offsetLeft - pos1) + "px"));
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
  const img = document.getElementById('draggable');
const target = document.getElementById('target');

img.onmousedown = function(event) {
    let shiftX = event.clientX - img.getBoundingClientRect().left;
    let shiftY = event.clientY - img.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
        img.style.left = pageX - shiftX + 'px';
        img.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    img.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        img.onmouseup = null; // 移除事件
        
        // 检查是否放置在目标图片上
        if (isOverlapping(img, target)) {
            window.open('http://pump.fun', '_blank'); // 在新标签页中打开链接
        }
    };
};

img.ondragstart = function() {
    return false; // 禁用默认拖动行为
};

// 检查两个元素是否重叠
function isOverlapping(rect1, rect2) {
    const r1 = rect1.getBoundingClientRect();
    const r2 = rect2.getBoundingClientRect();
    return !(
        r1.right < r2.left ||
        r1.left > r2.right ||
        r1.bottom < r2.top ||
        r1.top > r2.bottom
    );
}
}