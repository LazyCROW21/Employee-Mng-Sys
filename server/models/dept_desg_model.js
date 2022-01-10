class DeptDesg {
    constructor(pgConnector) {
        this.pgConnector = pgConnector;
        this.table = 'dept_designation';
        this.primaryKey = 'id';
        this.publicFields = [
            'dept_id',
            'designation'
        ];
        this.privateFields = [];
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

    insertColumns() {
        var columns = this.publicFields[0];
        for(let i = 1; i<this.publicFields.length; i++) {
            columns += ', '+this.publicFields[i];
        }
        // columns += ', '+this.privateFields[0];
        // for(let i = 1; i<this.privateFields.length; i++) {
        //     columns += ', '+this.privateFields[i];
        // }
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
        RETURNING (${this.select()})`;
        console.log(query);
        let dataArr = []
        for(let i=0; i<this.publicFields.length; i++) {
            if(data[this.publicFields[i]]) {
                dataArr.push(data[this.publicFields[i]]);
            } else {
                return Promise.resolve(false);
            }
        }
        // for(let i=0; i<this.privateFields.length; i++) {
        //     if(data[this.privateFields[i]]) {
        //         dataArr.push(data[this.privateFields[i]]);
        //     } else {
        //         return Promise.resolve(false);
        //     }
        // }
        return this.pgConnector.query(query, dataArr);
    }

    delete(id) {
        let query = `
        DELETE FROM ${this.table}
	    WHERE ${this.primaryKey} = $1 RETURNING ${this.select()};`;
        return this.pgConnector.query(query, [id]);
    }
};

module.exports = DeptDesg