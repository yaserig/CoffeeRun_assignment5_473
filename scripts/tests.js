QUnit.test('hello test', function(assert) {
    assert.ok(1 == '1', 'Passed!');
});

var App = window.App; /* to fix the App not defined eslint error even though it works fine .. */
var Truck = App.Truck;

QUnit.test('First test figure 8.10', function(assert) {
    var ds = new App.DataStore();
    console.log('ds dataStore object is created');
    ds.add('m@bond.com', 'tea');
    ds.add('james@bond.com', 'eshpressho');
    console.log('data sets added to ds');
    console.log(ds.getAll());
    assert.ok(ds.data, 'Passed: Object ds created');
    /* how to test add function? is it just checking what's added? get all? */
    assert.deepEqual(ds.getAll(), {
        'm@bond.com': 'tea',
        'james@bond.com': 'eshpressho'
    }, 'Passed: orders added and then returned by getAll');

    ds.remove('james@bond.com');
    console.log('remove james@bond.com object');
    assert.deepEqual(ds.getAll(), {
        'm@bond.com': 'tea'
    }, 'Passed: james@bond.com object removed');

    console.log('order for m@bond.com : ', ds.get('m@bond.com'));
    assert.equal(ds.get('m@bond.com'), 'tea', 'Passed: tea order for m@bond reterived correctly');

    console.log('order for james@bond.com : ', ds.get('james@bond.com'));
    assert.equal(ds.get('james@bond.com'), undefined, 'Passed: undefined order for james@bond.com since it was removed');
});

QUnit.test('Second test figure 8.32', function(assert) {
    var myTruck = new App.Truck('ncc-1701', new App.DataStore());


    console.log('creating orders ...');
    myTruck.createOrder({
        emailAddress: 'me@goldfinger.com',
        coffee: 'double mocha'
    });

    myTruck.createOrder({
        emailAddress: 'dr@no.com',
        coffee: 'decaf'
    });

    myTruck.createOrder({
        emailAddress: 'm@bond.com',
        coffee: 'earl grey'
    });

    console.log('orders created, printing them ... ', myTruck.printOrders());


    assert.deepEqual(myTruck.getAllOrders(), {

        'me@goldfinger.com': {
            coffee: 'double mocha',
            emailAddress: 'me@goldfinger.com'
        },
        'dr@no.com': {
            coffee: 'decaf',
            emailAddress: 'dr@no.com'
        },
        'm@bond.com': {
            coffee: 'earl grey',
            emailAddress: 'm@bond.com'
        }

    }, 'Passed: orders added and then returned/printed by getAllOrders');

    console.log('removing dr@no.com..');
    myTruck.deliverOrder('dr@no.com');

    assert.deepEqual(myTruck.getAllOrders(), {

        'me@goldfinger.com': {
            coffee: 'double mocha',
            emailAddress: 'me@goldfinger.com'
        },
        'm@bond.com': {
            coffee: 'earl grey',
            emailAddress: 'm@bond.com'
        }

    }, 'Passed: dr@no.com order removed');


});
