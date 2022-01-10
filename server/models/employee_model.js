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
            'dept_id',
            'designation_id',
            'salary'
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

    insertColumns() {
        var columns = this.publicFields[0];
        for(let i = 1; i<this.publicFields.length; i++) {
            columns += ', '+this.publicFields[i];
        }
        columns += ', '+this.privateFields[0];
        for(let i = 1; i<this.privateFields.length; i++) {
            columns += ', '+this.privateFields[i];
        }
        return columns;
    }

    insert(data) {
        let placeholders = '$1';
        for(let i=2; i<=(this.publicFields.length + this.privateFields.length); i++) {
            placeholders += ', $'+i;
        }
        let query = `
        INSERT INTO ${this.table} 
        (${this.insertColumns()}) 
        VALUES (${placeholders})
        RETURNING id`;
        console.log(query);
        let dataArr = []
        for(let i=0; i<this.publicFields.length; i++) {
            if(data[this.publicFields[i]]) {
                dataArr.push(data[this.publicFields[i]]);
            } else {
                return Promise.resolve(false);
            }
        }
        for(let i=0; i<this.privateFields.length; i++) {
            if(data[this.privateFields[i]]) {
                dataArr.push(data[this.privateFields[i]]);
            } else {
                return Promise.resolve(false);
            }
        }
        return this.pgConnector.query(query, dataArr);
    }
};

module.exports = Employee