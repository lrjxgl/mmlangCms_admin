<template>
	<view>
		<div class="tabs-border">
			<div @click="gourl('index')" class="item active">列表</div>
			<div @click="gourl('add')" class="item">添加</div>
		</div>
		<table class="tbs">
			<thead>
				<tr>
					<td>id</td>
					<td>名称</td>
					<td>层级</td>
					<td>usetype</td>
					<td>上级</td>
					<td>排序</td>
					<td>操作</td>
				</tr>
				</tr>
			</thead>
			<tr v-for="(item,index) in list" :key="index">
				<td>{{item.id}}</td>
				<td>{{item.name}}</td>
				<td>{{item.level}}</td>
				<td>{{item.usetype}}</td>
				<td>{{item.upid}}</td>
				<td>{{item.displayorder}}</td>
				<td>
					<div class="btn-small mgr-5" @click="goAdd(item.id)">编辑</div>

					<div class="btn-small mgr-5" @click="gourl('index?upid='+item.id)">下级</div>
					<div class="btn-small btn-danger" @click="del(item)">删除</div>
				</td>
			</tr>
		</table>
		<div class="flex row-box">
			<div :class="item.per_page==aPage?'cl-red':''" class="pd-10 pointer" v-for="(item,index) in pageList" @click="setPage(item.per_page)" :key="index">{{item.value}}</div>
		</div>
	</view>
</template>
<script>
	export default {
		data: function() {
			return {
				pageLoad: false,
				list: [],
				per_page: 0,
				isFirst: true,
				pageList: [],
				aPage:0,
				upid:0
			}
		},
		onLoad: function(ops) {
			if(ops.upid!=undefined){
				this.upid=ops.upid;
			}
			this.getPage();
		},
		onReachBottom: function() {
			//this.getList();
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
			setPage:function(per_page){
				 
				var that=this;
				that.aPage=per_page;
				that.per_page=per_page;
				that.isFirst=true;
				that.getList();
			},
			getPage: function() {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/admin/district/index",
					data:{
						upid:this.upid
					},
					success: function(res) {
						that.pageLoad = true;
						that.list = res.data.list;
						
						that.per_page = res.data.per_page;
						that.pageList = that.app.pageList(res.data.rscount, res.data.limit, res.data.per_page);
					}
				})
			},
			getList: function() {
				var that = this;
				if (that.per_page == 0 && !that.isFirst) {
					return false;
				}
				that.app.get({
					url: that.app.apiHost + "/admin/district/index",
					data: {
						per_page: that.per_page,
						upid:this.upid
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
						that.pageList = that.app.pageList(res.data.rscount, res.data.limit, res.data.per_page);
					}
				})
			},
			toggleStatus: function(item) {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/admin/district/status",
					data: {
						id: item.id
					},
					success: function(res) {
						item.status = res.data.status;
					}
				})
			},
			 
			del: function(item) {
				var that = this;
				uni.showModal({
					content: "确认删除吗",
					success: function(res) {
						if (!res.confirm) {
							return false;
						}
						that.app.get({
							url: that.app.apiHost + "/admin/district/delete",
							data: {
								id: item.id
							},
							success: function(res) {
								if (res.error) {
									return false;
								}
								var list = [];
								for (var i in that.list) {
									if (that.list[i].id != item.id) {
										list.push(that.list[i]);
									}
								}
								that.list = list;
							}
						})
					}
				})
			},
			goAdd: function(id) {
				uni.navigateTo({
					url: "add?id=" + id
				})
			},
			goShow: function(id) {
				uni.navigateTo({
					url: "show?id=" + id
				})
			}
		},
	}
</script>

<style>
</style>
