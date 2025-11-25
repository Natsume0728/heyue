<template>
	<view class="uni-searchbar">
		<view class="uni-searchbar__box">
			<view class="uni-searchbar__box-icon-search">
				<slot name="searchIcon">
					<uni-icons color="#c0c4cc" size="18" type="search" />
				</slot>
			</view>

			<input :focus="showSync" :disabled="readonly" placeholder="输入要找的车源" :maxlength="maxlength"
				class="uni-searchbar__box-search-input" confirm-type="search" type="text" v-model="searchVal"
				:style="{color:textColor}" @confirm="search" @blur="blur" @focus="emitFocus" />


			<button size="mini" @click="search" class="btn">搜索</button>
		</view>
	</view>
</template>

<script>
	/**
	 * SearchBar 搜索栏
	 * @description 搜索栏组件，通常用于搜索商品、文章等
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=866
	 * @property {Number} maxlength 输入最大长度
	 * @property {String} placeholder 搜索栏Placeholder
	 * 	@value always 一直显示
	 * 	@value auto 输入框不为空时显示
	 * 	@value none 一直不显示
	 * 	@value always 一直显示
	 * 	@value auto 输入框不为空时显示
	 * 	@value none 一直不显示
	 * @property {String} textColor 输入文字颜色
	 * @property {Boolean} focus 是否自动聚焦
	 * @property {Boolean} readonly 组件只读，不能有任何操作，只做展示
	 * @event {Function} confirm uniSearchBar 的输入框 confirm 事件，返回参数为uniSearchBar的value，e={value:Number}
	 * @event {Function} input uniSearchBar 的 value 改变时触发事件，返回参数为uniSearchBar的value，e=value
	 * @event {Function} clear 点击清除按钮时触发事件，返回参数为uniSearchBar的value，e={value:Number}
	 * @event {Function} blur input失去焦点时触发事件，返回参数为uniSearchBar的value，e={value:Number}
	 */

	export default {
		name: "SearchBar",
		emits: ['input', 'update:modelValue',  'search', 'blur', 'focus'],
		props: {
			textColor: {
				type: String,
				default: "#000000"
			},
			maxlength: {
				type: [Number, String],
				default: 100
			},
			value: {
				type: [Number, String],
				default: ""
			},
			modelValue: {
				type: [Number, String],
				default: ""
			},
			focus: {
				type: Boolean,
				default: false
			},
			readonly: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				show: false,
				showSync: false,
				searchVal: ''
			}
		},

		watch: {
			// #ifndef VUE3
			value: {
				immediate: true,
				handler(newVal) {
					this.searchVal = newVal
					if (newVal) {
						this.show = true
					}
				}
			},
			// #endif
			// #ifdef VUE3
			modelValue: {
				immediate: true,
				handler(newVal) {
					this.searchVal = newVal
					if (newVal) {
						this.show = true
					}
				}
			},
			// #endif
			focus: {
				immediate: true,
				handler(newVal) {
					if (newVal) {
						if (this.readonly) return
						this.show = true;
						this.$nextTick(() => {
							this.showSync = true
						})
					}
				}
			},
			searchVal(newVal, oldVal) {
				this.$emit("input", newVal)
				// #ifdef VUE3
				this.$emit("update:modelValue", newVal)
				// #endif
			}
		},
		methods: {



			search() {
				uni.hideKeyboard();

				this.$emit("search", {
					value: this.searchVal
				})
			},
			
			blur() {
				uni.hideKeyboard();

				this.$emit("blur", {
					value: this.searchVal
				})
			},
			
			emitFocus(e) {
				this.$emit("focus", e.detail)
			}
		}
	};
</script>

<style lang="scss" scoped>
	$uni-searchbar-height: 36px;

	.uni-searchbar {
		display: flex;
		position: relative;
		padding: 10px 0;
		// background-color: #fff;
	}

	.uni-searchbar__box {
		display: flex;
		box-sizing: border-box;
		justify-content: left;
		overflow: hidden;
		position: relative;
		flex: 1;
		flex-direction: row;
		align-items: center;
		height: $uni-searchbar-height;
		padding: 5px 8px 5px 0px;
		background-color: #fff;
		border-radius: 10rpx;
	}

	.uni-searchbar__box-icon-search {

		display: flex;
		flex-direction: row;
		// width: 32px;
		padding: 0 8px;
		justify-content: center;
		align-items: center;
		color: #B3B3B3;
	}

	.uni-searchbar__box-search-input {
		flex: 1;
		font-size: 14px;
		color: #333;
		margin-left: 5px;
		margin-top: 1px;
		background-color: inherit;
	}



	.uni-searchbar__text-placeholder {
		font-size: 14px;
		color: #B3B3B3;
		margin-left: 5px;
		text-align: left;
	}

	.uni-searchbar__cancel {
		padding-left: 10px;
		line-height: $uni-searchbar-height;
		font-size: 14px;
		color: #333333;

	}

	.btn {
		background-color: #10458d;
		color: white;
	}
</style>