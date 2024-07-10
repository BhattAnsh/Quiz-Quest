import router from './userHandling/register.route.js';
export default function(app){

    app.use('/user', router);
}