<template>
	<view>
		<div class="tabs-border">
			<div @click="gourl('index')" class="item active">列表</div>
			<div @click="gourl('add')" class="item">添加</div>
		</div>
		<table class="tbs">
			<thead>
				<tr>
					<td>tag_id</td>
					<td>title</td>
					<td>orderindex</td>

					<td>status</td>
					<td>m</td>
					<td>a</td>
					<td>width</td>
					<td>height</td>
					<td>操作</td>
				</tr>
				</tr>
			</thead>
			<tbody v-for="(item,index) in list" :key="item.tag_id">
				<tr>
					<td>{{item.tag_id}}</td>
					<td>{{item.title}}</td>
					<td>{{item.orderindex}}</td>

					<td><div @click="toggleStatus(item)" :class="item.status==1?'yes':'no'"></div></td>
					<td>{{item.m}}</td>
					<td>{{item.a}}</td>
					<td>{{item.width}}</td>
					<td>{{item.height}}</td>
					<td>
						<div class="btn-small mgr-5" @click="goAdd(item.tag_id)">编辑</div>

						
						<div class="btn-small btn-danger" @click="del(item)">删除</div>
					</td>
				</tr>
				<tr v-for="(cc,ii) in item.child" :key="cc.tag_id">
					<td>{{cc.tag_id}}</td>
					<td>|--{{cc.title}}</td>
					<td>{{cc.orderindex}}</td>

					<td><div @click="toggleStatus(cc)" :class="cc.status==1?'yes':'no'"></div></td>
					<td>{{cc.m}}</td>
					<td>{{cc.a}}</td>
					<td>{{cc.width}}</td>
					<td>{{cc.height}}</td>
					<td>
						<div class="btn-small mgr-5" @click="goAdd(cc.tag_id)">编辑</div>

						
						<div class="btn-small btn-danger" @click="del(cc)">删除</div>
					</td>
				</tr>
			</tbody>

		</table>

		<div class="flex row-box">
			<div :class="item.per_page==aPage?'cl-red':''" class="pd-10 pointer" v-for="(item,index) in pageList"
				@click="setPage(item.per_page)" :key="index">{{item.value}}</div>
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
				aPage: 0
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
			setPage: function(per_page) {

				var that = this;
				that.aPage = per_page;
				that.per_page = per_page;
				that.isFirst = true;
				that.getList();
			},
			getPage: function() {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/admin/ad_tags/index",
					success: function(res) {
						that.pageLoad = true;
						that.list = res.data.list;
						that.per_page = res.data.per_page;
						if (that.per_page > 0) {
							that.pageList = that.app.pageList(res.data.rscount, res.data.limit, res.data.per_page);
						}

					}
				})
			},
			getList: function() {
				var that = this;
				if (that.per_page == 0 && !that.isFirst) {
					return false;
				}
				that.app.get({
					url: that.app.apiHost + "/admin/ad_tags/index",
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
			toggleStatus: function(item) {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/admin/ad_tags/status",
					data: {
						tag_id: item.tag_id
					},
					success: function(res) {
						item.status = res.data.status;
					}
				})
			},
			toggleRecommend: function(item) {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/admin/ad_tags/recommend",
					data: {
						tag_id: item.tag_id
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
							url: that.app.apiHost + "/admin/ad_tags/delete",
							data: {
								tag_id: item.tag_id
							},
							success: function(res) {
								if (res.error) {
									return false;
								}
								var list = [];
								for (var i in that.list) {
									if (that.list[i].tag_id != item.tag_id) {
										list.push(that.list[i]);
									}
								}
								that.list = list;
							}
						})
					}
				})
			},
			goAdd: function(tag_id) {
				uni.navigateTo({
					url: "add?tag_id=" + tag_id
				})
			},
			goShow: function(id) {
				uni.navigateTo({
					url: "show?tag_id=" + id
				})
			}
		},
	}
</script>

<style>
</style>
