<template>
	<view>
		<div class="tabs-border">
			<div @click="gourl('index')" class="item">列表</div>
			<div @click="gourl('add')" class="item active">添加</div>
		</div>
		<form @submit="submit" v-if="pageLoad">

			<input type="hidden" name="id" style="display:none;" v-model="data.id">
			<div class="tabs-box">
				<div class="js-tabs tabs-border">
					<a class="item active" href="#base">基本信息</a>

					<a class="item" href="#other">扩展</a>
				</div>
				<div class="tabs-item active" id="base">
					<table class="table-add">
						<tr>
							<td>标题：</td>
							<td><input class="input-text" type="text" name="title" id="title" v-model="data.title"></td>
						</tr>
						<tr>
							<td>分类：</td>
							<td>
								<input type="text" class="none" name="catid" v-model="data.catid" />
								<select v-model="data.catid" id="catid" class="input-flex-select w150">
									<option value="0">请选择</option>

									<block v-for="(one,oi) in catList" :key="one.catid">
										<option :value="one.catid">{{one.cname}}</option>
										<block v-for="(two,bi) in one.child" :key="two.catid">
											<option :value="two.catid">|--{{two.cname}}</option>
											<block v-for="(three,ci) in two.child" :key="three.catid">
												<option :value="three.catid">|----{{three.cname}}</option>
											</block>
										</block>
									</block>

								</select>
							</td>
						</tr>
						<tr>
							<td>图片：</td>
							<td>
								<input class="none" type="text" name="imgurl" v-model="data.imgurl" />
								<sky-upimg @call-parent="setImgurl" :imgurl="data.imgurl" :trueimgurl="data.trueimgurl">
								</sky-upimg>
							</td>
						</tr>
						<tr>
							<td>作者</td>
							<td>
								<input type="text" name="author" v-model="data.author" />
							</td>
						</tr>

						<tr v-if="data.id>0">
							<td>喜欢数：</td>
							<td><input type="text" name="love_num" id="love_num" v-model="data.love_num"></td>
						</tr>
						<tr v-if="data.id>0">
							<td>收藏：</td>
							<td><input type="text" name="fav_num" id="fav_num" v-model="data.fav_num"></td>

						<tr>
							<td>描述：</td>
							<td>
								<textarea name="description" id="description" class="w600 h60"
									v-model="data.description"></textarea>
							</td>
						</tr>

						<tr>
							<td>推荐：</td>
							<td>
								<radio-group>
									<radio name="is_recommend" value="1" :checked="data.is_recommend==1" /> 推荐
									&nbsp;&nbsp;
									<radio name="is_recommend" value="0" :checked="data.is_recommend!=1" /> 不推荐
								</radio-group>


							</td>
						</tr>
						<tr v-if="data.id>0">
							<td>访问数：</td>
							<td>{{data.view_num}}</td>
						</tr>



						<tr>
							<td>详情模板：</td>
							<td><input class="input-text" type="text" name="tpl" id="tpl"
									v-model="data.tpl">(如果需要可以指定模板)
							</td>
						</tr>
						<tr v-if="data.id>0">
							<td>创建时间：</td>
							<td>{{data.createtime}}</td>
						</tr>
						<tr>
							<td>内容</td>
							<td>
								<textarea class="none" maxlength="-1" name="content" v-model="data.content"></textarea>
								<lei-editor :dcontent="data.content" @call-parent="setContent"></lei-editor>
							</td>
						</tr>
					</table>
				</div>

				<div class="tabs-item active" id="other">
					<table class="table-add">
						<tr>
							<td class="w90">产品价格：</td>
							<td><input class="input-text" type="text" name="price" id="price" v-model="data.price"></td>
						</tr>
						<tr>
							<td>市场价格：</td>
							<td><input class="input-text" type="text" name="market_price" id="market_price"
									v-model="data.market_price">
							</td>
						</tr>
						<tr>
							<td>库存数：</td>
							<td><input class="input-text" type="text" name="total_num" id="total_num"
									v-model="data.total_num"></td>
						</tr>
						<tr>
							<td>销售数：</td>
							<td><input class="input-text" type="text" name="sold_num" id="sold_num"
									v-model="data.sold_num"></td>
						</tr>
						<tr>
							<td>积分：</td>
							<td><input class="input-text" type="text" name="grade" id="sold_num" v-model="data.grade">
							</td>
						</tr>

						<tr>
							<td>图集</td>
							<td>
								<input type="text" name="imgsdata" class="none" v-model="data.imgsdata" />
								<upimg-box :defaultImgsList="imgList" :defaultImgsData="data.imgsdata"
									@call-parent="setImgs"></upimg-box>
							</td>
						</tr>

					</table>
				</div>
			</div>
			<button form-type="submit" class="btn-row-submit">保存</button>
		</form>
	</view>
</template>

<script>
	import upimgBox from "../../components/upimgbox.vue";
	import skyUpimg from "../../components/skyupimg.vue";
	import leiEditor from "../../components/leiEditor/leiEditor.vue";
	export default {
		components: {
			upimgBox,
			skyUpimg,
			leiEditor
		},
		data: function() {
			return {
				id: 0,
				pageLoad: false,
				data: {},
				imgList: [],
				catList: []
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
			gourl: function(url) {
				uni.navigateTo({
					url: url
				})
			},
			setContent: function(e) {
				console.log(e);
				this.data.content = e;
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
					url: that.app.apiHost + "/admin/article/add",
					data: {
						id: this.id
					},
					success: function(res) {
						if (Object.keys(res.data.data).length > 0) {
							that.data = res.data.data;
							that.imgList = res.data.imgList;
						} else {
							that.data = {
								id: 0,
								title: "",
								typeid: 0,
								total_money: 0,
								description: "",
								imgsdata: ""
							}
						}
						that.catList = res.data.catList;
						that.pageLoad = true;
					}
				})
			},
			submit: function(e) {
				var that = this;
				that.app.post({
					url: that.app.apiHost + "/admin/article/save",
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
