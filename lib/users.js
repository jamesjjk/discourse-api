exports = module.exports = function(Discourse, actionTypeEnum) {

  "use strict";

  var actionTypeEnum = actionTypeEnum;

  Discourse.prototype.activateUser = function (id, username, callback) {
    this.put('admin/users/' + id + '/activate',
      {context: 'admin/users/' + username},
      function (error, body, httpCode) {
        callback(error, body, httpCode);
      }
    );
  };

  Discourse.prototype.approveUser = function (id, username, callback) {
    this.put('admin/users/' + id + '/approve',
      {context: 'admin/users/' + username},
      function (error, body, httpCode) {
        callback(error, body, httpCode);
      }
    );
  };

  Discourse.prototype.createUser = function (name, email, username, password, active, callback) {

    var that = this;

    that.post('users',
      {
        'name': name,
        'email': email,
        'username': username,
        'password': password,
        'active': active
      },
      function (error, body, httpCode) {
        callback(error, body, httpCode);
      }
    );

  };

  Discourse.prototype.deleteUser = function (id, username, callback) {
    this.delete('admin/users/' + id + '.json',
      {context: '/admin/users/' + username},
      function (error, body, httpCode) {
        callback(error, body, httpCode);
      }
    );
  };

  /**
   * Delete user and block their email and IP address
   * @param id
   * @param username
   * @param callback
   */
  Discourse.prototype.deleteAndBlockUser = function (id, username, callback) {
    this.delete('/admin/users/' + id + '.json',
      {
        context: '/admin/users/' + username,
        block_email: true,
        block_urls: true,
        block_ip: true
      },
      function (error, body, httpCode) {
        callback(error, body, httpCode);
      }
    );
  };

  Discourse.prototype.deleteAndBlockUserSync = function(id, username) {

    return this.deleteSync('admin/users/' + id + '.json', {
      context: '/admin/users/' + username,
      block_email: true,
      block_urls: true,
      block_ip: true
    });
  };

  Discourse.prototype.getUser = function (username, callback) {
    this.get('users/' + username + '.json',
      {},
      callback
    );
  };

  Discourse.prototype.getUserActivity = function (username, offset, callback) {
    this.get('user_actions.json',
      {
        username: username,
        filter: actionTypeEnum.REPLY,
        offset: offset || 0
      },
      function (error, body, httpCode) {
        callback(error, body, httpCode);
      }
    );
  };

  Discourse.prototype.login = function (username, password, callback) {
    this.post('session', {'login': username, 'password': password}, function (error, body, httpCode) {
      callback(error, body, httpCode);
    });
  };

  Discourse.prototype.logout = function (username, callback) {
    this.delete('session/' + username, {}, function (error, body, httpCode) {
      callback(error, body, httpCode);
    });
  };

  Discourse.prototype.fetchConfirmationValue = function (callback) {

    // discourse api should bypass the honeypot since it is a trusted user (confirmed via api key)

    this.get('users/hp.json',
      {},
      function (error, body, httpCode) {
        callback(error, body, httpCode);
      }
    );

  };

  Discourse.prototype.getUserEmail = function (username, callback) {
    this.put('users/' + username + '/emails.json',
      {context: '/users/' + username + '/activity'},
      function (error, body, httpCode) {
        callback(error, body, httpCode);
      }
    );
  };

};
