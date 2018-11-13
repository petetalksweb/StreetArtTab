const getImgsFile = (url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = function() {
    if (xhr.status === 200) {
      callback(JSON.parse(xhr.responseText));
    } else {
      callback(false);
    }
  };
  xhr.send();
}
const getScreenOrientation = () => {
  const isLandscape = matchMedia("(orientation: landscape)").matches;
  return isLandscape ? 'landscape' : 'portrait';
}
const randomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const setPhotoCredit = (img) => {
  const photoCreditSection = document.getElementById('photoCredit');
  const linkTag = photoCreditSection.getElementsByTagName('a')[0];
  linkTag.href = img.link;
  linkTag.title = "Download free do whatever you want high-resolution photos from " + img.name;
  const nameSpan = linkTag.getElementsByTagName('span')[1];
  nameSpan.innerHTML = img.name;
  photoCreditSection.style.display = 'inline'
}
const setup = (imgsData) => {
  console.log(imgsData);
  if(imgsData) {
    console.log(1);
    const orientation = getScreenOrientation();
    const img = imgsData[orientation][randomInRange(0, 29)];
    if(orientation === 'landscape') {
      img.url += '&w=1000'
    } else {
      img.url += '&h=1000'
    }
    document.getElementsByTagName('html')[0].style.backgroundImage = 'url("' + img.url + '")';
    setPhotoCredit(img);
  }
}

getImgsFile('unsplashLinks.json', setup);
