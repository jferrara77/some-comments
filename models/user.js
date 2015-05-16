/**
 * Some Comments - a comment engine
 * Copyright (C) 2015 Fredrik Liljegren
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the
 * GNU Affero General Public License as published by the Free Software Foundation, either version 3
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See
 * the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License along with this
 * program. If not, see <http://www.gnu.org/licenses/>.
 *
 * @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt
 * GNU-AGPL-3.0
 */

/**
 * User
 */
function User(id, displayName, avatar) {
  this.id          = id
  this.displayName = displayName
  this.avatar      = avatar
}
User.getById = function(id) {
  return global.app.locals.db
    .get('SELECT * FROM users WHERE id = ?', id)
    .then(function(userData) {
      if (typeof userData === 'undefined') {
        throw 'No user with id: ' + id
      }

      return new User(id, userData.displayName, userData.avatar)
    })
}
User.create = function(displayName, avatar) {
  console.log('Creating user: INSERT INTO users (displayName, avatar) VALUES(?,?)',
              displayName, avatar)

  return global.app.locals.db
    .run('INSERT INTO users (displayName, avatar) VALUES(?,?)', displayName, avatar)
    .then(function(db) {
      return new User(db.lastID, displayName, avatar)
    })
}
User.prototype.toString = function() {
  return this.displayName + ' (' + this.id + ')'
}

module.exports = User