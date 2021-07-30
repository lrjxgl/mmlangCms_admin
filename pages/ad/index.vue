<template>
	<view>
		<ad-nav tab="adIndex"></ad-nav>
		<div class="main-body">
			<table class="tbs">
				<thead>
					<tr>
						<td width="50">id</td>
						<td>tagId</td>
						<td>名称</td>
						<td>图片</td>

						<td>链接1</td>




						<td>排序</td>
						<td>状态</td>


						<td>操作</td>
					</tr>
					</tr>
				</thead>
				<tr v-for="(item,index) in list" :key="index">
					<td>{{item.id}}</td>
					<td>{{item.tag_id_name}}/{{item.tag_id_2nd_name}}</td>
					<td>{{item.title}}</td>
					<td>
						<image :src="item.imgurl+'.100x100.png'" mode="widthFix" class="wh-60"></image>
					</td>

					<td>{{item.link1}}</td>




					<td>{{item.orderindex}}</td>
					<td>
						<div @click="toggleStatus(item)" :class="item.status==1?'yes':'no'"></div>
					</td>


					<td>
						<div class="btn-small mgr-5" @click="goAdd(item.id)">编辑</div>

						<div class="btn-small btn-danger" @click="del(item)">删除</div>
					</td>
				</tr>

			</table>
			<div class="flex row-box">
				<div :class="item.per_page==aPage?'cl-red':''" class="pd-10 pointer" v-for="(item,index) in pageList" @click="setPage(item.per_page)" :key="index">{{item.value}}</div>
			</div>
		</div>
	</view>
</template>

<script>
	import adNav from "./ad-nav.vue"
	export default {
		components: {
			adNav
		},
		data: function() {
			return {
				pageLoad: false,
				list: [],
				per_page: 0,
				isFirst: true,
				pageList:[],
				aPage:0
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
			goAdd: function(id) {
				uni.navigateTo({
					url: "add?id=" + id
				})
			},
			gourl: function(url) {
				uni.navigateTo({
					url: url
				})
			},
			setPage:function(per_page){
				console.log(per_page) 
				var that=this;
				that.aPage=per_page;
				that.per_page=per_page;
				that.isFirst=true;
				that.getList();
			},
			getPage: function() {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/admin/ad/index",
					success: function(res) {
						that.pageLoad = true;
						that.list = res.list;
						that.per_page = res.per_page;
						that.pageList = that.app.pageList(res.rscount, res.limit, res.per_page);
					}
				})
			},
			getList: function() {
				var that = this;
				if (that.per_page == 0 && !that.isFirst) {
					return false;
				}
				that.app.get({
					url: that.app.apiHost + "/admin/ad/index",
					data: {
						per_page: that.per_page
					},
					success: function(res) {
						that.per_page = res.per_page;
						if (that.isFirst) {
							that.list = res.list;
							that.isFirst = false;
						} else {
							for (var i in res.list) {
								that.list.push(res.list[i]);
							}
						}
						that.pageList = that.app.pageList(res.rscount, res.limit, res.per_page);
					}
				})
			},
			toggleStatus: function(item) {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/admin/ad/status",
					data: {
						id: item.id
					},
					success: function(res) {
						item.status = res.status;
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
										url:that.app.apiHost+"/admin/ad/delete",
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
		},
	}
</script>

<style>
</style>
