<template>
	<view>
		<div class="main">
			<div class="hd">mmLang</div>
			<form autocomplete="off">
				<div class="flex">
					<div class="w80">账号</div>
					<div class="flex-1">
						<input class="atext" v-model="username" type="text" id="username" />
					</div>
				</div>
				<div class="flex">
					<div class="w80">密码</div>
					<div class="flex-1">
						<input  class="atext" v-model="password"  type="password" id="password" />
					</div>
				</div>
				<div class="flex">
					<div class="w80"></div>
					<div class="flex-1">
						<div @click="submit()" class="btn-row-submit" id="loginSubmit">登录</div>
					</div>	
				</div>	
				
			</form>
		</div>
	</view>
</template>

<script>
	export default{
		data:function(){
			return {
				username:"",
				password:""
			}
		},
		methods:{
			submit:function(){
				var that=this;
				that.app.post({
					url:that.app.apiHost+"/admin/login/loginsave",
					data:{
						username:this.username,
						password:this.password
					},
					success:function(res){
						uni.showToast({
							title:res.message,
							icon:"none"
						})
						if(res.error){
							return false;
						}
						uni.setStorageSync("admin.token",res.token);
						uni.setStorageSync("admin.token_expire",res.token_expire);
						uni.setStorageSync("admin.refresh_token",res.refresh_token);
						uni.setStorageSync("admin.refresh_token_expire",res.refresh_token_expire);
						uni.reLaunch({
							url:"/"
						})
					}
				})
			}
		}
	}
</script>

<style>
	uni-page-body{
		padding: 0;
	}
	body {
		background-color: #006699;
	}
	
	.main {
		width: 400px;
		height: 300px;
		position: fixed;
		top: 50%;
		margin-top: -150px;
		left: 50%;
		margin-left: -200px;
		background-color: #fff;
		border-radius: 10px;
		padding: 20px 30px 20px 20px;
		box-sizing: border-box;
	}
	
	.hd {
		margin-bottom: 40px;
		text-align: center;
		font-size: 22px;
		font-weight: bold;
		color: #323232;
	}
	
	.flex {
		display: flex;
		margin-bottom: 30px;
		align-items: center;
	
	}
	
	.flex .w80 {
		width: 50px;
	}
	
	.flex .flex-1 {
		flex: 1;
	}
	
	.atext {
		height: 36px;
		line-height: 36px;
		width: 100%;
		border-radius: 5px;
		box-sizing: border-box;
		padding: 5px;
		border: 1px solid #ddd;
	}
	
	.btn-row-submit {
		width: 260px;
		line-height: 30px;
		border-radius: 10px;
		text-align: center;
		margin: 0 auto;
		box-sizing: border-box;
		background-color: #0055AA;
		color: #fff;
		cursor: pointer;
	}
	
</style>
