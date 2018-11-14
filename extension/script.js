const currentTime = (new Date()).getTime();
const getImgsFile = (url, callback) => {
  chrome.storage.sync.get(['lastLoaded'], function(result) {
    if(result.lastLoaded - currentTime > 86400000) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onload = function() {
        if (xhr.status === 200) {
          const imgLinks = JSON.parse(xhr.responseText);
          chrome.storage.sync.set({
            lastLoaded: currentTime,
            landscapeLinks: imgLinks['landscape'],
            portraitLinks: imgLinks['portrait'],
            index: 0,
          }, callback());
        }
      };
      xhr.send();
    } else {
      callback();
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
const loadNewImg = () => {
  chrome.storage.sync.get(['landscapeLinks', 'portraitLinks', 'index'], function(result) {
    const orientation = getScreenOrientation();
    const img = orientation === 'landscape' ? result['landscapeLinks'][result['index']] : result['portraitLinks'][result['index']];
    if(orientation === 'landscape') {
      img.url += '&w=1000'
    } else {
      img.url += '&h=1000'
    }
    const photoElement = document.getElementById('photo');
    photoElement.style.backgroundImage = 'url("' + img.url + '")';
    photoElement.setAttribute('aria-label', img.description);
    setPhotoCredit(img);
  });
}
const updateIndex = () => {
  chrome.storage.sync.get(['index'], function(result) {
    let newIndex = result.index + 1;
    if(newIndex > 29) {
      newIndex = 0;
    }
    chrome.storage.sync.set({
      index: newIndex,
    }, loadNewImg());
  });
}
const setup = () => {
  loadNewImg();
  document.getElementById('reload').addEventListener('click', updateIndex);
}
getImgsFile('unsplashLinks.json', setup);
