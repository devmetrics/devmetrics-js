//(function () {

  var devmetrics = {
    init: function (app_id) {
      window.dm_app_id = app_id;
      this.sendData('lib_init');
    },
    sendData: function (event_name, user_id, event_tags) {
      var req = new XMLHttpRequest();
      var url = 'http://www.devmetrics.io/api/event';
      url += '?app_id=' + window.dm_app_id;
      url += '&event_name=' + event_name;
      url += '&user_id=' + user_id;
      req.open("GET", url, true);
      req.onreadystatechange = function (e) {
        if (req.readyState === 4) {
          if (req.status === 200) {
          } else {
          }
        }
      };
      req.send(null);
    },
    userEvent: function (event_name, user_id, event_tags) {
      event_name = event_name.replace(/[\W_]+/g, "_");
      user_id = (user_id || '-1');
      devmetrics.sendData(event_name, user_id, event_tags);
    }
  };

  window.devmetrics = devmetrics;


//});