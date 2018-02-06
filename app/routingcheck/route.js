import Ember from 'ember';
import Route from '@ember/routing/route';
import { inject } from '@ember/service';
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

// Find the first and last stop that aren't the same.
function stop_endpoints(stops) {
  var origin = stops[0];
  var destination = null;
  for (var i = stops.length - 1; i >= 0; i--) {
    destination = stops[i];
    if (destination != origin) { break }
  }
  return [origin, stops[stops.length-1]];
}

export default Route.extend(FeedParamsRoute, PaginatedSortableRoute, {
  valhalla_route: inject.service('valhalla-route'),
  model: function(params) {
    // Reset valhalla queue
    this.get('valhalla_route').empty();
    var self = this;
    var meta = null;

    // Find feeds
    return this.store.query('feed', params).then(function(feeds) {
      // Save the meta, for pagination
      meta = feeds.meta;

      // Find total routes for feed
      var rsp_count_promises = feeds.map(function(feed) {
        var feed_onestop_id = feed.id;
        var active_feed_version = feed.get('active_feed_version').get('id');
        console.log('route_count_promises:', feed_onestop_id, active_feed_version);
        return self.store.query('route-stop-pattern', {
          imported_from_feed: feed_onestop_id,
          imported_from_feed_version: active_feed_version,
          per_page: 0,
          total: true
        });
      });
      return Ember.RSVP.all(rsp_count_promises);

    }).then(function(rsp_count_results) {
      // Sample routes from the total routes for each feed
      var rsp_promises = rsp_count_results.map(function(rsp_count) {
        var feed_onestop_id = rsp_count.query.imported_from_feed;
        var feed_version_sha1 = rsp_count.query.imported_from_feed_version;
        var rsp_sample = [];
        for (var i=0; i < rsp_count.meta.total; i++) { rsp_sample.push(i); }
        if (rsp_count.meta.total === 0) {
          console.log("No rsps!");
          rsp_sample.push(0);
        }
        return shuffle_sample(rsp_sample, 2).map(function(rsp_offset) {
          console.log('rsp_promises:', feed_onestop_id, feed_version_sha1, rsp_offset);
          return self.store.query('route-stop-pattern', {
            imported_from_feed: feed_onestop_id,
            imported_from_feed_version: feed_version_sha1,
            per_page: 1,
            offset: rsp_offset,
            total: false
          });
        });
      });
      return Ember.RSVP.all([].concat.apply([], rsp_promises));

    }).then(function(rsp_results) {
      // Sample stops from each route
      var stop_promises = rsp_results.map(function(rsp_result) {
        var rsp = rsp_result.get('firstObject');
        if (!rsp) {
          console.log("No rsp! Selecting first two stops in feed.");
          return self.store.query('stop', {
            imported_from_feed: rsp_result.query.imported_from_feed,
            imported_from_feed_version: rsp_result.query.imported_from_feed_version,
            per_page: 2
          });
        }
        var stop_pattern_sample = stop_endpoints(rsp.get('stop_pattern'));
        console.log('stop_pattern', rsp.id, stop_pattern_sample);
        return self.store.query('stop', {
          imported_from_feed: rsp_result.query.imported_from_feed,
          onestop_id: stop_pattern_sample.join(',')
        });
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
    });

  }  // end model
});
