const inputs = document.querySelectorAll("input");
const wrapper = document.getElementById("wrapper");
const object = document.getElementById("object");
const controller = document.getElementById("controller");
const displayShadow = document.getElementById("displayShadow");
const webkitDisplayShadow = document.getElementById("webkitDisplayShadow");

const shadow = {
  xDirection: 8,
  yDirection: 8,
  blur: 10,
  spread: 5,
  opacity: 0.75,
  shadowColor: "#000000",
  backgroundColor: "#4b48ea",
  inset: false,
  checkBackground: true,
};

inputs.forEach((e) =>
  e.addEventListener("input", () => {
    shadowGenerator(e.id, e.type, e.value, e.checked);
  })
);

shadowGenerator();

function shadowGenerator(id, type, value, checked) {
  // Sync all inputs with each other
  syncInputs(id, type, value);

  shadow[`${id}`] = value;
  if (type === "checkbox") shadow[`${id}`] = checked;

  //   get colors
  const shadowColorRGBA = hexToRGBA(shadow.shadowColor, shadow.opacity);
  const backgroundColorRGBA = hexToRGBA(shadow.backgroundColor);

  // templates for shadow
  const shadowNormal = `${shadow.xDirection}px ${shadow.yDirection}px ${
    shadow.blur
  }px ${
    shadow.spread
  }px ${shadowColorRGBA}, ${-shadow.xDirection}px ${-shadow.yDirection}px ${
    shadow.blur
  }px ${shadow.spread}px rgba(255, 255, 255, ${shadow.opacity - 0.15})`;

  const shadowInset = `inset ${shadow.xDirection}px ${shadow.yDirection}px ${
    shadow.blur
  }px ${
    shadow.spread
  }px ${shadowColorRGBA}, inset ${-shadow.xDirection}px ${-shadow.yDirection}px ${
    shadow.blur
  }px ${shadow.spread}px rgba(255, 255, 255, ${shadow.opacity - 0.15})`;

  const shadowProperty = shadow.inset ? shadowInset : shadowNormal;

  // adding styles
  object.style.boxShadow = shadowProperty;
  controller.style.boxShadow = shadowProperty;
  object.style.backgroundColor = shadow.backgroundColor;

  if (shadow.checkBackground) {
    wrapper.style.backgroundColor = backgroundColorRGBA;
  } else {
    wrapper.style.backgroundColor = "#ffffff";
  }

  //   updating display
  displayShadow.innerHTML = `: ${shadowProperty} ;`;
  webkitDisplayShadow.innerHTML = `: ${shadowProperty} ;`;
}

function hexToRGBA(color, opacity) {
  const r = parseInt(color.substr(1, 2), 16);
  const g = parseInt(color.substr(3, 2), 16);
  const b = parseInt(color.substr(5, 2), 16);

  const rgba = opacity
    ? `rgba(${r}, ${g}, ${b}, ${opacity})`
    : `rgba(${r}, ${g}, ${b}, 0.9)`;
  return rgba;
}

function syncInputs(id, type, value) {
  if (type === "range") {
    document.getElementById(`${id}Num`).value = value;
    shadow[`${id}`] = value;
  }
  if (type === "number") {
    const idName = id.slice(0, -3);
    document.getElementById(`${idName}`).value = value;
    shadow[`${idName}`] = value;
  }
  if (type === "text") {
    const idName = id.slice(0, -3);
    document.getElementById(`${idName}`).value = value;
    shadow[`${idName}`] = value;
  }
  if (type === "color") {
    document.getElementById(`${id}Num`).value = value;
    shadow[`${id}`] = value;
  }
}
