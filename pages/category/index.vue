<template>
	<view>
		<div class="tabs-border">
			<div @click="gourl('index')" class="item active">列表</div>
			<div @click="gourl('add')" class="item">添加</div>
		</div>
		<table class="tbs">
			<thead>
				<tr>
					<td>catid</td>
					<td>表名</td>
					<td>上级分类</td>
					<td>名称</td>
					<td>排序</td>
					<td>类型</td>
					<td>状态</td>
					 
					<td>操作</td>
				</tr>
				</tr>
			</thead>
			<tbody  v-for="(item,index) in list" :key="item.catid">
				<tr>
					<td>{{item.catid}}</td>
					<td>{{item.cname}}</td>
					<td>{{item.tablename}}</td>
					<td>{{item.pid}}</td>
					
					<td>{{item.orderindex}}</td>
					<td>{{item.type_id}}</td>
					<td><div :class="item.status==1?'yes':'no'"></div></td>
					 
					<td>
						<div class="btn-small mgr-5" @click="goAdd(item.catid)">编辑</div>
				
						<div class="btn-small mgr-5" @click="goShow(item.catid)">查看</div>
						<div class="btn-small btn-danger" @click="del(item)">删除</div>
					</td>
				</tr>
				<tr v-for="(cc,ci) in item.child" :key="cc.catid">
					<td>{{cc.catid}}</td>
					<td>|--{{cc.cname}}</td>
					<td>{{cc.tablename}}</td>
					<td>{{cc.pid}}</td>
					
					<td>{{cc.orderindex}}</td>
					<td>{{cc.type_id}}</td>
					<td>
						<div :class="cc.status==1?'yes':'no'"></div>
					</td>
					 
					<td>
						<div class="btn-small mgr-5" @click="goAdd(cc.catid)">编辑</div>
				
						<div class="btn-small mgr-5" @click="getChild(cc.pid)">下级</div>
						<div class="btn-small btn-danger" @click="del(cc)">删除</div>
					</td>
				</tr>
			</tbody>
			
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
				isFirst: true,
				pid:0,
				tablename:"article"
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
					url: that.app.apiHost + "/admin/category/index",
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
					url: that.app.apiHost + "/admin/category/index",
					data: {
						per_page: that.per_page,
						pid:this.pid,
						tablename:this.tablename
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
			getChild:function(pid){
				this.pid=pid;
				this.isFirst=true;
				this.per_page=0;
				this.getList();
			},
			toggleStatus: function(item) {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/admin/category/status",
					data: {
						id: item.id
					},
					success: function(res) {
						item.status = res.data.status;
					}
				})
			},
			toggleRecommend: function(item) {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/admin/category/recommend",
					data: {
						id: item.id
					},
					success: function(res) {
						item.is_recommend = res.data.is_recommend;
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
							url: that.app.apiHost + "/admin/category/delete",
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
					url: "add?catid=" + id
				})
			},
			goShow: function(id) {
				uni.navigateTo({
					url: "show?catid=" + id
				})
			}
		},
	}
</script>

<style>
</style>
