'use strict';

var getImgsFile = function getImgsFile(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = function () {
    if (xhr.status === 200) {
      callback(JSON.parse(xhr.responseText));
    } else {
      callback(false);
    }
  };
  xhr.send();
};
var getScreenOrientation = function getScreenOrientation() {
  var isLandscape = matchMedia("(orientation: landscape)").matches;
  return isLandscape ? 'landscape' : 'portrait';
};
var randomInRange = function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
var setPhotoCredit = function setPhotoCredit(img) {
  var photoCreditSection = document.getElementById('photoCredit');
  var linkTag = photoCreditSection.getElementsByTagName('a')[0];
  linkTag.href = img.link;
  linkTag.title = "Download free do whatever you want high-resolution photos from " + img.name;
  var nameSpan = linkTag.getElementsByTagName('span')[1];
  nameSpan.innerHTML = img.name;
  photoCreditSection.style.display = 'inline';
};
var setup = function setup(imgsData) {
  if (imgsData) {
    var orientation = getScreenOrientation();
    var img = imgsData[orientation][randomInRange(0, 29)];
    if (orientation === 'landscape') {
      img.url += '&w=1000';
    } else {
      img.url += '&h=1000';
    }
    var photoElement = document.getElementById('photo');
    photoElement.style.backgroundImage = 'url("' + img.url + '")';
    photoElement.setAttribute('aria-label', img.description);
    setPhotoCredit(img);
  }
};

getImgsFile('unsplashLinks.json', setup);
