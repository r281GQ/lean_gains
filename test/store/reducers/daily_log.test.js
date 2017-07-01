import Immutable from "immutable";
import chai, { expect } from "chai";
import chaiImmutable from "chai-immutable";

chai.use(chaiImmutable);

describe.only('description', () => {

  it('should get back the INITIAL_STATE', () => {
    expect(1).to.equal(1);
  });

});
