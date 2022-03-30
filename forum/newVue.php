<?php
$dir="./";
$files=[];
function getFiles($dir){
	global $files;
	$op=opendir($dir);
	while(false!==$file=readdir($op)){
		if($file=="." || $file==".."){
			continue;
		}elseif(is_dir($dir.$file."/")){
			getFiles($dir.$file."/");
		}else{
			$files[]=$dir.$file;
		}
	}
}
getFiles($dir);
//print_r($files);
$json=""; 
foreach($files as $file){
	$name=substr(basename($file),0,strpos(basename($file),"."));
	$ftype=substr(basename($file),strpos(basename($file),"."));
	if($ftype==".html") continue;
	 
	$dir=dirname($file);
	/*echo $file;
	echo $name;
	echo $dir;
	*/
	$vue=$dir."/".$name.".vue";
	/*生成vue文件
	if(!in_array($vue,$files)){
		
		file_put_contents($vue,'<template>
		</template>

		<script>
		</script>

		<style>
		</style>
		');
		
	}	
	*/
	
	if(in_array($vue,$files)){
		$dir=str_replace("./","",$dir);

		$json.=',{
			"path":"'.$dir.'/'.$name.'",
			"style":{
				"navigationBarTitleText":"'.$dir.'-'.$name.'"
			}
		}';	
	}	
	 
	
}
file_put_contents("config.json",$json);
?>