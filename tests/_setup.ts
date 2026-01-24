import test from "ava";
import nock from "nock";

test.before(() => {
	nock.disableNetConnect();
	nock.enableNetConnect("::");
});

test.after.always((t) => {
	nock.enableNetConnect();
	t.true(nock.isDone());
});
