class Watcher {
	constructor(vm, key, cb) {
		this.vm = vm;
		// data中的属性名称
		this.key = key;
		// 当数据变化的时候调用 cb 更新视图
		this.cb = cb;
		// 在Dep 的静态属性记录当前对象，在访问数据（会执行数据的get方法）将当前watcher 对象添加到dep的subs中
		Dep.target = this;
		// 记录当前数据，设置当前数据为旧数据，执行vm[key]出发get方法，让dep为当前key记录watcher
		this.oldValue = vm[key];
		// 清空Dep.target 当值重复记录
		Dep.target = null;
	}
	
	update() {
		const newVal = this.vm[this.key];
		if(newVal === this.oldValue) {
			return;
		}
		this.cb(newVal)
	}
}