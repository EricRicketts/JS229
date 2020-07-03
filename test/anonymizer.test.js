import { Account } from "../code/account";

describe('Redo Anonymizer Exercise Practice for JS229 Take Home Assessment', function () {
  describe('Single Account Properties', function () {
    let fooBar, password;
    beforeEach(() => {
      fooBar = Object.create(Account).init('foo@bar.com', 'Linus_2_valds',
        'Foo', 'Bar');
      password = 'Linus_2_valds';
    });

    it('Account should return an object', function () {
      expect(Object.prototype.toString.call(fooBar)).toBe('[object Object]');
    });

    it('returns email given correct password', function () {
      expect(fooBar.email(password)).toBe('foo@bar.com');
    });

    it('returns first name given correct password', function () {
      expect(fooBar.firstName(password)).toBe('Foo');
    });

    it('returns last name given correct password', function () {
      expect(fooBar.lastName(password)).toBe('Bar');
    });

    it('should return "Invalid Password" for incorrect password', function () {
      expect(fooBar.email('1234578')).toBe('Invalid Password');
    });

    it('displayName should have sixteen alphanumeric characters', function () {
      expect(fooBar.displayName).toMatch(/[a-z0-9]{16}/);
    });

    it('successful reset of password returns true', function () {
      expect(fooBar.resetPassword(password, 'eric_elliot')).toBe(true);
    });

    it('need a correct password to reset a password', function () {
      expect(fooBar.resetPassword('123456', 'eric_elliot')).toBe('Invalid Password');
    });

    it('reanonymize sets a new display name', function () {
      let oldDisplayName = fooBar.displayName;
      expect(fooBar.reanonymize(password)).toBe(true);
      expect(fooBar.displayName).not.toBe(oldDisplayName);
    });
  });

  describe('Each Account has its own properties', function () {
    let fooBar, barQux, fooBarPassword, barQuxPassword, results, expected;
    beforeEach(() => {
      fooBar = Object.create(Account).init('foo@bar.com', 'Linus_2_valds',
        'Foo', 'Bar');
      barQux = Object.create(Account).init('baz@qux.com', 'Dhh_4_rails',
        'Baz', 'Qux');
      fooBarPassword = 'Linus_2_valds';
      barQuxPassword = 'Dhh_4_rails';
    });

    it('each instance returns unique emails', function () {
      expected = ['foo@bar.com', 'baz@qux.com'];
      results = [fooBar.email(fooBarPassword), barQux.email(barQuxPassword)];
      expect(results).toEqual(expected);
    });

    it('each instance returns unique first names', function () {
      expected = ['Foo', 'Baz'];
      results = [fooBar.firstName(fooBarPassword), barQux.firstName(barQuxPassword)];
      expect(results).toEqual(expected);
    });

    it('each instance returns unique last names', function () {
      expected = ['Bar', 'Qux'];
      results = [fooBar.lastName(fooBarPassword), barQux.lastName(barQuxPassword)];
      expect(results).toEqual(expected);
    });
  });
});