<template>
	<div class="box">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="SN编号" prop="sn">
				<el-select v-model="ruleForm.sn" filterable allow-create default-first-option clearable placeholder="请输入SN编号">
					<el-option label="S0001" value="S0001"></el-option>
					<el-option label="S0002" value="S0002"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="产品编号" prop="code">
				<!-- maxlength="9" show-word-limit -->
				<el-input v-model="ruleForm.code"></el-input>
			</el-form-item>
			<el-form-item label="选择日期" required>
				<el-col :span="11">
					<el-form-item prop="date1">
						<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
					</el-form-item>
				</el-col>

			</el-form-item>
			<el-form-item label="数量" prop="num">
				<el-input v-model="ruleForm.num" @blur.prevent="endFlowNum()"></el-input>
			</el-form-item>
			<el-form-item label="开始流水号" prop="start">
				<el-input v-model="ruleForm.start"></el-input>
			</el-form-item>
			<el-form-item label="结束流水号">
				<el-input v-model="ruleForm.end" :disabled="true"></el-input>
			</el-form-item>

			<el-form-item label="备注" prop="desc">
				<el-input type="textarea" v-model="ruleForm.desc"></el-input>
			</el-form-item>
			<el-form-item label="标签模板" prop="temp" required>
				<el-select v-model="ruleForm.temp">
					<el-option label="SN条码" value="SN条码"></el-option>
					<el-option label="其它" value="other"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>


</template>
<!-- <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script> -->
<script>
	export default {
		name: 'barcode2',
		data() {
			var validateStart = (rule, value, callback) => {
				if (value.lenth > 4) {
					value = '';
					return callback(new Error('长度不能超过4个字符'))
				} else {
					callback();
				}
			};
			return {
				ruleForm: {
					code: '',
					sn: '',
					date1: '',
					desc: '',
					temp: '',
					num: '1',
					start: '0001',
					end: '',


				},
				copyData: '',
				show: true,

				rules: {
					sn: [{
						required: true,
						message: '请输入SN编号',
						trigger: 'change'
					}],
					code: [{
							required: true,
							message: '请输入产品编号',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 9,
							message: '长度在 1 到 9 个字符',
							trigger: 'blur'
						}
					],

					date1: [{
						type: 'date',
						required: true,
						message: '请选择日期',
						trigger: 'change'
					}],
					start: [{
						// 						min:1,
						// 						max:4,
						// 						message: '长度小于4个字符',
						validator: validateStart,
						trigger: 'blur'
					}, ],


					temp: [{
						require: true,
						message: '请选择要打印的模板',
						trigger: 'change'

					}]
				}
			};
		},
		methods: {
			tranformDay: function() {
				var tranDate = new Object();
				var year = this.ruleForm.date1.getFullYear();
				if (year < 2029) {
					tranDate.year = year - 2020
				} else {
					tranDate.year = String.fromCharCode(65 + year - 2030)
				}

				var month = this.ruleForm.date1.getMonth() + 1;
				if (month > 9) {
					tranDate.month = String.fromCharCode(55 + month)
				} else {
					tranDate.month = month.toString();
				}

				var day = this.ruleForm.date1.getDate();
				if (day > 9) {
					tranDate.day = String.fromCharCode(55 + day)
				} else {
					tranDate.day = day.toString()
				}

				return tranDate;
			},
			repeatStr: function(str, num) {
				return num > 1 ? str.repeat(num) : str;
			},
			endFlowNum: function() {
				var end = parseInt(this.ruleForm.start) + parseInt(this.ruleForm.num)
				this.ruleForm.end = this.repeatStr('0', 4 - end.toString().length) + end.toString();
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
						var tranDate = this.tranformDay();
						console.log(tranDate)
						var _code128 = this.ruleForm.sn + this.ruleForm.code +
							tranDate.year + tranDate.month + tranDate.day;
						for (let i = 1; i <= this.ruleForm.num; i++) {
							var flowNumLen = this.repeatStr('0', 4 - i.toString().length);
							var code128 = _code128 + flowNumLen + i
							console.log(code128)
							this.copyData += code128 + '\r\n';
						}

					} else {
						console.log('error submit!!');
						return false;
					}
					this.show = !this.show;
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>

<style>
	.box {
		width: 500px;
		height: 600px;
		background: #f9f9f9;
		margin: 20px auto;
		padding: 24px 34px 0 36px;
		opacity: 0.8;
	}
</style>
