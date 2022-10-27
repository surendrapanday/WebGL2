import { DemoApp } from ".";


export function initializeSimulatorEvents(gl: any) {
  let app = new DemoApp(gl);
  const canvas = document.getElementById('canvas');
 if (canvas) {
  canvas.addEventListener("keydown", function (event: any) {
    app.handleKeyboardEvent(event);
  });
 }
  app.addEventListener("centreChanged", function (centre: any) {
    let centerX = document.getElementById("centre") || null;
    if (centerX) {
      centerX.innerHTML = centre;
    }
  });
  app.addEventListener("rangeChanged", function (range: any) {
    let rangeX = document.getElementById("range") || null;
    if (rangeX) {
      rangeX.innerHTML = range;
    }
  });
  app.addEventListener("tracksChanged", function (tracks: any) {
    let trackX = document.getElementById("tracks");
    if (trackX) {
      trackX.innerHTML = tracks;
    }
  });
  app.addEventListener("fpsChanged", function (fps: any) {
    let fpsX = document.getElementById("fps");
    if (fpsX) {
      fpsX.innerHTML = fps;
    }
  });
  app.run();
}
