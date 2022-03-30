<?php

namespace App\CodeFec;

use Alchemy\Zippy\Zippy;
use App\Command\StartCommand;
use App\Model\AdminOption;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * 系统升级
 */
class Upgrading
{
	private string $api_releases = "https://api.github.com/repos/zhuchunshu/super-forum/releases";
	
	/**
	 * @var OutputInterface
	 */
	public OutputInterface $output;
	
	/**
	 * @var \App\Command\CodeFec\Upgrading
	 */
	public \App\Command\CodeFec\Upgrading $command;
	
	public function __construct(OutputInterface $output,\App\Command\CodeFec\Upgrading $command){
		$this->output = $output;
		$this->command = $command;
	}
	
	public function get_options($name,$default=""){
		return $this->core_default(@AdminOption::query()->where("name",$name)->first()->value,$default);
	}
	
	public function core_default($string=null,$default=null){
		if($string){
			return $string;
		}
		return $default;
	}
	
	public function run(){
		$url = match((string)$this->get_options('update_server',2)){
			'2' => '',
			'1' => 'https://ghproxy.com/'
		};
		$data = http()->get($this->api_releases);
		$data = $data[0];
		
		// 获取当前程序版本信息
		$build_info = include BASE_PATH."/build-info.php";
		$data = array_merge($data, $build_info);
		$version = $data['version'];
		$tag_name = $data['tag_name'];
		
		// 判断是否不可升级
		if($tag_name <=$version || $data['prerelease']===true){
			return Json_Api(403,false,['msg' => '无需升级!']);
		}
		
		// 生成文件下载链接
		$url .= "https://github.com/zhuchunshu/super-forum/archive/".$tag_name.".zip";
		
		// 定义文件存放路径
		$file_path= BASE_PATH."/runtime/update.zip";
		
		// 创建下载任务
		$this->handle($url,$file_path);
		return Json_Api(200,true,['msg' => '升级任务已创建']);
	}
	
	public function handle(string $download,string $path){
		// 生成更新锁
		file_put_contents(BASE_PATH."/app/CodeFec/storage/update.lock",time());
		// 下载文件
		file_put_contents($path,fopen($download,'r'));
		
		// 定义临时压缩包存放目录
		$tmp = BASE_PATH."/runtime/update";
		
		// 初始化压缩操作类
		$zippy = Zippy::load();
		
		// 打开压缩文件
		$archiveTar  =  $zippy->open($path);
		
		// 解压
		if(!is_dir($tmp)){
			mkdir($tmp,0777);
		}
		// 解压
		$archiveTar->extract($tmp);
		
		// 获取解压后,插件文件夹的所有目录
		$allDir = allDir($tmp);
		foreach($allDir as $value){
			if(file_exists($value."/CodeFec")){
				// 删除runtime缓存
				$this->removeFiles($path,BASE_PATH."/runtime/view",$path,BASE_PATH."/runtime/container");
				// 替换
				FileUtil()->moveDir($value,BASE_PATH,true);
				// 重建索引
				\Swoole\Coroutine\System::exec('composer dump-autoload -o');
				\Swoole\Coroutine\System::exec('php CodeFec');
				// 删除更新锁
				$this->removeFiles($tmp,$path,BASE_PATH."/app/CodeFec/storage/update.lock");
				// 清理缓存
				cache()->delete('admin.git.getVersion');
			}
		}
	}
	
	public function removeFiles(...$values): void
	{
		foreach($values as $value){
			\Swoole\Coroutine\System::exec('rm -rf "' . $value.'"');
		}
	}
}