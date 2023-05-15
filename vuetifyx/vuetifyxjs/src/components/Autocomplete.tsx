import Vue, { CreateElement, VNode, VNodeData } from 'vue';
import draggable from 'vuedraggable';
import { VAutocomplete, VPagination } from 'vuetify/lib';
import { Core, SelectedItems, slotTemplates } from './Helpers';

export default Vue.extend({
	mixins: [Core, SelectedItems],
	components: {
		vpagination: VPagination,
		vautocomplete: VAutocomplete,
		vdraggable: draggable,
	},

	props: {
		remoteUrl: String,
		eventName:  String,
		isPaging: Boolean,
		hasIcon: Boolean,
		cacheItems: Boolean,
		hideSelected: Boolean,
		hideDetails: Boolean,
		sorting: Boolean,
		items: {
			type: Array,
			default: () => ([]),
		},
	},

	data() {
		return {
			listItems: [],
			cachedSelectedItems: [],
			value: [],
			isLoading: false,
			searchKeyword: '',
			remote: {
				total: 0,
				current: 0,
				pages: 0,
				page: 0,
				disabled: false,
			},
		};
	},

	methods: {
		loadRemoteItems() {
			if (!this.remoteUrl || !this.eventName) {
				return;
			}

			this.isLoading = true;
			(this as any).$plaid().url(this.remoteUrl).eventFunc(this.eventName).query("keyword", this.searchKeyword).query("page", this.remote.page).go().then((r: any) => {
				this.remote.current = r.data.current;
				this.remote.total = r.data.total;
				this.remote.pages = r.data.pages;
				if (this.isPaging) {
					this.listItems = [].concat(this.cachedSelectedItems || [], r.data.items || []);
				}else{
					if (this.remote.current >= this.remote.total) {
						this.remote.disabled = true;
					}else{
						this.remote.disabled = false;
					}
					this.listItems = [].concat(this.listItems || [], r.data.items || []);
				}
			}).finally(() => {
				this.isLoading = false;
			});
		},
		endIntersect(entrie: any, observer: any, isIntersecting: any) {
			if (isIntersecting && !this.remote.disabled) {
				this.remote.page += 1;
				this.loadRemoteItems();
			}
		},
		changeStatus(vals: any) {
			const cachedSelectedItems: any[] = [];
			vals.forEach((val: any) => {
				this.listItems.forEach((item: any) => {
					if (val == item.value) {
						cachedSelectedItems.push(item);
						return;
					}
				})
			})

			this.cachedSelectedItems = (cachedSelectedItems) as [];
			this.value = vals;
			this.$emit("change", vals);
		},
		removeItem(v: any) {
			return () => {
				this.value = this.value.filter(element => element != v);
				this.changeStatus(this.value);
			}
		},
		changeOrder(vs: any){
			this.cachedSelectedItems = vs
			const vals = this.cachedSelectedItems.map((item: any) => item.value)
			this.value = vals as any;
			this.$emit('change', vals);
		},
	},

	created() {
		this.listItems =  this.$props.items || this.$props.selectedItems || [];
		this.cachedSelectedItems = this.$props.selectedItems || [];
		this.value = (this.$attrs.value) as any || [];
	},

	mounted() {
		(this as any).$plaid().fieldValue(this.$props.fieldName, this.$attrs.value);
	},

	watch: {
		searchKeyword(val: string) {
			if (!this.remoteUrl || !this.eventName) {
				return;
			}

			if (val === null) {
				this.searchKeyword = '';
				return;
			}

			this.remote.page = 1;
			if (!this.isPaging) {
				this.listItems  = this.cachedSelectedItems
			}

			this.loadRemoteItems();
		},
	},

	render(h: CreateElement): VNode {
		const {
			remoteUrl,
			hideDetails,
		} = this.$props;

		let {
			hideSelected,
			cacheItems,
		} = this.$props

		const slots: VNode[] = slotTemplates(h, this.$slots);

		if (remoteUrl) {
			hideSelected = true;
			cacheItems = false;
			if (this.isPaging){
				const loadmoreNodeData: VNodeData = {
					props: {
						circle: true,
						length: this.remote.pages,
						value: this.remote.page,
						totalVisible: 5,
					},
					on: {
						"input": (v: number) => {
							this.remote.page = v;
							this.loadRemoteItems();
						},
					},
				}

				slots.push(
					<template slot="append-item">
						<div class="text-center">
							<vpagination {...loadmoreNodeData}></vpagination>
						</div>
					</template>
				)
			}else{
				const loadmoreNodeData: VNodeData = {
					props: {
						class: "ma-2",
						color: "primary",
						disabled: this.remote.disabled,
						loading: this.isLoading,
					},
					on: {
						"click": () => {
							this.remote.page += 1;
							this.loadRemoteItems();
						},
					},
					directives: [{
						name: "intersect",
						value: this.endIntersect,
					}],
				}

				slots.push(
					<template slot="append-item">
						<div class="text-center">
							<v-btn {...loadmoreNodeData}>Load more</v-btn> <v-divider vertical></v-divider> <span>{this.remote.current}/{this.remote.total}</span>
						</div>
					</template>
				)
			}
		}

		if (this.hasIcon){
			this.$scopedSlots["item"] = (props: any)  => {
				const nodes: VNode[] = [];
				nodes.push(
					<v-list-item-avatar tile>
						<img src={props.item.icon}/>
					</v-list-item-avatar>
				)
				nodes.push(
					<v-list-item-content>
						<v-list-item-title v-html={props.item.text}>{props.item.text}</v-list-item-title>
					</v-list-item-content>
				)
				return nodes;
			}
		}

		if (this.$attrs.chips && (this.hasIcon || remoteUrl)){
			this.$scopedSlots["selection"] = (props: any)  => {
				const nodes: VNode[] = [];
				const nodeData: VNodeData = {
					props: {
						...props.attrs,
						close: true,
					},
					on: {
						"click:close": () => {
							this.value.splice(this.value.indexOf(props.item.value as never), 1)
							this.changeStatus(this.value);
						},
					},
				}
				nodes.push(
				<v-chip {...nodeData}>
					{ this.hasIcon ?
					<v-avatar left>
						<v-img src={props.item.icon}></v-img>
					</v-avatar>
					: null }
					{props.item.text}
				</v-chip>
				)
				return nodes;
			}
		}

		const autocompleteData: VNodeData = {
			props: {
				...this.$attrs,
				...this.$props,
				...{
					items: this.listItems,
					value: this.value,
					loading: this.isLoading,
					hideSelected,
					cacheItems,
					hideDetails,
				},
			},

			on: {
				...{
					change: this.changeStatus,
					focus: (e: any) => {
						this.searchKeyword = '';
					},
					'update:search-input': (val: string) => {
						this.searchKeyword = val;
					},
				},
			},
			scopedSlots: {
				...this.$scopedSlots,
			}
		};

		return (
		<div>
			{(this.sorting && this.cachedSelectedItems.length>0)  ?
			<v-card>
				<v-list>
					<vx-draggable animation='300' handle='.handle' value={this.cachedSelectedItems} onInput={this.changeOrder}>
					{this.cachedSelectedItems.map((item: any, i) => {
						return (
						<div key={item.value}>
							<v-list-item>
							{this.hasIcon ?
								<v-list-item-avatar tile>
									<v-img src={item.icon}></v-img>
								</v-list-item-avatar>
								: null}
								<v-list-item-content>
									<v-list-item-title>{item.text}</v-list-item-title>
								</v-list-item-content>
								<v-list-item-icon>
									<v-btn icon="true">
										<v-icon onClick={this.removeItem(item.value)}>delete</v-icon>
									</v-btn>
									<v-icon class="handle">reorder</v-icon>
								</v-list-item-icon>
							</v-list-item>
							{i < this.cachedSelectedItems.length - 1 ? <v-divider key={i}></v-divider> : null}
						</div>
						)
					})}
					</vx-draggable>
				</v-list>
			</v-card>
			: null}
			<vautocomplete {...autocompleteData}>
			{slots}
			</vautocomplete>
		</div>
		);
	},
})

