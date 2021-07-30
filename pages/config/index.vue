<template>
 	<view>
 		<form @submit="submit">
			<div class="tabs-border">
				<div @click="tab='sms'" :class="tab=='sms'?'tabs-border-active':''" class="tabs-border-item">短信</div>
				<div @click="tab='email'" :class="tab=='email'?'tabs-border-active':''"  class="tabs-border-item">邮件</div>
				<div @click="tab='water'" :class="tab=='water'?'tabs-border-active':''"  class="tabs-border-item">水印</div>
				<div @click="tab='spread'" :class="tab=='spread'?'tabs-border-active':''"  class="tabs-border-item">推广</div>
				<div @click="tab='bank'" :class="tab=='bank'?'tabs-border-active':''"  class="tabs-border-item">收款账户</div>
			</div>
 			<table :class="tab=='sms'?'':'none'" class="table-add">
				<tr>
					<td>开启短信通知：</td>
					<td><input class="input-text" type="text" name="phone_on" v-model="data.phone_on"></td>
				</tr>
				<tr >
					<td height="30" align="right">短信方</td>
				  <td>
					  <radio-group>
				  	<radio name="sms_type" :checked="data.sms_type=='default'"   value="default" /> 
					<text class="mgr-5">短信宝</text>
				  	<radio name="sms_type" :checked="data.sms_type=='alisms'" value="alisms" /> 阿里云
				    </radio-group>  
				  </td>
				</tr> 
				<tr>
					<td>短信签名：</td>
					<td><input class="input-text" type="text" name="sms_qianming" v-model="data.sms_qianming"></td>
				</tr>
				<tr>
					<td>手机服务用户：</td>
					<td><input class="input-text" type="text" name="phone_user" v-model="data.phone_user"></td>
				</tr>
				<tr>
					<td>手机服务密码：</td>
					<td><input class="input-text" type="text" name="phone_pwd" v-model="data.phone_pwd"></td>
				</tr>
				<tr>
					<td>测试手机：</td>
					<td>
						<div class="flex">
							<input class="input-text w150" type="text" name="phone_num" v-model="data.phone_num">
							<button  type="button" id="testphone" class="btn">测试</button>
							<div class="flex-1"></div>
						</div>
						
					</td>
				</tr>

			</table>	
			<table :class="tab=='email'?'':'none'" class="table-add">
				<tr>
					<td>邮箱服务器：</td>
					<td><input class="input-text" type="text" name="smtphost" v-model="data.smtphost"></td>
				</tr>
				<tr>
					<td>邮箱端口：</td>
					<td><input class="input-text" type="text" name="smtpport" v-model="data.smtpport"></td>
				</tr>
				<tr>
					<td>邮箱：</td>
					<td><input class="input-text" type="text" name="smtpemail" v-model="data.smtpemail"></td>
				</tr>
				<tr>
					<td>邮箱用户：</td>
					<td><input class="input-text" type="text" name="smtpuser" v-model="data.smtpuser"></td>
				</tr>
				<tr>
					<td>邮箱密码：</td>
					<td><input class="input-text" type="text" name="smtppwd" v-model="data.smtppwd"></td>
				</tr>
			</table>
			<table :class="tab=='water'?'':'none'" class="table-add">
				<tr>
					<td>开启水印：</td>
					<td><input class="input-text" type="text" name="water_on" v-model="data.water_on"></td>
				</tr>
				<tr>
					<td>水印类型：</td>
					<td><input class="input-text" type="text" name="water_type" v-model="data.water_type"></td>
				</tr>
				<tr>
					<td>水印位置：</td>
					<td><input class="input-text" type="text" name="water_pos" v-model="data.water_pos"></td>
				</tr>
				<tr>
					<td>文字大小：</td>
					<td><input class="input-text" type="text" name="water_size" v-model="data.water_size"></td>
				</tr>
				<tr>
					<td>水印文字：</td>
					<td><input class="input-text" type="text" name="water_str" v-model="data.water_str"></td>
				</tr>
				<tr>
					<td>水印图片：</td>
					<td><input class="input-text" type="text" name="water_img" v-model="data.water_img"></td>
				</tr>
				
			</table>
			<table :class="tab=='spread'?'':'none'" class="table-add">
				<tr>
					<td>邀请推广：</td>
					<td><input class="input-text" type="text" name="spread_on" v-model="data.spread_on"></td>
				</tr>
				<tr>
					<td>邀请奖励：</td>
					<td><input class="input-text w100" type="text" name="spread_discount" v-model="data.spread_discount"/>%
					</td>
				</tr>
				
			</table>
			
			<table :class="tab=='bank'?'':'none'" class="table-add">
				<tr>
					<td>银行名称：</td>
					<td><input class="input-text" type="text" name="s_bank_name" v-model="data.s_bank_name"></td>
				</tr>
				<tr>
					<td>银行用户：</td>
					<td><input class="input-text" type="text" name="s_bank_user" v-model="data.s_bank_user"></td>
				</tr>
				<tr>
					<td>银行账号：</td>
					<td><input class="input-text" type="text" name="s_bank_num" v-model="data.s_bank_num"></td>
				</tr>
			</table>
			<button form-type="submit" class="btn-row-submit">保存</button>
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
				tab:"sms"
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
 			setImgs: function(e) {
 				this.data.imgsdata = e;
 			},
 			setImgurl: function(e) {
 				this.data.imgurl = e;
 			},
 			getPage: function() {
 				var that = this;
 				that.app.get({
 					url: that.app.apiHost + "/admin/config/index",
 					data: {
 						id: this.id
 					},
 					success: function(res) {
 						if (Object.keys(res.data).length > 0) {
 							that.data = res.data;
 							that.imgsList = res.imgsdata;
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

 						that.pageLoad = true;
 					}
 				})
 			},
 			submit: function(e) {
 				var that = this;
 				that.app.post({
 					url: that.app.apiHost + "/admin/config/save",
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
