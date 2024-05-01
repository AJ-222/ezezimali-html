module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const roles = [];
    
    // Code to check for user's current AAD roles and add to the 'roles' array

    context.res = {
        status: 200,
        body: responseMessage
    };
}