module.exports = {
	//apiHost:"http://fd175.skymvc.com/",
	//apiHost: "http://127.0.0.1:8080",
	//apiHost: "http://127.0.0.1:888"
	apiHost: "http://127.0.0.1:888",
	appRoot: "http://127.0.0.1:8081",
	wsHost: "wss://wss.deituicms.com:8282",
	pmTimer: 0,
	inPost: false,
	
	goBack: function() {
		console.log(Router);
		this.$router.go(-1);
	},
	goH5:function(url){
		// #ifdef H5
		url=this.appRoot+"#"+url; 
		var a=document.createElement("a");
		a.href=url;
		a.target="_blank";
		a.click();
		// #endif
		
	},
	getToken: function() {
		var authcode = uni.getStorageSync("admin.token"); 
		return authcode;
	},
	setToken: function($authcode) {
		uni.setStorageSync("admin.token", $authcode);
	},
	 
	setOpenid: function(openid) {
		uni.setStorageSync("openid", openid)
	},
	getOpenid: function(openid) {
		uni.getStorageSync("openid")
	},
	
	getGps: function() {
		var gps = uni.getStorageSync("appGps");
		if (gps == "") {
			return {
				lat: 39.850836,
				lng: 116.471564
			};
		}
		return JSON.parse(gps);

	},
	setGps: function(lat, lng) {
		var s = {
			lat: lat,
			lng: lng
		};
		var str = JSON.stringify(s);
		uni.setStorageSync("appGps", str);
	},
	
	fromapp: function() {
		//var $paltform= uni.platform();
		return "uniapp";
	},
	isWeixin: function() {
		// #ifdef H5
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		}
		// #endif
		return false;
	},
	get: function(ops) {
		var ops = ops;
		if (ops.data == undefined) {
			ops.data = {
				token: this.getToken(),
				fromapp: this.fromapp(),
				ajax: 1
			};
		} else {
			ops.data.token = this.getToken();
			ops.data.fromapp = this.fromapp();
			ops.data.ajax = 1;
		}

		uni.request({
			url: ops.url,
			method: "GET",
			data: ops.data,
			success: (rs) => {

				if (rs.data.error == 1000 && ops.unLogin == undefined) {
					uni.navigateTo({
						url: "../../pages/login/index"
					})
				} else {
					ops.success(rs.data);
				}
			}
		})
	},
	post: function(ops) {
		var callback = callback;
		var ops = ops;
		if (ops.url.indexOf("?") >= 0) {
			ops.url += "&ajax=1&token=" + this.getToken() + "&fromapp=" + this.fromapp();
		} else {
			ops.url += "?ajax=1&token=" + this.getToken() + "&fromapp=" + this.fromapp();
		}

		uni.request({
			url: ops.url,
			data: ops.data,
			method: "POST",
			header: {
				"content-type": "application/x-www-form-urlencoded"
			},
			success: (rs) => {
				if (rs.data.error == 1000 && ops.unLogin == undefined) {
					uni.navigateTo({
						url: "../../pages/login/index"
					})
				} else {
					ops.success(rs.data);
				}
			}
		})
	},

	canPost: function() {
		var that = this;
		if (!this.inPost) {
			this.inPost = true;

			setTimeout(function() {
				that.inPost = false;
			}, 1000)
			return true;
		} else {
			setTimeout(function() {
				that.inPost = false;
			}, 1000)
			return false;
		}

	},
	goH5WeiXin: function(backurl) {
		// #ifdef H5
		var url = document.location.href.split('#')[0] + "#" + backurl;
		window.location = this.apiHost + '/index.php?m=open_weixin&a=Geturl&backurl=' + encodeURIComponent(url);
		// #endif

	},
	html: function(html) {
		if (html == '' || html == null) return '';
		html = html.replace(' style="', '  xstyle="');
		html = html.replace(/<img /g, '<img style="max-width:100%;height:auto;"');
		html = html.replace(/&hellip;/g, '');
		html = html.replace(' class="brush:html;toolbar:false"', " ");
		html = html.replace(/<pre /g,
			'<pre style="border:1px solid #eee;padding:10px;max-height:300px;overflow:auto;" ');

		html = html.replace(/<pre /g, "<view ");
		html = html.replace("</pre>", "</view>");
		html = html.replace(/\n/g, "<br />");
		html = html.replace(/<iframe /, '<view style="display:none" ');
		html = html.replace(/<\/iframe>/, '</view>');
		html = html.replace("<section ", "<view ");
		html = html.replace("</section>", "</view>");

		//console.log(html);
		return html;
	},
	pageList:function(rscount,limit,per_page){
		//1 2 3....4 5 6 7 8...58 59 60
		//总页数
		var aPage= Math.ceil(rscount/limit) ;
		console.log(rscount,limit,aPage) 
		//当前页数
		var iPage=Math.ceil(per_page/limit);
		if(aPage==0){
			return new Array();
		}
		var pages=new Array();
		var  mPage=Math.min(3,aPage);
		for(let i=0;i<mPage;i++){
			pages.push({
			 
				per_page:i*limit,
				value:i+1
			});
		}
		if(aPage>4){
			pages.push({
			 
				per_page:4*limit,
				value:"..."
			});
		}
		
		
		var minPage=Math.max(iPage-8,3) ;
		var maxPage=Math.min(iPage+8,aPage-3) ;
		console.log(minPage,maxPage) 
		for(let i=minPage;i<maxPage;i++){
			pages.push({
			 
				per_page:i*limit,
				value:i+1
			});
		}
		if(aPage>8 ){
			pages.push({
			 
				per_page:(aPage-4)*limit,
				value:"..."
			});
			for(let i=aPage-3;i<aPage;i++){
				pages.push({
				 
					per_page:i*limit,
					value:i+1
				});
			}	
		}
		console.log(pages)
		return pages;
	}


}
