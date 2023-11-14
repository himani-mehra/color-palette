var cc = new ColorCube(20, 0.2, 0.4);
function do_it(image_id) {
    var image = document.getElementById(image_id);
    var colors = cc.get_colors(image);
    outputColors(colors);
}

window.addEventListener('DOMContentLoaded', function () {
    do_it('coke');
});
document.addEventListener("DOMContentLoaded", function () {
    const text = "Upload";
    const header = document.getElementById("header");
    let index = 0;

    function addLetter() {
        if (index < text.length) {
            header.textContent += text.charAt(index);
            index++;
            setTimeout(addLetter, 100);
        }
    }

    addLetter();
});
function outputColors(colors) {
    var output = document.getElementById('output');
    var colors_list = document.createElement('ul');
    colors_list.id = 'colors';
    for (var c in colors) {
        var color = colors[c];
        var colorBox = document.createElement('li');
        var upperColorBox = document.createElement('div');
        upperColorBox.className = 'color-box';
        upperColorBox.style.backgroundColor = color;
        upperColorBox.dataset.hexCode = color;

        var hexCode = document.createElement('div');
        hexCode.className = 'hex-code';
        hexCode.textContent = color;
        hexCode.addEventListener('click', function () {
            var code = this.textContent;
            copyToClipboard(code);
            var codeBox = this;
            codeBox.textContent = 'Copied!';
            setTimeout(function () {
                codeBox.textContent = code;
            }, 1000);
        });

        var rgbCode = document.createElement('div');
        rgbCode.className = 'code';
        rgbCode.textContent = getRGBCode(color);
        rgbCode.addEventListener('click', function () {
            var code = this.textContent;
            copyToClipboard(code);
            var codeBox = this;
            codeBox.textContent = 'Copied!';
            setTimeout(function () {
                codeBox.textContent = code;
            }, 1000);
        });

        var hslCode = document.createElement('div');
        hslCode.className = 'code';
        hslCode.textContent = getHSLCode(color);
        hslCode.addEventListener('click', function () {
            var code = this.textContent;
            copyToClipboard(code);
            var codeBox = this;
            codeBox.textContent = 'Copied!';
            setTimeout(function () {
                codeBox.textContent = code;
            }, 1000);
        });
        var hexCode = document.createElement('div');
        hexCode.className = 'code';
        hexCode.textContent = color;
        hexCode.addEventListener('click', function () {
            var code = this.textContent;
            copyToClipboard(code);
            var codeBox = this;
            codeBox.textContent = 'Copied!';
            setTimeout(function () {
                codeBox.textContent = code;
            }, 1000);
        });

        colorBox.appendChild(upperColorBox);
        colorBox.appendChild(hexCode);
        colorBox.appendChild(rgbCode);
        colorBox.appendChild(hslCode);
        colors_list.appendChild(colorBox);
    }
    output.innerHTML = "<h2 style='text-align: center;'></h2>";
    output.appendChild(colors_list);
}


function getRGBCode(hexCode) {
    var hex = hexCode.slice(1);
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

function getHSLCode(hexCode) {
    var rgbCode = getRGBCode(hexCode);
    var rgb = rgbCode.match(/\d+/g);
    var r = rgb[0] / 255;
    var g = rgb[1] / 255;
    var b = rgb[2] / 255;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var l = (max + min) / 2;
    var s = 0;
    var h = 0;
    if (max !== min) {
        s = l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
        switch (max) {
            case r: h = (g - b) / (max - min) + (g < b ? 6 : 0); break;
            case g: h = (b - r) / (max - min) + 2; break;
            case b: h = (r - g) / (max - min) + 4; break;
        }
        h /= 6;
    }
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
}
var coke_button = document.getElementById('do-coke');
coke_button.addEventListener("click", function () {
    do_it('coke');
});
function copyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
}
document.addEventListener('click', function (event) {
    if (event.target && event.target.matches('li')) {
        const hexCode = event.target.textContent;
        event.target.textContent = 'Copied!';
        copyToClipboard(hexCode);
        setTimeout(function () {
            event.target.textContent = hexCode;
        }, 1000);
    }
});
const downloadButton = document.getElementById('download-button');
downloadButton.addEventListener("click", downloadColorPaletteAsSVG);
function downloadColorPaletteAsSVG() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", "400");
    svg.setAttribute("height", "100");
    const colorBoxes = document.querySelectorAll('#colors li');
    const numColors = colorBoxes.length;
    const boxWidth = 100;
    const spacing = (400 - (boxWidth * numColors)) / (numColors - 1);
    colorBoxes.forEach((colorBox, index) => {
        const color = colorBox.style.backgroundColor;
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", (boxWidth + spacing) * index);
        rect.setAttribute("y", 0);
        rect.setAttribute("width", boxWidth);
        rect.setAttribute("height", 100);
        rect.setAttribute("rx", 4);
        rect.setAttribute("ry", 4);
        rect.setAttribute("fill", color);
        svg.appendChild(rect);
    });
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "color_palette.svg";
    a.click();
    URL.revokeObjectURL(url);
}
function downloadColorPaletteAsASE() {
    const colorBoxes = document.querySelectorAll('#colors li');
    const colorsArray = [];
    colorBoxes.forEach((colorBox) => {
        const hexCode = colorBox.textContent;

        const rgbColor = hexToRGB(hexCode);
        colorsArray.push({
            name: '',
            model: 'RGB',
            color: [rgbColor.r, rgbColor.g, rgbColor.b],
        });
    });
    const aseBlob = createASEFile(colorsArray);
    const url = URL.createObjectURL(aseBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "color_palette.ase";
    a.click();
    URL.revokeObjectURL(url);
}
function hexToRGB(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
}
function createASEFile(colors) {
    const chunk = (type, data) => new Uint8Array([type.charCodeAt(0), ...data]);
    const header = new Uint8Array([0x41, 0x53, 0x45, 0x46, 0x00, 0x01, 0x00, 0x00]);
    const colorData = colors.flatMap((color) => {
        const nameBytes = chunk('c', [...color.name].map((char) => char.charCodeAt(0)));
        const modelBytes = chunk('c', [...color.model].map((char) => char.charCodeAt(0)));
        const colorBytes = chunk('f', Float32Array.from(color.color));
        return [...nameBytes, ...modelBytes, ...colorBytes];
    });
    const lengthBytes = chunk('L', Uint16Array.of(colorData.length));
    const dataBytes = new Uint8Array([...lengthBytes, ...colorData]);
    const aseData = new Uint8Array([...header, ...dataBytes]);
    return new Blob([aseData], { type: 'application/octet-stream' });
}
const downloadASEButton = document.getElementById('download-ase-button');
downloadASEButton.addEventListener('click', downloadColorPaletteAsASE);
var selectedPalette = "";
var googlePalette = "";
function do_it(image_id) {
    var image = document.getElementById(image_id);
    var colors = cc.get_colors(image);
    var hexColorCodes = colors.map(function (color) {
        return color.replace('#', '');
    });
    var limitedColorCodes = hexColorCodes.slice(0, 5);
    selectedPalette = hexColorCodes.join('-');
    googlePalette = limitedColorCodes.join('-');
    outputColors(colors);
}
function openGooglePalette() {
    var googlePaletteURL = "https://artsexperiments.withgoogle.com/artpalette/colors/" + googlePalette;
    window.open(googlePaletteURL, "_blank");
}
document
    .getElementById("google-palette-button")
    .addEventListener("click", openGooglePalette);

document.getElementById('take-screenshot').addEventListener('click', function () {
    console.log('take-screenshot button clicked');
    const container = document.querySelector('.container');
    const screenHeight = window.innerHeight;
    let scrollPosition = 0;

    function scrollToBottom() {
        if (scrollPosition + screenHeight < document.body.scrollHeight) {
            scrollPosition += screenHeight;
            window.scrollTo(0, scrollPosition);
            console.log('Scrolled to position:', scrollPosition);
            setTimeout(scrollToBottom, 500);
        } else {
            console.log('Reached the bottom');
            captureScreenshot();
        }
    }

    function captureScreenshot() {
        console.log('Capturing screenshot...');
        html2canvas(container, {
            scrollY: -window.scrollY,
        }).then(function (canvas) {
            console.log('Screenshot captured.');
            const dataURL = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = 'full-page-screenshot.png';
            link.click();
        });
    }

    scrollToBottom();
});
const tryOut = document.getElementById('do-user-image')
tryOut.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    }
});
document.getElementById('upload-user-image').addEventListener('click', function () {
    document.getElementById('user-image-input').click();
});
document.getElementById('do-user-image').addEventListener('click', function () {
    const uploadedImage = document.getElementById('user-image');
    if (uploadedImage.src) {
        do_it('user-image');
    }

});
document.getElementById('user-image-input').addEventListener('change', function (event) {
    const uploadedImage = document.getElementById('user-image');
    const doUserImageBtn = document.getElementById('do-user-image');
    if (event.target.files.length > 0) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            uploadedImage.src = e.target.result;
            uploadedImage.style.maxWidth = '100%';
            uploadedImage.style.display = 'block';
            doUserImageBtn.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});
function openCoolorsPalette() {
    var coolorsURL = "https://coolors.co/" + selectedPalette;
    var newWindow = window.open(coolorsURL, "_blank");
}
document
    .getElementById("generate-coolors-button")
    .addEventListener("click", openCoolorsPalette);

const videoElement = document.getElementById('camera-feed');
const captureButton = document.getElementById('capture-button');
const openCameraButton = document.getElementById('open-camera-button');
const capturedImage = document.getElementById('captured-image');

let stream;
const userCapturedImage = document.getElementById('captured-image');
const colorPalette = document.getElementById('captured-image-palette');

function displayColorPalette() {
    if (userCapturedImage.complete) {
        var colors = cc.get_colors(userCapturedImage);
        colorPalette.innerHTML = '';
        for (var c in colors) {
            var color = colors[c];
            var colorBox = document.createElement('div');
            colorBox.className = 'color-box';
            colorBox.style.backgroundColor = color;
            colorPalette.appendChild(colorBox);
        }
    }
}
const sampleImages = document.querySelectorAll('.sample-img');
const targetImage = document.getElementById('coke');

sampleImages.forEach(sampleImg => {
    sampleImg.addEventListener('click', function () {
        targetImage.src = this.src;
        console.log(targetImage.src);
        const imageId = this.id;
        do_it(imageId);
    });
});



const images = document.querySelectorAll(".sample-img");
images.forEach((image) => {
    image.addEventListener("click", () => {
        window.scrollTo(0, 0);
    });
});
images.forEach((image) => {
    image.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        }
    });
});
if (window.innerWidth <= 767) {
    const heading = document.querySelector('.heading');
    if (heading) {
        heading.textContent = 'Here goes the color palette...';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var footer = document.getElementById('sticky-footer');
  
    window.addEventListener('scroll', function () {
      var scrollPosition = window.scrollY + window.innerHeight;
      var pageHeight = document.body.offsetHeight;
      var threshold = pageHeight - window.innerHeight * 0.1;
      if (scrollPosition >= threshold) {
        footer.style.display = 'block';
      } else {
        footer.style.display = 'none';
      }
    });
  });
  