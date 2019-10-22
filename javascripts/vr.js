/******/ (function (modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if (installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
            /******/
        }
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
            /******/
        };
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
        /******/
    }
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function (value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function (exports, name, getter) {
/******/ 		if (!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
        /******/
    });
            /******/
        }
        /******/
    };
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function (module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
        /******/
    };
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
    /******/
})
/************************************************************************/
/******/([
/* 0 */
/***/ (function (module, exports, __webpack_require__) {

        "use strict";

        Object.defineProperty(exports, "__esModule", { value: true });
        // Converts a value to 0 - 1 from its min - max bounds
        function normalize(val, min, max) {
            return Math.max(0, Math.min(1, (val - min) / (max - min)));
        }
        exports.normalize = normalize;
        // Converts a value to 0 - 1 from its min - max bounds in quadratic in form
        function normalizeQuadIn(val, min, max) {
            return Math.pow(normalize(val, min, max), 2.0);
        }
        exports.normalizeQuadIn = normalizeQuadIn;
        // Converts a value to 0 - 1 from its min - max bounds in quadratic out form
        function normalizeQuadOut(val, min, max) {
            var x = normalize(val, min, max);
            return x * (2.0 - x);
        }
        exports.normalizeQuadOut = normalizeQuadOut;
        // Tween to target using Zeno's Paradox
        function zTween(_val, _target, _ratio) {
            return _val + (_target - _val) * Math.min(_ratio, 1.0);
        }
        exports.zTween = zTween;
        // Keeps track of time in seconds
        // and caps rendering to match desired FPS
        var Time = /** @class */ (function () {
            function Time(timeFactor) {
                this.fallBackRates = [60, 40, 30, 20, 15];
                this.prev = 0;
                this.prevBreak = 0;
                this.delta = 0;
                this.timeFact = (typeof timeFactor === "undefined") ? 1 : timeFactor;
                this.frameCount = 0;
                this.fallBackIndex = 0;
                this.setFPS(60);
            }
            Time.prototype.update = function (_newTime) {
                this.deltaBreak = Math.min(_newTime - this.prevBreak, 1.0);
                // Update time if enough time has passed
                if (this.deltaBreak > this.spf) {
                    this.delta = Math.min(_newTime - this.prev, 1.0);
                    this.prev = _newTime;
                    this.prevBreak = _newTime - (this.deltaBreak % this.spf);
                    // this.checkFPS();
                    // Returns true to render frame
                    return true;
                }
                else {
                    // Returns false to skip frame
                    return false;
                }
            };
            Time.prototype.checkFPS = function () {
                if (this.delta > this.spf * 2) {
                    this.frameCount++;
                    console.log(this.frameCount);
                    if (this.frameCount > 30) {
                        this.frameCount = 0;
                        this.fallBackIndex++;
                        this.setFPS(this.fallBackRates[this.fallBackIndex]);
                    }
                }
            };
            Time.prototype.setFPS = function (_newVal) {
                this.fps = _newVal;
                this.spf = 1 / this.fps;
            };
            return Time;
        }());
        exports.Time = Time;
        // Fisher-Yates Shuffle
        function shuffle(array) {
            var m = array.length, t, i;
            // While there remain elements to shuffle
            while (m) {
                // Pick a remaining element
                i = Math.floor(Math.random() * m--);
                // And swap it with the current element.
                t = array[m];
                array[m] = array[i];
                array[i] = t;
            }
            return array;
        }
        exports.shuffle = shuffle;
        function mod(n, m) {
            return ((n % m) + m) % m;
        }
        exports.mod = mod;


        /***/
    }),
/* 1 */
/***/ (function (module, exports, __webpack_require__) {

        "use strict";

        Object.defineProperty(exports, "__esModule", { value: true });
        var utils_1 = __webpack_require__(0);
        // FF 91 Constants
        var FF91 = /** @class */ (function () {
            function FF91() {
            }
            FF91.Accel = 5; // m/s^2
            FF91.Decel = -10; // m/s^2
            FF91.MaxVel = (70 * 1610) / 3600; // 70m/h ~= 31.3m/s
            FF91.MaxTurn = Math.PI * 0.20; // Max angle of wheel turn
            // Dimensions
            FF91.Length = 5.250; // Car length
            FF91.Width = 2.283; // Car width
            FF91.WheelTrack = 1.72; // Wheel track
            FF91.WheelBase = 3.200; // Wheel base
            FF91.WheelDiam = 0.780; // Wheel diameter
            FF91.WheelCirc = FF91.WheelDiam * Math.PI; // Wheel circumference
            return FF91;
        }());
        exports.FF91 = FF91;
        var CarProps = /** @class */ (function () {
            function CarProps() {
                this.time = new utils_1.Time();
                this.velocity = new THREE.Vector2();
                this.speed = 0;
                this.accel = 0;
                this.pos = new THREE.Vector2();
                this.joyVec = new THREE.Vector2();
                // Momentim
                this.longitMomentum = 0;
                this.lateralMomentum = 0;
                this.wAngleInner = 0;
                this.wAngleOuter = 0;
                this.wAngleTarg = 0;
                this.keys = new Array();
                this.braking = 0.0;
                this.omega = 0;
                this.theta = -Math.PI / 2;
            }
            CarProps.prototype.onKeyDown = function (evt) {
                // Add key to list if they don't exist yet
                if (this.keys.indexOf(evt.keyCode) === -1) {
                    this.keys.push(evt.keyCode);
                }
            };
            CarProps.prototype.onKeyUp = function (evt) {
                //Otherwise, remove from keys list
                this.keys.splice(this.keys.indexOf(evt.keyCode), 1);
            };
            CarProps.prototype.readKeyboardInput = function () {
                for (var i = 0; i < this.keys.length; i++) {
                    switch (this.keys[i]) {
                        case 38:// Up
                            this.accel += FF91.Accel;
                            // Simulate wind resistance as we reach top speed
                            this.accel *= utils_1.normalizeQuadIn(this.speed, FF91.MaxVel, FF91.MaxVel - 10);
                            break;
                        case 40:// Down
                            this.accel += FF91.Decel;
                            this.braking = 1;
                            break;
                        case 37:// Left
                            this.wAngleTarg += FF91.MaxTurn;
                            break;
                        case 39:// Right
                            this.wAngleTarg -= FF91.MaxTurn;
                            break;
                    }
                }
            };
            /////////////////////////////// JOYSTICK EVENTS ///////////////////////////////
            CarProps.prototype.onJoystickMove = function (_vec) {
                this.joyVec.x = _vec.x / -40;
                this.joyVec.y = _vec.y / -40;
                if (Math.abs(this.joyVec.x) > 0.85) {
                    this.joyVec.y = 0;
                }
                if (Math.abs(this.joyVec.y) > 0.95) {
                    this.joyVec.x = 0;
                }
            };
            CarProps.prototype.readJoyStickInput = function () {
                this.wAngleTarg = this.joyVec.x * FF91.MaxTurn;
                //Accelerating
                if (this.joyVec.y >= 0) {
                    this.accel = this.joyVec.y * FF91.Accel;
                    // Simulate wind resistance as we reach top speed
                    this.accel *= utils_1.normalizeQuadIn(this.speed, FF91.MaxVel, FF91.MaxVel - 10);
                    this.braking = 0;
                }
                else {
                    this.accel = this.joyVec.y * -FF91.Decel;
                    this.braking = 1;
                }
            };
            /////////////////////////////// UPDATE ///////////////////////////////
            CarProps.prototype.update = function (_time) {
                // Update time, skips according to FPS
                if (this.time.update(_time) === false) {
                    return false;
                }
                this.accel = 0;
                this.braking = 0;
                this.wAngleTarg = 0;
                if (this.keys.length > 0) {
                    this.readKeyboardInput();
                }
                else if (this.joyVec.x != 0 || this.joyVec.y != 0) {
                    this.readJoyStickInput();
                }
                ///////////////// PHYSICS, YO! /////////////////
                this.accel *= this.time.delta;
                this.speed += this.accel;
                if (this.speed < 0) {
                    this.speed = 0;
                    this.accel = 0;
                }
                this.frameDist = this.speed * this.time.delta;
                // Limit turn angle as speed increases
                this.wAngleTarg *= utils_1.normalizeQuadIn(this.speed, FF91.MaxVel + 10.0, 3.0);
                this.wAngleInner = utils_1.zTween(this.wAngleInner, this.wAngleTarg, this.time.delta * 2);
                this.wAngleSign = this.wAngleInner > 0.001 ? 1 : this.wAngleInner < -0.001 ? -1 : 0;
                // Theta is based on speed, wheelbase & wheel angle
                this.omega = this.wAngleInner * this.speed / FF91.WheelBase;
                this.theta += this.omega * this.time.delta;
                // Calc this frame's XY velocity
                this.velocity.set(Math.cos(this.theta) * this.frameDist, -Math.sin(this.theta) * this.frameDist);
                // Add velocity to total position
                this.pos.add(this.velocity);
                // Fake some momentum
                this.longitMomentum = utils_1.zTween(this.longitMomentum, this.accel / this.time.delta, this.time.delta * 6);
                this.lateralMomentum = this.omega * this.speed;
                if (this.wAngleSign) {
                    // Calculate 4 wheel turning radius if angle
                    this.radFrontIn = FF91.WheelBase / Math.sin(this.wAngleInner);
                    this.radBackIn = FF91.WheelBase / Math.tan(this.wAngleInner);
                    this.radBackOut = this.radBackIn + (FF91.WheelTrack * this.wAngleSign);
                    this.wAngleOuter = Math.atan(FF91.WheelBase / this.radBackOut);
                    this.radFrontOut = FF91.WheelBase / Math.sin(this.wAngleOuter);
                }
                else {
                    // Otherwise, just assign a very large radius.
                    this.radFrontOut = 100;
                    this.radBackOut = 100;
                    this.radBackIn = 100;
                    this.radFrontIn = 100;
                    this.wAngleOuter = 0;
                }
                return true;
            };
            return CarProps;
        }());
        exports.CarProps = CarProps;


        /***/
    }),
/* 2 */
/***/ (function (module, exports, __webpack_require__) {

        "use strict";

        Object.defineProperty(exports, "__esModule", { value: true });
        var Joystick_1 = __webpack_require__(25);
        var gimbal_1 = __webpack_require__(19);
        var model_1 = __webpack_require__(28);
        var raycaster_1 = __webpack_require__(21);
        var preloader_1 = __webpack_require__(20);
        var Controls = /** @class */ (function () {
            // 01: Build controller
            function Controls() {
                // User viewing modes
                this.introComplete = false; // Tracks intro or main view
                this.modeVR = false; // Uses stereoscopic view
                this.modeOrbit = false; // Uses gyro to orbit camera
                // Device features
                this.deviceTouch = undefined; // Is it a touch device
                this.deviceAccel = false; // Does it have accelerometer data?
                this.zoom = 1;
                TweenLite.defaultEase = Power2.easeInOut;
                this.pageMain = document.getElementById("pageMain");
                this.model = new model_1.default(this.pageMain);
                this.mouseTap = new THREE.Vector2(1000, 1000);
                // Check if it's touch device
                this.hammer = new Hammer(this.pageMain);
                this.refHammerPan = this.rippleTouch.bind(this);
                this.hammer.get("pan").set({ direction: Hammer.DIRECTION_ALL, threshold: 3 });
                this.hammer.on("hammer.input", this.refHammerPan);
                window.addEventListener("resize", this.onWindowResize.bind(this), false);
                // Check if it has accelerometer data
                this.accelTestReference = this.acceleromTest.bind(this);
                window.addEventListener("deviceorientation", this.accelTestReference);
                this.ray = new raycaster_1.default(this.model.monoc.camera);
                this.preload();
            }
            /////////////////////////////////////// INTRO SEQUENCE ////////////////////////////////////////
            // 02: Start asset preload
            Controls.prototype.preload = function () {
                var manifesto = [
                    // Cube textures
                    { name: "envReflection", type: "cubetexture", ext: "jpg" },
                    { name: "envSkybox", type: "cubetexture", ext: "jpg" },
                    // Car lights
                    { name: "flareHead", type: "texture", ext: "jpg" },
                    { name: "flareTurn", type: "texture", ext: "jpg" },
                    { name: "lightTurn", type: "texture", ext: "jpg" },
                    { name: "lightStop", type: "texture", ext: "jpg" },
                    // Car geometry
                    { name: "vrBodyCompiled", type: "mesh", ext: "json" },
                    { name: "vrWheelBrakes", type: "mesh", ext: "json" },
                    // Other
                    { name: "thread", type: "texture", ext: "jpg" },
                    { name: "shadow", type: "texture", ext: "jpg" },
                    { name: "icoBtns", type: "texture", ext: "png" },
                    { name: "icoCtrls", type: "texture", ext: "png" },
                ];
                var path = "../";
                this.preloader = new preloader_1.Preloader(path, manifesto, this);
                window["preloader"] = this.preloader;
                this.preloader.start();
                this.model.introPreloading();
            };
            // 03: Preloading has completed, wait for input
            Controls.prototype.preloadComplete = function (_cargo) {
                this.model.introPreloaded(_cargo);
                this.introComplete = true;
                // Create tap listener
                this.refHammerTap = this.introAnimation.bind(this);
                this.hammer.on("tap", this.refHammerTap);
            };
            // 04: Tap received, play intro animation
            Controls.prototype.introAnimation = function (evt) {
                // Determines touch device
                if (typeof this.deviceTouch === "undefined") {
                    this.hammerCheckTouch(evt);
                }
                // Remove intro hammer listeners
                this.hammer.off("tap", this.refHammerTap);
                this.hammer.off("hammer.input", this.refHammerPan);
                this.model.introStart();
                this.preloader.remove();
                TweenLite.delayedCall(3.0, this.initControls.bind(this));
            };
            // 05: Intro animation complete, initiate controls
            Controls.prototype.initControls = function (evt) {
                this.joystick = new Joystick_1.default();
                this.gimbal = new gimbal_1.default();
                this.initKeyboard();
                this.initButtons();
                this.initHammer();
                // Window events
                this.pageMain.addEventListener("wheel", this.gestureWheel.bind(this));
                window.addEventListener("deviceorientation", this.accelerometerMove.bind(this));
                window.addEventListener("orientationchange", this.onDeviceReorientation.bind(this));
                this.onDeviceReorientation();
                // HUD for mobile		
                this.mobHUDTilt = document.getElementById("mobileHUDTilt");
                this.mobHUDTouch = document.getElementById("mobileHUDTouch");
                // Show on-screen controls
                if (this.deviceTouch === false) {
                    var ctrls = document.getElementsByClassName("ctrls");
                    for (var i = 0; i < ctrls.length; i++) {
                        ctrls[i].style.opacity = "1";
                    }
                }
                else {
                    this.showHUD();
                }
            };
            Controls.prototype.showHUD = function () {
                this.mobHUDTilt.style.opacity = "1";
                this.mobHUDTouch.style.opacity = "1";
                TweenLite.delayedCall(3, this.hideHUD.bind(this));
            };
            Controls.prototype.hideHUD = function () {
                this.mobHUDTilt.style.opacity = "0";
                this.mobHUDTouch.style.opacity = "0";
            };
            /////////////////////////////////////// HAMMER CONTROLS ////////////////////////////////////////
            // Raycasts for ripples
            Controls.prototype.rippleTouch = function (evt) {
                if (evt.isFinal === false) {
                    this.raycast(evt);
                }
            };
            // Checks if it's touch or mouse
            Controls.prototype.hammerCheckTouch = function (evt) {
                switch (evt.pointerType) {
                    case "mouse":
                        this.deviceTouch = false;
                        break;
                    case "touch":
                    default:
                        this.deviceTouch = true;
                        break;
                }
            };
            Controls.prototype.initHammer = function () {
                if (this.deviceTouch) {
                    // Enables pinch & joystick controls
                    this.hammer.get("pinch").set({ enable: true });
                    this.hammer.on("hammer.input", this.hammerInput.bind(this));
                    this.hammer.on("pinchstart", this.hammerPinchStart.bind(this));
                    this.hammer.on("pinch", this.hammerPinch.bind(this));
                }
                else {
                    // Enables camera orbit controls
                    this.hammer.get("pan").set({ direction: Hammer.DIRECTION_ALL, threshold: 1 });
                    this.hammer.on("pan", this.hammerPan.bind(this));
                }
            };
            Controls.prototype.hammerPan = function (event) {
                this.model.cam.orbitBy(event.velocityX, event.velocityY);
            };
            Controls.prototype.hammerPinchStart = function (event) {
                this.zoom = this.model.cam.distTarget;
            };
            Controls.prototype.hammerPinch = function (event) {
                this.model.cam.distTarget = this.zoom / event.scale;
            };
            Controls.prototype.hammerInput = function (event) {
                if (this.modeVR === false) {
                    this.model.props.onJoystickMove(this.joystick.gestureInput(event));
                }
            };
            Controls.prototype.raycast = function (event) {
                this.mouseTap.x = (event.pointers[0].clientX / this.model.vpW) * 2 - 1;
                this.mouseTap.y = (event.pointers[0].clientY / this.model.vpH) * -2 + 1;
                var pos = this.ray.rayCast(this.mouseTap);
                if (typeof pos !== "boolean") {
                    this.model.grid.moveRippleOrigin(pos.x, pos.z);
                }
            };
            /////////////////////////////////////// KEYBOARD CONTROLS ////////////////////////////////////////
            Controls.prototype.initKeyboard = function () {
                window.addEventListener("keydown", this.model.props.onKeyDown.bind(this.model.props), false);
                window.addEventListener("keyup", this.model.props.onKeyUp.bind(this.model.props), false);
            };
            /////////////////////////////////////// VR/FS BUTTON CONTROLS ////////////////////////////////////////
            Controls.prototype.initButtons = function () {
                // DOM Buttons
                this.btnVR = document.getElementById("btnVR");
                this.btnVRO = document.getElementById("btnVRO");
                this.btnVREsc = document.getElementById("btnVREsc");
                this.btnEnterF = document.getElementById("btnEnterFull");
                this.btnExitF = document.getElementById("btnExitFull");
                // VR mode only works with accelerometer data
                if (this.deviceAccel) {
                    this.modeOrbit = true;
                    this.btnVR.style.display = "block";
                    this.btnVRO.style.display = "block";
                    this.btnVR.addEventListener("click", this.enterVRMode.bind(this));
                    this.btnVRO.addEventListener("click", this.enterVROrbitMode.bind(this));
                    this.btnVREsc.addEventListener("click", this.exitVRMode.bind(this));
                    this.noSleep = new NoSleep();
                }
                // Fullscreen features don't work on iOS devices
                if (!/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) {
                    this.btnEnterF.style.display = "block";
                    this.btnExitF.addEventListener("click", this.fullScreenExit.bind(this));
                    this.btnEnterF.addEventListener("click", this.fullScreenEnter.bind(this));
                    document.addEventListener('fullscreenchange', this.fullScreenChanged.bind(this), false);
                    document.addEventListener('MSFullscreenChange', this.fullScreenChanged.bind(this), false);
                    document.addEventListener('mozfullscreenchange', this.fullScreenChanged.bind(this), false);
                    document.addEventListener('webkitfullscreenchange', this.fullScreenChanged.bind(this), false);
                }
            };
            Controls.prototype.enterVRMode = function () {
                if (this.modeVR == true) {
                    return;
                }
                this.modeVR = true;
                this.modeOrbit = false;
                this.hideHUD();
                this.changedVRMode();
                this.noSleep.enable();
            };
            Controls.prototype.enterVROrbitMode = function () {
                if (this.modeVR == true) {
                    return;
                }
                this.modeVR = true;
                this.modeOrbit = true;
                this.hideHUD();
                this.changedVRMode();
                this.noSleep.enable();
            };
            Controls.prototype.exitVRMode = function () {
                if (this.modeVR == false) {
                    return;
                }
                this.modeVR = false;
                this.modeOrbit = true;
                this.model.props.joyVec.set(0, 0);
                this.changedVRMode();
                this.showHUD();
                this.noSleep.disable();
            };
            Controls.prototype.changedVRMode = function () {
                // Buttons
                this.btnVR.style.display = this.modeVR ? "none" : "block";
                this.btnVRO.style.display = this.modeVR ? "none" : "block";
                this.btnVREsc.style.display = this.modeVR ? "block" : "none";
                this.model.toggleStereo(this.modeVR, this.modeOrbit);
            };
            /////////////////////////////////////// FULL SCREEN EVENTS ////////////////////////////////////////
            Controls.prototype.fullScreenChanged = function () {
                if (document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement == false) {
                    // Entered full screen
                    this.btnExitF.style.display = "block";
                    this.btnEnterF.style.display = "none";
                }
                else {
                    // Exited full screen
                    this.btnExitF.style.display = "none";
                    this.btnEnterF.style.display = "block";
                }
            };
            Controls.prototype.fullScreenEnter = function () {
                if (this.pageMain.webkitRequestFullscreen) {
                    this.pageMain.webkitRequestFullscreen();
                }
                else if (this.pageMain.mozRequestFullScreen) {
                    this.pageMain.mozRequestFullScreen();
                }
                else {
                    this.pageMain.requestFullscreen();
                }
            };
            Controls.prototype.fullScreenExit = function () {
                if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
                else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                }
                else {
                    document.exitFullscreen();
                }
            };
            /////////////////////////////////////// ACCELEROMETER EVENTS ////////////////////////////////////////
            // Tests if accelerometer data is available
            Controls.prototype.acceleromTest = function (event) {
                if ((typeof event.alpha != "undefined") && (typeof event.beta != "undefined") && (typeof event.gamma != "undefined")) {
                    this.deviceAccel = true;
                }
                window.removeEventListener("deviceorientation", this.accelTestReference);
            };
            // Device is moved
            Controls.prototype.accelerometerMove = function (event) {
                if (this.modeOrbit === true) {
                    // Gyro data controls camera
                    this.model.cam.onGyroMove(event.alpha, event.beta, event.gamma);
                }
                else {
                    // Gyro data controls car commands
                    this.gimbal.onGyroMove(event.alpha, event.beta, event.gamma);
                    if (Math.abs(this.gimbal.roll) > 5) {
                        this.model.props.joyVec.x = THREE.Math.clamp(-this.gimbal.roll / 25, -1, 1);
                    }
                    else {
                        this.model.props.joyVec.x = 0;
                    }
                    this.model.props.joyVec.y = THREE.Math.clamp((this.gimbal.attack + 20) / 30, -1, 1);
                }
            };
            /////////////////////////////////////// WINDOW EVENTS ////////////////////////////////////////
            // User scrolls down
            Controls.prototype.gestureWheel = function (event) {
                // Dolly cam
                switch (event.deltaMode) {
                    case 0:
                        this.model.cam.dolly(event.deltaY * 0.2);
                        break;
                    case 1:
                        this.model.cam.dolly(event.deltaY * 20);
                        break;
                    case 2:
                        this.model.cam.dolly(event.deltaY * 40);
                        break;
                }
            };
            // Change between portrait/landscape
            Controls.prototype.onDeviceReorientation = function () {
                this.model.deviceAngle = 0;
                if (window.orientation) {
                    this.model.deviceAngle = parseInt(window.orientation.toString(), 10) * -1;
                }
                this.model.cam.onDeviceReorientation(this.model.deviceAngle);
                this.gimbal.onDeviceReorientation(this.model.deviceAngle);
            };
            // Browser window resize
            Controls.prototype.onWindowResize = function () {
                this.model.onWindowResize();
            };
            Controls.prototype.update = function (t) {
                if (this.introComplete === false) {
                    this.model.updateIntro(t);
                }
                else {
                    this.model.update(t, this.modeVR);
                }
            };
            return Controls;
        }());
        exports.default = Controls;


        /***/
    }),
/* 3 */
/***/ (function (module, exports) {

        module.exports = "uniform vec3 color;\nuniform sampler2D texture;\n\nvarying float opacity;\n\n// Normalizes a value between 0 - 1\nfloat normFloat(float n, float minVal, float maxVal){\n    return max(0.0, min(1.0, (n-minVal) / (maxVal-minVal)));\n}\n\nvoid main() {\n\t// Additive\n    gl_FragColor = texture2D( texture, gl_PointCoord);\n    gl_FragColor.a = normFloat(opacity, 0.01, 0.1);\n}"

        /***/
    }),
/* 4 */
/***/ (function (module, exports) {

        module.exports = "#define PI 3.1415926\n\nuniform float vpH;\nuniform float size;\nuniform float brightness;\nvarying float opacity;\n\n// Normalizes a value between 0 - 1\nfloat normFloat(float n, float minVal, float maxVal){\n    return max(0.0, min(1.0, (n-minVal) / (maxVal-minVal)));\n}\n\nvoid main() {\n    vec4 realPos = modelMatrix * vec4(position, 1.0);\n    vec3 realNorm = normalize(vec3(modelMatrix * vec4(normal, 0.0)));\n\n    vec3 lightVector = normalize(cameraPosition - realPos.xyz);\n    opacity = dot(realNorm, lightVector);\n    opacity = normFloat(opacity, 0.5, 1.0) * brightness;\n\n    vec4 mvPosition = viewMatrix * realPos;\n    gl_Position = projectionMatrix * mvPosition;\n    gl_PointSize = max((vpH * size / -mvPosition.z) * opacity, 0.0);\n}"

        /***/
    }),
/* 5 */
/***/ (function (module, exports) {

        module.exports = "#define RED vec3(1.0, 0.1, 0.1) // red\n#define AMB vec3(1.0, 0.6, 0.1)\t// amber\n#define WHT vec3(1.0, 1.0, 1.0)\t// white\n\nvarying float wht;\nvarying float amb;\n\nvoid main() {\n\tgl_FragColor = vec4((WHT * wht + AMB * amb), 1.0);\n}"

        /***/
    }),
/* 6 */
/***/ (function (module, exports) {

        module.exports = "float normFloat(float n, float minVal, float maxVal){\n\treturn max(0.0, min(1.0, (n-minVal) / (maxVal-minVal)));\n}\n\n// Returns 1 if type matches val, 0 if not\nfloat checkType(float type, float val){\n\treturn step(val - 0.1, type) * step(type, val + 0.1);\n}\n\nuniform vec3 lightsT;\nuniform vec3 lightsO;\nattribute float type;\nvarying float wht;\nvarying float amb;\n\n// z-up position because Blender is weird like that\nvoid main() {\n\tvec2 posXY = vec2(position.y - 2299.0, position.z - 1355.0);\n\tfloat distOrigin = distance(posXY, vec2(0.0));   // FF Logo\n\n\t// 0: Daytime running lights\n\twht = checkType(type, 0.0);\n\t\n\t// 1: nightlights\n\twht += checkType(type, 1.0) * lightsO.y;\n\t\n\t// 2: high beams\n\twht += checkType(type, 2.0) * lightsO.z;\n\t\n\t// 3: right turn signal\n\twht += checkType(type, 3.0) * (1.0 - lightsT.x);\n\tamb = checkType(type, 3.0) * lightsT.z;\n\t\n\t// 4: left turn signal\n\twht += checkType(type, 4.0) * (1.0 + lightsT.x);\n\tamb += checkType(type, 4.0) * lightsT.y;\n\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );\n}"

        /***/
    }),
/* 7 */
/***/ (function (module, exports) {

        module.exports = "varying float brightness;\nvarying vec2 vUV;\n\n// Normalizes a value between 0 - 1\nfloat normFloat(float n, float minVal, float maxVal){\n    return max(0.0, min(1.0, (n-minVal) / (maxVal-minVal)));\n}\n\nvoid main() {\n\tvUV = uv;\n    vec4 realPos = modelMatrix * vec4(position, 1.0);\n    vec3 realNorm = normalize(vec3(modelMatrix * vec4(normal, 0.0)));\n\n    vec3 lightVector = normalize(cameraPosition - realPos.xyz);\n    float diffuse = dot(realNorm, lightVector);\n    brightness = normFloat(diffuse, 0.0, 0.5);\n\n    vec4 mvPosition = viewMatrix * realPos;\n    gl_Position = projectionMatrix * mvPosition;\n}"

        /***/
    }),
/* 8 */
/***/ (function (module, exports) {

        module.exports = "#define NIGHTLIGHT 0.4\n\nfloat normFloat(float n, float minVal, float maxVal){\n\treturn max(0.0, min(1.0, (n-minVal) / (maxVal-minVal)));\n}\n\n// Returns 1 if type matches val, 0 if not\nfloat checkType(float type, float val){\n\treturn step(val - 0.1, type) * step(type, val + 0.1);\n}\n\nuniform vec3 lightsT;\nuniform vec3 lightsO;\nattribute float type;\nvarying float red;\nvarying float amb;\nvarying float wht;\nvarying float brightness;\n\nvoid main(){\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );\n\n \tvec3 realPos = vec3(modelMatrix * vec4(position, 1.0));\n\tvec3 realNorm = normalize(vec3(modelMatrix * vec4(normal, 0.0)));\n\n\tvec3 lightVector = normalize(cameraPosition - realPos);\n\tbrightness = dot(realNorm, lightVector);\n\tbrightness = normFloat(brightness, 0.3, 0.2) + 0.5;\n\tbrightness *= brightness * brightness;\n\t\n\t// Type 0: FF logo\t\n\tred = checkType(type, 0.0);\n\t// FF brightens on stop light\n\tred += red * lightsO.x;\n\n\t// Type 1: center grid\n\tred += checkType(type, 1.0) * NIGHTLIGHT;\n\n\t// Type 2: Right blinker\n\tred += (checkType(type, 2.0) * NIGHTLIGHT) * step(lightsT.x, 0.0);\n\tamb = checkType(type, 2.0) * lightsT.z;\n\n\t// Type 3: Left blinker\n\tred += (checkType(type, 3.0) * NIGHTLIGHT) * step(0.0, lightsT.x);\n\tamb += checkType(type, 3.0) * lightsT.y;\n\t\n\tbrightness = clamp(brightness, 0.0, 1.0);\n}"

        /***/
    }),
/* 9 */
/***/ (function (module, exports) {

        module.exports = "#define RED vec3(1.0, 0.1, 0.1) // red\n#define AMB vec3(1.0, 0.6, 0.1)\t// amber\n#define WHT vec3(1.0, 1.0, 1.0)\t// white\n\nvarying float red;\nvarying float amb;\nvarying float wht;\nvarying float brightness;\n\nvoid main() {\n\tgl_FragColor = vec4((RED * red + AMB * amb) * brightness, 1.0);\n}"

        /***/
    }),
/* 10 */
/***/ (function (module, exports) {

        module.exports = "#define NIGHTLIGHT 0.4\n\nfloat normFloat(float n, float minVal, float maxVal){\n\treturn max(0.0, min(1.0, (n-minVal) / (maxVal-minVal)));\n}\n\n// Returns 1 if type matches val, 0 if not\nfloat checkType(float type, float val){\n\treturn step(val - 0.1, type) * step(type, val + 0.1);\n}\n\nuniform vec3 lightsT;\nuniform vec3 lightsO;\nattribute float type;\nvarying float red;\nvarying float amb;\nvarying float wht;\nvarying float brightness;\n\nvoid main(){\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );\n\tbrightness = 1.0;\n\n\t// Type 0: Reverse light?\n\n\t// Type 1: Right blinker\n\tamb = checkType(type, 1.0) * lightsT.z;\n\n\t// Type 2: Left blinker\n\tamb += checkType(type, 2.0) * lightsT.y;\n\n\t// Type 3: Side brakelights & side nightlights\n\tred = checkType(type, 3.0) * (NIGHTLIGHT + lightsO.x * (1.0 - NIGHTLIGHT));\n\n\t// Type 4: Center brakelight\n\tred += checkType(type, 4.0) * lightsO.x;\n\n\t// Type 5: Center nightlight\n\tred += checkType(type, 5.0) * NIGHTLIGHT;\n\n\t// Type 6: Lower foglights off\n\tred += checkType(type, 6.0) * NIGHTLIGHT * 0.2;\n\n\t// Type 7: Lower foglights on\n\tred += checkType(type, 7.0) * NIGHTLIGHT * 1.5;\n}"

        /***/
    }),
/* 11 */
/***/ (function (module, exports) {

        module.exports = "uniform sampler2D texture;\nvarying float brightness;\nvarying vec2 vUV;\n\n// Normalizes a value between 0 - 1\nfloat normFloat(float n, float minVal, float maxVal){\n    return max(0.0, min(1.0, (n-minVal) / (maxVal-minVal)));\n}\n\nvoid main() {\n\t// Additive\n    gl_FragColor = texture2D( texture, vUV) * brightness;\n\n\t// Subtractive\n\t// gl_FragColor = texture2D( texture, gl_PointCoord ) - vec4( color, 1.0 );\n\t// gl_FragColor *= opacity;\n\n\t// Multip\n\t/* gl_FragColor = -texture2D( texture, gl_PointCoord ) * opacity;\n\tgl_FragColor *= 1.0 - vec4( color, 1.0 );\n\tgl_FragColor += 1.0; */\n}"

        /***/
    }),
/* 12 */
/***/ (function (module, exports) {

        module.exports = "uniform vec3 lightsT;\nvarying float brightness;\nvarying vec2 vUV;\n\n// Normalizes a value between 0 - 1\nfloat normFloat(float n, float minVal, float maxVal){\n    return max(0.0, min(1.0, (n-minVal) / (maxVal-minVal)));\n}\n\nvoid main() {\n\tvUV = uv;\n    vec4 realPos = modelMatrix * vec4(position, 1.0);\n    vec3 realNorm = normalize(vec3(modelMatrix * vec4(normal, 0.0)));\n\n    vec3 lightVector = normalize(cameraPosition - realPos.xyz);\n    float diffuse = dot(realNorm, lightVector);\n    brightness = step(2000.0, position.y) * lightsT.z + step(position.y, 2000.0) * lightsT.y;\n    brightness *= normFloat(diffuse, 0.0, 0.5);\n\n    vec4 mvPosition = viewMatrix * realPos;\n    gl_Position = projectionMatrix * mvPosition;\n}"

        /***/
    }),
/* 13 */
/***/ (function (module, exports) {

        module.exports = "uniform sampler2D led;\nuniform vec3 color;\n\nvarying float opacity;\nvarying float diag;\n\nvoid main() {\n\t// Multiplicative\n    // gl_FragColor = -texture2D( led, vec2(abs(diag - gl_PointCoord.x), gl_PointCoord.y )) * opacity;\n    // gl_FragColor += 1.0;\n\n\t// Additive\n    gl_FragColor = texture2D( led, vec2(abs(diag - gl_PointCoord.x), gl_PointCoord.y )) * vec4(color, opacity);\n}"

        /***/
    }),
/* 14 */
/***/ (function (module, exports) {

        module.exports = "#define PI 3.1415926\n\nattribute float diagonal;\n\nuniform sampler2D heightmap;\nuniform float vpH;\nuniform vec2 origin;\nuniform float prog;\n\nvarying float opacity;\nvarying float diag;\n\n// Normalizes a value between 0 - 1\nfloat normFloat(float n, float minVal, float maxVal){\n\treturn max(0.0, min(1.0, (n-minVal) / (maxVal-minVal)));\n}\n\nvoid main() {\tdiag = diagonal;\n\tfloat fluctuation = -texture2D(heightmap, uv).r;\n\n\t// Endless threadmill\n\tvec3 newPos = position;\n\tnewPos.xz -= origin;\n\tnewPos.x = (fract((newPos.x + RANGE) / RANGE2) * RANGE2) - RANGE;\n\tnewPos.z = (fract((newPos.z + RANGE) / RANGE2) * RANGE2) - RANGE;\n\tnewPos.y = fluctuation * 0.5;\n\n\t// Size\n\tfloat size = normFloat(abs(cameraPosition.y), -0.5, 2.0) * 0.25;\n\n\t// Fade out as camera fog\n\tfloat distOrigin = distance(newPos.xz, vec2(-0.5, 0.0));\n\topacity = (fluctuation + 0.5) * normFloat(distOrigin, RANGE, RANGE * 0.5);\n\n\t// Make logo\n\tfloat ffLogo = step(distOrigin, 1.7) * prog;\n\t//newPos.y = max(ffLogo * 0.5, newPos.y);\n\topacity = max(ffLogo, opacity);\n\tsize = max(ffLogo, size);\n\n\t// Position, size    \n\tvec4 mvPosition = modelViewMatrix * vec4(newPos, 1.0 );\n\tgl_Position = projectionMatrix * mvPosition;\n\tgl_PointSize = vpH * size / -mvPosition.z;\n}"

        /***/
    }),
/* 15 */
/***/ (function (module, exports) {

        module.exports = "precision highp float;\nprecision highp int;\n\n#include <common>\n\nuniform vec2 ripplePos;\nuniform float rippleSize;\nuniform float viscosity;\nuniform float rippleImpact;\nuniform sampler2D heightmap;\n\n#define deltaTime ( 1.0 / 60.0 )\n#define GRAVITY_CONSTANT ( resolution.x * deltaTime * 1.0 )\n\nvoid main()\t{\n\n\tvec2 cellSize = 1.0 / resolution.xy;\n\n\tvec2 uv = gl_FragCoord.xy * cellSize;\n\n\t// heightmapValue.x == height\n\t// heightmapValue.y == velocity\n\t// heightmapValue.z, heightmapValue.w not used\n\tvec4 heightmapValue = texture2D( heightmap, uv );\n\n\t// Get neighbours\n\tfloat north = texture2D( heightmap, uv + vec2( 0.0, cellSize.y ) ).r;\n\tfloat south = texture2D( heightmap, uv + vec2( 0.0, - cellSize.y ) ).r;\n\tfloat east = texture2D( heightmap, uv + vec2( cellSize.x, 0.0 ) ).r;\n\tfloat west = texture2D( heightmap, uv + vec2( - cellSize.x, 0.0 ) ).r;\n\n\tfloat sump = north + south + east + west - 4.0 * heightmapValue.x;\n\n\tfloat accel = sump * GRAVITY_CONSTANT;\n\n\t// Dynamics\n\theightmapValue.y += accel;\n\theightmapValue.x += heightmapValue.y * deltaTime;\n\n\t// Viscosity\n\theightmapValue.x += sump * viscosity;\n\n\t// Mouse influence\n\tfloat mousePhase = clamp( \n\t\tlength(( uv - vec2( 0.5 ) ) * BOUNDS - vec2( ripplePos.x, - ripplePos.y ) ) * PI / rippleSize, \n\t\t0.0, \n\t\tPI\n\t);\n\theightmapValue.x += (cos( mousePhase ) + 1.0) * rippleImpact;\n\n\t// Bring X back to 0 over time to prevent endless growth\n\theightmapValue.x *= 0.998;\n\n\t// gl_FragColor = vec4(heightmapValue.x, 0.0, 0.0, 1.0);\n\tgl_FragColor = heightmapValue;\n}"

        /***/
    }),
/* 16 */
/***/ (function (module, exports) {

        module.exports = "precision highp float;\nprecision highp int;\n\nattribute vec3 position;\nattribute vec2 uv;\nvarying vec2 vUv;\n\nvoid main() {\n\tvUv = uv;\n\tgl_Position = vec4(position, 1.0);\n}"

        /***/
    }),
/* 17 */
/***/ (function (module, exports, __webpack_require__) {

        "use strict";

        Object.defineProperty(exports, "__esModule", { value: true });
        // Binocular class
        // Works just like camera.ts, but with 2 perspective cameras
        // to simulate stereoscopic vision
        var Binocs = /** @class */ (function () {
            function Binocs(options) {
                // Default options
                this.options = {
                    distance: 90,
                    focusPos: new THREE.Vector3(),
                    rotation: new THREE.Vector3(),
                    distRange: {
                        max: Number.POSITIVE_INFINITY,
                        min: Number.NEGATIVE_INFINITY
                    },
                    fov: 45,
                    eyeSeparation: 1.5
                };
                // Replace defaults with custom options
                for (var key in options) {
                    if (key === "distRange") {
                        for (var key in options.distRange) {
                            this.options.distRange[key] = options.distRange[key];
                        }
                    }
                    else {
                        this.options[key] = options[key];
                    }
                }
                // Set attributes from options
                this.distActual = this.options.distance;
                this.distTarget = this.options.distance;
                this.focusActual = this.options.focusPos.clone();
                this.focusTarget = this.options.focusPos.clone();
                this.rotActual = this.options.rotation.clone();
                this.rotTarget = this.options.rotation.clone();
                this.vpW = window.innerWidth;
                this.vpH = window.innerHeight;
                // Camera setup
                this.binoculars = new THREE.Object3D();
                this.lensL = new THREE.PerspectiveCamera(this.options.fov, (this.vpW / 2) / this.vpH, 0.1, 100);
                this.lensR = new THREE.PerspectiveCamera(this.options.fov, (this.vpW / 2) / this.vpH, 0.1, 100);
                this.lensL.position.setX(-this.options.eyeSeparation / 2);
                this.lensR.position.setX(this.options.eyeSeparation / 2);
                this.binoculars.add(this.lensL);
                this.binoculars.add(this.lensR);
                // Helpers to calculate rotations
                this.radians = Math.PI / 180;
                this.quatX = new THREE.Quaternion();
                this.quatY = new THREE.Quaternion();
                this.gyro = {
                    orient: 0
                };
                // Set default orientation for accelerator rotations
                if (typeof window.orientation !== "undefined") {
                    this.defaultEuler = new THREE.Euler(90 * this.radians, 180 * this.radians, (180 + parseInt(window.orientation.toString(), 10)) * this.radians);
                }
                else {
                    this.defaultEuler = new THREE.Euler(0, 0, 0);
                }
                this.addVignette();
            }
            // Adds black shape around edges of each lens
            Binocs.prototype.addVignette = function () {
                var outer = 0.05;
                var edge = outer * 0.8;
                var corner = outer * 0.75;
                // Make outer square
                var shape = new THREE.Shape();
                shape.moveTo(-outer, -outer);
                shape.lineTo(outer, -outer);
                shape.lineTo(outer, outer);
                shape.lineTo(-outer, outer);
                shape.closePath();
                // Make inner shape
                var hole = new THREE.Path();
                hole.moveTo(-corner, -corner);
                hole.bezierCurveTo(-edge, 0, -edge, 0, -corner, corner);
                hole.bezierCurveTo(0, edge, 0, edge, corner, corner);
                hole.bezierCurveTo(edge, 0, edge, 0, corner, -corner);
                hole.bezierCurveTo(0, -edge, 0, -edge, -corner, -corner);
                // Carve inner shape out of outer square
                shape.holes.push(hole);
                this.vigGeom = new THREE.ShapeGeometry(shape, 6);
                this.vigMat = new THREE.MeshBasicMaterial({
                    color: 0x000000,
                    depthTest: false,
                    depthWrite: false,
                    transparent: true,
                });
                this.vignetteL = new THREE.Mesh(this.vigGeom, this.vigMat);
                this.vignetteR = this.vignetteL.clone();
                this.vignetteL.position.set(-this.options.eyeSeparation / 2, 0, -0.11);
                this.vignetteR.position.set(this.options.eyeSeparation / 2, 0, -0.11);
                this.vignetteL.scale.set(this.vpW / 2 / this.vpH, 1, 1);
                this.vignetteR.scale.set(this.vpW / 2 / this.vpH, 1, 1);
                this.binoculars.add(this.vignetteL);
                this.binoculars.add(this.vignetteR);
            };
            /////////////////////////////////////// SET ATTRIBUTES ///////////////////////////////////////
            // Sets distance from focusPos
            Binocs.prototype.setDistance = function (dist) {
                if (dist === void 0) { dist = 150; }
                this.distActual = dist;
                this.distTarget = dist;
            };
            // Sets angle of rotation
            Binocs.prototype.setRotation = function (_rotX, _rotY, _rotZ) {
                if (_rotX === void 0) { _rotX = 0; }
                if (_rotY === void 0) { _rotY = 0; }
                if (_rotZ === void 0) { _rotZ = 0; }
                this.rotActual.set(_rotX, _rotY, _rotZ);
                this.rotTarget.set(_rotX, _rotY, _rotZ);
                this.gyro.alpha = undefined;
                this.gyro.beta = undefined;
                this.gyro.gamma = undefined;
            };
            // Sets focus position
            Binocs.prototype.setFocusPos = function (_posX, _posY, _posZ) {
                if (_posX === void 0) { _posX = 0; }
                if (_posY === void 0) { _posY = 0; }
                if (_posZ === void 0) { _posZ = 0; }
                this.focusActual.set(_posX, _posY, _posZ);
                this.focusTarget.set(_posX, _posY, _posZ);
            };
            /////////////////////////////////////// MOTION ///////////////////////////////////////
            // Camera travels away or toward focusPos
            Binocs.prototype.dolly = function (distance) {
                this.distTarget += distance / 100;
                this.distTarget = THREE.Math.clamp(this.distTarget, this.options.distRange.min, this.options.distRange.max);
                // console.log(this.distTarget);
            };
            // Camera orbits by an angle amount
            Binocs.prototype.orbitBy = function (angleX, angleY) {
                this.rotTarget.x += angleX;
                this.rotTarget.y += angleY;
                // console.log(this.rotTarget);
            };
            // Camera orbits to an angle
            Binocs.prototype.orbitTo = function (angleX, angleY) {
                this.rotTarget.x = angleX;
                this.rotTarget.y = angleY;
                // console.log(this.rotTarget);
            };
            // FocusPos moves along the XY axis
            Binocs.prototype.pan = function (distX, distY) {
                this.focusTarget.x -= distX / 10;
                this.focusTarget.y += distY / 10;
                // console.log(this.focusTarget);
            };
            /////////////////////////////////////// DOM EVENTS ///////////////////////////////////////
            // Window resize triggered
            Binocs.prototype.onWindowResize = function (vpW, vpH) {
                this.vpW = vpW;
                this.vpH = vpH;
                this.lensL.aspect = this.vpW / 2 / this.vpH;
                this.lensL.updateProjectionMatrix();
                this.lensR.aspect = this.vpW / 2 / this.vpH;
                this.lensR.updateProjectionMatrix();
                this.vignetteL.scale.set(this.vpW / 2 / this.vpH, 1, 1);
                this.vignetteR.scale.set(this.vpW / 2 / this.vpH, 1, 1);
            };
            // Landscape-portrait change on mobile devices
            Binocs.prototype.onDeviceReorientation = function (orientation) {
                this.gyro.orient = orientation * this.radians;
            };
            // Set accelerometer data on motion
            Binocs.prototype.onGyroMove = function (alpha, beta, gamma) {
                var acc = this.gyro;
                // Alpha = z axis [0 ,360]
                // Beta = x axis [-180 , 180]
                // Gamma = y axis [-90 , 90]
                acc.alpha = alpha;
                acc.beta = beta;
                acc.gamma = gamma;
            };
            /////////////////////////////////////// UTILS ///////////////////////////////////////
            // Called once per frame
            Binocs.prototype.update = function () {
                // Place camera on focus position
                this.distTarget = THREE.Math.clamp(this.distTarget, this.options.distRange.min, this.options.distRange.max);
                this.distActual += (this.distTarget - this.distActual) * 0.01;
                this.focusActual.lerp(this.focusTarget, 0.05);
                this.binoculars.position.copy(this.focusActual);
                // If accelerometer data present
                if (this.gyro.alpha && this.gyro.beta && this.gyro.gamma) {
                    // Calculate camera rotations
                    this.binoculars.setRotationFromEuler(this.defaultEuler);
                    // this.binoculars.rotation.set(0, 0, 0);
                    this.binoculars.rotateZ(this.gyro.alpha * this.radians);
                    this.binoculars.rotateX(this.gyro.beta * this.radians);
                    this.binoculars.rotateY(this.gyro.gamma * this.radians);
                    this.binoculars.rotation.z += this.gyro.orient;
                }
                else {
                    // Calculate camera rotations
                    this.rotActual.lerp(this.rotTarget, 0.05);
                    this.quatX.setFromAxisAngle(Binocs.axisX, -THREE.Math.degToRad(this.rotActual.y));
                    this.quatY.setFromAxisAngle(Binocs.axisY, -THREE.Math.degToRad(this.rotActual.x));
                    this.quatY.multiply(this.quatX);
                    this.binoculars.quaternion.copy(this.quatY);
                }
                // Set camera distance from focus position
                this.binoculars.translateZ(this.distActual);
            };
            Binocs.prototype.renderStereo = function (renderer, scene) {
                renderer.setScissor(0, 0, this.vpW / 2, this.vpH);
                renderer.setViewport(0, 0, this.vpW / 2, this.vpH);
                renderer.render(scene, this.lensL);
                renderer.setScissor(this.vpW / 2, 0, this.vpW / 2, this.vpH);
                renderer.setViewport(this.vpW / 2, 0, this.vpW / 2, this.vpH);
                renderer.render(scene, this.lensR);
            };
            // X and Y Axes
            Binocs.axisX = new THREE.Vector3(1, 0, 0);
            Binocs.axisY = new THREE.Vector3(0, 1, 0);
            return Binocs;
        }());
        exports.default = Binocs;


        /***/
    }),
/* 18 */
/***/ (function (module, exports, __webpack_require__) {

        "use strict";

        Object.defineProperty(exports, "__esModule", { value: true });
        var CamControl = /** @class */ (function () {
            function CamControl(options) {
                // Default options
                this.options = {
                    fov: 45,
                    distance: 90,
                    distRange: {
                        max: Number.POSITIVE_INFINITY,
                        min: Number.NEGATIVE_INFINITY
                    },
                    focusPos: new THREE.Vector3(),
                    rotation: new THREE.Vector3(),
                    rotRange: {
                        xMax: Number.POSITIVE_INFINITY,
                        xMin: Number.NEGATIVE_INFINITY,
                        yMax: 90,
                        yMin: -90,
                    },
                    eyeSeparation: 0.0 // Ignored
                };
                // Replace defaults with custom options
                for (var key in options) {
                    if (key === "rotRange") {
                        for (var key in options.rotRange) {
                            this.options.rotRange[key] = options.rotRange[key];
                        }
                    }
                    else if (key === "distRange") {
                        for (var key in options.distRange) {
                            this.options.distRange[key] = options.distRange[key];
                        }
                    }
                    else {
                        this.options[key] = options[key];
                    }
                }
                // Set attributes from options
                this.distActual = this.options.distance;
                this.distTarget = this.options.distance;
                this.focusActual = this.options.focusPos.clone();
                this.focusTarget = this.options.focusPos.clone();
                this.rotActual = this.options.rotation.clone();
                this.rotTarget = this.options.rotation.clone();
                var vpW = window.innerWidth;
                var vpH = window.innerHeight;
                this.camera = new THREE.PerspectiveCamera(this.options.fov, vpW / vpH, 0.1, 100);
                // Helpers to calculate rotations
                this.radians = Math.PI / 180;
                this.quatX = new THREE.Quaternion();
                this.quatY = new THREE.Quaternion();
                this.gyro = {
                    orient: 0
                };
                // Set default orientation for accelerator rotations
                if (typeof window.orientation !== "undefined") {
                    this.defaultEuler = new THREE.Euler(90 * this.radians, 180 * this.radians, (180 + parseInt(window.orientation.toString(), 10)) * this.radians);
                }
                else {
                    this.defaultEuler = new THREE.Euler(0, 0, 0);
                }
            }
            /////////////////////////////////////// SET ATTRIBUTES ///////////////////////////////////////
            // Sets distance from focusPos
            CamControl.prototype.setDistance = function (dist) {
                if (dist === void 0) { dist = 150; }
                this.distActual = dist;
                this.distTarget = dist;
            };
            // Sets max and min angles of orbit
            CamControl.prototype.setAngleRange = function (xMax, xMin, yMax, yMin) {
                if (xMax === void 0) { xMax = Number.POSITIVE_INFINITY; }
                if (xMin === void 0) { xMin = Number.NEGATIVE_INFINITY; }
                if (yMax === void 0) { yMax = 90; }
                if (yMin === void 0) { yMin = -90; }
                this.options.rotRange.xMax = xMax;
                this.options.rotRange.xMin = xMin;
                this.options.rotRange.yMax = yMax;
                this.options.rotRange.yMin = yMin;
            };
            // Sets angle of rotation
            CamControl.prototype.setRotation = function (_rotX, _rotY, _rotZ) {
                if (_rotX === void 0) { _rotX = 0; }
                if (_rotY === void 0) { _rotY = 0; }
                if (_rotZ === void 0) { _rotZ = 0; }
                this.rotActual.set(_rotX, _rotY, _rotZ);
                this.rotTarget.set(_rotX, _rotY, _rotZ);
                this.gyro.alpha = undefined;
                this.gyro.beta = undefined;
                this.gyro.gamma = undefined;
            };
            // Sets focus position
            CamControl.prototype.setFocusPos = function (_posX, _posY, _posZ) {
                if (_posX === void 0) { _posX = 0; }
                if (_posY === void 0) { _posY = 0; }
                if (_posZ === void 0) { _posZ = 0; }
                this.focusActual.set(_posX, _posY, _posZ);
                this.focusTarget.set(_posX, _posY, _posZ);
            };
            /////////////////////////////////////// MOTION ///////////////////////////////////////
            // Camera travels away or toward focusPos
            CamControl.prototype.dolly = function (distance) {
                this.distTarget += distance / 100;
                this.distTarget = THREE.Math.clamp(this.distTarget, this.options.distRange.min, this.options.distRange.max);
            };
            // Camera orbits by an angle amount
            CamControl.prototype.orbitBy = function (angleX, angleY) {
                this.rotTarget.x += angleX;
                this.rotTarget.y += angleY;
                this.rotTarget.x = THREE.Math.clamp(this.rotTarget.x, this.options.rotRange.xMin, this.options.rotRange.xMax);
                this.rotTarget.y = THREE.Math.clamp(this.rotTarget.y, this.options.rotRange.yMin, this.options.rotRange.yMax);
            };
            // Camera orbits to an angle
            CamControl.prototype.orbitTo = function (angleX, angleY) {
                this.rotTarget.x = angleX;
                this.rotTarget.y = angleY;
                this.rotTarget.x = THREE.Math.clamp(this.rotTarget.x, this.options.rotRange.xMin, this.options.rotRange.xMax);
                this.rotTarget.y = THREE.Math.clamp(this.rotTarget.y, this.options.rotRange.yMin, this.options.rotRange.yMax);
            };
            // FocusPos moves along the XY axis
            CamControl.prototype.pan = function (distX, distY) {
                this.focusTarget.x -= distX / 10;
                this.focusTarget.y += distY / 10;
            };
            /////////////////////////////////////// DOM EVENTS ///////////////////////////////////////
            // Window resize triggered
            CamControl.prototype.onWindowResize = function (vpW, vpH) {
                this.camera.aspect = vpW / vpH;
                this.camera.updateProjectionMatrix();
            };
            // Landscape-portrait change on mobile devices
            CamControl.prototype.onDeviceReorientation = function (orientation) {
                this.gyro.orient = orientation * this.radians;
            };
            // Set accelerometer data on motion
            CamControl.prototype.onGyroMove = function (alpha, beta, gamma) {
                var acc = this.gyro;
                // Alpha = z axis [0 ,360]
                // Beta = x axis [-180 , 180]
                // Gamma = y axis [-90 , 90]
                acc.alpha = alpha;
                acc.beta = beta;
                acc.gamma = gamma;
            };
            /////////////////////////////////////// UTILS ///////////////////////////////////////
            // Called once per frame
            CamControl.prototype.update = function () {
                // Place camera on focus position
                this.distTarget = THREE.Math.clamp(this.distTarget, this.options.distRange.min, this.options.distRange.max);
                this.distActual += (this.distTarget - this.distActual) * 0.01;
                this.focusActual.lerp(this.focusTarget, 0.05);
                this.camera.position.copy(this.focusActual);
                // If accelerometer data present
                if (this.gyro.alpha && this.gyro.beta && this.gyro.gamma) {
                    // Calculate camera rotations
                    this.camera.setRotationFromEuler(this.defaultEuler);
                    this.camera.rotateZ(this.gyro.alpha * this.radians);
                    this.camera.rotateX(this.gyro.beta * this.radians);
                    this.camera.rotateY(this.gyro.gamma * this.radians);
                    this.camera.rotation.z += this.gyro.orient;
                }
                else {
                    // Calculate camera rotations
                    this.rotActual.lerp(this.rotTarget, 0.05);
                    this.quatX.setFromAxisAngle(CamControl.axisX, -THREE.Math.degToRad(this.rotActual.y));
                    this.quatY.setFromAxisAngle(CamControl.axisY, -THREE.Math.degToRad(this.rotActual.x));
                    this.quatY.multiply(this.quatX);
                    this.camera.quaternion.copy(this.quatY);
                }
                // Set camera distance from focus position
                this.camera.translateZ(this.distActual);
            };
            CamControl.prototype.follow = function (target) {
                // Place camera on focus position
                this.distTarget = THREE.Math.clamp(this.distTarget, this.options.distRange.min, this.options.distRange.max);
                this.distActual += (this.distTarget - this.distActual) * 0.01;
                this.focusTarget.set(target.x, target.y + 1.0, target.z + this.distActual);
                this.focusActual.lerp(this.focusTarget, 0.01);
                this.camera.position.copy(this.focusActual);
                this.camera.lookAt(target);
            };
            // X and Y Axes
            CamControl.axisX = new THREE.Vector3(1, 0, 0);
            CamControl.axisY = new THREE.Vector3(0, 1, 0);
            return CamControl;
        }());
        exports.default = CamControl;


        /***/
    }),
/* 19 */
/***/ (function (module, exports, __webpack_require__) {

        "use strict";

        // Transforms accelerometer alpha, beta, gamma information,
        // then returns readable angles via heading, attack & roll
        Object.defineProperty(exports, "__esModule", { value: true });
        var Gimbal = /** @class */ (function () {
            function Gimbal() {
                this.RAD = Math.PI / 180;
                this.DEG = 180 / Math.PI;
                this.quaternion = new THREE.Quaternion();
                this.xVec = new THREE.Vector3(1, 0, 0);
                this.yVec = new THREE.Vector3(0, 1, 0);
                this.zVec = new THREE.Vector3(0, 0, 1);
                this.deviceAngle = 0;
                this.object = new THREE.Object3D();
                this.angles = new THREE.Euler();
                this.eulerOrigin = new THREE.Euler();
                if (typeof window.orientation !== "undefined") {
                    this.eulerOrigin.set(90 * this.RAD, 180 * this.RAD, (180 + parseInt(window.orientation.toString(), 10)) * this.RAD);
                }
            }
            Gimbal.prototype.onGyroMove = function (_a, _b, _g) {
                // Alpha = z axis [0 ,360]
                // Beta = x axis [-180 , 180]
                // Gamma = y axis [-90 , 90]
                // Reset rotation
                this.object.setRotationFromEuler(this.eulerOrigin);
                // Apply gyroscope rotations to object
                this.object.rotateZ(_a * this.RAD);
                this.object.rotateX(_b * this.RAD);
                this.object.rotateY(_g * this.RAD);
                this.object.rotation.z += this.deviceAngle;
                // Extract quaternion from object
                this.quaternion.copy(this.object.quaternion.inverse());
                // Apply quat to axes
                this.yVec.set(0, 1, 0);
                this.yVec.applyQuaternion(this.quaternion);
                this.zVec.set(0, 0, 1);
                this.zVec.applyQuaternion(this.quaternion);
                // Heading is east (-) or west (+) rotation around y-axis.
                this.heading = Math.atan2(this.zVec.x, this.zVec.z) * this.DEG;
                // Attack is above or below (+/-) horizon line
                this.attack = Math.atan2(-this.yVec.z, this.yVec.y) * this.DEG;
                this.attack = Math.min(Math.max(this.attack, -90), 90);
                // Roll is left (-) or right (+) rotation around local z-axis
                this.roll = Math.atan2(-this.yVec.x, this.yVec.y) * this.DEG;
            };
            Gimbal.prototype.onDeviceReorientation = function (_orientation) {
                this.deviceAngle = _orientation * this.RAD;
            };
            return Gimbal;
        }());
        exports.default = Gimbal;


        /***/
    }),
/* 20 */
/***/ (function (module, exports, __webpack_require__) {

        "use strict";

        Object.defineProperty(exports, "__esModule", { value: true });
        // Takes a manifesto of assets, reports progress, & calls complete
        var Preloader = /** @class */ (function () {
            function Preloader(_path, _manifesto, _parent) {
                this.path = _path;
                this.manifesto = _manifesto;
                this.parent = _parent;
                this.assetCount = 0;
                this.assetTotal = _manifesto.length;
                this.loaderText = new THREE.TextureLoader();
                this.loaderMesh = new THREE.ObjectLoader();
                this.loaderCube = new THREE.CubeTextureLoader();
                this.cargo = {};
                this.container = document.getElementById("preloader");
                this.progBar = document.getElementById("preProg");
                this.detailBox = document.getElementById("preDetail");
            }
            Preloader.prototype.start = function () {
                this.container.className = "visible";
                this.detailBox.innerHTML = translations["LOADING_ASSETS"];
                var ext;
                var _loop_1 = function (i) {
                    ext = "." + this_1.manifesto[i].ext;
                    switch (this_1.manifesto[i].type) {
                        case "texture":
                            this_1.loaderText.load(this_1.path + "images/" + this_1.manifesto[i].name + ext, function (_obj) { this.assetAquired(_obj, this.manifesto[i].name); }.bind(this_1), undefined, function (_err) { this.assetFailed(_err, this.manifesto[i].name); }.bind(this_1));
                            break;
                        case "mesh":
                            this_1.loaderMesh.load(this_1.path + "javascripts/" + this_1.manifesto[i].name + ".json", function (_obj) { this.assetAquired(_obj, this.manifesto[i].name); }.bind(this_1), undefined, function (_err) { this.assetFailed(_err, this.manifesto[i].name); }.bind(this_1));
                            break;
                        case "cubetexture":
                            console.log(this_1.manifesto[i].name);
                            this_1.loaderCube.setPath(this_1.path + "images/" + this_1.manifesto[i].name + "/");
                            this_1.loaderCube.load(["xp" + ext, "xn" + ext, "yp" + ext, "yn" + ext, "zp" + ext, "zn" + ext], function (_obj) { this.assetAquired(_obj, this.manifesto[i].name); }.bind(this_1), undefined, function (_err) { this.assetFailed(_err, this.manifesto[i].name); }.bind(this_1));
                            break;
                    }
                };
                var this_1 = this;
                for (var i = 0; i < this.assetTotal; i++) {
                    _loop_1(i);
                }
            };
            Preloader.prototype.assetAquired = function (_obj, _name) {
                this.cargo[_name] = _obj;
                this.assetCount++;
                this.pct = this.assetCount / this.assetTotal;
                this.progBar.style.width = (this.pct * 100) + "%";
                if (this.assetCount == this.assetTotal) {
                    this.complete();
                }
            };
            Preloader.prototype.assetFailed = function (_err, _name) {
                this.assetCount++;
                this.pct = this.assetCount / this.assetTotal;
                if (this.assetCount == this.assetTotal) {
                    this.complete();
                }
            };
            Preloader.prototype.complete = function () {
                this.detailBox.innerHTML = translations["BUILDING_CAR"];
                TweenLite.delayedCall(0.5, function () {
                    this.parent.preloadComplete(this.cargo);
                    this.detailBox.innerHTML = translations["TAP_TO_BEGIN"];
                }.bind(this));
            };
            Preloader.prototype.remove = function () {
                this.container.className = "";
            };
            return Preloader;
        }());
        exports.Preloader = Preloader;


        /***/
    }),
/* 21 */
/***/ (function (module, exports, __webpack_require__) {

        "use strict";

        Object.defineProperty(exports, "__esModule", { value: true });
        // Creates a plane that receives mouse clicks and returns a Vec3 of where it took place.
        var Ray = /** @class */ (function () {
            function Ray(_cam) {
                this.cam = _cam;
                this.ray = new THREE.Raycaster();
                this.geom = new THREE.PlaneBufferGeometry(64, 64);
                this.geom.rotateX(-Math.PI / 2);
                // this.geom.translate(0, 0, 50);
                this.mat = new THREE.MeshStandardMaterial();
                this.plane = new THREE.Mesh(this.geom, this.mat);
            }
            // Moves pane to look at camera, then returns position, or false
            Ray.prototype.rayCast = function (mouse) {
                this.ray.setFromCamera(mouse, this.cam);
                var intersects = this.ray.intersectObject(this.plane);
                if (typeof intersects[0] !== "undefined") {
                    return intersects[0].point;
                }
                else {
                    return false;
                }
            };
            return Ray;
        }());
        exports.default = Ray;


        /***/
    }),
/* 22 */
/***/ (function (module, exports, __webpack_require__) {

        "use strict";

        Object.defineProperty(exports, "__esModule", { value: true });
        var CarWheels_1 = __webpack_require__(24);
        var CarLights_1 = __webpack_require__(23);
        /*
        ***** Car hierarchy *****
        CarWhole
        ├── wheelFL
        ├── wheelFR
        ├── wheelBL
        ├── wheelBR
        ├── CarChassis
            ├── BodyBlack
            ├── BodySilver
            ├── Brakes
            ├── FFBack
            ├── GlassTinted
            ├── GlassTransparent
            ├── Headlights
            ├── Taillights
            └── Undercarriage
        
        For lens flare, look into:
        https://alteredqualia.com/three/examples/webgl_city.html
        */
        var CarBody = /** @class */ (function () {
            function CarBody(_scene, _cargo) {
                this.parent = _scene;
                this.carWhole = new THREE.Group();
                this.carWhole.rotateY(-Math.PI / 2);
                this.parent.add(this.carWhole);
                this.carChassis = this.buildCarChassis(_cargo["vrBodyCompiled"], _cargo["envReflection"]);
                this.carWhole.add(this.carChassis);
                this.addShadow(_cargo["shadow"]);
                this.carLights = new CarLights_1.default(this.carChassis, _cargo);
                this.carWheels = new CarWheels_1.default(this.carWhole, _cargo);
            }
            // Creates black part of body
            CarBody.prototype.buildCarChassis = function (_bodyGeom, _cubeText) {
                _bodyGeom.scale.set(0.0005, 0.0005, 0.0005);
                _bodyGeom.position.set(1.56, 0, 0);
                this.envCube = _cubeText;
                this.envCube.format = THREE.RGBFormat;
                // Material Body Color
                this.matBodySilver = new THREE.MeshStandardMaterial({
                    color: 0xbbbbbb,
                    metalness: 0.7,
                    roughness: 0.7,
                    envMap: this.envCube,
                });
                // Workaround for browsers without Texture LevelOfDetail support
                if (window["EXT_STLOD_SUPPORT"] === false) {
                    this.envCube.minFilter = THREE.LinearFilter;
                    this.matBodySilver.metalness = 0.05;
                    this.matBodySilver.roughness = 0.8;
                    this.matBodySilver.color = new THREE.Color(0x777777);
                }
                // Material Body Black
                this.matBodyBlack = new THREE.MeshLambertMaterial({
                    color: 0x000000,
                    emissive: 0x444444,
                    reflectivity: 0.8,
                    envMap: this.envCube,
                });
                // Tinted windows
                this.matGlassTinted = new THREE.MeshLambertMaterial({
                    color: 0x000000,
                    emissive: 0x666666,
                    reflectivity: 1,
                    envMap: this.envCube,
                });
                this.matUndercarriage = new THREE.MeshBasicMaterial({
                    color: 0x000000
                });
                // Transparent glass
                this.matGlassTransp = new THREE.MeshLambertMaterial({
                    color: 0x000000,
                    emissive: 0x666666,
                    reflectivity: 1.0,
                    envMap: this.envCube,
                    transparent: true,
                    blending: THREE.AdditiveBlending,
                });
                // Car bodymaterials
                _bodyGeom.getObjectByName("BodyBlack").material = this.matBodyBlack;
                _bodyGeom.getObjectByName("BodySilver").material = this.matBodySilver;
                _bodyGeom.getObjectByName("GlassTransparent").material = this.matGlassTransp;
                _bodyGeom.getObjectByName("GlassTinted").material = this.matGlassTinted;
                _bodyGeom.getObjectByName("Undercarriage").material = this.matUndercarriage;
                return _bodyGeom;
            };
            CarBody.prototype.addShadow = function (_shad) {
                var shadowPlane = new THREE.PlaneBufferGeometry(6.5, 6.5, 1, 1);
                shadowPlane.rotateX(-Math.PI / 2);
                shadowPlane.translate(1.56, 0, 0);
                var shadowMat = new THREE.MeshBasicMaterial({
                    map: _shad,
                    side: THREE.DoubleSide,
                    blending: THREE.MultiplyBlending,
                    transparent: true,
                    depthWrite: false
                });
                var shadowMesh = new THREE.Mesh(shadowPlane, shadowMat);
                this.carWhole.add(shadowMesh);
            };
            ///////////////////////////// PUBLIC METHODS /////////////////////////////
            CarBody.prototype.onWindowResize = function (_vpH) {
                this.carLights.onWindowResize(_vpH);
            };
            // Called once per frame
            CarBody.prototype.update = function (_props) {
                // Apply car physics
                this.carWhole.rotation.y = _props.theta;
                this.carChassis.rotation.z = _props.longitMomentum * 0.0015;
                this.carChassis.rotation.x = _props.lateralMomentum * 0.002;
                this.carWheels.update(_props);
                this.carLights.update(_props);
            };
            return CarBody;
        }());
        exports.default = CarBody;


        /***/
    }),
/* 23 */
/***/ (function (module, exports, __webpack_require__) {

        "use strict";

        Object.defineProperty(exports, "__esModule", { value: true });
        var headgridVS = __webpack_require__(6);
        var headgridFS = __webpack_require__(5);
        var tailLightVS = __webpack_require__(10);
        var tailGridVS = __webpack_require__(8);
        var tailGridFS = __webpack_require__(9);
        var flareVS = __webpack_require__(4);
        var flareFS = __webpack_require__(3);
        var turnBarVS = __webpack_require__(12);
        var stopBarVS = __webpack_require__(7);
        var turnBarFS = __webpack_require__(11);
        var CarLights = /** @class */ (function () {
            function CarLights(_carChassis, _cargo) {
                this.lfTimer = 0;
                this.rtTimer = 0;
                this.carChassis = _carChassis;
                this.flareHeadText = _cargo["flareHead"];
                this.flareTurnText = _cargo["flareTurn"];
                this.glowTurnText = _cargo["lightTurn"];
                this.glowStopText = _cargo["lightStop"];
                this.uniLightsTurn = new THREE.Vector3(0, 0, 0);
                this.uniLightsOther = new THREE.Vector3(0, 1, 0);
                this.initLightMeshes();
                this.initHeadlightFlares();
                this.initStopFlares();
                this.initTurnFlares();
            }
            ////////////////// SOLID LIGHT MESHES //////////////////
            CarLights.prototype.initLightMeshes = function () {
                var tailGrid = this.carChassis.getObjectByName("TailGrid");
                tailGrid.geometry.computeVertexNormals();
                // Headlights
                this.matHeadLights = new THREE.ShaderMaterial({
                    uniforms: {
                        lightsT: { value: this.uniLightsTurn },
                        lightsO: { value: this.uniLightsOther }
                    },
                    vertexShader: headgridVS,
                    fragmentShader: headgridFS
                });
                // Taillight material
                this.matTailLights = new THREE.ShaderMaterial({
                    uniforms: {
                        lightsT: { value: this.uniLightsTurn },
                        lightsO: { value: this.uniLightsOther }
                    },
                    vertexShader: tailLightVS,
                    fragmentShader: tailGridFS,
                });
                // Tailgrid material
                this.matTailGrid = new THREE.ShaderMaterial({
                    uniforms: {
                        lightsT: { value: this.uniLightsTurn },
                        lightsO: { value: this.uniLightsOther }
                    },
                    vertexShader: tailGridVS,
                    fragmentShader: tailGridFS
                });
                this.carChassis.getObjectByName("HeadLights").material = this.matHeadLights;
                this.carChassis.getObjectByName("TailLights").material = this.matTailLights;
                tailGrid.material = this.matTailGrid;
            };
            ////////////////// HEADLIGHT FLARES //////////////////
            CarLights.prototype.initHeadlightFlares = function () {
                this.flareHeadMat = new THREE.ShaderMaterial({
                    uniforms: {
                        texture: { value: this.flareHeadText },
                        vpH: { value: window.innerHeight },
                        size: { value: 1.5 },
                        brightness: { value: 1.0 }
                    },
                    vertexShader: flareVS,
                    fragmentShader: flareFS,
                    blending: THREE.AdditiveBlending,
                    transparent: true,
                    // depthWrite: false,
                    depthTest: false,
                });
                // Make positions
                var posArray = new Float32Array([
                    // Passenger
                    4000, 1875, 1700,
                    4300, 1800, 1700,
                    // Driver
                    4000, 1875, -1700,
                    4300, 1800, -1700,
                ]);
                // Make normals
                var normArray = new Float32Array([
                    0.87, 0.22, 0.44,
                    0.87, 0.22, 0.44,
                    0.87, 0.22, -0.44,
                    0.87, 0.22, -0.44,
                ]);
                this.flareHeadGeom = new THREE.BufferGeometry();
                this.flareHeadGeom.addAttribute("position", new THREE.BufferAttribute(posArray, 3));
                this.flareHeadGeom.addAttribute("normal", new THREE.BufferAttribute(normArray, 3));
                this.flareHeadPoints = new THREE.Points(this.flareHeadGeom, this.flareHeadMat);
                this.carChassis.add(this.flareHeadPoints);
            };
            ////////////////// STOPLIGHT FLARES //////////////////
            CarLights.prototype.initStopFlares = function () {
                var glowStopMat = new THREE.ShaderMaterial({
                    uniforms: {
                        texture: { value: this.glowStopText }
                    },
                    vertexShader: stopBarVS,
                    fragmentShader: turnBarFS,
                    blending: THREE.AdditiveBlending,
                    transparent: true,
                    depthTest: false
                });
                this.glowStop = this.carChassis.getObjectByName("Stop");
                this.glowStop.material = glowStopMat;
            };
            ////////////////// TURN SIGNALS //////////////////
            CarLights.prototype.initTurnFlares = function () {
                // Left grid
                var posArray = new Float32Array([-4755, 2227, -1269, -4703, 2222, -1326, -4649, 2215, -1381, -4590, 2208, -1436, -4526, 2200, -1492, -4459, 2192, -1548, -4386, 2182, -1604, -4718, 2182, -1264, -4668, 2179, -1321, -4301, 2175, -1658, -4614, 2175, -1377, -4556, 2168, -1433, -4494, 2163, -1489, -4429, 2158, -1545, -4358, 2151, -1600, -4266, 2147, -1653, -4675, 2136, -1260, -4627, 2134, -1316, -4575, 2132, -1373, -4520, 2130, -1428, -4461, 2128, -1485, -4400, 2126, -1540, -4329, 2123, -1597,]);
                var normArray = new Float32Array([-0.9, 0, -0.4, -0.9, 0, -0.4, -0.9, 0, -0.4, -0.9, 0, -0.4, -0.9, 0, -0.4, -0.9, 0, -0.4, -0.9, 0, -0.4, -0.9, 0, -0.4, -0.9, 0, -0.4, -0.9, 0, -0.4, -0.9, 0, -0.4, -0.9, 0, -0.4, -0.9, 0, -0.4, -0.9, 0, -0.4, -0.9, 0, -0.4, -0.9, 0, -0.4, -0.9, 0, -0.4, -0.9, 0, -0.4, -0.9, 0, -0.4, -0.9, 0, -0.4, -0.9, 0, -0.4, -0.9, 0, -0.4, -0.9, 0, -0.4,]);
                this.flareTurnMat = this.flareHeadMat.clone();
                this.flareTurnMat.uniforms["texture"].value = this.flareTurnText;
                this.flareTurnMat.uniforms["size"].value = 0.05;
                this.flareTurnMat.uniforms["brightness"].value = 1;
                var leftTurnGrid = new THREE.BufferGeometry();
                leftTurnGrid.addAttribute("position", new THREE.BufferAttribute(posArray, 3));
                leftTurnGrid.addAttribute("normal", new THREE.BufferAttribute(normArray, 3));
                this.flareLPoints = new THREE.Points(leftTurnGrid, this.flareTurnMat);
                this.carChassis.add(this.flareLPoints);
                // Right grid
                posArray = new Float32Array([-4755, 2227, 1269, -4703, 2222, 1326, -4649, 2215, 1381, -4590, 2208, 1436, -4526, 2200, 1492, -4459, 2192, 1548, -4386, 2182, 1604, -4718, 2182, 1264, -4668, 2179, 1321, -4301, 2175, 1658, -4614, 2175, 1377, -4556, 2168, 1433, -4494, 2163, 1489, -4429, 2158, 1545, -4358, 2151, 1600, -4266, 2147, 1653, -4675, 2136, 1260, -4627, 2134, 1316, -4575, 2132, 1373, -4520, 2130, 1428, -4461, 2128, 1485, -4400, 2126, 1540, -4329, 2123, 1597]);
                normArray = new Float32Array([-0.9, 0, 0.4, -0.9, 0, 0.4, -0.9, 0, 0.4, -0.9, 0, 0.4, -0.9, 0, 0.4, -0.9, 0, 0.4, -0.9, 0, 0.4, -0.9, 0, 0.4, -0.9, 0, 0.4, -0.9, 0, 0.4, -0.9, 0, 0.4, -0.9, 0, 0.4, -0.9, 0, 0.4, -0.9, 0, 0.4, -0.9, 0, 0.4, -0.9, 0, 0.4, -0.9, 0, 0.4, -0.9, 0, 0.4, -0.9, 0, 0.4, -0.9, 0, 0.4, -0.9, 0, 0.4, -0.9, 0, 0.4, -0.9, 0, 0.4,]);
                var rightTurnGrid = new THREE.BufferGeometry();
                rightTurnGrid.addAttribute("position", new THREE.BufferAttribute(posArray, 3));
                rightTurnGrid.addAttribute("normal", new THREE.BufferAttribute(normArray, 3));
                this.flareRPoints = new THREE.Points(rightTurnGrid, this.flareTurnMat);
                this.carChassis.add(this.flareRPoints);
                // Left & right turn bars
                this.glowTurnMat = new THREE.ShaderMaterial({
                    uniforms: {
                        texture: { value: this.glowTurnText },
                        lightsT: { value: this.uniLightsTurn }
                    },
                    vertexShader: turnBarVS,
                    fragmentShader: turnBarFS,
                    blending: THREE.AdditiveBlending,
                    transparent: true,
                    depthTest: false
                });
                this.carChassis.getObjectByName("Turn").material = this.glowTurnMat;
            };
            CarLights.prototype.onWindowResize = function (_vpH) {
                this.flareHeadMat.uniforms["vpH"].value = _vpH;
                this.flareTurnMat.uniforms["vpH"].value = _vpH;
            };
            // Animates lights
            CarLights.prototype.update = function (_props) {
                // Turning left
                if (_props.wAngleTarg > 0) {
                    this.lfTimer = (this.lfTimer + _props.time.delta * 2) % 2;
                    this.uniLightsTurn.y = this.lfTimer > 1 ? 0.0 : 1;
                    this.uniLightsTurn.z = 0;
                    this.uniLightsTurn.x = -1;
                }
                else if (_props.wAngleTarg < 0) {
                    this.rtTimer = (this.rtTimer + _props.time.delta * 2) % 2;
                    this.uniLightsTurn.z = this.rtTimer > 1 ? 0.0 : 1;
                    this.uniLightsTurn.y = 0;
                    this.uniLightsTurn.x = 1;
                }
                else {
                    this.lfTimer = 0;
                    this.rtTimer = 0;
                    this.uniLightsTurn.y = 0;
                    this.uniLightsTurn.z = 0;
                    this.uniLightsTurn.x = 0;
                }
                this.uniLightsOther.x = _props.braking;
                this.glowStop.visible = _props.braking ? true : false;
                this.flareLPoints.visible = this.uniLightsTurn.y ? true : false;
                this.flareRPoints.visible = this.uniLightsTurn.z ? true : false;
            };
            return CarLights;
        }());
        exports.default = CarLights;


        /***/
    }),
/* 24 */
/***/ (function (module, exports, __webpack_require__) {

        "use strict";

        Object.defineProperty(exports, "__esModule", { value: true });
        var CarProps_1 = __webpack_require__(1);
        var utils_1 = __webpack_require__(0);
        var CarWheels = /** @class */ (function () {
            function CarWheels(_carWhole, _cargo) {
                // Cap wheel rotation to avoid the "Wagon-wheel effect"
                this.maxWheelTurn = Math.PI / 9.69;
                this.parent = _carWhole;
                this.thread = _cargo["thread"];
                this.thread.minFilter = THREE.NearestFilter;
                this.thread.magFilter = THREE.LinearFilter;
                this.thread.format = THREE.RGBFormat;
                this.ogMatrix = new THREE.Matrix4().set(0.000788, 0, 0, -0.3939, 0, 0, 0.000788, -0.3939, 0, -0.000788, 0, 0.15, 0, 0, 0, 1);
                this.invMatrix = new THREE.Matrix4().set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1);
                this.wPosF = CarProps_1.FF91.WheelBase;
                this.wPosB = 0;
                this.wPosL = CarProps_1.FF91.WheelTrack / -2;
                this.wPosR = CarProps_1.FF91.WheelTrack / 2;
                this.wPosY = CarProps_1.FF91.WheelDiam / 2;
                var wheelGeom = _cargo["vrWheelBrakes"];
                this.addLeftWheels(wheelGeom.getObjectByName("Wheel"));
                this.addRightWheels();
                this.addBrakes(wheelGeom.getObjectByName("Brake"));
            }
            //////////////////////////////// BUILDING WHEELS ////////////////////////////////
            CarWheels.prototype.addLeftWheels = function (_wheelGroup) {
                this.wheelFL = _wheelGroup;
                this.meshRubber = this.wheelFL.getObjectByName("Tire");
                this.meshSilver = this.wheelFL.getObjectByName("RimsSilver");
                this.meshBlack = this.wheelFL.getObjectByName("RimsBlack");
                this.geomRubber = this.meshRubber.geometry;
                this.geomSilver = this.meshSilver.geometry;
                this.geomBlack = this.meshBlack.geometry;
                this.geomRubber.applyMatrix(this.ogMatrix);
                this.geomSilver.applyMatrix(this.ogMatrix);
                this.geomBlack.applyMatrix(this.ogMatrix);
                // Compute normals in CPU to save JSON filesize
                this.geomRubber.computeVertexNormals();
                this.geomSilver.computeVertexNormals();
                this.geomBlack.computeVertexNormals();
                // Define materials
                this.matRubber = new THREE.MeshLambertMaterial({
                    color: 0x202020,
                    map: this.thread
                });
                this.matSilver = new THREE.MeshPhongMaterial({
                    color: 0x999999,
                    shininess: 50,
                });
                this.matBlack = new THREE.MeshPhongMaterial({
                    color: 0x111111,
                    shininess: 50,
                });
                this.meshRubber.material = this.matRubber;
                this.meshSilver.material = this.matSilver;
                this.meshBlack.material = this.matBlack;
                // Front left
                this.wheelFL.position.set(this.wPosF, this.wPosY, this.wPosL);
                this.parent.add(this.wheelFL);
                // Back left
                this.wheelBL = this.wheelFL.clone();
                this.wheelBL.position.set(this.wPosB, this.wPosY, this.wPosL);
                this.parent.add(this.wheelBL);
            };
            // Invert wheels to add on right side
            CarWheels.prototype.addRightWheels = function () {
                this.iGeomRubber = this.geomRubber.clone();
                this.iGeomSilver = this.geomSilver.clone();
                this.iGeomBlack = this.geomBlack.clone();
                // Invert matrix
                this.iGeomRubber.applyMatrix(this.invMatrix);
                this.iGeomSilver.applyMatrix(this.invMatrix);
                this.iGeomBlack.applyMatrix(this.invMatrix);
                // Compute new normals after matrix transform
                // this.invertNormals(this.iGeomRubber);
                this.iGeomRubber.computeVertexNormals();
                this.iGeomSilver.computeVertexNormals();
                this.iGeomBlack.computeVertexNormals();
                var iMatRubber = this.matRubber.clone();
                var iMatSilver = this.matSilver.clone();
                var iMatBlack = this.matBlack.clone();
                iMatRubber.side = THREE.BackSide;
                iMatSilver.side = THREE.BackSide;
                iMatBlack.side = THREE.BackSide;
                this.iMeshRubber = new THREE.Mesh(this.iGeomRubber, iMatRubber);
                this.iMeshSilver = new THREE.Mesh(this.iGeomSilver, iMatSilver);
                this.iMeshBlack = new THREE.Mesh(this.iGeomBlack, iMatBlack);
                // Front right
                this.wheelFR = new THREE.Group();
                this.wheelFR.add(this.iMeshRubber);
                this.wheelFR.add(this.iMeshSilver);
                this.wheelFR.add(this.iMeshBlack);
                this.wheelFR.position.set(this.wPosF, this.wPosY, this.wPosR);
                this.parent.add(this.wheelFR);
                // Back right
                this.wheelBR = this.wheelFR.clone();
                this.wheelBR.position.set(this.wPosB, this.wPosY, this.wPosR);
                this.parent.add(this.wheelBR);
                // Consider using normals helper
                // let helper = new THREE.VertexNormalsHelper(this.carChassis.getObjectByName("BrakeGrid"), 40.0, 0xff9900, 1);
                // this.carChassis.add(helper);
            };
            CarWheels.prototype.addBrakes = function (_brakeGroup) {
                this.brakeBL = _brakeGroup;
                this.brMeshDisc = this.brakeBL.getObjectByName("Disc");
                this.brMeshPads = this.brakeBL.getObjectByName("Pad");
                this.brGeomDisc = this.brMeshDisc.geometry;
                this.brGeomPads = this.brMeshPads.geometry;
                this.brGeomDisc.applyMatrix(this.ogMatrix);
                this.brGeomPads.applyMatrix(this.ogMatrix);
                this.brGeomDisc.computeVertexNormals();
                this.brGeomPads.computeVertexNormals();
                this.brMatDisc = new THREE.MeshPhongMaterial({
                    color: 0x555555,
                    shininess: 100,
                    shading: THREE.FlatShading
                });
                this.brMatPads = new THREE.MeshPhongMaterial({
                    color: 0x333333,
                    shininess: 50,
                    shading: THREE.FlatShading
                });
                this.brMeshDisc.material = this.brMatDisc;
                this.brMeshPads.material = this.brMatPads;
                this.brakeBL.position.set(this.wPosB, this.wPosY, this.wPosL);
                this.parent.add(this.brakeBL);
                this.brakeFL = this.brakeBL.clone();
                this.brakeFL.position.set(this.wPosF, this.wPosY, this.wPosL);
                this.brakeFL.rotation.set(0, 0, Math.PI);
                this.parent.add(this.brakeFL);
                this.brakeFR = this.brakeBL.clone();
                this.brakeFR.position.set(this.wPosF, this.wPosY, this.wPosR);
                this.brakeFR.rotation.set(Math.PI, 0, Math.PI);
                this.parent.add(this.brakeFR);
                this.brakeBR = this.brakeBL.clone();
                this.brakeBR.position.set(this.wPosB, this.wPosY, this.wPosR);
                this.brakeBR.rotation.set(Math.PI, 0, 0);
                this.parent.add(this.brakeBR);
            };
            CarWheels.prototype.addHub = function (xPos, yPos, zPos) {
                // Origin
                var geometry = new THREE.CylinderGeometry(0.15, 0.15, 0.03, 20);
                geometry.rotateX(Math.PI / 2);
                var material = new THREE.MeshPhongMaterial({ color: 0x333333, shininess: 50 });
                var hubSphere = new THREE.Mesh(geometry, material);
                hubSphere.position.set(xPos, yPos, zPos);
                this.parent.add(hubSphere);
                return hubSphere;
            };
            //////////////////////////////// OTHER EVENTS ////////////////////////////////
            CarWheels.prototype.turnByRadiusRatio = function (_props) {
                this.rotOverall = -_props.frameDist / CarProps_1.FF91.WheelCirc * Math.PI * 2;
                this.rotFL =
                    this.rotBL =
                    this.rotFR =
                    this.rotBR = Math.max(this.rotOverall, -this.maxWheelTurn);
                if (_props.wAngleSign !== 0) {
                    this.ratioFO = _props.radFrontOut / _props.radBackIn;
                    this.ratioBO = _props.radBackOut / _props.radBackIn;
                    this.ratioFI = _props.radFrontIn / _props.radBackIn;
                    this.ratioBI = 1.0;
                    if (_props.wAngleSign == 1) {
                        this.rotFL *= this.ratioFI;
                        this.rotBL *= this.ratioBI;
                        this.rotFR *= this.ratioFO;
                        this.rotBR *= this.ratioBO;
                        this.wheelFL.rotation.y = _props.wAngleInner;
                        this.wheelFR.rotation.y = _props.wAngleOuter;
                        this.brakeFL.rotation.y = _props.wAngleInner;
                        this.brakeFR.rotation.y = -_props.wAngleOuter;
                    }
                    else {
                        this.rotFL *= this.ratioFO;
                        this.rotBL *= this.ratioBO;
                        this.rotFR *= this.ratioFI;
                        this.rotBR *= this.ratioBI;
                        this.wheelFL.rotation.y = _props.wAngleOuter;
                        this.wheelFR.rotation.y = _props.wAngleInner;
                        this.brakeFL.rotation.y = _props.wAngleOuter;
                        this.brakeFR.rotation.y = -_props.wAngleInner;
                    }
                    this.brakeBL.rotation.y =
                        this.wheelBR.rotation.y =
                        this.wheelBL.rotation.y = utils_1.normalize(_props.speed, 22.2, 0) * _props.wAngleInner * -0.09;
                    this.brakeBR.rotation.y = -this.wheelBL.rotation.y;
                }
                this.wheelFL.rotateZ(this.rotFL);
                this.wheelBL.rotateZ(this.rotBL);
                this.wheelFR.rotateZ(this.rotFR);
                this.wheelBR.rotateZ(this.rotBR);
            };
            //////////////////////////////// EVENT LISTENERS ////////////////////////////////
            CarWheels.prototype.update = function (props) {
                this.turnByRadiusRatio(props);
            };
            return CarWheels;
        }());
        exports.default = CarWheels;


        /***/
    }),
/* 25 */
/***/ (function (module, exports, __webpack_require__) {

        "use strict";

        Object.defineProperty(exports, "__esModule", { value: true });
        var Joystick = /** @class */ (function () {
            function Joystick() {
                this.visible = false;
                this.posStart = new THREE.Vector2();
                this.posNow = new THREE.Vector2();
                this.circleIn = document.getElementById("joyIn");
                this.circleOut = document.getElementById("joyOut");
            }
            Joystick.prototype.gestureInput = function (event) {
                if (event.pointers.length === 1) {
                    switch (event.eventType) {
                        case 1:
                            this.touchStart(event.pointers[0].clientX, event.pointers[0].clientY);
                            break;
                        case 2:
                            this.touchMove(event.pointers[0].clientX, event.pointers[0].clientY);
                            break;
                        case 4:
                            this.touchEnd();
                            break;
                    }
                }
                else {
                    // Hides if more than one pointer
                    this.touchEnd();
                }
                return this.posNow;
            };
            // Displays SVG elements upon first touch
            Joystick.prototype.touchStart = function (_pX, _pY) {
                this.visible = true;
                this.circleIn.style.display = "block";
                this.circleIn.style.top = _pY + "px";
                this.circleIn.style.left = _pX + "px";
                this.circleOut.style.display = "block";
                this.circleOut.style.top = _pY + "px";
                this.circleOut.style.left = _pX + "px";
                this.posStart.set(_pX, _pY);
            };
            // Moves joystick upon moving after first touch
            Joystick.prototype.touchMove = function (_pX, _pY) {
                if (this.visible === false) {
                    this.touchStart(_pX, _pY);
                }
                this.posNow.set(_pX - this.posStart.x, _pY - this.posStart.y);
                this.posNow.clampLength(0, 40);
                this.circleIn.style.transform = "translate(" +
                    (this.posNow.x - 34) + "px, " +
                    (this.posNow.y - 34) + "px)";
            };
            // Hides joystick after last touch
            Joystick.prototype.touchEnd = function () {
                this.circleIn.style.display = "none";
                this.circleOut.style.display = "none";
                this.circleIn.style.transform = "translate(-34px, -34px)";
                this.posNow.set(0, 0);
                this.visible = false;
            };
            return Joystick;
        }());
        exports.default = Joystick;


        /***/
    }),
/* 26 */
/***/ (function (module, exports, __webpack_require__) {

        "use strict";

        Object.defineProperty(exports, "__esModule", { value: true });
        var rippleGen_1 = __webpack_require__(29);
        var utils_1 = __webpack_require__(0);
        var fragShader = __webpack_require__(13);
        var vertShader = __webpack_require__(14);
        var Grid = /** @class */ (function () {
            function Grid(_scene, _renderer) {
                this.GRID_SIZE = 32;
                this.GRID_HALFSIZE = 16;
                this.parent = _scene;
                this.prevOrigin = new THREE.Vector2();
                this.ripplePos = new THREE.Vector2();
                this.rippleGen = new rippleGen_1.default(_renderer, this.ripplePos, this.GRID_SIZE);
                this.generateGrid();
            }
            Grid.prototype.generateGrid = function () {
                ///////////////// GRID MATERIAL /////////////////
                this.ledSprite = new THREE.TextureLoader().load("../images/ledA.png");
                this.color = new THREE.Color(0xffffff);
                this.gridMaterial = new THREE.ShaderMaterial({
                    uniforms: {
                        led: { value: this.ledSprite },
                        heightmap: { value: null },
                        vpH: { value: window.innerHeight },
                        prog: { value: 0.0 },
                        origin: { value: new THREE.Vector2() },
                        color: { value: this.color }
                    },
                    defines: {
                        RANGE: (this.GRID_SIZE / 2).toFixed(1),
                        RANGE2: (this.GRID_SIZE).toFixed(1)
                    },
                    vertexShader: vertShader,
                    fragmentShader: fragShader,
                    transparent: true,
                    depthWrite: false
                });
                this.uniProgress = this.gridMaterial.uniforms["prog"];
                this.uniOrigin = this.gridMaterial.uniforms["origin"];
                ///////////////// GRID GEOMETRY /////////////////
                var vertCount = Math.pow(this.GRID_SIZE, 2);
                var position = new Float32Array(vertCount * 3);
                var uvs = new Float32Array(vertCount * 2);
                var diagonal = new Uint16Array(vertCount);
                var randI = THREE.Math.randInt;
                var xPos = 0;
                var zPos = 0;
                for (var i = 0, i3 = 0; i < vertCount; i++ , i3 += 3) {
                    // xPos = randI(0, this.GRID_SIZE);
                    // zPos = randI(0, this.GRID_SIZE);
                    xPos = (i % this.GRID_SIZE);
                    zPos = Math.floor(i / this.GRID_SIZE);
                    position[i3 + 0] = xPos - this.GRID_HALFSIZE;
                    position[i3 + 1] = 0;
                    position[i3 + 2] = zPos - this.GRID_HALFSIZE;
                    uvs[i * 2 + 0] = xPos / this.GRID_SIZE;
                    uvs[i * 2 + 1] = 1.0 - zPos / this.GRID_SIZE;
                    diagonal[i] = (xPos + zPos) % 2;
                }
                this.geometry = new THREE.BufferGeometry();
                this.geometry.addAttribute("position", new THREE.BufferAttribute(position, 3));
                this.geometry.addAttribute("uv", new THREE.BufferAttribute(uvs, 2));
                this.geometry.addAttribute("diagonal", new THREE.BufferAttribute(diagonal, 1));
                ///////////////// GRID OBJECT /////////////////
                this.lightGrid = new THREE.Points(this.geometry, this.gridMaterial);
                this.lightGrid.frustumCulled = false;
                this.parent.add(this.lightGrid);
                /*let blank = new THREE.PlaneBufferGeometry(10, 10, 10, 10);
                blank.rotateX(Math.PI / 2);
                let blankMat = new THREE.MeshBasicMaterial({color: 0xff9900, wireframe: true});
                let blankMesh = new THREE.Mesh(blank, blankMat);
                this.parent.add(blankMesh);*/
            };
            Grid.prototype.moveRippleOrigin = function (_x, _y) {
                this.ripplePos.set(_x, _y);
            };
            ///////////////////////////// PUBLIC METHODS /////////////////////////////
            Grid.prototype.showWhiteGrid = function () {
                TweenLite.to(this.uniProgress, 2.0, {
                    value: 1.0, easing: Power2.easeInOut, onStart: function () {
                        // this.rippleGen.newMouseSize(1.0);
                    }.bind(this)
                });
            };
            Grid.prototype.goToBlackGrid = function () {
                TweenLite.to(this.color, 1.0, { r: 0.0, g: 0.0, b: 0.0, easing: Power2.easeInOut });
                TweenLite.to(this.uniProgress, 1.0, { value: 0.0, easing: Power2.easeInOut });
            };
            // Update once per frame
            /*public update(_props?: CarProps):void{
                if(typeof _props != "undefined" && _props.speed !== 0){
                    if(Math.round(_props.pos.x) != this.prevOrigin.x || Math.round(_props.pos.y) != this.prevOrigin.y){
                        this.prevOrigin.copy(_props.pos).round();
                        this.rippleGen.newRippleImpact(normalize(_props.speed, 0, 24));
                        this.moveRippleOrigin(
                            mod((_props.pos.x + this.GRID_HALFSIZE), this.GRID_SIZE) - this.GRID_HALFSIZE,
                            mod((_props.pos.y + this.GRID_HALFSIZE), this.GRID_SIZE) - this.GRID_HALFSIZE
                        );
                    }
                    this.uniOrigin.value = _props.pos;
                }
        
                this.gridMaterial.uniforms["heightmap"].value = this.rippleGen.update();
                this.moveRippleOrigin(1000, 1000);
            }*/
            Grid.prototype.update = function (_props) {
                if (typeof _props != "undefined" && _props.speed > 0) {
                    this.rippleGen.newRippleImpact(_props.speed / 64);
                    this.moveRippleOrigin(utils_1.mod((_props.pos.x + this.GRID_HALFSIZE), this.GRID_SIZE) - this.GRID_HALFSIZE, utils_1.mod((_props.pos.y + this.GRID_HALFSIZE), this.GRID_SIZE) - this.GRID_HALFSIZE);
                    this.uniOrigin.value = _props.pos;
                }
                this.gridMaterial.uniforms["heightmap"].value = this.rippleGen.update();
                this.moveRippleOrigin(1000, 1000);
            };
            // On Window Resize
            Grid.prototype.onWindowResize = function (vpW, vpH, pixelRatio) {
                this.gridMaterial.uniforms["vpH"].value = vpH * pixelRatio;
            };
            return Grid;
        }());
        exports.default = Grid;


        /***/
    }),
/* 27 */
/***/ (function (module, exports, __webpack_require__) {

        "use strict";

        Object.defineProperty(exports, "__esModule", { value: true });
        var Controls_1 = __webpack_require__(2);
        // Scene vars
        var control;
        ///////////////////////////// SCENE SETUP /////////////////////////////
        function noWebGL() {
            document.getElementById("preloader").className = "visible";
            document.getElementById("preLogo").style.display = "block";
            document.getElementById("preButton").style.display = "block";
            document.getElementById("preDetail").innerHTML = translations["BROWSER_BAD"];
        }
        function initApp() {
            control = new Controls_1.default();
            render(0);
        }
        function render(t) {
            control.update(t * 0.001);
            requestAnimationFrame(render);
        }
        function browserCheck() {
            return !navigator.userAgent.match(/UCBrowser/);
        }
        function detectWebGL() {
            try {
                var canvas = document.createElement('canvas');
                var context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                window["EXT_STLOD_SUPPORT"] = context.getExtension("EXT_shader_texture_lod") ? true : false;
                return !!(window.WebGLRenderingContext && context);
            }
            catch (e) {
                return false;
            }
        }
        if (detectWebGL() && browserCheck()) {
            initApp();
        }
        else {
            noWebGL();
        }


        /***/
    }),
/* 28 */
/***/ (function (module, exports, __webpack_require__) {

        "use strict";

        Object.defineProperty(exports, "__esModule", { value: true });
        var camera_1 = __webpack_require__(18);
        var binocs_1 = __webpack_require__(17);
        var CarBody_1 = __webpack_require__(22);
        var CarProps_1 = __webpack_require__(1);
        var grid_1 = __webpack_require__(26);
        var Utils = __webpack_require__(0);
        var Model = /** @class */ (function () {
            //////////////////////////////////////////// SCENE SETUP /////////////////////////////////////////////
            // 01: Construct the scene
            function Model(_main) {
                // Accelerometer orientation vars
                this.deviceAngle = 0;
                this.pageMain = _main;
                this.vpW = this.pageMain.clientWidth;
                this.vpH = this.pageMain.clientHeight;
                this.props = new CarProps_1.CarProps();
                // ThreeJS Scene stuff
                this.camTarget = new THREE.Vector3(0, 1.0, 1.56);
                this.scene = new THREE.Scene();
                this.renderer = new THREE.WebGLRenderer({ antialias: true });
                this.renderer.setPixelRatio(1);
                this.renderer.setSize(this.vpW, this.vpH);
                this.renderer.setClearColor(0x393533);
                this.renderer.autoClear = false;
                // Set up cameras
                this.camOptions = {
                    distance: 7,
                    focusPos: this.camTarget,
                    distRange: { max: 40, min: 4 },
                    rotation: new THREE.Vector3(45, 0, 0),
                    rotRange: { yMin: -1 },
                    eyeSeparation: 0.3
                };
                this.monoc = new camera_1.default(this.camOptions);
                this.cam = this.monoc;
                this.grid = new grid_1.default(this.scene, this.renderer);
                this.pageMain.appendChild(this.renderer.domElement);
                this.addSceneLights();
            }
            // 02: Preload has started, move camera up
            Model.prototype.introPreloading = function () {
                this.grid.showWhiteGrid();
                TweenLite.to(this.cam, 1.0, { distTarget: 30 });
                TweenLite.to(this.cam.rotTarget, 1.0, { x: 0, y: 90 });
            };
            // 03: Preload has ended, build car
            Model.prototype.introPreloaded = function (_cargo) {
                this.car = new CarBody_1.default(this.scene, _cargo);
                this.skyRadiance = _cargo["envSkybox"];
                this.skyRadiance.format = THREE.RGBFormat;
                this.scene.background = this.skyRadiance;
            };
            // 04: Start playing intro animation
            Model.prototype.introStart = function () {
                this.grid.goToBlackGrid();
                TweenLite.to(this.cam.rotTarget, 1.0, { x: -20, y: 0 });
                TweenLite.to(this.cam, 1.0, { distTarget: 10, distActual: 10 });
                TweenLite.to(this.spotLight, 3.0, { intensity: 1.0 });
                TweenLite.to(this.props, 3.0, { speed: 12.0 });
            };
            // Adds lights to scene
            Model.prototype.addSceneLights = function () {
                this.ambLight = new THREE.AmbientLight(0xffffff, 0.2);
                this.spotLight = new THREE.DirectionalLight(0xffffff, 0.0);
                this.spotLight.position.set(0, 2, 0);
                this.scene.add(this.spotLight);
                this.scene.add(this.ambLight);
            };
            ////////////////////////////////// CONTROL EVENTS //////////////////////////////////
            Model.prototype.toggleStereo = function (_stereo, _orbit) {
                // Enter stereo view
                if (_stereo) {
                    if (typeof this.binocs === "undefined") {
                        this.binocs = new binocs_1.default(this.camOptions);
                        this.binocs.distTarget = 10;
                    }
                    this.cam = this.binocs;
                    this.scene.add(this.binocs.binoculars);
                    this.renderer.setScissorTest(true);
                    this.renderer.setPixelRatio(window.devicePixelRatio >= 2 ? 2 : 1);
                    // Steering mode
                    if (_orbit === false) {
                        // Smooth transition from previous view to back of car
                        this.binocs.setRotation(Utils.mod(this.monoc.rotActual.x, 360), this.monoc.rotActual.y, 0);
                        this.binocs.rotTarget.x = 180 - Math.atan2(this.props.velocity.x, this.props.velocity.y) * (180 / Math.PI);
                        this.binocs.rotTarget.y = 10;
                    }
                }
                else {
                    this.cam = this.monoc;
                    this.scene.remove(this.binocs.binoculars);
                    this.renderer.setViewport(0, 0, this.vpW, this.vpH);
                    this.renderer.setScissorTest(false);
                    this.renderer.setPixelRatio(1);
                }
                this.grid.onWindowResize(this.vpW, this.vpH, this.renderer.getPixelRatio());
                this.cam.onDeviceReorientation(this.deviceAngle);
                this.onWindowResize();
            };
            Model.prototype.onWindowResize = function () {
                this.vpW = this.pageMain.clientWidth;
                this.vpH = this.pageMain.clientHeight;
                this.grid.onWindowResize(this.vpW, this.vpH, this.renderer.getPixelRatio());
                this.car.onWindowResize(this.vpH);
                this.renderer.setSize(this.vpW, this.vpH);
                this.monoc.onWindowResize(this.vpW, this.vpH);
                if (typeof this.binocs !== "undefined") {
                    this.binocs.onWindowResize(this.vpW, this.vpH);
                }
            };
            //////////////////////////////////////////// UPDATE	/////////////////////////////////////////////
            Model.prototype.updateIntro = function (time) {
                this.renderer.clear();
                this.grid.update();
                this.cam.update();
                this.renderer.render(this.scene, this.monoc.camera);
            };
            Model.prototype.update = function (time, _stereo) {
                if (this.props.update(time) === false) {
                    return;
                }
                this.renderer.clear();
                this.car.update(this.props);
                this.grid.update(this.props);
                this.camTarget.copy(this.car.carChassis.getWorldPosition());
                this.cam.setFocusPos(this.camTarget.x, 1.0, this.camTarget.z);
                this.cam.update();
                if (_stereo) {
                    this.spotLight.position.copy(this.binocs.binoculars.position).normalize();
                    this.spotLight.position.y = 1;
                    this.binocs.renderStereo(this.renderer, this.scene);
                }
                else {
                    this.spotLight.position.copy(this.monoc.camera.position).normalize();
                    this.spotLight.position.y = 1;
                    this.renderer.render(this.scene, this.monoc.camera, null, false);
                }
            };
            return Model;
        }());
        exports.default = Model;


        /***/
    }),
/* 29 */
/***/ (function (module, exports, __webpack_require__) {

        "use strict";

        Object.defineProperty(exports, "__esModule", { value: true });
        var rawVert = __webpack_require__(16);
        var hmFrag = __webpack_require__(15);
        var RippleGen = /** @class */ (function () {
            function RippleGen(_renderer, mouse, _gridSize) {
                if (_gridSize === void 0) { _gridSize = 64; }
                this.renderChange = false;
                // DevScene
                this.devMode = false;
                // Set up renderers
                this.renderer = _renderer;
                this.textureSize = _gridSize;
                var dataType = (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) ? THREE.HalfFloatType : THREE.FloatType;
                this.rTarget1 = new THREE.WebGLRenderTarget(this.textureSize, this.textureSize, {
                    minFilter: THREE.NearestFilter,
                    magFilter: THREE.NearestFilter,
                    stencilBuffer: false,
                    depthBuffer: false,
                    format: THREE.RGBAFormat,
                    type: dataType,
                    wrapS: THREE.RepeatWrapping,
                    wrapT: THREE.RepeatWrapping
                });
                this.rTarget2 = this.rTarget1.clone();
                // Set up GP scene
                this.gpScene = new THREE.Scene();
                this.gpCam = new THREE.Camera();
                this.gpCam.position.z = 1;
                var rezString = "vec2( " + this.textureSize.toFixed(1) + ", " + this.textureSize.toFixed(1) + " )";
                this.gpGeom = new THREE.PlaneBufferGeometry(2, 2);
                this.gpMat = new THREE.RawShaderMaterial({
                    uniforms: {
                        ripplePos: { value: mouse },
                        rippleSize: { value: 1.0 },
                        rippleImpact: { value: 1.0 },
                        viscosity: { value: 0.01 },
                        heightmap: { value: null }
                    },
                    defines: {
                        BOUNDS: this.textureSize.toFixed(1),
                        resolution: rezString
                    },
                    vertexShader: rawVert,
                    fragmentShader: hmFrag,
                    depthWrite: false,
                });
                this.uniSize = this.gpMat.uniforms["rippleSize"];
                this.uniImpact = this.gpMat.uniforms["rippleImpact"];
                this.gpMesh = new THREE.Mesh(this.gpGeom, this.gpMat);
                this.gpScene.add(this.gpMesh);
                // Set up dev view
                if (this.devMode) {
                    this.devScene = new THREE.Scene();
                    this.devCam = new THREE.Camera();
                    this.devCam.position.z = 1;
                    this.devGeom = new THREE.PlaneBufferGeometry(2, 2);
                    this.devMat = new THREE.MeshBasicMaterial({ map: this.rTarget1.texture });
                    this.devMesh = new THREE.Mesh(this.devGeom, this.devMat);
                    this.devScene.add(this.devMesh);
                }
            }
            RippleGen.prototype.newRippleSize = function (_size) {
                this.uniSize.value = _size;
            };
            RippleGen.prototype.newRippleImpact = function (_val) {
                this.uniImpact.value = _val;
            };
            RippleGen.prototype.update = function () {
                this.renderChange = !this.renderChange;
                // Render target 1
                if (this.renderChange) {
                    this.gpMat.uniforms["heightmap"].value = this.rTarget2.texture;
                    this.renderer.render(this.gpScene, this.gpCam, this.rTarget1);
                    if (this.devMode) {
                        this.renderer.setViewport(0, 0, this.textureSize * 2, this.textureSize * 2);
                        this.renderer.render(this.devScene, this.devCam);
                        this.renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
                    }
                    return this.rTarget1.texture;
                }
                else {
                    this.gpMat.uniforms["heightmap"].value = this.rTarget1.texture;
                    this.renderer.render(this.gpScene, this.gpCam, this.rTarget2);
                    if (this.devMode) {
                        this.renderer.setViewport(0, 0, this.textureSize * 2, this.textureSize * 2);
                        this.renderer.render(this.devScene, this.devCam);
                        this.renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
                    }
                    return this.rTarget2.texture;
                }
            };
            return RippleGen;
        }());
        exports.default = RippleGen;


        /***/
    })
/******/]);