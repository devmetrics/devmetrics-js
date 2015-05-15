/**
 * Send event to localhost api. jQuery is required.
 * @param event string, event name
 * @param eventOptions array, addition event properties
 * @param libOptions array, lib options, like host and token
 */
function devmetricsEvent(event, eventOptions, libOptions) {
  $.ajax({
    method: 'POST',
    url: '/api/jsevents',
    data: {
      'name': event,
      'options': eventOptions
    },
    success: function(res) {
    },
    error: function(res) {
    },
    dataType: 'json'
  });
}