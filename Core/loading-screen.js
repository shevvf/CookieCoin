window.addEventListener("load", function () {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("ServiceWorker.js");
    }
  });
  var unityInstanceRef;
  var unsubscribe;
  const container = document.querySelector("#unity-container");
  const canvas = document.querySelector("#unity-canvas");
  const loadingRoot = document.getElementById("loading-screen");
  const progressBar = document.getElementById("progress-bar");
  const progressText = document.getElementById("progress-text");

  var buildUrl = "Build";
  var loaderUrl = buildUrl + "/66111aa68dab7f57170d26b3463b70e4.loader.js";
  var config = {
    dataUrl: buildUrl + "/5befeddbfbe40014545f80364eec3694.data.unityweb",
    frameworkUrl: buildUrl + "/f9b087cc67ed62bd38c2a172fd0a5203.framework.js.unityweb",
    codeUrl: buildUrl + "/92625fa1492d671e667dbdadda48b15a.wasm.unityweb",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "kiippl",
    productName: "CookieClicker",
    productVersion: "1.0",
  };

  if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      container.className = "unity-mobile";
  }

  function focusOnGame() {
      container.focus();
      window.focus();
      canvas.focus();
  }

  function updateProgress(progress) {
      var int_progress = Math.ceil(progress / 0.9);
      int_progress = int_progress > 100 ?
          100 : int_progress < 0 ? 0 : int_progress;
      progressBar.style.width = `${int_progress}%`;
      progressText.textContent = `${int_progress}%`;
  }

  let loadingDone = false;

  function hideLoadingScreen() {
      if (loadingDone) return;
      document.getElementById("loading-screen").style.opacity = 0.0;
      setTimeout(() => {
          loadingRoot.style.display = "none";
          loadingRoot.remove();
          console.log("Loading screen is done and deleted.");
      }, 500);
      loadingDone = true;
  }

  const script = document.createElement("script");
  script.src = loaderUrl;
  script.onload = () => {
      createUnityInstance(canvas, config, (progress) => {
          updateProgress(100 * progress);
      }).then((unityInstance) => {
          unityInstanceRef = unityInstance;
          hideLoadingScreen();
          focusOnGame();
      }).catch((message) => {
          alert(message);
      });
};

document.body.appendChild(script);
document.addEventListener("pointerdown", focusOnGame);
