// const Gt06 = require('/Users/diego/gt06/gt06');
const Gt06 = require('/home/diegopereira/gt06/gt06');
const net = require('net');

var server = net.createServer((client) => {
  var gt06 = new Gt06();
  console.log('client connected');

  client.on('data', (data) => {
    try {
      gt06.parse(data);
    }
    catch (e) {
      console.log('err', e);
      return;
    }

    if (gt06.expectsResponse) {
      client.write(gt06.responseMsg);
    }

    gt06.msgBuffer.forEach(msg => {
      console.log(msg);
    });

    gt06.clearMsgBuffer();
  });
});

server.listen(3000, () => {
  console.log('started server on port:', 3000);
});
