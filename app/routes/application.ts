import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {
  async loadAllModelsPerPage(modelName: string, page = 1) {
    const data = await this.store.query(modelName, { page });
    if (data.links.next) {
      await this.loadAllModelsPerPage(modelName, page + 1);
    }
  }
  async model() {
    await Promise.all([
      this.loadAllModelsPerPage('people'),
      this.loadAllModelsPerPage('starship')
    ]);
  }
  afterModel() {
    const peoples = this.store.peekAll('people');
    const starships = this.store.peekAll('starship');

    this.store.createRecord('battle', {
      battlables: [ peoples.firstObject, peoples.lastObject ],
      id: 1,
      name: 'Test battle'
    });
    this.store.createRecord('battle', {
      battlables: [ starships.firstObject, starships.lastObject ],
      id: 2,
      name: 'Second Test battle'
    })
  }
  redirect() {
    this.transitionTo('battle-constructor');
  }
}
