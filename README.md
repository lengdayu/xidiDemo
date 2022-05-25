# xidiApp

#### 介绍

个人 电商demo

#### 项目结构

|-- server

	|-- jwt （token类工具）
	|-- utils （工具类方法）
	|-- public （静态资源目录）
	|-- router （路由目录）
		|-- fsPackaging （二次封装的 fs 方法目录）
		|-- spilder （node 爬虫方法目录）
			|-- homePage （首页爬虫方法目录）
			|-- countryPages （国家馆页面爬虫方法目录）
			|-- countryPages （商品页面爬虫方法目录）
		|-- downLoad.js （文件下载方法）
		|-- localData.json （本地数据）
		|-- productLocalData.json （商品页面本地数据）
	|-- index.js （文件启动入口）
	|-- package-lock.json
	|-- package.json
	|-- README.MD
