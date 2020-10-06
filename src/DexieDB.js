import Dexie from 'dexie';
import 'dexie-observable';

const db = new Dexie('testbed');
db.version(1).stores({
    Manuscript : `$$uuid,title, author, structure, lastupdated`,
    Cards: `$$uuid,title,content,lastupdated`,
});
/* 
The observable elements are set up in main.js
*/
export default db;