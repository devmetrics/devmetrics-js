(function (devmetrics) {
  'use strict';

  var devmetrics = window.devmetrics || [];
  window.devmetricsdata = {};

  devmetrics._genUid = function () {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  };

  devmetrics._saveReferrer = function () {
    window.devmetricsdata['referrer'] = document.referrer;
  };

  devmetrics._savePage = function () {
    window.devmetricsdata['page'] = document.location.href;
  };

  devmetrics._registerUser = function (explicit_id) {
    var uid = explicit_id || window.dm_uid;
    if (!uid) {
      uid = this.getData('dm_uid');
    }
    if (!uid) {
      uid = this._genUid();
      this.setData('dm_uid', uid);
    }
    window.dm_uid = uid;
  };

  devmetrics.setData = function (name, value) {
    var d = new Date();
    d.setTime(d.getTime() + (60 * 24 * 60 * 60 * 1000)); // 60 days
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + "; " + expires;
  };

  devmetrics.getData = function (name) {
    var name = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1);
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
  };

  /**
   * Set explicit user id
   * @param user_id
   */
  devmetrics.setUserId = function (user_id) {
    this._registerUser(user_id);
  }

  /**
   * Init lib
   * @param app_id
   */
  devmetrics.init = function (app_id) {
    window.dm_app_id = app_id;
    this._saveReferrer();
    this._savePage();
    this._registerUser();
    this.sendData('lib_init');
  };

  devmetrics.sendData = function (event_name, event_tags) {
    var req = new XMLHttpRequest();
    var url = 'http://www.devmetrics.io/api/event';
    url += '?app_id=' + window.dm_app_id;
    url += '&event_name=' + event_name;
    url += '&user_id=' + window.dm_uid;
    if (window.devmetricsdata['referrer']) {
      url += '&referrer=' + window.devmetricsdata['referrer'];
    }
    if (window.devmetricsdata['page']) {
      url += '&page=' + window.devmetricsdata['page'];
    }
    req.open("GET", url, true);
    req.onreadystatechange = function (e) {
      if (req.readyState === 4) {
        if (req.status === 200) {
        } else {
        }
      }
    };
    req.send(null);
  };

  /**
   * Send user event data
   * @param event_name
   * @param event_tags
   */
  devmetrics.userEvent = function (event_name, event_tags) {
    event_name = event_name.replace(/[\W_]+/g, "_");
    devmetrics.sendData(event_name, event_tags);
  };

  //// Postprocess early init data
  if (devmetrics.token) { //dyn load set
    devmetrics.init(devmetrics.token);
  }
  if (devmetrics.q) { //dyn load queue
    for (var i = 0; i < devmetrics.q.length; ++i) {
      devmetrics.userEvent(devmetrics.q[i]);
    }
  }

})(window['devmetrics']);