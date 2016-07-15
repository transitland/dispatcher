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
    var meta = null;
    
    // Find feeds
    return this.store.query('feed', params).then(function(feeds) {
      // Save the meta, for pagination
      meta = feeds.meta;

      // Find total routes for feed
      var route_count_promises = feeds.map(function(feed) {
        console.log('route_count_promises:', feed.id);
        return self.store.query('route', {
          imported_from_feed: feed.id,
          per_page: 0,
          total: true
        });
      });
      return Ember.RSVP.all(route_count_promises)
    }).then(function(route_count_results) {

      // Sample routes from the total routes for each feed
      var route_promises = route_count_results.map(function(route_count) {
        var feed_onestop_id = route_count.query.imported_from_feed;
        var route_sample = [];
        for (var i=0; i < route_count.meta.total; i++) { route_sample.push(i) }
        return shuffle_sample(route_sample, 2).map(function(route_offset) {
          console.log('route_promises:', feed_onestop_id, route_offset);
          return self.store.query('route', {
            imported_from_feed: feed_onestop_id,
            per_page: 1,
            offset: route_offset,
            total: false
          })
        });
      });
      return Ember.RSVP.all([].concat.apply([], route_promises));
    }).then(function(route_results) {

      // Sample stops from each route
      var stop_promises = route_results.map(function(route_result) {
        var route = route_result.get('firstObject');
        var stops_served_sample = shuffle_sample(route.get('stops_served_by_route'), 2).map (function(stop_served) { return stop_served.stop_onestop_id });
        console.log('served', route.id, stops_served_sample);
        return self.store.query('stop', {
          imported_from_feed: route_result.query.imported_from_feed,
          onestop_id: stops_served_sample.join(',')
        })
      });
      return Ember.RSVP.all([].concat.apply([], stop_promises));
    }).then(function(stop_results) {

      // Aggregate back to feed
      var feed_stop_pairs = [];
      feed_stop_pairs.meta = meta;
      var lookup = {};
      stop_results.forEach(function(stop_result) {
        var feed_onestop_id = stop_result.query.imported_from_feed;
        var pairs = lookup[feed_onestop_id];
        if (!pairs) {
          pairs = {};
          pairs.feed = self.store.peekRecord('feed', feed_onestop_id);
          pairs.stop_pairs = [];
          lookup[feed_onestop_id] = pairs;
          feed_stop_pairs.push(pairs);
        }
        pairs.stop_pairs.push(stop_result.toArray());
      });
      return feed_stop_pairs;
    }); // end query feed
  }  // end model
});
