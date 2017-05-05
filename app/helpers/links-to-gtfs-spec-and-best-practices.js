import Ember from 'ember';

export function linksToGtfsSpecAndBestPractices(params, hash) {
  let html;
  let bestPracticesBase = 'http://gtfs.org/best-practices/';
  let specBase = 'https://github.com/google/transit/blob/master/gtfs/spec/en/reference.md';
  let anchors = {
    'agency.txt': {
      'spec': 'agencytxt',
      'bestPractices': 'agency'
    },
    'calendar.txt': {
      'spec': 'calendartxt',
      'bestPractices': 'calendar'
    },
    'calendar_dates.txt': {
      'spec': 'calendar_datestxt',
      'bestPractices': 'calendar'
    },
    'feed_info.txt': {
      'spec': 'feed_infotxt',
      'bestPractices': 'feed-info'
    },
    'fare_attributes.txt': {
      'spec': 'fare_attributestxt',
      'bestPractices': 'fare-rules'
    },
    'fare_rules.txt': {
      'spec': 'fare_rulestxt',
      'bestPractices': 'fare-rules'
    },
    'frequencies.txt': {
      'spec': 'frequenciestxt',
      'bestPractices': 'frequencies'
    },
    'routes.txt': {
      'spec': 'routestxt',
      'bestPractices': 'routes'
    },
    'shapes.txt': {
      'spec': 'shapestxt',
      'bestPractices': 'shapes'
    },
    'stop_times.txt': {
      'spec': 'stop_timestxt',
      'bestPractices': 'stop-times'
    },
    'stops.txt': {
      'spec': 'stopstxt',
      'bestPractices': 'stops'
    },
    'transfers.txt': {
      'spec': 'stopstxt',
      'bestPractices': 'transfers'
    },
    'trips.txt': {
      'spec': 'tripstxt',
      'bestPractices': 'trips'
    }
  };
  if (hash.destination == 'spec') {
    return (specBase + '#' + anchors[hash.filename].spec);
  } else if (hash.destination == 'bestPractices') {
    return (bestPracticesBase + '#' + anchors[hash.filename].bestPractices);
  }
  return html;
}

export default Ember.Helper.helper(linksToGtfsSpecAndBestPractices);
