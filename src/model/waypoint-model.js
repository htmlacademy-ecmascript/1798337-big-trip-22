import { getRandomWaypoint } from '../mock/waypoint-mock.js';

const WAYPOINT_COUNT = 3;

export default class WaypointModel {
  waypoints = Array.from({length: WAYPOINT_COUNT}, getRandomWaypoint);

  getWaypoint() {
    return this.waypoints;
  }
}
