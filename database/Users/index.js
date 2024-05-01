const {ConnectionPool} = require('mssql');
const config = require('../config.js');

const connectionString = `Server=tcp:ezezimalidbs.database.windows.net,1433;Initial Catalog=ezezimalidb;Persist Security Info=False;User ID=ezezimali_admin;Password=Ezimal11;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;`;

async function readerUserData(userID) {
    try {
        // Create a new connection pool
        const pool = new ConnectionPool(connectionString);
        await pool.connect();

        console.log("Reading rows from the Table...");
        const resultSet = await pool.request().query(`select profile_pic_url, user_type from [User] where email = '${userID}'`);

        let user = null;
        resultSet.recordset.forEach(row => {
            user = row;
        });

        // Close the connection pool
        await pool.close();

        return user;
    } catch (err) {
        console.error(err.message);
        throw err; // Re-throw the error to handle it in the caller
    }
}

async function insertUserData(email, profile_pic_url) {
    try {
        // Create a new connection pool
        const pool = new ConnectionPool(connectionString);
        await pool.connect();

        console.log("Inserting data...");

        // Insert the row into the table
        const resultSet = await pool.request().query(`
            IF NOT EXISTS (SELECT 1 FROM [User] WHERE email = '${email}')
            BEGIN
                INSERT INTO [User] (email, profile_pic_url, user_type, created_at)
                VALUES ('${email}', '${profile_pic_url}', 'Applicant', GETDATE());
            END
        `);

        // Close the connection pool
        await pool.close();

        let returnObj = { message: "Failure" };

        if (resultSet.rowsAffected[0] == 1) {
            returnObj.message = "Success";
        }

        console.log(returnObj);
        return returnObj;
    } catch (err) {
        console.error(err.message);
        throw err; // Re-throw the error to handle it in the caller
    }
}


async function updateUserData(email, profile_pic_url) {
    try {
        // Create a new connection pool
        const pool = new ConnectionPool(connectionString);
        await pool.connect();

        console.log("Updating data...");

        // Insert the row into the table
        const resultSet = await pool.request().query(`
        UPDATE [User]
        SET profile_pic_url = '${profile_pic_url}'
        WHERE email = '${email}';
        `);

        // Close the connection pool

        // ok so to connect it to the app neh its just taking the functions in index.js from db folder...  thats about it if u wanna connect it to the app i guess 

        // ok should i git push and u can work oon my branch? 

        // ok tell me what u need done on the db 

        // table :
        // name of fund + name of person

        // ok so the table is called funders.. create a fund tagged to a person thats all neh? 



        await pool.close();

        let returnObj = { message: "Failure" };

        if (resultSet.rowsAffected[0] == 1) {
            returnObj.message = "Success";
        }

        console.log(returnObj);
        return returnObj;
    } catch (err) {
        console.error(err.message);
        throw err; // Re-throw the error to handle it in the caller
    }
}

// async function updateUserData(email, profile_pic_url) {
//     try {
//         // Create a new connection pool
//         const pool = new ConnectionPool(connectionString);
//         await pool.connect();

//         console.log("Updating data...");

//         // Update the row in the table
//         const resultSet = await pool.request().query(`
//             UPDATE [User]
//             SET profile_pic_url = '${profile_pic_url}'
//             WHERE email = '${email}';
//         `);

//         // Close the connection pool
//         await pool.close();

//         let returnObj = { message: "Failure" };

//         if (resultSet.rowsAffected[0] == 1) {
//             returnObj.message = "Success";
//         }

//         console.log(returnObj);
//         return returnObj; 
        
//     } catch (err) {
//         console.error(err.message);
//         throw err; // Re-throw the error to handle it in the caller
//     }
// }

// async function readerUserData(userID) {
//     try {
//         var poolConnection = await sql.connect(connectionString);

//         console.log("Reading rows from the Table...");
//         var resultSet = await poolConnection.request().query(`select profile_pic_url , user_type  from [User] where email = '${userID}'`);

//         let user = null; 
//         resultSet.recordset.forEach(row => {
//             user = row;
//         });

//         // close connection only when we're certain application is finished
//         await poolConnection.close();

//         return user;
//     } catch (err) {
//         console.error(err.message);
//         throw err; // Re-throw the error to handle it in the caller
//     }
// }

// async function insertUserData(email, profile_pic_url) {
//     try {
//         // Connect to the database

//         const poolConnection = await sql.connect(config);

//         // console.log("smurf", userExists)

//         // Insert the row into the table

        

//             console.log("Inserting!!")
//         const resultSet = await poolConnection.request().query(`IF NOT EXISTS (SELECT 1 FROM [User] WHERE email = '${email}')
//         BEGIN
//             INSERT INTO [User] (email, profile_pic_url, user_type, created_at)
//             VALUES ('${email}', '${profile_pic_url}', 'Applicant', GETDATE());
//         END
//         `);

//         // Close the connection
//         await poolConnection.close();

//         let returnObj = null;

//         if (resultSet.rowsAffected[0] == 1) {
//             returnObj = { "message" : "Success"};
//         }else{
//             returnObj = { "message" : "Failure"};
//         }
//         console.log(returnObj)
//         return returnObj;        

        
//     } catch (err) {
//         console.error(err.message);
//         throw err; // Re-throw the error to handle it in the caller
//     }
// }

// async function updateUserData(email, profile_pic_url) {
//     try {
//         // Connect to the database

//         const poolConnection = await sql.connect(config);


//             console.log("Updating!!")
//         const resultSet = await poolConnection.request().query(`
//         UPDATE [User]
//         SET profile_pic_url = '${profile_pic_url}'
//         WHERE email = '${email}';`);

//         await poolConnection.close();

//         let returnObj = null;

//         if (resultSet.rowsAffected[0] == 1) {
//             returnObj = { "message" : "Success"};
//         }else{
//             returnObj = { "message" : "Failure"};
//         }
//         console.log(returnObj)
//         return returnObj; 
        
//     } catch (err) {
//         console.error(err.message);
//         throw err; // Re-throw the error to handle it in the caller
//     }
// }


// insertUserData("fhddbsjkf", "d")
// updateUserData("fhddbdsdsjkf", "f")

module.exports = {
    readerUserData,
    insertUserData,
    updateUserData
};
// module.exports = insertUserData;
