import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Controller.extend({
  inputUrls: null,
  outputResults: [],
  actions: {
    add() {
      let urls = this.get("inputUrls").split("\n");
      urls.forEach((url) => {
        if (url !== "") {
          // Ember Data URL encodes all query params, which won't work for the
          // url= in this request. So we'll just run our own AJAX request:
          Ember.$.ajax(config.datastoreHost + '/api/v1/feeds', {
            "method": "get",
            "processData": false,
            "data": "url=" + url + "&total=true"
          }).then((response) => {
            let onestopId = "";
            if (response && response.meta && response.meta.total == 1) {
              onestopId = response.feeds[0].onestop_id;
            }
            this.get("outputResults").addObject({
              url: url,
              onestopId: onestopId
            });
          });
        }
      })
    },
    clear() {
      this.get("outputResults").clear();
    }
  },
});
