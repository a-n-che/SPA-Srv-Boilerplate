module.exports = async (ctx, next)=>{
    ctx.body = {
		data:[
		{ id:1, username:"Ivanov Ivan Ivanovich", login:"ivanov_ii", password:"111"},
		{ id:2, username:"Petrov Petr Petrovich", login:"petrov_pp", password:"222"},
		{ id:3, username:"Sidorov Sidor Sodorovich", login:"Sidorov_ss", password:"333"},
		{ id:4, username:"Иосиф Виссарионович Сталин", login:"stalin", password:"444"},
		{ id:5, username:"До́нальд Джон Трамп", login:"dony", password:"555"},
		{ id:6, username:"Mickey Rourke", login:"philipok", password:"666"}
		] };
}