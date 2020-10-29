<template>
	<div>
		<img alt="Vue logo" src="../assets/fslbg.jpg">
		<form @submit.prevent="foo">
			<div class="reg">
				<el-input type="text" placeholder="请输入9位产品编号" v-model="code" maxlength="9" show-word-limit @blur.prevent="checkCode()" style="display:inline;width:328px"></el-input>
				<label>从</label>
				<input class="defualInput"  style="text-align: center;" v-model="start"/>
				<label style="width:50px">到</label>
				<el-input type="text" v-model="num" placeholder="请输入条目"  @blur.prevent="checkNum()" style="display:inline;"></el-input>
				
				<el-button type="primary" @click="onSubmit()" :disabled="display" style="margin-left: 50px">提交</el-button>
				<p v-if="error">{{error}}</p>
			</div>
		</form>	
		<div v-show="copyData">
			<el-button class="copy_btn" type="success"  :data-clipboard-text="copyData" @click="copy()">复制序列</el-button>
			<el-button class="copy_btn" type="success"   @click="onClickDownDaily()">导出序列到txt</el-button>
			<el-button type="success"  @click="printCode()">打印条码</el-button>
		</div>
		<ul>	
			<li v-for="item in items" v-bind:key="item.id">
				<Barcode v-bind:value="item.code">程序出了点小问题</Barcode>
			</li>
		</ul>
	</div>

</template>
<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
<script>
	import VueBarcode from 'vue-barcode';
	import Clipboard from 'clipboard';

	export default {
		name: 'barcode',
		components: {
			'Barcode': VueBarcode,
			Clipboard
		},
		data() {
			return {
				start: 1,
				copyData: '',
				display: true,
				code: '',
				num: '',
				arr: [],
				items: [],
				date: {},
				yearArray: {},
				monthArray: {},
				dayArray: {},
				error: '',
			}
		},
		mounted: function(){
			var _date = new Date();
			this.date.year = _date.getFullYear();
			this.date.month = _date.getMonth() + 1;
			this.date.day = _date.getDate();
		},
		
		methods: {
			onClickDownDaily: function(){
				var name =this.date.year.toString() + this.date.month.toString() + this.date.day.toString()
				var export_blob = new Blob([this.copyData]);
				var save_link = document.createElement("a");
				save_link.href = window.URL.createObjectURL(export_blob);
				save_link.download = name;
				this.fakeClick(save_link);
			},
			fakeClick(obj) {
				var ev = document.createEvent("MouseEvents");
				ev.initMouseEvent(
					"click",
					true,
					false,
					window,
					0,
					0,
					0,
					0,
					0,
					false,
					false,
					false,
					false,
					0,
					null
				);
				obj.dispatchEvent(ev);
			},
			
			copy: function(){
				console.log(this.copyData)
				var clipboard = new Clipboard('.copy_btn')
				console.log(clipboard)
				clipboard.on('success', e => {
					alert("复制成功")

						// 释放内存
					clipboard.destroy()
				})

				clipboard.on('error', e => {
					alert("该浏览器不支持自动复制")
						// 不支持复制
// 					let instance = Toast('该浏览器不支持自动复制');
// 					setTimeout(() => {
// 							instance.close();
// 					}, 2000);

						// 释放内存
					clipboard.destroy()
				})
			},
			
			printCode:function () {
				var newWin = window.open(""); //新打开一个空窗口
				var imageToPrint = document.getElementsByTagName("li"); //将要被打印的图片
				var html = ""
				for (var i = 0; i < imageToPrint.length; i++) {
					console.log(imageToPrint[i]);
					newWin.document.write(imageToPrint[i].innerHTML); //将图片添加进新的窗口
				}

				setTimeout(function() {
					newWin.print(); //打印
					newWin.close(); //关闭窗口
				}, );
			},
			
			onSubmit: function() {
				alert(111311)
				var year = this.date.year;
				if (year < 2029) {
					this.yearArray.key = year - 2020
				} else {
					this.yearArray.key = String.fromCharCode(65 + year - 2030)
				}

				var month = this.date.month;
				if (month > 9) {
					alert(1111111)
					this.monthArray.key = String.fromCharCode(55 + month)
				} else {
					this.monthArray.key = month.toString();
				}

				var day = this.date.day;
				if (day > 9) {
					this.dayArray.key = String.fromCharCode(55 + day)
				} else {
					this.dayArray.key = day.toString()
				}
				
				let i = this.start;
				for (i; i <= this.num; i++) {
					var ll = this.repeatStr('0', 4 - i.toString().length);
					var obj = new Object();
					var code128 = this.code + '' + this.yearArray.key + this.monthArray.key + this.dayArray.key + ll + i;
					obj.code = code128;
					// JsBarcode(".barcode", code128, {fontSize: 14,});
					this.items.push(obj);
					this.copyData += code128 + '\r\n';
				}

				this.code = '';
				this.start = i ;
				this.num = '';
				// this.display = true;
			},
			
			repeatStr: function(str, num) {
				return num > 1 ? str.repeat(num) : str;
			},
			
			checkCode: function() {
				if (!this.code) {
					this.error = "产品编号不能为空";
				} else if (!/^[0-9a-zA-Z]{9}/.test(this.code)) {
					this.error = "产品编号必须是9个数字或字母"
				} else {
					this.error = '';
					this.display = false
				}
			},
			
			checkNum: function(){
				if(this.num){
					if (!/^[0-9]*$/.test(this.num)) {
						this.error = "条目数量必须是纯数字"
					} else {
						this.error = '';
						this.display = false
					}
				}		
			}
		}
	}
</script>

<style>
	label{
				width:90px;
				display:inline-block;
				text-align: right;
				/* margin-right: 10px; */
			}

	ul li {
		list-style-type: none;
		font-family: "arial rounded mt bold";
		font-size: 30px;
	}

	.reg {
		width: 1000px;
		height: 86px;
		background: #f9f9f9;
		margin: 20px auto;
		text-align: left;
		padding: 24px 34px 0 36px;
		opacity: 0.8; 
	}

	input {
		margin-left: 20px;
		width: 30% !important;
		height: 38px;
		padding: 0;
		border: 1px solid #ccc;
	}
	
	.defualInput {
		width: 50px !important;
		text-align: right;
	}

	p {
		/* margin-left: 80px; */
		text-align: center;
		color: red;
	}
</style>
