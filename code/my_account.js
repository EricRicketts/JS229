let Account = (function() {
  const randomCharacter = () => {
    const highRadix = 36;
    return Math.floor(Math.random() * highRadix).toString(highRadix);
  }

  const anonymizer = () => {
    const strSize = 16;
    return '0'.repeat(strSize).replace(/./g, randomCharacter);
  }

  function isValidPassword(attempt, password) {
    return attempt === password;
  }

  function withValidPassword(attempt, password, validPasswordDo) {
    return isValidPassword(attempt, password) ? validPasswordDo() : 'Invalid Password';
  }

  return {
    init(email, password, firstName, lastName) {
      let user = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        displayName: anonymizer()
      };

      Object.defineProperty(this, 'displayName', {
        get: () => user.displayName,
      });

      this.firstName = (password) => {
        return withValidPassword(password, user.password, () => user.firstName);
      }

      this.email = (password) => {
        return withValidPassword(password, user.password, () => user.email);
      }

      this.lastName = (password) => {
        return withValidPassword(password, user.password, () => user.lastName);
      }

      this.reanonymize = (password) => {
        return withValidPassword(password, user.password, () => {
          user.displayName = anonymizer();
          return true;
        });
      }

      this.resetPassword = (password, newPassword) => {
        return withValidPassword(password, user.password, () => {
          user.password = newPassword;
          return true;
        });
      }

      return this;
    },

  }
})();

export { Account };