import Ember from 'ember';
import PaginatedSortableRoute from 'dispatcher/mixins/paginated-sortable-route';
import FeedParamsRoute from 'dispatcher/mixins/feed-params-route';

// Fisher-Yates Shuffle from Mike Bostock
// https://bost.ocks.org/mike/shuffle/
function shuffle_sample(array, count) {
  var m = array.length, t, i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array.slice(0,count);
}

export default Ember.Route.extend(FeedParamsRoute, PaginatedSortableRoute, {
  model: function(params) {
    var self = this;
    // Find feeds
    return this.store.query('feed', params).then(function(feeds) {
      // Find total routes for feed
      return Ember.RSVP.all(feeds.map(function(feed){
        return self.store.query('route', {
          imported_from_feed: feed.id,
          per_page: 0,
          total: true
        }).then(function(result) {

          // Sample routes for each feed
          var route_sample = [];
          for (var i=0; i < result.meta.total; i++) { route_sample.push(i); }
          route_sample = shuffle_sample(route_sample, 1);

          // Find routes
          return Ember.RSVP.all(route_sample.map(function(offset) {
            return self.store.query('route', {
              imported_from_feed: feed.id,
              per_page: 1,
              offset: offset,
              total: false
            }).then(function(result) {

              // Sample stops for each route
              var served = result.get('firstObject').get('stops_served_by_route');
              return shuffle_sample(served, 2).map(function(i) { return i.stop_onestop_id; });

            });
          })).then(function(results) {

            // Return the feed and stop pairs
            return {
              feed: feed,
              stop_pairs: results
            };

          });
        });
      }));
    }).then(function(results) {

      // Flatten all stop_pair onestop_ids, fetch stops, map to stop records
      var stop_onestop_ids = [];
      results.forEach(function(i){
        i.stop_pairs.forEach(function(j){
          stop_onestop_ids.push(j[0]);
          stop_onestop_ids.push(j[1]);
        });
      });
      return self.store.query('stop', {
        onestop_id: stop_onestop_ids.join(",")
      }).then(function(stops) {
        var stop_hash = {};
        stops.forEach(function(stop) { stop_hash[stop.id] = stop; });
        results.forEach(function(i) {
          i.stop_pairs = i.stop_pairs.map(function(stop_pair) {
            return [stop_hash[stop_pair[0]], stop_hash[stop_pair[1]]];
          });
        });
        return results;
      });

    });
  }
});
