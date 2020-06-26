'use strict';

/** ACL Roles
 * @module acl
 */

// role: ['capability', 'permission']
module.exports = {
  user: ['read'],
  write: ['read', 'create'],
  editor: ['read', 'create', 'update'],
  admin: ['read', 'create', 'update', 'delete']
}
