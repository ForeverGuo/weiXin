function circle(){
	var class1=document.getElementsByClassName('circle');
	/*var args = Array.prototype.slice.call(class1);*/
	//var content1=log(class1);
//	for(var i = 0; i < class1.length; i++){
//		console.log(class1[i]);
//	}
	console.log(class1);

}

/*function log(arr){
        var args = Array.prototype.slice.call(arr); //为了使用unshift数组方法，将argument转化为真正的数组
        //args.unshift('(app)'); //console.log.apply(console, args);
        
        console.log(arguments);
		return args;
};*/
window.onload=function(){
	circle();
}
