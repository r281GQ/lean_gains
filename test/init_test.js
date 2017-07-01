import {JSDOM} from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import jquery from 'jquery';

const dom = new JSDOM('<!doctype html> <html><body><h1>hello</h1></body></html>');

global.document = dom.window.document;
global.window = dom.window;

global.navigator = {
  userAgent: 'node.js'
};

const r = jquery(global.window);

chai.use(chaiImmutable);

export { dom, r };
