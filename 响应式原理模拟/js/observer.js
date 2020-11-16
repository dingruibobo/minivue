class Observer {
	constructor(data) {
		this.walk(data);
	}
	
	walk(data) {
		// 判断 data 是否是对象
		if(!data || typeof data !== 'object') {
			return;
		}
		// 遍历 data 对象
		Object.keys(data).forEach(key => {
			// defineReactive 为什么要将data[key]传递过去呢？若不传递data[key] 则在get 时要 return data[key], 但是 data[key] 又会调用get方法，则形成死递归；
			this.defineReactive(data, key, data[key])
		})
	}
	
	
	defineReactive(data, key, val) {
		let that = this;
		// dep 负责收集依赖，并发送通知
		let dep = new Dep()
		
		// 若val是对象，将val内部属性转换成响应式数据
		this.walk(val)
		Object.defineProperty(data, key, {
			enumerable : true,
			configurable: true,
			get() {
				// 收集依赖
				Dep.target && dep.addSubs(Dep.target);
				// return data[key];  
				return val;
			},
			set(newVal) {
				if(newVal === val) {
					return;
				}
				val = newVal;
				// 若将val 设置成了对象，则将对象转换成响应式数据
				that.walk(newVal);
				// 发送通知
				dep.notify();
			}
		})
		
	}
	
	
}