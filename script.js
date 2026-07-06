let background = document.getElementById('background-texture');


function getStyle(element, style) {
    return window.getComputedStyle(element)[style]
}

function pxToCh(px) {
    const chLengthEstimation = 8; // 8px
    let chValue = px / chLengthEstimation;
    return chValue;
}

function pxToLineHeight(px, element) {
    const lineHeightEm = 1.2; // "normal" value in em, according to MDN
    let fontFize = parseFloat(getStyle(element, "font-size"));
    let lineHeight = fontFize * lineHeightEm;
    let emValue = px / lineHeight;
    return emValue;
}



function selectRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}


function generateBackground(lenght) {
    let charList = Array.from('!@#$%?&~*.,/\\/!@#$%?&~*.,/\\/-<>=+')
        .concat(['null', 'home', 'dev', 'bin', 'etc', 'sh', 'bin', 'ls', 'dir', 'rm', '-r', '-f', '-a', '-c', '-f']);
    let p = Array.from(charList);
    let result = '';
    let char = '';
    
    for (let i = 0; i < lenght; i++){
        if (p.length > 0) {
            char = selectRandom(p);
            result += char + ' ';
            let ind = p.indexOf(char);
            p.splice(ind, 1);
        } else {
            p = Array.from(charList);
        }
    }
    return result;
}


function estimateCharacterCount(element) {
    let bgw = parseFloat(getStyle(element, 'width'));
    let bgh = parseFloat(getStyle(element, 'height'));

    let bch = pxToCh(bgw);
    let blh = pxToLineHeight(bgh, element);

    let total = bch * blh;

    return total;
}


let bgTotalCharacters = estimateCharacterCount(background);
window.onresize = () => { bgTotalCharacters = estimateCharacterCount(background) };
setInterval(() => { background.innerText = generateBackground(bgTotalCharacters) }, 200);