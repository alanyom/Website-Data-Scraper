//renderer.js
//creates a variable for the values of id input and button
const setButton = document.getElementById('btn')
const infoInput = document.getElementById('info')

//listens for setButton to be pressed in the html page before running the function
setButton.addEventListener('click', () => {
  //sets value for the user input and sends it to function sendData in preload.js
  const info = infoInput.value
  //must send data through preload since renderer.js is a rendering file and cannot access the module
  window.electronAPI.sendData(info)
})