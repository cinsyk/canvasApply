var lang = document.getElementsByTagName("html")[0].getAttribute("lang");
var locale = {
	en: {
		CAR_CONTROLS: 'Car controls',
		DRAG_CAMERA: 'Drag camera',
		SCROLL_ZOOM: 'Scroll zoom',
		TILT: 'Tilt',
		VR_STEERING: 'VR Mode',
		VR_CAMERA: 'VR Orbit',
		EXIT_VR: 'Exit VR',
		FULLSCREEN: 'Fullscreen',
		EXIT_FULLSCREEN: 'Exit',
		INTRO_HEADER: 'FF 91 VR Test Ride',
		BUILDING_CAR: 'Building car...',
		TAP_TO_BEGIN: 'Tap screen to begin.',
		LOADING_ASSETS: 'Loading assets...',
		BROWSER_BAD: 'Your browser does not provide<br>3D support.',
		BUTTON_GALLERY: 'Go to FF 91 Gallery',
	},
	zh: {
		CAR_CONTROLS: '方向控制',
		DRAG_CAMERA: '拖拽镜头',
		SCROLL_ZOOM: '滑动缩放',
		TILT: '倾斜',
		VR_STEERING: 'VR方向控制',
		VR_CAMERA: 'VR镜头',
		EXIT_VR: '退出VR',
		FULLSCREEN: '全屏',
		EXIT_FULLSCREEN: '退出全屏',
		INTRO_HEADER: 'FF 91 虚拟实境车辆试乘',
		BUILDING_CAR: '造车进行中',
		TAP_TO_BEGIN: '触屏开始',
		LOADING_ASSETS: '加载中',
		BROWSER_BAD: '您的浏览器没有提供3D 技术支持',
		BUTTON_GALLERY: '前往 FF 91图库',
	}
};
var translations = locale[lang];