import {JSDOM} from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

const dom = new JSDOM('<!doctype html> <html><body><h1>hello</h1></body></html>');

chai.use(chaiImmutable);

export { dom };
