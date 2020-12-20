const { datetime } = require('../tools/util')

class BaseReply {
  constructor (option) {
    option = {...option, datetime: datetime(), result: ('result' in option) ? option.result : null}
    for (var key in option) { this[key] = option[key] }
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
