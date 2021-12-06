/*https://www.youtube.com/watch?v=EBbgImXJeqY&t=60s*/

const boxDefaults = {
    width: 200,
    height: 200,
    boxColor: '#40739e',
    wrapperBackground: '#ffffff',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#000000',
};

const shadowDefaults = {
    hOffset: 5,
    vOffset: 5,
    blur: 5,
    spread: 0,
    color: '#000000',
    opacity: 0.4,
    inset: false,
};

const box = document.getElementById('box');
const wrapper = document.querySelector('div#wrapper');
const generatedCSS = document.getElementById('generated-css');
const boxWidth = document.getElementById('box-width');
const boxHeight = document.getElementById('box-height');
const boxColor = document.getElementById('box-color');
const borderRadius = document.getElementById('border-radius');
const borderWidth = document.getElementById('border-width');
const borderColor = document.getElementById('border-color');
const wrapperBackground = document.getElementById('wrapper-background');
 
  
const boxSettings = document.querySelectorAll('.controls.box .input-block input');
boxSettings.forEach((setting) => {
    setting.addEventListener('input', updateBox)
})

function updateBox() {
    box.style.width = `${boxWidth.value}px`;
    box.style.height = `${boxHeight.value}px`;
    box.style.backgroundColor = `${boxColor.value}`
    wrapper.style.backgroundColor = `${wrapperBackground.value}`;
    box.style.borderRadius = `${borderRadius.value}px`;
    box.style.borderWidth = `${borderWidth.value}px`;
    box.style.borderColor = `${borderColor.value}`;
}


const hOffset = document.getElementById('h-offset');
const vOffset = document.getElementById('v-offset');
const blurRadius = document.getElementById('blur-radius');
const spreadRadius = document.getElementById('spread-radius');
const color = document.getElementById('color');
const opacity = document.getElementById('opacity');
const inset = document.getElementById('inset');
inset.addEventListener('input', updateBoxShadow);

const shadowSettings = document.querySelectorAll('.controls.shadow .input-block input');

shadowSettings.forEach((setting) => {
  setting.addEventListener('input', updateBoxShadow);
});

function updateBoxShadow() {
  const boxShadow = `${hOffset.value}px ${vOffset.value}px ${
    blurRadius.value
  }px ${spreadRadius.value}px rgba(${hexToRGB(color.value).join(', ')}, ${
    opacity.value
  })${inset.checked ? ' inset' : ''}`;
  box.style.boxShadow = boxShadow;
  generatedCSS.textContent = `box-shadow: ${boxShadow};`;
}

const copyButton = document.querySelector('.btn#copy');
copyButton.addEventListener('click', copyButtonClick);

function copyButtonClick() {
  // generatedCssCopyBtn.disabled = true;
  navigator.clipboard
    .writeText(generatedCSS.textContent)
    .then(function () {
      //clipboard successfully set
      copyButton.textContent = 'Copied !';
      copyButton.classList.add('success');
      setTimeout(() => {
        copyButton.classList.remove('success');
        copyButton.textContent = 'Copy';
        // generatedCssCopyBtn.disabled = false;
      }, 1000);
    })
    .catch((error) => {
      copyButton.textContent = 'Failed !';
      copyButton.classList.add('error');
      setTimeout(() => {
        copyButton.classList.remove('error');
        copyButton.textContent = 'Copy';
        copyButton.disabled = false;
      }, 1000);
    });
}

const boxDefaultsButton = document.querySelector('.btn#box-defaults');
boxDefaultsButton.addEventListener('click', restoreBoxDefaults);


function restoreBoxDefaults() {
    
    boxWidth.value = `${boxDefaults.width}`;
    box.style.width = `${boxDefaults.width}px`;
    boxHeight.value = `${boxDefaults.height}`;
    box.style.height = `${boxDefaults.height}px`;
    boxColor.value = `${boxDefaults.boxColor}`;
    box.style.backgroundColor = `${boxDefaults.boxColor}`;
    wrapperBackground.value = `${boxDefaults.wrapperBackground}`;
    wrapperBackground.style.backgroundColor = `${boxDefaults.wrapperBackground}`
    borderRadius.value = `${boxDefaults.borderRadius}`;
    box.style.borderRadius = `${boxDefaults.borderRadius}px`;
    borderWidth.value = `${boxDefaults.borderWidth}`;
    box.style.borderWidth = `${boxDefaults.borderWidth}px`;
    borderColor.value = `${boxDefaults.borderColor}`;
    box.style.borderColor =    `${boxDefaults.borderColor}`

}
const shadowResetButton = document.querySelector('.btn#shadow-defaults');
shadowResetButton.addEventListener('click', restoreShadowDefaults);

function restoreShadowDefaults() {
  hOffset.value = shadowDefaults.hOffset.toString();
  vOffset.value = shadowDefaults.vOffset.toString();
  blurRadius.value = shadowDefaults.blur.toString();
  spreadRadius.value = shadowDefaults.spread.toString();
  color.value = shadowDefaults.color;
  opacity.value = shadowDefaults.opacity.toString();
  inset.checked = shadowDefaults.inset;
  updateBoxShadow();
}

/*Input elements of type color generate a Hex value, so utility to covert to RGB*/
function hexToRGB(h) {
  let r = 0;
  let g = 0;
  let b = 0;

  //3 digits
  if (h.length == 4) {
    r = '0x' + h[1] + h[1];
    g = '0x' + h[2] + h[2];
    b = '0x' + h[3] + h[3];
  }
  //6 digits
  else if (h.length == 7) {
    r = '0x' + h[1] + h[2];
    g = '0x' + h[3] + h[4];
    b = '0x' + h[5] + h[6];
  }
  return [+r, +g, +b];
}
