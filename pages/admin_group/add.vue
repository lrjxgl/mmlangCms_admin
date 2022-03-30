<template>
	<view>
		<div class="tabs-border">
			<div @click="gourl('index')" class="item">列表</div>
			<div @click="gourl('add')" class="item active">添加</div>
		</div>
		<form @submit="submit">
			<input type="text" name="id" class="none" v-model="data.id">
			<table class="table-add">
				<tr>
					<td>名称：</td>
					<td><input class="input-text" type="text" name="title" v-model="data.title"></td>
				</tr>
				<tr>
					<td>排序：</td>
					<td><input class="input-text" type="text" name="orderindex" v-model="data.orderindex"></td>
				</tr>
				<tr>
					<td>权限设置</td>
					<td>
						<input class="none" type="text" name="pids" v-model="data.pids">
						<checkbox-group @change="aChange">
							<div class="flex mgb-5" v-for="(item,index) in permissionList" :key="index">
								<checkbox :checked="item.checked" :value="item.id+''"></checkbox>
								<div class="w200 mgr-5">{{item.title}}</div>
								<div>{{item.m}}: {{item.access}}</div>
							</div>
						</checkbox-group>
					</td>
				</tr>
				 
			</table> <button form-type="submit" class="btn-row-submit">保存</button>
		</form>
	</view>
</template>
<script>
	import upimgBox from "../../components/upimgbox.vue";
	import skyUpimg from "../../components/skyupimg.vue";
	export default {
		components: {
			upimgBox,
			skyUpimg
		},
		data: function() {
			return {
				id: 0,
				pageLoad: false,
				data: {},
				imgsList: [],
				permissionList:[]
			}
		},
		onLoad: function(ops) {
			if (ops.id != undefined) {
				this.id = ops.id;
			}
			console.log("onLoad")
			this.getPage();
		},
		methods: {
			aChange:function(e){
				this.data.pids=e.detail.value.toString()
				console.log(e.detail.value.toString())
			},
			gourl: function(url) {
				uni.navigateTo({
					url: url
				})
			},
			setImgs: function(e) {
				this.data.imgsdata = e;
			},
			setImgurl: function(e) {
				this.data.imgurl = e;
			},
			getPage: function() {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/admin/admin_group/add",
					data: {
						id: this.id
					},
					success: function(res) {
						if (Object.keys(res.data.data).length > 0) {
							that.data = res.data.data;
							that.imgsList = res.data.imgsdata;
						} else {
							 
						}
						that.permissionList=res.data.permissionList;
						that.pageLoad = true;
					}
				})
			},
			submit: function(e) {
				var that = this;
				that.app.post({
					url: that.app.apiHost + "/admin/admin_group/save",
					data: e.detail.value,
					success: function(res) {
						uni.showToast({
							title: res.message
						})
					}
				})

			}
		}
	}
</script>

<style>
</style>
