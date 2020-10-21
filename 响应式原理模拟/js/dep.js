class Dep {
	constructor() {
		// 收集所有依赖着
		this.subs = [];
	}
	
	// 添加观察者
	addSubs(sub) {
		console.log(666, sub)
		if(sub && sub.update) {
			this.subs.push(sub);
		}
	}
	
	// 通知观察者
	notify() {
		console.log(111, this.subs)
		this.subs.forEach(sub => {
			sub.update()
		})
	}
}