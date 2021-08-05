var a = {
	shooter:{ id:$("#show_frame2"), next:$("#next02"), prev:$("#prev02") },
	exhibition:{ id:$("#show_frame1"), next:$("#next01"), prev:$("#prev01") }
};
var tops = {
	id: $("#show_frame0"),
	lang: $("#language"),
	next: $("#next00"),
	prev: $("#prev00"),
	back: $("#back")
}
var g_flg = {};

jQuery(function(){
	$("a").css("outline","none").focus(function(){ $(this).blur() });

(function(speed){
	$(".fade").hover(
		function(){ $(this).stop().fadeTo(speed,1) },
		function(){ $(this).fadeTo(speed,0) } );
})("fast");

(function(name){
	$(name).click(function(){
		for(var key in a){
			a[key].id.fadeOut("nomarl");
			if(!!a[key].next)a[key].next.hide();
			if(!!a[key].prev)a[key].prev.hide();
		}
		tops.lang.show();
		tops.id.show();
		tops.next.hide();
		tops.prev.hide();
		tops.back.show();
	})
})("#next00,#prev00");

(function(){
	$("#shooter_button").click(function(){ Switch(a.shooter); })
	$("#exhibition_button").click(function(){ Switch(a.exhibition); })
})();

NewAddress().Exec();

})

function Switch(a_obj){
	if( !g_flg[a_obj.id.attr("id")] )bindCycleImage(a_obj);
	$(".fade").hide();
	a_obj.id.fadeIn("slow",function(){
		tops.id.hide();
		$(".fade").show();
	});
	tops.lang.hide();
	tops.next.hide();
	tops.prev.show();
	tops.back.hide();
	if(!!a_obj.next)a_obj.next.show();
	if(!!a_obj.prev)a_obj.prev.hide();
}

function bindCycleImage(a_obj){
	var _id = a_obj.id;
	var _scroll = _id.find("div")[0];
	if(!!g_flg[_id.attr("id")])return;
	g_flg[_id.attr("id")] = true;
	if( $(_scroll).find("img").size()<2 )return;
	
	$(_scroll).cycle({
		speed: "normal",
		timeout: 0,
		nowrap: 1,
		before: function(a,b,c,d){ $(".fade").hide() },
		after: function(a,b,c,d){
			if(c.currSlide==c.slideCount-1){ a_obj.next.fadeOut("fast") }
			else{ a_obj.next.fadeIn("fast") }
			if(c.currSlide==0){ a_obj.prev.hide();tops.prev.show(); }
			else{ a_obj.prev.show();tops.prev.hide() }
			$(".fade").show();
		},
		next: a_obj.next,
		prev: a_obj.prev,
		fx: "scrollHorz"
	}).width(960).height(476).css("position","");
}

function NewAddress(){
	this._url=document.URL.split("#");
	
	this.Select = {
		shooter: function(){ Switch(a.shooter); },
		museum: function(){ Switch(a.exhibition); },
		exhibition: function(){ Switch(a.exhibition); }
	};
	
	this.Exec = this.Select[this._url[1]] || function(){ return this; };
	return this;
}
