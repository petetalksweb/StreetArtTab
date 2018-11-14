const currentTime = (new Date()).getTime();
const getImgsFile = (url, callback) => {
  chrome.storage.sync.get(['lastLoaded', 'landscapeLinks', 'portraitLinks', 'index'], function(result) {
    if((result.lastLoaded && result.lastLoaded - currentTime > 86400000) || !result.lastLoaded) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onload = function() {
        if (xhr.status === 200) {
          const imgLinks = JSON.parse(xhr.responseText);
          const newStorageVals = {
            lastLoaded: currentTime,
            landscapeLinks: imgLinks['landscape'],
            portraitLinks: imgLinks['portrait'],
            index: 0,
          };
          chrome.storage.sync.set(newStorageVals, callback(newStorageVals));
        }
      };
      xhr.send();
    } else {
      callback(result);
    }
  });
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
const loadNewImg = (newStorageVals) => {
  const orientation = getScreenOrientation();
  const img = orientation === 'landscape' ? newStorageVals['landscapeLinks'][newStorageVals['index']] : newStorageVals['portraitLinks'][newStorageVals['index']];
  if(orientation === 'landscape') {
    img.url += '&w=1000'
  } else {
    img.url += '&h=1000'
  }
  const photoElement = document.getElementById('photo');
  photoElement.style.backgroundImage = 'url("' + img.url + '")';
  photoElement.setAttribute('aria-label', img.description);
  setPhotoCredit(img);
}
const updateIndex = () => {
  chrome.storage.sync.get(['lastLoaded', 'landscapeLinks', 'portraitLinks', 'index'], function(result) {
    let newIndex = result.index + 1;
    if(newIndex > 29) {
      newIndex = 0;
    }
    result.index = newIndex;
    chrome.storage.sync.set({
      index: newIndex,
    }, loadNewImg(result));
  });
}
const setup = (setValues) => {
  loadNewImg(setValues);
  document.getElementById('reload').addEventListener('click', updateIndex);
}
getImgsFile('https://streetarttab.com/unsplashLinks.json', setup);
