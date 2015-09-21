# devmetrics-js

The devmetrics.io JS library for client side instrumentation.

Devmetrics – Opensource Usage Analytic for Web.

Visit www.devmetrics.io to generate an app_id.

# Installation

Add the following code into the <head> section of your HTML page to start tracking user activity.

```html
<script>
      (function (doc, inst) {
          window.devmetrics = inst; inst.q = inst.q || []; inst.init = function (token) { this.token = token; }; inst.userEvent = function (eventName) { inst.q.push(eventName); };
          var a = doc.createElement("script"); a.type = "text/javascript"; a.src = 'http://rawgit.com/devmetrics/devmetrics-js/master/jdevmetrics.js?' + Math.floor(((new Date()).getTime() - 1442107445573) / 8640000); var e = doc.getElementsByTagName("script")[0]; e.parentNode.insertBefore(a, e);
      })(document, window.devmetrics || []);
      devmetrics.init("your-app-id");
</script>
```


# Tracking an user action

Tracking an event is as simple as one line of code.

```html
<script>
      devmetrics.userEvent('call2act_button_click');
</script>
```


# Tracking a measurement


```html
<script>
      devmetrics.measure(120, 'page_load_time_in_ms');
</script>
```


# Dashboards to view events and for analytic

www.devmetrics.io/account
