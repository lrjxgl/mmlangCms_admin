<template>
	<view v-if="pageLoad">
		<ad-nav tab="adAdd"></ad-nav>
		<form @submit="submit">
			<div class="none">
				<input type="text" name="id" v-model="id">
			</div>

			<table class="table-add">

				<tr>
					<td width="100">分类id：</td>
					<td>
						<div class="none">
							<input name="tag_id" v-model="data.tag_id" type="text" />
							<input name="tag_id_2nd" v-model="data.tag_id_2nd" type="text" />
						</div>
						
						<select @change="getTag2nd" class="w100" v-model="data.tag_id"  >
							<option value="0">请选择</option>

							<option v-for="(item,index) in tagList" :key="index" :value="item.tag_id">
								{{item.title}}({{item.width}}*{{item.height}})
							</option>

						</select>

						<select class="w150" v-model="data.tag_id_2nd"  >
							<option value="0">请选择</option>
							<option v-for="(item,index) in tagList_2nd" :key="index" :value="item.tag_id">
								{{item.title}}({{item.width}}*{{item.height}})
							</option>
						</select>

					</td>
				</tr>
				<tr>
					<td>标题：</td>
					<td><input type="text" name="title" class="input-text" v-model="data.title"></td>
				</tr>
				<tr>
					<td>描述：</td>
					<td><textarea name="info" id="info" class="input-text" v-model="data.info"></textarea></td>
				</tr>
				<tr>
					<td>链接1：</td>
					<td><input type="text" name="link1" id="link1" class="input-text" v-model="data.link1"></td>
				</tr>
				<tr>
					<td>链接2：</td>
					<td><input type="text" name="link2" id="link2" class="input-text" v-model="data.link2"></td>
				</tr>
				<tr>
					<td>开始时间：</td>
					<td>
						<uni-datetime-picker type="datetime" v-model="data.starttime"  />
						<input  class="none" type="text" name="starttime" v-model="data.starttime"></td>
				</tr>
				<tr>
					<td>结束时间：</td>
					<td>
						<uni-datetime-picker type="datetime" v-model="data.endtime"  />
						<input class="none" type="text" name="endtime"  v-model="data.endtime"></td>
				</tr>
				<tr>
					<td>图片地址：</td>
					<td>
						<input type="text" name="imgurl" class="none" v-model="data.imgurl" />
						<up-img :imgurl="data.imgurl" :trueimgurl="data.trueimgurl" @call-parent="setImgUrl"></up-img>
					</td>
				</tr>
				
				<tr>
					<td>图片地址2：</td>
					<td>
						<input type="text" class="none"  name="imgurl2" v-model="data.imgurl2" />
						<up-img :imgurl="data.imgurl2" :trueimgurl="data.trueimgurl2" @call-parent="setImgUrl2">
						</up-img>
					</td>
				</tr>
				
				<tr>
					<td>排序：</td>
					<td><input type="text" name="orderindex" id="orderindex" v-model="data.orderindex"></td>
				</tr>
				<tr>
					<td>状态：</td>
					<td>
						<input type="text" class="none" name="status" v-model="data.status" />
						<radio-group @change="changeStatus">
							<radio type="text" class="mgr-5" :checked="data.status==1" value="1"> 上线</radio>
							<radio type="text" :checked="data.status!=1" value="2"> 下线</radio>
						</radio-group>
					</td>
				</tr>
				<tr v-if="Object.keys(data).length>0">
					<td>createtime：</td>
					<td>{{data.createtime}}</td>
				</tr>
				<tr>
					<td>价格：</td>
					<td><input class="input-text" type="text" name="price" v-model="data.price"></td>
				</tr>
				<tr>
					<td>具体对象id：</td>
					<td><input class="input-text" type="text" name="object_id" v-model="data.object_id"></td>
				</tr>


			</table>
			<button form-type="submit" class="btn-row-submit">保存</button>
		</form>
	</view>
</template>

<script>
	import upImg from "../../components/skyupimg.vue";
	import adNav from "../ad/ad-nav.vue"
	export default {
		components: {
			adNav,
			upImg
		},
		data: function() {
			return {
				id: 0,
				pageLoad: false,
				data: {},
				imgsList: [],
				tagList: [],
				tagList_2nd: [],
				width: 0,
				height: 0
			}
		},
		onLoad: function(ops) {
			if (ops.id != undefined) {
				this.id = ops.id;
			}

			this.getPage();
		},
		methods: {
			setImgs: function(e) {
				this.data.imgsdata = e;
			},
			setImgUrl: function(e) {
				this.data.imgurl = e;
			},
			setImgUrl2: function(e) {
				console.log(e)
				this.data.imgurl2 = e;
			},
			changeStatus: function(e) {
				this.data.status = e.detail.value;
			},
			getTag2nd:function(e){
		 
				var that=this;
				var tag_id=this.data.tag_id;
				that.app.get({
					url:that.app.apiHost+"/admin/ad/gettags",
					data:{
						tag_id:tag_id
					},
					success:function(res){
						that.tagList_2nd=res.data.list;
					}
				})
			},
			getPage: function() {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/admin/ad/add",
					data: {
						id: this.id
					},
					success: function(res) {
						if (Object.keys(res.data.data).length>0) {
							that.data = res.data.data;
						} else {
							that.data = {
								 
								tag_id: 0,
								tag_id_2nd: 0,
								title: "",
								info: "",
								link1: "",
								link2: "",
								starttime: "2021-08-01 13:12:11",
								endtime: "2031-08-01 13:12:11",
								imgurl: "",
								trueimgurl:"",
								imgurl2: "",
								trueimgurl2:"",
								orderindex: "0",
								status: "0",
								price: "0",
								object_id: "0",
								checkbox_attr: "",
								createtime: "2021-08-01 13:12:11",
							}
						}
						console.log(that.data)
						that.tagList = res.data.tagList;
						that.tagList_2nd = res.data.tagList_2nd;
						that.pageLoad = true;
					}
				})
			},
			submit: function(e) {
				var that = this;
				that.app.post({
					url: that.app.apiHost + "/admin/ad/save",
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
