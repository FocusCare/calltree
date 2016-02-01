var data = [{
    name: 't1',
    args: 'a=1',
    time: 1454308357980,
    percent: 30,
    children: [{
        name: 't2',
        args: 'a=2',
        time: 1454308357980,
        percent: 40,
        children: {
            name: 't3',
            args: 'a=3',
            time: 1454308357980,
            percent: 40,
        }
    }]
}, {
    name: 't4',
    args: 'a=1',
    time: 1454308357980,
    percent: 30,
    children: [{
        name: 't5',
        args: 'a=2',
        time: 1454308357980,
        percent: 40,
        children: {
            name: 't6',
            args: 'a=3',
            time: 1454308357980,
            percent: 40,
        }
    }]
}, {
    name: 't7',
    args: 'a=1',
    time: 1454308357980,
    percent: 0.5,
    children: [{
        name: 't8',
        args: 'a=2',
        time: 1454308357980,
        percent: 40,
        children: {
            name: 't9',
            args: 'a=3',
            time: 1454308357980,
            percent: 0.5,
        }
    }, {
        name: 't8',
        args: 'a=2',
        time: 1454308357980,
        percent: 40,
        children: {
            name: 't9',
            args: 'a=3',
            time: 1454308357980,
            percent: 0.5,
        }
    }]
}]


var config = [{
    key: 'name',
    head: '名称'
}, {
    key: 'time',
    head: '时间'
}, {
    key: 'percent',
    head: '百分比',
    render: 'progress'
}, {
    key: 'time',
    head: '开始时间',
    render: 'ms'
}]
new window.callTree(data, config)
