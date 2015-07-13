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

/**
 * @param event_name Metric name, all events with same metric name are aggregated
 * @param user_id optional, User unique identifier, used only for log
 * @param event_tags optional, Additional info, metric dimensions, string or array
 */
function devmetricsUserEvent(event_name, user_id, event_tags) {
    $.ajax({
        method: 'POST',
        url: '/api/js_userevents',
        data: {
            'event_name': event_name,
            'user_id': user_id,
            'event_tags': event_tags
        },
        success: function(res) {
        },
        error: function(res) {
        },
        dataType: 'json'
    });
}