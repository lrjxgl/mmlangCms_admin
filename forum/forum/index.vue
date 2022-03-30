<template>
	<view>
		<div class="tabs-border">
			<div @click="gourl('index')" class="item active">列表</div>
			<div @click="gourl('add')" class="item">添加</div>
		</div>
		 <table class="tbs">
<thead>  <tr>
   <td>id</td>
   <td>主题</td>
   <td>用户</td>
   <td>板块</td>
   <td>分类</td>
   <td>喜欢</td>
   <td>收藏</td>
   <td>观看</td>
   <td>发布时间</td>
<td>操作</td></tr>
  </tr>
</thead> <tr v-for="(item,index) in list" :key="index">
   <td>{{item.id}}</td>
   <td>{{item.title}}</td>
   <td>{{item.user.nickname}}</td>
   <td>{{item.group.title}}</td>
   <td>{{item.cat.title}}</td>
   <td>{{item.love_num}}</td>
   <td>{{item.fav_num}}</td>
<td>{{item.view_num}}</td>
   <td>{{item.createtime}}</td>
<td>
	<div class="btn-small mgr-5" @click="goAdd(item.id)">编辑</div>

					<div class="btn-small mgr-5" @click="goShow(item.id)">查看</div>
					<div class="btn-small btn-danger" @click="del(item)">删除</div>
</td>
  </tr>
 </table>

	</view>
</template>
<script>
	export default {
		data: function() {
			return {
				pageLoad: false,
				list: [],
				per_page: 0,
				isFirst: true
			}
		},
		onLoad: function() {
			this.getPage();
		},
		onReachBottom: function() {
			this.getList();
		},
		onPullDownRefresh: function() {
			this.getPage();
			uni.stopPullDownRefresh();
		},
		onShareAppMessage: function() {

		},
		onShareTimeline: function() {

		},
		methods: {
			gourl: function(url) {
				uni.navigateTo({
					url: url
				})
			},
			 
			getPage: function() {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/admin/forum/index",
					success: function(res) {
						that.pageLoad = true;
						that.list = res.data.list;
						that.per_page = res.data.per_page;
					}
				})
			},
			getList: function() {
				var that = this;
				if (that.per_page == 0 && !that.isFirst) {
					return false;
				}
				that.app.get({
					url: that.app.apiHost + "/admin/forum/index",
					data: {
						per_page: that.per_page
					},
					success: function(res) {
						that.per_page = res.data.per_page;
						if (that.isFirst) {
							that.list = res.data.list;
							that.isFirst = false;
						} else {
							for (var i in res.data.list) {
								that.list.push(res.data.list[i]);
							}
						}

					}
				})
			},
			toggleStatus:function(item){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/admin/forum/status",
					data:{
						id:item.id
					},
					success:function(res){
						item.status=res.data.status;
					}
				})
			},
			toggleRecommend:function(item){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/admin/forum/recommend",
					data:{
						id:item.id
					},
					success:function(res){
						item.is_recommend=res.data.is_recommend;
					}
				})
			},
			del:function(item){
				var that=this;
				uni.showModal({
					content:"确认删除吗",
					success:function(res){
						if(!res.confirm){
							return false;
						}
						that.app.get({
							url:that.app.apiHost+"/admin/forum/delete",
							data:{
								id:item.id
							},
							success:function(res){
								if(res.error){
									return false;
								}
								var list=[];
								for(var i in that.list){
									if(that.list[i].id!=item.id){
										list.push(that.list[i]);
									}
								}
								that.list=list;
							}
						})
					}
				})
			},
			goAdd:function(id){
				uni.navigateTo({
					url:"add?id="+id
				})
			},
			goShow:function(id){
				uni.navigateTo({
					url:"show?id="+id
				})
			}
		},
	}
</script>

<style>
</style>