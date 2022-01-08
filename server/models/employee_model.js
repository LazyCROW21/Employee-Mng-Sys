class Employee {
    constructor(pgConnector) {
        this.pgConnector = pgConnector;
        this.table = 'employee';
        this.primaryKey = 'id';
        this.publicFields = [
            'first_name',
            'last_name',
            'phone',
            'email',
        ];
        this.privateFields = ['pwd'];
    }

    select() {
        var columns = this.primaryKey;
        for(let i = 0; i<this.publicFields.length; i++) {
            columns += ', '+this.publicFields[i];
        }
        return columns;
    }

    findAll() {
        let query = `SELECT ${this.select()} FROM ${this.table}`;
        // console.log(query);
        return this.pgConnector.query(query);
    }

    findById(id) {
        return this.pgConnector.query(`
            SELECT ${this.select()} 
            FROM ${this.table} 
            WHERE ${this.primaryKey} = $1`,
            [id]
        );
    }

    loginCheck(id, pwd) {
        let query = `
            SELECT ${this.primaryKey} 
            FROM ${this.table} 
            WHERE ( email = $1 OR phone = $1 ) AND pwd = $2`;
        // console.log(query);
        return this.pgConnector.query(query, [id, pwd]);
    }
};

module.exports = Employee