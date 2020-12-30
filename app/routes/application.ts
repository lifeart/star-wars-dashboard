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
    const peoples = this.store.peekAll('people');
    const starships = this.store.peekAll('starship');

    console.log(peoples);
    this.store.createRecord('battle', {
      battlables: [ peoples.firstObject, peoples.lastObject ]
    });
    this.store.createRecord('battle', {
      battlables: [ starships.firstObject, starships.lastObject ]
    })
    return [...peoples.toArray(), ...starships.toArray()];
  }
}
