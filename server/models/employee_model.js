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
        this.privateFields = []; //'pwd'
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

    // loginCheck(id, pwd) {
    //     let query = `
    //         SELECT ${this.primaryKey} 
    //         FROM ${this.table} 
    //         WHERE ( email = $1 OR phone = $1 ) AND pwd = $2`;
    //     // console.log(query);
    //     return this.pgConnector.query(query, [id, pwd]);
    // }

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
        RETURNING ${this.select()}`;
        // console.log(query);
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

    
    updateColumns(data) {
        let setQrySet = [];
        const updateKeys = Object.keys(data);
        let dataArr = [];
        let param_idx = 2;
        for(let i=0; i<this.publicFields.length; i++) {
            let idx = updateKeys.indexOf(this.publicFields[i])
            if(idx > -1) {
                // setquery += `${this.publicFields[i]} = $${i+2}`
                setQrySet.push(this.publicFields[i]+` = $${param_idx}`);
                param_idx++;
                dataArr.push(data[updateKeys[idx]]);
            }
        }

        // for(let i=0; i<this.privateFields.length; i++) {
        //     let idx = updateKeys.indexOf(this.privateFields[i])
        //     if(idx > -1) {
        //         // setquery += `${this.publicFields[i]} = $${i+2}`
        //         setQrySet.push(this.privateFields[i]+` = $${param_idx}`);
        //         param_idx++;
        //         dataArr.push(data[updateKeys[idx]]);
        //     }
        // }

        let setquery = setQrySet.join(', ');
        return {setquery, dataArr}
    }

    update(id, data) {
        let {setquery, dataArr} = this.updateColumns(data);
        if(setquery.length == 0) {
            return Promise.resolve(false);
        }
        let query = `
        UPDATE ${this.table}
        SET ${setquery}
	    WHERE ${this.primaryKey} = $1 RETURNING ${this.select()};`;
        // console.log(query);
        return this.pgConnector.query(query, [id, ...dataArr]);
    }

    delete(id) {
        let query = `
        DELETE FROM ${this.table}
	    WHERE ${this.primaryKey} = $1 RETURNING ${this.select()};`;
        return this.pgConnector.query(query, [id]);
    }
};

module.exports = Employee