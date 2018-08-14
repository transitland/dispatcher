import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  changeset: service(),
  actions: {
    update() {
      let payload = encodeURI(JSON.stringify(this.get('changeset').createChangesetPayloadFromLocalEdits()));
      let notes = `Edits to feed with Onestop ID of ${this.get('model.id')}`;
      this.transitionToRoute('changesets.new', {
        queryParams: {
          payload: payload,
          notes: notes
        }
      });
    }
  }
});
