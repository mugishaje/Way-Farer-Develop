import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();
const assert = chai.assert;
const expect = chai.expect;

describe('before each', () => {
    it('should', () => {
        const num1 = 5;
        const num2 = 5;
        const num3 = 10;
        assert.equal(num3, 10);
    });
})