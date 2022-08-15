import propertyValidator from '../../../../src/core/validators/propertyValidator';

describe('Property Validator', () => {
  it('Should return true if object has the especified property', () => {
    const obj = { test: '1' };
    const hasTest = propertyValidator('test', obj);

    expect(hasTest).toBeTruthy();
  });

  it('Should return false if object hasnt the especified property', () => {
    const obj = { test: '1' };
    const hasTest = propertyValidator('other', obj);

    expect(hasTest).toBeFalsy();
  });
});
