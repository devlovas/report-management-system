const { datetime } = require('../tools/util')

class BaseReply {
  constructor ({err_code, message, result}) {
    this.err_code = err_code;
    this.message = message;
    this.datetime = datetime();
    this.result = result;
  }
}

class SuccessReply extends BaseReply{
  constructor (option) { super(option) }
}

class WarningReply extends BaseReply{
  constructor (option) { super(option) }
}

class ErrorReply extends BaseReply{
  constructor (option) { super(option) }
}

module.exports = { 
  SuccessReply, 
  WarningReply, 
  ErrorReply 
}
