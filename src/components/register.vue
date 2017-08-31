<template>
	<div class="register">
		<!--头部导航栏-->
		<div class="navs">
			<p href="javascript:" onclick="history.back()">
				<i class='iconfont icon-zuojiantou'></i>
				<span>菜单</span>
			</p>
			<p>
				{{information.name}}
			</p>
			<!--占位无实际作用-->
			<p>
			</p>
		</div>
		<!--输入手机号-->
		<div class="phone">
			<input type="text" placeholder="请输入手机号" maxlength="11" v-model="phoneNumber"/>
		</div>
		<!--验证码-->
		<div class="check">
			<input type="text" placeholder="请输入验证码" maxlength="6" v-model="checkNumber"/>
			<p v-show="firstShow" class="firstShow">
				<span>获取验证码</span>
			</p>
			<p @click="countTime" v-show="!countIndex&!firstShow" class="active-check">
				<span>获取验证码</span>
			</p>
			<p v-show="countIndex&!firstShow" class="counting">
				<span ref="time">{{time}}s</span>
			</p>
		</div>
		<!--验证码提示信息-->
		<div class="checkInfo">
			<p>请在60s内完成验证,超时请点击重新发送</p>
		</div>
		<!--出生日期-->
		<div class="birthday">
			<input type="text" v-model="birthday" placeholder="请输入你的出生年月日" @focus="openPicker" ref="birTime"/>
		</div>
		<!--性别-->
		<div class="gender">
			<el-radio class="radio" v-model="radio" label="1">男</el-radio>
  			<el-radio class="radio" v-model="radio" label="0">女</el-radio>
		</div>
		<!--注册按钮-->
		<div class="submit">
			<p @click="registerSubmit" ref="submitBtn" class='btn-active' v-show="activeBtn">
				<span>
					注 册
				</span>
			</p>
			<p class='btn-silence' ref="submitBtn" v-show="!activeBtn">
				<span>
					注 册
				</span>
			</p>
			<p class="info">
				注册即表示同意
				<span @click="showDoc=true">
				《晶彩点餐会员协议》	
				</span>
			</p>
		</div>
		<div class="close" v-if="showDoc">
			<img src="../assets/icons/会员弹框-取消@3x.png" @click="showDoc=false"/>
		</div>
		<!--文档具体内容-->
		<div class="protocol-inner" v-if="showDoc">
			<div class="inner">
			<p>用户使用协议</p>
			<p>
一、使用须知
本协议系用户与上海晶汉信息科技有限公司（以下简称“本公司”）之间关于晶蝶软件系列产品（以下简称“SaaS软件”）的法律协议。产品包括由本公司独立研发的计算机软件及其他可能包括的载体介质、标识、标志、图文等材料或者其他相关系统文档、代码、服务等。用户一旦安装、复制或以其他方式使用SaaS软件，即表示同意接受协议各项条件的约束。如果用户不同意协议的条件，请不要使用SaaS软件，并按照本公司的指示对软件进行处理。
<p>
二、许可协议的授予
1、根据SaaS软件的使用地域（具体使用地域为：中国人民共和国大陆地区（港澳台除外）），在不违反软件原始供应商所在地的国家相关法律及政策性规定的前提下，用户应当遵循不将SaaS软件使用于本公司限制流通、限制使用或者禁止流通、禁止使用的区域内使用SaaS软件。若用户遵守本公司所提出的所有条件，并知悉本公司授予用户的所有权利，用户有权使用SaaS软件的权利。
2、安装和使用。用户必须在本公司指定的系统环境下使用SaaS软件，同时应当保证未经授权的情况下不得擅自更换SaaS软件的使用载体或者环境、接入其他任何工作站、终端机或者其他分流设备。本公司保证SaaS软件使用本公司专有技术进行安装、使用、访问服务器、正确显示并运行。
3、本公司保留对SaaS软件的使用许可，本公司将免费向用户提供下列基础项目：
（1）晶蝶餐饮管理系统
（2）晶心服务APP
（3）晶彩自助点餐系统
除上述免费项目之外的，本公司有权根据用户的增值业务需求予以收费，收费标准以及支付方式如下：
（1）各项费用请用户使用SaaS软件服务时详见客户端所列之收费方式说明（本公司拥有对服务费用的解释权和修改权）。
（2）支付方式包括但不限于：支付宝、微信、银行卡充值、增值业务。本公司有权指定第三方服务商代收用户支付的各项费用，网上支付工具若为第三方服务商提供的，用户进行网上支付时，应注意了解第三方的服务协议内容。本公司就用户在网上支付过程的安全性、保密性及造成的伤害或损失不承担任何责任。
（3）在用户使用增值业务前，只有用户根据SaaS软件相关提示自愿付款情况下，才可使用增值业务服务。若用户拒绝支付的，则本公司有权不提供相应的增值业务服务。
本协议项下的许可权利将在用户首次安装SaaS软件之后生效，并于用户卸载或者经本公司认定用户不正当使用SaaS软件之日起失效。用户在未经授权的情况下，不得擅自将SaaS软件的全部或者部分功能投入他用，或者进行不正当改编、反向编译、更新、升级、添加其他第三方软件产品等，否则本公司有权停止提供服务。
4、设备连接。用户必须按照本公司的指示正确使用SaaS软件。SaaS软件将与本公司指定或者特别提供的介质、载体相互搭配使用，若用户需要本公司提供其他特别服务的，本公司有权决定是否满足用户的需求。
5、本公司允许用户为保存、保全、在紧急情况下备份SaaS软件运行期间所产生的所有数据而复制或者在其他未授权的设备上备份SaaS软件副本。但是，此行为仅应当为必要而为之，若用户经本公司指示需要单独的许可协议时，用户必须进行卸载、销毁数据。
6、SaaS软件会接入第三方服务商的相关服务，第三方服务商提供的产品或服务会在平台上显示此服务由“某某”服务商提供，用户在购买此类第三方服务商提供的产品或服务时，应仔细阅读相关服务约定，遵守相关服务规则。第三方服务商提供的服务或产品，由该第三方负责并向用户提供售前、售后等保障服务，用户因购买第三方服务商提供的服务产生纠纷的，用户可优先联系该服务商解决，若该第三方服务商无法解决的，用户可要求本公司予以协助处理，但用户应知晓，本公司并非服务的提供方，除法律规定的事由外，并不承担由此产生的法律责任。
</p>
<p>
三、用户权利义务
1、用户有权根据本协议及SaaS软件发布的相关规则，通过SaaS软件发布信息、查询相关信息，参加SaaS软件的有关活动及有权享受SaaS软件提供的其他有关资讯及信息服务。
2、用户须自行负责保管好自己的用户账号和密码，且须对在用户账号密码下发生的所有活动（包括但不限于发布信息、网上点击同意各类协议、规则、参与线上预约等）承担责任。因用户的过错导致的任何损失由用户自行承担，该过错包括但不限于：不按照SaaS软件提示操作，未及时进行操作，遗忘或泄漏密码，密码被他人破解，您使用的计算机、手机被他人侵入等。
3、用户应当向本公司提供真实准确的注册信息，包括但不限于真实姓名、身份证号码、电子邮箱、联系电话、地址、邮政编码等。保证本平台可以通过上述联系方式与用户进行联系。同时，用户也应当在相关资料实际变更时及时更新有关注册资料。
4、用户有义务确保在SaaS软件上发布的信息真实，无误导性。用户发布的内容中不得含有以下内容：
1) 违反国家法律法规的；
2) 煽动、分裂和破坏国家统一的；
3) 损害国家荣誉和他人利益的；
4) 带有民族仇恨、民族歧视，破坏民族团结的；
5) 对种族、性别、宗教、地域、文化等歧视的；
6) 捏造或歪曲事实，散布谣言，扰乱社会秩序的；
7) 宣扬封建迷信、邪教、淫秽、色情、赌博、暴力、凶杀、恐怖、教唆犯罪的；
8) 公然侮辱他人，捏造事实诽谤他人或对他人进行恶意攻击的；
9) 欺诈、虚假、错误信息误导他人的；
10)侵犯他人知识产权或涉及第三方商业机密的；
11)存在可能破坏、篡改、删除、影响本平台系统正常运营的；
12)恶意评价、盗用他人账户、泄露他人信息的；
13)发布非法违禁信息、骗取他人财物、不正当谋利的；
14)从事洗钱活动的；
15)其他违反宪法和法律行政法规的。
备注：若用户发布以上禁止内容对本公司用户、商家及网站本身造成损失的，本公司有权追究相关法律责任。
5、用户在使用SaaS软件时不得违反国家法律、法规、行政规章的规定、不得侵犯他人知识产权或其他合法权益的信息、不得违背社会公共利益或公共道德、不得违反本平台的相关规定，如有违反导致任何法律后果的发生，用户将以自己的名义独立承担相应的法律责任。
7、用户不应采取不正当手段提高自身或他人信用度，或采用不正当手段恶意评价其他用户，降低其他用户信用度。
8、用户与其他用户因产生纠纷，可以请求本公司从中予以协调处理。用户如发现其他用户有违法或违反本协议的行为，可以向本公司举报。　　
9、用户同意接收来自SaaS软件的信息。
</p>
<p>
四、使用规范
1、通过SaaS软件，用户可按照相应的规则发布信息，但所发布之信息不得含有违反法律法规的内容。
2、在接受SaaS软件过程中，用户不得从事下列行为：
1）发表、传送、传播、储存侵害他人知识产权、商业秘密等合法权利的内容，包含但不限于病毒、木马、定时炸弹等可能对本平台系统造成伤害或影响其稳定性的内容，或制造虚假身份以误导、欺骗他人。
2）传送或散布以其他方式实现传送含有受到知识产权法律保护的图像、相片、软件或其他资料的文件，作为举例（但不限于此）：包括版权或商标权（或隐私权或公开权），除非用户合法拥有或控制着相应的权利或已得到权利所有人的许可。
3）使用任何包含有通过侵犯商标、版权、专利、商业机密或任何一方的其他专有权利的方式利用本“软件”获得的图像或相片等资料或信息。
4）进行危害计算机、手机网络安全的行为，包括但不限于：使用未经许可的数据或进入未经许可的服务器/账号；未经允许进入公众计算机网络或者他人计算机系统并删除、修改、增加存储信息；未经许可，企图探查、扫描、测试本平台系统或网络的弱点或其它实施破坏网络安全的行为；企图干涉、破坏本平台系统或网站的正常运行，故意传播恶意程序或病毒以及其他破坏干扰正常网络信息服务的行为；伪造TCP/IP数据包名称或部分名称。
5）修改或伪造软件作品运行中的指令、数据、数据包，增加、删减、变动软件的功能或运行效果，不得将用于上述用途的软件通过信息网络向公众传播或者运营。
6）在未经本平台书面明确授权前提下，出售、出租、出借、散布、转移或转授权软件和服务或相关的链接或从使用软件和服务或软件和服务的条款中获利，无论以上使用是否为直接经济或金钱收益。
7）违背本平台页面公布之活动规则，包括但不限于发布虚假信息、作弊或通过其他手段进行虚假交易。
3、用户了解并同意，本公司有权应政府部门（包括司法及行政部门）的要求，向其提供用户在SaaS软件上填写的注册信息和发布纪录等必要信息。
4、在SaaS软件使用过程中，用户承诺遵守以下约定：
1)在使用SaaS软件过程中实施的所有行为均遵守国家法律、法规等规范文件及SaaS软件各项规则的规定和要求，不违背社会公共利益或公共道德，不损害他人的合法权益，不违反本协议及相关规则。用户如果违反前述承诺，产生任何法律后果的，应以自己的名义独立承担所有的法律责任，并确保本公司免于因此产生任何损失，否则，本公司有权要求用户赔偿相应的损失。
2)不发布国家禁止发布的信息，不发布涉嫌侵犯他人知识产权或其它合法权益的信息，不发布违背社会公共利益或公共道德、公序良俗的信息，不发布其它涉嫌违法或违反本协议及各类规则的信息。
3)不对SaaS软件上的任何数据作商业性利用，包括但不限于在未经本公司事先书面同意的情况下，以复制、传播等任何方式使用SaaS软件上展示的资料。
4)不使用任何装置、软件或例行程序干预或试图干预SaaS软件的正常运作或正在SaaS软件上进行的任何活动。用户不得采取任何将导致不合理的庞大数据负载加诸于SaaS软件的行为。
5、用户了解并同意：
1)违反上述承诺时，本公司有权依据本协议的约定，做出相应处理或终止向用户提供服务，且无须征得用户的同意或提前通知予用户。
2)根据相关法令的指定或者本公司服务规则的判断，用户的行为涉嫌违反法律法规的规定或违反本协议和/或规则的条款的，本公司有权采取相应措施，包括但不限于直接屏蔽、删除侵权信息或直接终止向用户提供服务。
3)对于您在SaaS软件上实施的行为，包括未在SaaS软件上实施但已经对本公司及其用户产生影响的行为，本公司有权单方认定用户行为的性质及是否构成对本协议和/或规则的违反，并据此采取相应的处理措施。用户应自行保存与其行为有关的全部证据，并应对无法提供充要证据承担不利后果。
4)对于涉嫌违反承诺的行为对任意第三方造成损害的，用户均应当以自己的名义独立承担所有的法律责任，并应确保本公司免于承担因此产生的损失或增加的费用，否则，本公司有权向用户追偿并要求其赔偿相应的损失。
5)如用户涉嫌违反有关法律或者本协议之规定，使本公司遭受任何损失，或受到任何第三方的索赔，或受到任何行政管理部门的处罚，用户应当赔偿本公司因此造成的损失及（或）发生的费用，包括合理的律师费用。
</p>
<p>
五、软件产品保护条款
1、SaaS软件之著作权及其它知识产权等相关权利或利益（包括但不限于现已取得或未来可取得之著作权、专利权、商标权、营业秘密等）皆为本公司所有。SaaS软件受中华人民共和国专利权法及国际条约和其他知识产权法及条约的保护。用户仅获得SaaS软件的非排他性使用权。用户对本协议的确认并不会发生SaaS软件知识产权的权属转移，也不会发生任何本公司未处分的其他SaaS软件上由本公司享有或者合法拥有的任何权利。
2、用户不得删除SaaS软件及其他副本上一切关于版权的信息，并应当保证不得以反向编译、复制、破解、演绎等任何相类似之行为对本公司提供的SaaS软件或者其他相关服务进行破译，即便SaaS软件或者其他相关服务是否最终被用户使用或接受。
3、本公司为用户提供相应的软件产品服务是建立在合理且必要的SaaS软件运营环境、管理方案等基础上。本公司不保证SaaS软件能够或不能够完全满足用户需求，在用户手册、帮助文件、使用说明书等软件文档中的介绍性内容仅供用户参考，不得理解为对用户所做的任何承诺，同时本公司不对用户的不正当使用SaaS软件或者无法提供必要的运营环境、管理环境而导致的SaaS软件无法使用、丧失核心职能等后果承担任何责任。本公司保留对软件版本进行升级，对功能、内容、结构、界面、运行方式等进行修改或自动更新的权利。
4、为了更好地服务于用户，为用户定制个性化配置，SaaS软件可能会收集、传播某些信息，本公司将视其为“安全的保密内容”，并对用户采取严格的保密措施。
5、使用SaaS软件由用户自己承担风险，在适用法律允许的最大范围内，本公司在任何情况下不就因使用或不能使用SaaS软件所发生的特殊的、意外的、非直接或间接的损失承担赔偿责任，即使用户已事先被告知该损害发生的可能性。
6、若用户须使用网络版的软件产品，则本公司所提供的软件服务将涉及Internet服务。用户须理解，SaaS软件可能会因此遭受本公司所不能预见、无法克服、无法避免、不可侦测的任何不稳定因素的影响。本公司所提供的软件服务将存在因不可抗力、计算机病毒或黑客攻击、系统不稳定、用户所在位置、用户关机、互联网故障或者维护以及其他任何技术、互联网络、通信线路原因等造成的服务中断或不能满足用户要求的风险。用户须承担前述风险，本公司不作任何保证或者承诺。
7、本公司定义的信息内容包括：文字、软件、声音、图像、视频；在广告中全部内容；本公司为用户提供的商业信息，所有这些内容受版权、商标权、和其它知识产权和所有权法律的保护。所以，用户只能在本公司和广告商授权下才能使用这些内容，而不能擅自复制、修改、编撰这些内容、或创造与内容有关的衍生产品。
8、若用户不遵守本协议的任何规定，本公司将保留解除本协议并终止提供软件服务的权利。

六、知识产权保护
1、用户使用互联网必须遵守国家有关的政策和法律，如刑法、国家安全法、保密法、计算机信息系统安全保护条例等，保护国家利益，保护国家安全，对于违法使用互联网络而引起的一切责任，由用户负全部责任。
2、SaaS软件作为本公司独立开发的一款软件，基于特定的操作系统，有其自身的运行逻辑，对于使用过程中可能产生的与其他应用程序的冲突，SaaS软件无法预见，也不承诺解决。
3、本公司再次重申，本协议明示授予用户所享有的一切权利，但是并未向用户授权SaaS软件的所有权利。SaaS软件受版权和其他知识产权法律及条约的保护，本公司享有SaaS软件的产权、版权和其他知识产权，本公司仅授权用户使用该软件，但是并没有向用户承诺、保证、明示、暗示、声明出售该软件。用户不得对进行本软件进行反向工程、反编译或者反汇编等破坏本公司所享有的知识产权权益以及妨碍本公司享有知识产权权益的任何行为，否则本公司将追究用户法律责任及经济责任。
4、未经本公司的书面授权，用户不得将SaaS软件复制、网络传播、出售、出租、租赁、出借或者以任何方式对第三方提供本公司专属的技术支持、软件产品服务。
5、本公司同意用户使用SaaS软件链接至第三方站点。第三方站点不由本公司控制，并且本公司不对任何第三方站点的内容、第三方站点包含的任何链接、或第三方站点的任何更改或更新负责。本公司不对从任何第三方站点收到的网站广播或任何其它形式的传输负责。本公司仅为了提供便利的目的而向您提供这些至第三方站点的链接，并且包括某种链接并不暗示本公司认可相应的第三方站点。同时，用户须保证本公司所提供的软件产品及服务不因用户的前述行为而陷入被第三方破译、窃取源代码的风险，否则本公司有权立即终止软件服务。
6、本公司有权随时对软件产品进行更新、增补、补充组件或者基于SaaS软件的服务内容的变化而增添其他相关协议条款，并在每一次刷新本协议之后会于用户首次启动SaaS软件以合理的方式予以公示并提示用户确认。若用户确认之后，其将享有本公司的最新服务；若用户拒绝的，本公司有权不为其提供最新的软件服务，包括升级、更新、组件安装。
7、若本公司所提供的软件产品因用户拒绝升级版本或者更新组件抑或拒绝接受最新软件许可协议而无法使用的，本公司不对此承担任何责任。
8、本公司所提供的软件产品的全部或者部分内容均不得用于有偿转让或者演示、测试、评估之外的其他任何目的。
9、若用户不再接受本公司的软件服务，或者本协议因本公司与用户之间的基础关系消灭而自告终止的，用户必须销毁SaaS软件及其全部组成部分。
</p>
<p>
七、免责事由
本公司将按现有技术提供相应的安全措施以保障SaaS软件的安全和正常运行。但由于下列状况无法正常运作，使您无法使用各项服务时，本公司不承担损害赔偿责任，该状况包括但不限于：
（1）本公司公告之系统停机维护期间；
（2）因电信故障、终端设备、通讯或其他设备出现故障导致无法进行数据传输或迟延、不准确、错误、疏漏等的；
（3）因用户自身操作原因导致SaaS软件的相关数据（包括但不限于菜品数据信息等）无法体现或出现乱码或出现数据有差异等；
（4）因用户自身操作原因（包括但不限于自身结账出错等）导致最终营业额资金与实际存在差额等；
（5）因用户自身操作原因导致使用短信等增值功能所造成的损失不承担任何赔偿责任；
（6）所有发给用户的通告，本公司都将通过正式的页面公告、站内信、电子邮件、客服电话、手机短信或常规的信件送达。任何非经本公司正规渠道获得的中奖、优惠等活动或信息，本公司不承担任何法律责任；
（7）本公司向用户免费提供或赠送的，或提供有偿服务时附赠的各种产品和服务，因产品或服务的瑕疵引起的一切损失不承担任何赔偿责任；
（8）用户自由选择网上银行或其他第三方交易平台购买SaaS软件提供的相关产品或服务，而用户通过上述支付渠道购买本公司产品或服务时，由于错误操作、恶意操作、交易平台的服务缺陷、不可抗力等原因受到的一切损失不承担任何赔偿责任；
（9）本公司对用户通过SaaS软件与其它网站的链接获得的一切信息资料的真实性、准确性、完整性不承担任何责任。因相关链接内容不在本公司控制范围内，本公司对用户利用其他网站信息资料后遭受的任何损失不承担任何赔偿责任；
（10）因用户自行操作本软件而造成的后果及损失，由用户自行承担。由此造成本公司损失的，本公司有权予以追偿；
（11）因台风、地震、海啸、洪水、停电、战争、恐怖袭击等不可抗力之因素，造成本公司系统障碍不能执行业务的；
（12）由于黑客攻击、电信部门技术调整或故障、网站升级、第三方问题等原因而造成的服务中断或者延迟。
</p>
<p>
八、责任范围及责任限制
1、本公司仅对本协议中所列明的义务承担责任。
2、明确因交易所产生的任何风险应由交易双方承担。
3、本公司客户信息是由客户自行提供，本公司无法保证该信息的真实、准确和完整，用户应对其自身的判断承担全部责任。
4、本公司不对交易标的及本服务提供任何形式的保证，包括但不限于以下事项：
1）本服务将符合用户的需求；
2）本服务将不受干扰、及时提供或免于出错；
3）经由本服务交易或取得之任何产品、服务、资讯或其他资料将符合用户的期望；
4）本公司的合作单位，所提供的服务或产品品质及内容由该合作单位自行负责；
5）用户经由本服务的使用下载或取得任何资料，应由其自行考量且自负风险，因资料的下载而导致其电脑系统的任何损坏或资料流失，本公司不承担责任；
6）用户自本公司及本公司工作人员或经由本服务取得的建议或资讯，无论其为书面或口头，均不构成本公司对本服务的任何保证；
7）在法律法规允许的情况下，本公司对于与本协议有关或由本协议引起的任何间接的、惩罚性的、特殊的、派生的损失（包括业务损失、收益损失、利润损失、使用数据或其他经济利益的损失），不承担责任；
8）除本协议另有规定外，在任何情况下，本公司因本协议所承担的赔偿责任总额不超过向您收取的当次服务费用总额。
</p>
<p>
九、协议变更、中断、终止
    1、用户同意，本公司基于SaaS软件服务的安全性，有权中止用户使用SaaS软件，待安全问题解决后及时恢复，并对中止及恢复的事实及时通知。如果相关安全问题是由于用户的违法行为引起，本公司有权终止用户使用SaaS软件，永久冻结或注销用户的账户，并有权要求用户赔偿相应的损失。
    2、如发生下列任何一种情形，本公司有权不经通知而中断或终止向用户提供的服务：
　　1）根据法律规定用户应提交真实信息，而用户提供的个人资料不真实、或与注册时信息不一致又未能提供合理证明。
　　2）用户违反相关法律法规或本协议的约定。
　　3）按照法律规定或主管部门的要求。
4）出于安全的原因或其他必要的情形。
3、用户有权向本公司要求注销账户，经本公司审核同意的，本公司注销用户的账户，届时，用户与本公司基于本协议的合同关系即终止。用户的账户被注销后，本公司没有义务为其保留或向其披露账户中的任何信息，也没有义务向用户或第三方转发任何其未曾阅读或发送过的信息。
4、用户同意，其与本公司的协议关系终止后，本公司仍享有下列权利：
    1) 继续保存用户未及时删除的注册信息及使用SaaS软件服务期间发布的所有信息至法律规定的记录保存期满。
2）用户在使用SaaS软件期间存在违法行为或违反本协议和/或规则的行为的，本公司仍可依据本协议向其主张权利。
</p>
<p>
十、附则
1、本公司具有对以上各项条款内容的最终解释权和修改权。若用户对本公司的解释或修改有异议，应当立即停止使用SaaS软件。用户继续使用SaaS软件的行为将被视为对本公司的解释或修改的接受。
2、因本协议所发生的纠纷，双方同意按照中华人民共和国法律，由本公司所在地的有管辖权的法院管辖。
3、若用户对本协议有任何问题，或者因使用SaaS软件出现任何问题希望联系本公司的，请随时使用SaaS软件附上的联络方式予以联系，或者访问本公司网址。
</p>
<p style="width:100%;text-align: center;">
上海晶汉信息科技有限公司
<p style="width:100%;text-align: center;">
2017年5月18日
</p>
		</p>
		</div>
		</div>
		<!--时间picker器-->
		<c-datetime-picker ref="picker" type="date" v-model="timepicker" @confirm="getBir(timepicker)" :startDate="beginDate"></c-datetime-picker>
		<alert :showMsg="showMsg" v-if="showAlert"></alert>
	</div>
</template>
<script>
import Vue from 'vue'
import {DatetimePicker} from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.component('c-datetime-picker',DatetimePicker)

	export default{
		componetns:{
			'c-datetime-picker':DatetimePicker
		},
		data(){
			return{
				information:{name:'注册',ifShowReload:false,ifShowMenu:false},
				radio: '-1',
				//暂时存储手机号码
				phoneNumber:null,
				//控制验证码显示
				countIndex:false,
				//暂时存储验证码
				checkNumber:null,
				//开始显示的不可点击的二维码按钮
				firstShow:true,
				//判断第几次获取验证码
				againGet:false,
				//验证码初始时间
				time:60,
				//4个选择共同控制是否可以注册
				//控制手机号
				phoneAllow:false,
				//控制验证码
				checkNumAllow:false,
				//控制生日
				birthdayAllow:false,
				//控制男女
				genderAllow:false,
				allow1:false,
				allow2:false,
				allow3:false,
				allow4:false,
				//当都满足条件时，激活按钮
				activeBtn:false,
				// 生日
				birthday:null,
				// timepicker组件
				timepicker:null,
				beginDate:new Date("1900/1/1"),
				//显示文档
				showDoc:false,
				//判断是用什么方式注册
				enterWay:0,
				code:0,
				showMsg:'',
				showAlert:false,
				kind:1
			}
		}
		,
		methods:{
			//生日标准时间转换
			getBir(target){
				this.birthday = this.getTaskTime(target)
			},
			getTaskTime(strDate) {
		        let date = new Date(strDate);
		        let y = date.getFullYear();
		        let m = date.getMonth() + 1;
		        m = m < 10 ? ('0' + m) : m;
		        let d = date.getDate();
		        d = d < 10 ? ('0' + d) : d;
		
		        return y + "/" + m + "/" + d
    			},
			openPicker() {
				this.$refs.picker.open()
			},
			checkPhoneNum(){
				if(!(/^1[34578]\d{9}$/.test(this.phoneNumber))) 
				{ 
				    alert('您输入的手机号不正确，请重新输入11位正确的手机号！')
				    return false
				}
				else{
					this.firstShow = false
					this.allow1 = true
				}
			},
			//计时
			countTime(){
				this.$http.post(this.$store.state.accountHttp+"/jinghan-account/api/user/sendSmsCode",
							JSON.stringify({"reqId" : "1","param":{"phone":this.phoneNumber}})
						,{emulateJSON:true})
						.then(function(res){
							console.log(res)
					//点击获取验证码，显示改变为读秒
					this.countIndex = true
					//初始化计时为60s
					this.time = 60
					//设置定时器计算时间
					let that = this
					let timer = setInterval(function(){
						that.time = that.time - 1
						if(that.time<1){
							//改变显示为获取验证码
							that.countIndex = false
							//取消定时器
							clearInterval(timer)
						}
					},1000)
				})
			},
			//提交
			registerSubmit(){
				console.log(this.radio)
				this.$http.post(this.$store.state.accountHttp+"/jinghan-account/api/user/insertMember",
							JSON.stringify({"param":{"phone":this.phoneNumber,
													"smsCode":this.checkNumber,
													"openId":this.$store.state.openId,
													"sex":this.radio,
													"birthday":this.birthday,
													"merchantId":this.$store.state.merchantId,
													"kind":this.kind
													}})
						,{emulateJSON:true})
						.then(function(res){
							console.log(res)
							if(res.body.code == 5006){
								this.showMsg = '验证码输入错误'
								this.showAlert = true
								var that = this
								setTimeout(function(){
									that.showAlert = false
								},2000)
							}
							else if(res.body.code == 5005){
								this.showMsg = '您已经是会员'
								this.showAlert = true
								var that = this
								setTimeout(function(){
									that.showAlert = false
								},2000)
								this.$store.state.phoneNumber = this.phoneNumber
								//退回到首页
								if(this.$store.state.memberIndex){
									this.$router.push({path:'/'})
								}//退回到buy
								if(this.$store.state.memberBuy){
									this.$router.push({path:'/order/buy'})
								}//退回到affirm
								if(this.$store.state.memberAffirm){
									this.$router.push({path:'/order/affirm'})
								}//退回到finish
								if(this.$store.state.memberFinish){
									this.$router.push({path:'/order/buy/finished'})
								}
							}
							else if(res.body.code == 0){
								this.$router.push({path:'/order/registerSucceed'})
								//根据openId获取手机号，判断是否为会员
								this.$http.post(this.$store.state.accountHttp+'/jinghan-account/api/user/queryByOpenId',
									JSON.stringify({"param":{"openId":this.$store.state.openId,
													"merchantId":this.$store.state.merchantId},
													"channel":1})
								,{
									emulateJSON:true  //必须设置这个头文件
								}).then(
									function(res){
										console.log(res)
										if(res.body.data.phone == 0){
												this.$store.state.phoneNumber = null
										}
										else{
											this.$store.state.phoneNumber = res.body.data.phone
										}
									})
							}
						})
			}
		},
		created(){
			var userWay = navigator.userAgent
			if(userWay.indexOf('MicroMessenger') >= 0){
				this.kind = 1
			}
			else if(userWay.indexOf('AlipayClient') >= 0){
				this.kind = 2
			}
		}
		,
		watch:{
			//手机号监控
			phoneNumber(){
				//手机号到达要求首先需要进行的显示
				if(this.phoneNumber.length==11){
						this.countIndex = false
						this.firstShow = false
						this.phoneAllow = true
					}
				else{
					this.countIndex = true
					this.firstShow = true
					this.phoneAllow = false
					this.activeBtn = false
				}
				//其他达到要求后手机号进行的操作
				if(this.checkNumAllow&this.birthdayAllow&this.genderAllow){
					if(this.phoneNumber.length==11){
						this.activeBtn = true
					}
					else{
						this.activeBtn = false
					}
				}
			}
			,
			//男女监控
			radio(){
				if(this.radio!=-1){
					this.genderAllow = true
				}
				else{
					this.genderAllow = false
					this.activeBtn = false
				}
				if(this.checkNumAllow&this.birthdayAllow&this.phoneAllow){
					if(this.radio!=-1){
						this.activeBtn = true
					}
					else{
						this.activeBtn = false
					}
				}
			},
			//验证码监控
			checkNumber(){
				if(this.checkNumber.length==6){
					this.checkNumAllow = true
				}
				else{
					this.checkNumAllow = false
					this.activeBtn = false
				}
				if(this.genderAllow&this.birthdayAllow&this.phoneAllow){
					if(this.checkNumber.length==6){
						this.activeBtn = true
					}
					else{
						this.activeBtn = false
					}
				}
			}
			,
			//生日监控
			birthday(){
				if(this.birthday!=null){
					this.birthdayAllow = true
				}
				else{
					this.birthdayAllow = false
					this.activeBtn = false
				}
				if(this.genderAllow&this.checkNumAllow&this.phoneAllow){
					if(this.birthday!=null){
						this.activeBtn = true
					}
					else{
						this.activeBtn = false
					}
				}
			}
		}
	}
</script>
<style lang='scss'>
	.register{
		position:fixed;
		top:0;
		left:0;
		width:100%;
		height:100%;
		background:#f9f9f9;
		z-index: 3001;
		/*nav*/
		.navs{
			background:#fff;
			p:nth-child(1){
				font-size:0.16rem;
				color:#282828;
			}
			p:nth-child(2){
				color:#282828;
			}
		}
		/*手机号*/
		.phone{
			width:100%;
			height:0.5rem;
			margin-top:0.07rem;
			input{
				width:100%;
				height:100%;
				font-size:0.15rem;
				color:#A6A6A6;
				padding-left:0.15rem;
				border:none;
			}
		}
		/*验证码*/
		.check{
			position:relative;
			width:100%;
			height:0.5rem;
			margin-top:0.02rem;
			background:pink;
			input{
				width:100%;
				height:100%;
				font-size:0.15rem;
				color:#A6A6A6;
				padding-left:0.15rem;
				border:none;
			}
			p{
				position:absolute;
				top:21%;
				right:0.15rem;
				display: flex;
				justify-content: center;
				align-items:center;
				width:0.9rem;
				height:0.3rem;
				color:#DCDCDC;
				background: #FFF;
				border: 1px solid #DCDCDC;
			}
			.active-check{
				color:#30BFBE;
				background: #fff;
				border: 1px solid #30BFBE;
			}
			.counting{
				font-size:0.14rem;
				color:#30BFBE;
				border: 1px solid #30BFBE;
			}
			.firstShow{
				background: #FFF;
				border: 1px solid #DCDCDC;
			}
		}
		/*验证码提示信息*/
		.checkInfo{
			display: flex;
			align-items: center;
			width:100%;
			height:0.3rem;
			p{
				margin-left:0.15rem;
				font-size:0.15rem;
				color: #6A6A6A;
			}
		}
		/*出生年月*/
		.birthday{
			width:100%;
			height:0.4rem;
			background:#fff;
			input{
				width:100%;
				height:100%;
				font-size:0.15rem;
				color:#A6A6A6;
				padding-left:0.15rem;
				border:none;
			}
		}
		/*性别*/
		.gender{
			width:100%;
			height:0.4rem;
			margin-top:0.1rem;
			.el-radio__inner{
				margin-left:0.15rem;
			}
			.is-checked{
				.el-radio__inner{
					border-color:#30BFBE;
					background: #30BFBE;
				}
			}
			.el-radio__label{
				font-size:0.16rem;
				color:#282828;
			}
		}
		/*注册按钮*/
		.submit{
			position:relative;
			display:flex;
			flex-direction: column;
			align-items: center;
			width:100%;
			height:0.7rem;
			margin-top:0.3rem;
			/*激活时按钮*/
			.btn-active{
				position:absolute;
				top:0%;
				left:20%;
				display:flex;
				justify-content: center;
				align-items:center;
				width:2.2rem;
				height:0.41rem;
				background: #EE5A32;
				border-radius: 6px;
			    background: #30BFBE;
				span{
					font-size:0.18rem;
					color:#FFF;
				}
			}
			/*未激活时按钮*/
			.btn-silence{
				position:absolute;
				top:0%;
				left:20%;
				display:flex;
				justify-content: center;
				align-items:center;
				width:2.2rem;
				height:0.41rem;
				background: #EE5A32;
				border-radius: 6px;
			    background: #DCDCDC;
				span{
					font-size:0.18rem;
					color:#FFF;
				}
			}
			.info{
				position:absolute;
				bottom:0%;
				left:16%;
				font-size:0.14rem;
				color: #090000;
				span{
					font-size:0.14rem;
					color:deepskyblue;
				}
			}
		}
		/*协议*/
		.protocol-inner{
			position:fixed;
			top:0;
			left:0;
			width:100%;
			height:90%;
			background:#fff;
			z-index: 3;
			overflow:scroll;
			.inner{
				p{
					font-size:0.14rem;
				}
				p:nth-child(1){
					text-align: center;
					font-size:0.18rem;
				}
			}
		}
		/*关闭按钮*/
		.close{
			position:fixed;
			bottom:4.2%;
			display: flex;
			justify-content: center;
			width:100%;
			z-index: 3;
			img{
				width:0.4rem;
				height:0.4rem;
			}
		}
	}
</style>