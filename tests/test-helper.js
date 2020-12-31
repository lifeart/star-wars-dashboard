import Application from 'star-wars-dashboard/app';
import config from 'star-wars-dashboard/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();
