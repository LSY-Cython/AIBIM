'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
  'use strict';

  var modules = ['/Private/thirdparty.js', '/Private/three.js', '/Bimface/lib/loaders/PntLoader.js', '/Bimface/lib/loaders/BimTilesLoader.js', '/Private/Editor.js', '/Private/WebViewer.js', '/Private/bimface.bufferfly.js', '/Private/mdvDrawing2D.js'];

  /***** BIMFACE host *****/
  var hostConfig = window.hostConfig || {
    APIHost: 'https://api.bimface.com',
    resourceHost: 'https://m.bimface.com',
    staticHost: 'https://static.bimface.com',
    dataEnvType: "BIMFACE"
  };

  if (Object.assign === undefined) {

    Object.assign = function (target) {
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }
      var output = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source !== undefined && source !== null) {
          for (var nextKey in source) {
            if (Object.prototype.hasOwnProperty.call(source, nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }
      return output;
    };
  }

  var BimfaceConfigrationOption = Object.freeze({
    "Release": "Release",
    "Debug": "Debug"
  });
  var BimfaceViewTypeOption = Object.freeze({
    "Normal": "Normal",
    "DrawingView": "drawingView"
  });
  var BimfaceEnvOption = Object.freeze({
    "BIMFACE": "BIMFACE",
    "Local": "Local"
  });

  var BimfaceLanguageOption = Object.freeze({
    "zh_CN": "zh_CN",
    "en_GB": "en_GB",
    "sv_SE": "sv_SE"
  });

  var BimfaceVisualStyle = Object.freeze({
    "Normal": "Normal",
    "Bake": "Bake"
  });
  /**
   * BimfaceSDKLoaderConfig
   * @class  BimfaceSDKLoaderConfig
   *
   */
  var BimfaceSDKLoaderConfig = function BimfaceSDKLoaderConfig() {
    if (window.hostConfig) {
      // JSHostConfig.js在SDKLoader之后加载时，更新hostConfig
      for (var key in window.hostConfig) {
        hostConfig[key] = window.hostConfig[key];
      }
    }
    var defaults = {

      /**
       * 静态资源地址
       * @var {String} BimfaceSDKLoaderConfig.prototype.staticHost
       */
      staticHost: hostConfig.staticHost + '/api',
      /**
       * API URL
       * @var {String} BimfaceSDKLoaderConfig.prototype.APIHost
       */
      APIHost: hostConfig.APIHost,
      /**
       * 语言版本：zh_CN - 中文版；en_GB - 英文版；sv_SE - 瑞典版
       * @var {String} BimfaceSDKLoaderConfig.prototype.language
       */
      language: 'zh_CN',
      /**
       * ViewToken
       *  @var {String} BimfaceSDKLoaderConfig.prototype.viewToken
       */
      viewToken: null,
      configuration: BimfaceConfigrationOption.Release,
      dataEnvType: hostConfig.dataEnvType || "BIMFACE",
      viewType: BimfaceViewTypeOption.Normal,
      /**
       * 显示效果（默认值：Bake）
       * @var {String} BimfaceSDKLoaderConfig.prototype.visualStyle
       */
      visualStyle: BimfaceVisualStyle.Bake,
      /**
       * JSSDK版本号（缺省值：最新版本）
       * @var {String} BimfaceSDKLoaderConfig.prototype.version
       */
      version: ''
    };
    return defaults;
  };

  window.BimfaceSDKLoaderConfig = BimfaceSDKLoaderConfig;
  window.BimfaceEnvOption = BimfaceEnvOption; // 线上模式 | 离线模式，在离线包index.html中有用到
  window.BimfaceLanguageOption = BimfaceLanguageOption; // 国际语言
  window.BimfaceConfigrationOption = BimfaceConfigrationOption; // 老版本图纸的bimface.index.js有用到，作为兼容处理
  window.BimfaceViewTypeOption = BimfaceViewTypeOption; // 图模联动官方示例Demo中有用到，作为兼容处理

  var transformFullUrl = function transformFullUrl(baseUrl, modules) {
    for (var i = 0; i < modules.length; i++) {
      modules[i] = baseUrl + modules[i];
    }
  };

  var isDrawingView = function isDrawingView(data, options) {
    return data.renderType == "drawingView" || options.viewType == BimfaceViewTypeOption.DrawingView;
  };

  //获取需要加载的js/css资源
  var getLoadModules = function getLoadModules(configurations) {
    var sdkVersion = configurations.sdkVersion;
    var options = configurations.options;
    var configuration = options.configuration;

    var sdkModules = [];

    var commonModules = ['/' + sdkVersion + '/' + options.language + '.js', '/' + sdkVersion + '/Application' + configuration + '.js'];
    if (isDrawingView(configurations.metadata, configurations.options)) {
      sdkModules = [].concat(_toConsumableArray(sdkModules), commonModules, ['/' + sdkVersion + '/Drawing.css', '/' + sdkVersion + '/bimface.bufferfly.js', '/' + sdkVersion + '/Drawing' + configuration + '.js']);
    } else {
      sdkModules = [].concat(_toConsumableArray(sdkModules), commonModules, ['/' + sdkVersion + '/Bimface.css', '/' + sdkVersion + '/thirdparty.js', '/' + sdkVersion + '/lib/loaders/BimTilesLoader.js', '/' + sdkVersion + '/Bimface' + configuration + '.js']);
    }

    return sdkModules;
  };

  window.postProcessing = function (configurations) {
    var data = configurations.metadata;
    var options = configurations.options;
    var successCb = configurations.successCb;

    var sdkModules = getLoadModules(configurations);
    transformFullUrl(options.staticHost, sdkModules);

    data.databagId = '' + data.databagId;

    if (options.path) {
      data.path = options.path;
      data.dataPath = "./";
    } else if (options.resourcePath) {
      data.path = options.resourcePath.replace('viewToken', '');
    }
    data.sdkPath = options.sdkPath;

    if (sdkModules.length == 0) {
      successCb(data);
    } else {
      loadResource(sdkModules, function () {
        if (options.build === BimfaceConfigrationOption.Debug && options.dataPath) {
          var arr = options.dataPath.split("/");
          successCb({
            databagId: arr.pop(),
            path: arr.join("/")
          });
        }
        successCb(data);
      });
    }
  };

  var loadResource = function loadResource(modules, callback, configurations) {
    var maxLength = modules.length,
        loaded = 0;
    var loadedFn = function loadedFn(response) {
      if (response && response.message == 'error' && response.element.indexOf('bimface.index') > -1) {
        loaded = 0;
        var options = configurations.options;

        options.build === BimfaceConfigrationOption.Release;
        var sdkModules = getLoadModules(configurations);
        transformFullUrl(options.staticHost, sdkModules);
        loadResource(sdkModules, callback);
        return;
      }
      loaded++;
      if (loaded == maxLength) {
        callback();
      } else {
        createResource(modules[loaded], loadedFn);
      }
    };
    createResource(modules[loaded], loadedFn);
  };
  var loaded = [];
  var createResource = function createResource(url, callback) {
    if (loaded.indexOf(url.split('/').pop()) > -1) {
      callback();
      return;
    }
    var head = document.getElementsByTagName('head')[0];
    var staticTag;
    if (url.indexOf('.css') > -1) {
      staticTag = document.createElement('link');
      staticTag.setAttribute('href', url);
      staticTag.setAttribute('rel', 'stylesheet');
    } else {
      staticTag = document.createElement('script');
      staticTag.setAttribute('src', url);
    }
    staticTag.url = url;
    head.appendChild(staticTag);
    staticTag.addEventListener('load', function () {
      loaded.push(this.url.split('/').pop());
      callback && callback({
        message: 'success'
      });
    });
    staticTag.addEventListener('error', function () {
      callback && callback({
        element: url,
        message: 'error'
      });
    });
    return staticTag;
  };

  window.loadResource = loadResource; // 兼容老版本bimface.index.js调用loadResource

  var transformFullUrl$1 = function transformFullUrl$1(baseUrl, modules$$1) {
    for (var i = 0; i < modules$$1.length; i++) {
      modules$$1[i] = baseUrl + modules$$1[i];
    }
  };

  var isPdfView = function isPdfView(data, options) {
    var isPdf = data.workerType === 'pdf-transfer' || options.viewType === "pdfView";
    isPdf && (data.renderType = 'pdfView'); // 目前pdf的viewMetaData写的也是renderType = 'bimView'，待此原始数据修改后可去掉此处的判断
    return isPdf;
  };

  var isDrawingView$1 = function isDrawingView$1(data, options) {
    return data.renderType == "drawingView" || options.viewType == BimfaceViewTypeOption.DrawingView;
  };

  //获取需要加载的js/css资源
  var getLoadModules$1 = function getLoadModules$1(configurations) {
    var sdkVersion = BimfaceLoaderConfig.dataEnvType == "Local" ? 'bimface' : configurations.sdkVersion;
    var options = configurations.options;
    var configuration = options.configuration;

    var debugModules = ['/Bimface/Bimface.css', '/Bimface/Application.js', '/Bimface/Bimface.js', '/Bimface/Drawing.js'];
    var sdkModules = [];

    if (options.build === BimfaceConfigrationOption.Debug) {
      if (options.dataPath) {
        sdkModules = [].concat(modules, debugModules);
      } else {
        sdkModules = modules;
      }
    } else if (options.build === BimfaceConfigrationOption.Release && !isDrawingView$1(configurations.metadata, configurations.options) && !isPdfView(configurations.metadata, configurations.options)) {
      sdkModules = [].concat(_toConsumableArray(sdkModules), ['/' + sdkVersion + '/bimface.foxfly' + configuration + '.js']);
    }

    var commonModules = ['/' + sdkVersion + '/' + options.language + '.js', '/' + sdkVersion + '/Application' + configuration + '.js'];
    if (isPdfView(configurations.metadata, configurations.options)) {
      sdkModules = [].concat(_toConsumableArray(sdkModules), commonModules, ['/' + sdkVersion + '/Bimface.css', '/' + sdkVersion + '/bimface.pdf.css', '/' + sdkVersion + '/bimface.pdf.js', '/' + sdkVersion + '/bimface.pdfviewer.js']);
    } else if (isDrawingView$1(configurations.metadata, configurations.options)) {
      sdkModules = [].concat(_toConsumableArray(sdkModules), commonModules, ['/' + sdkVersion + '/Drawing.css', '/' + sdkVersion + '/bimface.bufferfly.js', '/' + sdkVersion + '/Drawing' + configuration + '.js']);
    } else {
      sdkModules = [].concat(_toConsumableArray(sdkModules), commonModules, ['/' + sdkVersion + '/Bimface.css', '/' + sdkVersion + '/thirdparty.js', '/' + sdkVersion + '/lib/loaders/BimTilesLoader.js', '/' + sdkVersion + '/Bimface' + configuration + '.js']);

      if (configurations.metadata.renderType === 'gisView') {
        sdkModules.push('/' + sdkVersion + '/bimface.ui.js', '/' + sdkVersion + '/bimface.ui.css');
      }
    }

    return sdkModules;
  };

  var postProcessing = function postProcessing(configurations) {
    if (window.bimfaceStaticHost && !window.BimfaceLoaderConfig.fullStaticHost) {
      window.BimfaceLoaderConfig.fullStaticHost = window.bimfaceStaticHost;
      delete window.bimfaceStaticHost; // 兼容用户SDKLoader.js缓存尚未更新的情况
    }
    var data = configurations.metadata;
    var options = configurations.options;
    var successCb = configurations.successCb;

    var sdkModules = getLoadModules$1(configurations);
    transformFullUrl$1(options.staticHost, sdkModules);

    data.databagId = '' + data.databagId;

    if (options.path) {
      data.path = options.path;
      data.dataPath = "./";
    } else if (options.resourcePath) {
      data.path = options.resourcePath.replace('viewToken', '');
    }
    data.sdkPath = options.sdkPath;

    if (sdkModules.length == 0) {
      successCb(data);
    } else {
      loadResource(sdkModules, function () {
        if (options.build === BimfaceConfigrationOption.Debug && options.dataPath) {
          var arr = options.dataPath.split("/");
          successCb({
            databagId: arr.pop(),
            path: arr.join("/")
          });
        }
        successCb(data);
      });
    }
  };

  window.postProcessing = postProcessing;
})();