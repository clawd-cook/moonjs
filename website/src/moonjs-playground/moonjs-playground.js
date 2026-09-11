const $reinterpret_view = new DataView(new ArrayBuffer(8));
function $i64_reinterpret_f64(a) {
  $reinterpret_view.setBigUint64(0, BigInt.asUintN(64, a), false);
  return $reinterpret_view.getFloat64(0, false);
}
function _M0TPC28internal7strconv9FloatInfo(param0, param1, param2) {
  this.mantissa_bits = param0;
  this.exponent_bits = param1;
  this.bias = param2;
}
function _M0DTP46heyq026moonjs3src6parser9BinOpKind8BinOpTag(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src6parser9BinOpKind8BinOpTag.prototype.$tag = 0;
function _M0DTP46heyq026moonjs3src6parser9BinOpKind8LogOpTag(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src6parser9BinOpKind8LogOpTag.prototype.$tag = 1;
function _M0TP46heyq026moonjs3cmd19moonjs_2dplayground9StdoutBuf(param0) {
  this.contents = param0;
}
function _M0DTP46heyq026moonjs3src5value7JSValue9Undefined() {}
_M0DTP46heyq026moonjs3src5value7JSValue9Undefined.prototype.$tag = 0;
const _M0DTP46heyq026moonjs3src5value7JSValue9Undefined__ = new _M0DTP46heyq026moonjs3src5value7JSValue9Undefined();
function _M0DTP46heyq026moonjs3src5value7JSValue4Null() {}
_M0DTP46heyq026moonjs3src5value7JSValue4Null.prototype.$tag = 1;
const _M0DTP46heyq026moonjs3src5value7JSValue4Null__ = new _M0DTP46heyq026moonjs3src5value7JSValue4Null();
function _M0DTP46heyq026moonjs3src5value7JSValue4Bool(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src5value7JSValue4Bool.prototype.$tag = 2;
function _M0DTP46heyq026moonjs3src5value7JSValue5Int32(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src5value7JSValue5Int32.prototype.$tag = 3;
function _M0DTP46heyq026moonjs3src5value7JSValue6Number(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src5value7JSValue6Number.prototype.$tag = 4;
function _M0DTP46heyq026moonjs3src5value7JSValue3Str(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src5value7JSValue3Str.prototype.$tag = 5;
function _M0DTP46heyq026moonjs3src5value7JSValue6Object(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src5value7JSValue6Object.prototype.$tag = 6;
function _M0DTP46heyq026moonjs3src5value7JSValue8Function(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src5value7JSValue8Function.prototype.$tag = 7;
function _M0DTP46heyq026moonjs3src5value7JSValue8NativeFn(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src5value7JSValue8NativeFn.prototype.$tag = 8;
function _M0DTPC16result6ResultGbsE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGbsE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGbsE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGbsE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValuesE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValuesE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValuesE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValuesE2Ok.prototype.$tag = 1;
function _M0DTP46heyq026moonjs3src3ast8ExprKind11Undefined__() {}
_M0DTP46heyq026moonjs3src3ast8ExprKind11Undefined__.prototype.$tag = 0;
function _M0DTP46heyq026moonjs3src3ast8ExprKind6Null__() {}
_M0DTP46heyq026moonjs3src3ast8ExprKind6Null__.prototype.$tag = 1;
const _M0DTP46heyq026moonjs3src3ast8ExprKind6Null____ = new _M0DTP46heyq026moonjs3src3ast8ExprKind6Null__();
function _M0DTP46heyq026moonjs3src3ast8ExprKind9Boolean__(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src3ast8ExprKind9Boolean__.prototype.$tag = 2;
function _M0DTP46heyq026moonjs3src3ast8ExprKind9NumberLit(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src3ast8ExprKind9NumberLit.prototype.$tag = 3;
function _M0DTP46heyq026moonjs3src3ast8ExprKind9StringLit(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src3ast8ExprKind9StringLit.prototype.$tag = 4;
function _M0DTP46heyq026moonjs3src3ast8ExprKind11TemplateLit(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP46heyq026moonjs3src3ast8ExprKind11TemplateLit.prototype.$tag = 5;
function _M0DTP46heyq026moonjs3src3ast8ExprKind9RegExpLit(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP46heyq026moonjs3src3ast8ExprKind9RegExpLit.prototype.$tag = 6;
function _M0DTP46heyq026moonjs3src3ast8ExprKind10Identifier(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src3ast8ExprKind10Identifier.prototype.$tag = 7;
function _M0DTP46heyq026moonjs3src3ast8ExprKind6This__() {}
_M0DTP46heyq026moonjs3src3ast8ExprKind6This__.prototype.$tag = 8;
const _M0DTP46heyq026moonjs3src3ast8ExprKind6This____ = new _M0DTP46heyq026moonjs3src3ast8ExprKind6This__();
function _M0DTP46heyq026moonjs3src3ast8ExprKind7Super__() {}
_M0DTP46heyq026moonjs3src3ast8ExprKind7Super__.prototype.$tag = 9;
function _M0DTP46heyq026moonjs3src3ast8ExprKind6Binary(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
_M0DTP46heyq026moonjs3src3ast8ExprKind6Binary.prototype.$tag = 10;
function _M0DTP46heyq026moonjs3src3ast8ExprKind7Logical(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
_M0DTP46heyq026moonjs3src3ast8ExprKind7Logical.prototype.$tag = 11;
function _M0DTP46heyq026moonjs3src3ast8ExprKind5Unary(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
_M0DTP46heyq026moonjs3src3ast8ExprKind5Unary.prototype.$tag = 12;
function _M0DTP46heyq026moonjs3src3ast8ExprKind6Update(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
_M0DTP46heyq026moonjs3src3ast8ExprKind6Update.prototype.$tag = 13;
function _M0DTP46heyq026moonjs3src3ast8ExprKind6Assign(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
_M0DTP46heyq026moonjs3src3ast8ExprKind6Assign.prototype.$tag = 14;
function _M0DTP46heyq026moonjs3src3ast8ExprKind4Cond(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
_M0DTP46heyq026moonjs3src3ast8ExprKind4Cond.prototype.$tag = 15;
function _M0DTP46heyq026moonjs3src3ast8ExprKind6Member(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP46heyq026moonjs3src3ast8ExprKind6Member.prototype.$tag = 16;
function _M0DTP46heyq026moonjs3src3ast8ExprKind11IndexAccess(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP46heyq026moonjs3src3ast8ExprKind11IndexAccess.prototype.$tag = 17;
function _M0DTP46heyq026moonjs3src3ast8ExprKind14OptionalMember(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
_M0DTP46heyq026moonjs3src3ast8ExprKind14OptionalMember.prototype.$tag = 18;
function _M0DTP46heyq026moonjs3src3ast8ExprKind13OptionalIndex(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
_M0DTP46heyq026moonjs3src3ast8ExprKind13OptionalIndex.prototype.$tag = 19;
function _M0DTP46heyq026moonjs3src3ast8ExprKind12OptionalCall(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
_M0DTP46heyq026moonjs3src3ast8ExprKind12OptionalCall.prototype.$tag = 20;
function _M0DTP46heyq026moonjs3src3ast8ExprKind4Call(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP46heyq026moonjs3src3ast8ExprKind4Call.prototype.$tag = 21;
function _M0DTP46heyq026moonjs3src3ast8ExprKind3New(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP46heyq026moonjs3src3ast8ExprKind3New.prototype.$tag = 22;
function _M0DTP46heyq026moonjs3src3ast8ExprKind9ObjectLit(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src3ast8ExprKind9ObjectLit.prototype.$tag = 23;
function _M0DTP46heyq026moonjs3src3ast8ExprKind8ArrayLit(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src3ast8ExprKind8ArrayLit.prototype.$tag = 24;
function _M0DTP46heyq026moonjs3src3ast8ExprKind6FnExpr(param0, param1, param2, param3, param4) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
  this._3 = param3;
  this._4 = param4;
}
_M0DTP46heyq026moonjs3src3ast8ExprKind6FnExpr.prototype.$tag = 25;
function _M0DTP46heyq026moonjs3src3ast8ExprKind7ArrowFn(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
_M0DTP46heyq026moonjs3src3ast8ExprKind7ArrowFn.prototype.$tag = 26;
function _M0DTP46heyq026moonjs3src3ast8ExprKind9ClassExpr(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
_M0DTP46heyq026moonjs3src3ast8ExprKind9ClassExpr.prototype.$tag = 27;
function _M0DTP46heyq026moonjs3src3ast8ExprKind8Sequence(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src3ast8ExprKind8Sequence.prototype.$tag = 28;
function _M0DTP46heyq026moonjs3src3ast8ExprKind9YieldExpr(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP46heyq026moonjs3src3ast8ExprKind9YieldExpr.prototype.$tag = 29;
function _M0DTP46heyq026moonjs3src3ast8ExprKind9AwaitExpr(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src3ast8ExprKind9AwaitExpr.prototype.$tag = 30;
function _M0DTP46heyq026moonjs3src3ast8ExprKind14TaggedTemplate(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP46heyq026moonjs3src3ast8ExprKind14TaggedTemplate.prototype.$tag = 31;
function _M0TPB13StringBuilder(param0) {
  this.val = param0;
}
function _M0TPC16string10StringView(param0, param1, param2) {
  this.str = param0;
  this.start = param1;
  this.end = param2;
}
class $PanicError extends Error {}
function $panic() {
  throw new $PanicError();
}
const _M0FPB12random__seed = () => {
  if (globalThis.crypto?.getRandomValues) {
    const array = new Uint32Array(1);
    globalThis.crypto.getRandomValues(array);
    return array[0] | 0; // Convert to signed 32
  } else {
    return Math.floor(Math.random() * 0x100000000) | 0; // Fallback to Math.random
  }
};
const _M0FPB19int__to__string__js = (x, radix) => {
  return x.toString(radix);
};
const _M0FPB21int64__to__string__js = (num, radix) => BigInt.asIntN(64, num).toString(radix);
function $oob() {
  throw new Error("Index out of bounds");
}
function $makebytes(a, b) {
  const arr = new Uint8Array(a);
  if (b !== 0) {
    arr.fill(b);
  }
  return arr;
}
const _M0MPB7JSArray4push = (arr, val) => { arr.push(val); };
function $compare_int(a, b) {
  return (a >= b) - (a <= b);
}
const _M0MPC16double6Double8mod__ffi = (a, b) => (a % b);
const _M0MPB7JSArray3pop = (arr) => arr.pop();
function _M0DTPC16result6ResultGuRPB7FailureE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGuRPB7FailureE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGuRPB7FailureE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGuRPB7FailureE2Ok.prototype.$tag = 1;
function _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError.prototype.$tag = 3;
function _M0DTPC15error5Error51heyq02_2fmoonjs_2fsrc_2flexer_2eLexError_2eLexError(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTPC15error5Error51heyq02_2fmoonjs_2fsrc_2flexer_2eLexError_2eLexError.prototype.$tag = 2;
function _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError.prototype.$tag = 1;
function _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure(param0) {
  this._0 = param0;
}
_M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure.prototype.$tag = 0;
function _M0DTPC16result6ResultGdRPB7FailureE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGdRPB7FailureE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGdRPB7FailureE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGdRPB7FailureE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGORPC28internal7strconv6NumberRPB7FailureE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGORPC28internal7strconv6NumberRPB7FailureE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGORPC28internal7strconv6NumberRPB7FailureE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGORPC28internal7strconv6NumberRPB7FailureE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRPC16string10StringViewRPB7FailureE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPC16string10StringViewRPB7FailureE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPC16string10StringViewRPB7FailureE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPC16string10StringViewRPB7FailureE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGORPC28internal7strconv6NumberRPC15error5ErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGORPC28internal7strconv6NumberRPC15error5ErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGORPC28internal7strconv6NumberRPC15error5ErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGORPC28internal7strconv6NumberRPC15error5ErrorE2Ok.prototype.$tag = 1;
function _M0TPC28internal7strconv6Number(param0, param1, param2, param3) {
  this.exponent = param0;
  this.mantissa = param1;
  this.negative = param2;
  this.many_digits = param3;
}
function _M0DTPC16result6ResultGdRPC15error5ErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGdRPC15error5ErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGdRPC15error5ErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGdRPC15error5ErrorE2Ok.prototype.$tag = 1;
function $i64_clz(a) {
  a = BigInt.asUintN(64, a);
  if (a === 0n) return 64;
  const hi = Number(a >> 32n);
  if (hi !== 0) {
    return Math.clz32(hi);
  }
  return 32 + Math.clz32(Number(a & 0xffffffffn));
}
function _M0TPC28internal7strconv12EiselProduct(param0, param1) {
  this.lo = param0;
  this.hi = param1;
}
function _M0TPC28internal7strconv7Decimal(param0, param1, param2, param3, param4, param5) {
  this.digits = param0;
  this.digits_num = param1;
  this.decimal_point = param2;
  this.negative = param3;
  this.truncated = param4;
  this.overflowed = param5;
}
function _M0DTPC16result6ResultGRPC28internal7strconv7DecimalRPC15error5ErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPC28internal7strconv7DecimalRPC15error5ErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPC28internal7strconv7DecimalRPC15error5ErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPC28internal7strconv7DecimalRPC15error5ErrorE2Ok.prototype.$tag = 1;
function $f64_convert_i64_u(a) {
  return Number(a);
}
function _M0DTPC16option6OptionGdE4None() {}
_M0DTPC16option6OptionGdE4None.prototype.$tag = 0;
const _M0DTPC16option6OptionGdE4None__ = new _M0DTPC16option6OptionGdE4None();
function _M0DTPC16option6OptionGdE4Some(param0) {
  this._0 = param0;
}
_M0DTPC16option6OptionGdE4Some.prototype.$tag = 1;
function $make_array_len_and_init(a, b) {
  const arr = new Array(a);
  arr.fill(b);
  return arr;
}
function _M0TPC17hashmap7HashMapGsRP46heyq026moonjs3src5value8PropMetaE(param0, param1, param2, param3) {
  this.entries = param0;
  this.capacity = param1;
  this.capacity_mask = param2;
  this.size = param3;
}
function _M0TPC17hashmap5EntryGsRP46heyq026moonjs3src5value8PropMetaE(param0, param1, param2, param3) {
  this.psl = param0;
  this.hash = param1;
  this.key = param2;
  this.value = param3;
}
function _M0TP46heyq026moonjs3src4util9SourceLoc(param0, param1) {
  this.line = param0;
  this.col = param1;
}
function _M0TP46heyq026moonjs3src4util10SourceSpan(param0, param1) {
  this.start = param0;
  this.end = param1;
}
function _M0TP46heyq026moonjs3src5value8PropMeta(param0, param1) {
  this.slot_idx = param0;
  this.attrs = param1;
}
function _M0TP46heyq026moonjs3src5value5Shape(param0, param1) {
  this.props = param0;
  this.keys_ordered = param1;
}
function _M0TPB9ArrayViewGUsRP46heyq026moonjs3src5value8PropMetaEE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function _M0TP46heyq026moonjs3src5value6Object(param0, param1, param2, param3) {
  this.shape = param0;
  this.slots = param1;
  this.proto = param2;
  this.extensible = param3;
}
function _M0TP46heyq026moonjs3src5value14NativeFunction(param0, param1, param2, param3) {
  this.name = param0;
  this.is_constructor = param1;
  this.impl_ = param2;
  this.prototype = param3;
}
function _M0TP46heyq026moonjs3src5value7Upvalue(param0) {
  this.value = param0;
}
function _M0TP46heyq026moonjs3src5value8Function(param0, param1, param2, param3, param4) {
  this.chunk_id = param0;
  this.upvalues = param1;
  this.name = param2;
  this.is_constructor = param3;
  this.prototype = param4;
}
function _M0TP46heyq026moonjs3src5value11JSException(param0, param1) {
  this.value = param0;
  this.stack = param1;
}
function _M0TP46heyq026moonjs3src5value14StackFrameInfo(param0, param1, param2) {
  this.chunk_name = param0;
  this.filename = param1;
  this.loc = param2;
}
function _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11NativeErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11NativeErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11NativeErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11NativeErrorE2Ok.prototype.$tag = 1;
function _M0TP46heyq026moonjs3src8builtins8Builtins(param0, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11, param12, param13, param14, param15) {
  this.object_proto = param0;
  this.function_proto = param1;
  this.array_proto = param2;
  this.string_proto = param3;
  this.error_proto = param4;
  this.type_error_proto = param5;
  this.range_error_proto = param6;
  this.syntax_error_proto = param7;
  this.reference_error_proto = param8;
  this.object_ctor = param9;
  this.string_ctor = param10;
  this.error_ctor = param11;
  this.type_error_ctor = param12;
  this.range_error_ctor = param13;
  this.syntax_error_ctor = param14;
  this.reference_error_ctor = param15;
}
function _M0TP46heyq026moonjs3src8bytecode15UpvalueSlotDecl(param0, param1) {
  this.from_kind = param0;
  this.from_idx = param1;
}
function _M0TP46heyq026moonjs3src8bytecode12DecodedInstr(param0, param1, param2, param3) {
  this.op = param0;
  this.a = param1;
  this.b = param2;
  this.c = param3;
}
function _M0TP46heyq026moonjs3src8bytecode5Chunk(param0, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10) {
  this.code = param0;
  this.const_pool = param1;
  this.source_locs = param2;
  this.name = param3;
  this.filename = param4;
  this.param_count = param5;
  this.local_count = param6;
  this.upvalue_slots = param7;
  this.nested_chunks = param8;
  this.is_strict = param9;
  this.self_binding_slot = param10;
}
function _M0TP46heyq026moonjs3src3ast4Stmt(param0, param1) {
  this.span = param0;
  this.kind = param1;
}
function _M0TP46heyq026moonjs3src3ast13VarDeclarator(param0, param1) {
  this.pat = param0;
  this.init = param1;
}
function _M0TP46heyq026moonjs3src3ast11CatchClause(param0, param1) {
  this.param = param0;
  this.body = param1;
}
function _M0TP46heyq026moonjs3src3ast5Block(param0) {
  this.body = param0;
}
function _M0TP46heyq026moonjs3src3ast7Pattern(param0, param1) {
  this.span = param0;
  this.kind = param1;
}
function _M0TP46heyq026moonjs3src3ast7Program(param0, param1) {
  this.body = param0;
  this.is_module = param1;
}
function _M0TP46heyq026moonjs3src3ast4Expr(param0, param1) {
  this.span = param0;
  this.kind = param1;
}
function _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok.prototype.$tag = 1;
function _M0DTP46heyq026moonjs3src8compiler10Resolution8RefLocal(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src8compiler10Resolution8RefLocal.prototype.$tag = 0;
function _M0DTP46heyq026moonjs3src8compiler10Resolution10RefUpvalue(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src8compiler10Resolution10RefUpvalue.prototype.$tag = 1;
function _M0DTP46heyq026moonjs3src8compiler10Resolution9RefGlobal() {}
_M0DTP46heyq026moonjs3src8compiler10Resolution9RefGlobal.prototype.$tag = 2;
const _M0DTP46heyq026moonjs3src8compiler10Resolution9RefGlobal__ = new _M0DTP46heyq026moonjs3src8compiler10Resolution9RefGlobal();
function _M0TP46heyq026moonjs3src8compiler9LocalDecl(param0, param1) {
  this.name = param0;
  this.slot = param1;
}
function _M0TP46heyq026moonjs3src8compiler16FunctionCompiler(param0, param1, param2, param3, param4, param5, param6) {
  this.chunk = param0;
  this.locals = param1;
  this.upvalue_names = param2;
  this.scope_depth = param3;
  this.loop_stack = param4;
  this.label_stack = param5;
  this.is_top_level = param6;
}
function _M0TP46heyq026moonjs3src8compiler9LoopFrame(param0, param1, param2) {
  this.break_patches = param0;
  this.continue_patches = param1;
  this.label = param2;
}
function _M0DTPC16result6ResultGiRP46heyq026moonjs3src8compiler12CompileErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGiRP46heyq026moonjs3src8compiler12CompileErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGiRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGiRP46heyq026moonjs3src8compiler12CompileErrorE2Ok.prototype.$tag = 1;
function _M0TP46heyq026moonjs3src8compiler10LabelFrame(param0, param1, param2) {
  this.name = param0;
  this.break_patches = param1;
  this.is_loop = param2;
}
function _M0TP46heyq026moonjs3src8compiler8Compiler(param0) {
  this.fn_stack = param0;
}
function _M0DTPC16result6ResultGRP46heyq026moonjs3src8bytecode5ChunkRP46heyq026moonjs3src8compiler12CompileErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP46heyq026moonjs3src8bytecode5ChunkRP46heyq026moonjs3src8compiler12CompileErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP46heyq026moonjs3src8bytecode5ChunkRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP46heyq026moonjs3src8bytecode5ChunkRP46heyq026moonjs3src8compiler12CompileErrorE2Ok.prototype.$tag = 1;
function _M0TP46heyq026moonjs3src5lexer5Token(param0, param1) {
  this.kind = param0;
  this.span = param1;
}
function _M0DTPC16result6ResultGuRP46heyq026moonjs3src5lexer8LexErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGuRP46heyq026moonjs3src5lexer8LexErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGuRP46heyq026moonjs3src5lexer8LexErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGuRP46heyq026moonjs3src5lexer8LexErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGiRP46heyq026moonjs3src5lexer8LexErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGiRP46heyq026moonjs3src5lexer8LexErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGiRP46heyq026moonjs3src5lexer8LexErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGiRP46heyq026moonjs3src5lexer8LexErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGOsRP46heyq026moonjs3src5lexer8LexErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGOsRP46heyq026moonjs3src5lexer8LexErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGOsRP46heyq026moonjs3src5lexer8LexErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGOsRP46heyq026moonjs3src5lexer8LexErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok.prototype.$tag = 1;
function _M0DTP46heyq026moonjs3src5lexer9TokenKind9NumberTok(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP46heyq026moonjs3src5lexer9TokenKind9NumberTok.prototype.$tag = 0;
function _M0DTP46heyq026moonjs3src5lexer9TokenKind9StringTok(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src5lexer9TokenKind9StringTok.prototype.$tag = 1;
function _M0DTP46heyq026moonjs3src5lexer9TokenKind15TemplateHeadTok(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP46heyq026moonjs3src5lexer9TokenKind15TemplateHeadTok.prototype.$tag = 2;
function _M0DTP46heyq026moonjs3src5lexer9TokenKind17TemplateMiddleTok(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP46heyq026moonjs3src5lexer9TokenKind17TemplateMiddleTok.prototype.$tag = 3;
function _M0DTP46heyq026moonjs3src5lexer9TokenKind15TemplateTailTok(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP46heyq026moonjs3src5lexer9TokenKind15TemplateTailTok.prototype.$tag = 4;
function _M0DTP46heyq026moonjs3src5lexer9TokenKind16TemplateNoSubTok(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP46heyq026moonjs3src5lexer9TokenKind16TemplateNoSubTok.prototype.$tag = 5;
function _M0DTP46heyq026moonjs3src5lexer9TokenKind9RegExpTok(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP46heyq026moonjs3src5lexer9TokenKind9RegExpTok.prototype.$tag = 6;
function _M0DTP46heyq026moonjs3src5lexer9TokenKind13IdentifierTok(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src5lexer9TokenKind13IdentifierTok.prototype.$tag = 7;
function _M0DTP46heyq026moonjs3src5lexer9TokenKind10KeywordTok(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src5lexer9TokenKind10KeywordTok.prototype.$tag = 8;
function _M0DTP46heyq026moonjs3src5lexer9TokenKind15PrivateIdentTok(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src5lexer9TokenKind15PrivateIdentTok.prototype.$tag = 9;
function _M0DTP46heyq026moonjs3src5lexer9TokenKind6LParen() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind6LParen.prototype.$tag = 10;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind6LParen__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind6LParen();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind6RParen() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind6RParen.prototype.$tag = 11;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind6RParen__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind6RParen();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind6LBrace() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind6LBrace.prototype.$tag = 12;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind6LBrace__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind6LBrace();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind6RBrace() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind6RBrace.prototype.$tag = 13;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind6RBrace__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind6RBrace();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind8LBracket() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind8LBracket.prototype.$tag = 14;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind8LBracket__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind8LBracket();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind8RBracket() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind8RBracket.prototype.$tag = 15;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind8RBracket__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind8RBracket();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind5Comma() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind5Comma.prototype.$tag = 16;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind5Comma__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind5Comma();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind4Semi() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind4Semi.prototype.$tag = 17;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind4Semi__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind4Semi();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind5Colon() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind5Colon.prototype.$tag = 18;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind5Colon__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind5Colon();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind3Dot() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind3Dot.prototype.$tag = 19;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind3Dot__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind3Dot();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind8Ellipsis() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind8Ellipsis.prototype.$tag = 20;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind8Ellipsis__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind8Ellipsis();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind8Question() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind8Question.prototype.$tag = 21;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind8Question__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind8Question();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind11QuestionDot() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind11QuestionDot.prototype.$tag = 22;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind11QuestionDot__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind11QuestionDot();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind16QuestionQuestion() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind16QuestionQuestion.prototype.$tag = 23;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind16QuestionQuestion__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind16QuestionQuestion();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind5Arrow() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind5Arrow.prototype.$tag = 24;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind5Arrow__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind5Arrow();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind4Plus() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind4Plus.prototype.$tag = 25;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind4Plus__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind4Plus();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind5Minus() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind5Minus.prototype.$tag = 26;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind5Minus__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind5Minus();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind4Star() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind4Star.prototype.$tag = 27;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind4Star__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind4Star();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind8StarStar() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind8StarStar.prototype.$tag = 28;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind8StarStar__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind8StarStar();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind5Slash() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind5Slash.prototype.$tag = 29;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind5Slash__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind5Slash();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind7Percent() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind7Percent.prototype.$tag = 30;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind7Percent__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind7Percent();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind3Amp() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind3Amp.prototype.$tag = 31;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind3Amp__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind3Amp();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind4Pipe() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind4Pipe.prototype.$tag = 32;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind4Pipe__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind4Pipe();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind5Caret() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind5Caret.prototype.$tag = 33;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind5Caret__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind5Caret();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind5Tilde() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind5Tilde.prototype.$tag = 34;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind5Tilde__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind5Tilde();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind4Bang() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind4Bang.prototype.$tag = 35;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind4Bang__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind4Bang();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind2Lt() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind2Lt.prototype.$tag = 36;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind2Lt__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind2Lt();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind2Gt() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind2Gt.prototype.$tag = 37;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind2Gt__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind2Gt();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind4LtEq() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind4LtEq.prototype.$tag = 38;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind4LtEq__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind4LtEq();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind4GtEq() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind4GtEq.prototype.$tag = 39;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind4GtEq__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind4GtEq();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind4EqEq() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind4EqEq.prototype.$tag = 40;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind4EqEq__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind4EqEq();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind6EqEqEq() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind6EqEqEq.prototype.$tag = 41;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind6EqEqEq__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind6EqEqEq();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind6BangEq() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind6BangEq.prototype.$tag = 42;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind6BangEq__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind6BangEq();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind8BangEqEq() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind8BangEqEq.prototype.$tag = 43;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind8BangEqEq__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind8BangEqEq();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind5EqTok() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind5EqTok.prototype.$tag = 44;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind5EqTok__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind5EqTok();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind6PlusEq() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind6PlusEq.prototype.$tag = 45;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind6PlusEq__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind6PlusEq();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind7MinusEq() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind7MinusEq.prototype.$tag = 46;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind7MinusEq__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind7MinusEq();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind6StarEq() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind6StarEq.prototype.$tag = 47;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind6StarEq__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind6StarEq();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind7SlashEq() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind7SlashEq.prototype.$tag = 48;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind7SlashEq__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind7SlashEq();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind9PercentEq() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind9PercentEq.prototype.$tag = 49;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind9PercentEq__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind9PercentEq();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind10StarStarEq() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind10StarStarEq.prototype.$tag = 50;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind10StarStarEq__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind10StarStarEq();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind6LtLtEq() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind6LtLtEq.prototype.$tag = 51;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind6LtLtEq__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind6LtLtEq();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind6GtGtEq() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind6GtGtEq.prototype.$tag = 52;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind6GtGtEq__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind6GtGtEq();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind8GtGtGtEq() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind8GtGtGtEq.prototype.$tag = 53;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind8GtGtGtEq__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind8GtGtGtEq();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind5AmpEq() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind5AmpEq.prototype.$tag = 54;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind5AmpEq__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind5AmpEq();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind6PipeEq() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind6PipeEq.prototype.$tag = 55;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind6PipeEq__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind6PipeEq();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind7CaretEq() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind7CaretEq.prototype.$tag = 56;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind7CaretEq__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind7CaretEq();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind6AmpAmp() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind6AmpAmp.prototype.$tag = 57;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind6AmpAmp__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind6AmpAmp();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind8PipePipe() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind8PipePipe.prototype.$tag = 58;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind8PipePipe__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind8PipePipe();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind8AmpAmpEq() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind8AmpAmpEq.prototype.$tag = 59;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind8AmpAmpEq__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind8AmpAmpEq();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind10PipePipeEq() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind10PipePipeEq.prototype.$tag = 60;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind10PipePipeEq__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind10PipePipeEq();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind18QuestionQuestionEq() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind18QuestionQuestionEq.prototype.$tag = 61;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind18QuestionQuestionEq__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind18QuestionQuestionEq();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind4LtLt() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind4LtLt.prototype.$tag = 62;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind4LtLt__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind4LtLt();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind4GtGt() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind4GtGt.prototype.$tag = 63;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind4GtGt__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind4GtGt();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind6GtGtGt() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind6GtGtGt.prototype.$tag = 64;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind6GtGtGt__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind6GtGtGt();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind8PlusPlus() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind8PlusPlus.prototype.$tag = 65;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind8PlusPlus__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind8PlusPlus();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind10MinusMinus() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind10MinusMinus.prototype.$tag = 66;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind10MinusMinus__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind10MinusMinus();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind2At() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind2At.prototype.$tag = 67;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind2At__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind2At();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind4Hash() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind4Hash.prototype.$tag = 68;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind4Hash__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind4Hash();
function _M0DTP46heyq026moonjs3src5lexer9TokenKind3Eof() {}
_M0DTP46heyq026moonjs3src5lexer9TokenKind3Eof.prototype.$tag = 69;
const _M0DTP46heyq026moonjs3src5lexer9TokenKind3Eof__ = new _M0DTP46heyq026moonjs3src5lexer9TokenKind3Eof();
function _M0TP46heyq026moonjs3src5lexer11TemplateCtx(param0) {
  this.brace_depth = param0;
}
function _M0TP46heyq026moonjs3src5lexer5Lexer(param0, param1, param2, param3, param4, param5) {
  this.source = param0;
  this.pos = param1;
  this.line = param2;
  this.line_start = param3;
  this.filename = param4;
  this.template_states = param5;
}
function _M0DTPC16result6ResultGOcRP46heyq026moonjs3src5lexer8LexErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGOcRP46heyq026moonjs3src5lexer8LexErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGOcRP46heyq026moonjs3src5lexer8LexErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGOcRP46heyq026moonjs3src5lexer8LexErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGsRP46heyq026moonjs3src5lexer8LexErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGsRP46heyq026moonjs3src5lexer8LexErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGsRP46heyq026moonjs3src5lexer8LexErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGsRP46heyq026moonjs3src5lexer8LexErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE2Ok.prototype.$tag = 1;
function _M0DTP46heyq026moonjs3src3ast8StmtKind9BlockStmt(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src3ast8StmtKind9BlockStmt.prototype.$tag = 0;
function _M0DTP46heyq026moonjs3src3ast8StmtKind8ExprStmt(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src3ast8StmtKind8ExprStmt.prototype.$tag = 1;
function _M0DTP46heyq026moonjs3src3ast8StmtKind2If(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
_M0DTP46heyq026moonjs3src3ast8StmtKind2If.prototype.$tag = 2;
function _M0DTP46heyq026moonjs3src3ast8StmtKind5While(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP46heyq026moonjs3src3ast8StmtKind5While.prototype.$tag = 3;
function _M0DTP46heyq026moonjs3src3ast8StmtKind7DoWhile(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP46heyq026moonjs3src3ast8StmtKind7DoWhile.prototype.$tag = 4;
function _M0DTP46heyq026moonjs3src3ast8StmtKind3For(param0, param1, param2, param3) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
  this._3 = param3;
}
_M0DTP46heyq026moonjs3src3ast8StmtKind3For.prototype.$tag = 5;
function _M0DTP46heyq026moonjs3src3ast8StmtKind5ForIn(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
_M0DTP46heyq026moonjs3src3ast8StmtKind5ForIn.prototype.$tag = 6;
function _M0DTP46heyq026moonjs3src3ast8StmtKind5ForOf(param0, param1, param2, param3) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
  this._3 = param3;
}
_M0DTP46heyq026moonjs3src3ast8StmtKind5ForOf.prototype.$tag = 7;
function _M0DTP46heyq026moonjs3src3ast8StmtKind6Switch(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP46heyq026moonjs3src3ast8StmtKind6Switch.prototype.$tag = 8;
function _M0DTP46heyq026moonjs3src3ast8StmtKind5Break(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src3ast8StmtKind5Break.prototype.$tag = 9;
function _M0DTP46heyq026moonjs3src3ast8StmtKind8Continue(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src3ast8StmtKind8Continue.prototype.$tag = 10;
function _M0DTP46heyq026moonjs3src3ast8StmtKind6Return(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src3ast8StmtKind6Return.prototype.$tag = 11;
function _M0DTP46heyq026moonjs3src3ast8StmtKind5Throw(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src3ast8StmtKind5Throw.prototype.$tag = 12;
function _M0DTP46heyq026moonjs3src3ast8StmtKind3Try(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
_M0DTP46heyq026moonjs3src3ast8StmtKind3Try.prototype.$tag = 13;
function _M0DTP46heyq026moonjs3src3ast8StmtKind7Labeled(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP46heyq026moonjs3src3ast8StmtKind7Labeled.prototype.$tag = 14;
function _M0DTP46heyq026moonjs3src3ast8StmtKind7VarDecl(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP46heyq026moonjs3src3ast8StmtKind7VarDecl.prototype.$tag = 15;
function _M0DTP46heyq026moonjs3src3ast8StmtKind12FunctionDecl(param0, param1, param2, param3, param4) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
  this._3 = param3;
  this._4 = param4;
}
_M0DTP46heyq026moonjs3src3ast8StmtKind12FunctionDecl.prototype.$tag = 16;
function _M0DTP46heyq026moonjs3src3ast8StmtKind9ClassDecl(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
_M0DTP46heyq026moonjs3src3ast8StmtKind9ClassDecl.prototype.$tag = 17;
function _M0DTP46heyq026moonjs3src3ast8StmtKind5Empty() {}
_M0DTP46heyq026moonjs3src3ast8StmtKind5Empty.prototype.$tag = 18;
const _M0DTP46heyq026moonjs3src3ast8StmtKind5Empty__ = new _M0DTP46heyq026moonjs3src3ast8StmtKind5Empty();
function _M0DTP46heyq026moonjs3src3ast8StmtKind4With(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP46heyq026moonjs3src3ast8StmtKind4With.prototype.$tag = 19;
function _M0DTP46heyq026moonjs3src3ast8StmtKind14ImportDeclStmt(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src3ast8StmtKind14ImportDeclStmt.prototype.$tag = 20;
function _M0DTP46heyq026moonjs3src3ast8StmtKind14ExportDeclStmt(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src3ast8StmtKind14ExportDeclStmt.prototype.$tag = 21;
function _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGsRP46heyq026moonjs3src6parser10ParseErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGsRP46heyq026moonjs3src6parser10ParseErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGsRP46heyq026moonjs3src6parser10ParseErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGsRP46heyq026moonjs3src6parser10ParseErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRPB5ArrayGRP46heyq026moonjs3src3ast7PatternERP46heyq026moonjs3src6parser10ParseErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB5ArrayGRP46heyq026moonjs3src3ast7PatternERP46heyq026moonjs3src6parser10ParseErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPB5ArrayGRP46heyq026moonjs3src3ast7PatternERP46heyq026moonjs3src6parser10ParseErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB5ArrayGRP46heyq026moonjs3src3ast7PatternERP46heyq026moonjs3src6parser10ParseErrorE2Ok.prototype.$tag = 1;
function _M0DTP46heyq026moonjs3src3ast11PatternKind8IdentPat(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src3ast11PatternKind8IdentPat.prototype.$tag = 0;
function _M0DTP46heyq026moonjs3src3ast11PatternKind9ObjectPat(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP46heyq026moonjs3src3ast11PatternKind9ObjectPat.prototype.$tag = 1;
function _M0DTP46heyq026moonjs3src3ast11PatternKind8ArrayPat(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP46heyq026moonjs3src3ast11PatternKind8ArrayPat.prototype.$tag = 2;
function _M0DTP46heyq026moonjs3src3ast11PatternKind9AssignPat(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP46heyq026moonjs3src3ast11PatternKind9AssignPat.prototype.$tag = 3;
function _M0DTPC16result6ResultGRPB5ArrayGRP46heyq026moonjs3src3ast8ArgumentERP46heyq026moonjs3src6parser10ParseErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB5ArrayGRP46heyq026moonjs3src3ast8ArgumentERP46heyq026moonjs3src6parser10ParseErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPB5ArrayGRP46heyq026moonjs3src3ast8ArgumentERP46heyq026moonjs3src6parser10ParseErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB5ArrayGRP46heyq026moonjs3src3ast8ArgumentERP46heyq026moonjs3src6parser10ParseErrorE2Ok.prototype.$tag = 1;
function _M0DTP46heyq026moonjs3src3ast8Argument7ArgExpr(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src3ast8Argument7ArgExpr.prototype.$tag = 0;
function _M0DTP46heyq026moonjs3src3ast8Argument9ArgSpread(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src3ast8Argument9ArgSpread.prototype.$tag = 1;
function _M0DTP46heyq026moonjs3src3ast12ArrayElement4Hole() {}
_M0DTP46heyq026moonjs3src3ast12ArrayElement4Hole.prototype.$tag = 0;
const _M0DTP46heyq026moonjs3src3ast12ArrayElement4Hole__ = new _M0DTP46heyq026moonjs3src3ast12ArrayElement4Hole();
function _M0DTP46heyq026moonjs3src3ast12ArrayElement4Item(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src3ast12ArrayElement4Item.prototype.$tag = 1;
function _M0DTP46heyq026moonjs3src3ast12ArrayElement18ArrayElementSpread(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src3ast12ArrayElement18ArrayElementSpread.prototype.$tag = 2;
function _M0DTPC16result6ResultGRPB5ArrayGRP46heyq026moonjs3src3ast4StmtERP46heyq026moonjs3src6parser10ParseErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB5ArrayGRP46heyq026moonjs3src3ast4StmtERP46heyq026moonjs3src6parser10ParseErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPB5ArrayGRP46heyq026moonjs3src3ast4StmtERP46heyq026moonjs3src6parser10ParseErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB5ArrayGRP46heyq026moonjs3src3ast4StmtERP46heyq026moonjs3src6parser10ParseErrorE2Ok.prototype.$tag = 1;
function _M0DTP46heyq026moonjs3src3ast11PropertyKey5IdKey(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src3ast11PropertyKey5IdKey.prototype.$tag = 0;
function _M0DTP46heyq026moonjs3src3ast11PropertyKey9StringKey(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src3ast11PropertyKey9StringKey.prototype.$tag = 1;
function _M0DTP46heyq026moonjs3src3ast11PropertyKey9NumberKey(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src3ast11PropertyKey9NumberKey.prototype.$tag = 2;
function _M0DTP46heyq026moonjs3src3ast11PropertyKey11ComputedKey(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src3ast11PropertyKey11ComputedKey.prototype.$tag = 3;
function _M0DTP46heyq026moonjs3src3ast11PropertyKey10PrivateKey(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src3ast11PropertyKey10PrivateKey.prototype.$tag = 4;
function _M0DTP46heyq026moonjs3src3ast14ObjectProperty8KeyValue(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
_M0DTP46heyq026moonjs3src3ast14ObjectProperty8KeyValue.prototype.$tag = 0;
function _M0DTP46heyq026moonjs3src3ast14ObjectProperty15MethodShorthand(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP46heyq026moonjs3src3ast14ObjectProperty15MethodShorthand.prototype.$tag = 1;
function _M0DTP46heyq026moonjs3src3ast14ObjectProperty6Getter(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
_M0DTP46heyq026moonjs3src3ast14ObjectProperty6Getter.prototype.$tag = 2;
function _M0DTP46heyq026moonjs3src3ast14ObjectProperty6Setter(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
_M0DTP46heyq026moonjs3src3ast14ObjectProperty6Setter.prototype.$tag = 3;
function _M0DTP46heyq026moonjs3src3ast14ObjectProperty10SpreadProp(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src3ast14ObjectProperty10SpreadProp.prototype.$tag = 4;
function _M0DTP46heyq026moonjs3src3ast7ForInit7InitVar(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP46heyq026moonjs3src3ast7ForInit7InitVar.prototype.$tag = 0;
function _M0DTP46heyq026moonjs3src3ast7ForInit8InitExpr(param0) {
  this._0 = param0;
}
_M0DTP46heyq026moonjs3src3ast7ForInit8InitExpr.prototype.$tag = 1;
function _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast7ForInitRP46heyq026moonjs3src6parser10ParseErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP46heyq026moonjs3src3ast7ForInitRP46heyq026moonjs3src6parser10ParseErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast7ForInitRP46heyq026moonjs3src6parser10ParseErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP46heyq026moonjs3src3ast7ForInitRP46heyq026moonjs3src6parser10ParseErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast13VarDeclaratorRP46heyq026moonjs3src6parser10ParseErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP46heyq026moonjs3src3ast13VarDeclaratorRP46heyq026moonjs3src6parser10ParseErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast13VarDeclaratorRP46heyq026moonjs3src6parser10ParseErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP46heyq026moonjs3src3ast13VarDeclaratorRP46heyq026moonjs3src6parser10ParseErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16option6OptionGRPB5ArrayGRP46heyq026moonjs3src3ast4StmtEE4None() {}
_M0DTPC16option6OptionGRPB5ArrayGRP46heyq026moonjs3src3ast4StmtEE4None.prototype.$tag = 0;
const _M0DTPC16option6OptionGRPB5ArrayGRP46heyq026moonjs3src3ast4StmtEE4None__ = new _M0DTPC16option6OptionGRPB5ArrayGRP46heyq026moonjs3src3ast4StmtEE4None();
function _M0DTPC16option6OptionGRPB5ArrayGRP46heyq026moonjs3src3ast4StmtEE4Some(param0) {
  this._0 = param0;
}
_M0DTPC16option6OptionGRPB5ArrayGRP46heyq026moonjs3src3ast4StmtEE4Some.prototype.$tag = 1;
function _M0DTPC16result6ResultGRP46heyq026moonjs3src6parser6ParserRP46heyq026moonjs3src6parser10ParseErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP46heyq026moonjs3src6parser6ParserRP46heyq026moonjs3src6parser10ParseErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP46heyq026moonjs3src6parser6ParserRP46heyq026moonjs3src6parser10ParseErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP46heyq026moonjs3src6parser6ParserRP46heyq026moonjs3src6parser10ParseErrorE2Ok.prototype.$tag = 1;
function _M0TP46heyq026moonjs3src6parser6Parser(param0, param1, param2, param3, param4) {
  this.lexer = param0;
  this.current = param1;
  this.prev_end = param2;
  this.in_loop = param3;
  this.labels = param4;
}
function _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast7ProgramRP46heyq026moonjs3src6parser10ParseErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP46heyq026moonjs3src3ast7ProgramRP46heyq026moonjs3src6parser10ParseErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast7ProgramRP46heyq026moonjs3src6parser10ParseErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP46heyq026moonjs3src3ast7ProgramRP46heyq026moonjs3src6parser10ParseErrorE2Ok.prototype.$tag = 1;
function _M0TP46heyq026moonjs3src2vm5Frame(param0, param1, param2, param3, param4, param5, param6, param7) {
  this.pc = param0;
  this.chunk = param1;
  this.locals = param2;
  this.upvalues = param3;
  this.operand_stack = param4;
  this.try_stack = param5;
  this.this_val = param6;
  this.caller = param7;
}
function _M0TP46heyq026moonjs3src2vm10TryHandler(param0, param1, param2) {
  this.catch_pc = param0;
  this.finally_pc = param1;
  this.operand_depth = param2;
}
function _M0TP46heyq026moonjs3src2vm6Engine(param0, param1, param2) {
  this.globals = param0;
  this.chunk_registry = param1;
  this.builtins = param2;
}
function $i64_trunc_f64(a) {
  if (Number.isNaN(a)) return 0n;
  if (a >= 9223372036854775807) return 9223372036854775807n;
  if (a <= -9223372036854775808) return 9223372036854775808n;
  return BigInt.asUintN(64, BigInt(Math.trunc(a)));
}
function $f64_convert_i64(a) {
  return Number(BigInt.asIntN(64, a));
}
function $f64_convert_i32_u(a) {
  return a < 0 ? a + 4294967296.0 : a + 0.0;
}
function _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11JSExceptionE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11JSExceptionE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11JSExceptionE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11JSExceptionE2Ok.prototype.$tag = 1;
function _M0TP46heyq026moonjs3cmd19moonjs_2dplayground10EvalOutput(param0, param1, param2, param3) {
  this.kind = param0;
  this.value = param1;
  this.error = param2;
  this.stdout = param3;
}
const _M0MPC16string6String4trimN7_2abindS6861 = "\t\n\r ";
const _M0FPB18double__max__value = $i64_reinterpret_f64(9218868437227405311n);
const _M0FPB18double__min__value = $i64_reinterpret_f64(18442240474082181119n);
const _M0FPC16double14not__a__number = $i64_reinterpret_f64(9221120237041090561n);
const _M0FPC16double8infinity = $i64_reinterpret_f64(9218868437227405312n);
const _M0FPC16double13neg__infinity = $i64_reinterpret_f64(18442240474082181120n);
const _M0FPC28internal7strconv15range__err__str = "value out of range";
const _M0FPC28internal7strconv16syntax__err__str = "invalid syntax";
const _M0FPC28internal7strconv17min__19digit__int = 1000000000000000000n;
const _M0FPC28internal7strconv17parse__scientificN8exp__numS354 = 0n;
const _M0FPC28internal7strconv27eisel__lemire__pow10__table = [18054884314459144840n, 1671618768450675795n, 11284302696536965525n, 1044761730281672372n, 14105378370671206906n, 5917638181279478369n, 17631722963339008632n, 16620419763454123769n, 11019826852086880395n, 10387762352158827356n, 13774783565108600494n, 8373016921771146291n, 17218479456385750618n, 1242899115359157055n, 10761549660241094136n, 5388497965526861063n, 13451937075301367670n, 6735622456908576329n, 16814921344126709587n, 17642900107990496220n, 10509325840079193492n, 8720969558280366185n, 13136657300098991865n, 10901211947850457732n, 16420821625123739831n, 18238200953240460069n, 10263013515702337394n, 18316404623416369399n, 12828766894627921743n, 13672133742415685941n, 16035958618284902179n, 12478481159592219522n, 10022474136428063862n, 5493207715531443249n, 12528092670535079827n, 16089881681269079869n, 15660115838168849784n, 15500666083158961933n, 9787572398855531115n, 9687916301974351208n, 12234465498569413894n, 7498209359040551106n, 15293081873211767368n, 149389661945913074n, 9558176170757354605n, 93368538716195671n, 11947720213446693256n, 4728396691822632493n, 14934650266808366570n, 5910495864778290617n, 9334156416755229106n, 8305745933913819539n, 11667695520944036383n, 1158810380537498616n, 14584619401180045478n, 15283571030954036982n, 18230774251475056848n, 9881091751837770420n, 11394233907171910530n, 6175682344898606512n, 14242792383964888162n, 16942974967978033949n, 17803490479956110203n, 11955346673117766628n, 11127181549972568877n, 5166248661484910190n, 13908976937465711096n, 11069496845283525642n, 17386221171832138870n, 13836871056604407053n, 10866388232395086794n, 4036358391950366504n, 13582985290493858492n, 14268820026792733938n, 16978731613117323115n, 17836025033490917422n, 10611707258198326947n, 8841672636718129437n, 13264634072747908684n, 6440404777470273892n, 16580792590934885855n, 8050505971837842365n, 10362995369334303659n, 11949095260039733334n, 12953744211667879574n, 10324683056622278764n, 16192180264584849468n, 3682481783923072647n, 10120112665365530917n, 11524923151806696212n, 12650140831706913647n, 571095884476206553n, 15812676039633642058n, 14548927910877421904n, 9882922524771026286n, 13704765962725776594n, 12353653155963782858n, 7907585416552444934n, 15442066444954728573n, 661109733835780360n, 9651291528096705358n, 2719036592861056677n, 12064114410120881697n, 12622167777931096654n, 15080143012651102122n, 1942651667131707105n, 9425089382906938826n, 5825843310384704845n, 11781361728633673532n, 16505676174835656864n, 14726702160792091916n, 2185351144835019464n, 18408377700990114895n, 2731688931043774330n, 11505236063118821809n, 8624834609543440812n, 14381545078898527261n, 15392729280356688919n, 17976931348623159077n, 5405853545163697437n, 11235582092889474423n, 5684501474941004850n, 14044477616111843029n, 2493940825248868159n, 17555597020139803786n, 7729112049988473103n, 10972248137587377366n, 9442381049670183593n, 13715310171984221708n, 2579604275232953683n, 17144137714980277135n, 3224505344041192104n, 10715086071862673209n, 8932844867666826921n, 13393857589828341511n, 15777742103010921555n, 16742321987285426889n, 15110491610336264040n, 10463951242053391806n, 2526528228819083169n, 13079939052566739757n, 12381532322878629770n, 16349923815708424697n, 1641857348316123500n, 10218702384817765435n, 12555375888766046947n, 12773377981022206794n, 11082533842530170780n, 15966722476277758493n, 4629795266307937667n, 9979201547673599058n, 5199465050656154994n, 12474001934591998822n, 15722703350174969551n, 15592502418239998528n, 10430007150863936130n, 9745314011399999080n, 6518754469289960081n, 12181642514249998850n, 8148443086612450102n, 15227053142812498563n, 962181821410786819n, 9516908214257811601n, 16742264702877599426n, 11896135267822264502n, 7092772823314835570n, 14870169084777830627n, 18089338065998320271n, 9293855677986144142n, 8999993282035256217n, 11617319597482680178n, 2026619565689294464n, 14521649496853350222n, 11756646493966393888n, 18152061871066687778n, 5472436080603216552n, 11345038669416679861n, 8031958568804398249n, 14181298336770849826n, 14651634229432885715n, 17726622920963562283n, 9091170749936331336n, 11079139325602226427n, 3376138709496513133n, 13848924157002783033n, 18055231442152805128n, 17311155196253478792n, 8733981247408842698n, 10819471997658424245n, 5458738279630526686n, 13524339997073030306n, 11435108867965546262n, 16905424996341287883n, 5070514048102157020n, 10565890622713304927n, 863228270850154185n, 13207363278391631158n, 14914093393844856443n, 16509204097989538948n, 9419244705451294746n, 10318252561243461842n, 15110399977761835024n, 12897815701554327303n, 9664627935347517973n, 16122269626942909129n, 7469098900757009562n, 10076418516839318205n, 16197401859041600736n, 12595523146049147757n, 6411694268519837208n, 15744403932561434696n, 12626303854077184414n, 9840252457850896685n, 7891439908798240259n, 12300315572313620856n, 14475985904425188227n, 15375394465392026070n, 18094982380531485284n, 9609621540870016294n, 6697677969404790399n, 12012026926087520367n, 17595469498610763806n, 15015033657609400459n, 17382650854836066854n, 9384396036005875287n, 8558313775058847832n, 11730495045007344109n, 6086206200396171886n, 14663118806259180136n, 12219443768922602761n, 18328898507823975170n, 15274304711153253452n, 11455561567389984481n, 14158126462898171311n, 14319451959237480602n, 3862600023340550427n, 17899314949046850752n, 14051622066030463842n, 11187071843154281720n, 8782263791269039901n, 13983839803942852150n, 10977829739086299876n, 17479799754928565188n, 4498915137003099037n, 10924874846830353242n, 12035193997481712706n, 13656093558537941553n, 5820620459997365075n, 17070116948172426941n, 11887461593424094248n, 10668823092607766838n, 9735506505103752857n, 13336028865759708548n, 2946011094524915263n, 16670036082199635685n, 3682513868156144079n, 10418772551374772303n, 4607414176811284001n, 13023465689218465379n, 1147581702586717097n, 16279332111523081723n, 15269535183515560084n, 10174582569701926077n, 7237616480483531100n, 12718228212127407596n, 13658706619031801779n, 15897785265159259495n, 17073383273789752224n, 9936115790724537184n, 17588393573759676996n, 12420144738405671481n, 3538747893490044629n, 15525180923007089351n, 9035120885289943691n, 9703238076879430844n, 12564479580947296663n, 12129047596099288555n, 15705599476184120828n, 15161309495124110694n, 15020313326802763131n, 9475818434452569184n, 4776009810824339053n, 11844773043065711480n, 5970012263530423816n, 14805966303832139350n, 7462515329413029771n, 9253728939895087094n, 52386062455755702n, 11567161174868858867n, 9288854614924470436n, 14458951468586073584n, 6999382250228200141n, 18073689335732591980n, 8749227812785250177n, 11296055834832869987n, 14691639419845557168n, 14120069793541087484n, 13752863256379558556n, 17650087241926359355n, 17191079070474448196n, 11031304526203974597n, 8438581409832836170n, 13789130657754968246n, 15159912780718433117n, 17236413322193710308n, 9726518939043265588n, 10772758326371068942n, 15302446373756816800n, 13465947907963836178n, 9904685930341245193n, 16832434884954795223n, 3157485376071780683n, 10520271803096747014n, 8890957387685944783n, 13150339753870933768n, 1890324697752655170n, 16437924692338667210n, 2362905872190818963n, 10273702932711667006n, 6088502188546649756n, 12842128665889583757n, 16833999772538088003n, 16052660832361979697n, 7207441660390446292n, 10032913020226237310n, 16033866083812498692n, 12541141275282796638n, 10818960567910847557n, 15676426594103495798n, 4300328673033783639n, 9797766621314684873n, 16522763475928278486n, 12247208276643356092n, 6818396289628184396n, 15309010345804195115n, 8522995362035230495n, 9568131466127621947n, 3021029092058325107n, 11960164332659527433n, 17611344420355070096n, 14950205415824409292n, 8179122470161673908n, 9343878384890255807n, 14335323580705822000n, 11679847981112819759n, 13307468457454889596n, 14599809976391024699n, 12022649553391224092n, 18249762470488780874n, 10416625923311642211n, 11406101544055488046n, 11122077220497164286n, 14257626930069360058n, 4679224488766679549n, 17822033662586700072n, 15072402647813125244n, 11138771039116687545n, 9420251654883203278n, 13923463798895859431n, 16387000587031392001n, 17404329748619824289n, 15872064715361852097n, 10877706092887390181n, 3002511419460075705n, 13597132616109237726n, 8364825292752482535n, 16996415770136547158n, 1232659579085827361n, 10622759856335341973n, 14605470292210805812n, 13278449820419177467n, 4421779809981343554n, 16598062275523971834n, 915538744049291538n, 10373788922202482396n, 5183897733458195115n, 12967236152753102995n, 6479872166822743894n, 16209045190941378744n, 3488154190101041964n, 10130653244338361715n, 2180096368813151227n, 12663316555422952143n, 16560178516298602746n, 15829145694278690179n, 16088537126945865529n, 9893216058924181362n, 7749492695127472003n, 12366520073655226703n, 463493832054564196n, 15458150092069033378n, 14414425345350368957n, 9661343807543145861n, 13620701859271368502n, 12076679759428932327n, 3190819268807046916n, 15095849699286165408n, 17823582141290972357n, 9434906062053853380n, 11139738838306857723n, 11793632577567316725n, 13924673547883572154n, 14742040721959145907n, 3570783879572301480n, 18427550902448932383n, 18298537904747540562n, 11517219314030582739n, 18354115218108294707n, 14396524142538228424n, 18330958004207980480n, 17995655178172785531n, 4466953431550423984n, 11247284486357990957n, 486002885505321038n, 14059105607947488696n, 5219189625309039202n, 17573882009934360870n, 6523987031636299002n, 10983676256208975543n, 17912549950054850588n, 13729595320261219429n, 17779001419141175331n, 17161994150326524287n, 8388693718644305452n, 10726246343954077679n, 12160462601793772764n, 13407807929942597099n, 10588892233814828051n, 16759759912428246374n, 8624429273841147159n, 10474849945267653984n, 778582277723329070n, 13093562431584567480n, 973227847154161338n, 16366953039480709350n, 1216534808942701673n, 10229345649675443343n, 14595392310871352257n, 12786682062094304179n, 13632554370161802418n, 15983352577617880224n, 12429006944274865118n, 9989595361011175140n, 7768129340171790699n, 12486994201263968925n, 9710161675214738374n, 15608742751579961156n, 16749388112445810871n, 9755464219737475723n, 1244995533423855986n, 12194330274671844653n, 15391302472061983695n, 15242912843339805817n, 5404070034795315907n, 9526820527087378635n, 14906758817815542202n, 11908525658859223294n, 14021762503842039848n, 14885657073574029118n, 8303831092947774002n, 9303535670983768199n, 578208414664970847n, 11629419588729710248n, 14557818573613377271n, 14536774485912137810n, 18197273217016721589n, 18170968107390172263n, 13523219484416126178n, 11356855067118857664n, 15369541205401160717n, 14196068833898572081n, 765182433041899281n, 17745086042373215101n, 5568164059729762005n, 11090678776483259438n, 5785945546544795205n, 13863348470604074297n, 16455803970035769814n, 17329185588255092872n, 6734696907262548556n, 10830740992659433045n, 4209185567039092847n, 13538426240824291306n, 9873167977226253963n, 16923032801030364133n, 3118087934678041646n, 10576895500643977583n, 4254647968387469981n, 13221119375804971979n, 706623942056949572n, 16526399219756214973n, 14718337982853350677n, 10328999512347634358n, 11504804248497038125n, 12911249390434542948n, 5157633273766521849n, 16139061738043178685n, 6447041592208152311n, 10086913586276986678n, 6335244004343789146n, 12608641982846233347n, 17142427042284512241n, 15760802478557791684n, 16816347784428252397n, 9850501549098619803n, 1286845328412881940n, 12313126936373274753n, 15443614715798266137n, 15391408670466593442n, 5469460339465668959n, 9619630419041620901n, 8030098730593431003n, 12024538023802026126n, 14649309431669176658n, 15030672529752532658n, 9088264752731695015n, 9394170331095332911n, 10291851488884697288n, 11742712913869166139n, 8253128342678483706n, 14678391142336457674n, 5704724409920716729n, 18347988927920572092n, 16354277549255671720n, 11467493079950357558n, 998051431430019017n, 14334366349937946947n, 10470936326142299579n, 17917957937422433684n, 8476984389250486570n, 11198723710889021052n, 14521487280136329914n, 13998404638611276315n, 18151859100170412392n, 17498005798264095394n, 18078137856785627587n, 10936253623915059621n, 15910522178918405146n, 13670317029893824527n, 6053094668365842720n, 17087896287367280659n, 2954682317029915496n, 10679935179604550411n, 17987577512639554849n, 13349918974505688014n, 17872785872372055657n, 16687398718132110018n, 13117610303610293764n, 10429624198832568761n, 12810192458183821506n, 13037030248540710952n, 2177682517447613171n, 16296287810675888690n, 2722103146809516464n, 10185179881672430431n, 6313000485183335694n, 12731474852090538039n, 3279564588051781713n, 15914343565113172548n, 17934513790346890853n, 9946464728195732843n, 1985699082112030975n, 12433080910244666053n, 16317181907922202431n, 15541351137805832567n, 6561419329620589327n, 9713344461128645354n, 11018416108653950185n, 12141680576410806693n, 4549648098962661924n, 15177100720513508366n, 10298746142130715309n, 9485687950320942729n, 1825030320404309164n, 11857109937901178411n, 6892973918932774359n, 14821387422376473014n, 4004531380238580045n, 9263367138985295633n, 16337890167931276240n, 11579208923731619542n, 6587304654631931588n, 14474011154664524427n, 17457502855144690293n, 18092513943330655534n, 17210192550503474962n, 11307821214581659709n, 6144684325637283947n, 14134776518227074636n, 12292541425473992838n, 17668470647783843295n, 15365676781842491048n, 11042794154864902059n, 16521077016292638761n, 13803492693581127574n, 16039660251938410547n, 17254365866976409468n, 10826203278068237376n, 10783978666860255917n, 15989749085647424168n, 13479973333575319897n, 6152128301777116498n, 16849966666969149871n, 12301846395648783526n, 10531229166855718669n, 14606183024921571560n, 13164036458569648337n, 4422670725869800738n, 16455045573212060421n, 10140024425764638826n, 10284403483257537763n, 8643358275316593218n, 12855504354071922204n, 6192511825718353619n, 16069380442589902755n, 7740639782147942024n, 10043362776618689222n, 2532056854628769813n, 12554203470773361527n, 12388443105140738074n, 15692754338466701909n, 10873867862998534689n, 9807971461541688693n, 9102010423587778132n, 12259964326927110866n, 15989199047912110569n, 15324955408658888583n, 10763126773035362404n, 9578097130411805364n, 13644483260788183358n, 11972621413014756705n, 17055604075985229198n, 14965776766268445882n, 7484447039699372786n, 9353610478917778676n, 9289465418239495895n, 11692013098647223345n, 11611831772799369869n, 14615016373309029182n, 679731660717048624n, 18268770466636286477n, 10073036612751086588n, 11417981541647679048n, 8601490892183123069n, 14272476927059598810n, 10751863615228903837n, 17840596158824498513n, 4216457482181353988n, 11150372599265311570n, 14164500972431816002n, 13937965749081639463n, 8482254178684994195n, 17422457186352049329n, 5991131704928854840n, 10889035741470030830n, 15273672361649004035n, 13611294676837538538n, 9868718415206479236n, 17014118346046923173n, 3112525982153323237n, 10633823966279326983n, 4251171748059520975n, 13292279957849158729n, 702278666647013314n, 16615349947311448411n, 5489534351736154547n, 10384593717069655257n, 1125115960621402640n, 12980742146337069071n, 6018080969204141204n, 16225927682921336339n, 2910915193077788601n, 10141204801825835211n, 17960223060169475539n, 12676506002282294014n, 17838592806784456520n, 15845632502852867518n, 13074868971625794843n, 9903520314283042199n, 3560107088838733872n, 12379400392853802748n, 18285191916330581053n, 15474250491067253436n, 4409745821703674700n, 9671406556917033397n, 11979463175419572495n, 12089258196146291747n, 1139270913992301907n, 15111572745182864683n, 15259146697772541096n, 9444732965739290427n, 7231123676894144233n, 11805916207174113034n, 4427218577690292387n, 14757395258967641292n, 14757395258967641292n, 9223372036854775808n, 0n, 11529215046068469760n, 0n, 14411518807585587200n, 0n, 18014398509481984000n, 0n, 11258999068426240000n, 0n, 14073748835532800000n, 0n, 17592186044416000000n, 0n, 10995116277760000000n, 0n, 13743895347200000000n, 0n, 17179869184000000000n, 0n, 10737418240000000000n, 0n, 13421772800000000000n, 0n, 16777216000000000000n, 0n, 10485760000000000000n, 0n, 13107200000000000000n, 0n, 16384000000000000000n, 0n, 10240000000000000000n, 0n, 12800000000000000000n, 0n, 16000000000000000000n, 0n, 10000000000000000000n, 0n, 12500000000000000000n, 0n, 15625000000000000000n, 0n, 9765625000000000000n, 0n, 12207031250000000000n, 0n, 15258789062500000000n, 0n, 9536743164062500000n, 0n, 11920928955078125000n, 0n, 14901161193847656250n, 0n, 9313225746154785156n, 4611686018427387904n, 11641532182693481445n, 5764607523034234880n, 14551915228366851806n, 11817445422220181504n, 18189894035458564758n, 5548434740920451072n, 11368683772161602973n, 17302829768357445632n, 14210854715202003717n, 7793479155164643328n, 17763568394002504646n, 14353534962383192064n, 11102230246251565404n, 4359273333062107136n, 13877787807814456755n, 5449091666327633920n, 17347234759768070944n, 2199678564482154496n, 10842021724855044340n, 1374799102801346560n, 13552527156068805425n, 1718498878501683200n, 16940658945086006781n, 6759809616554491904n, 10587911840678754238n, 6530724019560251392n, 13234889800848442797n, 17386777061305090048n, 16543612251060553497n, 7898413271349198848n, 10339757656912845935n, 16465723340661719040n, 12924697071141057419n, 15970468157399760896n, 16155871338926321774n, 15351399178322313216n, 10097419586828951109n, 4982938468024057856n, 12621774483536188886n, 10840359103457460224n, 15777218104420236108n, 4327076842467049472n, 9860761315262647567n, 11927795063396681728n, 12325951644078309459n, 10298057810818464256n, 15407439555097886824n, 8260886245095692416n, 9629649721936179265n, 5163053903184807760n, 12037062152420224081n, 11065503397408397604n, 15046327690525280101n, 18443565265187884909n, 9403954806578300063n, 13833071299956122020n, 11754943508222875079n, 12679653106517764621n, 14693679385278593849n, 11237880364719817872n, 18367099231598242312n, 212292400617608628n, 11479437019748901445n, 132682750386005392n, 14349296274686126806n, 4777539456409894645n, 17936620343357658507n, 15195296357367144114n, 11210387714598536567n, 7191217214140771119n, 14012984643248170709n, 4377335499248575995n, 17516230804060213386n, 10083355392488107898n, 10947644252537633366n, 10913783138732455340n, 13684555315672041708n, 4418856886560793367n, 17105694144590052135n, 5523571108200991709n, 10691058840368782584n, 10369760970266701674n, 13363823550460978230n, 12962201212833377092n, 16704779438076222788n, 6979379479186945558n, 10440487148797639242n, 13585484211346616781n, 13050608935997049053n, 7758483227328495169n, 16313261169996311316n, 14309790052588006865n, 10195788231247694572n, 18166990819722280098n, 12744735289059618216n, 4261994450943298507n, 15930919111324522770n, 5327493063679123134n, 9956824444577826731n, 7941369183226839863n, 12446030555722283414n, 5315025460606161924n, 15557538194652854267n, 15867153862612478214n, 9723461371658033917n, 7611128154919104931n, 12154326714572542396n, 14125596212076269068n, 15192908393215677995n, 17656995265095336336n, 9495567745759798747n, 8729779031470891258n, 11869459682199748434n, 6300537770911226168n, 14836824602749685542n, 17099044250493808518n, 9273015376718553464n, 6075216638131242420n, 11591269220898191830n, 7594020797664053025n, 14489086526122739788n, 269153960225290473n, 18111358157653424735n, 336442450281613091n, 11319598848533390459n, 7127805559067090038n, 14149498560666738074n, 4298070930406474644n, 17686873200833422592n, 14595960699862869113n, 11054295750520889120n, 9122475437414293195n, 13817869688151111400n, 11403094296767866494n, 17272337110188889250n, 14253867870959833118n, 10795210693868055781n, 13520353437777283602n, 13494013367335069727n, 3065383741939440791n, 16867516709168837158n, 17666787732706464701n, 10542197943230523224n, 6430056314514152534n, 13177747429038154030n, 8037570393142690668n, 16472184286297692538n, 823590954573587527n, 10295115178936057836n, 5126430365035880108n, 12868893973670072295n, 6408037956294850135n, 16086117467087590369n, 3398361426941174765n, 10053823416929743980n, 13653190937906703988n, 12567279271162179975n, 17066488672383379985n, 15709099088952724969n, 16721424822051837077n, 9818186930595453106n, 3533361486141316317n, 12272733663244316382n, 13640073894531421205n, 15340917079055395478n, 7826720331309500698n, 9588073174409622174n, 280014188641050032n, 11985091468012027717n, 9573389772656088348n, 14981364335015034646n, 16578423234247498339n, 9363352709384396654n, 5749828502977298558n, 11704190886730495817n, 16410657665576399005n, 14630238608413119772n, 6678264026688335045n, 18287798260516399715n, 8347830033360418806n, 11429873912822749822n, 2911550761636567802n, 14287342391028437277n, 12862810488900485560n, 17859177988785546597n, 2243455055843443238n, 11161986242990966623n, 3708002419115845976n, 13952482803738708279n, 23317005467419566n, 17440603504673385348n, 13864204312116438170n, 10900377190420865842n, 17888499731927549664n, 13625471488026082303n, 13137252628054661272n, 17031839360032602879n, 11809879766640938686n, 10644899600020376799n, 14298703881791668535n, 13306124500025470999n, 13261693833812197764n, 16632655625031838749n, 11965431273837859301n, 10395409765644899218n, 9784237555362356015n, 12994262207056124023n, 3006924907348169211n, 16242827758820155028n, 17593714189467375226n, 10151767349262596893n, 1772699331562333708n, 12689709186578246116n, 6827560182880305039n, 15862136483222807645n, 8534450228600381299n, 9913835302014254778n, 7639874402088932264n, 12392294127517818473n, 326470965756389522n, 15490367659397273091n, 5019774725622874806n, 9681479787123295682n, 831516194300602802n, 12101849733904119602n, 10262767279730529310n, 15127312167380149503n, 3605087062808385830n, 9454570104612593439n, 9170708441896323000n, 11818212630765741799n, 6851699533943015846n, 14772765788457177249n, 3952938399001381903n, 9232978617785735780n, 13999801545444333449n, 11541223272232169725n, 17499751931805416812n, 14426529090290212157n, 8039631859474607303n, 18033161362862765196n, 14661225842770647033n, 11270725851789228247n, 18386638188586430203n, 14088407314736535309n, 18371611717305649850n, 17610509143420669137n, 9129456591349898601n, 11006568214637918210n, 17235125415662156385n, 13758210268297397763n, 12320534732722919674n, 17197762835371747204n, 10788982397476261688n, 10748601772107342002n, 15966486035277439363n, 13435752215134177503n, 10734735507242023396n, 16794690268917721879n, 8806733365625141341n, 10496681418073576174n, 12421737381156795194n, 13120851772591970218n, 6303799689591218185n, 16401064715739962772n, 17103121648843798539n, 10250665447337476733n, 1466078993672598279n, 12813331809171845916n, 6444284760518135752n, 16016664761464807395n, 8055355950647669691n, 10010415475915504622n, 2728754459941099604n, 12513019344894380777n, 12634315111781150314n, 15641274181117975972n, 1957835834444274180n, 9775796363198734982n, 10447019433382447170n, 12219745453998418728n, 3835402254873283155n, 15274681817498023410n, 4794252818591603944n, 9546676135936264631n, 7608094030047140369n, 11933345169920330789n, 4898431519131537557n, 14916681462400413486n, 10734725417341809851n, 9322925914000258429n, 2097517367411243253n, 11653657392500323036n, 7233582727691441970n, 14567071740625403795n, 9041978409614302462n, 18208839675781754744n, 6690786993590490174n, 11380524797363596715n, 4181741870994056359n, 14225655996704495894n, 615491320315182544n, 17782069995880619867n, 9992736187248753989n, 11113793747425387417n, 3939617107816777291n, 13892242184281734271n, 9536207403198359517n, 17365302730352167839n, 7308573235570561493n, 10853314206470104899n, 11485387299872682789n, 13566642758087631124n, 9745048106413465582n, 16958303447609538905n, 12181310133016831978n, 10598939654755961816n, 695789805494438130n, 13248674568444952270n, 869737256868047663n, 16560843210556190337n, 10310543607939835386n, 10350527006597618960n, 17973304801030866876n, 12938158758247023701n, 4019886927579031980n, 16172698447808779626n, 9636544677901177879n, 10107936529880487266n, 10634526442115624078n, 12634920662350609083n, 4069786015789754290n, 15793650827938261354n, 475546501309804958n, 9871031767461413346n, 4908902581746016003n, 12338789709326766682n, 15359500264037295811n, 15423487136658458353n, 9976003293191843956n, 9639679460411536470n, 17764217104313372233n, 12049599325514420588n, 12981899343536939483n, 15061999156893025735n, 16227374179421174354n, 9413749473058141084n, 17059637889779315827n, 11767186841322676356n, 2877803288514593168n, 14708983551653345445n, 3597254110643241460n, 18386229439566681806n, 9108253656731439729n, 11491393399729176129n, 1080972517029761926n, 14364241749661470161n, 5962901664714590312n, 17955302187076837701n, 12065313099320625794n, 11222063866923023563n, 9846663696289085073n, 14027579833653779454n, 7696643601933968437n, 17534474792067224318n, 397432465562684739n, 10959046745042015198n, 14083453346258841674n, 13698808431302518998n, 8380944645968776284n, 17123510539128148748n, 1252808770606194547n, 10702194086955092967n, 10006377518483647400n, 13377742608693866209n, 7896285879677171346n, 16722178260867332761n, 14482043368023852087n, 10451361413042082976n, 2133748077373825698n, 13064201766302603720n, 2667185096717282123n, 16330252207878254650n, 3333981370896602653n, 10206407629923909156n, 6695424375237764562n, 12758009537404886445n, 8369280469047205703n, 15947511921756108056n, 15073286604736395033n, 9967194951097567535n, 9420804127960246895n, 12458993688871959419n, 7164319141522920715n, 15573742111089949274n, 4343712908476262990n, 9733588819431218296n, 7326506586225052273n, 12166986024289022870n, 9158133232781315341n, 15208732530361278588n, 2224294504121868368n, 9505457831475799117n, 10613556101930943538n, 11881822289344748896n, 17878631145841067327n, 14852277861680936121n, 3901544858591782542n, 9282673663550585075n, 13967680582688333849n, 11603342079438231344n, 12847914709933029407n, 14504177599297789180n, 16059893387416286759n, 18130221999122236476n, 1628122660560806833n, 11331388749451397797n, 10240948699705280078n, 14164235936814247246n, 17412871893058988002n, 17705294921017809058n, 12542717829468959195n, 11065809325636130661n, 12450884661845487401n, 13832261657045163327n, 1728547772024695539n, 17290327071306454158n, 15995742770313033136n, 10806454419566533849n, 5385653213018257806n, 13508068024458167311n, 11343752534700210161n, 16885085030572709139n, 9568004649947874797n, 10553178144107943212n, 3674159897003727796n, 13191472680134929015n, 4592699871254659745n, 16489340850168661269n, 1129188820640936778n, 10305838031355413293n, 3011586022114279438n, 12882297539194266616n, 8376168546070237202n, 16102871923992833270n, 10470210682587796502n, 10064294952495520794n, 1932195658189984910n, 12580368690619400992n, 11638616609592256945n, 15725460863274251240n, 14548270761990321182n, 9828413039546407025n, 9092669226243950738n, 12285516299433008781n, 15977522551232326327n, 15356895374291260977n, 6136845133758244197n, 9598059608932038110n, 15364743254667372383n, 11997574511165047638n, 9982557031479439671n, 14996968138956309548n, 3254824252494523781n, 9373105086847693467n, 11257637194663853171n, 11716381358559616834n, 9460360474902428559n, 14645476698199521043n, 2602078556773259891n, 18306845872749401303n, 17087656251248738576n, 11441778670468375814n, 17597314184671543466n, 14302223338085469768n, 12773270693984653525n, 17877779172606837210n, 15966588367480816906n, 11173611982879273256n, 14590803748102898470n, 13967014978599091570n, 18238504685128623088n, 17458768723248864463n, 13574758819556003052n, 10911730452030540289n, 15401753289863583763n, 13639663065038175362n, 5417133557047315992n, 17049578831297719202n, 15994788983163920798n, 10655986769561074501n, 14608429132904838403n, 13319983461951343127n, 4425478360848884291n, 16649979327439178909n, 920161932633717460n, 10406237079649486818n, 2880944217109767365n, 13007796349561858522n, 12824552308241985014n, 16259745436952323153n, 6807318348447705459n, 10162340898095201970n, 15783789013848285672n, 12702926122619002463n, 10506364230455581282n, 15878657653273753079n, 8521269269642088699n, 9924161033296095674n, 12243322321167387293n, 12405201291620119593n, 6080780864604458308n, 15506501614525149491n, 12212662099182960789n, 9691563509078218432n, 5327070802775656541n, 12114454386347773040n, 6658838503469570676n, 15143067982934716300n, 8323548129336963345n, 9464417489334197687n, 14425589617690377899n, 11830521861667747109n, 13420301003685584469n, 14788152327084683887n, 2940318199324816875n, 9242595204427927429n, 8755227902219092403n, 11553244005534909286n, 15555720896201253407n, 14441555006918636608n, 10221279083396790951n, 18051943758648295760n, 12776598854245988689n, 11282464849155184850n, 7985374283903742931n, 14103081061443981063n, 758345818024902856n, 17628851326804976328n, 14782990327813292282n, 11018032079253110205n, 9239368954883307676n, 13772540099066387756n, 16160897212031522499n, 17215675123832984696n, 1754377441329851508n, 10759796952395615435n, 1096485900831157192n, 13449746190494519293n, 15205665431321110202n, 16812182738118149117n, 5172023733869224041n, 10507614211323843198n, 5538357842881958977n, 13134517764154803997n, 16146319340457224530n, 16418147205193504997n, 6347841120289366950n, 10261342003245940623n, 6273243709394548296n, 12826677504057425779n, 3229868618315797466n, 16033346880071782223n, 17872393828176910545n, 10020841800044863889n, 18087775170251650946n, 12526052250056079862n, 8774660907532399971n, 15657565312570099828n, 1744954097560724156n, 9785978320356312392n, 10313968347830228405n, 12232472900445390490n, 12892460434787785506n, 15290591125556738113n, 6892203506629956075n, 9556619453472961320n, 15836842237712192307n, 11945774316841201651n, 1349308723430688768n, 14932217896051502063n, 15521693959570524672n, 9332636185032188789n, 16618587752372659776n, 11665795231290235987n, 6938176635183661008n, 14582244039112794984n, 4061034775552188356n, 18227805048890993730n, 5076293469440235445n, 11392378155556871081n, 7784369436827535057n, 14240472694446088851n, 14342147814461806725n, 17800590868057611064n, 13315998749649870503n, 11125369292536006915n, 8322499218531169064n, 13906711615670008644n, 5791438004736573426n, 17383389519587510805n, 7239297505920716783n, 10864618449742194253n, 6830403950414141941n, 13580773062177742816n, 13149690956445065330n, 16975966327722178520n, 16437113695556331663n, 10609978954826361575n, 10273196059722707289n, 13262473693532951969n, 8229809056225996208n, 16578092116916189961n, 14898947338709883164n, 10361307573072618726n, 2394313059052595121n, 12951634466340773407n, 12216263360670519709n, 16189543082925966759n, 10658643182410761733n, 10118464426828729224n, 13579181016647807939n, 12648080533535911530n, 16973976270809759924n, 15810100666919889413n, 11994098301657424097n, 9881312916824930883n, 9802154447749584012n, 12351641146031163604n, 7641007041259592112n, 15439551432538954505n, 9551258801574490140n, 9649719645336846565n, 17498751797052526097n, 12062149556671058207n, 8038381691033493909n, 15077686945838822759n, 5436291095364479483n];
const _M0FPC28internal7strconv12double__info = new _M0TPC28internal7strconv9FloatInfo(52, 11, -1023);
const _M0FPC28internal7strconv25min__exponent__fast__path = 18446744073709551594n;
const _M0FPC28internal7strconv25max__exponent__fast__path = 22n;
const _M0FPC28internal7strconv36max__exponent__disguised__fast__path = 37n;
const _M0FPC28internal7strconv25max__mantissa__fast__path = 9007199254740992n;
const _M0FPC28internal7strconv6powtab = [1, 3, 6, 9, 13, 16, 19, 23, 26, 29, 33, 36, 39, 43, 46, 49, 53, 56, 59];
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1023 = { _0: 0, _1: "" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1024 = { _0: 1, _1: "5" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1025 = { _0: 1, _1: "25" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1026 = { _0: 1, _1: "125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1027 = { _0: 2, _1: "625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1028 = { _0: 2, _1: "3125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1029 = { _0: 2, _1: "15625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1030 = { _0: 3, _1: "78125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1031 = { _0: 3, _1: "390625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1032 = { _0: 3, _1: "1953125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1033 = { _0: 4, _1: "9765625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1034 = { _0: 4, _1: "48828125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1035 = { _0: 4, _1: "244140625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1036 = { _0: 4, _1: "1220703125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1037 = { _0: 5, _1: "6103515625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1038 = { _0: 5, _1: "30517578125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1039 = { _0: 5, _1: "152587890625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1040 = { _0: 6, _1: "762939453125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1041 = { _0: 6, _1: "3814697265625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1042 = { _0: 6, _1: "19073486328125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1043 = { _0: 7, _1: "95367431640625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1044 = { _0: 7, _1: "476837158203125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1045 = { _0: 7, _1: "2384185791015625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1046 = { _0: 7, _1: "11920928955078125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1047 = { _0: 8, _1: "59604644775390625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1048 = { _0: 8, _1: "298023223876953125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1049 = { _0: 8, _1: "1490116119384765625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1050 = { _0: 9, _1: "7450580596923828125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1051 = { _0: 9, _1: "37252902984619140625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1052 = { _0: 9, _1: "186264514923095703125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1053 = { _0: 10, _1: "931322574615478515625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1054 = { _0: 10, _1: "4656612873077392578125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1055 = { _0: 10, _1: "23283064365386962890625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1056 = { _0: 10, _1: "116415321826934814453125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1057 = { _0: 11, _1: "582076609134674072265625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1058 = { _0: 11, _1: "2910383045673370361328125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1059 = { _0: 11, _1: "14551915228366851806640625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1060 = { _0: 12, _1: "72759576141834259033203125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1061 = { _0: 12, _1: "363797880709171295166015625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1062 = { _0: 12, _1: "1818989403545856475830078125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1063 = { _0: 13, _1: "9094947017729282379150390625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1064 = { _0: 13, _1: "45474735088646411895751953125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1065 = { _0: 13, _1: "227373675443232059478759765625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1066 = { _0: 13, _1: "1136868377216160297393798828125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1067 = { _0: 14, _1: "5684341886080801486968994140625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1068 = { _0: 14, _1: "28421709430404007434844970703125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1069 = { _0: 14, _1: "142108547152020037174224853515625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1070 = { _0: 15, _1: "710542735760100185871124267578125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1071 = { _0: 15, _1: "3552713678800500929355621337890625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1072 = { _0: 15, _1: "17763568394002504646778106689453125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1073 = { _0: 16, _1: "88817841970012523233890533447265625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1074 = { _0: 16, _1: "444089209850062616169452667236328125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1075 = { _0: 16, _1: "2220446049250313080847263336181640625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1076 = { _0: 16, _1: "11102230246251565404236316680908203125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1077 = { _0: 17, _1: "55511151231257827021181583404541015625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1078 = { _0: 17, _1: "277555756156289135105907917022705078125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1079 = { _0: 17, _1: "1387778780781445675529539585113525390625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1080 = { _0: 18, _1: "6938893903907228377647697925567626953125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1081 = { _0: 18, _1: "34694469519536141888238489627838134765625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1082 = { _0: 18, _1: "173472347597680709441192448139190673828125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1083 = { _0: 19, _1: "867361737988403547205962240695953369140625" };
const _M0FPC28internal7strconv19left__shift__cheats = [_M0FPC28internal7strconv19left__shift__cheatsN5tupleS1023, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1024, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1025, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1026, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1027, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1028, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1029, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1030, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1031, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1032, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1033, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1034, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1035, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1036, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1037, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1038, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1039, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1040, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1041, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1042, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1043, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1044, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1045, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1046, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1047, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1048, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1049, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1050, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1051, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1052, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1053, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1054, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1055, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1056, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1057, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1058, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1059, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1060, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1061, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1062, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1063, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1064, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1065, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1066, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1067, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1068, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1069, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1070, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1071, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1072, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1073, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1074, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1075, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1076, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1077, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1078, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1079, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1080, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1081, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1082, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1083];
const _M0FPC28internal7strconv10int__pow10 = [1n, 10n, 100n, 1000n, 10000n, 100000n, 1000000n, 10000000n, 100000000n, 1000000000n, 10000000000n, 100000000000n, 1000000000000n, 10000000000000n, 100000000000000n, 1000000000000000n];
const _M0FPC28internal7strconv5table = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000, 100000000000, 1e+12, 1e+13, 1e+14, 1e+15, 1e+16, 1e+17, 1e+18, 1e+19, 1e+20, 1e+21, 1e+22, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const _M0FPC28internal7strconv12checked__mulN6constrS1164 = 0n;
const _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS686 = 0;
const _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS687 = 1;
const _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS688 = 2;
const _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS689 = 3;
const _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS690 = 4;
const _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS691 = 5;
const _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS692 = 6;
const _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS693 = 7;
const _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS694 = 8;
const _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS695 = 9;
const _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS696 = 10;
const _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS697 = 11;
const _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS698 = 12;
const _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS699 = 13;
const _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS700 = 14;
const _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS701 = 15;
const _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS702 = 16;
const _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS703 = 17;
const _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS704 = 18;
const _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS705 = 19;
const _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS706 = 20;
const _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS707 = 21;
const _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS708 = 22;
const _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS709 = 23;
const _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS710 = 24;
const _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS711 = 25;
const _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS712 = 26;
const _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS713 = 27;
const _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS714 = 28;
const _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS715 = 29;
const _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS716 = 30;
const _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS717 = 31;
const _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS718 = 32;
const _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS719 = 33;
const _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS720 = 34;
const _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS721 = 35;
const _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS722 = 36;
const _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS723 = 37;
const _M0FP46heyq026moonjs3src6parser14assign__op__ofN6constrS2287 = 0;
const _M0FP46heyq026moonjs3src6parser14assign__op__ofN6constrS2288 = 1;
const _M0FP46heyq026moonjs3src6parser14assign__op__ofN6constrS2289 = 2;
const _M0FP46heyq026moonjs3src6parser14assign__op__ofN6constrS2290 = 3;
const _M0FP46heyq026moonjs3src6parser14assign__op__ofN6constrS2291 = 4;
const _M0FP46heyq026moonjs3src6parser14assign__op__ofN6constrS2292 = 5;
const _M0FP46heyq026moonjs3src6parser14assign__op__ofN6constrS2293 = 6;
const _M0FP46heyq026moonjs3src6parser14assign__op__ofN6constrS2294 = 7;
const _M0FP46heyq026moonjs3src6parser14assign__op__ofN6constrS2295 = 8;
const _M0FP46heyq026moonjs3src6parser14assign__op__ofN6constrS2296 = 9;
const _M0FP46heyq026moonjs3src6parser14assign__op__ofN6constrS2297 = 10;
const _M0FP46heyq026moonjs3src6parser14assign__op__ofN6constrS2298 = 11;
const _M0FP46heyq026moonjs3src6parser14assign__op__ofN6constrS2299 = 12;
const _M0FP46heyq026moonjs3src6parser14assign__op__ofN6constrS2300 = 13;
const _M0FP46heyq026moonjs3src6parser14assign__op__ofN6constrS2301 = 14;
const _M0FP46heyq026moonjs3src6parser14assign__op__ofN6constrS2302 = 15;
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2303 = new _M0DTP46heyq026moonjs3src6parser9BinOpKind8BinOpTag(5);
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2304 = { _0: 14, _1: true, _2: _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2303 };
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2305 = _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2304;
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2306 = new _M0DTP46heyq026moonjs3src6parser9BinOpKind8BinOpTag(2);
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2307 = { _0: 13, _1: false, _2: _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2306 };
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2308 = _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2307;
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2309 = new _M0DTP46heyq026moonjs3src6parser9BinOpKind8BinOpTag(3);
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2310 = { _0: 13, _1: false, _2: _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2309 };
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2311 = _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2310;
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2312 = new _M0DTP46heyq026moonjs3src6parser9BinOpKind8BinOpTag(4);
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2313 = { _0: 13, _1: false, _2: _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2312 };
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2314 = _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2313;
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2315 = new _M0DTP46heyq026moonjs3src6parser9BinOpKind8BinOpTag(0);
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2316 = { _0: 12, _1: false, _2: _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2315 };
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2317 = _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2316;
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2318 = new _M0DTP46heyq026moonjs3src6parser9BinOpKind8BinOpTag(1);
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2319 = { _0: 12, _1: false, _2: _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2318 };
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2320 = _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2319;
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2321 = new _M0DTP46heyq026moonjs3src6parser9BinOpKind8BinOpTag(9);
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2322 = { _0: 11, _1: false, _2: _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2321 };
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2323 = _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2322;
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2324 = new _M0DTP46heyq026moonjs3src6parser9BinOpKind8BinOpTag(10);
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2325 = { _0: 11, _1: false, _2: _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2324 };
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2326 = _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2325;
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2327 = new _M0DTP46heyq026moonjs3src6parser9BinOpKind8BinOpTag(11);
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2328 = { _0: 11, _1: false, _2: _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2327 };
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2329 = _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2328;
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2330 = new _M0DTP46heyq026moonjs3src6parser9BinOpKind8BinOpTag(16);
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2331 = { _0: 10, _1: false, _2: _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2330 };
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2332 = _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2331;
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2333 = new _M0DTP46heyq026moonjs3src6parser9BinOpKind8BinOpTag(17);
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2334 = { _0: 10, _1: false, _2: _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2333 };
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2335 = _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2334;
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2336 = new _M0DTP46heyq026moonjs3src6parser9BinOpKind8BinOpTag(18);
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2337 = { _0: 10, _1: false, _2: _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2336 };
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2338 = _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2337;
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2339 = new _M0DTP46heyq026moonjs3src6parser9BinOpKind8BinOpTag(19);
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2340 = { _0: 10, _1: false, _2: _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2339 };
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2341 = _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2340;
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2342 = new _M0DTP46heyq026moonjs3src6parser9BinOpKind8BinOpTag(21);
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2343 = { _0: 10, _1: false, _2: _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2342 };
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2344 = _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2343;
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2345 = new _M0DTP46heyq026moonjs3src6parser9BinOpKind8BinOpTag(20);
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2346 = { _0: 10, _1: false, _2: _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2345 };
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2347 = _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2346;
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2348 = new _M0DTP46heyq026moonjs3src6parser9BinOpKind8BinOpTag(12);
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2349 = { _0: 9, _1: false, _2: _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2348 };
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2350 = _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2349;
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2351 = new _M0DTP46heyq026moonjs3src6parser9BinOpKind8BinOpTag(13);
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2352 = { _0: 9, _1: false, _2: _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2351 };
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2353 = _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2352;
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2354 = new _M0DTP46heyq026moonjs3src6parser9BinOpKind8BinOpTag(14);
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2355 = { _0: 9, _1: false, _2: _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2354 };
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2356 = _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2355;
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2357 = new _M0DTP46heyq026moonjs3src6parser9BinOpKind8BinOpTag(15);
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2358 = { _0: 9, _1: false, _2: _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2357 };
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2359 = _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2358;
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2360 = new _M0DTP46heyq026moonjs3src6parser9BinOpKind8BinOpTag(6);
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2361 = { _0: 8, _1: false, _2: _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2360 };
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2362 = _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2361;
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2363 = new _M0DTP46heyq026moonjs3src6parser9BinOpKind8BinOpTag(8);
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2364 = { _0: 7, _1: false, _2: _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2363 };
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2365 = _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2364;
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2366 = new _M0DTP46heyq026moonjs3src6parser9BinOpKind8BinOpTag(7);
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2367 = { _0: 6, _1: false, _2: _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2366 };
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2368 = _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2367;
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2369 = new _M0DTP46heyq026moonjs3src6parser9BinOpKind8LogOpTag(0);
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2370 = { _0: 5, _1: false, _2: _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2369 };
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2371 = _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2370;
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2372 = new _M0DTP46heyq026moonjs3src6parser9BinOpKind8LogOpTag(1);
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2373 = { _0: 4, _1: false, _2: _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2372 };
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2374 = _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2373;
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2375 = new _M0DTP46heyq026moonjs3src6parser9BinOpKind8LogOpTag(2);
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2376 = { _0: 3, _1: false, _2: _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2375 };
const _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2377 = _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN5tupleS2376;
const _M0FP46heyq026moonjs3cmd19moonjs_2dplayground11stdout__buf = new _M0TP46heyq026moonjs3cmd19moonjs_2dplayground9StdoutBuf("");
const _M0FP46heyq026moonjs3cmd19moonjs_2dplayground9pad__hex4N3hexS22 = "0123456789abcdef";
const _M0FPB4seed = _M0FPB12random__seed();
const _M0MP46heyq026moonjs3src8builtins8Builtins3newN6constrS82 = new _M0DTP46heyq026moonjs3src5value7JSValue3Str("Error");
const _M0MP46heyq026moonjs3src8builtins8Builtins3newN6constrS83 = new _M0DTP46heyq026moonjs3src5value7JSValue3Str("");
const _M0MP46heyq026moonjs3src8builtins8Builtins3newN6constrS84 = new _M0DTP46heyq026moonjs3src5value7JSValue3Str("TypeError");
const _M0MP46heyq026moonjs3src8builtins8Builtins3newN6constrS85 = new _M0DTP46heyq026moonjs3src5value7JSValue3Str("");
const _M0MP46heyq026moonjs3src8builtins8Builtins3newN6constrS86 = new _M0DTP46heyq026moonjs3src5value7JSValue3Str("RangeError");
const _M0MP46heyq026moonjs3src8builtins8Builtins3newN6constrS87 = new _M0DTP46heyq026moonjs3src5value7JSValue3Str("");
const _M0MP46heyq026moonjs3src8builtins8Builtins3newN6constrS88 = new _M0DTP46heyq026moonjs3src5value7JSValue3Str("SyntaxError");
const _M0MP46heyq026moonjs3src8builtins8Builtins3newN6constrS89 = new _M0DTP46heyq026moonjs3src5value7JSValue3Str("");
const _M0MP46heyq026moonjs3src8builtins8Builtins3newN6constrS90 = new _M0DTP46heyq026moonjs3src5value7JSValue3Str("ReferenceError");
const _M0MP46heyq026moonjs3src8builtins8Builtins3newN6constrS91 = new _M0DTP46heyq026moonjs3src5value7JSValue3Str("");
const _M0FPC28internal7strconv17check__underscoreN25_2atransition__table__222S230 = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 5, 5, 5, 5, 5, 0, 1, 2, 5];
const _M0FPC28internal7strconv15parse__inf__nanN25_2atransition__table__304S312 = [14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 3, 4, 14, 14, 14, 14, 14, 14, 14, 7, 14, 14, 14, 14, 5, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 6, 14, 14, 14, 0, 14, 14, 14, 14, 14, 14, 14, 14, 14, 8, 14, 14, 14, 14, 14, 1, 14, 14, 9, 14, 14, 14, 14, 14, 14, 14, 14, 10, 14, 14, 14, 14, 14, 14, 11, 14, 14, 14, 14, 14, 14, 14, 14, 14, 12, 14, 14, 14, 14, 14, 14, 14, 14, 13, 14, 1, 14, 14, 14, 14, 14, 14, 14];
const _M0FP46heyq026moonjs3src2vm17instanceof__checkN6constrS1398 = new _M0DTPC16result6ResultGbsE3Err("Right-hand side of instanceof is not callable");
const _M0FP46heyq026moonjs3src2vm17instanceof__checkN6constrS1399 = new _M0DTPC16result6ResultGbsE3Err("Function has non-object prototype in instanceof check");
const _M0FP46heyq026moonjs3src2vm17instanceof__checkN6constrS1400 = new _M0DTPC16result6ResultGbsE2Ok(false);
const _M0FP46heyq026moonjs3src2vm19parse__array__indexN6constrS1393 = 0;
const _M0FP46heyq026moonjs3src2vm20get__property__valueN6constrS1394 = new _M0DTP46heyq026moonjs3src5value7JSValue5Int32(0);
const _M0FP46heyq026moonjs3src2vm20get__property__valueN6constrS1395 = new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValuesE2Ok(_M0FP46heyq026moonjs3src2vm20get__property__valueN6constrS1394);
const _M0FP46heyq026moonjs3src2vm20get__property__valueN6constrS1396 = new _M0DTP46heyq026moonjs3src5value7JSValue5Int32(0);
const _M0FP46heyq026moonjs3src2vm20get__property__valueN6constrS1397 = new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValuesE2Ok(_M0FP46heyq026moonjs3src2vm20get__property__valueN6constrS1396);
const _M0MP46heyq026moonjs3src2vm6Engine14execute__frameN6constrS1401 = new _M0DTP46heyq026moonjs3src5value7JSValue4Bool(true);
const _M0MP46heyq026moonjs3src2vm6Engine14execute__frameN6constrS1402 = new _M0DTP46heyq026moonjs3src5value7JSValue4Bool(false);
const _M0MP46heyq026moonjs3src2vm6Engine14execute__frameN6constrS1403 = new _M0DTP46heyq026moonjs3src5value7JSValue4Bool(true);
const _M0MP46heyq026moonjs3src2vm6Engine14execute__frameN6constrS1404 = new _M0DTP46heyq026moonjs3src5value7JSValue4Bool(true);
const _M0MP46heyq026moonjs3src2vm6Engine14execute__frameN6constrS1405 = new _M0DTP46heyq026moonjs3src5value7JSValue4Bool(true);
const _M0MP46heyq026moonjs3src2vm6Engine14execute__frameN6constrS1406 = new _M0DTP46heyq026moonjs3src5value7JSValue4Bool(true);
const _M0MP46heyq026moonjs3src2vm6Engine14execute__frameN6constrS1407 = new _M0DTP46heyq026moonjs3src5value7JSValue5Int32(0);
const _M0MP46heyq026moonjs3src2vm6Engine19make__syntax__errorN6constrS1408 = new _M0DTP46heyq026moonjs3src5value7JSValue3Str("SyntaxError");
const _M0MP46heyq026moonjs3src6parser6Parser20parse__primary__exprN6constrS2378 = new _M0DTP46heyq026moonjs3src3ast8ExprKind9Boolean__(true);
const _M0MP46heyq026moonjs3src6parser6Parser20parse__primary__exprN6constrS2379 = new _M0DTP46heyq026moonjs3src3ast8ExprKind9Boolean__(false);
function _M0FPB13consume4__acc(acc, input) {
  const _p = (acc >>> 0) + ((Math.imul(input, -1028477379) | 0) >>> 0) | 0;
  const _p$2 = 17;
  return Math.imul(_p << _p$2 | (_p >>> (32 - _p$2 | 0) | 0), 668265263) | 0;
}
function _M0MPB13StringBuilder21StringBuilder_2einner(size_hint) {
  return new _M0TPB13StringBuilder("");
}
function _M0IPB13StringBuilderPB6Logger11write__char(self, ch) {
  self.val = `${self.val}${String.fromCodePoint(ch)}`;
}
function _M0IPB13StringBuilderPB6Logger13write__string(self, str) {
  self.val = `${self.val}${str}`;
}
function _M0FPB32code__point__of__surrogate__pair(leading, trailing) {
  return (((Math.imul(leading - 55296 | 0, 1024) | 0) + trailing | 0) - 56320 | 0) + 65536 | 0;
}
function _M0MPC16string6String16unsafe__char__at(self, index) {
  const c1 = self.charCodeAt(index);
  if (c1 >= 55296 && c1 <= 56319) {
    const c2 = self.charCodeAt(index + 1 | 0);
    return _M0FPB32code__point__of__surrogate__pair(c1, c2);
  } else {
    return c1;
  }
}
function _M0MPC14byte4Byte7to__hexN14to__hex__digitS3978(i) {
  if (i < 10) {
    const _p = 48;
    const _p$2 = (i + _p | 0) & 255;
    return _p$2;
  } else {
    const _p = 97;
    const _p$2 = (i + _p | 0) & 255;
    const _p$3 = 10;
    const _p$4 = (_p$2 - _p$3 | 0) & 255;
    return _p$4;
  }
}
function _M0MPC14byte4Byte7to__hex(b) {
  const _self = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  const _p = 16;
  _M0IPB13StringBuilderPB6Logger11write__char(_self, _M0MPC14byte4Byte7to__hexN14to__hex__digitS3978((b / _p | 0) & 255));
  const _p$2 = 16;
  _M0IPB13StringBuilderPB6Logger11write__char(_self, _M0MPC14byte4Byte7to__hexN14to__hex__digitS3978((b % _p$2 | 0) & 255));
  const _p$3 = _self;
  return _p$3.val;
}
function _M0MPC16string10StringView12view_2einner(self, start_offset, end_offset) {
  let end_offset$2;
  if (end_offset === undefined) {
    end_offset$2 = self.end - self.start | 0;
  } else {
    const _Some = end_offset;
    end_offset$2 = _Some;
  }
  if (start_offset >= 0 && (start_offset <= end_offset$2 && end_offset$2 <= (self.end - self.start | 0))) {
    return new _M0TPC16string10StringView(self.str, self.start + start_offset | 0, self.start + end_offset$2 | 0);
  } else {
    return $panic();
  }
}
function _M0IP016_24default__implPB7Compare6op__ltGsE(x, y) {
  return _M0IPC16string6StringPB7Compare7compare(x, y) < 0;
}
function _M0FPB14avalanche__acc(acc) {
  let acc$2 = acc;
  acc$2 = acc$2 ^ (acc$2 >>> 15 | 0);
  acc$2 = Math.imul(acc$2, -2048144777) | 0;
  acc$2 = acc$2 ^ (acc$2 >>> 13 | 0);
  acc$2 = Math.imul(acc$2, -1028477379) | 0;
  acc$2 = acc$2 ^ (acc$2 >>> 16 | 0);
  return acc$2;
}
function _M0FPB13finalize__acc(acc) {
  return _M0FPB14avalanche__acc(acc);
}
function _M0MPC16string6String11sub_2einner(self, start, end) {
  const len = self.length;
  let end$2;
  if (end === undefined) {
    end$2 = len;
  } else {
    const _Some = end;
    const _end = _Some;
    end$2 = _end;
  }
  if (start >= 0 && (start <= end$2 && end$2 <= len)) {
    if (start < len) {
      const _p = self.charCodeAt(start);
      if (!(_p >= 56320 && _p <= 57343)) {
      } else {
        $panic();
      }
    }
    if (end$2 < len) {
      const _p = self.charCodeAt(end$2);
      if (!(_p >= 56320 && _p <= 57343)) {
      } else {
        $panic();
      }
    }
    return new _M0TPC16string10StringView(self, start, end$2);
  } else {
    return $panic();
  }
}
function _M0MPC13int3Int18to__string_2einner(self, radix) {
  return _M0FPB19int__to__string__js(self, radix);
}
function _M0MPC15int645Int6418to__string_2einner(self, radix) {
  return _M0FPB21int64__to__string__js(self, radix);
}
function _M0MPC16string10StringView9to__owned(self) {
  return self.str.substring(self.start, self.end);
}
function _M0MPC16string6String12view_2einner(self, start_offset, end_offset) {
  let end_offset$2;
  if (end_offset === undefined) {
    end_offset$2 = self.length;
  } else {
    const _Some = end_offset;
    end_offset$2 = _Some;
  }
  if (start_offset >= 0 && (start_offset <= end_offset$2 && end_offset$2 <= self.length)) {
    return new _M0TPC16string10StringView(self, start_offset, end_offset$2);
  } else {
    return $panic();
  }
}
function _M0MPC16string6String24char__length__ge_2einner(self, len, start_offset, end_offset) {
  let end_offset$2;
  if (end_offset === undefined) {
    end_offset$2 = self.length;
  } else {
    const _Some = end_offset;
    end_offset$2 = _Some;
  }
  let _tmp = start_offset;
  let _tmp$2 = 0;
  while (true) {
    const index = _tmp;
    const count = _tmp$2;
    if (index < end_offset$2 && count < len) {
      const c1 = self.charCodeAt(index);
      if (c1 >= 55296 && c1 <= 56319 && (index + 1 | 0) < end_offset$2) {
        const c2 = self.charCodeAt(index + 1 | 0);
        if (c2 >= 56320 && c2 <= 57343) {
          _tmp = index + 2 | 0;
          _tmp$2 = count + 1 | 0;
          continue;
        } else {
          $panic();
        }
      }
      _tmp = index + 1 | 0;
      _tmp$2 = count + 1 | 0;
      continue;
    } else {
      return count >= len;
    }
  }
}
function _M0MPC16string6String31offset__of__nth__char__backward(self, n, start_offset, end_offset) {
  let _tmp = end_offset;
  let _tmp$2 = 0;
  while (true) {
    const utf16_offset = _tmp;
    const char_count = _tmp$2;
    if ((utf16_offset - 1 | 0) >= start_offset && char_count < n) {
      const c = self.charCodeAt(utf16_offset - 1 | 0);
      if (c >= 56320 && c <= 57343) {
        _tmp = utf16_offset - 2 | 0;
        _tmp$2 = char_count + 1 | 0;
        continue;
      } else {
        _tmp = utf16_offset - 1 | 0;
        _tmp$2 = char_count + 1 | 0;
        continue;
      }
    } else {
      return char_count < n || utf16_offset < start_offset ? undefined : utf16_offset;
    }
  }
}
function _M0MPC16string6String30offset__of__nth__char__forward(self, n, start_offset, end_offset) {
  if (start_offset >= 0 && start_offset <= end_offset) {
    let _tmp = start_offset;
    let _tmp$2 = 0;
    while (true) {
      const utf16_offset = _tmp;
      const char_count = _tmp$2;
      if (utf16_offset < end_offset && char_count < n) {
        const c = self.charCodeAt(utf16_offset);
        if (c >= 55296 && c <= 56319) {
          _tmp = utf16_offset + 2 | 0;
          _tmp$2 = char_count + 1 | 0;
          continue;
        } else {
          _tmp = utf16_offset + 1 | 0;
          _tmp$2 = char_count + 1 | 0;
          continue;
        }
      } else {
        return char_count < n || utf16_offset >= end_offset ? undefined : utf16_offset;
      }
    }
  } else {
    return $panic();
  }
}
function _M0MPC16string6String29offset__of__nth__char_2einner(self, i, start_offset, end_offset) {
  let end_offset$2;
  if (end_offset === undefined) {
    end_offset$2 = self.length;
  } else {
    const _Some = end_offset;
    end_offset$2 = _Some;
  }
  return i >= 0 ? _M0MPC16string6String30offset__of__nth__char__forward(self, i, start_offset, end_offset$2) : _M0MPC16string6String31offset__of__nth__char__backward(self, -i | 0, start_offset, end_offset$2);
}
function _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(self, value) {
  _M0MPB7JSArray4push(self, value);
}
function _M0MPC15array5Array4pushGjE(self, value) {
  _M0MPB7JSArray4push(self, value);
}
function _M0MPC15array5Array4pushGiE(self, value) {
  _M0MPB7JSArray4push(self, value);
}
function _M0FPB36string__contains__code__unit__scalar(str, start, end, code) {
  let _tmp = start;
  while (true) {
    const i = _tmp;
    if (i < end) {
      const _p = str.charCodeAt(i);
      if (_p === code) {
        return true;
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return false;
}
function _M0FPB28string__contains__code__unit(str, start, end, code) {
  return _M0FPB36string__contains__code__unit__scalar(str, start, end, code);
}
function _M0MPC16string10StringView20contains__code__unit(self, code) {
  return _M0FPB28string__contains__code__unit(self.str, self.start, self.end, code);
}
function _M0FPB23build__ascii__char__set(chars) {
  let bits0 = 0;
  let bits1 = 0;
  let bits2 = 0;
  let bits3 = 0;
  const _bind = chars.str;
  const _bind$2 = chars.start;
  const _bind$3 = chars.end;
  let _tmp = _bind$2;
  while (true) {
    const _string_index = _tmp;
    if (_string_index < _bind$3) {
      let _decoded_next_string_index;
      let _decoded_char;
      _L: {
        const _bind$4 = _bind.charCodeAt(_string_index);
        if (_bind$4 >= 55296 && _bind$4 <= 56319 && (_string_index + 1 | 0) < _bind$3) {
          const _bind$5 = _bind.charCodeAt(_string_index + 1 | 0);
          if (_bind$5 >= 56320 && _bind$5 <= 57343) {
            const _tmp$2 = _string_index + 2 | 0;
            const _p = (((Math.imul(_bind$4 - 55296 | 0, 1024) | 0) + _bind$5 | 0) - 56320 | 0) + 65536 | 0;
            _decoded_next_string_index = _tmp$2;
            _decoded_char = _p;
            break _L;
          } else {
            const _tmp$2 = _string_index + 1 | 0;
            const _p = _bind$4;
            _decoded_next_string_index = _tmp$2;
            _decoded_char = _p;
            break _L;
          }
        } else {
          const _tmp$2 = _string_index + 1 | 0;
          const _p = _bind$4;
          _decoded_next_string_index = _tmp$2;
          _decoded_char = _p;
          break _L;
        }
      }
      const code = _decoded_char;
      if (code >>> 0 < 128 >>> 0) {
        const bit = 1 << (code & 31);
        const _bind$4 = code >>> 5 | 0;
        switch (_bind$4) {
          case 0: {
            bits0 = bits0 | bit;
            break;
          }
          case 1: {
            bits1 = bits1 | bit;
            break;
          }
          case 2: {
            bits2 = bits2 | bit;
            break;
          }
          default: {
            bits3 = bits3 | bit;
          }
        }
      } else {
        return undefined;
      }
      _tmp = _decoded_next_string_index;
      continue;
    } else {
      break;
    }
  }
  return { _0: bits0, _1: bits1, _2: bits2, _3: bits3 };
}
function _M0FPB26ascii__char__set__contains(bits0, bits1, bits2, bits3, code) {
  if (code >>> 0 < 128 >>> 0) {
    const bit = 1 << (code & 31);
    const _bind = code >>> 5 | 0;
    switch (_bind) {
      case 0: {
        return (bits0 & bit) !== 0;
      }
      case 1: {
        return (bits1 & bit) !== 0;
      }
      case 2: {
        return (bits2 & bit) !== 0;
      }
      default: {
        return (bits3 & bit) !== 0;
      }
    }
  } else {
    return false;
  }
}
function _M0FPB34string__trim__start__ascii__scalar(str, start, end, bits0, bits1, bits2, bits3) {
  let _tmp = start;
  while (true) {
    const pos = _tmp;
    let _tmp$2;
    if (pos < end) {
      const _p = str.charCodeAt(pos);
      _tmp$2 = _M0FPB26ascii__char__set__contains(bits0, bits1, bits2, bits3, _p);
    } else {
      _tmp$2 = false;
    }
    if (_tmp$2) {
      _tmp = pos + 1 | 0;
      continue;
    } else {
      return pos;
    }
  }
}
function _M0FPB32string__trim__end__ascii__scalar(str, start, end, bits0, bits1, bits2, bits3) {
  let _tmp = end;
  while (true) {
    const pos = _tmp;
    let _tmp$2;
    if (pos > start) {
      const _p = str.charCodeAt(pos - 1 | 0);
      _tmp$2 = _M0FPB26ascii__char__set__contains(bits0, bits1, bits2, bits3, _p);
    } else {
      _tmp$2 = false;
    }
    if (_tmp$2) {
      _tmp = pos - 1 | 0;
      continue;
    } else {
      return pos;
    }
  }
}
function _M0FPB26string__trim__start__ascii(str, start, end, _chars, bits0, bits1, bits2, bits3) {
  return _M0FPB34string__trim__start__ascii__scalar(str, start, end, bits0, bits1, bits2, bits3);
}
function _M0FPB24string__trim__end__ascii(str, start, end, _chars, bits0, bits1, bits2, bits3) {
  return _M0FPB32string__trim__end__ascii__scalar(str, start, end, bits0, bits1, bits2, bits3);
}
function _M0MPC16string10StringView14contains__char(self, c) {
  const len = self.end - self.start | 0;
  if (len > 0) {
    const c$2 = c;
    if (c$2 >= 0 && c$2 <= 65535) {
      return _M0MPC16string10StringView20contains__code__unit(self, c$2 & 65535);
    } else {
      if (c$2 < 0) {
        return false;
      } else {
        if (len >= 2) {
          const adj = c$2 - 65536 | 0;
          const high = 55296 + (adj >> 10) | 0;
          if (high <= 65535) {
            const high$2 = high & 65535;
            const low = (56320 + (adj & 1023) | 0) & 65535;
            let _tmp = 0;
            while (true) {
              const i = _tmp;
              if (i < (len - 1 | 0)) {
                const _p = self.str.charCodeAt(self.start + i | 0);
                if (_p === high$2) {
                  const _p$2 = self.str.charCodeAt(self.start + (i + 1 | 0) | 0);
                  if (_p$2 === low) {
                    return true;
                  }
                  _tmp = i + 2 | 0;
                  continue;
                }
                _tmp = i + 1 | 0;
                continue;
              } else {
                break;
              }
            }
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    }
    return false;
  } else {
    return false;
  }
}
function _M0MPC16string10StringView24trim__start__with__chars(self, chars) {
  let _tmp = self;
  while (true) {
    const x = _tmp;
    if ((x.end - x.start | 0) === 0) {
      return x;
    } else {
      const _c = _M0MPC16string6String16unsafe__char__at(x.str, _M0MPC16string6String29offset__of__nth__char_2einner(x.str, 0, x.start, x.end));
      const _tmp$2 = x.str;
      const _bind = _M0MPC16string6String29offset__of__nth__char_2einner(x.str, 1, x.start, x.end);
      let _tmp$3;
      if (_bind === undefined) {
        _tmp$3 = x.end;
      } else {
        const _Some = _bind;
        _tmp$3 = _Some;
      }
      const _x = new _M0TPC16string10StringView(_tmp$2, _tmp$3, x.end);
      if (_M0MPC16string10StringView14contains__char(chars, _c)) {
        _tmp = _x;
        continue;
      } else {
        return x;
      }
    }
  }
}
function _M0MPC16string10StringView22trim__end__with__chars(self, chars) {
  let _tmp = self;
  while (true) {
    const x = _tmp;
    if ((x.end - x.start | 0) === 0) {
      return x;
    } else {
      const _c = _M0MPC16string6String16unsafe__char__at(x.str, _M0MPC16string6String29offset__of__nth__char_2einner(x.str, -1, x.start, x.end));
      const _x = new _M0TPC16string10StringView(x.str, x.start, _M0MPC16string6String29offset__of__nth__char_2einner(x.str, -1, x.start, x.end));
      if (_M0MPC16string10StringView14contains__char(chars, _c)) {
        _tmp = _x;
        continue;
      } else {
        return x;
      }
    }
  }
}
function _M0MPC16string10StringView12trim_2einner(self, chars) {
  const _bind = _M0FPB23build__ascii__char__set(chars);
  if (_bind === undefined) {
    return _M0MPC16string10StringView22trim__end__with__chars(_M0MPC16string10StringView24trim__start__with__chars(self, chars), chars);
  } else {
    const _Some = _bind;
    const _x = _Some;
    const _bits0 = _x._0;
    const _bits1 = _x._1;
    const _bits2 = _x._2;
    const _bits3 = _x._3;
    const start = _M0FPB26string__trim__start__ascii(self.str, self.start, self.end, chars, _bits0, _bits1, _bits2, _bits3);
    const end = _M0FPB24string__trim__end__ascii(self.str, start, self.end, chars, _bits0, _bits1, _bits2, _bits3);
    return new _M0TPC16string10StringView(self.str, start, end);
  }
}
function _M0MPC16string6String12trim_2einner(self, chars) {
  return _M0MPC16string10StringView12trim_2einner(new _M0TPC16string10StringView(self, 0, self.length), chars);
}
function _M0MPC16string6String4trim(self, chars$46$opt) {
  let chars;
  if (chars$46$opt === undefined) {
    chars = new _M0TPC16string10StringView(_M0MPC16string6String4trimN7_2abindS6861, 0, _M0MPC16string6String4trimN7_2abindS6861.length);
  } else {
    const _Some = chars$46$opt;
    chars = _Some;
  }
  return _M0MPC16string6String12trim_2einner(self, chars);
}
function _M0MPC16string6String3get(self, idx) {
  return idx >= 0 && idx < self.length ? self.charCodeAt(idx) : -1;
}
function _M0IPC16string6StringPB7Compare7compare(self, other) {
  const len = self.length;
  const _bind = $compare_int(len, other.length);
  if (_bind === 0) {
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < len) {
        const _p = self.charCodeAt(i);
        const _p$2 = other.charCodeAt(i);
        const order = $compare_int(_p, _p$2);
        if (order !== 0) {
          return order;
        }
        _tmp = i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return 0;
  } else {
    return _bind;
  }
}
function _M0MPC16option6Option10unwrap__orGRP46heyq026moonjs3src5value7JSValueE(self, default_) {
  if (self === undefined) {
    return default_;
  } else {
    const _Some = self;
    const _t = _Some;
    return _t;
  }
}
function _M0MPC13int3Int20next__power__of__two(self) {
  if (self >= 0) {
    if (self <= 1) {
      return 1;
    }
    if (self > 1073741824) {
      return 1073741824;
    }
    return (2147483647 >> (Math.clz32(self - 1 | 0) - 1 | 0)) + 1 | 0;
  } else {
    return $panic();
  }
}
function _M0IPC16string6StringPB4Hash4hash(self) {
  let acc = (_M0FPB4seed >>> 0) + (374761393 >>> 0) | 0;
  const _bind = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      acc = (acc >>> 0) + (4 >>> 0) | 0;
      const v = self.charCodeAt(i);
      acc = _M0FPB13consume4__acc(acc, v);
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return _M0FPB13finalize__acc(acc);
}
function _M0MPC16double6Double7to__int(self) {
  return self !== self ? 0 : self >= 2147483647 ? 2147483647 : self <= -2147483648 ? -2147483648 : self | 0;
}
function _M0MPC16double6Double5trunc(_tmp) {
  return Math.trunc(_tmp);
}
function _M0MPC16double6Double5floor(_tmp) {
  return Math.floor(_tmp);
}
function _M0IPC16double6DoublePB3Mod3mod(self, other) {
  return _M0MPC16double6Double8mod__ffi(self, other);
}
function _M0MPC15array5Array11unsafe__popGRP46heyq026moonjs3src8compiler16FunctionCompilerE(self) {
  return _M0MPB7JSArray3pop(self);
}
function _M0MPC15array5Array3popGRP46heyq026moonjs3src8compiler16FunctionCompilerE(self) {
  if (self.length === 0) {
    return undefined;
  } else {
    const v = _M0MPC15array5Array11unsafe__popGRP46heyq026moonjs3src8compiler16FunctionCompilerE(self);
    return v;
  }
}
function _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(self, index) {
  const len = self.length;
  return index >= 0 && index < len ? self[index] : $panic();
}
function _M0MPC15array5Array2atGjE(self, index) {
  const len = self.length;
  return index >= 0 && index < len ? self[index] : $panic();
}
function _M0MPC15array5Array3setGRP46heyq026moonjs3src5value7JSValueE(self, index, value) {
  const len = self.length;
  if (index >= 0 && index < len) {
    self[index] = value;
    return;
  } else {
    $panic();
    return;
  }
}
function _M0MPC15array5Array3setGjE(self, index, value) {
  const len = self.length;
  if (index >= 0 && index < len) {
    self[index] = value;
    return;
  } else {
    $panic();
    return;
  }
}
function _M0FPC28internal7strconv10range__errGuE() {
  return new _M0DTPC16result6ResultGuRPB7FailureE3Err(new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure(_M0FPC28internal7strconv15range__err__str));
}
function _M0FPC28internal7strconv11syntax__errGdE() {
  return new _M0DTPC16result6ResultGdRPB7FailureE3Err(new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure(_M0FPC28internal7strconv16syntax__err__str));
}
function _M0FPC28internal7strconv11syntax__errGORPC28internal7strconv6NumberE() {
  return new _M0DTPC16result6ResultGORPC28internal7strconv6NumberRPB7FailureE3Err(new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure(_M0FPC28internal7strconv16syntax__err__str));
}
function _M0FPC28internal7strconv11syntax__errGuE() {
  return new _M0DTPC16result6ResultGuRPB7FailureE3Err(new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure(_M0FPC28internal7strconv16syntax__err__str));
}
function _M0FPC28internal7strconv11syntax__errGRPC16string10StringViewE() {
  return new _M0DTPC16result6ResultGRPC16string10StringViewRPB7FailureE3Err(new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure(_M0FPC28internal7strconv16syntax__err__str));
}
function _M0EPC16string10StringViewPC28internal7strconv12fold__digitsGmE(self, init, f) {
  let _tmp = self;
  let _tmp$2 = init;
  let _tmp$3 = 0;
  while (true) {
    const str = _tmp;
    const ret = _tmp$2;
    const len = _tmp$3;
    _L: {
      if ((str.end - str.start | 0) >= 1) {
        const _x = str.str.charCodeAt(str.start);
        if (_x >= 48 && _x <= 57) {
          const _x$2 = new _M0TPC16string10StringView(str.str, str.start + 1 | 0, str.end);
          _tmp = _x$2;
          _tmp$2 = f(_x - 48 | 0, ret);
          _tmp$3 = len + 1 | 0;
          continue;
        } else {
          if (_x === 95) {
            const _x$2 = new _M0TPC16string10StringView(str.str, str.start + 1 | 0, str.end);
            _tmp = _x$2;
            continue;
          } else {
            break _L;
          }
        }
      } else {
        break _L;
      }
    }
    return { _0: str, _1: ret, _2: len };
  }
}
function _M0FPC28internal7strconv13parse__digits(s, x) {
  return _M0EPC16string10StringViewPC28internal7strconv12fold__digitsGmE(s, x, (digit, acc) => BigInt.asUintN(64, BigInt.asUintN(64, acc * 10n) + BigInt.asUintN(64, BigInt(digit >>> 0))));
}
function _M0FPC28internal7strconv20try__parse__19digits(s, x) {
  let x$2 = x;
  let len = 0;
  let _tmp = s;
  while (true) {
    const s$2 = _tmp;
    let s$3;
    _L: {
      if ((s$2.end - s$2.start | 0) >= 1) {
        const _x = s$2.str.charCodeAt(s$2.start);
        if (_x >= 48 && _x <= 57) {
          const _x$2 = new _M0TPC16string10StringView(s$2.str, s$2.start + 1 | 0, s$2.end);
          if (BigInt.asUintN(64, x$2) < BigInt.asUintN(64, _M0FPC28internal7strconv17min__19digit__int)) {
            len = len + 1 | 0;
            x$2 = BigInt.asUintN(64, BigInt.asUintN(64, x$2 * 10n) + BigInt.asUintN(64, BigInt((_x - 48 | 0) >>> 0)));
            _tmp = _x$2;
            continue;
          } else {
            s$3 = s$2;
            break _L;
          }
        } else {
          if (_x === 95) {
            const _x$2 = new _M0TPC16string10StringView(s$2.str, s$2.start + 1 | 0, s$2.end);
            _tmp = _x$2;
            continue;
          } else {
            s$3 = s$2;
            break _L;
          }
        }
      } else {
        s$3 = s$2;
        break _L;
      }
    }
    return { _0: s$3, _1: x$2, _2: len };
  }
}
function _M0FPC28internal7strconv17parse__scientific(s) {
  let s$2 = s;
  let neg_exp = false;
  let rest;
  let ch;
  _L: {
    _L$2: {
      const _bind = s$2;
      if ((_bind.end - _bind.start | 0) >= 1) {
        const _x = _bind.str.charCodeAt(_bind.start);
        switch (_x) {
          case 43: {
            const _x$2 = new _M0TPC16string10StringView(_bind.str, _bind.start + 1 | 0, _bind.end);
            rest = _x$2;
            ch = _x;
            break _L$2;
          }
          case 45: {
            const _x$3 = new _M0TPC16string10StringView(_bind.str, _bind.start + 1 | 0, _bind.end);
            rest = _x$3;
            ch = _x;
            break _L$2;
          }
        }
      }
      break _L;
    }
    neg_exp = ch === 45;
    s$2 = rest;
  }
  _L$2: {
    const _bind = s$2;
    if ((_bind.end - _bind.start | 0) >= 1) {
      const _x = _bind.str.charCodeAt(_bind.start);
      if (_x >= 48 && _x <= 57) {
        const _bind$2 = _M0EPC16string10StringViewPC28internal7strconv12fold__digitsGmE(s$2, _M0FPC28internal7strconv17parse__scientificN8exp__numS354, (digit, exp_num) => BigInt.asIntN(64, exp_num) < BigInt.asIntN(64, 65536n) ? BigInt.asUintN(64, BigInt.asUintN(64, 10n * exp_num) + BigInt.asUintN(64, BigInt(digit))) : exp_num);
        const _s = _bind$2._0;
        const _exp_num = _bind$2._1;
        return neg_exp ? { _0: _s, _1: BigInt.asUintN(64, -_exp_num) } : { _0: _s, _1: _exp_num };
      } else {
        break _L$2;
      }
    } else {
      break _L$2;
    }
  }
  return undefined;
}
function _M0FPC28internal7strconv13parse__number(s) {
  let s$2;
  let negative;
  _L: {
    let rest;
    _L$2: {
      if ((s.end - s.start | 0) >= 1) {
        const _x = s.str.charCodeAt(s.start);
        switch (_x) {
          case 45: {
            const _x$2 = new _M0TPC16string10StringView(s.str, s.start + 1 | 0, s.end);
            s$2 = _x$2;
            negative = true;
            break _L;
          }
          case 43: {
            const _x$3 = new _M0TPC16string10StringView(s.str, s.start + 1 | 0, s.end);
            rest = _x$3;
            break _L$2;
          }
          default: {
            rest = s;
            break _L$2;
          }
        }
      } else {
        rest = s;
        break _L$2;
      }
    }
    s$2 = rest;
    negative = false;
    break _L;
  }
  if ((s$2.end - s$2.start | 0) === 0) {
    return new _M0DTPC16result6ResultGORPC28internal7strconv6NumberRPC15error5ErrorE2Ok(undefined);
  }
  const _bind = _M0FPC28internal7strconv13parse__digits(s$2, 0n);
  const _s = _bind._0;
  const _mantissa = _bind._1;
  const _consumed = _bind._2;
  let mantissa = _mantissa;
  let s$3 = _s;
  let n_digits = _consumed;
  let n_after_dot = 0;
  let exponent = 0n;
  const _bind$2 = s$3;
  if ((_bind$2.end - _bind$2.start | 0) >= 1) {
    const _x = _bind$2.str.charCodeAt(_bind$2.start);
    if (_x === 46) {
      const _x$2 = new _M0TPC16string10StringView(_bind$2.str, _bind$2.start + 1 | 0, _bind$2.end);
      s$3 = _x$2;
      const _bind$3 = _M0FPC28internal7strconv13parse__digits(s$3, mantissa);
      const _new_s = _bind$3._0;
      const _new_mantissa = _bind$3._1;
      const _consumed_digit = _bind$3._2;
      s$3 = _new_s;
      mantissa = _new_mantissa;
      n_after_dot = _consumed_digit;
      exponent = BigInt.asUintN(64, -BigInt.asUintN(64, BigInt(n_after_dot)));
    }
  }
  n_digits = n_digits + n_after_dot | 0;
  if (n_digits === 0) {
    return new _M0DTPC16result6ResultGORPC28internal7strconv6NumberRPC15error5ErrorE2Ok(undefined);
  }
  let exp_number = 0n;
  let rest;
  _L$2: {
    _L$3: {
      const _bind$3 = s$3;
      if ((_bind$3.end - _bind$3.start | 0) >= 1) {
        const _x = _bind$3.str.charCodeAt(_bind$3.start);
        switch (_x) {
          case 101: {
            const _x$2 = new _M0TPC16string10StringView(_bind$3.str, _bind$3.start + 1 | 0, _bind$3.end);
            rest = _x$2;
            break _L$3;
          }
          case 69: {
            const _x$3 = new _M0TPC16string10StringView(_bind$3.str, _bind$3.start + 1 | 0, _bind$3.end);
            rest = _x$3;
            break _L$3;
          }
        }
      }
      break _L$2;
    }
    const _bind$3 = _M0FPC28internal7strconv17parse__scientific(rest);
    let _bind$4;
    if (_bind$3 === undefined) {
      return new _M0DTPC16result6ResultGORPC28internal7strconv6NumberRPC15error5ErrorE2Ok(undefined);
    } else {
      const _Some = _bind$3;
      _bind$4 = _Some;
    }
    const _new_s = _bind$4._0;
    const _exp_number_val = _bind$4._1;
    s$3 = _new_s;
    exp_number = _exp_number_val;
    exponent = BigInt.asUintN(64, exponent + exp_number);
  }
  const _bind$3 = s$3;
  if ((_bind$3.end - _bind$3.start | 0) === 0) {
    if (n_digits <= 19) {
      return new _M0DTPC16result6ResultGORPC28internal7strconv6NumberRPC15error5ErrorE2Ok(new _M0TPC28internal7strconv6Number(exponent, mantissa, negative, false));
    }
    n_digits = n_digits - 19 | 0;
    let many_digits = false;
    let _tmp = s.str;
    let _tmp$2 = s.start;
    let _tmp$3 = s.end;
    _L$3: while (true) {
      const s_str = _tmp;
      const s_start = _tmp$2;
      const s_end = _tmp$3;
      _L$4: {
        let rest$2;
        let ch;
        _L$5: {
          if ((s_end - s_start | 0) >= 1) {
            const _x = s_str.charCodeAt(s_start);
            switch (_x) {
              case 48: {
                const _x$2 = new _M0TPC16string10StringView(s_str, s_start + 1 | 0, s_end);
                rest$2 = _x$2;
                ch = _x;
                break _L$5;
              }
              case 46: {
                const _x$3 = new _M0TPC16string10StringView(s_str, s_start + 1 | 0, s_end);
                rest$2 = _x$3;
                ch = _x;
                break _L$5;
              }
              default: {
                break _L$4;
              }
            }
          } else {
            break _L$4;
          }
        }
        n_digits = n_digits - ((ch - 46 | 0) / 2 | 0) | 0;
        _tmp = rest$2.str;
        _tmp$2 = rest$2.start;
        _tmp$3 = rest$2.end;
        continue;
      }
      break;
    }
    let mantissa$2 = mantissa;
    if (n_digits > 0) {
      many_digits = true;
      mantissa$2 = 0n;
      const _bind$4 = _M0FPC28internal7strconv20try__parse__19digits(s, mantissa$2);
      const _s$2 = _bind$4._0;
      const _new_mantissa = _bind$4._1;
      const _consumed_digit = _bind$4._2;
      mantissa$2 = _new_mantissa;
      let _tmp$4;
      if (BigInt.asUintN(64, mantissa$2) >= BigInt.asUintN(64, _M0FPC28internal7strconv17min__19digit__int)) {
        _tmp$4 = _consumed_digit;
      } else {
        if (_M0MPC16string6String24char__length__ge_2einner(_s$2.str, 1, _s$2.start, _s$2.end)) {
          const _tmp$5 = _s$2.str;
          const _bind$5 = _M0MPC16string6String29offset__of__nth__char_2einner(_s$2.str, 1, _s$2.start, _s$2.end);
          let _tmp$6;
          if (_bind$5 === undefined) {
            _tmp$6 = _s$2.end;
          } else {
            const _Some = _bind$5;
            _tmp$6 = _Some;
          }
          const _x = new _M0TPC16string10StringView(_tmp$5, _tmp$6, _s$2.end);
          const _bind$6 = _M0FPC28internal7strconv20try__parse__19digits(_x, mantissa$2);
          const _new_mantissa$2 = _bind$6._1;
          const _consumed_digit$2 = _bind$6._2;
          mantissa$2 = _new_mantissa$2;
          _tmp$4 = _consumed_digit$2;
        } else {
          return new _M0DTPC16result6ResultGORPC28internal7strconv6NumberRPC15error5ErrorE2Ok(undefined);
        }
      }
      exponent = BigInt.asUintN(64, BigInt(_tmp$4));
      exponent = BigInt.asUintN(64, exponent + exp_number);
    }
    return new _M0DTPC16result6ResultGORPC28internal7strconv6NumberRPC15error5ErrorE2Ok(new _M0TPC28internal7strconv6Number(exponent, mantissa$2, negative, many_digits));
  } else {
    return _M0FPC28internal7strconv11syntax__errGORPC28internal7strconv6NumberE();
  }
}
function _M0FPC28internal7strconv15parse__inf__nan(rest) {
  let pos;
  let rest$2;
  _L: {
    let rest$3;
    _L$2: {
      if ((rest.end - rest.start | 0) >= 1) {
        const _x = rest.str.charCodeAt(rest.start);
        switch (_x) {
          case 45: {
            const _x$2 = new _M0TPC16string10StringView(rest.str, rest.start + 1 | 0, rest.end);
            pos = false;
            rest$2 = _x$2;
            break _L;
          }
          case 43: {
            const _x$3 = new _M0TPC16string10StringView(rest.str, rest.start + 1 | 0, rest.end);
            rest$3 = _x$3;
            break _L$2;
          }
          default: {
            rest$3 = rest;
            break _L$2;
          }
        }
      } else {
        rest$3 = rest;
        break _L$2;
      }
    }
    pos = true;
    rest$2 = rest$3;
    break _L;
  }
  let _cursor_295 = 0;
  const _input_end_297 = rest$2.end - rest$2.start | 0;
  const _start_296 = _cursor_295;
  let _accept_state_298 = -1;
  let _match_end_299 = -1;
  let _state_300 = 2;
  while (true) {
    if (_state_300 !== 14) {
      if (_state_300 < 2) {
        _accept_state_298 = _state_300;
        _match_end_299 = _cursor_295;
      }
      const _tmp = Math.imul(_state_300, 8) | 0;
      let _next_char_303;
      if (_cursor_295 < _input_end_297) {
        const _char_302 = rest$2.str.charCodeAt(rest$2.start + _cursor_295 | 0);
        _cursor_295 = _cursor_295 + 1 | 0;
        _next_char_303 = _char_302;
      } else {
        _next_char_303 = -1;
      }
      const _p = _tmp + (_next_char_303 < 90 ? (_next_char_303 < 73 ? (_next_char_303 < 66 ? (_next_char_303 < 0 ? 0 : _next_char_303 > 64 ? 1 : 7) : _next_char_303 > 69 ? (_next_char_303 < 71 ? 2 : 7) : 7) : _next_char_303 > 73 ? (_next_char_303 < 84 ? (_next_char_303 < 78 ? 7 : _next_char_303 > 78 ? 7 : 4) : _next_char_303 > 84 ? (_next_char_303 < 89 ? 7 : 6) : 5) : 3) : _next_char_303 > 96 ? (_next_char_303 < 110 ? (_next_char_303 < 103 ? (_next_char_303 < 98 ? 1 : _next_char_303 > 101 ? 2 : 7) : _next_char_303 > 104 ? (_next_char_303 < 106 ? 3 : 7) : 7) : _next_char_303 > 110 ? (_next_char_303 < 117 ? (_next_char_303 < 116 ? 7 : 5) : _next_char_303 > 120 ? (_next_char_303 < 122 ? 6 : 7) : 7) : 4) : 7) | 0;
      _state_300 = _M0FPC28internal7strconv15parse__inf__nanN25_2atransition__table__304S312[_p];
      continue;
    } else {
      break;
    }
  }
  const _bind = _accept_state_298;
  switch (_bind) {
    case 0: {
      _cursor_295 = _match_end_299;
      return new _M0DTPC16result6ResultGdRPC15error5ErrorE2Ok(_M0FPC16double14not__a__number);
    }
    case 1: {
      _cursor_295 = _match_end_299;
      return pos ? new _M0DTPC16result6ResultGdRPC15error5ErrorE2Ok(_M0FPC16double8infinity) : new _M0DTPC16result6ResultGdRPC15error5ErrorE2Ok(_M0FPC16double13neg__infinity);
    }
    default: {
      _cursor_295 = _start_296;
      return _M0FPC28internal7strconv11syntax__errGdE();
    }
  }
}
function _M0FPC28internal7strconv12checked__mul(a, b) {
  if (BigInt.asUintN(64, a) === BigInt.asUintN(64, 0n) || BigInt.asUintN(64, b) === BigInt.asUintN(64, 0n)) {
    return _M0FPC28internal7strconv12checked__mulN6constrS1164;
  }
  if (BigInt.asUintN(64, a) === BigInt.asUintN(64, 1n)) {
    return b;
  }
  if (BigInt.asUintN(64, b) === BigInt.asUintN(64, 1n)) {
    return a;
  }
  if ($i64_clz(b) === 0 || $i64_clz(a) === 0) {
    return undefined;
  }
  if (b === 0n) {
    $panic();
  }
  const quotient = BigInt.asUintN(64, BigInt.asUintN(64, 18446744073709551615n) / BigInt.asUintN(64, b));
  if (BigInt.asUintN(64, a) > BigInt.asUintN(64, quotient)) {
    return undefined;
  }
  return BigInt.asUintN(64, a * b);
}
function _M0FPC28internal7strconv17check__underscore(str) {
  if (_M0MPC16string10StringView20contains__code__unit(str, 95)) {
    let rest;
    if ((str.end - str.start | 0) >= 1) {
      const _x = str.str.charCodeAt(str.start);
      switch (_x) {
        case 43: {
          const _x$2 = new _M0TPC16string10StringView(str.str, str.start + 1 | 0, str.end);
          rest = _x$2;
          break;
        }
        case 45: {
          const _x$3 = new _M0TPC16string10StringView(str.str, str.start + 1 | 0, str.end);
          rest = _x$3;
          break;
        }
        default: {
          rest = str;
        }
      }
    } else {
      rest = str;
    }
    let rest$2;
    let allow_underscore;
    let hex;
    _L: {
      let _cursor_213 = 0;
      const _input_end_215 = rest.end - rest.start | 0;
      const _start_214 = _cursor_213;
      let _accept_state_216 = -1;
      let _match_end_217 = -1;
      let _state_218 = 3;
      while (true) {
        if (_state_218 !== 5) {
          if (_state_218 < 3) {
            _accept_state_216 = _state_218;
            _match_end_217 = _cursor_213;
          }
          const _tmp = Math.imul(_state_218, 5) | 0;
          let _next_char_221;
          if (_cursor_213 < _input_end_215) {
            const _char_220 = rest.str.charCodeAt(rest.start + _cursor_213 | 0);
            _cursor_213 = _cursor_213 + 1 | 0;
            _next_char_221 = _char_220;
          } else {
            _next_char_221 = -1;
          }
          const _p = _tmp + (_next_char_221 < 88 ? (_next_char_221 < 66 ? (_next_char_221 < 48 ? 4 : _next_char_221 > 48 ? 4 : 0) : _next_char_221 > 66 ? (_next_char_221 < 79 ? 4 : _next_char_221 > 79 ? 4 : 2) : 1) : _next_char_221 > 88 ? (_next_char_221 < 111 ? (_next_char_221 < 98 ? 4 : _next_char_221 > 98 ? 4 : 1) : _next_char_221 > 111 ? (_next_char_221 < 120 ? 4 : _next_char_221 > 120 ? 4 : 3) : 2) : 3) | 0;
          _state_218 = _M0FPC28internal7strconv17check__underscoreN25_2atransition__table__222S230[_p];
          continue;
        } else {
          break;
        }
      }
      const _bind = _accept_state_216;
      switch (_bind) {
        case 0: {
          _cursor_213 = _match_end_217;
          const rest$3 = _M0MPC16string10StringView12view_2einner(rest, _match_end_217, _input_end_215);
          rest$2 = rest$3;
          allow_underscore = true;
          hex = false;
          break _L;
        }
        case 1: {
          _cursor_213 = _match_end_217;
          const rest$4 = _M0MPC16string10StringView12view_2einner(rest, _match_end_217, _input_end_215);
          rest$2 = rest$4;
          allow_underscore = true;
          hex = false;
          break _L;
        }
        case 2: {
          _cursor_213 = _match_end_217;
          const rest$5 = _M0MPC16string10StringView12view_2einner(rest, _match_end_217, _input_end_215);
          rest$2 = rest$5;
          allow_underscore = true;
          hex = true;
          break _L;
        }
        default: {
          _cursor_213 = _start_214;
          rest$2 = rest;
          allow_underscore = false;
          hex = false;
          break _L;
        }
      }
    }
    let _tmp = rest$2.str;
    let _tmp$2 = rest$2.start;
    let _tmp$3 = rest$2.end;
    let _tmp$4 = allow_underscore;
    let _tmp$5 = false;
    while (true) {
      const rest_str = _tmp;
      const rest_start = _tmp$2;
      const rest_end = _tmp$3;
      const allow_underscore$2 = _tmp$4;
      const follow_underscore = _tmp$5;
      let rest$3;
      _L$2: {
        _L$3: {
          let rest$4;
          _L$4: {
            _L$5: {
              let rest$5;
              _L$6: {
                let rest$6;
                _L$7: {
                  if ((rest_end - rest_start | 0) === 0) {
                    return true;
                  } else {
                    if ((rest_end - rest_start | 0) === 1) {
                      const _x = rest_str.charCodeAt(rest_start);
                      if (_x === 95) {
                        return false;
                      } else {
                        if (_x >= 48 && _x <= 57) {
                          const _x$2 = new _M0TPC16string10StringView(rest_str, rest_start + 1 | 0, rest_end);
                          rest$6 = _x$2;
                          break _L$7;
                        } else {
                          if (_x >= 97 && _x <= 102) {
                            const _x$2 = new _M0TPC16string10StringView(rest_str, rest_start + 1 | 0, rest_end);
                            if (hex) {
                              rest$5 = _x$2;
                              break _L$6;
                            } else {
                              if (_x === 101) {
                                if (follow_underscore === true) {
                                  break _L$5;
                                } else {
                                  rest$4 = _x$2;
                                  break _L$4;
                                }
                              } else {
                                if (follow_underscore === true) {
                                  break _L$3;
                                } else {
                                  rest$3 = _x$2;
                                  break _L$2;
                                }
                              }
                            }
                          } else {
                            if (_x >= 65 && _x <= 70) {
                              const _x$2 = new _M0TPC16string10StringView(rest_str, rest_start + 1 | 0, rest_end);
                              if (hex) {
                                rest$5 = _x$2;
                                break _L$6;
                              } else {
                                if (_x === 69) {
                                  if (follow_underscore === true) {
                                    break _L$5;
                                  } else {
                                    rest$4 = _x$2;
                                    break _L$4;
                                  }
                                } else {
                                  if (follow_underscore === true) {
                                    break _L$3;
                                  } else {
                                    rest$3 = _x$2;
                                    break _L$2;
                                  }
                                }
                              }
                            } else {
                              if (_x === 46) {
                                if (follow_underscore === true) {
                                  break _L$5;
                                } else {
                                  const _x$2 = new _M0TPC16string10StringView(rest_str, rest_start + 1 | 0, rest_end);
                                  rest$4 = _x$2;
                                  break _L$4;
                                }
                              } else {
                                if (_x === 43) {
                                  if (follow_underscore === true) {
                                    break _L$5;
                                  } else {
                                    const _x$2 = new _M0TPC16string10StringView(rest_str, rest_start + 1 | 0, rest_end);
                                    rest$4 = _x$2;
                                    break _L$4;
                                  }
                                } else {
                                  if (_x === 45) {
                                    if (follow_underscore === true) {
                                      break _L$5;
                                    } else {
                                      const _x$2 = new _M0TPC16string10StringView(rest_str, rest_start + 1 | 0, rest_end);
                                      rest$4 = _x$2;
                                      break _L$4;
                                    }
                                  } else {
                                    if (follow_underscore === true) {
                                      break _L$3;
                                    } else {
                                      const _bind = _M0MPC16string6String29offset__of__nth__char_2einner(rest_str, 1, rest_start, rest_end);
                                      let _tmp$6;
                                      if (_bind === undefined) {
                                        _tmp$6 = rest_end;
                                      } else {
                                        const _Some = _bind;
                                        _tmp$6 = _Some;
                                      }
                                      const _x$2 = new _M0TPC16string10StringView(rest_str, _tmp$6, rest_end);
                                      rest$3 = _x$2;
                                      break _L$2;
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    } else {
                      const _x = rest_str.charCodeAt(rest_start);
                      if (_x === 95) {
                        if (allow_underscore$2 === false) {
                          return false;
                        } else {
                          const _bind = rest_start + 1 | 0;
                          _tmp$2 = _bind;
                          _tmp$4 = false;
                          _tmp$5 = true;
                          continue;
                        }
                      } else {
                        if (_x >= 48 && _x <= 57) {
                          const _x$2 = new _M0TPC16string10StringView(rest_str, rest_start + 1 | 0, rest_end);
                          rest$6 = _x$2;
                          break _L$7;
                        } else {
                          if (_x >= 97 && _x <= 102) {
                            const _x$2 = new _M0TPC16string10StringView(rest_str, rest_start + 1 | 0, rest_end);
                            if (hex) {
                              rest$5 = _x$2;
                              break _L$6;
                            } else {
                              if (_x === 101) {
                                if (follow_underscore === true) {
                                  break _L$5;
                                } else {
                                  rest$4 = _x$2;
                                  break _L$4;
                                }
                              } else {
                                if (follow_underscore === true) {
                                  break _L$3;
                                } else {
                                  rest$3 = _x$2;
                                  break _L$2;
                                }
                              }
                            }
                          } else {
                            if (_x >= 65 && _x <= 70) {
                              const _x$2 = new _M0TPC16string10StringView(rest_str, rest_start + 1 | 0, rest_end);
                              if (hex) {
                                rest$5 = _x$2;
                                break _L$6;
                              } else {
                                if (_x === 69) {
                                  if (follow_underscore === true) {
                                    break _L$5;
                                  } else {
                                    rest$4 = _x$2;
                                    break _L$4;
                                  }
                                } else {
                                  if (follow_underscore === true) {
                                    break _L$3;
                                  } else {
                                    rest$3 = _x$2;
                                    break _L$2;
                                  }
                                }
                              }
                            } else {
                              if (_x === 46) {
                                if (follow_underscore === true) {
                                  break _L$5;
                                } else {
                                  const _x$2 = new _M0TPC16string10StringView(rest_str, rest_start + 1 | 0, rest_end);
                                  rest$4 = _x$2;
                                  break _L$4;
                                }
                              } else {
                                if (_x === 43) {
                                  if (follow_underscore === true) {
                                    break _L$5;
                                  } else {
                                    const _x$2 = new _M0TPC16string10StringView(rest_str, rest_start + 1 | 0, rest_end);
                                    rest$4 = _x$2;
                                    break _L$4;
                                  }
                                } else {
                                  if (_x === 45) {
                                    if (follow_underscore === true) {
                                      break _L$5;
                                    } else {
                                      const _x$2 = new _M0TPC16string10StringView(rest_str, rest_start + 1 | 0, rest_end);
                                      rest$4 = _x$2;
                                      break _L$4;
                                    }
                                  } else {
                                    if (follow_underscore === true) {
                                      break _L$3;
                                    } else {
                                      const _bind = _M0MPC16string6String29offset__of__nth__char_2einner(rest_str, 1, rest_start, rest_end);
                                      let _tmp$6;
                                      if (_bind === undefined) {
                                        _tmp$6 = rest_end;
                                      } else {
                                        const _Some = _bind;
                                        _tmp$6 = _Some;
                                      }
                                      const _x$2 = new _M0TPC16string10StringView(rest_str, _tmp$6, rest_end);
                                      rest$3 = _x$2;
                                      break _L$2;
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
                _tmp = rest$6.str;
                _tmp$2 = rest$6.start;
                _tmp$3 = rest$6.end;
                _tmp$4 = true;
                _tmp$5 = false;
                continue;
              }
              _tmp = rest$5.str;
              _tmp$2 = rest$5.start;
              _tmp$3 = rest$5.end;
              _tmp$4 = true;
              _tmp$5 = false;
              continue;
            }
            return false;
          }
          _tmp = rest$4.str;
          _tmp$2 = rest$4.start;
          _tmp$3 = rest$4.end;
          _tmp$4 = false;
          _tmp$5 = false;
          continue;
        }
        return false;
      }
      _tmp = rest$3.str;
      _tmp$2 = rest$3.start;
      _tmp$3 = rest$3.end;
      _tmp$4 = false;
      _tmp$5 = false;
      continue;
    }
  } else {
    return true;
  }
}
function _M0FPC28internal7strconv14eisel__umul128(a, b) {
  const a_lo = BigInt.asUintN(64, a & 4294967295n);
  const a_hi = BigInt.asUintN(64, BigInt.asUintN(64, a) >> BigInt(32 & 63));
  const b_lo = BigInt.asUintN(64, b & 4294967295n);
  const b_hi = BigInt.asUintN(64, BigInt.asUintN(64, b) >> BigInt(32 & 63));
  const x = BigInt.asUintN(64, a_lo * b_lo);
  const y = BigInt.asUintN(64, BigInt.asUintN(64, a_hi * b_lo) + BigInt.asUintN(64, BigInt.asUintN(64, x) >> BigInt(32 & 63)));
  const z = BigInt.asUintN(64, BigInt.asUintN(64, a_lo * b_hi) + BigInt.asUintN(64, y & 4294967295n));
  const hi = BigInt.asUintN(64, BigInt.asUintN(64, BigInt.asUintN(64, a_hi * b_hi) + BigInt.asUintN(64, BigInt.asUintN(64, y) >> BigInt(32 & 63))) + BigInt.asUintN(64, BigInt.asUintN(64, z) >> BigInt(32 & 63)));
  return new _M0TPC28internal7strconv12EiselProduct(BigInt.asUintN(64, a * b), hi);
}
function _M0FPC28internal7strconv20try__eisel__lemire64(mantissa, exponent, negative) {
  if (BigInt.asUintN(64, mantissa) === BigInt.asUintN(64, 0n)) {
    return negative ? $i64_reinterpret_f64(9223372036854775808n) : 0;
  }
  if (BigInt.asIntN(64, exponent) < BigInt.asIntN(64, 18446744073709551268n) || BigInt.asIntN(64, exponent) > BigInt.asIntN(64, 347n)) {
    return _M0FPC16double14not__a__number;
  }
  const exponent$2 = Number(BigInt.asIntN(32, exponent)) | 0;
  const table_index = Math.imul(exponent$2 - -348 | 0, 2) | 0;
  const pow_hi = table_index >>> 0 < _M0FPC28internal7strconv27eisel__lemire__pow10__table.length ? _M0FPC28internal7strconv27eisel__lemire__pow10__table[table_index] : $oob();
  const _p = table_index + 1 | 0;
  const pow_lo = _p >>> 0 < _M0FPC28internal7strconv27eisel__lemire__pow10__table.length ? _M0FPC28internal7strconv27eisel__lemire__pow10__table[_p] : $oob();
  const pow_exp2 = 1 + (Math.imul(exponent$2, 108853) >> 15) | 0;
  const leading_zeros = $i64_clz(mantissa);
  const normalized = BigInt.asUintN(64, mantissa << BigInt(leading_zeros & 63));
  let result_exp2 = ((pow_exp2 + 63 | 0) + 1023 | 0) - leading_zeros | 0;
  const product = _M0FPC28internal7strconv14eisel__umul128(normalized, pow_hi);
  let product_hi = product.hi;
  let product_lo = product.lo;
  if (BigInt.asUintN(64, BigInt.asUintN(64, product_hi & 511n)) === BigInt.asUintN(64, 511n) && BigInt.asUintN(64, BigInt.asUintN(64, product_lo + normalized)) < BigInt.asUintN(64, normalized)) {
    const wider = _M0FPC28internal7strconv14eisel__umul128(normalized, pow_lo);
    let merged_hi = product_hi;
    const merged_lo = BigInt.asUintN(64, product_lo + wider.hi);
    if (BigInt.asUintN(64, merged_lo) < BigInt.asUintN(64, product_lo)) {
      merged_hi = BigInt.asUintN(64, merged_hi + 1n);
    }
    if (BigInt.asUintN(64, BigInt.asUintN(64, merged_hi & 511n)) === BigInt.asUintN(64, 511n) && (BigInt.asUintN(64, BigInt.asUintN(64, merged_lo + 1n)) === BigInt.asUintN(64, 0n) && BigInt.asUintN(64, BigInt.asUintN(64, wider.lo + normalized)) < BigInt.asUintN(64, normalized))) {
      return _M0FPC16double14not__a__number;
    }
    product_hi = merged_hi;
    product_lo = merged_lo;
  }
  const top_bit = Number(BigInt.asIntN(32, BigInt.asUintN(64, BigInt.asUintN(64, product_hi) >> BigInt(63 & 63)))) | 0;
  let result_mantissa = BigInt.asUintN(64, BigInt.asUintN(64, product_hi) >> BigInt(top_bit + 9 & 63));
  result_exp2 = result_exp2 - (1 - top_bit | 0) | 0;
  if (BigInt.asUintN(64, product_lo) === BigInt.asUintN(64, 0n) && (BigInt.asUintN(64, BigInt.asUintN(64, product_hi & 511n)) === BigInt.asUintN(64, 0n) && BigInt.asUintN(64, BigInt.asUintN(64, result_mantissa & 3n)) === BigInt.asUintN(64, 1n))) {
    return _M0FPC16double14not__a__number;
  }
  result_mantissa = BigInt.asUintN(64, result_mantissa + BigInt.asUintN(64, result_mantissa & 1n));
  result_mantissa = BigInt.asUintN(64, BigInt.asUintN(64, result_mantissa) >> BigInt(1 & 63));
  if (BigInt.asUintN(64, BigInt.asUintN(64, BigInt.asUintN(64, result_mantissa) >> BigInt(53 & 63))) > BigInt.asUintN(64, 0n)) {
    result_mantissa = BigInt.asUintN(64, BigInt.asUintN(64, result_mantissa) >> BigInt(1 & 63));
    result_exp2 = result_exp2 + 1 | 0;
  }
  if (result_exp2 <= 0 || result_exp2 >= 2047) {
    return _M0FPC16double14not__a__number;
  }
  const exponent_bits = BigInt.asUintN(64, BigInt.asUintN(64, BigInt(result_exp2 >>> 0)) << BigInt(52 & 63));
  let result_bits = BigInt.asUintN(64, exponent_bits | BigInt.asUintN(64, result_mantissa & 4503599627370495n));
  if (negative) {
    result_bits = BigInt.asUintN(64, result_bits | 9223372036854775808n);
  }
  return $i64_reinterpret_f64(result_bits);
}
function _M0MPC28internal7strconv7Decimal9new__priv() {
  return new _M0TPC28internal7strconv7Decimal($makebytes(800, 0), 0, 0, false, false, 0);
}
function _M0MPC28internal7strconv7Decimal4trim(self) {
  while (true) {
    let _tmp;
    if (self.digits_num > 0) {
      const _tmp$2 = self.digits;
      const _tmp$3 = self.digits_num - 1 | 0;
      const _p = _tmp$3 >>> 0 < _tmp$2.length ? _tmp$2[_tmp$3] : $oob();
      const _p$2 = 0;
      _tmp = _p === _p$2;
    } else {
      _tmp = false;
    }
    if (_tmp) {
      self.digits_num = self.digits_num - 1 | 0;
      continue;
    } else {
      break;
    }
  }
  if (self.digits_num === 0) {
    self.decimal_point = 0;
    return;
  } else {
    return;
  }
}
function _M0FPC28internal7strconv26parse__decimal__from__view(str) {
  const d = _M0MPC28internal7strconv7Decimal9new__priv();
  let has_dp = false;
  let has_digits = false;
  let rest;
  _L: {
    _L$2: {
      if ((str.end - str.start | 0) >= 1) {
        const _x = str.str.charCodeAt(str.start);
        switch (_x) {
          case 45: {
            const _x$2 = new _M0TPC16string10StringView(str.str, str.start + 1 | 0, str.end);
            d.negative = true;
            rest = _x$2;
            break;
          }
          case 43: {
            rest = new _M0TPC16string10StringView(str.str, str.start + 1 | 0, str.end);
            break;
          }
          default: {
            break _L$2;
          }
        }
      } else {
        break _L$2;
      }
      break _L;
    }
    rest = str;
  }
  let rest$2;
  let _tmp = rest;
  while (true) {
    const rest$3 = _tmp;
    let rest$4;
    _L$2: {
      _L$3: {
        if ((rest$3.end - rest$3.start | 0) >= 1) {
          const _x = rest$3.str.charCodeAt(rest$3.start);
          if (_x === 95) {
            const _x$2 = new _M0TPC16string10StringView(rest$3.str, rest$3.start + 1 | 0, rest$3.end);
            _tmp = _x$2;
            continue;
          } else {
            if (_x === 46) {
              const _x$2 = new _M0TPC16string10StringView(rest$3.str, rest$3.start + 1 | 0, rest$3.end);
              if (!has_dp) {
                has_dp = true;
                d.decimal_point = d.digits_num;
                _tmp = _x$2;
                continue;
              } else {
                const _bind = _M0FPC28internal7strconv11syntax__errGuE();
                if (_bind.$tag === 1) {
                  const _ok = _bind;
                  _ok._0;
                } else {
                  return _bind;
                }
              }
            } else {
              if (_x >= 48 && _x <= 57) {
                const _x$2 = new _M0TPC16string10StringView(rest$3.str, rest$3.start + 1 | 0, rest$3.end);
                has_digits = true;
                if (_x === 48 && d.digits_num === 0) {
                  d.decimal_point = d.decimal_point - 1 | 0;
                  _tmp = _x$2;
                  continue;
                }
                if (d.digits_num < d.digits.length) {
                  const _tmp$2 = d.digits;
                  const _tmp$3 = d.digits_num;
                  if (_tmp$3 >>> 0 < _tmp$2.length) {
                    _tmp$2[_tmp$3] = (_x - 48 | 0) & 255;
                  } else {
                    $oob();
                  }
                  d.digits_num = d.digits_num + 1 | 0;
                } else {
                  if (!has_dp) {
                    d.overflowed = d.overflowed + 1 | 0;
                  }
                  if (_x !== 48) {
                    d.truncated = true;
                  }
                }
                _tmp = _x$2;
                continue;
              } else {
                rest$4 = rest$3;
                break _L$3;
              }
            }
          }
        } else {
          rest$4 = rest$3;
          break _L$3;
        }
        break _L$2;
      }
      rest$2 = rest$4;
      break;
    }
    continue;
  }
  if (has_digits) {
    if (!has_dp) {
      d.decimal_point = d.digits_num;
    }
    let rest$3;
    let rest$4;
    _L$2: {
      _L$3: {
        if ((rest$2.end - rest$2.start | 0) >= 1) {
          const _x = rest$2.str.charCodeAt(rest$2.start);
          switch (_x) {
            case 101: {
              const _x$2 = new _M0TPC16string10StringView(rest$2.str, rest$2.start + 1 | 0, rest$2.end);
              rest$4 = _x$2;
              break _L$3;
            }
            case 69: {
              const _x$3 = new _M0TPC16string10StringView(rest$2.str, rest$2.start + 1 | 0, rest$2.end);
              rest$4 = _x$3;
              break _L$3;
            }
            default: {
              rest$3 = rest$2;
            }
          }
        } else {
          rest$3 = rest$2;
        }
        break _L$2;
      }
      let exp_sign = 1;
      let rest$5;
      if ((rest$4.end - rest$4.start | 0) >= 1) {
        const _x = rest$4.str.charCodeAt(rest$4.start);
        switch (_x) {
          case 43: {
            rest$5 = new _M0TPC16string10StringView(rest$4.str, rest$4.start + 1 | 0, rest$4.end);
            break;
          }
          case 45: {
            const _x$2 = new _M0TPC16string10StringView(rest$4.str, rest$4.start + 1 | 0, rest$4.end);
            exp_sign = -1;
            rest$5 = _x$2;
            break;
          }
          default: {
            rest$5 = rest$4;
          }
        }
      } else {
        rest$5 = rest$4;
      }
      _L$4: {
        _L$5: {
          if ((rest$5.end - rest$5.start | 0) >= 1) {
            const _x = rest$5.str.charCodeAt(rest$5.start);
            if (_x >= 48 && _x <= 57) {
              const effective_dp = d.decimal_point + d.overflowed | 0;
              const exp_limit = exp_sign > 0 ? (effective_dp < 311 ? 311 - effective_dp | 0 : 0) : effective_dp > -331 ? effective_dp + 331 | 0 : 0;
              let exp = 0;
              let rest$6;
              let _tmp$2 = rest$5;
              while (true) {
                const rest$7 = _tmp$2;
                let rest$8;
                _L$6: {
                  if ((rest$7.end - rest$7.start | 0) >= 1) {
                    const _x$2 = rest$7.str.charCodeAt(rest$7.start);
                    if (_x$2 === 95) {
                      const _x$3 = new _M0TPC16string10StringView(rest$7.str, rest$7.start + 1 | 0, rest$7.end);
                      _tmp$2 = _x$3;
                      continue;
                    } else {
                      if (_x$2 >= 48 && _x$2 <= 57) {
                        const _x$3 = new _M0TPC16string10StringView(rest$7.str, rest$7.start + 1 | 0, rest$7.end);
                        if (exp < exp_limit) {
                          exp = (Math.imul(exp, 10) | 0) + (_x$2 - 48 | 0) | 0;
                          if (exp > exp_limit) {
                            exp = exp_limit;
                          }
                        }
                        _tmp$2 = _x$3;
                        continue;
                      } else {
                        rest$8 = rest$7;
                        break _L$6;
                      }
                    }
                  } else {
                    rest$8 = rest$7;
                    break _L$6;
                  }
                }
                rest$6 = rest$8;
                break;
              }
              d.decimal_point = d.decimal_point + (Math.imul(exp_sign, exp) | 0) | 0;
              rest$3 = rest$6;
            } else {
              break _L$5;
            }
          } else {
            break _L$5;
          }
          break _L$4;
        }
        const _bind = _M0FPC28internal7strconv11syntax__errGRPC16string10StringViewE();
        if (_bind.$tag === 1) {
          const _ok = _bind;
          rest$3 = _ok._0;
        } else {
          return _bind;
        }
      }
    }
    if ((rest$3.end - rest$3.start | 0) === 0) {
      _M0MPC28internal7strconv7Decimal4trim(d);
      return new _M0DTPC16result6ResultGRPC28internal7strconv7DecimalRPC15error5ErrorE2Ok(d);
    } else {
      return _M0FPC28internal7strconv11syntax__errGRPC16string10StringViewE();
    }
  } else {
    return _M0FPC28internal7strconv11syntax__errGRPC16string10StringViewE();
  }
}
function _M0FPC28internal7strconv20parse__decimal__priv(str) {
  return _M0FPC28internal7strconv26parse__decimal__from__view(str);
}
function _M0FPC28internal7strconv14assemble__bits(mantissa, exponent, negative) {
  const biased_exp = exponent - _M0FPC28internal7strconv12double__info.bias | 0;
  let bits = BigInt.asUintN(64, mantissa & BigInt.asUintN(64, BigInt.asUintN(64, 1n << BigInt(_M0FPC28internal7strconv12double__info.mantissa_bits & 63)) - 1n));
  const exp_bits = BigInt.asUintN(64, BigInt(biased_exp & ((1 << _M0FPC28internal7strconv12double__info.exponent_bits) - 1 | 0)));
  bits = BigInt.asUintN(64, bits | BigInt.asUintN(64, exp_bits << BigInt(_M0FPC28internal7strconv12double__info.mantissa_bits & 63)));
  if (negative) {
    bits = BigInt.asUintN(64, bits | BigInt.asUintN(64, BigInt.asUintN(64, 1n << BigInt(_M0FPC28internal7strconv12double__info.mantissa_bits & 63)) << BigInt(_M0FPC28internal7strconv12double__info.exponent_bits & 63)));
  }
  return bits;
}
function _M0MPC28internal7strconv7Decimal17should__round__up(self, d) {
  if (d < 0 || d >= self.digits_num) {
    return false;
  }
  let _tmp;
  const _tmp$2 = self.digits;
  if ((d >>> 0 < _tmp$2.length ? _tmp$2[d] : $oob()) === 5) {
    _tmp = (d + 1 | 0) === self.digits_num;
  } else {
    _tmp = false;
  }
  if (_tmp) {
    if (self.truncated) {
      return true;
    }
    let _tmp$3;
    if (d > 0) {
      const _tmp$4 = self.digits;
      const _tmp$5 = d - 1 | 0;
      _tmp$3 = ((_tmp$5 >>> 0 < _tmp$4.length ? _tmp$4[_tmp$5] : $oob()) % 2 | 0) !== 0;
    } else {
      _tmp$3 = false;
    }
    return _tmp$3;
  }
  const _tmp$3 = self.digits;
  return (d >>> 0 < _tmp$3.length ? _tmp$3[d] : $oob()) >= 5;
}
function _M0MPC28internal7strconv7Decimal16rounded__integer(self) {
  if (self.decimal_point > 20) {
    return 18446744073709551615n;
  }
  let _tmp = 0n;
  let _tmp$2 = 0;
  while (true) {
    const n = _tmp;
    const i = _tmp$2;
    if (i < self.decimal_point && i < self.digits_num) {
      const _tmp$3 = BigInt.asUintN(64, n * 10n);
      const _tmp$4 = self.digits;
      const _p = i >>> 0 < _tmp$4.length ? _tmp$4[i] : $oob();
      _tmp = BigInt.asUintN(64, _tmp$3 + BigInt.asUintN(64, BigInt(_p)));
      _tmp$2 = i + 1 | 0;
      continue;
    } else {
      let n$2;
      let _tmp$3 = n;
      let _tmp$4 = i;
      while (true) {
        const n$3 = _tmp$3;
        const i$2 = _tmp$4;
        if (i$2 < self.decimal_point) {
          _tmp$3 = BigInt.asUintN(64, n$3 * 10n);
          _tmp$4 = i$2 + 1 | 0;
          continue;
        } else {
          n$2 = n$3;
          break;
        }
      }
      return _M0MPC28internal7strconv7Decimal17should__round__up(self, self.decimal_point) ? BigInt.asUintN(64, n$2 + 1n) : n$2;
    }
  }
}
function _M0MPC28internal7strconv7Decimal11new__digits(self, s) {
  const new_digits = (s >>> 0 < _M0FPC28internal7strconv19left__shift__cheats.length ? _M0FPC28internal7strconv19left__shift__cheats[s] : $oob())._0;
  const cheat_num = (s >>> 0 < _M0FPC28internal7strconv19left__shift__cheats.length ? _M0FPC28internal7strconv19left__shift__cheats[s] : $oob())._1;
  const _bind = cheat_num.length;
  let less;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      const code_unit = cheat_num.charCodeAt(i);
      if (i >= self.digits_num) {
        less = true;
        break;
      }
      const d = code_unit - 48 | 0;
      const _tmp$2 = self.digits;
      if ((i >>> 0 < _tmp$2.length ? _tmp$2[i] : $oob()) !== d) {
        const _tmp$3 = self.digits;
        less = (i >>> 0 < _tmp$3.length ? _tmp$3[i] : $oob()) < d;
        break;
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      less = false;
      break;
    }
  }
  return less ? new_digits - 1 | 0 : new_digits;
}
function _M0MPC28internal7strconv7Decimal11left__shift(self, s) {
  const new_digits = _M0MPC28internal7strconv7Decimal11new__digits(self, s);
  let read_index = self.digits_num;
  let write_index = self.digits_num + new_digits | 0;
  let acc = 0n;
  read_index = read_index - 1 | 0;
  while (true) {
    if (read_index >= 0) {
      const _tmp = self.digits;
      const _tmp$2 = read_index;
      const _p = _tmp$2 >>> 0 < _tmp.length ? _tmp[_tmp$2] : $oob();
      const d = BigInt.asUintN(64, BigInt(_p));
      acc = BigInt.asUintN(64, acc + BigInt.asUintN(64, d << BigInt(s & 63)));
      if (10n === 0n) {
        $panic();
      }
      const quo = BigInt.asUintN(64, BigInt.asIntN(64, acc) / BigInt.asIntN(64, 10n));
      const rem = Number(BigInt.asIntN(32, BigInt.asUintN(64, acc - BigInt.asUintN(64, quo * 10n)))) | 0;
      write_index = write_index - 1 | 0;
      if (write_index < self.digits.length) {
        const _tmp$3 = self.digits;
        const _tmp$4 = write_index;
        if (_tmp$4 >>> 0 < _tmp$3.length) {
          _tmp$3[_tmp$4] = rem & 255;
        } else {
          $oob();
        }
      } else {
        if (rem !== 0) {
          self.truncated = true;
        }
      }
      acc = quo;
      read_index = read_index - 1 | 0;
      continue;
    } else {
      break;
    }
  }
  while (true) {
    if (BigInt.asIntN(64, acc) > BigInt.asIntN(64, 0n)) {
      if (10n === 0n) {
        $panic();
      }
      const quo = BigInt.asUintN(64, BigInt.asIntN(64, acc) / BigInt.asIntN(64, 10n));
      const rem = Number(BigInt.asIntN(32, BigInt.asUintN(64, acc - BigInt.asUintN(64, 10n * quo)))) | 0;
      write_index = write_index - 1 | 0;
      if (write_index < self.digits.length) {
        const _tmp = self.digits;
        const _tmp$2 = write_index;
        if (_tmp$2 >>> 0 < _tmp.length) {
          _tmp[_tmp$2] = rem & 255;
        } else {
          $oob();
        }
      } else {
        if (rem !== 0) {
          self.truncated = true;
        }
      }
      acc = quo;
      continue;
    } else {
      break;
    }
  }
  self.digits_num = self.digits_num + new_digits | 0;
  if (self.digits_num > self.digits.length) {
    self.digits_num = self.digits.length;
  }
  self.decimal_point = self.decimal_point + new_digits | 0;
  _M0MPC28internal7strconv7Decimal4trim(self);
}
function _M0MPC28internal7strconv7Decimal12right__shift(self, s) {
  let read_index = 0;
  let write_index = 0;
  let acc = 0n;
  while (true) {
    if (BigInt.asUintN(64, BigInt.asUintN(64, BigInt.asUintN(64, acc) >> BigInt(s & 63))) === BigInt.asUintN(64, 0n)) {
      if (read_index >= self.digits_num) {
        while (true) {
          if (BigInt.asUintN(64, BigInt.asUintN(64, BigInt.asUintN(64, acc) >> BigInt(s & 63))) === BigInt.asUintN(64, 0n)) {
            acc = BigInt.asUintN(64, acc * 10n);
            read_index = read_index + 1 | 0;
            continue;
          } else {
            break;
          }
        }
        break;
      }
      const _tmp = self.digits;
      const _tmp$2 = read_index;
      const d = _tmp$2 >>> 0 < _tmp.length ? _tmp[_tmp$2] : $oob();
      acc = BigInt.asUintN(64, BigInt.asUintN(64, acc * 10n) + BigInt.asUintN(64, BigInt(d)));
      read_index = read_index + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  self.decimal_point = self.decimal_point - (read_index - 1 | 0) | 0;
  const mask = BigInt.asUintN(64, BigInt.asUintN(64, 1n << BigInt(s & 63)) - 1n);
  while (true) {
    if (read_index < self.digits_num) {
      const out = BigInt.asUintN(64, BigInt.asUintN(64, acc) >> BigInt(s & 63));
      const _tmp = self.digits;
      const _tmp$2 = write_index;
      if (_tmp$2 >>> 0 < _tmp.length) {
        _tmp[_tmp$2] = (Number(BigInt.asIntN(32, out)) | 0) & 255;
      } else {
        $oob();
      }
      write_index = write_index + 1 | 0;
      acc = BigInt.asUintN(64, acc & mask);
      const _tmp$3 = self.digits;
      const _tmp$4 = read_index;
      const d = _tmp$4 >>> 0 < _tmp$3.length ? _tmp$3[_tmp$4] : $oob();
      acc = BigInt.asUintN(64, BigInt.asUintN(64, acc * 10n) + BigInt.asUintN(64, BigInt(d)));
      read_index = read_index + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  while (true) {
    if (BigInt.asUintN(64, acc) > BigInt.asUintN(64, 0n)) {
      const out = BigInt.asUintN(64, BigInt.asUintN(64, acc) >> BigInt(s & 63));
      if (write_index < self.digits.length) {
        const _tmp = self.digits;
        const _tmp$2 = write_index;
        if (_tmp$2 >>> 0 < _tmp.length) {
          _tmp[_tmp$2] = (Number(BigInt.asIntN(32, out)) | 0) & 255;
        } else {
          $oob();
        }
        write_index = write_index + 1 | 0;
      } else {
        if (BigInt.asUintN(64, out) > BigInt.asUintN(64, 0n)) {
          self.truncated = true;
        }
      }
      acc = BigInt.asUintN(64, acc & mask);
      acc = BigInt.asUintN(64, acc * 10n);
      continue;
    } else {
      break;
    }
  }
  self.digits_num = write_index;
  _M0MPC28internal7strconv7Decimal4trim(self);
}
function _M0MPC28internal7strconv7Decimal11shift__priv(self, s) {
  if (self.digits_num === 0) {
    return undefined;
  }
  let s$2 = s;
  if (s$2 > 0) {
    while (true) {
      if (s$2 > 59) {
        _M0MPC28internal7strconv7Decimal11left__shift(self, 59);
        s$2 = s$2 - 59 | 0;
        continue;
      } else {
        break;
      }
    }
    _M0MPC28internal7strconv7Decimal11left__shift(self, s$2);
  }
  if (s$2 < 0) {
    while (true) {
      if (s$2 < -59) {
        _M0MPC28internal7strconv7Decimal12right__shift(self, 59);
        s$2 = s$2 + 59 | 0;
        continue;
      } else {
        break;
      }
    }
    _M0MPC28internal7strconv7Decimal12right__shift(self, -s$2 | 0);
    return;
  } else {
    return;
  }
}
function _M0MPC28internal7strconv7Decimal16to__double__priv(self) {
  let exponent = 0;
  let mantissa = 0n;
  const effective_dp = self.decimal_point + self.overflowed | 0;
  if (self.digits_num === 0 || effective_dp < -330) {
    mantissa = 0n;
    exponent = _M0FPC28internal7strconv12double__info.bias;
    const bits = _M0FPC28internal7strconv14assemble__bits(mantissa, exponent, self.negative);
    return new _M0DTPC16result6ResultGdRPC15error5ErrorE2Ok($i64_reinterpret_f64(bits));
  }
  if (self.decimal_point > 310) {
    const _bind = _M0FPC28internal7strconv10range__errGuE();
    if (_bind.$tag === 1) {
      const _ok = _bind;
      _ok._0;
    } else {
      return _bind;
    }
  }
  self.decimal_point = self.decimal_point + self.overflowed | 0;
  while (true) {
    if (self.decimal_point > 0) {
      let n = 0;
      if (self.decimal_point >= _M0FPC28internal7strconv6powtab.length) {
        n = 60;
      } else {
        const _p = self.decimal_point;
        n = _p >>> 0 < _M0FPC28internal7strconv6powtab.length ? _M0FPC28internal7strconv6powtab[_p] : $oob();
      }
      _M0MPC28internal7strconv7Decimal11shift__priv(self, -n | 0);
      exponent = exponent + n | 0;
      continue;
    } else {
      break;
    }
  }
  while (true) {
    let _tmp;
    if (self.decimal_point < 0) {
      _tmp = true;
    } else {
      let _tmp$2;
      if (self.decimal_point === 0) {
        const _tmp$3 = self.digits;
        _tmp$2 = (0 >>> 0 < _tmp$3.length ? _tmp$3[0] : $oob()) < 5;
      } else {
        _tmp$2 = false;
      }
      _tmp = _tmp$2;
    }
    if (_tmp) {
      let n = 0;
      if ((-self.decimal_point | 0) >= _M0FPC28internal7strconv6powtab.length) {
        n = 60;
      } else {
        const _p = -self.decimal_point | 0;
        n = _p >>> 0 < _M0FPC28internal7strconv6powtab.length ? _M0FPC28internal7strconv6powtab[_p] : $oob();
      }
      _M0MPC28internal7strconv7Decimal11shift__priv(self, n);
      exponent = exponent - n | 0;
      continue;
    } else {
      break;
    }
  }
  exponent = exponent - 1 | 0;
  if (exponent < (_M0FPC28internal7strconv12double__info.bias + 1 | 0)) {
    const n = (_M0FPC28internal7strconv12double__info.bias + 1 | 0) - exponent | 0;
    _M0MPC28internal7strconv7Decimal11shift__priv(self, -n | 0);
    exponent = exponent + n | 0;
  }
  if ((exponent - _M0FPC28internal7strconv12double__info.bias | 0) >= ((1 << _M0FPC28internal7strconv12double__info.exponent_bits) - 1 | 0)) {
    const _bind = _M0FPC28internal7strconv10range__errGuE();
    if (_bind.$tag === 1) {
      const _ok = _bind;
      _ok._0;
    } else {
      return _bind;
    }
  }
  _M0MPC28internal7strconv7Decimal11shift__priv(self, _M0FPC28internal7strconv12double__info.mantissa_bits + 1 | 0);
  mantissa = _M0MPC28internal7strconv7Decimal16rounded__integer(self);
  if (BigInt.asUintN(64, mantissa) === BigInt.asUintN(64, BigInt.asUintN(64, 2n << BigInt(_M0FPC28internal7strconv12double__info.mantissa_bits & 63)))) {
    mantissa = BigInt.asUintN(64, BigInt.asIntN(64, mantissa) >> BigInt(1 & 63));
    exponent = exponent + 1 | 0;
    if ((exponent - _M0FPC28internal7strconv12double__info.bias | 0) >= ((1 << _M0FPC28internal7strconv12double__info.exponent_bits) - 1 | 0)) {
      const _bind = _M0FPC28internal7strconv10range__errGuE();
      if (_bind.$tag === 1) {
        const _ok = _bind;
        _ok._0;
      } else {
        return _bind;
      }
    }
  }
  if (BigInt.asUintN(64, BigInt.asUintN(64, mantissa & BigInt.asUintN(64, 1n << BigInt(_M0FPC28internal7strconv12double__info.mantissa_bits & 63)))) === BigInt.asUintN(64, 0n)) {
    exponent = _M0FPC28internal7strconv12double__info.bias;
  }
  const bits = _M0FPC28internal7strconv14assemble__bits(mantissa, exponent, self.negative);
  return new _M0DTPC16result6ResultGdRPC15error5ErrorE2Ok($i64_reinterpret_f64(bits));
}
function _M0FPC28internal7strconv17pow10__fast__path(exponent) {
  const _p = exponent & 31;
  return _p >>> 0 < _M0FPC28internal7strconv5table.length ? _M0FPC28internal7strconv5table[_p] : $oob();
}
function _M0MPC28internal7strconv6Number14is__fast__path(self) {
  return BigInt.asIntN(64, _M0FPC28internal7strconv25min__exponent__fast__path) <= BigInt.asIntN(64, self.exponent) && (BigInt.asIntN(64, self.exponent) <= BigInt.asIntN(64, _M0FPC28internal7strconv36max__exponent__disguised__fast__path) && (BigInt.asUintN(64, self.mantissa) <= BigInt.asUintN(64, _M0FPC28internal7strconv25max__mantissa__fast__path) && !self.many_digits));
}
function _M0MPC28internal7strconv6Number15try__fast__path(self) {
  if (_M0MPC28internal7strconv6Number14is__fast__path(self)) {
    let value;
    if (BigInt.asIntN(64, self.exponent) <= BigInt.asIntN(64, _M0FPC28internal7strconv25max__exponent__fast__path)) {
      const value$2 = $f64_convert_i64_u(BigInt.asUintN(64, self.mantissa));
      value = BigInt.asIntN(64, self.exponent) < BigInt.asIntN(64, 0n) ? value$2 / _M0FPC28internal7strconv17pow10__fast__path(-(Number(BigInt.asIntN(32, self.exponent)) | 0) | 0) : value$2 * _M0FPC28internal7strconv17pow10__fast__path(Number(BigInt.asIntN(32, self.exponent)) | 0);
    } else {
      const shift = BigInt.asUintN(64, self.exponent - _M0FPC28internal7strconv25max__exponent__fast__path);
      const _tmp = self.mantissa;
      const _p = Number(BigInt.asIntN(32, shift)) | 0;
      const _bind = _M0FPC28internal7strconv12checked__mul(_tmp, _p >>> 0 < _M0FPC28internal7strconv10int__pow10.length ? _M0FPC28internal7strconv10int__pow10[_p] : $oob());
      if (_bind === undefined) {
        return _M0DTPC16option6OptionGdE4None__;
      } else {
        const _Some = _bind;
        const _mantissa = _Some;
        if (BigInt.asUintN(64, _mantissa) > BigInt.asUintN(64, _M0FPC28internal7strconv25max__mantissa__fast__path)) {
          return _M0DTPC16option6OptionGdE4None__;
        }
        value = $f64_convert_i64_u(BigInt.asUintN(64, _mantissa)) * _M0FPC28internal7strconv17pow10__fast__path(Number(BigInt.asIntN(32, _M0FPC28internal7strconv25max__exponent__fast__path)) | 0);
      }
    }
    if (self.negative) {
      value = -value;
    }
    return new _M0DTPC16option6OptionGdE4Some(value);
  } else {
    return _M0DTPC16option6OptionGdE4None__;
  }
}
function _M0FPC28internal7strconv13parse__double(str) {
  if (!((str.end - str.start | 0) === 0)) {
    if (_M0FPC28internal7strconv17check__underscore(str)) {
      const _bind = _M0FPC28internal7strconv13parse__number(str);
      let _bind$2;
      if (_bind.$tag === 1) {
        const _ok = _bind;
        _bind$2 = _ok._0;
      } else {
        return _bind;
      }
      if (_bind$2 === undefined) {
        return _M0FPC28internal7strconv15parse__inf__nan(str);
      } else {
        const _Some = _bind$2;
        const _num = _Some;
        const _bind$3 = _M0MPC28internal7strconv6Number15try__fast__path(_num);
        if (_bind$3.$tag === 1) {
          const _Some$2 = _bind$3;
          const _value = _Some$2._0;
          return new _M0DTPC16result6ResultGdRPC15error5ErrorE2Ok(_value);
        } else {
          const fast = _num.many_digits ? _M0FPC16double14not__a__number : _M0FPC28internal7strconv20try__eisel__lemire64(_num.mantissa, _num.exponent, _num.negative);
          if (fast !== fast) {
            const _bind$4 = _M0FPC28internal7strconv20parse__decimal__priv(str);
            let _tmp;
            if (_bind$4.$tag === 1) {
              const _ok = _bind$4;
              _tmp = _ok._0;
            } else {
              return _bind$4;
            }
            return _M0MPC28internal7strconv7Decimal16to__double__priv(_tmp);
          } else {
            return new _M0DTPC16result6ResultGdRPC15error5ErrorE2Ok(fast);
          }
        }
      }
    } else {
      return _M0FPC28internal7strconv11syntax__errGdE();
    }
  } else {
    return _M0FPC28internal7strconv11syntax__errGdE();
  }
}
function _M0FPC17hashmap12new__hashmapGsRP46heyq026moonjs3src5value8PropMetaE(capacity) {
  const capacity$2 = _M0MPC13int3Int20next__power__of__two(capacity);
  const _bind = $make_array_len_and_init(capacity$2, undefined);
  const _bind$2 = capacity$2 - 1 | 0;
  return new _M0TPC17hashmap7HashMapGsRP46heyq026moonjs3src5value8PropMetaE(_bind, capacity$2, _bind$2, 0);
}
function _M0MPC17hashmap7HashMap10push__awayGsRP46heyq026moonjs3src5value8PropMetaE(self, idx, entry) {
  let _tmp = entry.psl + 1 | 0;
  let _tmp$2 = idx + 1 & self.capacity_mask;
  let _tmp$3 = entry;
  while (true) {
    const psl = _tmp;
    const idx$2 = _tmp$2;
    const entry$2 = _tmp$3;
    const _bind = self.entries[idx$2];
    if (_bind === undefined) {
      entry$2.psl = psl;
      self.entries[idx$2] = entry$2;
      return;
    } else {
      const _Some = _bind;
      const _curr_entry = _Some;
      if (psl > _curr_entry.psl) {
        entry$2.psl = psl;
        self.entries[idx$2] = entry$2;
        _tmp = _curr_entry.psl + 1 | 0;
        _tmp$2 = idx$2 + 1 & self.capacity_mask;
        _tmp$3 = _curr_entry;
        continue;
      } else {
        _tmp = psl + 1 | 0;
        _tmp$2 = idx$2 + 1 & self.capacity_mask;
        continue;
      }
    }
  }
}
function _M0MPC17hashmap7HashMap20rehash__place__entryGsRP46heyq026moonjs3src5value8PropMetaE(self, entry) {
  const hash = entry.hash;
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _bind = self.entries[idx];
    if (_bind === undefined) {
      entry.psl = psl;
      self.entries[idx] = entry;
      return undefined;
    } else {
      const _Some = _bind;
      const _curr = _Some;
      if (psl > _curr.psl) {
        _M0MPC17hashmap7HashMap10push__awayGsRP46heyq026moonjs3src5value8PropMetaE(self, idx, _curr);
        entry.psl = psl;
        self.entries[idx] = entry;
        return undefined;
      } else {
        _tmp = psl + 1 | 0;
        _tmp$2 = idx + 1 & self.capacity_mask;
        continue;
      }
    }
  }
}
function _M0MPC17hashmap7HashMap4growGsRP46heyq026moonjs3src5value8PropMetaE(self) {
  const old_entries = self.entries;
  const new_capacity = self.capacity << 1;
  self.entries = $make_array_len_and_init(new_capacity, undefined);
  self.capacity = new_capacity;
  self.capacity_mask = new_capacity - 1 | 0;
  const _bind = old_entries.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const entry = old_entries[_];
      if (entry === undefined) {
      } else {
        const _Some = entry;
        const _entry = _Some;
        _M0MPC17hashmap7HashMap20rehash__place__entryGsRP46heyq026moonjs3src5value8PropMetaE(self, _entry);
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function _M0MPC17hashmap7HashMap15set__with__hashGsRP46heyq026moonjs3src5value8PropMetaE(self, key, value, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _bind = self.entries[idx];
    if (_bind === undefined) {
      if (self.size >= (self.capacity / 2 | 0)) {
        _M0MPC17hashmap7HashMap4growGsRP46heyq026moonjs3src5value8PropMetaE(self);
        _tmp = 0;
        _tmp$2 = hash & self.capacity_mask;
        continue;
      }
      const entry = new _M0TPC17hashmap5EntryGsRP46heyq026moonjs3src5value8PropMetaE(psl, hash, key, value);
      self.entries[idx] = entry;
      self.size = self.size + 1 | 0;
      return undefined;
    } else {
      const _Some = _bind;
      const _curr_entry = _Some;
      if (_curr_entry.hash === hash && _curr_entry.key === key) {
        _curr_entry.value = value;
        return undefined;
      }
      if (psl > _curr_entry.psl) {
        if (self.size >= (self.capacity / 2 | 0)) {
          _M0MPC17hashmap7HashMap4growGsRP46heyq026moonjs3src5value8PropMetaE(self);
          _tmp = 0;
          _tmp$2 = hash & self.capacity_mask;
          continue;
        }
        _M0MPC17hashmap7HashMap10push__awayGsRP46heyq026moonjs3src5value8PropMetaE(self, idx, _curr_entry);
        const entry = new _M0TPC17hashmap5EntryGsRP46heyq026moonjs3src5value8PropMetaE(psl, hash, key, value);
        self.entries[idx] = entry;
        self.size = self.size + 1 | 0;
        return undefined;
      }
      _tmp = psl + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPC17hashmap7HashMap3setGsRP46heyq026moonjs3src5value8PropMetaE(self, key, value) {
  _M0MPC17hashmap7HashMap15set__with__hashGsRP46heyq026moonjs3src5value8PropMetaE(self, key, value, _M0IPC16string6StringPB4Hash4hash(key));
}
function _M0FPC17hashmap21capacity__for__length(length) {
  return _M0MPC13int3Int20next__power__of__two(Math.imul(length, 2) | 0);
}
function _M0MPC17hashmap7HashMap7HashMapGsRP46heyq026moonjs3src5value8PropMetaE(arr, capacity) {
  const length = arr.end - arr.start | 0;
  let capacity$2;
  if (capacity === undefined) {
    capacity$2 = length === 0 ? 8 : _M0FPC17hashmap21capacity__for__length(length);
  } else {
    const _Some = capacity;
    const _capacity = _Some;
    const _p = _M0FPC17hashmap21capacity__for__length(length);
    capacity$2 = _capacity > _p ? _capacity : _p;
  }
  const m = _M0FPC17hashmap12new__hashmapGsRP46heyq026moonjs3src5value8PropMetaE(capacity$2);
  const _p = arr.end - arr.start | 0;
  let _tmp = 0;
  while (true) {
    const _p$2 = _tmp;
    if (_p$2 < _p) {
      const _p$3 = arr.buf[arr.start + _p$2 | 0];
      _M0MPC17hashmap7HashMap3setGsRP46heyq026moonjs3src5value8PropMetaE(m, _p$3._0, _p$3._1);
      _tmp = _p$2 + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return m;
}
function _M0MPC17hashmap7HashMap3getGsRP46heyq026moonjs3src5value8PropMetaE(self, key) {
  const hash = _M0IPC16string6StringPB4Hash4hash(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _bind = self.entries[idx];
    if (_bind === undefined) {
      return undefined;
    } else {
      const _Some = _bind;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return _entry.value;
      }
      if (i > _entry.psl) {
        return undefined;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPC17hashmap7HashMap8containsGsRP46heyq026moonjs3src5value8PropMetaE(self, key) {
  const hash = _M0IPC16string6StringPB4Hash4hash(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _bind = self.entries[idx];
    if (_bind === undefined) {
      return false;
    } else {
      const _Some = _bind;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return true;
      }
      if (i > _entry.psl) {
        return false;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0FPC14math3pow(_tmp, _tmp$2) {
  return Math.pow(_tmp, _tmp$2);
}
function _M0MP46heyq026moonjs3src4util9SourceLoc3new(line, col) {
  return new _M0TP46heyq026moonjs3src4util9SourceLoc(line & 65535, col & 65535);
}
function _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, end) {
  return new _M0TP46heyq026moonjs3src4util10SourceSpan(start, end);
}
function _M0IP46heyq026moonjs3src5value7JSValuePB2Eq5equal(self, other) {
  switch (self.$tag) {
    case 0: {
      if (other.$tag === 0) {
        return true;
      } else {
        return false;
      }
    }
    case 1: {
      if (other.$tag === 1) {
        return true;
      } else {
        return false;
      }
    }
    case 2: {
      const _Bool = self;
      const _a = _Bool._0;
      if (other.$tag === 2) {
        const _Bool$2 = other;
        const _b = _Bool$2._0;
        return _a === _b;
      } else {
        return false;
      }
    }
    case 3: {
      const _Int32 = self;
      const _a$2 = _Int32._0;
      if (other.$tag === 3) {
        const _Int32$2 = other;
        const _b = _Int32$2._0;
        return _a$2 === _b;
      } else {
        return false;
      }
    }
    case 4: {
      const _Number = self;
      const _a$3 = _Number._0;
      if (other.$tag === 4) {
        const _Number$2 = other;
        const _b = _Number$2._0;
        return _a$3 === _b;
      } else {
        return false;
      }
    }
    case 5: {
      const _Str = self;
      const _a$4 = _Str._0;
      if (other.$tag === 5) {
        const _Str$2 = other;
        const _b = _Str$2._0;
        return _a$4 === _b;
      } else {
        return false;
      }
    }
    case 6: {
      const _Object = self;
      const _a$5 = _Object._0;
      if (other.$tag === 6) {
        const _Object$2 = other;
        const _b = _Object$2._0;
        return _a$5 === _b;
      } else {
        return false;
      }
    }
    case 7: {
      const _Function = self;
      const _a$6 = _Function._0;
      if (other.$tag === 7) {
        const _Function$2 = other;
        const _b = _Function$2._0;
        return _a$6 === _b;
      } else {
        return false;
      }
    }
    default: {
      const _NativeFn = self;
      const _a$7 = _NativeFn._0;
      if (other.$tag === 8) {
        const _NativeFn$2 = other;
        const _b = _NativeFn$2._0;
        return _a$7 === _b;
      } else {
        return false;
      }
    }
  }
}
function _M0MP46heyq026moonjs3src5value8PropMeta3new(slot_idx, attrs) {
  return new _M0TP46heyq026moonjs3src5value8PropMeta(slot_idx, attrs);
}
function _M0MP46heyq026moonjs3src5value8PropMeta12is__writable(self) {
  const _p = self.attrs;
  const _p$2 = 1;
  return (_p & _p$2 & 255) !== 0;
}
function _M0MP46heyq026moonjs3src5value5Shape3new() {
  const _bind = [];
  return new _M0TP46heyq026moonjs3src5value5Shape(_M0MPC17hashmap7HashMap7HashMapGsRP46heyq026moonjs3src5value8PropMetaE(new _M0TPB9ArrayViewGUsRP46heyq026moonjs3src5value8PropMetaEE(_bind, 0, 0), undefined), []);
}
function _M0MP46heyq026moonjs3src5value6Object3new(shape, proto) {
  const slots = [];
  const _bind = shape.keys_ordered.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(slots, _M0DTP46heyq026moonjs3src5value7JSValue9Undefined__);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0TP46heyq026moonjs3src5value6Object(shape, slots, proto, true);
}
function _M0MP46heyq026moonjs3src5value6Object10set__proto(obj, proto) {
  obj.proto = proto;
}
function _M0MP46heyq026moonjs3src5value6Object10set__shape(obj, shape) {
  obj.shape = shape;
}
function _M0MP46heyq026moonjs3src5value6Object13add__property(obj, key, value, attrs) {
  if (_M0MPC17hashmap7HashMap8containsGsRP46heyq026moonjs3src5value8PropMetaE(obj.shape.props, key)) {
    $panic();
  }
  const slot_idx = obj.slots.length;
  _M0MPC17hashmap7HashMap3setGsRP46heyq026moonjs3src5value8PropMetaE(obj.shape.props, key, new _M0TP46heyq026moonjs3src5value8PropMeta(slot_idx, attrs));
  _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(obj.shape.keys_ordered, key);
  _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(obj.slots, value);
}
function _M0MP46heyq026moonjs3src5value6Object8get__own(obj, key) {
  const _bind = _M0MPC17hashmap7HashMap3getGsRP46heyq026moonjs3src5value8PropMetaE(obj.shape.props, key);
  if (_bind === undefined) {
    return undefined;
  } else {
    const _Some = _bind;
    const _meta = _Some;
    return _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(obj.slots, _meta.slot_idx);
  }
}
function _M0MP46heyq026moonjs3src5value6Object8has__own(obj, key) {
  return _M0MPC17hashmap7HashMap8containsGsRP46heyq026moonjs3src5value8PropMetaE(obj.shape.props, key);
}
function _M0MP46heyq026moonjs3src5value6Object13get__property(obj, key) {
  let _tmp = obj;
  while (true) {
    const cur = _tmp;
    const _bind = _M0MPC17hashmap7HashMap3getGsRP46heyq026moonjs3src5value8PropMetaE(cur.shape.props, key);
    if (_bind === undefined) {
      const _bind$2 = cur.proto;
      if (_bind$2.$tag === 6) {
        const _Object = _bind$2;
        const _next = _Object._0;
        _tmp = _next;
        continue;
      } else {
        return _M0DTP46heyq026moonjs3src5value7JSValue9Undefined__;
      }
    } else {
      const _Some = _bind;
      const _meta = _Some;
      return _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(cur.slots, _meta.slot_idx);
    }
  }
}
function _M0MP46heyq026moonjs3src5value6Object13has__property(obj, key) {
  let _tmp = obj;
  while (true) {
    const cur = _tmp;
    if (_M0MPC17hashmap7HashMap8containsGsRP46heyq026moonjs3src5value8PropMetaE(cur.shape.props, key)) {
      return true;
    } else {
      const _bind = cur.proto;
      if (_bind.$tag === 6) {
        const _Object = _bind;
        const _next = _Object._0;
        _tmp = _next;
        continue;
      } else {
        return false;
      }
    }
  }
}
function _M0MP46heyq026moonjs3src5value6Object8set__own(obj, key, value) {
  const _bind = _M0MPC17hashmap7HashMap3getGsRP46heyq026moonjs3src5value8PropMetaE(obj.shape.props, key);
  if (_bind === undefined) {
    if (obj.extensible) {
      _M0MP46heyq026moonjs3src5value6Object13add__property(obj, key, value, 7);
      return true;
    } else {
      return false;
    }
  } else {
    const _Some = _bind;
    const _meta = _Some;
    if (_M0MP46heyq026moonjs3src5value8PropMeta12is__writable(_meta)) {
      _M0MPC15array5Array3setGRP46heyq026moonjs3src5value7JSValueE(obj.slots, _meta.slot_idx, value);
      return true;
    } else {
      return false;
    }
  }
}
function _M0MP46heyq026moonjs3src5value14NativeFunction3new(name, is_constructor, impl_) {
  return new _M0TP46heyq026moonjs3src5value14NativeFunction(name, is_constructor, impl_, _M0DTP46heyq026moonjs3src5value7JSValue9Undefined__);
}
function _M0MP46heyq026moonjs3src5value14NativeFunction14set__prototype(self, proto) {
  self.prototype = proto;
}
function _M0MP46heyq026moonjs3src5value14NativeFunction4call(self, this_val, args) {
  const _func = self.impl_;
  return _func(this_val, args);
}
function _M0MP46heyq026moonjs3src5value7Upvalue3new(v) {
  return new _M0TP46heyq026moonjs3src5value7Upvalue(v);
}
function _M0MP46heyq026moonjs3src5value7Upvalue3set(self, v) {
  self.value = v;
}
function _M0MP46heyq026moonjs3src5value8Function3new(chunk_id, upvalues, name, is_constructor) {
  return new _M0TP46heyq026moonjs3src5value8Function(chunk_id, upvalues, name, is_constructor, _M0DTP46heyq026moonjs3src5value7JSValue9Undefined__);
}
function _M0MP46heyq026moonjs3src5value8Function14set__prototype(self, proto) {
  self.prototype = proto;
}
function _M0MP46heyq026moonjs3src5value11JSException3new(value, stack) {
  return new _M0TP46heyq026moonjs3src5value11JSException(value, stack);
}
function _M0MP46heyq026moonjs3src5value14StackFrameInfo3new(chunk_name, filename, loc) {
  return new _M0TP46heyq026moonjs3src5value14StackFrameInfo(chunk_name, filename, loc);
}
function _M0FP46heyq026moonjs3src8builtins14not__undefined(v) {
  if (v.$tag === 0) {
    return false;
  } else {
    return true;
  }
}
function _M0FP46heyq026moonjs3src8builtins26value__to__display__string(v) {
  switch (v.$tag) {
    case 0: {
      return "undefined";
    }
    case 1: {
      return "null";
    }
    case 2: {
      const _Bool = v;
      const _x = _Bool._0;
      if (_x === true) {
        return "true";
      } else {
        return "false";
      }
    }
    case 3: {
      const _Int32 = v;
      const _i = _Int32._0;
      return _M0MPC13int3Int18to__string_2einner(_i, 10);
    }
    case 4: {
      const _Number = v;
      const _d = _Number._0;
      return String(_d);
    }
    case 5: {
      const _Str = v;
      return _Str._0;
    }
    case 6: {
      return "[object Object]";
    }
    case 7: {
      const _Function = v;
      const _f = _Function._0;
      return `function ${_f.name}() { [native code] }`;
    }
    default: {
      const _NativeFn = v;
      const _nf = _NativeFn._0;
      return `function ${_nf.name}() { [native code] }`;
    }
  }
}
function _M0FP46heyq026moonjs3src8builtins11error__impl(this_val, args) {
  if (this_val.$tag === 6) {
    const _Object = this_val;
    const _obj = _Object._0;
    if (args.length > 0) {
      const msg = _M0FP46heyq026moonjs3src8builtins26value__to__display__string(_M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(args, 0));
      if (_M0FP46heyq026moonjs3src8builtins14not__undefined(_M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(args, 0))) {
        _M0MP46heyq026moonjs3src5value6Object13add__property(_obj, "message", new _M0DTP46heyq026moonjs3src5value7JSValue3Str(msg), 7);
      }
    }
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11NativeErrorE2Ok(_M0DTP46heyq026moonjs3src5value7JSValue9Undefined__);
  } else {
    const obj = _M0MP46heyq026moonjs3src5value6Object3new(_M0MP46heyq026moonjs3src5value5Shape3new(), _M0DTP46heyq026moonjs3src5value7JSValue4Null__);
    if (args.length > 0 && _M0FP46heyq026moonjs3src8builtins14not__undefined(_M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(args, 0))) {
      const msg = _M0FP46heyq026moonjs3src8builtins26value__to__display__string(_M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(args, 0));
      _M0MP46heyq026moonjs3src5value6Object13add__property(obj, "message", new _M0DTP46heyq026moonjs3src5value7JSValue3Str(msg), 7);
    }
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11NativeErrorE2Ok(new _M0DTP46heyq026moonjs3src5value7JSValue6Object(obj));
  }
}
function _M0FP46heyq026moonjs3src8builtins12object__impl(this_val, _args) {
  if (this_val.$tag === 6) {
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11NativeErrorE2Ok(this_val);
  } else {
    const obj = _M0MP46heyq026moonjs3src5value6Object3new(_M0MP46heyq026moonjs3src5value5Shape3new(), _M0DTP46heyq026moonjs3src5value7JSValue4Null__);
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11NativeErrorE2Ok(new _M0DTP46heyq026moonjs3src5value7JSValue6Object(obj));
  }
}
function _M0FP46heyq026moonjs3src8builtins12string__impl(this_val, args) {
  if (this_val.$tag === 6) {
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11NativeErrorE2Ok(_M0DTP46heyq026moonjs3src5value7JSValue9Undefined__);
  } else {
    const s = args.length === 0 ? "" : _M0FP46heyq026moonjs3src8builtins26value__to__display__string(_M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(args, 0));
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11NativeErrorE2Ok(new _M0DTP46heyq026moonjs3src5value7JSValue3Str(s));
  }
}
function _M0MP46heyq026moonjs3src8builtins8Builtins3new() {
  const object_proto = _M0MP46heyq026moonjs3src5value6Object3new(_M0MP46heyq026moonjs3src5value5Shape3new(), _M0DTP46heyq026moonjs3src5value7JSValue4Null__);
  const function_proto = _M0MP46heyq026moonjs3src5value6Object3new(_M0MP46heyq026moonjs3src5value5Shape3new(), new _M0DTP46heyq026moonjs3src5value7JSValue6Object(object_proto));
  const array_proto = _M0MP46heyq026moonjs3src5value6Object3new(_M0MP46heyq026moonjs3src5value5Shape3new(), new _M0DTP46heyq026moonjs3src5value7JSValue6Object(object_proto));
  const string_proto = _M0MP46heyq026moonjs3src5value6Object3new(_M0MP46heyq026moonjs3src5value5Shape3new(), new _M0DTP46heyq026moonjs3src5value7JSValue6Object(object_proto));
  const error_proto = _M0MP46heyq026moonjs3src5value6Object3new(_M0MP46heyq026moonjs3src5value5Shape3new(), new _M0DTP46heyq026moonjs3src5value7JSValue6Object(object_proto));
  const type_error_proto = _M0MP46heyq026moonjs3src5value6Object3new(_M0MP46heyq026moonjs3src5value5Shape3new(), new _M0DTP46heyq026moonjs3src5value7JSValue6Object(error_proto));
  const range_error_proto = _M0MP46heyq026moonjs3src5value6Object3new(_M0MP46heyq026moonjs3src5value5Shape3new(), new _M0DTP46heyq026moonjs3src5value7JSValue6Object(error_proto));
  const syntax_error_proto = _M0MP46heyq026moonjs3src5value6Object3new(_M0MP46heyq026moonjs3src5value5Shape3new(), new _M0DTP46heyq026moonjs3src5value7JSValue6Object(error_proto));
  const reference_error_proto = _M0MP46heyq026moonjs3src5value6Object3new(_M0MP46heyq026moonjs3src5value5Shape3new(), new _M0DTP46heyq026moonjs3src5value7JSValue6Object(error_proto));
  _M0MP46heyq026moonjs3src5value6Object13add__property(error_proto, "name", _M0MP46heyq026moonjs3src8builtins8Builtins3newN6constrS82, 7);
  _M0MP46heyq026moonjs3src5value6Object13add__property(error_proto, "message", _M0MP46heyq026moonjs3src8builtins8Builtins3newN6constrS83, 7);
  _M0MP46heyq026moonjs3src5value6Object13add__property(type_error_proto, "name", _M0MP46heyq026moonjs3src8builtins8Builtins3newN6constrS84, 7);
  _M0MP46heyq026moonjs3src5value6Object13add__property(type_error_proto, "message", _M0MP46heyq026moonjs3src8builtins8Builtins3newN6constrS85, 7);
  _M0MP46heyq026moonjs3src5value6Object13add__property(range_error_proto, "name", _M0MP46heyq026moonjs3src8builtins8Builtins3newN6constrS86, 7);
  _M0MP46heyq026moonjs3src5value6Object13add__property(range_error_proto, "message", _M0MP46heyq026moonjs3src8builtins8Builtins3newN6constrS87, 7);
  _M0MP46heyq026moonjs3src5value6Object13add__property(syntax_error_proto, "name", _M0MP46heyq026moonjs3src8builtins8Builtins3newN6constrS88, 7);
  _M0MP46heyq026moonjs3src5value6Object13add__property(syntax_error_proto, "message", _M0MP46heyq026moonjs3src8builtins8Builtins3newN6constrS89, 7);
  _M0MP46heyq026moonjs3src5value6Object13add__property(reference_error_proto, "name", _M0MP46heyq026moonjs3src8builtins8Builtins3newN6constrS90, 7);
  _M0MP46heyq026moonjs3src5value6Object13add__property(reference_error_proto, "message", _M0MP46heyq026moonjs3src8builtins8Builtins3newN6constrS91, 7);
  const object_ctor = _M0MP46heyq026moonjs3src5value14NativeFunction3new("Object", true, _M0FP46heyq026moonjs3src8builtins12object__impl);
  const string_ctor = _M0MP46heyq026moonjs3src5value14NativeFunction3new("String", true, _M0FP46heyq026moonjs3src8builtins12string__impl);
  const error_ctor = _M0MP46heyq026moonjs3src5value14NativeFunction3new("Error", true, _M0FP46heyq026moonjs3src8builtins11error__impl);
  const type_error_ctor = _M0MP46heyq026moonjs3src5value14NativeFunction3new("TypeError", true, _M0FP46heyq026moonjs3src8builtins11error__impl);
  const range_error_ctor = _M0MP46heyq026moonjs3src5value14NativeFunction3new("RangeError", true, _M0FP46heyq026moonjs3src8builtins11error__impl);
  const syntax_error_ctor = _M0MP46heyq026moonjs3src5value14NativeFunction3new("SyntaxError", true, _M0FP46heyq026moonjs3src8builtins11error__impl);
  const reference_error_ctor = _M0MP46heyq026moonjs3src5value14NativeFunction3new("ReferenceError", true, _M0FP46heyq026moonjs3src8builtins11error__impl);
  _M0MP46heyq026moonjs3src5value14NativeFunction14set__prototype(object_ctor, new _M0DTP46heyq026moonjs3src5value7JSValue6Object(object_proto));
  _M0MP46heyq026moonjs3src5value14NativeFunction14set__prototype(string_ctor, new _M0DTP46heyq026moonjs3src5value7JSValue6Object(string_proto));
  _M0MP46heyq026moonjs3src5value14NativeFunction14set__prototype(error_ctor, new _M0DTP46heyq026moonjs3src5value7JSValue6Object(error_proto));
  _M0MP46heyq026moonjs3src5value14NativeFunction14set__prototype(type_error_ctor, new _M0DTP46heyq026moonjs3src5value7JSValue6Object(type_error_proto));
  _M0MP46heyq026moonjs3src5value14NativeFunction14set__prototype(range_error_ctor, new _M0DTP46heyq026moonjs3src5value7JSValue6Object(range_error_proto));
  _M0MP46heyq026moonjs3src5value14NativeFunction14set__prototype(syntax_error_ctor, new _M0DTP46heyq026moonjs3src5value7JSValue6Object(syntax_error_proto));
  _M0MP46heyq026moonjs3src5value14NativeFunction14set__prototype(reference_error_ctor, new _M0DTP46heyq026moonjs3src5value7JSValue6Object(reference_error_proto));
  _M0MP46heyq026moonjs3src5value6Object13add__property(error_proto, "constructor", new _M0DTP46heyq026moonjs3src5value7JSValue8NativeFn(error_ctor), 7);
  _M0MP46heyq026moonjs3src5value6Object13add__property(type_error_proto, "constructor", new _M0DTP46heyq026moonjs3src5value7JSValue8NativeFn(type_error_ctor), 7);
  _M0MP46heyq026moonjs3src5value6Object13add__property(range_error_proto, "constructor", new _M0DTP46heyq026moonjs3src5value7JSValue8NativeFn(range_error_ctor), 7);
  _M0MP46heyq026moonjs3src5value6Object13add__property(syntax_error_proto, "constructor", new _M0DTP46heyq026moonjs3src5value7JSValue8NativeFn(syntax_error_ctor), 7);
  _M0MP46heyq026moonjs3src5value6Object13add__property(reference_error_proto, "constructor", new _M0DTP46heyq026moonjs3src5value7JSValue8NativeFn(reference_error_ctor), 7);
  _M0MP46heyq026moonjs3src5value6Object13add__property(object_proto, "constructor", new _M0DTP46heyq026moonjs3src5value7JSValue8NativeFn(object_ctor), 7);
  _M0MP46heyq026moonjs3src5value6Object13add__property(string_proto, "constructor", new _M0DTP46heyq026moonjs3src5value7JSValue8NativeFn(string_ctor), 7);
  return new _M0TP46heyq026moonjs3src8builtins8Builtins(object_proto, function_proto, array_proto, string_proto, error_proto, type_error_proto, range_error_proto, syntax_error_proto, reference_error_proto, object_ctor, string_ctor, error_ctor, type_error_ctor, range_error_ctor, syntax_error_ctor, reference_error_ctor);
}
function _M0MP46heyq026moonjs3src8builtins8Builtins13install__into(self, globals) {
  _M0MP46heyq026moonjs3src5value6Object13add__property(globals, "Object", new _M0DTP46heyq026moonjs3src5value7JSValue8NativeFn(self.object_ctor), 7);
  _M0MP46heyq026moonjs3src5value6Object13add__property(globals, "String", new _M0DTP46heyq026moonjs3src5value7JSValue8NativeFn(self.string_ctor), 7);
  _M0MP46heyq026moonjs3src5value6Object13add__property(globals, "Error", new _M0DTP46heyq026moonjs3src5value7JSValue8NativeFn(self.error_ctor), 7);
  _M0MP46heyq026moonjs3src5value6Object13add__property(globals, "TypeError", new _M0DTP46heyq026moonjs3src5value7JSValue8NativeFn(self.type_error_ctor), 7);
  _M0MP46heyq026moonjs3src5value6Object13add__property(globals, "RangeError", new _M0DTP46heyq026moonjs3src5value7JSValue8NativeFn(self.range_error_ctor), 7);
  _M0MP46heyq026moonjs3src5value6Object13add__property(globals, "SyntaxError", new _M0DTP46heyq026moonjs3src5value7JSValue8NativeFn(self.syntax_error_ctor), 7);
  _M0MP46heyq026moonjs3src5value6Object13add__property(globals, "ReferenceError", new _M0DTP46heyq026moonjs3src5value7JSValue8NativeFn(self.reference_error_ctor), 7);
  _M0MP46heyq026moonjs3src5value6Object13add__property(globals, "undefined", _M0DTP46heyq026moonjs3src5value7JSValue9Undefined__, 7);
  _M0MP46heyq026moonjs3src5value6Object13add__property(globals, "NaN", new _M0DTP46heyq026moonjs3src5value7JSValue6Number(0 / 0), 7);
  _M0MP46heyq026moonjs3src5value6Object13add__property(globals, "Infinity", new _M0DTP46heyq026moonjs3src5value7JSValue6Number(1 / 0), 7);
  _M0MP46heyq026moonjs3src5value6Object13add__property(globals, "globalThis", new _M0DTP46heyq026moonjs3src5value7JSValue6Object(globals), 7);
}
function _M0IP46heyq026moonjs3src8bytecode15UpvalueFromKindPB2Eq5equal(_x_125, _x_126) {
  if (_x_125 === 0) {
    if (_x_126 === 0) {
      return true;
    } else {
      return false;
    }
  } else {
    if (_x_126 === 1) {
      return true;
    } else {
      return false;
    }
  }
}
function _M0MP46heyq026moonjs3src8bytecode15UpvalueSlotDecl3new(from_kind, from_idx) {
  return new _M0TP46heyq026moonjs3src8bytecode15UpvalueSlotDecl(from_kind, from_idx);
}
function _M0FP46heyq026moonjs3src8bytecode12opcode__name(op) {
  const _p = 0;
  if (op === _p) {
    return "NOP";
  } else {
    const _p$2 = 1;
    if (op === _p$2) {
      return "PUSH_UNDEF";
    } else {
      const _p$3 = 2;
      if (op === _p$3) {
        return "PUSH_NULL";
      } else {
        const _p$4 = 3;
        if (op === _p$4) {
          return "PUSH_TRUE";
        } else {
          const _p$5 = 4;
          if (op === _p$5) {
            return "PUSH_FALSE";
          } else {
            const _p$6 = 5;
            if (op === _p$6) {
              return "PUSH_I32";
            } else {
              const _p$7 = 6;
              if (op === _p$7) {
                return "PUSH_CONST";
              } else {
                const _p$8 = 7;
                if (op === _p$8) {
                  return "DUP";
                } else {
                  const _p$9 = 8;
                  if (op === _p$9) {
                    return "DROP";
                  } else {
                    const _p$10 = 9;
                    if (op === _p$10) {
                      return "SWAP";
                    } else {
                      const _p$11 = 10;
                      if (op === _p$11) {
                        return "POP";
                      } else {
                        const _p$12 = 16;
                        if (op === _p$12) {
                          return "GET_LOCAL";
                        } else {
                          const _p$13 = 17;
                          if (op === _p$13) {
                            return "SET_LOCAL";
                          } else {
                            const _p$14 = 18;
                            if (op === _p$14) {
                              return "GET_UPVALUE";
                            } else {
                              const _p$15 = 19;
                              if (op === _p$15) {
                                return "SET_UPVALUE";
                              } else {
                                const _p$16 = 20;
                                if (op === _p$16) {
                                  return "GET_GLOBAL";
                                } else {
                                  const _p$17 = 21;
                                  if (op === _p$17) {
                                    return "SET_GLOBAL";
                                  } else {
                                    const _p$18 = 22;
                                    if (op === _p$18) {
                                      return "DECLARE_GLOBAL";
                                    } else {
                                      const _p$19 = 23;
                                      if (op === _p$19) {
                                        return "GET_GLOBAL_OR_UNDEF";
                                      } else {
                                        const _p$20 = 24;
                                        if (op === _p$20) {
                                          return "GET_THIS";
                                        } else {
                                          const _p$21 = 25;
                                          if (op === _p$21) {
                                            return "TO_NUMBER";
                                          } else {
                                            const _p$22 = 32;
                                            if (op === _p$22) {
                                              return "ADD";
                                            } else {
                                              const _p$23 = 33;
                                              if (op === _p$23) {
                                                return "SUB";
                                              } else {
                                                const _p$24 = 34;
                                                if (op === _p$24) {
                                                  return "MUL";
                                                } else {
                                                  const _p$25 = 35;
                                                  if (op === _p$25) {
                                                    return "DIV";
                                                  } else {
                                                    const _p$26 = 36;
                                                    if (op === _p$26) {
                                                      return "MOD";
                                                    } else {
                                                      const _p$27 = 37;
                                                      if (op === _p$27) {
                                                        return "POW";
                                                      } else {
                                                        const _p$28 = 38;
                                                        if (op === _p$28) {
                                                          return "NEG";
                                                        } else {
                                                          const _p$29 = 39;
                                                          if (op === _p$29) {
                                                            return "BNOT";
                                                          } else {
                                                            const _p$30 = 40;
                                                            if (op === _p$30) {
                                                              return "BAND";
                                                            } else {
                                                              const _p$31 = 41;
                                                              if (op === _p$31) {
                                                                return "BOR";
                                                              } else {
                                                                const _p$32 = 42;
                                                                if (op === _p$32) {
                                                                  return "BXOR";
                                                                } else {
                                                                  const _p$33 = 43;
                                                                  if (op === _p$33) {
                                                                    return "SHL";
                                                                  } else {
                                                                    const _p$34 = 44;
                                                                    if (op === _p$34) {
                                                                      return "SHR";
                                                                    } else {
                                                                      const _p$35 = 45;
                                                                      if (op === _p$35) {
                                                                        return "USHR";
                                                                      } else {
                                                                        const _p$36 = 46;
                                                                        if (op === _p$36) {
                                                                          return "EQ";
                                                                        } else {
                                                                          const _p$37 = 47;
                                                                          if (op === _p$37) {
                                                                            return "NE";
                                                                          } else {
                                                                            const _p$38 = 48;
                                                                            if (op === _p$38) {
                                                                              return "SEQ";
                                                                            } else {
                                                                              const _p$39 = 49;
                                                                              if (op === _p$39) {
                                                                                return "SNE";
                                                                              } else {
                                                                                const _p$40 = 50;
                                                                                if (op === _p$40) {
                                                                                  return "LT";
                                                                                } else {
                                                                                  const _p$41 = 51;
                                                                                  if (op === _p$41) {
                                                                                    return "LE";
                                                                                  } else {
                                                                                    const _p$42 = 52;
                                                                                    if (op === _p$42) {
                                                                                      return "GT";
                                                                                    } else {
                                                                                      const _p$43 = 53;
                                                                                      if (op === _p$43) {
                                                                                        return "GE";
                                                                                      } else {
                                                                                        const _p$44 = 54;
                                                                                        if (op === _p$44) {
                                                                                          return "NOT";
                                                                                        } else {
                                                                                          const _p$45 = 55;
                                                                                          if (op === _p$45) {
                                                                                            return "TYPEOF";
                                                                                          } else {
                                                                                            const _p$46 = 56;
                                                                                            if (op === _p$46) {
                                                                                              return "INSTANCEOF";
                                                                                            } else {
                                                                                              const _p$47 = 57;
                                                                                              if (op === _p$47) {
                                                                                                return "IN";
                                                                                              } else {
                                                                                                const _p$48 = 64;
                                                                                                if (op === _p$48) {
                                                                                                  return "NEW_OBJECT";
                                                                                                } else {
                                                                                                  const _p$49 = 65;
                                                                                                  if (op === _p$49) {
                                                                                                    return "DEFINE_PROP";
                                                                                                  } else {
                                                                                                    const _p$50 = 66;
                                                                                                    if (op === _p$50) {
                                                                                                      return "GET_PROP";
                                                                                                    } else {
                                                                                                      const _p$51 = 67;
                                                                                                      if (op === _p$51) {
                                                                                                        return "SET_PROP";
                                                                                                      } else {
                                                                                                        const _p$52 = 68;
                                                                                                        if (op === _p$52) {
                                                                                                          return "GET_ELEM";
                                                                                                        } else {
                                                                                                          const _p$53 = 69;
                                                                                                          if (op === _p$53) {
                                                                                                            return "SET_ELEM";
                                                                                                          } else {
                                                                                                            const _p$54 = 70;
                                                                                                            if (op === _p$54) {
                                                                                                              return "DELETE_PROP";
                                                                                                            } else {
                                                                                                              const _p$55 = 71;
                                                                                                              if (op === _p$55) {
                                                                                                                return "DELETE_ELEM";
                                                                                                              } else {
                                                                                                                const _p$56 = 72;
                                                                                                                if (op === _p$56) {
                                                                                                                  return "NEW_ARRAY";
                                                                                                                } else {
                                                                                                                  const _p$57 = 73;
                                                                                                                  if (op === _p$57) {
                                                                                                                    return "ARRAY_PUSH";
                                                                                                                  } else {
                                                                                                                    const _p$58 = 80;
                                                                                                                    if (op === _p$58) {
                                                                                                                      return "NEW_CLOSURE";
                                                                                                                    } else {
                                                                                                                      const _p$59 = 81;
                                                                                                                      if (op === _p$59) {
                                                                                                                        return "CALL";
                                                                                                                      } else {
                                                                                                                        const _p$60 = 82;
                                                                                                                        if (op === _p$60) {
                                                                                                                          return "CALL_METHOD";
                                                                                                                        } else {
                                                                                                                          const _p$61 = 83;
                                                                                                                          if (op === _p$61) {
                                                                                                                            return "CONSTRUCT";
                                                                                                                          } else {
                                                                                                                            const _p$62 = 84;
                                                                                                                            if (op === _p$62) {
                                                                                                                              return "RETURN_VAL";
                                                                                                                            } else {
                                                                                                                              const _p$63 = 85;
                                                                                                                              if (op === _p$63) {
                                                                                                                                return "RETURN_UNDEF";
                                                                                                                              } else {
                                                                                                                                const _p$64 = 96;
                                                                                                                                if (op === _p$64) {
                                                                                                                                  return "JUMP";
                                                                                                                                } else {
                                                                                                                                  const _p$65 = 97;
                                                                                                                                  if (op === _p$65) {
                                                                                                                                    return "JUMP_IF_TRUE";
                                                                                                                                  } else {
                                                                                                                                    const _p$66 = 98;
                                                                                                                                    if (op === _p$66) {
                                                                                                                                      return "JUMP_IF_FALSE";
                                                                                                                                    } else {
                                                                                                                                      const _p$67 = 112;
                                                                                                                                      if (op === _p$67) {
                                                                                                                                        return "THROW";
                                                                                                                                      } else {
                                                                                                                                        const _p$68 = 113;
                                                                                                                                        if (op === _p$68) {
                                                                                                                                          return "ENTER_TRY";
                                                                                                                                        } else {
                                                                                                                                          const _p$69 = 114;
                                                                                                                                          if (op === _p$69) {
                                                                                                                                            return "LEAVE_TRY";
                                                                                                                                          } else {
                                                                                                                                            const _p$70 = 254;
                                                                                                                                            if (op === _p$70) {
                                                                                                                                              return "WIDE";
                                                                                                                                            } else {
                                                                                                                                              const _p$71 = 255;
                                                                                                                                              if (op === _p$71) {
                                                                                                                                                return "HALT";
                                                                                                                                              } else {
                                                                                                                                                return `<op:0x${_M0MPC14byte4Byte7to__hex(op)}>`;
                                                                                                                                              }
                                                                                                                                            }
                                                                                                                                          }
                                                                                                                                        }
                                                                                                                                      }
                                                                                                                                    }
                                                                                                                                  }
                                                                                                                                }
                                                                                                                              }
                                                                                                                            }
                                                                                                                          }
                                                                                                                        }
                                                                                                                      }
                                                                                                                    }
                                                                                                                  }
                                                                                                                }
                                                                                                              }
                                                                                                            }
                                                                                                          }
                                                                                                        }
                                                                                                      }
                                                                                                    }
                                                                                                  }
                                                                                                }
                                                                                              }
                                                                                            }
                                                                                          }
                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
function _M0FP46heyq026moonjs3src8bytecode6encode(op, a, b, c) {
  const op_u = op;
  const a_u = a << 8;
  const b_u = b << 16;
  const c_u = c << 24;
  return op_u | a_u | b_u | c_u;
}
function _M0FP46heyq026moonjs3src8bytecode6decode(word) {
  const _p = word & 255;
  const _tmp = _p & 255;
  const _p$2 = word >>> 8 & 255;
  const _tmp$2 = _p$2 & 255;
  const _p$3 = word >>> 16 & 255;
  const _tmp$3 = _p$3 & 255;
  const _p$4 = word >>> 24 & 255;
  return new _M0TP46heyq026moonjs3src8bytecode12DecodedInstr(_tmp, _tmp$2, _tmp$3, _p$4 & 255);
}
function _M0MP46heyq026moonjs3src8bytecode5Chunk18read__operand__u24(self, pc) {
  if (pc < 0 || pc >= self.code.length) {
    `Chunk::read_operand_u24: pc out of range: ${_M0MPC13int3Int18to__string_2einner(pc, 10)}`;
    $panic();
  }
  const first = _M0FP46heyq026moonjs3src8bytecode6decode(_M0MPC15array5Array2atGjE(self.code, pc));
  const _p = first.op;
  const _p$2 = 254;
  if (_p === _p$2) {
    if ((pc + 1 | 0) >= self.code.length) {
      `Chunk::read_operand_u24: wide prefix at end of chunk (pc=${_M0MPC13int3Int18to__string_2einner(pc, 10)})`;
      $panic();
    }
    const second = _M0FP46heyq026moonjs3src8bytecode6decode(_M0MPC15array5Array2atGjE(self.code, pc + 1 | 0));
    const _p$3 = first.a;
    const _tmp = _p$3 << 16;
    const _p$4 = first.b;
    const _tmp$2 = _tmp | _p$4 << 8;
    const _p$5 = first.c;
    const high24 = _tmp$2 | _p$5;
    const _p$6 = second.a;
    const low8 = _p$6;
    return { _0: high24 << 8 | low8, _1: 2 };
  } else {
    const _p$3 = first.a;
    const hi = _p$3;
    const _p$4 = first.b;
    const mid = _p$4;
    const _p$5 = first.c;
    const lo = _p$5;
    return { _0: hi << 16 | mid << 8 | lo, _1: 1 };
  }
}
function _M0MP46heyq026moonjs3src8bytecode5Chunk18read__operand__i24(self, pc) {
  const _bind = _M0MP46heyq026moonjs3src8bytecode5Chunk18read__operand__u24(self, pc);
  const _u = _bind._0;
  const _advance = _bind._1;
  if (_advance === 1) {
    const signed = _u >>> 0 >= 8388608 >>> 0 ? _u | -16777216 : _u;
    return { _0: signed, _1: 1 };
  } else {
    return { _0: _u, _1: 2 };
  }
}
function _M0MP46heyq026moonjs3src8bytecode5Chunk3new(name, filename, param_count) {
  return new _M0TP46heyq026moonjs3src8bytecode5Chunk([], [], [], name, filename, param_count, param_count, [], [], false, -1);
}
function _M0MP46heyq026moonjs3src8bytecode5Chunk12alloc__local(self) {
  const idx = self.local_count;
  self.local_count = idx + 1 | 0;
  return idx;
}
function _M0MP46heyq026moonjs3src8bytecode5Chunk24set__self__binding__slot(self, slot) {
  self.self_binding_slot = slot;
}
function _M0MP46heyq026moonjs3src8bytecode5Chunk12add__upvalue(self, slot) {
  const idx = self.upvalue_slots.length;
  _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(self.upvalue_slots, slot);
  return idx;
}
function _M0MP46heyq026moonjs3src8bytecode5Chunk11add__nested(self, chunk) {
  const idx = self.nested_chunks.length;
  _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(self.nested_chunks, chunk);
  return idx;
}
function _M0MP46heyq026moonjs3src8bytecode5Chunk10add__const(self, v) {
  const _bind = self.const_pool.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      if (_M0IP46heyq026moonjs3src5value7JSValuePB2Eq5equal(_M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(self.const_pool, i), v)) {
        return i;
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const idx = self.const_pool.length;
  _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(self.const_pool, v);
  return idx;
}
function _M0FP46heyq026moonjs3src8bytecode17split__u24__bytes(u) {
  const _p = u >>> 16 & 255;
  const _tmp = _p & 255;
  const _p$2 = u >>> 8 & 255;
  const _tmp$2 = _p$2 & 255;
  const _p$3 = u & 255;
  return { _0: _tmp, _1: _tmp$2, _2: _p$3 & 255 };
}
function _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(self, op, a, b, c, loc) {
  _M0MPC15array5Array4pushGjE(self.code, _M0FP46heyq026moonjs3src8bytecode6encode(op, a, b, c));
  _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(self.source_locs, loc);
}
function _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(self, op, operand, loc) {
  if (operand >>> 0 <= 16777215 >>> 0) {
    const _bind = _M0FP46heyq026moonjs3src8bytecode17split__u24__bytes(operand);
    const _hi = _bind._0;
    const _mid = _bind._1;
    const _lo = _bind._2;
    _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(self, op, _hi, _mid, _lo, loc);
    return;
  } else {
    const _bind = _M0FP46heyq026moonjs3src8bytecode17split__u24__bytes(operand >>> 8 | 0);
    const _w_hi = _bind._0;
    const _w_mid = _bind._1;
    const _w_lo = _bind._2;
    const _p = operand & 255;
    const low8 = _p & 255;
    _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(self, 254, _w_hi, _w_mid, _w_lo, loc);
    _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(self, op, low8, 0, 0, loc);
    return;
  }
}
function _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__i32(self, op, operand, loc) {
  if (operand >= -8388608 && operand <= 8388607) {
    const u = operand & 16777215;
    const _bind = _M0FP46heyq026moonjs3src8bytecode17split__u24__bytes(u);
    const _hi = _bind._0;
    const _mid = _bind._1;
    const _lo = _bind._2;
    _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(self, op, _hi, _mid, _lo, loc);
    return;
  } else {
    const u = operand;
    const _bind = _M0FP46heyq026moonjs3src8bytecode17split__u24__bytes(u >>> 8 | 0);
    const _w_hi = _bind._0;
    const _w_mid = _bind._1;
    const _w_lo = _bind._2;
    const _p = u & 255;
    const low8 = _p & 255;
    _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(self, 254, _w_hi, _w_mid, _w_lo, loc);
    _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(self, op, low8, 0, 0, loc);
    return;
  }
}
function _M0MP46heyq026moonjs3src8bytecode5Chunk11patch__jump(self, at_pc, target_pc) {
  if (at_pc < 0 || at_pc >= self.code.length) {
    `Chunk::patch_jump: at_pc out of range: ${_M0MPC13int3Int18to__string_2einner(at_pc, 10)}`;
    $panic();
  }
  const first = _M0FP46heyq026moonjs3src8bytecode6decode(_M0MPC15array5Array2atGjE(self.code, at_pc));
  const _p = first.op;
  const _p$2 = 254;
  const is_wide = _p === _p$2;
  const advance = is_wide ? 2 : 1;
  const offset = target_pc - (at_pc + advance | 0) | 0;
  if (is_wide) {
    if ((at_pc + 1 | 0) >= self.code.length) {
      `Chunk::patch_jump: wide slot has no following op at pc=${_M0MPC13int3Int18to__string_2einner(at_pc, 10)}`;
      $panic();
    }
    const jump_op = _M0FP46heyq026moonjs3src8bytecode6decode(_M0MPC15array5Array2atGjE(self.code, at_pc + 1 | 0)).op;
    const u = offset;
    const _bind = _M0FP46heyq026moonjs3src8bytecode17split__u24__bytes(u >>> 8 | 0);
    const _w_hi = _bind._0;
    const _w_mid = _bind._1;
    const _w_lo = _bind._2;
    const _p$3 = u & 255;
    const low8 = _p$3 & 255;
    _M0MPC15array5Array3setGjE(self.code, at_pc, _M0FP46heyq026moonjs3src8bytecode6encode(254, _w_hi, _w_mid, _w_lo));
    _M0MPC15array5Array3setGjE(self.code, at_pc + 1 | 0, _M0FP46heyq026moonjs3src8bytecode6encode(jump_op, low8, 0, 0));
    return;
  } else {
    if (offset < -8388608 || offset > 8388607) {
      `Chunk::patch_jump: offset ${_M0MPC13int3Int18to__string_2einner(offset, 10)} doesn't fit in narrow 24-bit slot at pc=${_M0MPC13int3Int18to__string_2einner(at_pc, 10)}; caller must emit the jump via emit_wide_* to reserve a wide slot`;
      $panic();
    }
    const u = offset & 16777215;
    const _bind = _M0FP46heyq026moonjs3src8bytecode17split__u24__bytes(u);
    const _hi = _bind._0;
    const _mid = _bind._1;
    const _lo = _bind._2;
    _M0MPC15array5Array3setGjE(self.code, at_pc, _M0FP46heyq026moonjs3src8bytecode6encode(first.op, _hi, _mid, _lo));
    return;
  }
}
function _M0MP46heyq026moonjs3src3ast4Stmt3new(kind, span) {
  return new _M0TP46heyq026moonjs3src3ast4Stmt(span, kind);
}
function _M0MP46heyq026moonjs3src3ast13VarDeclarator3new(pat, init) {
  return new _M0TP46heyq026moonjs3src3ast13VarDeclarator(pat, init);
}
function _M0MP46heyq026moonjs3src3ast11CatchClause3new(param, body) {
  return new _M0TP46heyq026moonjs3src3ast11CatchClause(param, body);
}
function _M0MP46heyq026moonjs3src3ast5Block3new(body) {
  return new _M0TP46heyq026moonjs3src3ast5Block(body);
}
function _M0MP46heyq026moonjs3src3ast7Pattern3new(kind, span) {
  return new _M0TP46heyq026moonjs3src3ast7Pattern(span, kind);
}
function _M0MP46heyq026moonjs3src3ast7Program3new(body, is_module) {
  return new _M0TP46heyq026moonjs3src3ast7Program(body, is_module);
}
function _M0MP46heyq026moonjs3src3ast4Expr3new(kind, span) {
  return new _M0TP46heyq026moonjs3src3ast4Expr(span, kind);
}
function _M0MP46heyq026moonjs3src8compiler8Compiler3top(self) {
  if (self.fn_stack.length === 0) {
    $panic();
  }
  return _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(self.fn_stack, self.fn_stack.length - 1 | 0);
}
function _M0FP46heyq026moonjs3src8compiler14compile__break(c, label, loc) {
  const top = _M0MP46heyq026moonjs3src8compiler8Compiler3top(c);
  const chunk = top.chunk;
  _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__i32(chunk, 96, 16777216, loc);
  const j_pc = chunk.code.length - 2 | 0;
  if (label === undefined) {
    if (top.loop_stack.length === 0) {
      return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError("'break' outside of loop", loc));
    }
    const last = _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(top.loop_stack, top.loop_stack.length - 1 | 0);
    _M0MPC15array5Array4pushGiE(last.break_patches, j_pc);
    return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
  } else {
    const _Some = label;
    const _name = _Some;
    let i = top.label_stack.length - 1 | 0;
    while (true) {
      if (i >= 0) {
        if (_M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(top.label_stack, i).name === _name) {
          _M0MPC15array5Array4pushGiE(_M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(top.label_stack, i).break_patches, j_pc);
          return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
        }
        i = i - 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError(`label '${_name}' not in scope`, loc));
  }
}
function _M0FP46heyq026moonjs3src8compiler17compile__continue(c, label, loc) {
  const top = _M0MP46heyq026moonjs3src8compiler8Compiler3top(c);
  const chunk = top.chunk;
  _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__i32(chunk, 96, 16777216, loc);
  const j_pc = chunk.code.length - 2 | 0;
  if (label === undefined) {
    if (top.loop_stack.length === 0) {
      return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError("'continue' outside of loop", loc));
    }
    const last = _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(top.loop_stack, top.loop_stack.length - 1 | 0);
    _M0MPC15array5Array4pushGiE(last.continue_patches, j_pc);
    return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
  } else {
    const _Some = label;
    const _name = _Some;
    let i = top.label_stack.length - 1 | 0;
    while (true) {
      if (i >= 0) {
        if (_M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(top.label_stack, i).name === _name) {
          if (!_M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(top.label_stack, i).is_loop) {
            return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError(`'continue' to non-loop label '${_name}'`, loc));
          }
          let j = top.loop_stack.length - 1 | 0;
          while (true) {
            if (j >= 0) {
              const _bind = _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(top.loop_stack, j).label;
              if (_bind === undefined) {
              } else {
                const _Some$2 = _bind;
                const _l = _Some$2;
                if (_l === _name) {
                  _M0MPC15array5Array4pushGiE(_M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(top.loop_stack, j).continue_patches, j_pc);
                  return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
                }
              }
              j = j - 1 | 0;
              continue;
            } else {
              break;
            }
          }
          return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError(`internal: labeled loop frame missing for '${_name}'`, loc));
        }
        i = i - 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError(`label '${_name}' not in scope`, loc));
  }
}
function _M0FP46heyq026moonjs3src8compiler17binop__of__assign(op) {
  switch (op) {
    case 1: {
      return 32;
    }
    case 2: {
      return 33;
    }
    case 3: {
      return 34;
    }
    case 4: {
      return 35;
    }
    case 5: {
      return 36;
    }
    case 6: {
      return 37;
    }
    case 7: {
      return 43;
    }
    case 8: {
      return 44;
    }
    case 9: {
      return 45;
    }
    case 10: {
      return 40;
    }
    case 11: {
      return 41;
    }
    case 12: {
      return 42;
    }
    default: {
      return 0;
    }
  }
}
function _M0FP46heyq026moonjs3src8compiler22this__fn__add__upvalue(fc, name, from_kind, from_idx) {
  const _bind = fc.chunk.upvalue_slots.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      const uv = _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(fc.chunk.upvalue_slots, i);
      if (_M0IP46heyq026moonjs3src8bytecode15UpvalueFromKindPB2Eq5equal(uv.from_kind, from_kind) && uv.from_idx === from_idx) {
        return i;
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const idx = _M0MP46heyq026moonjs3src8bytecode5Chunk12add__upvalue(fc.chunk, _M0MP46heyq026moonjs3src8bytecode15UpvalueSlotDecl3new(from_kind, from_idx));
  _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(fc.upvalue_names, name);
  return idx;
}
function _M0MP46heyq026moonjs3src8compiler16FunctionCompiler11find__local(self, name) {
  let i = self.locals.length - 1 | 0;
  while (true) {
    if (i >= 0) {
      if (_M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(self.locals, i).name === name) {
        return _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(self.locals, i).slot;
      }
      i = i - 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return undefined;
}
function _M0MP46heyq026moonjs3src8compiler16FunctionCompiler14mark__captured(self, _slot) {}
function _M0MP46heyq026moonjs3src8compiler8Compiler16resolve__upvalue(self, depth, name) {
  if (depth >= (self.fn_stack.length - 1 | 0)) {
    return undefined;
  }
  const parent_depth = depth + 1 | 0;
  const parent = _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(self.fn_stack, (self.fn_stack.length - 1 | 0) - parent_depth | 0);
  const _bind = _M0MP46heyq026moonjs3src8compiler16FunctionCompiler11find__local(parent, name);
  if (_bind === undefined) {
    const _bind$2 = _M0MP46heyq026moonjs3src8compiler8Compiler16resolve__upvalue(self, parent_depth, name);
    if (_bind$2 === undefined) {
      return undefined;
    } else {
      const _Some = _bind$2;
      const _parent_upvalue_idx = _Some;
      const this_fn = _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(self.fn_stack, (self.fn_stack.length - 1 | 0) - depth | 0);
      return _M0FP46heyq026moonjs3src8compiler22this__fn__add__upvalue(this_fn, name, 1, _parent_upvalue_idx);
    }
  } else {
    const _Some = _bind;
    const _slot = _Some;
    _M0MP46heyq026moonjs3src8compiler16FunctionCompiler14mark__captured(parent, _slot);
    const this_fn = _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(self.fn_stack, (self.fn_stack.length - 1 | 0) - depth | 0);
    return _M0FP46heyq026moonjs3src8compiler22this__fn__add__upvalue(this_fn, name, 0, _slot);
  }
}
function _M0MP46heyq026moonjs3src8compiler8Compiler7resolve(self, name) {
  const top = _M0MP46heyq026moonjs3src8compiler8Compiler3top(self);
  const _bind = _M0MP46heyq026moonjs3src8compiler16FunctionCompiler11find__local(top, name);
  if (_bind === undefined) {
    const _bind$2 = _M0MP46heyq026moonjs3src8compiler8Compiler16resolve__upvalue(self, 0, name);
    if (_bind$2 === undefined) {
      return _M0DTP46heyq026moonjs3src8compiler10Resolution9RefGlobal__;
    } else {
      const _Some = _bind$2;
      const _idx = _Some;
      return new _M0DTP46heyq026moonjs3src8compiler10Resolution10RefUpvalue(_idx);
    }
  } else {
    const _Some = _bind;
    const _slot = _Some;
    return new _M0DTP46heyq026moonjs3src8compiler10Resolution8RefLocal(_slot);
  }
}
function _M0MP46heyq026moonjs3src8compiler8Compiler10str__const(self, s) {
  return _M0MP46heyq026moonjs3src8bytecode5Chunk10add__const(_M0MP46heyq026moonjs3src8compiler8Compiler3top(self).chunk, new _M0DTP46heyq026moonjs3src5value7JSValue3Str(s));
}
function _M0FP46heyq026moonjs3src8compiler24compile__identifier__get(c, name, loc) {
  const chunk = _M0MP46heyq026moonjs3src8compiler8Compiler3top(c).chunk;
  const _bind = _M0MP46heyq026moonjs3src8compiler8Compiler7resolve(c, name);
  switch (_bind.$tag) {
    case 0: {
      const _RefLocal = _bind;
      const _slot = _RefLocal._0;
      _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 16, _slot, loc);
      break;
    }
    case 1: {
      const _RefUpvalue = _bind;
      const _idx = _RefUpvalue._0;
      _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 18, _idx, loc);
      break;
    }
    default: {
      const name_idx = _M0MP46heyq026moonjs3src8compiler8Compiler10str__const(c, name);
      _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 20, name_idx, loc);
    }
  }
  return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
}
function _M0FP46heyq026moonjs3src8compiler24compile__identifier__set(c, name, loc) {
  const chunk = _M0MP46heyq026moonjs3src8compiler8Compiler3top(c).chunk;
  _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 7, 0, 0, 0, loc);
  const _bind = _M0MP46heyq026moonjs3src8compiler8Compiler7resolve(c, name);
  switch (_bind.$tag) {
    case 0: {
      const _RefLocal = _bind;
      const _slot = _RefLocal._0;
      _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 17, _slot, loc);
      break;
    }
    case 1: {
      const _RefUpvalue = _bind;
      const _idx = _RefUpvalue._0;
      _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 19, _idx, loc);
      break;
    }
    default: {
      const name_idx = _M0MP46heyq026moonjs3src8compiler8Compiler10str__const(c, name);
      _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 21, name_idx, loc);
    }
  }
  return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
}
function _M0FP46heyq026moonjs3src8compiler16collect__hoisted(body, hoisted_fns, hoisted_vars) {
  const _bind = body.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const stmt = body[_];
      _M0FP46heyq026moonjs3src8compiler22collect__hoisted__stmt(stmt, hoisted_fns, hoisted_vars);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function _M0FP46heyq026moonjs3src8compiler22collect__hoisted__stmt(stmt, hoisted_fns, hoisted_vars) {
  const _bind = stmt.span;
  const _bind$2 = stmt.kind;
  let _tmp = _bind;
  let _tmp$2 = _bind$2;
  _L: while (true) {
    const stmt_span = _tmp;
    const stmt_kind = _tmp$2;
    switch (stmt_kind.$tag) {
      case 16: {
        const _FunctionDecl = stmt_kind;
        const _id = _FunctionDecl._0;
        const _params = _FunctionDecl._1;
        const _body = _FunctionDecl._2;
        const _is_async = _FunctionDecl._3;
        const _is_generator = _FunctionDecl._4;
        if (!_is_async && !_is_generator) {
          _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(hoisted_fns, { _0: _id, _1: _params, _2: _body, _3: stmt_span.start });
          return;
        } else {
          return;
        }
      }
      case 15: {
        const _VarDecl = stmt_kind;
        const _x = _VarDecl._0;
        if (_x === 0) {
          const _decls = _VarDecl._1;
          const _bind$3 = _decls.length;
          let _tmp$3 = 0;
          while (true) {
            const _ = _tmp$3;
            if (_ < _bind$3) {
              const d = _decls[_];
              const _bind$4 = d.pat.kind;
              if (_bind$4.$tag === 0) {
                const _IdentPat = _bind$4;
                const _name = _IdentPat._0;
                _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(hoisted_vars, { _0: _name, _1: d.pat.span.start });
              }
              _tmp$3 = _ + 1 | 0;
              continue;
            } else {
              return;
            }
          }
        } else {
          return;
        }
      }
      case 0: {
        const _BlockStmt = stmt_kind;
        const _body$2 = _BlockStmt._0;
        _M0FP46heyq026moonjs3src8compiler16collect__hoisted(_body$2, hoisted_fns, hoisted_vars);
        return;
      }
      case 2: {
        const _If = stmt_kind;
        const _cons = _If._1;
        const _alt = _If._2;
        _M0FP46heyq026moonjs3src8compiler22collect__hoisted__stmt(_cons, hoisted_fns, hoisted_vars);
        if (_alt === undefined) {
          return;
        } else {
          const _Some = _alt;
          const _s = _Some;
          _tmp = _s.span;
          _tmp$2 = _s.kind;
          continue _L;
        }
      }
      case 3: {
        const _While = stmt_kind;
        const _body$3 = _While._1;
        _tmp = _body$3.span;
        _tmp$2 = _body$3.kind;
        continue _L;
      }
      case 4: {
        const _DoWhile = stmt_kind;
        const _body$4 = _DoWhile._0;
        _tmp = _body$4.span;
        _tmp$2 = _body$4.kind;
        continue _L;
      }
      case 5: {
        const _For = stmt_kind;
        const _init = _For._0;
        const _body$5 = _For._3;
        if (_init === undefined) {
        } else {
          const _Some = _init;
          const _x$2 = _Some;
          if (_x$2.$tag === 0) {
            const _InitVar = _x$2;
            const _x$3 = _InitVar._0;
            if (_x$3 === 0) {
              const _decls = _InitVar._1;
              const _bind$3 = _decls.length;
              let _tmp$3 = 0;
              while (true) {
                const _ = _tmp$3;
                if (_ < _bind$3) {
                  const d = _decls[_];
                  const _bind$4 = d.pat.kind;
                  if (_bind$4.$tag === 0) {
                    const _IdentPat = _bind$4;
                    const _name = _IdentPat._0;
                    _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(hoisted_vars, { _0: _name, _1: d.pat.span.start });
                  }
                  _tmp$3 = _ + 1 | 0;
                  continue;
                } else {
                  break;
                }
              }
            }
          }
        }
        _tmp = _body$5.span;
        _tmp$2 = _body$5.kind;
        continue _L;
      }
      case 13: {
        const _Try = stmt_kind;
        const _body$6 = _Try._0;
        const _catch_ = _Try._1;
        const _finally_ = _Try._2;
        _M0FP46heyq026moonjs3src8compiler16collect__hoisted(_body$6, hoisted_fns, hoisted_vars);
        if (_catch_ === undefined) {
        } else {
          const _Some = _catch_;
          const _c = _Some;
          _M0FP46heyq026moonjs3src8compiler16collect__hoisted(_c.body, hoisted_fns, hoisted_vars);
        }
        if (_finally_.$tag === 1) {
          const _Some = _finally_;
          const _fbody = _Some._0;
          _M0FP46heyq026moonjs3src8compiler16collect__hoisted(_fbody, hoisted_fns, hoisted_vars);
          return;
        } else {
          return;
        }
      }
      case 14: {
        const _Labeled = stmt_kind;
        const _body$7 = _Labeled._1;
        _tmp = _body$7.span;
        _tmp$2 = _body$7.kind;
        continue _L;
      }
      default: {
        return;
      }
    }
  }
}
function _M0MP46heyq026moonjs3src8compiler16FunctionCompiler14declare__local(self, name, _kind) {
  const slot = _M0MP46heyq026moonjs3src8bytecode5Chunk12alloc__local(self.chunk);
  _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(self.locals, new _M0TP46heyq026moonjs3src8compiler9LocalDecl(name, slot));
  return slot;
}
function _M0MP46heyq026moonjs3src8compiler16FunctionCompiler3new(chunk, is_top_level) {
  return new _M0TP46heyq026moonjs3src8compiler16FunctionCompiler(chunk, [], [], 0, [], [], is_top_level);
}
function _M0FP46heyq026moonjs3src8compiler20compile__number__lit(c, d, loc) {
  const chunk = _M0MP46heyq026moonjs3src8compiler8Compiler3top(c).chunk;
  const as_int = _M0MPC16double6Double7to__int(d);
  if (as_int + 0 === d && (d >= -2147483648 && d <= 2147483647)) {
    _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__i32(chunk, 5, as_int, loc);
    return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
  } else {
    const idx = _M0MP46heyq026moonjs3src8bytecode5Chunk10add__const(chunk, new _M0DTP46heyq026moonjs3src5value7JSValue6Number(d));
    _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 6, idx, loc);
    return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
  }
}
function _M0FP46heyq026moonjs3src8compiler23number__key__to__string(d) {
  const as_int = _M0MPC16double6Double7to__int(d);
  return as_int + 0 === d && (d >= -2147483648 && d <= 2147483647) ? _M0MPC13int3Int18to__string_2einner(as_int, 10) : String(d);
}
function _M0FP46heyq026moonjs3src8compiler13compile__stmt(c, stmt) {
  const _bind = stmt.kind;
  switch (_bind.$tag) {
    case 18: {
      return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
    }
    case 0: {
      const _BlockStmt = _bind;
      const _body = _BlockStmt._0;
      const top = _M0MP46heyq026moonjs3src8compiler8Compiler3top(c);
      top.scope_depth = top.scope_depth + 1 | 0;
      const saved = top.locals.length;
      const _bind$2 = _body.length;
      let _tmp = 0;
      while (true) {
        const _ = _tmp;
        if (_ < _bind$2) {
          const s = _body[_];
          const _bind$3 = _M0FP46heyq026moonjs3src8compiler13compile__stmt(c, s);
          if (_bind$3.$tag === 0) {
            const _Err = _bind$3;
            const _e = _Err._0;
            top.scope_depth = top.scope_depth - 1 | 0;
            return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
          }
          _tmp = _ + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      while (true) {
        if (top.locals.length > saved) {
          _M0MPC15array5Array3popGRP46heyq026moonjs3src8compiler16FunctionCompilerE(top.locals);
          continue;
        } else {
          break;
        }
      }
      top.scope_depth = top.scope_depth - 1 | 0;
      return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
    }
    case 1: {
      const _ExprStmt = _bind;
      const _expr = _ExprStmt._0;
      const _bind$3 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, _expr);
      if (_bind$3.$tag === 0) {
        const _Err = _bind$3;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
      }
      _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(_M0MP46heyq026moonjs3src8compiler8Compiler3top(c).chunk, 8, 0, 0, 0, _expr.span.start);
      return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
    }
    case 2: {
      const _If = _bind;
      const _cond = _If._0;
      const _cons = _If._1;
      const _alt = _If._2;
      return _M0FP46heyq026moonjs3src8compiler11compile__if(c, _cond, _cons, _alt, stmt.span.start);
    }
    case 3: {
      const _While = _bind;
      const _cond$2 = _While._0;
      const _body$2 = _While._1;
      return _M0FP46heyq026moonjs3src8compiler14compile__while(c, _cond$2, _body$2, stmt.span.start);
    }
    case 4: {
      const _DoWhile = _bind;
      const _body$3 = _DoWhile._0;
      const _cond$3 = _DoWhile._1;
      return _M0FP46heyq026moonjs3src8compiler18compile__do__while(c, _body$3, _cond$3, stmt.span.start);
    }
    case 5: {
      const _For = _bind;
      const _init = _For._0;
      const _cond$4 = _For._1;
      const _update = _For._2;
      const _body$4 = _For._3;
      return _M0FP46heyq026moonjs3src8compiler12compile__for(c, _init, _cond$4, _update, _body$4, stmt.span.start);
    }
    case 11: {
      const _Return = _bind;
      const _arg = _Return._0;
      return _M0FP46heyq026moonjs3src8compiler15compile__return(c, _arg, stmt.span.start);
    }
    case 9: {
      const _Break = _bind;
      const _label = _Break._0;
      return _M0FP46heyq026moonjs3src8compiler14compile__break(c, _label, stmt.span.start);
    }
    case 10: {
      const _Continue = _bind;
      const _label$2 = _Continue._0;
      return _M0FP46heyq026moonjs3src8compiler17compile__continue(c, _label$2, stmt.span.start);
    }
    case 12: {
      const _Throw = _bind;
      const _arg$2 = _Throw._0;
      const _bind$4 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, _arg$2);
      if (_bind$4.$tag === 0) {
        const _Err = _bind$4;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
      }
      _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(_M0MP46heyq026moonjs3src8compiler8Compiler3top(c).chunk, 112, 0, 0, 0, stmt.span.start);
      return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
    }
    case 13: {
      const _Try = _bind;
      const _body$5 = _Try._0;
      const _catch_ = _Try._1;
      const _finally_ = _Try._2;
      return _M0FP46heyq026moonjs3src8compiler12compile__try(c, _body$5, _catch_, _finally_, stmt.span.start);
    }
    case 14: {
      const _Labeled = _bind;
      const _label$3 = _Labeled._0;
      const _body$6 = _Labeled._1;
      return _M0FP46heyq026moonjs3src8compiler16compile__labeled(c, _label$3, _body$6, stmt.span.start);
    }
    case 15: {
      const _VarDecl = _bind;
      const _kind = _VarDecl._0;
      const _decls = _VarDecl._1;
      return _M0FP46heyq026moonjs3src8compiler18compile__var__decl(c, _kind, _decls, stmt.span.start);
    }
    case 16: {
      const _bind$5 = stmt.kind;
      if (_bind$5.$tag === 16) {
        const _FunctionDecl = _bind$5;
        const _id = _FunctionDecl._0;
        const _params = _FunctionDecl._1;
        const _body$7 = _FunctionDecl._2;
        const _is_async = _FunctionDecl._3;
        const _is_generator = _FunctionDecl._4;
        if (_is_async || _is_generator) {
          return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError("async / generator function requires M2", stmt.span.start));
        }
        const _bind$6 = _M0FP46heyq026moonjs3src8compiler27compile__function__template(c, _id, _params, _body$7, stmt.span.start);
        if (_bind$6.$tag === 0) {
          const _Err = _bind$6;
          const _e = _Err._0;
          return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
        } else {
          const _Ok = _bind$6;
          const _nested_idx = _Ok._0;
          const top$2 = _M0MP46heyq026moonjs3src8compiler8Compiler3top(c);
          _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(top$2.chunk, 80, _nested_idx, stmt.span.start);
          const slot = _M0MP46heyq026moonjs3src8compiler16FunctionCompiler14declare__local(top$2, _id, 0);
          _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(top$2.chunk, 17, slot, stmt.span.start);
          _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(top$2.chunk, 8, 0, 0, 0, stmt.span.start);
          return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
        }
      } else {
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
      }
    }
    case 17: {
      return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError("class declaration requires M2", stmt.span.start));
    }
    case 8: {
      return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError("switch requires M2", stmt.span.start));
    }
    case 19: {
      return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError("with requires M2", stmt.span.start));
    }
    case 6: {
      return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError("for-in requires M2", stmt.span.start));
    }
    case 7: {
      return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError("for-of requires M2", stmt.span.start));
    }
    case 20: {
      return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError("import requires M5", stmt.span.start));
    }
    default: {
      return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError("export requires M5", stmt.span.start));
    }
  }
}
function _M0FP46heyq026moonjs3src8compiler18compile__do__while(c, body, cond, loc) {
  const chunk = _M0MP46heyq026moonjs3src8compiler8Compiler3top(c).chunk;
  const loop_start = chunk.code.length;
  const frame = new _M0TP46heyq026moonjs3src8compiler9LoopFrame([], [], undefined);
  _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(_M0MP46heyq026moonjs3src8compiler8Compiler3top(c).loop_stack, frame);
  const compile_r = _M0FP46heyq026moonjs3src8compiler13compile__stmt(c, body);
  const popped = _M0MPC15array5Array3popGRP46heyq026moonjs3src8compiler16FunctionCompilerE(_M0MP46heyq026moonjs3src8compiler8Compiler3top(c).loop_stack);
  let popped$2;
  if (popped === undefined) {
    popped$2 = $panic();
  } else {
    const _Some = popped;
    popped$2 = _Some;
  }
  if (compile_r.$tag === 0) {
    const _Err = compile_r;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
  }
  const cond_pc = chunk.code.length;
  const _bind = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, cond);
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
  }
  _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__i32(chunk, 97, 16777216, loc);
  const jit_pc = chunk.code.length - 2 | 0;
  _M0MP46heyq026moonjs3src8bytecode5Chunk11patch__jump(chunk, jit_pc, loop_start);
  const end_pc = chunk.code.length;
  const _bind$2 = popped$2.break_patches;
  const _bind$3 = _bind$2.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$3) {
      const p = _bind$2[_];
      _M0MP46heyq026moonjs3src8bytecode5Chunk11patch__jump(chunk, p, end_pc);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const _bind$4 = popped$2.continue_patches;
  const _bind$5 = _bind$4.length;
  let _tmp$2 = 0;
  while (true) {
    const _ = _tmp$2;
    if (_ < _bind$5) {
      const p = _bind$4[_];
      _M0MP46heyq026moonjs3src8bytecode5Chunk11patch__jump(chunk, p, cond_pc);
      _tmp$2 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
}
function _M0FP46heyq026moonjs3src8compiler13compile__expr(c, expr) {
  const loc = expr.span.start;
  _L: {
    const _bind = expr.kind;
    switch (_bind.$tag) {
      case 0: {
        _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(_M0MP46heyq026moonjs3src8compiler8Compiler3top(c).chunk, 1, 0, 0, 0, loc);
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
      }
      case 1: {
        _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(_M0MP46heyq026moonjs3src8compiler8Compiler3top(c).chunk, 2, 0, 0, 0, loc);
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
      }
      case 2: {
        const _Boolean_ = _bind;
        const _x = _Boolean_._0;
        if (_x === true) {
          _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(_M0MP46heyq026moonjs3src8compiler8Compiler3top(c).chunk, 3, 0, 0, 0, loc);
          return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
        } else {
          _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(_M0MP46heyq026moonjs3src8compiler8Compiler3top(c).chunk, 4, 0, 0, 0, loc);
          return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
        }
      }
      case 3: {
        const _NumberLit = _bind;
        const _d = _NumberLit._0;
        return _M0FP46heyq026moonjs3src8compiler20compile__number__lit(c, _d, loc);
      }
      case 4: {
        const _StringLit = _bind;
        const _s = _StringLit._0;
        const idx = _M0MP46heyq026moonjs3src8bytecode5Chunk10add__const(_M0MP46heyq026moonjs3src8compiler8Compiler3top(c).chunk, new _M0DTP46heyq026moonjs3src5value7JSValue3Str(_s));
        _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(_M0MP46heyq026moonjs3src8compiler8Compiler3top(c).chunk, 6, idx, loc);
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
      }
      case 7: {
        const _Identifier = _bind;
        const _name = _Identifier._0;
        return _M0FP46heyq026moonjs3src8compiler24compile__identifier__get(c, _name, loc);
      }
      case 8: {
        _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(_M0MP46heyq026moonjs3src8compiler8Compiler3top(c).chunk, 24, 0, 0, 0, loc);
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
      }
      case 10: {
        const _Binary = _bind;
        const _op = _Binary._0;
        const _lhs = _Binary._1;
        const _rhs = _Binary._2;
        return _M0FP46heyq026moonjs3src8compiler15compile__binary(c, _op, _lhs, _rhs, loc);
      }
      case 11: {
        const _Logical = _bind;
        const _op$2 = _Logical._0;
        const _lhs$2 = _Logical._1;
        const _rhs$2 = _Logical._2;
        return _M0FP46heyq026moonjs3src8compiler16compile__logical(c, _op$2, _lhs$2, _rhs$2, loc);
      }
      case 12: {
        const _Unary = _bind;
        const _op$3 = _Unary._0;
        const _arg = _Unary._1;
        const _prefix = _Unary._2;
        return _M0FP46heyq026moonjs3src8compiler14compile__unary(c, _op$3, _arg, _prefix, loc);
      }
      case 13: {
        const _Update = _bind;
        const _op$4 = _Update._0;
        const _arg$2 = _Update._1;
        const _prefix$2 = _Update._2;
        return _M0FP46heyq026moonjs3src8compiler15compile__update(c, _op$4, _arg$2, _prefix$2, loc);
      }
      case 14: {
        const _Assign = _bind;
        const _op$5 = _Assign._0;
        const _lhs$3 = _Assign._1;
        const _rhs$3 = _Assign._2;
        return _M0FP46heyq026moonjs3src8compiler15compile__assign(c, _op$5, _lhs$3, _rhs$3, loc);
      }
      case 15: {
        const _Cond = _bind;
        const _cond = _Cond._0;
        const _cons = _Cond._1;
        const _alt = _Cond._2;
        return _M0FP46heyq026moonjs3src8compiler13compile__cond(c, _cond, _cons, _alt, loc);
      }
      case 16: {
        const _Member = _bind;
        const _obj = _Member._0;
        const _prop = _Member._1;
        const _bind$2 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, _obj);
        if (_bind$2.$tag === 0) {
          const _Err = _bind$2;
          const _e = _Err._0;
          return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
        }
        const idx$2 = _M0MP46heyq026moonjs3src8compiler8Compiler10str__const(c, _prop);
        _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(_M0MP46heyq026moonjs3src8compiler8Compiler3top(c).chunk, 66, idx$2, loc);
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
      }
      case 17: {
        const _IndexAccess = _bind;
        const _obj$2 = _IndexAccess._0;
        const _index = _IndexAccess._1;
        const _bind$3 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, _obj$2);
        if (_bind$3.$tag === 0) {
          const _Err = _bind$3;
          const _e = _Err._0;
          return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
        }
        const _bind$4 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, _index);
        if (_bind$4.$tag === 0) {
          const _Err = _bind$4;
          const _e = _Err._0;
          return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
        }
        _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(_M0MP46heyq026moonjs3src8compiler8Compiler3top(c).chunk, 68, 0, 0, 0, loc);
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
      }
      case 21: {
        const _Call = _bind;
        const _callee = _Call._0;
        const _args = _Call._1;
        return _M0FP46heyq026moonjs3src8compiler13compile__call(c, _callee, _args, loc);
      }
      case 22: {
        const _New = _bind;
        const _callee$2 = _New._0;
        const _args$2 = _New._1;
        return _M0FP46heyq026moonjs3src8compiler12compile__new(c, _callee$2, _args$2, loc);
      }
      case 23: {
        const _ObjectLit = _bind;
        const _props = _ObjectLit._0;
        return _M0FP46heyq026moonjs3src8compiler20compile__object__lit(c, _props, loc);
      }
      case 24: {
        const _ArrayLit = _bind;
        const _elements = _ArrayLit._0;
        return _M0FP46heyq026moonjs3src8compiler19compile__array__lit(c, _elements, loc);
      }
      case 25: {
        const _FnExpr = _bind;
        const _id = _FnExpr._0;
        const _params = _FnExpr._1;
        const _body = _FnExpr._2;
        const _is_async = _FnExpr._3;
        const _is_generator = _FnExpr._4;
        if (_is_async || _is_generator) {
          return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError("async / generator function requires M2", loc));
        }
        const _bind$5 = _M0FP46heyq026moonjs3src8compiler27compile__function__template(c, _id, _params, _body, loc);
        if (_bind$5.$tag === 0) {
          const _Err = _bind$5;
          const _e = _Err._0;
          return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
        } else {
          const _Ok = _bind$5;
          const _nested_idx = _Ok._0;
          _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(_M0MP46heyq026moonjs3src8compiler8Compiler3top(c).chunk, 80, _nested_idx, loc);
          return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
        }
      }
      case 28: {
        const _Sequence = _bind;
        const _exprs = _Sequence._0;
        if (_exprs.length === 0) {
          _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(_M0MP46heyq026moonjs3src8compiler8Compiler3top(c).chunk, 1, 0, 0, 0, loc);
          return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
        }
        let i = 0;
        while (true) {
          if (i < _exprs.length) {
            const _bind$6 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(_exprs, i));
            if (_bind$6.$tag === 0) {
              const _Err = _bind$6;
              const _e = _Err._0;
              return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
            }
            if (i < (_exprs.length - 1 | 0)) {
              _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(_M0MP46heyq026moonjs3src8compiler8Compiler3top(c).chunk, 8, 0, 0, 0, _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(_exprs, i).span.start);
            }
            i = i + 1 | 0;
            continue;
          } else {
            break;
          }
        }
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
      }
      case 26: {
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError("arrow function requires M2", loc));
      }
      case 27: {
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError("class expression requires M2", loc));
      }
      case 5: {
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError("template literal requires M2", loc));
      }
      case 31: {
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError("tagged template requires M2", loc));
      }
      case 6: {
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError("regexp literal requires M4", loc));
      }
      case 18: {
        break _L;
      }
      case 19: {
        break _L;
      }
      case 20: {
        break _L;
      }
      case 29: {
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError("yield requires M2", loc));
      }
      case 30: {
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError("await requires M4", loc));
      }
      default: {
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError("super requires M2", loc));
      }
    }
  }
  return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError("optional chaining requires M2", loc));
}
function _M0FP46heyq026moonjs3src8compiler19compile__array__lit(c, elements, loc) {
  const chunk = _M0MP46heyq026moonjs3src8compiler8Compiler3top(c).chunk;
  _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 72, elements.length, loc);
  const _bind = elements.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const el = elements[_];
      switch (el.$tag) {
        case 1: {
          const _Item = el;
          const _e = _Item._0;
          const _bind$2 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, _e);
          if (_bind$2.$tag === 0) {
            const _Err = _bind$2;
            const _err = _Err._0;
            return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_err);
          }
          _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 73, 0, 0, 0, _e.span.start);
          break;
        }
        case 0: {
          _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 1, 0, 0, 0, loc);
          _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 73, 0, 0, 0, loc);
          break;
        }
        default: {
          return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError("array spread requires M2", loc));
        }
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
}
function _M0FP46heyq026moonjs3src8compiler15compile__assign(c, op, lhs, rhs, loc) {
  if (op === 0) {
    return _M0FP46heyq026moonjs3src8compiler23compile__assign__simple(c, lhs, rhs, loc);
  } else {
    return _M0FP46heyq026moonjs3src8compiler25compile__assign__compound(c, op, lhs, rhs, loc);
  }
}
function _M0FP46heyq026moonjs3src8compiler25compile__assign__compound(c, op, lhs, rhs, loc) {
  _L: {
    _L$2: {
      switch (op) {
        case 13: {
          break _L$2;
        }
        case 14: {
          break _L$2;
        }
        case 15: {
          break _L$2;
        }
      }
      break _L;
    }
    return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError("short-circuit compound assign (&&=, ||=, ??=) requires M2", loc));
  }
  const bin_op = _M0FP46heyq026moonjs3src8compiler17binop__of__assign(op);
  const _bind = lhs.kind;
  switch (_bind.$tag) {
    case 7: {
      const _Identifier = _bind;
      const _name = _Identifier._0;
      const _bind$2 = _M0FP46heyq026moonjs3src8compiler24compile__identifier__get(c, _name, loc);
      if (_bind$2.$tag === 0) {
        const _Err = _bind$2;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
      }
      const _bind$3 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, rhs);
      if (_bind$3.$tag === 0) {
        const _Err = _bind$3;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
      }
      _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(_M0MP46heyq026moonjs3src8compiler8Compiler3top(c).chunk, bin_op, 0, 0, 0, loc);
      return _M0FP46heyq026moonjs3src8compiler24compile__identifier__set(c, _name, loc);
    }
    case 16: {
      const _Member = _bind;
      const _obj = _Member._0;
      const _prop = _Member._1;
      const chunk = _M0MP46heyq026moonjs3src8compiler8Compiler3top(c).chunk;
      const _bind$4 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, _obj);
      if (_bind$4.$tag === 0) {
        const _Err = _bind$4;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
      }
      _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 7, 0, 0, 0, loc);
      const name_idx = _M0MP46heyq026moonjs3src8compiler8Compiler10str__const(c, _prop);
      _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 66, name_idx, loc);
      const _bind$5 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, rhs);
      if (_bind$5.$tag === 0) {
        const _Err = _bind$5;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
      }
      _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, bin_op, 0, 0, 0, loc);
      _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 67, name_idx, loc);
      return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
    }
    case 17: {
      const _IndexAccess = _bind;
      const _obj$2 = _IndexAccess._0;
      const _index = _IndexAccess._1;
      const chunk$2 = _M0MP46heyq026moonjs3src8compiler8Compiler3top(c).chunk;
      const _bind$6 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, _obj$2);
      if (_bind$6.$tag === 0) {
        const _Err = _bind$6;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
      }
      const temp_obj = _M0MP46heyq026moonjs3src8bytecode5Chunk12alloc__local(chunk$2);
      _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk$2, 7, 0, 0, 0, loc);
      _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk$2, 17, temp_obj, loc);
      const _bind$7 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, _index);
      if (_bind$7.$tag === 0) {
        const _Err = _bind$7;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
      }
      const temp_idx = _M0MP46heyq026moonjs3src8bytecode5Chunk12alloc__local(chunk$2);
      _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk$2, 7, 0, 0, 0, loc);
      _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk$2, 17, temp_idx, loc);
      _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk$2, 68, 0, 0, 0, loc);
      const _bind$8 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, rhs);
      if (_bind$8.$tag === 0) {
        const _Err = _bind$8;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
      }
      _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk$2, bin_op, 0, 0, 0, loc);
      _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk$2, 16, temp_obj, loc);
      _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk$2, 16, temp_idx, loc);
      const temp_new = _M0MP46heyq026moonjs3src8bytecode5Chunk12alloc__local(chunk$2);
      _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk$2, 8, 0, 0, 0, loc);
      _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk$2, 8, 0, 0, 0, loc);
      _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk$2, 7, 0, 0, 0, loc);
      _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk$2, 17, temp_new, loc);
      _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk$2, 8, 0, 0, 0, loc);
      _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk$2, 16, temp_obj, loc);
      _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk$2, 16, temp_idx, loc);
      _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk$2, 16, temp_new, loc);
      _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk$2, 69, 0, 0, 0, loc);
      return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
    }
    default: {
      return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError("invalid assignment target", lhs.span.start));
    }
  }
}
function _M0FP46heyq026moonjs3src8compiler23compile__assign__simple(c, lhs, rhs, loc) {
  const chunk = _M0MP46heyq026moonjs3src8compiler8Compiler3top(c).chunk;
  const _bind = lhs.kind;
  switch (_bind.$tag) {
    case 7: {
      const _Identifier = _bind;
      const _name = _Identifier._0;
      const _bind$2 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, rhs);
      if (_bind$2.$tag === 0) {
        const _Err = _bind$2;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
      }
      return _M0FP46heyq026moonjs3src8compiler24compile__identifier__set(c, _name, loc);
    }
    case 16: {
      const _Member = _bind;
      const _obj = _Member._0;
      const _prop = _Member._1;
      const _bind$3 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, _obj);
      if (_bind$3.$tag === 0) {
        const _Err = _bind$3;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
      }
      const _bind$4 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, rhs);
      if (_bind$4.$tag === 0) {
        const _Err = _bind$4;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
      }
      const name_idx = _M0MP46heyq026moonjs3src8compiler8Compiler10str__const(c, _prop);
      _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 67, name_idx, loc);
      return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
    }
    case 17: {
      const _IndexAccess = _bind;
      const _obj$2 = _IndexAccess._0;
      const _index = _IndexAccess._1;
      const _bind$5 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, _obj$2);
      if (_bind$5.$tag === 0) {
        const _Err = _bind$5;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
      }
      const _bind$6 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, _index);
      if (_bind$6.$tag === 0) {
        const _Err = _bind$6;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
      }
      const _bind$7 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, rhs);
      if (_bind$7.$tag === 0) {
        const _Err = _bind$7;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
      }
      _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 69, 0, 0, 0, loc);
      return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
    }
    default: {
      return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError("invalid assignment target", lhs.span.start));
    }
  }
}
function _M0FP46heyq026moonjs3src8compiler15compile__binary(c, op, lhs, rhs, loc) {
  const _bind = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, lhs);
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
  }
  const _bind$2 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, rhs);
  if (_bind$2.$tag === 0) {
    const _Err = _bind$2;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
  }
  let opcode;
  switch (op) {
    case 0: {
      opcode = 32;
      break;
    }
    case 1: {
      opcode = 33;
      break;
    }
    case 2: {
      opcode = 34;
      break;
    }
    case 3: {
      opcode = 35;
      break;
    }
    case 4: {
      opcode = 36;
      break;
    }
    case 5: {
      opcode = 37;
      break;
    }
    case 6: {
      opcode = 40;
      break;
    }
    case 7: {
      opcode = 41;
      break;
    }
    case 8: {
      opcode = 42;
      break;
    }
    case 9: {
      opcode = 43;
      break;
    }
    case 10: {
      opcode = 44;
      break;
    }
    case 11: {
      opcode = 45;
      break;
    }
    case 12: {
      opcode = 46;
      break;
    }
    case 13: {
      opcode = 47;
      break;
    }
    case 14: {
      opcode = 48;
      break;
    }
    case 15: {
      opcode = 49;
      break;
    }
    case 16: {
      opcode = 50;
      break;
    }
    case 17: {
      opcode = 51;
      break;
    }
    case 18: {
      opcode = 52;
      break;
    }
    case 19: {
      opcode = 53;
      break;
    }
    case 20: {
      opcode = 57;
      break;
    }
    default: {
      opcode = 56;
    }
  }
  _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(_M0MP46heyq026moonjs3src8compiler8Compiler3top(c).chunk, opcode, 0, 0, 0, loc);
  return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
}
function _M0FP46heyq026moonjs3src8compiler13compile__call(c, callee, args, loc) {
  const chunk = _M0MP46heyq026moonjs3src8compiler8Compiler3top(c).chunk;
  const _bind = args.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const a = args[_];
      if (a.$tag === 1) {
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError("spread argument requires M2", loc));
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const _bind$2 = callee.kind;
  switch (_bind$2.$tag) {
    case 16: {
      const _Member = _bind$2;
      const _obj = _Member._0;
      const _prop = _Member._1;
      const _bind$3 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, _obj);
      if (_bind$3.$tag === 0) {
        const _Err = _bind$3;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
      }
      _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 7, 0, 0, 0, loc);
      const name_idx = _M0MP46heyq026moonjs3src8compiler8Compiler10str__const(c, _prop);
      _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 66, name_idx, loc);
      const _bind$4 = args.length;
      let _tmp$2 = 0;
      while (true) {
        const _ = _tmp$2;
        if (_ < _bind$4) {
          const a = args[_];
          if (a.$tag === 0) {
            const _ArgExpr = a;
            const _e = _ArgExpr._0;
            const _bind$5 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, _e);
            if (_bind$5.$tag === 0) {
              const _Err = _bind$5;
              const _err = _Err._0;
              return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_err);
            }
          }
          _tmp$2 = _ + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 82, args.length, loc);
      return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
    }
    case 17: {
      const _IndexAccess = _bind$2;
      const _obj$2 = _IndexAccess._0;
      const _index = _IndexAccess._1;
      const _bind$5 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, _obj$2);
      if (_bind$5.$tag === 0) {
        const _Err = _bind$5;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
      }
      _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 7, 0, 0, 0, loc);
      const _bind$6 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, _index);
      if (_bind$6.$tag === 0) {
        const _Err = _bind$6;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
      }
      _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 68, 0, 0, 0, loc);
      const _bind$7 = args.length;
      let _tmp$3 = 0;
      while (true) {
        const _ = _tmp$3;
        if (_ < _bind$7) {
          const a = args[_];
          if (a.$tag === 0) {
            const _ArgExpr = a;
            const _e = _ArgExpr._0;
            const _bind$8 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, _e);
            if (_bind$8.$tag === 0) {
              const _Err = _bind$8;
              const _err = _Err._0;
              return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_err);
            }
          }
          _tmp$3 = _ + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 82, args.length, loc);
      return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
    }
    default: {
      const _bind$8 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, callee);
      if (_bind$8.$tag === 0) {
        const _Err = _bind$8;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
      }
      const _bind$9 = args.length;
      let _tmp$4 = 0;
      while (true) {
        const _ = _tmp$4;
        if (_ < _bind$9) {
          const a = args[_];
          if (a.$tag === 0) {
            const _ArgExpr = a;
            const _e = _ArgExpr._0;
            const _bind$10 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, _e);
            if (_bind$10.$tag === 0) {
              const _Err = _bind$10;
              const _err = _Err._0;
              return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_err);
            }
          }
          _tmp$4 = _ + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 81, args.length, loc);
      return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
    }
  }
}
function _M0FP46heyq026moonjs3src8compiler13compile__cond(c, cond, cons, alt, loc) {
  const chunk = _M0MP46heyq026moonjs3src8compiler8Compiler3top(c).chunk;
  const _bind = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, cond);
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
  }
  _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 98, 16777216, loc);
  const jif_pc = chunk.code.length - 2 | 0;
  const _bind$2 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, cons);
  if (_bind$2.$tag === 0) {
    const _Err = _bind$2;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
  }
  _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__i32(chunk, 96, 16777216, loc);
  const j_pc = chunk.code.length - 2 | 0;
  _M0MP46heyq026moonjs3src8bytecode5Chunk11patch__jump(chunk, jif_pc, chunk.code.length);
  const _bind$3 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, alt);
  if (_bind$3.$tag === 0) {
    const _Err = _bind$3;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
  }
  _M0MP46heyq026moonjs3src8bytecode5Chunk11patch__jump(chunk, j_pc, chunk.code.length);
  return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
}
function _M0FP46heyq026moonjs3src8compiler27compile__function__template(c, id_opt, params, body, loc) {
  const _bind = params.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const p = params[_];
      const _bind$2 = p.kind;
      if (_bind$2.$tag === 0) {
      } else {
        return new _M0DTPC16result6ResultGiRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError("destructured / default parameters require M2", p.span.start));
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  let name;
  if (id_opt === undefined) {
    name = "<anonymous>";
  } else {
    const _Some = id_opt;
    name = _Some;
  }
  const parent_chunk = _M0MP46heyq026moonjs3src8compiler8Compiler3top(c).chunk;
  const filename = parent_chunk.filename;
  const child = _M0MP46heyq026moonjs3src8bytecode5Chunk3new(name, filename, params.length);
  const fc = _M0MP46heyq026moonjs3src8compiler16FunctionCompiler3new(child, false);
  _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(c.fn_stack, fc);
  const _bind$2 = params.length;
  let _tmp$2 = 0;
  while (true) {
    const i = _tmp$2;
    if (i < _bind$2) {
      const p = _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(params, i);
      const _bind$3 = p.kind;
      let pname;
      if (_bind$3.$tag === 0) {
        const _IdentPat = _bind$3;
        pname = _IdentPat._0;
      } else {
        pname = "<?>";
      }
      _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(fc.locals, new _M0TP46heyq026moonjs3src8compiler9LocalDecl(pname, i));
      _tmp$2 = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  if (id_opt === undefined) {
  } else {
    const _Some = id_opt;
    const _fn_name = _Some;
    const _bind$3 = _M0MP46heyq026moonjs3src8compiler16FunctionCompiler11find__local(fc, _fn_name);
    if (_bind$3 === undefined) {
      const slot = _M0MP46heyq026moonjs3src8compiler16FunctionCompiler14declare__local(fc, _fn_name, 2);
      _M0MP46heyq026moonjs3src8bytecode5Chunk24set__self__binding__slot(child, slot);
    }
  }
  const _bind$3 = _M0FP46heyq026moonjs3src8compiler25hoist__and__compile__body(c, body.body, false);
  if (_bind$3.$tag === 0) {
    const _Err = _bind$3;
    const _e = _Err._0;
    _M0MPC15array5Array3popGRP46heyq026moonjs3src8compiler16FunctionCompilerE(c.fn_stack);
    return new _M0DTPC16result6ResultGiRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
  }
  _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(child, 85, 0, 0, 0, loc);
  _M0MPC15array5Array3popGRP46heyq026moonjs3src8compiler16FunctionCompilerE(c.fn_stack);
  const idx = _M0MP46heyq026moonjs3src8bytecode5Chunk11add__nested(parent_chunk, child);
  return new _M0DTPC16result6ResultGiRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(idx);
}
function _M0FP46heyq026moonjs3src8compiler25hoist__and__compile__body(c, body, is_script) {
  const hoisted_fns = [];
  const hoisted_vars = [];
  _M0FP46heyq026moonjs3src8compiler16collect__hoisted(body, hoisted_fns, hoisted_vars);
  if (is_script) {
    const _bind = hoisted_vars.length;
    let _tmp = 0;
    while (true) {
      const _ = _tmp;
      if (_ < _bind) {
        const entry = hoisted_vars[_];
        const _name = entry._0;
        const _loc = entry._1;
        const idx = _M0MP46heyq026moonjs3src8compiler8Compiler10str__const(c, _name);
        const top = _M0MP46heyq026moonjs3src8compiler8Compiler3top(c);
        _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(top.chunk, 22, idx, _loc);
        _tmp = _ + 1 | 0;
        continue;
      } else {
        break;
      }
    }
  } else {
    const top = _M0MP46heyq026moonjs3src8compiler8Compiler3top(c);
    const _bind = hoisted_vars.length;
    let _tmp = 0;
    while (true) {
      const _ = _tmp;
      if (_ < _bind) {
        const entry = hoisted_vars[_];
        const _name = entry._0;
        const _bind$2 = _M0MP46heyq026moonjs3src8compiler16FunctionCompiler11find__local(top, _name);
        if (_bind$2 === undefined) {
          _M0MP46heyq026moonjs3src8compiler16FunctionCompiler14declare__local(top, _name, 0);
        }
        _tmp = _ + 1 | 0;
        continue;
      } else {
        break;
      }
    }
  }
  const _bind = hoisted_fns.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const entry = hoisted_fns[_];
      const _name = entry._0;
      const _params = entry._1;
      const _block = entry._2;
      const _loc = entry._3;
      const _bind$2 = _M0FP46heyq026moonjs3src8compiler27compile__function__template(c, _name, _params, _block, _loc);
      if (_bind$2.$tag === 0) {
        const _Err = _bind$2;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
      } else {
        const _Ok = _bind$2;
        const _nested_idx = _Ok._0;
        const top = _M0MP46heyq026moonjs3src8compiler8Compiler3top(c);
        _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(top.chunk, 80, _nested_idx, _loc);
        if (is_script) {
          const name_idx = _M0MP46heyq026moonjs3src8compiler8Compiler10str__const(c, _name);
          _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(top.chunk, 22, name_idx, _loc);
          _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(top.chunk, 21, name_idx, _loc);
          _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(top.chunk, 8, 0, 0, 0, _loc);
        } else {
          const _bind$3 = _M0MP46heyq026moonjs3src8compiler16FunctionCompiler11find__local(top, _name);
          let slot;
          if (_bind$3 === undefined) {
            slot = _M0MP46heyq026moonjs3src8compiler16FunctionCompiler14declare__local(top, _name, 0);
          } else {
            const _Some = _bind$3;
            slot = _Some;
          }
          _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(top.chunk, 17, slot, _loc);
          _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(top.chunk, 8, 0, 0, 0, _loc);
        }
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const _bind$2 = body.length;
  let _tmp$2 = 0;
  while (true) {
    const _ = _tmp$2;
    if (_ < _bind$2) {
      const stmt = body[_];
      const _bind$3 = stmt.kind;
      if (_bind$3.$tag === 16) {
      } else {
        const _bind$4 = _M0FP46heyq026moonjs3src8compiler13compile__stmt(c, stmt);
        if (_bind$4.$tag === 0) {
          const _Err = _bind$4;
          const _e = _Err._0;
          return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
        }
      }
      _tmp$2 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
}
function _M0FP46heyq026moonjs3src8compiler16compile__logical(c, op, lhs, rhs, loc) {
  const chunk = _M0MP46heyq026moonjs3src8compiler8Compiler3top(c).chunk;
  switch (op) {
    case 0: {
      const _bind = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, lhs);
      if (_bind.$tag === 0) {
        const _Err = _bind;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
      }
      _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 7, 0, 0, 0, loc);
      _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 98, 16777216, loc);
      const jif_pc = chunk.code.length - 2 | 0;
      _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 8, 0, 0, 0, loc);
      const _bind$2 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, rhs);
      if (_bind$2.$tag === 0) {
        const _Err = _bind$2;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
      }
      _M0MP46heyq026moonjs3src8bytecode5Chunk11patch__jump(chunk, jif_pc, chunk.code.length);
      return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
    }
    case 1: {
      const _bind$3 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, lhs);
      if (_bind$3.$tag === 0) {
        const _Err = _bind$3;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
      }
      _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 7, 0, 0, 0, loc);
      _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 97, 16777216, loc);
      const jit_pc = chunk.code.length - 2 | 0;
      _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 8, 0, 0, 0, loc);
      const _bind$4 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, rhs);
      if (_bind$4.$tag === 0) {
        const _Err = _bind$4;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
      }
      _M0MP46heyq026moonjs3src8bytecode5Chunk11patch__jump(chunk, jit_pc, chunk.code.length);
      return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
    }
    default: {
      const _bind$5 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, lhs);
      if (_bind$5.$tag === 0) {
        const _Err = _bind$5;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
      }
      _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 7, 0, 0, 0, loc);
      _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 2, 0, 0, 0, loc);
      _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 46, 0, 0, 0, loc);
      _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 98, 16777216, loc);
      const jif_pc$2 = chunk.code.length - 2 | 0;
      _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 8, 0, 0, 0, loc);
      const _bind$6 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, rhs);
      if (_bind$6.$tag === 0) {
        const _Err = _bind$6;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
      }
      _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__i32(chunk, 96, 16777216, loc);
      const end_j_pc = chunk.code.length - 2 | 0;
      _M0MP46heyq026moonjs3src8bytecode5Chunk11patch__jump(chunk, jif_pc$2, chunk.code.length);
      _M0MP46heyq026moonjs3src8bytecode5Chunk11patch__jump(chunk, end_j_pc, chunk.code.length);
      return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
    }
  }
}
function _M0FP46heyq026moonjs3src8compiler12compile__new(c, callee, args, loc) {
  const chunk = _M0MP46heyq026moonjs3src8compiler8Compiler3top(c).chunk;
  const _bind = args.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const a = args[_];
      if (a.$tag === 1) {
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError("spread argument requires M2", loc));
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const _bind$2 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, callee);
  if (_bind$2.$tag === 0) {
    const _Err = _bind$2;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
  }
  const _bind$3 = args.length;
  let _tmp$2 = 0;
  while (true) {
    const _ = _tmp$2;
    if (_ < _bind$3) {
      const a = args[_];
      if (a.$tag === 0) {
        const _ArgExpr = a;
        const _e = _ArgExpr._0;
        const _bind$4 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, _e);
        if (_bind$4.$tag === 0) {
          const _Err = _bind$4;
          const _err = _Err._0;
          return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_err);
        }
      }
      _tmp$2 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 83, args.length, loc);
  return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
}
function _M0FP46heyq026moonjs3src8compiler20compile__object__lit(c, props, loc) {
  const chunk = _M0MP46heyq026moonjs3src8compiler8Compiler3top(c).chunk;
  _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 64, 0, 0, 0, loc);
  const _bind = props.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const p = props[_];
      switch (p.$tag) {
        case 0: {
          const _KeyValue = p;
          const _key = _KeyValue._0;
          const _value = _KeyValue._1;
          let key_name;
          switch (_key.$tag) {
            case 0: {
              const _IdKey = _key;
              key_name = _IdKey._0;
              break;
            }
            case 1: {
              const _StringKey = _key;
              key_name = _StringKey._0;
              break;
            }
            case 2: {
              const _NumberKey = _key;
              const _d = _NumberKey._0;
              key_name = _M0FP46heyq026moonjs3src8compiler23number__key__to__string(_d);
              break;
            }
            case 3: {
              return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError("computed key requires M2", loc));
            }
            default: {
              return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError("private field requires M2", loc));
            }
          }
          const _bind$2 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, _value);
          if (_bind$2.$tag === 0) {
            const _Err = _bind$2;
            const _e = _Err._0;
            return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
          }
          const name_idx = _M0MP46heyq026moonjs3src8compiler8Compiler10str__const(c, key_name);
          _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 65, name_idx, _value.span.start);
          break;
        }
        case 1: {
          return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError("method shorthand requires M2", loc));
        }
        case 2: {
          return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError("getter requires M3", loc));
        }
        case 3: {
          return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError("setter requires M3", loc));
        }
        default: {
          return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError("spread property requires M2", loc));
        }
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
}
function _M0FP46heyq026moonjs3src8compiler14compile__unary(c, op, arg, _prefix, loc) {
  const chunk = _M0MP46heyq026moonjs3src8compiler8Compiler3top(c).chunk;
  switch (op) {
    case 0: {
      const _bind = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, arg);
      if (_bind.$tag === 0) {
        const _Err = _bind;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
      }
      _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 25, 0, 0, 0, loc);
      return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
    }
    case 1: {
      const _bind$2 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, arg);
      if (_bind$2.$tag === 0) {
        const _Err = _bind$2;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
      }
      _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 38, 0, 0, 0, loc);
      return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
    }
    case 2: {
      const _bind$3 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, arg);
      if (_bind$3.$tag === 0) {
        const _Err = _bind$3;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
      }
      _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 54, 0, 0, 0, loc);
      return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
    }
    case 3: {
      const _bind$4 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, arg);
      if (_bind$4.$tag === 0) {
        const _Err = _bind$4;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
      }
      _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 39, 0, 0, 0, loc);
      return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
    }
    case 4: {
      const _bind$5 = arg.kind;
      if (_bind$5.$tag === 7) {
        const _Identifier = _bind$5;
        const _name = _Identifier._0;
        const _bind$6 = _M0MP46heyq026moonjs3src8compiler8Compiler7resolve(c, _name);
        switch (_bind$6.$tag) {
          case 0: {
            const _RefLocal = _bind$6;
            const _slot = _RefLocal._0;
            _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 16, _slot, arg.span.start);
            break;
          }
          case 1: {
            const _RefUpvalue = _bind$6;
            const _idx = _RefUpvalue._0;
            _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 18, _idx, arg.span.start);
            break;
          }
          default: {
            const name_idx = _M0MP46heyq026moonjs3src8compiler8Compiler10str__const(c, _name);
            _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 23, name_idx, arg.span.start);
          }
        }
      } else {
        const _bind$6 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, arg);
        if (_bind$6.$tag === 0) {
          const _Err = _bind$6;
          const _e = _Err._0;
          return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
        }
      }
      _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 55, 0, 0, 0, loc);
      return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
    }
    case 5: {
      const _bind$6 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, arg);
      if (_bind$6.$tag === 0) {
        const _Err = _bind$6;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
      }
      _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 8, 0, 0, 0, loc);
      _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 1, 0, 0, 0, loc);
      return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
    }
    default: {
      const _bind$7 = arg.kind;
      switch (_bind$7.$tag) {
        case 16: {
          const _Member = _bind$7;
          const _obj = _Member._0;
          const _prop = _Member._1;
          const _bind$8 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, _obj);
          if (_bind$8.$tag === 0) {
            const _Err = _bind$8;
            const _e = _Err._0;
            return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
          }
          const idx = _M0MP46heyq026moonjs3src8compiler8Compiler10str__const(c, _prop);
          _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 70, idx, loc);
          return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
        }
        case 17: {
          const _IndexAccess = _bind$7;
          const _obj$2 = _IndexAccess._0;
          const _index = _IndexAccess._1;
          const _bind$9 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, _obj$2);
          if (_bind$9.$tag === 0) {
            const _Err = _bind$9;
            const _e = _Err._0;
            return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
          }
          const _bind$10 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, _index);
          if (_bind$10.$tag === 0) {
            const _Err = _bind$10;
            const _e = _Err._0;
            return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
          }
          _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 71, 0, 0, 0, loc);
          return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
        }
        default: {
          const _bind$11 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, arg);
          if (_bind$11.$tag === 0) {
            const _Err = _bind$11;
            const _e = _Err._0;
            return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
          }
          _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 8, 0, 0, 0, loc);
          _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 3, 0, 0, 0, loc);
          return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
        }
      }
    }
  }
}
function _M0FP46heyq026moonjs3src8compiler15compile__update(c, op, arg, prefix, loc) {
  const chunk = _M0MP46heyq026moonjs3src8compiler8Compiler3top(c).chunk;
  let add_or_sub;
  if (op === 0) {
    add_or_sub = 32;
  } else {
    add_or_sub = 33;
  }
  const _bind = arg.kind;
  switch (_bind.$tag) {
    case 7: {
      const _Identifier = _bind;
      const _name = _Identifier._0;
      const _bind$2 = _M0FP46heyq026moonjs3src8compiler24compile__identifier__get(c, _name, loc);
      if (_bind$2.$tag === 0) {
        const _Err = _bind$2;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
      }
      _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 25, 0, 0, 0, loc);
      if (prefix) {
        _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__i32(chunk, 5, 1, loc);
        _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, add_or_sub, 0, 0, 0, loc);
        const _bind$3 = _M0FP46heyq026moonjs3src8compiler24compile__identifier__set(c, _name, loc);
        if (_bind$3.$tag === 0) {
          const _Err = _bind$3;
          const _e = _Err._0;
          return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
        }
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
      } else {
        const temp_old = _M0MP46heyq026moonjs3src8bytecode5Chunk12alloc__local(chunk);
        _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 7, 0, 0, 0, loc);
        _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 17, temp_old, loc);
        _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 8, 0, 0, 0, loc);
        _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__i32(chunk, 5, 1, loc);
        _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, add_or_sub, 0, 0, 0, loc);
        const _bind$3 = _M0MP46heyq026moonjs3src8compiler8Compiler7resolve(c, _name);
        switch (_bind$3.$tag) {
          case 0: {
            const _RefLocal = _bind$3;
            const _slot = _RefLocal._0;
            _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 17, _slot, loc);
            break;
          }
          case 1: {
            const _RefUpvalue = _bind$3;
            const _idx = _RefUpvalue._0;
            _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 19, _idx, loc);
            break;
          }
          default: {
            const name_idx = _M0MP46heyq026moonjs3src8compiler8Compiler10str__const(c, _name);
            _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 21, name_idx, loc);
          }
        }
        _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 8, 0, 0, 0, loc);
        _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 16, temp_old, loc);
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
      }
    }
    case 16: {
      const _Member = _bind;
      const _obj = _Member._0;
      const _prop = _Member._1;
      return _M0FP46heyq026moonjs3src8compiler23compile__update__member(c, op, _obj, _prop, prefix, loc, add_or_sub);
    }
    case 17: {
      const _IndexAccess = _bind;
      const _obj$2 = _IndexAccess._0;
      const _index = _IndexAccess._1;
      return _M0FP46heyq026moonjs3src8compiler22compile__update__index(c, op, _obj$2, _index, prefix, loc, add_or_sub);
    }
    default: {
      return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError("cannot apply ++/-- to non-reference", arg.span.start));
    }
  }
}
function _M0FP46heyq026moonjs3src8compiler22compile__update__index(c, _op, obj, index, prefix, loc, add_or_sub) {
  const chunk = _M0MP46heyq026moonjs3src8compiler8Compiler3top(c).chunk;
  const _bind = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, obj);
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
  }
  const temp_obj = _M0MP46heyq026moonjs3src8bytecode5Chunk12alloc__local(chunk);
  _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 7, 0, 0, 0, loc);
  _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 17, temp_obj, loc);
  _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 8, 0, 0, 0, loc);
  const _bind$2 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, index);
  if (_bind$2.$tag === 0) {
    const _Err = _bind$2;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
  }
  const temp_idx = _M0MP46heyq026moonjs3src8bytecode5Chunk12alloc__local(chunk);
  _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 7, 0, 0, 0, loc);
  _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 17, temp_idx, loc);
  _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 8, 0, 0, 0, loc);
  _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 68, 0, 0, 0, loc);
  _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 25, 0, 0, 0, loc);
  const temp_old = _M0MP46heyq026moonjs3src8bytecode5Chunk12alloc__local(chunk);
  _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 7, 0, 0, 0, loc);
  _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 17, temp_old, loc);
  _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 8, 0, 0, 0, loc);
  _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__i32(chunk, 5, 1, loc);
  _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, add_or_sub, 0, 0, 0, loc);
  const temp_new = _M0MP46heyq026moonjs3src8bytecode5Chunk12alloc__local(chunk);
  _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 7, 0, 0, 0, loc);
  _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 17, temp_new, loc);
  _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 8, 0, 0, 0, loc);
  _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 8, 0, 0, 0, loc);
  _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 16, temp_obj, loc);
  _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 16, temp_idx, loc);
  _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 16, temp_new, loc);
  _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 69, 0, 0, 0, loc);
  _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 8, 0, 0, 0, loc);
  if (prefix) {
    _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 16, temp_new, loc);
  } else {
    _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 16, temp_old, loc);
  }
  return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
}
function _M0FP46heyq026moonjs3src8compiler23compile__update__member(c, _op, obj, prop, prefix, loc, add_or_sub) {
  const chunk = _M0MP46heyq026moonjs3src8compiler8Compiler3top(c).chunk;
  const name_idx = _M0MP46heyq026moonjs3src8compiler8Compiler10str__const(c, prop);
  const _bind = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, obj);
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
  }
  _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 7, 0, 0, 0, loc);
  _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 66, name_idx, loc);
  _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 25, 0, 0, 0, loc);
  if (prefix) {
    _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__i32(chunk, 5, 1, loc);
    _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, add_or_sub, 0, 0, 0, loc);
    _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 67, name_idx, loc);
    return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
  } else {
    const temp_old = _M0MP46heyq026moonjs3src8bytecode5Chunk12alloc__local(chunk);
    _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 7, 0, 0, 0, loc);
    _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 17, temp_old, loc);
    _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 8, 0, 0, 0, loc);
    _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__i32(chunk, 5, 1, loc);
    _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, add_or_sub, 0, 0, 0, loc);
    _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 67, name_idx, loc);
    _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 8, 0, 0, 0, loc);
    _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 16, temp_old, loc);
    return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
  }
}
function _M0FP46heyq026moonjs3src8compiler12compile__for(c, init, cond, update, body, loc) {
  const top = _M0MP46heyq026moonjs3src8compiler8Compiler3top(c);
  top.scope_depth = top.scope_depth + 1 | 0;
  const saved_locals = top.locals.length;
  if (init === undefined) {
  } else {
    const _Some = init;
    const _x = _Some;
    if (_x.$tag === 1) {
      const _InitExpr = _x;
      const _e = _InitExpr._0;
      const _bind = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, _e);
      if (_bind.$tag === 0) {
        const _Err = _bind;
        const _err = _Err._0;
        top.scope_depth = top.scope_depth - 1 | 0;
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_err);
      }
      _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(top.chunk, 8, 0, 0, 0, _e.span.start);
    } else {
      const _InitVar = _x;
      const _kind = _InitVar._0;
      const _decls = _InitVar._1;
      const _bind = _M0FP46heyq026moonjs3src8compiler18compile__var__decl(c, _kind, _decls, loc);
      if (_bind.$tag === 0) {
        const _Err = _bind;
        const _err = _Err._0;
        top.scope_depth = top.scope_depth - 1 | 0;
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_err);
      }
    }
  }
  const chunk = top.chunk;
  const loop_start = chunk.code.length;
  let jif_pc_opt;
  if (cond === undefined) {
    jif_pc_opt = undefined;
  } else {
    const _Some = cond;
    const _e = _Some;
    const _bind = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, _e);
    if (_bind.$tag === 0) {
      const _Err = _bind;
      const _err = _Err._0;
      top.scope_depth = top.scope_depth - 1 | 0;
      return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_err);
    }
    _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 98, 16777216, _e.span.start);
    jif_pc_opt = chunk.code.length - 2 | 0;
  }
  const frame = new _M0TP46heyq026moonjs3src8compiler9LoopFrame([], [], undefined);
  _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(top.loop_stack, frame);
  const compile_r = _M0FP46heyq026moonjs3src8compiler13compile__stmt(c, body);
  const popped = _M0MPC15array5Array3popGRP46heyq026moonjs3src8compiler16FunctionCompilerE(top.loop_stack);
  let popped$2;
  if (popped === undefined) {
    popped$2 = $panic();
  } else {
    const _Some = popped;
    popped$2 = _Some;
  }
  if (compile_r.$tag === 0) {
    const _Err = compile_r;
    const _err = _Err._0;
    top.scope_depth = top.scope_depth - 1 | 0;
    return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_err);
  }
  const update_pc = chunk.code.length;
  if (update === undefined) {
  } else {
    const _Some = update;
    const _e = _Some;
    const _bind = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, _e);
    if (_bind.$tag === 0) {
      const _Err = _bind;
      const _err = _Err._0;
      top.scope_depth = top.scope_depth - 1 | 0;
      return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_err);
    }
    _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 8, 0, 0, 0, _e.span.start);
  }
  _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__i32(chunk, 96, 16777216, loc);
  const back_pc = chunk.code.length - 2 | 0;
  _M0MP46heyq026moonjs3src8bytecode5Chunk11patch__jump(chunk, back_pc, loop_start);
  const end_pc = chunk.code.length;
  if (jif_pc_opt === undefined) {
  } else {
    const _Some = jif_pc_opt;
    const _pc = _Some;
    _M0MP46heyq026moonjs3src8bytecode5Chunk11patch__jump(chunk, _pc, end_pc);
  }
  const _bind = popped$2.break_patches;
  const _bind$2 = _bind.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const p = _bind[_];
      _M0MP46heyq026moonjs3src8bytecode5Chunk11patch__jump(chunk, p, end_pc);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const _bind$3 = popped$2.continue_patches;
  const _bind$4 = _bind$3.length;
  let _tmp$2 = 0;
  while (true) {
    const _ = _tmp$2;
    if (_ < _bind$4) {
      const p = _bind$3[_];
      _M0MP46heyq026moonjs3src8bytecode5Chunk11patch__jump(chunk, p, update_pc);
      _tmp$2 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  while (true) {
    if (top.locals.length > saved_locals) {
      _M0MPC15array5Array3popGRP46heyq026moonjs3src8compiler16FunctionCompilerE(top.locals);
      continue;
    } else {
      break;
    }
  }
  top.scope_depth = top.scope_depth - 1 | 0;
  return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
}
function _M0FP46heyq026moonjs3src8compiler18compile__var__decl(c, kind, decls, _loc) {
  _L: {
    _L$2: {
      switch (kind) {
        case 3: {
          break _L$2;
        }
        case 4: {
          break _L$2;
        }
      }
      break _L;
    }
    return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError("'using' declarations require future milestone", _M0MP46heyq026moonjs3src4util9SourceLoc3new(1, 1)));
  }
  const _bind = decls.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const d = decls[_];
      const _bind$2 = d.pat.kind;
      let name;
      if (_bind$2.$tag === 0) {
        const _IdentPat = _bind$2;
        name = _IdentPat._0;
      } else {
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError("destructuring binding requires M2", d.pat.span.start));
      }
      const top = _M0MP46heyq026moonjs3src8compiler8Compiler3top(c);
      const dloc = d.pat.span.start;
      const _bind$3 = d.init;
      if (_bind$3 === undefined) {
        _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(top.chunk, 1, 0, 0, 0, dloc);
      } else {
        const _Some = _bind$3;
        const _e = _Some;
        const _bind$4 = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, _e);
        if (_bind$4.$tag === 0) {
          const _Err = _bind$4;
          const _err = _Err._0;
          return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_err);
        }
      }
      if (top.is_top_level) {
        const name_idx = _M0MP46heyq026moonjs3src8compiler8Compiler10str__const(c, name);
        switch (kind) {
          case 0: {
            break;
          }
          case 1: {
            _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(top.chunk, 22, name_idx, dloc);
            break;
          }
          case 2: {
            _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(top.chunk, 22, name_idx, dloc);
            break;
          }
        }
        _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(top.chunk, 21, name_idx, dloc);
        _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(top.chunk, 8, 0, 0, 0, dloc);
      } else {
        let slot;
        if (kind === 0) {
          const _bind$4 = _M0MP46heyq026moonjs3src8compiler16FunctionCompiler11find__local(top, name);
          if (_bind$4 === undefined) {
            slot = _M0MP46heyq026moonjs3src8compiler16FunctionCompiler14declare__local(top, name, 0);
          } else {
            const _Some = _bind$4;
            slot = _Some;
          }
        } else {
          slot = _M0MP46heyq026moonjs3src8compiler16FunctionCompiler14declare__local(top, name, kind);
        }
        _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(top.chunk, 17, slot, dloc);
        _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(top.chunk, 8, 0, 0, 0, dloc);
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
}
function _M0FP46heyq026moonjs3src8compiler11compile__if(c, cond, cons, alt, loc) {
  const _bind = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, cond);
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
  }
  const chunk = _M0MP46heyq026moonjs3src8compiler8Compiler3top(c).chunk;
  _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 98, 16777216, cond.span.start);
  const jif_pc = chunk.code.length - 2 | 0;
  const _bind$2 = _M0FP46heyq026moonjs3src8compiler13compile__stmt(c, cons);
  if (_bind$2.$tag === 0) {
    const _Err = _bind$2;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
  }
  if (alt === undefined) {
    _M0MP46heyq026moonjs3src8bytecode5Chunk11patch__jump(chunk, jif_pc, chunk.code.length);
  } else {
    const _Some = alt;
    const _alt_stmt = _Some;
    _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__i32(chunk, 96, 16777216, loc);
    const j_pc = chunk.code.length - 2 | 0;
    _M0MP46heyq026moonjs3src8bytecode5Chunk11patch__jump(chunk, jif_pc, chunk.code.length);
    const _bind$3 = _M0FP46heyq026moonjs3src8compiler13compile__stmt(c, _alt_stmt);
    if (_bind$3.$tag === 0) {
      const _Err = _bind$3;
      const _e = _Err._0;
      return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
    }
    _M0MP46heyq026moonjs3src8bytecode5Chunk11patch__jump(chunk, j_pc, chunk.code.length);
  }
  return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
}
function _M0FP46heyq026moonjs3src8compiler16compile__labeled(c, label, body, loc) {
  const top = _M0MP46heyq026moonjs3src8compiler8Compiler3top(c);
  const _bind = body.kind;
  let is_loop;
  switch (_bind.$tag) {
    case 3: {
      is_loop = true;
      break;
    }
    case 4: {
      is_loop = true;
      break;
    }
    case 5: {
      is_loop = true;
      break;
    }
    case 6: {
      is_loop = true;
      break;
    }
    case 7: {
      is_loop = true;
      break;
    }
    default: {
      is_loop = false;
    }
  }
  const label_frame = new _M0TP46heyq026moonjs3src8compiler10LabelFrame(label, [], is_loop);
  _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(top.label_stack, label_frame);
  const compile_r = _M0FP46heyq026moonjs3src8compiler13compile__stmt(c, body);
  const popped = _M0MPC15array5Array3popGRP46heyq026moonjs3src8compiler16FunctionCompilerE(top.label_stack);
  let popped$2;
  if (popped === undefined) {
    popped$2 = $panic();
  } else {
    const _Some = popped;
    popped$2 = _Some;
  }
  if (compile_r.$tag === 0) {
    const _Err = compile_r;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
  }
  const end_pc = top.chunk.code.length;
  const _bind$2 = popped$2.break_patches;
  const _bind$3 = _bind$2.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$3) {
      const p = _bind$2[_];
      _M0MP46heyq026moonjs3src8bytecode5Chunk11patch__jump(top.chunk, p, end_pc);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
}
function _M0FP46heyq026moonjs3src8compiler15compile__return(c, arg, loc) {
  if (_M0MP46heyq026moonjs3src8compiler8Compiler3top(c).is_top_level) {
    return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError("'return' outside of function", loc));
  }
  const chunk = _M0MP46heyq026moonjs3src8compiler8Compiler3top(c).chunk;
  if (arg === undefined) {
    _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 85, 0, 0, 0, loc);
  } else {
    const _Some = arg;
    const _e = _Some;
    const _bind = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, _e);
    if (_bind.$tag === 0) {
      const _Err = _bind;
      const _err = _Err._0;
      return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_err);
    }
    _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 84, 0, 0, 0, loc);
  }
  return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
}
function _M0FP46heyq026moonjs3src8compiler12compile__try(c, body, catch_, finally_, loc) {
  const chunk = _M0MP46heyq026moonjs3src8compiler8Compiler3top(c).chunk;
  if (catch_ === undefined) {
    _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 113, -1, loc);
  } else {
    _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 113, 16777216, loc);
  }
  const enter_pc_opt = catch_ === undefined ? undefined : chunk.code.length - 2 | 0;
  const _bind = body.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const s = body[_];
      const _bind$2 = _M0FP46heyq026moonjs3src8compiler13compile__stmt(c, s);
      if (_bind$2.$tag === 0) {
        const _Err = _bind$2;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 114, 0, 0, 0, loc);
  if (catch_ === undefined) {
  } else {
    const _Some = catch_;
    const _cc = _Some;
    _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__i32(chunk, 96, 16777216, loc);
    const over_pc = chunk.code.length - 2 | 0;
    const catch_pc = chunk.code.length;
    if (enter_pc_opt === undefined) {
    } else {
      const _Some$2 = enter_pc_opt;
      const _ep = _Some$2;
      _M0MP46heyq026moonjs3src8bytecode5Chunk11patch__jump(chunk, _ep, catch_pc);
    }
    const top = _M0MP46heyq026moonjs3src8compiler8Compiler3top(c);
    top.scope_depth = top.scope_depth + 1 | 0;
    const saved_locals = top.locals.length;
    const _bind$2 = _cc.param;
    if (_bind$2 === undefined) {
      _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(top.chunk, 8, 0, 0, 0, loc);
    } else {
      const _Some$2 = _bind$2;
      const _p = _Some$2;
      const _bind$3 = _p.kind;
      if (_bind$3.$tag === 0) {
        const _IdentPat = _bind$3;
        const _name = _IdentPat._0;
        const slot = _M0MP46heyq026moonjs3src8compiler16FunctionCompiler14declare__local(top, _name, 1);
        _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(top.chunk, 17, slot, _p.span.start);
        _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(top.chunk, 8, 0, 0, 0, _p.span.start);
      } else {
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(new _M0DTPC15error5Error62heyq02_2fmoonjs_2fsrc_2fcompiler_2eCompileError_2eCompileError("destructured catch param requires M2", _p.span.start));
      }
    }
    const _bind$3 = _cc.body;
    const _bind$4 = _bind$3.length;
    let _tmp$2 = 0;
    while (true) {
      const _ = _tmp$2;
      if (_ < _bind$4) {
        const s = _bind$3[_];
        const _bind$5 = _M0FP46heyq026moonjs3src8compiler13compile__stmt(c, s);
        if (_bind$5.$tag === 0) {
          const _Err = _bind$5;
          const _e = _Err._0;
          top.scope_depth = top.scope_depth - 1 | 0;
          return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
        }
        _tmp$2 = _ + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    while (true) {
      if (top.locals.length > saved_locals) {
        _M0MPC15array5Array3popGRP46heyq026moonjs3src8compiler16FunctionCompilerE(top.locals);
        continue;
      } else {
        break;
      }
    }
    top.scope_depth = top.scope_depth - 1 | 0;
    _M0MP46heyq026moonjs3src8bytecode5Chunk11patch__jump(chunk, over_pc, chunk.code.length);
  }
  if (finally_.$tag === 0) {
  } else {
    const _Some = finally_;
    const _fbody = _Some._0;
    const _bind$2 = _fbody.length;
    let _tmp$2 = 0;
    while (true) {
      const _ = _tmp$2;
      if (_ < _bind$2) {
        const s = _fbody[_];
        const _bind$3 = _M0FP46heyq026moonjs3src8compiler13compile__stmt(c, s);
        if (_bind$3.$tag === 0) {
          const _Err = _bind$3;
          const _e = _Err._0;
          return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
        }
        _tmp$2 = _ + 1 | 0;
        continue;
      } else {
        break;
      }
    }
  }
  return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
}
function _M0FP46heyq026moonjs3src8compiler14compile__while(c, cond, body, loc) {
  const chunk = _M0MP46heyq026moonjs3src8compiler8Compiler3top(c).chunk;
  const loop_start = chunk.code.length;
  const _bind = _M0FP46heyq026moonjs3src8compiler13compile__expr(c, cond);
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
  }
  _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__u32(chunk, 98, 16777216, cond.span.start);
  const jif_pc = chunk.code.length - 2 | 0;
  const frame = new _M0TP46heyq026moonjs3src8compiler9LoopFrame([], [], undefined);
  _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(_M0MP46heyq026moonjs3src8compiler8Compiler3top(c).loop_stack, frame);
  const compile_r = _M0FP46heyq026moonjs3src8compiler13compile__stmt(c, body);
  const popped = _M0MPC15array5Array3popGRP46heyq026moonjs3src8compiler16FunctionCompilerE(_M0MP46heyq026moonjs3src8compiler8Compiler3top(c).loop_stack);
  let popped$2;
  if (popped === undefined) {
    popped$2 = $panic();
  } else {
    const _Some = popped;
    popped$2 = _Some;
  }
  if (compile_r.$tag === 0) {
    const _Err = compile_r;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
  }
  _M0MP46heyq026moonjs3src8bytecode5Chunk15emit__wide__i32(chunk, 96, 16777216, loc);
  const back_pc = chunk.code.length - 2 | 0;
  _M0MP46heyq026moonjs3src8bytecode5Chunk11patch__jump(chunk, back_pc, loop_start);
  const end_pc = chunk.code.length;
  _M0MP46heyq026moonjs3src8bytecode5Chunk11patch__jump(chunk, jif_pc, end_pc);
  const _bind$2 = popped$2.break_patches;
  const _bind$3 = _bind$2.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$3) {
      const p = _bind$2[_];
      _M0MP46heyq026moonjs3src8bytecode5Chunk11patch__jump(chunk, p, end_pc);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const _bind$4 = popped$2.continue_patches;
  const _bind$5 = _bind$4.length;
  let _tmp$2 = 0;
  while (true) {
    const _ = _tmp$2;
    if (_ < _bind$5) {
      const p = _bind$4[_];
      _M0MP46heyq026moonjs3src8bytecode5Chunk11patch__jump(chunk, p, loop_start);
      _tmp$2 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(undefined);
}
function _M0MP46heyq026moonjs3src8compiler8Compiler3new() {
  return new _M0TP46heyq026moonjs3src8compiler8Compiler([]);
}
function _M0MP46heyq026moonjs3src8compiler8Compiler15compile__script(self, program, filename) {
  const chunk = _M0MP46heyq026moonjs3src8bytecode5Chunk3new("<top>", filename, 0);
  const fc = _M0MP46heyq026moonjs3src8compiler16FunctionCompiler3new(chunk, true);
  _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(self.fn_stack, fc);
  const _bind = _M0FP46heyq026moonjs3src8compiler25hoist__and__compile__body(self, program.body, true);
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src8bytecode5ChunkRP46heyq026moonjs3src8compiler12CompileErrorE3Err(_e);
  }
  _M0MPC15array5Array3popGRP46heyq026moonjs3src8compiler16FunctionCompilerE(self.fn_stack);
  const last_loc = chunk.source_locs.length > 0 ? _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(chunk.source_locs, chunk.source_locs.length - 1 | 0) : _M0MP46heyq026moonjs3src4util9SourceLoc3new(1, 1);
  _M0MP46heyq026moonjs3src8bytecode5Chunk4emit(chunk, 85, 0, 0, 0, last_loc);
  return new _M0DTPC16result6ResultGRP46heyq026moonjs3src8bytecode5ChunkRP46heyq026moonjs3src8compiler12CompileErrorE2Ok(chunk);
}
function _M0MP46heyq026moonjs3src5lexer5Token3new(kind, span) {
  return new _M0TP46heyq026moonjs3src5lexer5Token(kind, span);
}
function _M0FP46heyq026moonjs3src5lexer20is__line__terminator(c) {
  return c === 10 || (c === 13 || (c === 8232 || c === 8233));
}
function _M0FP46heyq026moonjs3src5lexer16char__to__string(c) {
  const buf = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  _M0IPB13StringBuilderPB6Logger11write__char(buf, c);
  return buf.val;
}
function _M0FP46heyq026moonjs3src5lexer17hex__digit__value(c) {
  return c >= 48 && c <= 57 ? c - 48 | 0 : c >= 65 && c <= 70 ? (c - 65 | 0) + 10 | 0 : c >= 97 && c <= 102 ? (c - 97 | 0) + 10 | 0 : undefined;
}
function _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, offset) {
  const p = self.pos + offset | 0;
  if (p < 0 || p >= self.source.length) {
    return -1;
  } else {
    const _p = _M0MPC16string6String3get(self.source, p);
    return _p === -1 ? $panic() : _p;
  }
}
function _M0MP46heyq026moonjs3src5lexer5Lexer25consume__line__terminator(self) {
  const c = _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0);
  if (c === 13) {
    self.pos = self.pos + 1 | 0;
    if (_M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0) === 10) {
      self.pos = self.pos + 1 | 0;
    }
  } else {
    self.pos = self.pos + 1 | 0;
  }
  self.line = self.line + 1 | 0;
  self.line_start = self.pos;
}
function _M0MP46heyq026moonjs3src5lexer5Lexer30consume__unicode__escape__tail(self, loc) {
  if (_M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0) === 123) {
    self.pos = self.pos + 1 | 0;
    let value = 0;
    let count = 0;
    let scan;
    let _tmp = 0;
    while (true) {
      const c = _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0);
      const _bind = _M0FP46heyq026moonjs3src5lexer17hex__digit__value(c);
      if (_bind === undefined) {
        scan = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src5lexer8LexErrorE2Ok(undefined);
        break;
      } else {
        const _Some = _bind;
        const _v = _Some;
        value = (Math.imul(value, 16) | 0) + _v | 0;
        count = count + 1 | 0;
        self.pos = self.pos + 1 | 0;
        if (value > 1114111) {
          scan = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src5lexer8LexErrorE3Err(new _M0DTPC15error5Error51heyq02_2fmoonjs_2fsrc_2flexer_2eLexError_2eLexError("unicode escape out of range", loc));
          break;
        }
        _tmp = 0;
        continue;
      }
    }
    if (scan.$tag === 0) {
      const _Err = scan;
      const _e = _Err._0;
      return new _M0DTPC16result6ResultGiRP46heyq026moonjs3src5lexer8LexErrorE3Err(_e);
    }
    if (count === 0) {
      return new _M0DTPC16result6ResultGiRP46heyq026moonjs3src5lexer8LexErrorE3Err(new _M0DTPC15error5Error51heyq02_2fmoonjs_2fsrc_2flexer_2eLexError_2eLexError("empty unicode escape", loc));
    }
    if (_M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0) !== 125) {
      return new _M0DTPC16result6ResultGiRP46heyq026moonjs3src5lexer8LexErrorE3Err(new _M0DTPC15error5Error51heyq02_2fmoonjs_2fsrc_2flexer_2eLexError_2eLexError("unterminated unicode escape", loc));
    }
    self.pos = self.pos + 1 | 0;
    return new _M0DTPC16result6ResultGiRP46heyq026moonjs3src5lexer8LexErrorE2Ok(value);
  } else {
    let value = 0;
    let _tmp = 0;
    while (true) {
      const _ = _tmp;
      if (_ < 4) {
        const c = _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0);
        const _bind = _M0FP46heyq026moonjs3src5lexer17hex__digit__value(c);
        if (_bind === undefined) {
          return new _M0DTPC16result6ResultGiRP46heyq026moonjs3src5lexer8LexErrorE3Err(new _M0DTPC15error5Error51heyq02_2fmoonjs_2fsrc_2flexer_2eLexError_2eLexError("expected 4 hex digits", loc));
        } else {
          const _Some = _bind;
          const _v = _Some;
          value = (Math.imul(value, 16) | 0) + _v | 0;
          self.pos = self.pos + 1 | 0;
        }
        _tmp = _ + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return new _M0DTPC16result6ResultGiRP46heyq026moonjs3src5lexer8LexErrorE2Ok(value);
  }
}
function _M0MP46heyq026moonjs3src5lexer5Lexer9loc__here(self) {
  return _M0MP46heyq026moonjs3src4util9SourceLoc3new(self.line, (self.pos - self.line_start | 0) + 1 | 0);
}
function _M0MP46heyq026moonjs3src5lexer5Lexer23consume__string__escape(self) {
  const loc = _M0MP46heyq026moonjs3src5lexer5Lexer9loc__here(self);
  self.pos = self.pos + 1 | 0;
  const c = _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0);
  if (c === -1) {
    return new _M0DTPC16result6ResultGOsRP46heyq026moonjs3src5lexer8LexErrorE3Err(new _M0DTPC15error5Error51heyq02_2fmoonjs_2fsrc_2flexer_2eLexError_2eLexError("unterminated escape", loc));
  }
  if (_M0FP46heyq026moonjs3src5lexer20is__line__terminator(c)) {
    _M0MP46heyq026moonjs3src5lexer5Lexer25consume__line__terminator(self);
    return new _M0DTPC16result6ResultGOsRP46heyq026moonjs3src5lexer8LexErrorE2Ok(undefined);
  }
  if (c === 110) {
    self.pos = self.pos + 1 | 0;
    return new _M0DTPC16result6ResultGOsRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0FP46heyq026moonjs3src5lexer16char__to__string(10));
  }
  if (c === 114) {
    self.pos = self.pos + 1 | 0;
    return new _M0DTPC16result6ResultGOsRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0FP46heyq026moonjs3src5lexer16char__to__string(13));
  }
  if (c === 116) {
    self.pos = self.pos + 1 | 0;
    return new _M0DTPC16result6ResultGOsRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0FP46heyq026moonjs3src5lexer16char__to__string(9));
  }
  if (c === 98) {
    self.pos = self.pos + 1 | 0;
    return new _M0DTPC16result6ResultGOsRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0FP46heyq026moonjs3src5lexer16char__to__string(8));
  }
  if (c === 102) {
    self.pos = self.pos + 1 | 0;
    return new _M0DTPC16result6ResultGOsRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0FP46heyq026moonjs3src5lexer16char__to__string(12));
  }
  if (c === 118) {
    self.pos = self.pos + 1 | 0;
    return new _M0DTPC16result6ResultGOsRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0FP46heyq026moonjs3src5lexer16char__to__string(11));
  }
  if (c === 48) {
    const next = _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 1);
    if (next >= 48 && next <= 57) {
      return new _M0DTPC16result6ResultGOsRP46heyq026moonjs3src5lexer8LexErrorE3Err(new _M0DTPC15error5Error51heyq02_2fmoonjs_2fsrc_2flexer_2eLexError_2eLexError("octal escape not allowed in strict-form escape", loc));
    }
    self.pos = self.pos + 1 | 0;
    return new _M0DTPC16result6ResultGOsRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0FP46heyq026moonjs3src5lexer16char__to__string(0));
  }
  if (c === 120) {
    self.pos = self.pos + 1 | 0;
    const h1 = _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0);
    const h2 = _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 1);
    _L: {
      const _bind = _M0FP46heyq026moonjs3src5lexer17hex__digit__value(h1);
      const _bind$2 = _M0FP46heyq026moonjs3src5lexer17hex__digit__value(h2);
      if (_bind === undefined) {
        break _L;
      } else {
        const _Some = _bind;
        const _a = _Some;
        if (_bind$2 === undefined) {
          break _L;
        } else {
          const _Some$2 = _bind$2;
          const _b = _Some$2;
          self.pos = self.pos + 2 | 0;
          const v = (Math.imul(_a, 16) | 0) + _b | 0;
          return new _M0DTPC16result6ResultGOsRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0FP46heyq026moonjs3src5lexer16char__to__string(v));
        }
      }
    }
    return new _M0DTPC16result6ResultGOsRP46heyq026moonjs3src5lexer8LexErrorE3Err(new _M0DTPC15error5Error51heyq02_2fmoonjs_2fsrc_2flexer_2eLexError_2eLexError("invalid \\x escape", loc));
  }
  if (c === 117) {
    self.pos = self.pos + 1 | 0;
    const _bind = _M0MP46heyq026moonjs3src5lexer5Lexer30consume__unicode__escape__tail(self, loc);
    if (_bind.$tag === 0) {
      const _Err = _bind;
      const _e = _Err._0;
      return new _M0DTPC16result6ResultGOsRP46heyq026moonjs3src5lexer8LexErrorE3Err(_e);
    } else {
      const _Ok = _bind;
      const _cp = _Ok._0;
      if (_cp <= 65535) {
        return new _M0DTPC16result6ResultGOsRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0FP46heyq026moonjs3src5lexer16char__to__string(_cp));
      } else {
        const adj = _cp - 65536 | 0;
        const high = 55296 + (adj >> 10) | 0;
        const low = 56320 + (adj & 1023) | 0;
        const buf = _M0MPB13StringBuilder21StringBuilder_2einner(0);
        _M0IPB13StringBuilderPB6Logger11write__char(buf, high);
        _M0IPB13StringBuilderPB6Logger11write__char(buf, low);
        return new _M0DTPC16result6ResultGOsRP46heyq026moonjs3src5lexer8LexErrorE2Ok(buf.val);
      }
    }
  }
  if (c === 39 || (c === 34 || (c === 92 || (c === 47 || c === 96)))) {
    self.pos = self.pos + 1 | 0;
    return new _M0DTPC16result6ResultGOsRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0FP46heyq026moonjs3src5lexer16char__to__string(c));
  }
  self.pos = self.pos + 1 | 0;
  return new _M0DTPC16result6ResultGOsRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0FP46heyq026moonjs3src5lexer16char__to__string(c));
}
function _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc) {
  return _M0MP46heyq026moonjs3src4util10SourceSpan3new(start_loc, _M0MP46heyq026moonjs3src5lexer5Lexer9loc__here(self));
}
function _M0MP46heyq026moonjs3src5lexer5Lexer11lex__string(self, start_loc, quote) {
  self.pos = self.pos + 1 | 0;
  const buf = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  let closed;
  let _tmp = 0;
  while (true) {
    const c = _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0);
    if (c === -1) {
      closed = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src5lexer8LexErrorE3Err(new _M0DTPC15error5Error51heyq02_2fmoonjs_2fsrc_2flexer_2eLexError_2eLexError("unterminated string literal", start_loc));
      break;
    }
    if (c === quote) {
      self.pos = self.pos + 1 | 0;
      closed = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src5lexer8LexErrorE2Ok(undefined);
      break;
    }
    if (_M0FP46heyq026moonjs3src5lexer20is__line__terminator(c)) {
      closed = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src5lexer8LexErrorE3Err(new _M0DTPC15error5Error51heyq02_2fmoonjs_2fsrc_2flexer_2eLexError_2eLexError("unterminated string literal", start_loc));
      break;
    }
    if (c === 92) {
      const _bind = _M0MP46heyq026moonjs3src5lexer5Lexer23consume__string__escape(self);
      if (_bind.$tag === 0) {
        const _Err = _bind;
        const _e = _Err._0;
        closed = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src5lexer8LexErrorE3Err(_e);
        break;
      } else {
        const _Ok = _bind;
        const _x = _Ok._0;
        if (_x === undefined) {
        } else {
          const _Some = _x;
          const _text = _Some;
          _M0IPB13StringBuilderPB6Logger13write__string(buf, _text);
        }
      }
      _tmp = 0;
      continue;
    }
    self.pos = self.pos + 1 | 0;
    _M0IPB13StringBuilderPB6Logger11write__char(buf, c);
    _tmp = 0;
    continue;
  }
  if (closed.$tag === 0) {
    const _Err = closed;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE3Err(_e);
  } else {
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(new _M0DTP46heyq026moonjs3src5lexer9TokenKind9StringTok(buf.val), _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
  }
}
function _M0MP46heyq026moonjs3src5lexer5Lexer19lex__template__body(self, start_loc, is_resume) {
  const cooked = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  const raw = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  let _tmp = 0;
  while (true) {
    const c = _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0);
    if (c === -1) {
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE3Err(new _M0DTPC15error5Error51heyq02_2fmoonjs_2fsrc_2flexer_2eLexError_2eLexError("unterminated template literal", start_loc));
    }
    if (c === 96) {
      self.pos = self.pos + 1 | 0;
      const cooked_s = cooked.val;
      const raw_s = raw.val;
      const span = _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc);
      const tok = is_resume ? new _M0DTP46heyq026moonjs3src5lexer9TokenKind15TemplateTailTok(cooked_s, raw_s) : new _M0DTP46heyq026moonjs3src5lexer9TokenKind16TemplateNoSubTok(cooked_s, raw_s);
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(tok, span));
    }
    if (c === 36 && _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 1) === 123) {
      self.pos = self.pos + 2 | 0;
      _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(self.template_states, new _M0TP46heyq026moonjs3src5lexer11TemplateCtx(0));
      const cooked_s = cooked.val;
      const raw_s = raw.val;
      const span = _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc);
      const tok = is_resume ? new _M0DTP46heyq026moonjs3src5lexer9TokenKind17TemplateMiddleTok(cooked_s, raw_s) : new _M0DTP46heyq026moonjs3src5lexer9TokenKind15TemplateHeadTok(cooked_s, raw_s);
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(tok, span));
    }
    if (c === 92) {
      const esc_start = self.pos;
      const _bind = _M0MP46heyq026moonjs3src5lexer5Lexer23consume__string__escape(self);
      if (_bind.$tag === 0) {
        const _Err = _bind;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE3Err(_e);
      } else {
        const _Ok = _bind;
        const _x = _Ok._0;
        if (_x === undefined) {
          const _bind$2 = self.pos;
          let _tmp$2 = esc_start;
          while (true) {
            const i = _tmp$2;
            if (i < _bind$2) {
              const _p = _M0MPC16string6String3get(self.source, i);
              _M0IPB13StringBuilderPB6Logger11write__char(raw, _p === -1 ? $panic() : _p);
              _tmp$2 = i + 1 | 0;
              continue;
            } else {
              break;
            }
          }
        } else {
          const _Some = _x;
          const _text = _Some;
          _M0IPB13StringBuilderPB6Logger13write__string(cooked, _text);
          const _bind$2 = self.pos;
          let _tmp$2 = esc_start;
          while (true) {
            const i = _tmp$2;
            if (i < _bind$2) {
              const _p = _M0MPC16string6String3get(self.source, i);
              _M0IPB13StringBuilderPB6Logger11write__char(raw, _p === -1 ? $panic() : _p);
              _tmp$2 = i + 1 | 0;
              continue;
            } else {
              break;
            }
          }
        }
      }
      _tmp = 0;
      continue;
    }
    if (_M0FP46heyq026moonjs3src5lexer20is__line__terminator(c)) {
      const esc_start = self.pos;
      _M0MP46heyq026moonjs3src5lexer5Lexer25consume__line__terminator(self);
      const _bind = self.pos;
      let _tmp$2 = esc_start;
      while (true) {
        const i = _tmp$2;
        if (i < _bind) {
          const _p = _M0MPC16string6String3get(self.source, i);
          _M0IPB13StringBuilderPB6Logger11write__char(raw, _p === -1 ? $panic() : _p);
          _tmp$2 = i + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _M0IPB13StringBuilderPB6Logger11write__char(cooked, 10);
      _tmp = 0;
      continue;
    }
    self.pos = self.pos + 1 | 0;
    _M0IPB13StringBuilderPB6Logger11write__char(cooked, c);
    _M0IPB13StringBuilderPB6Logger11write__char(raw, c);
    _tmp = 0;
    continue;
  }
}
function _M0MP46heyq026moonjs3src5lexer5Lexer20lex__template__start(self, start_loc) {
  self.pos = self.pos + 1 | 0;
  return _M0MP46heyq026moonjs3src5lexer5Lexer19lex__template__body(self, start_loc, false);
}
function _M0MP46heyq026moonjs3src5lexer5Lexer21lex__template__resume(self, start_loc) {
  if (self.template_states.length > 0) {
    _M0MPC15array5Array3popGRP46heyq026moonjs3src8compiler16FunctionCompilerE(self.template_states);
  }
  return _M0MP46heyq026moonjs3src5lexer5Lexer19lex__template__body(self, start_loc, true);
}
function _M0FP46heyq026moonjs3src5lexer23is__ident__start__ascii(c) {
  return c >= 65 && c <= 90 || (c >= 97 && c <= 122 || (c === 95 || c === 36));
}
function _M0FP46heyq026moonjs3src5lexer26is__ident__continue__ascii(c) {
  return _M0FP46heyq026moonjs3src5lexer23is__ident__start__ascii(c) || c >= 48 && c <= 57;
}
function _M0MP46heyq026moonjs3src5lexer5Lexer10lex__regex(self, start_loc) {
  self.pos = self.pos + 1 | 0;
  const body = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  let in_class = false;
  let scan;
  let _tmp = 0;
  while (true) {
    const c = _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0);
    if (c === -1 || _M0FP46heyq026moonjs3src5lexer20is__line__terminator(c)) {
      scan = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src5lexer8LexErrorE3Err(new _M0DTPC15error5Error51heyq02_2fmoonjs_2fsrc_2flexer_2eLexError_2eLexError("unterminated regex literal", start_loc));
      break;
    }
    if (c === 47 && !in_class) {
      self.pos = self.pos + 1 | 0;
      scan = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src5lexer8LexErrorE2Ok(undefined);
      break;
    }
    if (c === 91) {
      in_class = true;
      _M0IPB13StringBuilderPB6Logger11write__char(body, c);
      self.pos = self.pos + 1 | 0;
      _tmp = 0;
      continue;
    }
    if (c === 93 && in_class) {
      in_class = false;
      _M0IPB13StringBuilderPB6Logger11write__char(body, c);
      self.pos = self.pos + 1 | 0;
      _tmp = 0;
      continue;
    }
    if (c === 92) {
      const n = _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 1);
      if (n === -1 || _M0FP46heyq026moonjs3src5lexer20is__line__terminator(n)) {
        scan = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src5lexer8LexErrorE3Err(new _M0DTPC15error5Error51heyq02_2fmoonjs_2fsrc_2flexer_2eLexError_2eLexError("invalid regex escape", _M0MP46heyq026moonjs3src5lexer5Lexer9loc__here(self)));
        break;
      }
      _M0IPB13StringBuilderPB6Logger11write__char(body, c);
      _M0IPB13StringBuilderPB6Logger11write__char(body, n);
      self.pos = self.pos + 2 | 0;
      _tmp = 0;
      continue;
    }
    _M0IPB13StringBuilderPB6Logger11write__char(body, c);
    self.pos = self.pos + 1 | 0;
    _tmp = 0;
    continue;
  }
  if (scan.$tag === 0) {
    const _Err = scan;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE3Err(_e);
  }
  const flags = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  while (true) {
    if (self.pos < self.source.length) {
      const c = _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0);
      if (c === -1) {
        break;
      }
      if (_M0FP46heyq026moonjs3src5lexer26is__ident__continue__ascii(c) || c >= 128) {
        _M0IPB13StringBuilderPB6Logger11write__char(flags, c);
        self.pos = self.pos + 1 | 0;
      } else {
        break;
      }
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(new _M0DTP46heyq026moonjs3src5lexer9TokenKind9RegExpTok(body.val, flags.val), _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
}
function _M0FP46heyq026moonjs3src5lexer23parse__double__or__fail(s) {
  return _M0FPC28internal7strconv13parse__double(_M0MPC16string6String12view_2einner(s, 0, undefined));
}
function _M0FP46heyq026moonjs3src5lexer18strip__underscores(s) {
  const buf = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  const _bind = s.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      const _p = _M0MPC16string6String3get(s, i);
      const c = _p === -1 ? $panic() : _p;
      if (c !== 95) {
        _M0IPB13StringBuilderPB6Logger11write__char(buf, c);
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return buf.val;
}
function _M0MP46heyq026moonjs3src5lexer5Lexer23lex__number__after__dot(self, start_loc) {
  self.pos = self.pos + 1 | 0;
  let prev_us = false;
  let frac_scan;
  let _tmp = 0;
  while (true) {
    const c = _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0);
    if (c >= 48 && c <= 57) {
      prev_us = false;
      self.pos = self.pos + 1 | 0;
      _tmp = 0;
      continue;
    }
    if (c === 95) {
      if (prev_us) {
        frac_scan = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src5lexer8LexErrorE3Err(new _M0DTPC15error5Error51heyq02_2fmoonjs_2fsrc_2flexer_2eLexError_2eLexError("invalid numeric separator", _M0MP46heyq026moonjs3src5lexer5Lexer9loc__here(self)));
        break;
      }
      prev_us = true;
      self.pos = self.pos + 1 | 0;
      _tmp = 0;
      continue;
    }
    frac_scan = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src5lexer8LexErrorE2Ok(undefined);
    break;
  }
  if (frac_scan.$tag === 0) {
    const _Err = frac_scan;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE3Err(_e);
  }
  if (prev_us) {
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE3Err(new _M0DTPC15error5Error51heyq02_2fmoonjs_2fsrc_2flexer_2eLexError_2eLexError("trailing numeric separator", start_loc));
  }
  if (_M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0) === 101 || _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0) === 69) {
    self.pos = self.pos + 1 | 0;
    if (_M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0) === 43 || _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0) === 45) {
      self.pos = self.pos + 1 | 0;
    }
    let count = 0;
    while (true) {
      if (self.pos < self.source.length) {
        const c = _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0);
        if (c >= 48 && c <= 57) {
          count = count + 1 | 0;
          self.pos = self.pos + 1 | 0;
        } else {
          break;
        }
        continue;
      } else {
        break;
      }
    }
    if (count === 0) {
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE3Err(new _M0DTPC15error5Error51heyq02_2fmoonjs_2fsrc_2flexer_2eLexError_2eLexError("missing exponent", start_loc));
    }
  }
  if (_M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0) === 110) {
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE3Err(new _M0DTPC15error5Error51heyq02_2fmoonjs_2fsrc_2flexer_2eLexError_2eLexError("BigInt not supported in M1", start_loc));
  }
  const _tmp$2 = self.source;
  const _p = start_loc.col;
  const literal = _tmp$2.substring((self.line_start + _p | 0) - 1 | 0, self.pos);
  const cleaned = _M0FP46heyq026moonjs3src5lexer18strip__underscores(literal);
  let value;
  let _try_err;
  _L: {
    _L$2: {
      const _bind = _M0FP46heyq026moonjs3src5lexer23parse__double__or__fail(cleaned);
      if (_bind.$tag === 1) {
        const _ok = _bind;
        value = _ok._0;
      } else {
        const _err = _bind;
        _try_err = _err._0;
        break _L$2;
      }
      break _L;
    }
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE3Err(new _M0DTPC15error5Error51heyq02_2fmoonjs_2fsrc_2flexer_2eLexError_2eLexError("invalid number literal", start_loc));
  }
  return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(new _M0DTP46heyq026moonjs3src5lexer9TokenKind9NumberTok(value, false), _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
}
function _M0MP46heyq026moonjs3src5lexer5Lexer20lex__number__decimal(self, start_loc) {
  let has_int_digits = false;
  let prev_underscore = false;
  let int_scan;
  let _tmp = 0;
  while (true) {
    const c = _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0);
    if (c >= 48 && c <= 57) {
      has_int_digits = true;
      prev_underscore = false;
      self.pos = self.pos + 1 | 0;
      _tmp = 0;
      continue;
    }
    if (c === 95) {
      if (!has_int_digits || prev_underscore) {
        int_scan = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src5lexer8LexErrorE3Err(new _M0DTPC15error5Error51heyq02_2fmoonjs_2fsrc_2flexer_2eLexError_2eLexError("invalid numeric separator", _M0MP46heyq026moonjs3src5lexer5Lexer9loc__here(self)));
        break;
      }
      prev_underscore = true;
      self.pos = self.pos + 1 | 0;
      _tmp = 0;
      continue;
    }
    int_scan = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src5lexer8LexErrorE2Ok(undefined);
    break;
  }
  if (int_scan.$tag === 0) {
    const _Err = int_scan;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE3Err(_e);
  }
  if (prev_underscore) {
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE3Err(new _M0DTPC15error5Error51heyq02_2fmoonjs_2fsrc_2flexer_2eLexError_2eLexError("trailing numeric separator", start_loc));
  }
  let is_int = true;
  if (_M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0) === 46) {
    const n = _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 1);
    if (n >= 48 && n <= 57 || has_int_digits) {
      is_int = false;
      self.pos = self.pos + 1 | 0;
      let prev_us = false;
      let frac_scan;
      let _tmp$2 = 0;
      while (true) {
        const c = _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0);
        if (c >= 48 && c <= 57) {
          prev_us = false;
          self.pos = self.pos + 1 | 0;
          _tmp$2 = 0;
          continue;
        }
        if (c === 95) {
          if (prev_us) {
            frac_scan = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src5lexer8LexErrorE3Err(new _M0DTPC15error5Error51heyq02_2fmoonjs_2fsrc_2flexer_2eLexError_2eLexError("invalid numeric separator", _M0MP46heyq026moonjs3src5lexer5Lexer9loc__here(self)));
            break;
          }
          prev_us = true;
          self.pos = self.pos + 1 | 0;
          _tmp$2 = 0;
          continue;
        }
        frac_scan = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src5lexer8LexErrorE2Ok(undefined);
        break;
      }
      if (frac_scan.$tag === 0) {
        const _Err = frac_scan;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE3Err(_e);
      }
      if (prev_us) {
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE3Err(new _M0DTPC15error5Error51heyq02_2fmoonjs_2fsrc_2flexer_2eLexError_2eLexError("trailing numeric separator", start_loc));
      }
    }
  }
  if (_M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0) === 101 || _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0) === 69) {
    is_int = false;
    self.pos = self.pos + 1 | 0;
    if (_M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0) === 43 || _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0) === 45) {
      self.pos = self.pos + 1 | 0;
    }
    let count = 0;
    let prev_us = false;
    let exp_scan;
    let _tmp$2 = 0;
    while (true) {
      const c = _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0);
      if (c >= 48 && c <= 57) {
        prev_us = false;
        count = count + 1 | 0;
        self.pos = self.pos + 1 | 0;
        _tmp$2 = 0;
        continue;
      }
      if (c === 95) {
        if (count === 0 || prev_us) {
          exp_scan = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src5lexer8LexErrorE3Err(new _M0DTPC15error5Error51heyq02_2fmoonjs_2fsrc_2flexer_2eLexError_2eLexError("invalid numeric separator", _M0MP46heyq026moonjs3src5lexer5Lexer9loc__here(self)));
          break;
        }
        prev_us = true;
        self.pos = self.pos + 1 | 0;
        _tmp$2 = 0;
        continue;
      }
      exp_scan = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src5lexer8LexErrorE2Ok(undefined);
      break;
    }
    if (exp_scan.$tag === 0) {
      const _Err = exp_scan;
      const _e = _Err._0;
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE3Err(_e);
    }
    if (count === 0) {
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE3Err(new _M0DTPC15error5Error51heyq02_2fmoonjs_2fsrc_2flexer_2eLexError_2eLexError("missing exponent", start_loc));
    }
    if (prev_us) {
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE3Err(new _M0DTPC15error5Error51heyq02_2fmoonjs_2fsrc_2flexer_2eLexError_2eLexError("trailing numeric separator", start_loc));
    }
  }
  if (_M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0) === 110) {
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE3Err(new _M0DTPC15error5Error51heyq02_2fmoonjs_2fsrc_2flexer_2eLexError_2eLexError("BigInt not supported in M1", start_loc));
  }
  const end = self.pos;
  const _tmp$2 = self.source;
  const _p = start_loc.col;
  const literal = _tmp$2.substring((self.line_start + _p | 0) - 1 | 0, end);
  const cleaned = _M0FP46heyq026moonjs3src5lexer18strip__underscores(literal);
  let value;
  let _try_err;
  _L: {
    _L$2: {
      const _bind = _M0FP46heyq026moonjs3src5lexer23parse__double__or__fail(cleaned);
      if (_bind.$tag === 1) {
        const _ok = _bind;
        value = _ok._0;
      } else {
        const _err = _bind;
        _try_err = _err._0;
        break _L$2;
      }
      break _L;
    }
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE3Err(new _M0DTPC15error5Error51heyq02_2fmoonjs_2fsrc_2flexer_2eLexError_2eLexError("invalid number literal", start_loc));
  }
  return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(new _M0DTP46heyq026moonjs3src5lexer9TokenKind9NumberTok(value, is_int), _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
}
function _M0FP46heyq026moonjs3src5lexer20binary__digit__value(c) {
  return c === 48 || c === 49 ? c - 48 | 0 : undefined;
}
function _M0FP46heyq026moonjs3src5lexer19octal__digit__value(c) {
  return c >= 48 && c <= 55 ? c - 48 | 0 : undefined;
}
function _M0MP46heyq026moonjs3src5lexer5Lexer18lex__number__radix(self, start_loc, radix) {
  let value = 0;
  let count = 0;
  let prev_underscore = false;
  let scan;
  let _tmp = 0;
  while (true) {
    const c = _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0);
    if (c === 95) {
      if (count === 0 || prev_underscore) {
        scan = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src5lexer8LexErrorE3Err(new _M0DTPC15error5Error51heyq02_2fmoonjs_2fsrc_2flexer_2eLexError_2eLexError("invalid numeric separator", _M0MP46heyq026moonjs3src5lexer5Lexer9loc__here(self)));
        break;
      }
      prev_underscore = true;
      self.pos = self.pos + 1 | 0;
      _tmp = 0;
      continue;
    }
    const digit = radix === 16 ? _M0FP46heyq026moonjs3src5lexer17hex__digit__value(c) : radix === 8 ? _M0FP46heyq026moonjs3src5lexer19octal__digit__value(c) : _M0FP46heyq026moonjs3src5lexer20binary__digit__value(c);
    if (digit === undefined) {
      scan = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src5lexer8LexErrorE2Ok(undefined);
      break;
    } else {
      const _Some = digit;
      const _d = _Some;
      prev_underscore = false;
      value = value * (radix + 0) + (_d + 0);
      count = count + 1 | 0;
      self.pos = self.pos + 1 | 0;
      _tmp = 0;
      continue;
    }
  }
  if (scan.$tag === 0) {
    const _Err = scan;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE3Err(_e);
  }
  if (count === 0) {
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE3Err(new _M0DTPC15error5Error51heyq02_2fmoonjs_2fsrc_2flexer_2eLexError_2eLexError("expected digits", start_loc));
  }
  if (prev_underscore) {
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE3Err(new _M0DTPC15error5Error51heyq02_2fmoonjs_2fsrc_2flexer_2eLexError_2eLexError("trailing numeric separator", start_loc));
  }
  if (_M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0) === 110) {
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE3Err(new _M0DTPC15error5Error51heyq02_2fmoonjs_2fsrc_2flexer_2eLexError_2eLexError("BigInt not supported in M1", start_loc));
  }
  return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(new _M0DTP46heyq026moonjs3src5lexer9TokenKind9NumberTok(value, true), _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
}
function _M0MP46heyq026moonjs3src5lexer5Lexer26looks__like__legacy__octal(self) {
  let i = self.pos + 1 | 0;
  let saw_octal_only = true;
  while (true) {
    if (i < self.source.length) {
      const _p = _M0MPC16string6String3get(self.source, i);
      const c = _p === -1 ? $panic() : _p;
      if (c >= 48 && c <= 55) {
        i = i + 1 | 0;
      } else {
        if (c === 56 || c === 57) {
          saw_octal_only = false;
          i = i + 1 | 0;
        } else {
          if (c === 46 || (c === 101 || c === 69)) {
            return false;
          } else {
            break;
          }
        }
      }
      continue;
    } else {
      break;
    }
  }
  return saw_octal_only;
}
function _M0MP46heyq026moonjs3src5lexer5Lexer11lex__number(self, start_loc) {
  const first = _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0);
  if (first === 46) {
    return _M0MP46heyq026moonjs3src5lexer5Lexer23lex__number__after__dot(self, start_loc);
  }
  if (first === 48) {
    const n = _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 1);
    if (n === 120 || n === 88) {
      self.pos = self.pos + 2 | 0;
      return _M0MP46heyq026moonjs3src5lexer5Lexer18lex__number__radix(self, start_loc, 16);
    }
    if (n === 111 || n === 79) {
      self.pos = self.pos + 2 | 0;
      return _M0MP46heyq026moonjs3src5lexer5Lexer18lex__number__radix(self, start_loc, 8);
    }
    if (n === 98 || n === 66) {
      self.pos = self.pos + 2 | 0;
      return _M0MP46heyq026moonjs3src5lexer5Lexer18lex__number__radix(self, start_loc, 2);
    }
    if (n >= 48 && n <= 57) {
      if (_M0MP46heyq026moonjs3src5lexer5Lexer26looks__like__legacy__octal(self)) {
        self.pos = self.pos + 1 | 0;
        return _M0MP46heyq026moonjs3src5lexer5Lexer18lex__number__radix(self, start_loc, 8);
      }
    }
  }
  return _M0MP46heyq026moonjs3src5lexer5Lexer20lex__number__decimal(self, start_loc);
}
function _M0MP46heyq026moonjs3src5lexer5Lexer3new(source, filename) {
  return new _M0TP46heyq026moonjs3src5lexer5Lexer(source, 0, 1, 0, filename, []);
}
function _M0FP46heyq026moonjs3src5lexer23is__whitespace__non__lt(c) {
  return c === 9 || (c === 11 || (c === 12 || (c === 32 || (c === 160 || c === 65279))));
}
function _M0MP46heyq026moonjs3src5lexer5Lexer12skip__trivia(self) {
  if (self.pos === 0 && (_M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0) === 35 && _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 1) === 33)) {
    while (true) {
      if (self.pos < self.source.length && !_M0FP46heyq026moonjs3src5lexer20is__line__terminator(_M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0))) {
        self.pos = self.pos + 1 | 0;
        continue;
      } else {
        break;
      }
    }
  }
  let _tmp = 0;
  while (true) {
    const c = _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0);
    if (c === -1) {
      return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src5lexer8LexErrorE2Ok(undefined);
    }
    if (_M0FP46heyq026moonjs3src5lexer23is__whitespace__non__lt(c)) {
      self.pos = self.pos + 1 | 0;
      _tmp = 0;
      continue;
    }
    if (_M0FP46heyq026moonjs3src5lexer20is__line__terminator(c)) {
      _M0MP46heyq026moonjs3src5lexer5Lexer25consume__line__terminator(self);
      _tmp = 0;
      continue;
    }
    if (c === 47 && _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 1) === 47) {
      self.pos = self.pos + 2 | 0;
      while (true) {
        if (self.pos < self.source.length && !_M0FP46heyq026moonjs3src5lexer20is__line__terminator(_M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0))) {
          self.pos = self.pos + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _tmp = 0;
      continue;
    }
    if (c === 47 && _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 1) === 42) {
      const start_loc = _M0MP46heyq026moonjs3src5lexer5Lexer9loc__here(self);
      self.pos = self.pos + 2 | 0;
      let terminated = false;
      while (true) {
        if (self.pos < self.source.length) {
          const cur = _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0);
          if (cur === 42 && _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 1) === 47) {
            self.pos = self.pos + 2 | 0;
            terminated = true;
            break;
          }
          if (_M0FP46heyq026moonjs3src5lexer20is__line__terminator(cur)) {
            _M0MP46heyq026moonjs3src5lexer5Lexer25consume__line__terminator(self);
          } else {
            self.pos = self.pos + 1 | 0;
          }
          continue;
        } else {
          break;
        }
      }
      if (!terminated) {
        return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src5lexer8LexErrorE3Err(new _M0DTPC15error5Error51heyq02_2fmoonjs_2fsrc_2flexer_2eLexError_2eLexError("unterminated block comment", start_loc));
      }
      _tmp = 0;
      continue;
    }
    return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src5lexer8LexErrorE2Ok(undefined);
  }
}
function _M0FP46heyq026moonjs3src5lexer16resolve__keyword(name) {
  return name === "break" ? _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS686 : name === "case" ? _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS687 : name === "catch" ? _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS688 : name === "class" ? _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS689 : name === "const" ? _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS690 : name === "continue" ? _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS691 : name === "debugger" ? _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS692 : name === "default" ? _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS693 : name === "delete" ? _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS694 : name === "do" ? _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS695 : name === "else" ? _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS696 : name === "export" ? _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS697 : name === "extends" ? _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS698 : name === "finally" ? _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS699 : name === "for" ? _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS700 : name === "function" ? _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS701 : name === "if" ? _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS702 : name === "import" ? _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS703 : name === "in" ? _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS704 : name === "instanceof" ? _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS705 : name === "let" ? _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS706 : name === "new" ? _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS707 : name === "null" ? _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS708 : name === "return" ? _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS709 : name === "super" ? _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS710 : name === "switch" ? _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS711 : name === "this" ? _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS712 : name === "throw" ? _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS713 : name === "true" ? _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS714 : name === "false" ? _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS715 : name === "try" ? _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS716 : name === "typeof" ? _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS717 : name === "var" ? _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS718 : name === "void" ? _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS719 : name === "while" ? _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS720 : name === "with" ? _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS721 : name === "yield" ? _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS722 : name === "enum" ? _M0FP46heyq026moonjs3src5lexer16resolve__keywordN6constrS723 : undefined;
}
function _M0MP46heyq026moonjs3src5lexer5Lexer20consume__ident__char(self, is_start) {
  const c = _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0);
  if (c === -1) {
    return new _M0DTPC16result6ResultGOcRP46heyq026moonjs3src5lexer8LexErrorE2Ok(-1);
  }
  if (c === 92) {
    if (_M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 1) !== 117) {
      return new _M0DTPC16result6ResultGOcRP46heyq026moonjs3src5lexer8LexErrorE3Err(new _M0DTPC15error5Error51heyq02_2fmoonjs_2fsrc_2flexer_2eLexError_2eLexError("invalid escape in identifier", _M0MP46heyq026moonjs3src5lexer5Lexer9loc__here(self)));
    }
    const esc_loc = _M0MP46heyq026moonjs3src5lexer5Lexer9loc__here(self);
    self.pos = self.pos + 2 | 0;
    const _bind = _M0MP46heyq026moonjs3src5lexer5Lexer30consume__unicode__escape__tail(self, esc_loc);
    if (_bind.$tag === 0) {
      const _Err = _bind;
      const _e = _Err._0;
      return new _M0DTPC16result6ResultGOcRP46heyq026moonjs3src5lexer8LexErrorE3Err(_e);
    } else {
      const _Ok = _bind;
      const _code = _Ok._0;
      const ok = is_start ? _M0FP46heyq026moonjs3src5lexer23is__ident__start__ascii(_code) || _code >= 128 : _M0FP46heyq026moonjs3src5lexer26is__ident__continue__ascii(_code) || _code >= 128;
      if (!ok) {
        return new _M0DTPC16result6ResultGOcRP46heyq026moonjs3src5lexer8LexErrorE3Err(new _M0DTPC15error5Error51heyq02_2fmoonjs_2fsrc_2flexer_2eLexError_2eLexError("escape does not resolve to an identifier char", esc_loc));
      }
      return new _M0DTPC16result6ResultGOcRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_code);
    }
  }
  const ok = is_start ? _M0FP46heyq026moonjs3src5lexer23is__ident__start__ascii(c) || c >= 128 : _M0FP46heyq026moonjs3src5lexer26is__ident__continue__ascii(c) || c >= 128;
  if (ok) {
    self.pos = self.pos + 1 | 0;
    return new _M0DTPC16result6ResultGOcRP46heyq026moonjs3src5lexer8LexErrorE2Ok(c);
  } else {
    return new _M0DTPC16result6ResultGOcRP46heyq026moonjs3src5lexer8LexErrorE2Ok(-1);
  }
}
function _M0MP46heyq026moonjs3src5lexer5Lexer25consume__identifier__name(self, missing_msg, err_loc) {
  const buf = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  const _bind = _M0MP46heyq026moonjs3src5lexer5Lexer20consume__ident__char(self, true);
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGsRP46heyq026moonjs3src5lexer8LexErrorE3Err(_e);
  } else {
    const _Ok = _bind;
    const _x = _Ok._0;
    if (_x === -1) {
      return new _M0DTPC16result6ResultGsRP46heyq026moonjs3src5lexer8LexErrorE3Err(new _M0DTPC15error5Error51heyq02_2fmoonjs_2fsrc_2flexer_2eLexError_2eLexError(missing_msg, err_loc));
    } else {
      const _Some = _x;
      const _ch = _Some;
      _M0IPB13StringBuilderPB6Logger11write__char(buf, _ch);
    }
  }
  let cont;
  let _tmp = 0;
  while (true) {
    const _bind$2 = _M0MP46heyq026moonjs3src5lexer5Lexer20consume__ident__char(self, false);
    if (_bind$2.$tag === 0) {
      const _Err = _bind$2;
      const _e = _Err._0;
      cont = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src5lexer8LexErrorE3Err(_e);
      break;
    } else {
      const _Ok = _bind$2;
      const _x = _Ok._0;
      if (_x === -1) {
        cont = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src5lexer8LexErrorE2Ok(undefined);
        break;
      } else {
        const _Some = _x;
        const _ch = _Some;
        _M0IPB13StringBuilderPB6Logger11write__char(buf, _ch);
        _tmp = 0;
        continue;
      }
    }
  }
  if (cont.$tag === 0) {
    const _Err = cont;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGsRP46heyq026moonjs3src5lexer8LexErrorE3Err(_e);
  } else {
    return new _M0DTPC16result6ResultGsRP46heyq026moonjs3src5lexer8LexErrorE2Ok(buf.val);
  }
}
function _M0MP46heyq026moonjs3src5lexer5Lexer28lex__identifier__or__keyword(self, start_loc) {
  const name = _M0MP46heyq026moonjs3src5lexer5Lexer25consume__identifier__name(self, "expected identifier start", start_loc);
  if (name.$tag === 0) {
    const _Err = name;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE3Err(_e);
  } else {
    const _Ok = name;
    const _name = _Ok._0;
    const span = _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc);
    const _bind = _M0FP46heyq026moonjs3src5lexer16resolve__keyword(_name);
    if (_bind === undefined) {
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(new _M0DTP46heyq026moonjs3src5lexer9TokenKind13IdentifierTok(_name), span));
    } else {
      const _Some = _bind;
      const _kw = _Some;
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(new _M0DTP46heyq026moonjs3src5lexer9TokenKind10KeywordTok(_kw), span));
    }
  }
}
function _M0MP46heyq026moonjs3src5lexer5Lexer15lex__punctuator(self, start_loc, allow_regex, c) {
  if (c === 40) {
    self.pos = self.pos + 1 | 0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind6LParen__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
  }
  if (c === 41) {
    self.pos = self.pos + 1 | 0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind6RParen__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
  }
  if (c === 91) {
    self.pos = self.pos + 1 | 0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind8LBracket__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
  }
  if (c === 93) {
    self.pos = self.pos + 1 | 0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind8RBracket__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
  }
  if (c === 123) {
    if (self.template_states.length > 0) {
      const top = _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(self.template_states, self.template_states.length - 1 | 0);
      top.brace_depth = top.brace_depth + 1 | 0;
    }
    self.pos = self.pos + 1 | 0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind6LBrace__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
  }
  if (c === 125) {
    if (self.template_states.length > 0) {
      const top = _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(self.template_states, self.template_states.length - 1 | 0);
      if (top.brace_depth === 0) {
        self.pos = self.pos + 1 | 0;
        return _M0MP46heyq026moonjs3src5lexer5Lexer21lex__template__resume(self, start_loc);
      }
      top.brace_depth = top.brace_depth - 1 | 0;
    }
    self.pos = self.pos + 1 | 0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind6RBrace__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
  }
  if (c === 44) {
    self.pos = self.pos + 1 | 0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind5Comma__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
  }
  if (c === 59) {
    self.pos = self.pos + 1 | 0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind4Semi__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
  }
  if (c === 58) {
    self.pos = self.pos + 1 | 0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind5Colon__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
  }
  if (c === 126) {
    self.pos = self.pos + 1 | 0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind5Tilde__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
  }
  if (c === 64) {
    self.pos = self.pos + 1 | 0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind2At__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
  }
  if (c === 35) {
    self.pos = self.pos + 1 | 0;
    const name_start = _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0);
    if (_M0FP46heyq026moonjs3src5lexer23is__ident__start__ascii(name_start) || (name_start >= 128 || name_start === 92)) {
      const _bind = _M0MP46heyq026moonjs3src5lexer5Lexer25consume__identifier__name(self, "expected identifier after #", start_loc);
      if (_bind.$tag === 0) {
        const _Err = _bind;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE3Err(_e);
      } else {
        const _Ok = _bind;
        const _name = _Ok._0;
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(new _M0DTP46heyq026moonjs3src5lexer9TokenKind15PrivateIdentTok(_name), _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
      }
    }
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind4Hash__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
  }
  if (c === 63) {
    self.pos = self.pos + 1 | 0;
    const n = _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0);
    if (n === 46) {
      const after = _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 1);
      if (after >= 48 && after <= 57) {
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind8Question__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
      }
      self.pos = self.pos + 1 | 0;
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind11QuestionDot__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
    }
    if (n === 63) {
      self.pos = self.pos + 1 | 0;
      if (_M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0) === 61) {
        self.pos = self.pos + 1 | 0;
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind18QuestionQuestionEq__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
      }
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind16QuestionQuestion__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
    }
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind8Question__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
  }
  if (c === 43) {
    self.pos = self.pos + 1 | 0;
    const n = _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0);
    if (n === 43) {
      self.pos = self.pos + 1 | 0;
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind8PlusPlus__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
    }
    if (n === 61) {
      self.pos = self.pos + 1 | 0;
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind6PlusEq__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
    }
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind4Plus__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
  }
  if (c === 45) {
    self.pos = self.pos + 1 | 0;
    const n = _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0);
    if (n === 45) {
      self.pos = self.pos + 1 | 0;
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind10MinusMinus__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
    }
    if (n === 61) {
      self.pos = self.pos + 1 | 0;
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind7MinusEq__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
    }
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind5Minus__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
  }
  if (c === 42) {
    self.pos = self.pos + 1 | 0;
    const n = _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0);
    if (n === 42) {
      self.pos = self.pos + 1 | 0;
      if (_M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0) === 61) {
        self.pos = self.pos + 1 | 0;
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind10StarStarEq__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
      }
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind8StarStar__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
    }
    if (n === 61) {
      self.pos = self.pos + 1 | 0;
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind6StarEq__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
    }
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind4Star__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
  }
  if (c === 47) {
    if (allow_regex) {
      return _M0MP46heyq026moonjs3src5lexer5Lexer10lex__regex(self, start_loc);
    }
    self.pos = self.pos + 1 | 0;
    if (_M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0) === 61) {
      self.pos = self.pos + 1 | 0;
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind7SlashEq__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
    }
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind5Slash__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
  }
  if (c === 37) {
    self.pos = self.pos + 1 | 0;
    if (_M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0) === 61) {
      self.pos = self.pos + 1 | 0;
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind9PercentEq__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
    }
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind7Percent__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
  }
  if (c === 38) {
    self.pos = self.pos + 1 | 0;
    const n = _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0);
    if (n === 38) {
      self.pos = self.pos + 1 | 0;
      if (_M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0) === 61) {
        self.pos = self.pos + 1 | 0;
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind8AmpAmpEq__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
      }
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind6AmpAmp__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
    }
    if (n === 61) {
      self.pos = self.pos + 1 | 0;
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind5AmpEq__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
    }
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind3Amp__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
  }
  if (c === 124) {
    self.pos = self.pos + 1 | 0;
    const n = _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0);
    if (n === 124) {
      self.pos = self.pos + 1 | 0;
      if (_M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0) === 61) {
        self.pos = self.pos + 1 | 0;
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind10PipePipeEq__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
      }
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind8PipePipe__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
    }
    if (n === 61) {
      self.pos = self.pos + 1 | 0;
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind6PipeEq__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
    }
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind4Pipe__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
  }
  if (c === 94) {
    self.pos = self.pos + 1 | 0;
    if (_M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0) === 61) {
      self.pos = self.pos + 1 | 0;
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind7CaretEq__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
    }
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind5Caret__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
  }
  if (c === 33) {
    self.pos = self.pos + 1 | 0;
    if (_M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0) === 61) {
      self.pos = self.pos + 1 | 0;
      if (_M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0) === 61) {
        self.pos = self.pos + 1 | 0;
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind8BangEqEq__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
      }
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind6BangEq__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
    }
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind4Bang__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
  }
  if (c === 61) {
    self.pos = self.pos + 1 | 0;
    const n = _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0);
    if (n === 61) {
      self.pos = self.pos + 1 | 0;
      if (_M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0) === 61) {
        self.pos = self.pos + 1 | 0;
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind6EqEqEq__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
      }
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind4EqEq__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
    }
    if (n === 62) {
      self.pos = self.pos + 1 | 0;
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind5Arrow__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
    }
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind5EqTok__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
  }
  if (c === 60) {
    self.pos = self.pos + 1 | 0;
    const n = _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0);
    if (n === 61) {
      self.pos = self.pos + 1 | 0;
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind4LtEq__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
    }
    if (n === 60) {
      self.pos = self.pos + 1 | 0;
      if (_M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0) === 61) {
        self.pos = self.pos + 1 | 0;
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind6LtLtEq__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
      }
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind4LtLt__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
    }
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind2Lt__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
  }
  if (c === 62) {
    self.pos = self.pos + 1 | 0;
    const n = _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0);
    if (n === 61) {
      self.pos = self.pos + 1 | 0;
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind4GtEq__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
    }
    if (n === 62) {
      self.pos = self.pos + 1 | 0;
      const n2 = _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0);
      if (n2 === 62) {
        self.pos = self.pos + 1 | 0;
        if (_M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0) === 61) {
          self.pos = self.pos + 1 | 0;
          return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind8GtGtGtEq__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
        }
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind6GtGtGt__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
      }
      if (n2 === 61) {
        self.pos = self.pos + 1 | 0;
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind6GtGtEq__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
      }
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind4GtGt__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
    }
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind2Gt__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
  }
  return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE3Err(new _M0DTPC15error5Error51heyq02_2fmoonjs_2fsrc_2flexer_2eLexError_2eLexError("unexpected character", start_loc));
}
function _M0MP46heyq026moonjs3src5lexer5Lexer9lex__next(self, allow_regex) {
  const _bind = _M0MP46heyq026moonjs3src5lexer5Lexer12skip__trivia(self);
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE3Err(_e);
  }
  if (self.pos >= self.source.length) {
    const loc = _M0MP46heyq026moonjs3src5lexer5Lexer9loc__here(self);
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind3Eof__, _M0MP46heyq026moonjs3src4util10SourceSpan3new(loc, loc)));
  }
  const c = _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 0);
  const start_loc = _M0MP46heyq026moonjs3src5lexer5Lexer9loc__here(self);
  if (_M0FP46heyq026moonjs3src5lexer23is__ident__start__ascii(c) || (c >= 128 || c === 92)) {
    return _M0MP46heyq026moonjs3src5lexer5Lexer28lex__identifier__or__keyword(self, start_loc);
  }
  if (c >= 48 && c <= 57) {
    return _M0MP46heyq026moonjs3src5lexer5Lexer11lex__number(self, start_loc);
  }
  if (c === 46) {
    if (_M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 1) === 46 && _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 2) === 46) {
      self.pos = self.pos + 3 | 0;
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind8Ellipsis__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
    }
    const n = _M0MP46heyq026moonjs3src5lexer5Lexer4peek(self, 1);
    if (n >= 48 && n <= 57) {
      return _M0MP46heyq026moonjs3src5lexer5Lexer11lex__number(self, start_loc);
    }
    self.pos = self.pos + 1 | 0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5lexer5TokenRP46heyq026moonjs3src5lexer8LexErrorE2Ok(_M0MP46heyq026moonjs3src5lexer5Token3new(_M0DTP46heyq026moonjs3src5lexer9TokenKind3Dot__, _M0MP46heyq026moonjs3src5lexer5Lexer10span__from(self, start_loc)));
  }
  if (c === 34 || c === 39) {
    return _M0MP46heyq026moonjs3src5lexer5Lexer11lex__string(self, start_loc, c);
  }
  if (c === 96) {
    return _M0MP46heyq026moonjs3src5lexer5Lexer20lex__template__start(self, start_loc);
  }
  return _M0MP46heyq026moonjs3src5lexer5Lexer15lex__punctuator(self, start_loc, allow_regex, c);
}
function _M0MP46heyq026moonjs3src6parser6Parser7advance(self) {
  const _bind = self.current.kind;
  let allow_regex;
  switch (_bind.$tag) {
    case 7: {
      allow_regex = false;
      break;
    }
    case 0: {
      allow_regex = false;
      break;
    }
    case 1: {
      allow_regex = false;
      break;
    }
    case 5: {
      allow_regex = false;
      break;
    }
    case 4: {
      allow_regex = false;
      break;
    }
    case 11: {
      allow_regex = false;
      break;
    }
    case 15: {
      allow_regex = false;
      break;
    }
    case 65: {
      allow_regex = false;
      break;
    }
    case 66: {
      allow_regex = false;
      break;
    }
    case 8: {
      const _KeywordTok = _bind;
      const _x = _KeywordTok._0;
      switch (_x) {
        case 28: {
          allow_regex = false;
          break;
        }
        case 29: {
          allow_regex = false;
          break;
        }
        case 22: {
          allow_regex = false;
          break;
        }
        case 26: {
          allow_regex = false;
          break;
        }
        case 24: {
          allow_regex = false;
          break;
        }
        default: {
          allow_regex = true;
        }
      }
      break;
    }
    default: {
      allow_regex = true;
    }
  }
  self.prev_end = self.current.span.end;
  const _bind$2 = _M0MP46heyq026moonjs3src5lexer5Lexer9lex__next(self.lexer, allow_regex);
  if (_bind$2.$tag === 0) {
    const _Err = _bind$2;
    const _e = _Err._0;
    const _LexError = _e;
    const _msg = _LexError._0;
    const _loc = _LexError._1;
    return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError(_msg, _loc));
  } else {
    const _Ok = _bind$2;
    const _tok = _Ok._0;
    self.current = _tok;
    return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE2Ok(undefined);
  }
}
function _M0MP46heyq026moonjs3src6parser6Parser15had__lt__before(self) {
  const _p = self.current.span.start.line;
  const _p$2 = self.prev_end.line;
  return _p !== _p$2;
}
function _M0MP46heyq026moonjs3src6parser6Parser12expect__semi(self) {
  _L: {
    const _bind = self.current.kind;
    switch (_bind.$tag) {
      case 17: {
        return _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
      }
      case 13: {
        break _L;
      }
      case 69: {
        break _L;
      }
      default: {
        if (_M0MP46heyq026moonjs3src6parser6Parser15had__lt__before(self)) {
          return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE2Ok(undefined);
        } else {
          const _p = "expected ';'";
          return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError(_p, self.current.span.start));
        }
      }
    }
  }
  return new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE2Ok(undefined);
}
function _M0MP46heyq026moonjs3src6parser6Parser18parse__break__stmt(self, start) {
  const _bind = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  let label;
  _L: {
    _L$2: {
      const _bind$2 = self.current.kind;
      switch (_bind$2.$tag) {
        case 17: {
          break _L$2;
        }
        case 13: {
          break _L$2;
        }
        case 69: {
          break _L$2;
        }
        case 7: {
          const _IdentifierTok = _bind$2;
          const _name = _IdentifierTok._0;
          if (_M0MP46heyq026moonjs3src6parser6Parser15had__lt__before(self)) {
            label = undefined;
          } else {
            const _bind$3 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
            if (_bind$3.$tag === 0) {
              const _Err = _bind$3;
              const _e = _Err._0;
              return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
            } else {
              label = _name;
            }
          }
          break;
        }
        default: {
          label = undefined;
        }
      }
      break _L;
    }
    label = undefined;
  }
  const _bind$2 = _M0MP46heyq026moonjs3src6parser6Parser12expect__semi(self);
  if (_bind$2.$tag === 0) {
    const _Err = _bind$2;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Stmt3new(new _M0DTP46heyq026moonjs3src3ast8StmtKind5Break(label), _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, self.prev_end)));
}
function _M0MP46heyq026moonjs3src6parser6Parser21parse__continue__stmt(self, start) {
  const _bind = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  let label;
  _L: {
    _L$2: {
      const _bind$2 = self.current.kind;
      switch (_bind$2.$tag) {
        case 17: {
          break _L$2;
        }
        case 13: {
          break _L$2;
        }
        case 69: {
          break _L$2;
        }
        case 7: {
          const _IdentifierTok = _bind$2;
          const _name = _IdentifierTok._0;
          if (_M0MP46heyq026moonjs3src6parser6Parser15had__lt__before(self)) {
            label = undefined;
          } else {
            const _bind$3 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
            if (_bind$3.$tag === 0) {
              const _Err = _bind$3;
              const _e = _Err._0;
              return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
            } else {
              label = _name;
            }
          }
          break;
        }
        default: {
          label = undefined;
        }
      }
      break _L;
    }
    label = undefined;
  }
  const _bind$2 = _M0MP46heyq026moonjs3src6parser6Parser12expect__semi(self);
  if (_bind$2.$tag === 0) {
    const _Err = _bind$2;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Stmt3new(new _M0DTP46heyq026moonjs3src3ast8StmtKind8Continue(label), _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, self.prev_end)));
}
function _M0MP46heyq026moonjs3src6parser6Parser6expect(self, matcher, msg) {
  return matcher(self.current.kind) ? _M0MP46heyq026moonjs3src6parser6Parser7advance(self) : new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError(msg, self.current.span.start));
}
function _M0FP46heyq026moonjs3src6parser14assign__op__of(k) {
  switch (k.$tag) {
    case 44: {
      return _M0FP46heyq026moonjs3src6parser14assign__op__ofN6constrS2287;
    }
    case 45: {
      return _M0FP46heyq026moonjs3src6parser14assign__op__ofN6constrS2288;
    }
    case 46: {
      return _M0FP46heyq026moonjs3src6parser14assign__op__ofN6constrS2289;
    }
    case 47: {
      return _M0FP46heyq026moonjs3src6parser14assign__op__ofN6constrS2290;
    }
    case 48: {
      return _M0FP46heyq026moonjs3src6parser14assign__op__ofN6constrS2291;
    }
    case 49: {
      return _M0FP46heyq026moonjs3src6parser14assign__op__ofN6constrS2292;
    }
    case 50: {
      return _M0FP46heyq026moonjs3src6parser14assign__op__ofN6constrS2293;
    }
    case 51: {
      return _M0FP46heyq026moonjs3src6parser14assign__op__ofN6constrS2294;
    }
    case 52: {
      return _M0FP46heyq026moonjs3src6parser14assign__op__ofN6constrS2295;
    }
    case 53: {
      return _M0FP46heyq026moonjs3src6parser14assign__op__ofN6constrS2296;
    }
    case 54: {
      return _M0FP46heyq026moonjs3src6parser14assign__op__ofN6constrS2297;
    }
    case 55: {
      return _M0FP46heyq026moonjs3src6parser14assign__op__ofN6constrS2298;
    }
    case 56: {
      return _M0FP46heyq026moonjs3src6parser14assign__op__ofN6constrS2299;
    }
    case 59: {
      return _M0FP46heyq026moonjs3src6parser14assign__op__ofN6constrS2300;
    }
    case 60: {
      return _M0FP46heyq026moonjs3src6parser14assign__op__ofN6constrS2301;
    }
    case 61: {
      return _M0FP46heyq026moonjs3src6parser14assign__op__ofN6constrS2302;
    }
    default: {
      return undefined;
    }
  }
}
function _M0MP46heyq026moonjs3src6parser6Parser21finish__postfix__from(self, lhs) {
  if (_M0MP46heyq026moonjs3src6parser6Parser15had__lt__before(self)) {
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE2Ok(lhs);
  }
  const _bind = self.current.kind;
  switch (_bind.$tag) {
    case 65: {
      const end = self.current.span.end;
      const _bind$2 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
      if (_bind$2.$tag === 0) {
        const _Err = _bind$2;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
      }
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Expr3new(new _M0DTP46heyq026moonjs3src3ast8ExprKind6Update(0, lhs, false), _M0MP46heyq026moonjs3src4util10SourceSpan3new(lhs.span.start, end)));
    }
    case 66: {
      const end$2 = self.current.span.end;
      const _bind$3 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
      if (_bind$3.$tag === 0) {
        const _Err = _bind$3;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
      }
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Expr3new(new _M0DTP46heyq026moonjs3src3ast8ExprKind6Update(1, lhs, false), _M0MP46heyq026moonjs3src4util10SourceSpan3new(lhs.span.start, end$2)));
    }
    default: {
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE2Ok(lhs);
    }
  }
}
function _M0FP46heyq026moonjs3src6parser15keyword__lexeme(k) {
  switch (k) {
    case 0: {
      return "break";
    }
    case 1: {
      return "case";
    }
    case 2: {
      return "catch";
    }
    case 3: {
      return "class";
    }
    case 4: {
      return "const";
    }
    case 5: {
      return "continue";
    }
    case 6: {
      return "debugger";
    }
    case 7: {
      return "default";
    }
    case 8: {
      return "delete";
    }
    case 9: {
      return "do";
    }
    case 10: {
      return "else";
    }
    case 11: {
      return "export";
    }
    case 12: {
      return "extends";
    }
    case 13: {
      return "finally";
    }
    case 14: {
      return "for";
    }
    case 15: {
      return "function";
    }
    case 16: {
      return "if";
    }
    case 17: {
      return "import";
    }
    case 18: {
      return "in";
    }
    case 19: {
      return "instanceof";
    }
    case 20: {
      return "let";
    }
    case 21: {
      return "new";
    }
    case 22: {
      return "null";
    }
    case 23: {
      return "return";
    }
    case 24: {
      return "super";
    }
    case 25: {
      return "switch";
    }
    case 26: {
      return "this";
    }
    case 27: {
      return "throw";
    }
    case 28: {
      return "true";
    }
    case 29: {
      return "false";
    }
    case 30: {
      return "try";
    }
    case 31: {
      return "typeof";
    }
    case 32: {
      return "var";
    }
    case 33: {
      return "void";
    }
    case 34: {
      return "while";
    }
    case 35: {
      return "with";
    }
    case 36: {
      return "yield";
    }
    default: {
      return "enum";
    }
  }
}
function _M0MP46heyq026moonjs3src6parser6Parser13expect__ident(self) {
  const _bind = self.current.kind;
  if (_bind.$tag === 7) {
    const _IdentifierTok = _bind;
    const _name = _IdentifierTok._0;
    const _bind$2 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
    if (_bind$2.$tag === 0) {
      const _Err = _bind$2;
      const _e = _Err._0;
      return new _M0DTPC16result6ResultGsRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
    } else {
      return new _M0DTPC16result6ResultGsRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_name);
    }
  } else {
    const _p = "expected identifier";
    return new _M0DTPC16result6ResultGsRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError(_p, self.current.span.start));
  }
}
function _M0MP46heyq026moonjs3src6parser6Parser23parse__function__params(self) {
  const _bind = _M0MP46heyq026moonjs3src6parser6Parser6expect(self, (k) => {
    if (k.$tag === 10) {
      return true;
    } else {
      return false;
    }
  }, "expected '(' before params");
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRPB5ArrayGRP46heyq026moonjs3src3ast7PatternERP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  const params = [];
  const _bind$2 = self.current.kind;
  if (_bind$2.$tag === 11) {
    const _bind$3 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
    if (_bind$3.$tag === 0) {
      const _Err = _bind$3;
      const _e = _Err._0;
      return new _M0DTPC16result6ResultGRPB5ArrayGRP46heyq026moonjs3src3ast7PatternERP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
    }
    return new _M0DTPC16result6ResultGRPB5ArrayGRP46heyq026moonjs3src3ast7PatternERP46heyq026moonjs3src6parser10ParseErrorE2Ok(params);
  }
  let loop_r;
  let _tmp = 0;
  _L: while (true) {
    _L$2: {
      _L$3: {
        const _bind$3 = self.current.kind;
        switch (_bind$3.$tag) {
          case 12: {
            break _L$3;
          }
          case 14: {
            break _L$3;
          }
          case 20: {
            loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("rest params require Step 6b", self.current.span.start));
            break _L;
          }
        }
        break _L$2;
      }
      loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("destructured params require Step 6b", self.current.span.start));
      break;
    }
    const p_start = self.current.span.start;
    const _bind$3 = _M0MP46heyq026moonjs3src6parser6Parser13expect__ident(self);
    let name;
    if (_bind$3.$tag === 0) {
      const _Err = _bind$3;
      const _e = _Err._0;
      loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
      break;
    } else {
      const _Ok = _bind$3;
      name = _Ok._0;
    }
    const _bind$4 = self.current.kind;
    if (_bind$4.$tag === 44) {
      loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("default parameters require Step 6b", self.current.span.start));
      break;
    }
    _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(params, _M0MP46heyq026moonjs3src3ast7Pattern3new(new _M0DTP46heyq026moonjs3src3ast11PatternKind8IdentPat(name), _M0MP46heyq026moonjs3src4util10SourceSpan3new(p_start, self.prev_end)));
    const _bind$5 = self.current.kind;
    switch (_bind$5.$tag) {
      case 16: {
        const _bind$6 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
        if (_bind$6.$tag === 0) {
          const _Err = _bind$6;
          const _e = _Err._0;
          loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
          break _L;
        } else {
          _tmp = 0;
          continue _L;
        }
      }
      case 11: {
        loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE2Ok(undefined);
        break _L;
      }
      default: {
        loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("expected ',' or ')' in param list", self.current.span.start));
        break _L;
      }
    }
  }
  if (loop_r.$tag === 0) {
    const _Err = loop_r;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRPB5ArrayGRP46heyq026moonjs3src3ast7PatternERP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  const _bind$3 = _M0MP46heyq026moonjs3src6parser6Parser6expect(self, (k) => {
    if (k.$tag === 11) {
      return true;
    } else {
      return false;
    }
  }, "expected ')' after params");
  if (_bind$3.$tag === 0) {
    const _Err = _bind$3;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRPB5ArrayGRP46heyq026moonjs3src3ast7PatternERP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  return new _M0DTPC16result6ResultGRPB5ArrayGRP46heyq026moonjs3src3ast7PatternERP46heyq026moonjs3src6parser10ParseErrorE2Ok(params);
}
function _M0MP46heyq026moonjs3src6parser6Parser11peek__binop(self, allow_in) {
  _L: {
    const _bind = self.current.kind;
    switch (_bind.$tag) {
      case 28: {
        return _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2305;
      }
      case 27: {
        return _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2308;
      }
      case 29: {
        return _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2311;
      }
      case 30: {
        return _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2314;
      }
      case 25: {
        return _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2317;
      }
      case 26: {
        return _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2320;
      }
      case 62: {
        return _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2323;
      }
      case 63: {
        return _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2326;
      }
      case 64: {
        return _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2329;
      }
      case 36: {
        return _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2332;
      }
      case 38: {
        return _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2335;
      }
      case 37: {
        return _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2338;
      }
      case 39: {
        return _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2341;
      }
      case 8: {
        const _KeywordTok = _bind;
        const _x = _KeywordTok._0;
        switch (_x) {
          case 19: {
            return _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2344;
          }
          case 18: {
            return allow_in ? _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2347 : undefined;
          }
          default: {
            break _L;
          }
        }
      }
      case 40: {
        return _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2350;
      }
      case 42: {
        return _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2353;
      }
      case 41: {
        return _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2356;
      }
      case 43: {
        return _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2359;
      }
      case 31: {
        return _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2362;
      }
      case 33: {
        return _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2365;
      }
      case 32: {
        return _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2368;
      }
      case 57: {
        return _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2371;
      }
      case 58: {
        return _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2374;
      }
      case 23: {
        return _M0MP46heyq026moonjs3src6parser6Parser11peek__binopN6constrS2377;
      }
      default: {
        break _L;
      }
    }
  }
  return undefined;
}
function _M0MP46heyq026moonjs3src6parser6Parser11parse__stmt(self) {
  const start = self.current.span.start;
  const _bind = self.current.kind;
  switch (_bind.$tag) {
    case 12: {
      return _M0MP46heyq026moonjs3src6parser6Parser18parse__block__stmt(self, start);
    }
    case 17: {
      const _bind$2 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
      if (_bind$2.$tag === 0) {
        const _Err = _bind$2;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
      }
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Stmt3new(_M0DTP46heyq026moonjs3src3ast8StmtKind5Empty__, _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, self.prev_end)));
    }
    case 8: {
      const _KeywordTok = _bind;
      const _kind = _KeywordTok._0;
      switch (_kind) {
        case 32: {
          return _M0MP46heyq026moonjs3src6parser6Parser16parse__var__decl(self, start, 0);
        }
        case 20: {
          return _M0MP46heyq026moonjs3src6parser6Parser16parse__var__decl(self, start, 1);
        }
        case 4: {
          return _M0MP46heyq026moonjs3src6parser6Parser16parse__var__decl(self, start, 2);
        }
        case 16: {
          return _M0MP46heyq026moonjs3src6parser6Parser15parse__if__stmt(self, start);
        }
        case 34: {
          return _M0MP46heyq026moonjs3src6parser6Parser18parse__while__stmt(self, start);
        }
        case 9: {
          return _M0MP46heyq026moonjs3src6parser6Parser22parse__do__while__stmt(self, start);
        }
        case 14: {
          return _M0MP46heyq026moonjs3src6parser6Parser16parse__for__stmt(self, start);
        }
        case 23: {
          return _M0MP46heyq026moonjs3src6parser6Parser19parse__return__stmt(self, start);
        }
        case 0: {
          return _M0MP46heyq026moonjs3src6parser6Parser18parse__break__stmt(self, start);
        }
        case 5: {
          return _M0MP46heyq026moonjs3src6parser6Parser21parse__continue__stmt(self, start);
        }
        case 27: {
          return _M0MP46heyq026moonjs3src6parser6Parser18parse__throw__stmt(self, start);
        }
        case 30: {
          return _M0MP46heyq026moonjs3src6parser6Parser16parse__try__stmt(self, start);
        }
        case 15: {
          return _M0MP46heyq026moonjs3src6parser6Parser21parse__function__decl(self, start);
        }
        case 3: {
          return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("class requires Step 6b", start));
        }
        case 25: {
          return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("switch requires Step 6b", start));
        }
        case 35: {
          return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("with requires Step 6b", start));
        }
        case 6: {
          return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("debugger requires Step 6b", start));
        }
        case 17: {
          return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("import requires Step 6b", start));
        }
        case 11: {
          return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("export requires Step 6b", start));
        }
        default: {
          return _M0MP46heyq026moonjs3src6parser6Parser30parse__expr__stmt__or__labeled(self, start);
        }
      }
    }
    default: {
      return _M0MP46heyq026moonjs3src6parser6Parser30parse__expr__stmt__or__labeled(self, start);
    }
  }
}
function _M0MP46heyq026moonjs3src6parser6Parser18parse__block__stmt(self, start) {
  const _bind = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  const stmts = [];
  let loop_r;
  let _tmp = 0;
  _L: while (true) {
    const _bind$2 = self.current.kind;
    switch (_bind$2.$tag) {
      case 13: {
        loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE2Ok(undefined);
        break _L;
      }
      case 69: {
        loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("unterminated block", self.current.span.start));
        break _L;
      }
      default: {
        const _bind$3 = _M0MP46heyq026moonjs3src6parser6Parser11parse__stmt(self);
        if (_bind$3.$tag === 0) {
          const _Err = _bind$3;
          const _e = _Err._0;
          loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
          break _L;
        } else {
          const _Ok = _bind$3;
          const _s = _Ok._0;
          _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(stmts, _s);
          _tmp = 0;
          continue _L;
        }
      }
    }
  }
  if (loop_r.$tag === 0) {
    const _Err = loop_r;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  const _bind$2 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
  if (_bind$2.$tag === 0) {
    const _Err = _bind$2;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Stmt3new(new _M0DTP46heyq026moonjs3src3ast8StmtKind9BlockStmt(stmts), _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, self.prev_end)));
}
function _M0MP46heyq026moonjs3src6parser6Parser22parse__do__while__stmt(self, start) {
  const _bind = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  self.in_loop = self.in_loop + 1 | 0;
  const body_r = _M0MP46heyq026moonjs3src6parser6Parser11parse__stmt(self);
  self.in_loop = self.in_loop - 1 | 0;
  let body;
  if (body_r.$tag === 0) {
    const _Err = body_r;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  } else {
    const _Ok = body_r;
    body = _Ok._0;
  }
  const _bind$2 = _M0MP46heyq026moonjs3src6parser6Parser6expect(self, (k) => {
    if (k.$tag === 8) {
      const _KeywordTok = k;
      const _x = _KeywordTok._0;
      if (_x === 34) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }, "expected 'while' after do-body");
  if (_bind$2.$tag === 0) {
    const _Err = _bind$2;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  const _bind$3 = _M0MP46heyq026moonjs3src6parser6Parser6expect(self, (k) => {
    if (k.$tag === 10) {
      return true;
    } else {
      return false;
    }
  }, "expected '(' after 'while'");
  if (_bind$3.$tag === 0) {
    const _Err = _bind$3;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  const _bind$4 = _M0MP46heyq026moonjs3src6parser6Parser25parse__expr__allow__comma(self, true);
  let cond;
  if (_bind$4.$tag === 0) {
    const _Err = _bind$4;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  } else {
    const _Ok = _bind$4;
    cond = _Ok._0;
  }
  const _bind$5 = _M0MP46heyq026moonjs3src6parser6Parser6expect(self, (k) => {
    if (k.$tag === 11) {
      return true;
    } else {
      return false;
    }
  }, "expected ')' after do-while cond");
  if (_bind$5.$tag === 0) {
    const _Err = _bind$5;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  const _bind$6 = _M0MP46heyq026moonjs3src6parser6Parser12expect__semi(self);
  if (_bind$6.$tag === 0) {
    const _Err = _bind$6;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Stmt3new(new _M0DTP46heyq026moonjs3src3ast8StmtKind7DoWhile(body, cond), _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, self.prev_end)));
}
function _M0MP46heyq026moonjs3src6parser6Parser25parse__expr__allow__comma(self, allow_in) {
  const _bind = _M0MP46heyq026moonjs3src6parser6Parser23parse__assignment__expr(self, allow_in);
  let first;
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  } else {
    const _Ok = _bind;
    first = _Ok._0;
  }
  return _M0MP46heyq026moonjs3src6parser6Parser21maybe__wrap__sequence(self, first, allow_in);
}
function _M0MP46heyq026moonjs3src6parser6Parser21maybe__wrap__sequence(self, first, allow_in) {
  const _bind = self.current.kind;
  if (_bind.$tag === 16) {
    const exprs = [first];
    const start = first.span.start;
    let loop_r;
    let _tmp = 0;
    while (true) {
      const _bind$2 = self.current.kind;
      if (_bind$2.$tag === 16) {
        const _bind$3 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
        if (_bind$3.$tag === 0) {
          const _Err = _bind$3;
          const _e = _Err._0;
          loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
          break;
        } else {
          const _bind$4 = _M0MP46heyq026moonjs3src6parser6Parser23parse__assignment__expr(self, allow_in);
          if (_bind$4.$tag === 0) {
            const _Err = _bind$4;
            const _e = _Err._0;
            loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
            break;
          } else {
            const _Ok = _bind$4;
            const _e = _Ok._0;
            _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(exprs, _e);
            _tmp = 0;
            continue;
          }
        }
      } else {
        loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE2Ok(undefined);
        break;
      }
    }
    if (loop_r.$tag === 0) {
      const _Err = loop_r;
      const _e = _Err._0;
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
    }
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Expr3new(new _M0DTP46heyq026moonjs3src3ast8ExprKind8Sequence(exprs), _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, self.prev_end)));
  } else {
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE2Ok(first);
  }
}
function _M0MP46heyq026moonjs3src6parser6Parser23parse__assignment__expr(self, allow_in) {
  const _bind = self.current.kind;
  if (_bind.$tag === 8) {
    const _KeywordTok = _bind;
    const _x = _KeywordTok._0;
    if (_x === 36) {
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("yield requires Step 6b", self.current.span.start));
    }
  }
  const _bind$2 = _M0MP46heyq026moonjs3src6parser6Parser18parse__unary__expr(self);
  let lhs;
  if (_bind$2.$tag === 0) {
    const _Err = _bind$2;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  } else {
    const _Ok = _bind$2;
    lhs = _Ok._0;
  }
  return _M0MP46heyq026moonjs3src6parser6Parser18finish__expr__from(self, lhs, 1, allow_in);
}
function _M0MP46heyq026moonjs3src6parser6Parser18finish__expr__from(self, lhs_in, min_prec, allow_in) {
  const _bind = _M0MP46heyq026moonjs3src6parser6Parser26try__finish__binary__chain(self, lhs_in, min_prec, allow_in);
  let lhs;
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  } else {
    const _Ok = _bind;
    lhs = _Ok._0;
  }
  const _bind$2 = self.current.kind;
  let lhs$2;
  if (_bind$2.$tag === 21) {
    if (min_prec <= 2) {
      const _bind$3 = _M0MP46heyq026moonjs3src6parser6Parser24parse__conditional__tail(self, lhs, allow_in);
      if (_bind$3.$tag === 0) {
        const _Err = _bind$3;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
      } else {
        const _Ok = _bind$3;
        lhs$2 = _Ok._0;
      }
    } else {
      lhs$2 = lhs;
    }
  } else {
    lhs$2 = lhs;
  }
  _L: {
    const _bind$3 = _M0FP46heyq026moonjs3src6parser14assign__op__of(self.current.kind);
    if (_bind$3 === undefined) {
      break _L;
    } else {
      const _Some = _bind$3;
      const _op = _Some;
      if (min_prec <= 1) {
        const _bind$4 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
        if (_bind$4.$tag === 0) {
          const _Err = _bind$4;
          const _e = _Err._0;
          return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
        }
        const _bind$5 = _M0MP46heyq026moonjs3src6parser6Parser23parse__assignment__expr(self, allow_in);
        let rhs;
        if (_bind$5.$tag === 0) {
          const _Err = _bind$5;
          const _e = _Err._0;
          return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
        } else {
          const _Ok = _bind$5;
          rhs = _Ok._0;
        }
        const span = _M0MP46heyq026moonjs3src4util10SourceSpan3new(lhs$2.span.start, rhs.span.end);
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Expr3new(new _M0DTP46heyq026moonjs3src3ast8ExprKind6Assign(_op, lhs$2, rhs), span));
      } else {
        break _L;
      }
    }
  }
  return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE2Ok(lhs$2);
}
function _M0MP46heyq026moonjs3src6parser6Parser24parse__conditional__tail(self, cond, allow_in) {
  const _bind = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  const _bind$2 = _M0MP46heyq026moonjs3src6parser6Parser23parse__assignment__expr(self, true);
  let cons;
  if (_bind$2.$tag === 0) {
    const _Err = _bind$2;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  } else {
    const _Ok = _bind$2;
    cons = _Ok._0;
  }
  const _bind$3 = _M0MP46heyq026moonjs3src6parser6Parser6expect(self, (k) => {
    if (k.$tag === 18) {
      return true;
    } else {
      return false;
    }
  }, "expected ':' in conditional");
  if (_bind$3.$tag === 0) {
    const _Err = _bind$3;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  const _bind$4 = _M0MP46heyq026moonjs3src6parser6Parser23parse__assignment__expr(self, allow_in);
  let alt;
  if (_bind$4.$tag === 0) {
    const _Err = _bind$4;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  } else {
    const _Ok = _bind$4;
    alt = _Ok._0;
  }
  const span = _M0MP46heyq026moonjs3src4util10SourceSpan3new(cond.span.start, alt.span.end);
  return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Expr3new(new _M0DTP46heyq026moonjs3src3ast8ExprKind4Cond(cond, cons, alt), span));
}
function _M0MP46heyq026moonjs3src6parser6Parser26try__finish__binary__chain(self, lhs_in, min_prec, allow_in) {
  let lhs = lhs_in;
  let loop_r;
  let _tmp = 0;
  while (true) {
    const op_info = _M0MP46heyq026moonjs3src6parser6Parser11peek__binop(self, allow_in);
    if (op_info === undefined) {
      loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE2Ok(undefined);
      break;
    } else {
      const _Some = op_info;
      const _x = _Some;
      const _prec = _x._0;
      const _right_assoc = _x._1;
      const _kind_of_op = _x._2;
      if (_prec < min_prec || _prec < 3) {
        loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE2Ok(undefined);
        break;
      }
      const _bind = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
      if (_bind.$tag === 0) {
        const _Err = _bind;
        const _e = _Err._0;
        loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
        break;
      }
      const next_min = _right_assoc ? _prec : _prec + 1 | 0;
      const _bind$2 = _M0MP46heyq026moonjs3src6parser6Parser18parse__unary__expr(self);
      let rhs_unary;
      if (_bind$2.$tag === 0) {
        const _Err = _bind$2;
        const _e = _Err._0;
        loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
        break;
      } else {
        const _Ok = _bind$2;
        rhs_unary = _Ok._0;
      }
      const _bind$3 = _M0MP46heyq026moonjs3src6parser6Parser26try__finish__binary__chain(self, rhs_unary, next_min, allow_in);
      let rhs;
      if (_bind$3.$tag === 0) {
        const _Err = _bind$3;
        const _e = _Err._0;
        loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
        break;
      } else {
        const _Ok = _bind$3;
        rhs = _Ok._0;
      }
      const span = _M0MP46heyq026moonjs3src4util10SourceSpan3new(lhs.span.start, rhs.span.end);
      let _tmp$2;
      if (_kind_of_op.$tag === 0) {
        const _BinOpTag = _kind_of_op;
        const _op = _BinOpTag._0;
        _tmp$2 = _M0MP46heyq026moonjs3src3ast4Expr3new(new _M0DTP46heyq026moonjs3src3ast8ExprKind6Binary(_op, lhs, rhs), span);
      } else {
        const _LogOpTag = _kind_of_op;
        const _op = _LogOpTag._0;
        _tmp$2 = _M0MP46heyq026moonjs3src3ast4Expr3new(new _M0DTP46heyq026moonjs3src3ast8ExprKind7Logical(_op, lhs, rhs), span);
      }
      lhs = _tmp$2;
      _tmp = 0;
      continue;
    }
  }
  if (loop_r.$tag === 0) {
    const _Err = loop_r;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  } else {
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE2Ok(lhs);
  }
}
function _M0MP46heyq026moonjs3src6parser6Parser18parse__unary__expr(self) {
  const start = self.current.span.start;
  _L: {
    const _bind = self.current.kind;
    switch (_bind.$tag) {
      case 25: {
        const _bind$2 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
        if (_bind$2.$tag === 0) {
          const _Err = _bind$2;
          const _e = _Err._0;
          return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
        }
        const _bind$3 = _M0MP46heyq026moonjs3src6parser6Parser18parse__unary__expr(self);
        let arg;
        if (_bind$3.$tag === 0) {
          const _Err = _bind$3;
          const _e = _Err._0;
          return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
        } else {
          const _Ok = _bind$3;
          arg = _Ok._0;
        }
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Expr3new(new _M0DTP46heyq026moonjs3src3ast8ExprKind5Unary(0, arg, true), _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, arg.span.end)));
      }
      case 26: {
        const _bind$4 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
        if (_bind$4.$tag === 0) {
          const _Err = _bind$4;
          const _e = _Err._0;
          return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
        }
        const _bind$5 = _M0MP46heyq026moonjs3src6parser6Parser18parse__unary__expr(self);
        let arg$2;
        if (_bind$5.$tag === 0) {
          const _Err = _bind$5;
          const _e = _Err._0;
          return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
        } else {
          const _Ok = _bind$5;
          arg$2 = _Ok._0;
        }
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Expr3new(new _M0DTP46heyq026moonjs3src3ast8ExprKind5Unary(1, arg$2, true), _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, arg$2.span.end)));
      }
      case 35: {
        const _bind$6 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
        if (_bind$6.$tag === 0) {
          const _Err = _bind$6;
          const _e = _Err._0;
          return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
        }
        const _bind$7 = _M0MP46heyq026moonjs3src6parser6Parser18parse__unary__expr(self);
        let arg$3;
        if (_bind$7.$tag === 0) {
          const _Err = _bind$7;
          const _e = _Err._0;
          return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
        } else {
          const _Ok = _bind$7;
          arg$3 = _Ok._0;
        }
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Expr3new(new _M0DTP46heyq026moonjs3src3ast8ExprKind5Unary(2, arg$3, true), _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, arg$3.span.end)));
      }
      case 34: {
        const _bind$8 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
        if (_bind$8.$tag === 0) {
          const _Err = _bind$8;
          const _e = _Err._0;
          return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
        }
        const _bind$9 = _M0MP46heyq026moonjs3src6parser6Parser18parse__unary__expr(self);
        let arg$4;
        if (_bind$9.$tag === 0) {
          const _Err = _bind$9;
          const _e = _Err._0;
          return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
        } else {
          const _Ok = _bind$9;
          arg$4 = _Ok._0;
        }
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Expr3new(new _M0DTP46heyq026moonjs3src3ast8ExprKind5Unary(3, arg$4, true), _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, arg$4.span.end)));
      }
      case 8: {
        const _KeywordTok = _bind;
        const _x = _KeywordTok._0;
        switch (_x) {
          case 31: {
            const _bind$10 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
            if (_bind$10.$tag === 0) {
              const _Err = _bind$10;
              const _e = _Err._0;
              return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
            }
            const _bind$11 = _M0MP46heyq026moonjs3src6parser6Parser18parse__unary__expr(self);
            let arg$5;
            if (_bind$11.$tag === 0) {
              const _Err = _bind$11;
              const _e = _Err._0;
              return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
            } else {
              const _Ok = _bind$11;
              arg$5 = _Ok._0;
            }
            return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Expr3new(new _M0DTP46heyq026moonjs3src3ast8ExprKind5Unary(4, arg$5, true), _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, arg$5.span.end)));
          }
          case 33: {
            const _bind$12 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
            if (_bind$12.$tag === 0) {
              const _Err = _bind$12;
              const _e = _Err._0;
              return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
            }
            const _bind$13 = _M0MP46heyq026moonjs3src6parser6Parser18parse__unary__expr(self);
            let arg$6;
            if (_bind$13.$tag === 0) {
              const _Err = _bind$13;
              const _e = _Err._0;
              return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
            } else {
              const _Ok = _bind$13;
              arg$6 = _Ok._0;
            }
            return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Expr3new(new _M0DTP46heyq026moonjs3src3ast8ExprKind5Unary(5, arg$6, true), _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, arg$6.span.end)));
          }
          case 8: {
            const _bind$14 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
            if (_bind$14.$tag === 0) {
              const _Err = _bind$14;
              const _e = _Err._0;
              return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
            }
            const _bind$15 = _M0MP46heyq026moonjs3src6parser6Parser18parse__unary__expr(self);
            let arg$7;
            if (_bind$15.$tag === 0) {
              const _Err = _bind$15;
              const _e = _Err._0;
              return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
            } else {
              const _Ok = _bind$15;
              arg$7 = _Ok._0;
            }
            return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Expr3new(new _M0DTP46heyq026moonjs3src3ast8ExprKind5Unary(6, arg$7, true), _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, arg$7.span.end)));
          }
          default: {
            break _L;
          }
        }
      }
      case 65: {
        const _bind$16 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
        if (_bind$16.$tag === 0) {
          const _Err = _bind$16;
          const _e = _Err._0;
          return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
        }
        const _bind$17 = _M0MP46heyq026moonjs3src6parser6Parser18parse__unary__expr(self);
        let arg$8;
        if (_bind$17.$tag === 0) {
          const _Err = _bind$17;
          const _e = _Err._0;
          return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
        } else {
          const _Ok = _bind$17;
          arg$8 = _Ok._0;
        }
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Expr3new(new _M0DTP46heyq026moonjs3src3ast8ExprKind6Update(0, arg$8, true), _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, arg$8.span.end)));
      }
      case 66: {
        const _bind$18 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
        if (_bind$18.$tag === 0) {
          const _Err = _bind$18;
          const _e = _Err._0;
          return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
        }
        const _bind$19 = _M0MP46heyq026moonjs3src6parser6Parser18parse__unary__expr(self);
        let arg$9;
        if (_bind$19.$tag === 0) {
          const _Err = _bind$19;
          const _e = _Err._0;
          return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
        } else {
          const _Ok = _bind$19;
          arg$9 = _Ok._0;
        }
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Expr3new(new _M0DTP46heyq026moonjs3src3ast8ExprKind6Update(1, arg$9, true), _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, arg$9.span.end)));
      }
      default: {
        break _L;
      }
    }
  }
  return _M0MP46heyq026moonjs3src6parser6Parser20parse__postfix__expr(self);
}
function _M0MP46heyq026moonjs3src6parser6Parser20parse__postfix__expr(self) {
  const _bind = _M0MP46heyq026moonjs3src6parser6Parser16parse__lhs__expr(self);
  let lhs;
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  } else {
    const _Ok = _bind;
    lhs = _Ok._0;
  }
  return _M0MP46heyq026moonjs3src6parser6Parser21finish__postfix__from(self, lhs);
}
function _M0MP46heyq026moonjs3src6parser6Parser16parse__lhs__expr(self) {
  let primary;
  _L: {
    _L$2: {
      const _bind = self.current.kind;
      if (_bind.$tag === 8) {
        const _KeywordTok = _bind;
        const _x = _KeywordTok._0;
        if (_x === 21) {
          primary = _M0MP46heyq026moonjs3src6parser6Parser16parse__new__expr(self);
        } else {
          break _L$2;
        }
      } else {
        break _L$2;
      }
      break _L;
    }
    primary = _M0MP46heyq026moonjs3src6parser6Parser20parse__primary__expr(self);
  }
  let primary$2;
  if (primary.$tag === 0) {
    const _Err = primary;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  } else {
    const _Ok = primary;
    primary$2 = _Ok._0;
  }
  return _M0MP46heyq026moonjs3src6parser6Parser30continue__expr__after__primary(self, primary$2);
}
function _M0MP46heyq026moonjs3src6parser6Parser30continue__expr__after__primary(self, primary) {
  let lhs = primary;
  let loop_r;
  let _tmp = 0;
  _L: while (true) {
    _L$2: {
      const _bind = self.current.kind;
      switch (_bind.$tag) {
        case 19: {
          const _bind$2 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
          if (_bind$2.$tag === 0) {
            const _Err = _bind$2;
            const _e = _Err._0;
            loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
            break _L;
          }
          const _bind$3 = self.current.kind;
          let name;
          switch (_bind$3.$tag) {
            case 7: {
              const _IdentifierTok = _bind$3;
              name = _IdentifierTok._0;
              break;
            }
            case 8: {
              const _KeywordTok = _bind$3;
              const _kind = _KeywordTok._0;
              name = _M0FP46heyq026moonjs3src6parser15keyword__lexeme(_kind);
              break;
            }
            default: {
              const _p = "expected property name after '.'";
              loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError(_p, self.current.span.start));
              break _L;
            }
          }
          const end = self.current.span.end;
          const _bind$4 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
          if (_bind$4.$tag === 0) {
            const _Err = _bind$4;
            const _e = _Err._0;
            loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
            break _L;
          }
          lhs = _M0MP46heyq026moonjs3src3ast4Expr3new(new _M0DTP46heyq026moonjs3src3ast8ExprKind6Member(lhs, name), _M0MP46heyq026moonjs3src4util10SourceSpan3new(lhs.span.start, end));
          _tmp = 0;
          continue _L;
        }
        case 14: {
          const _bind$5 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
          if (_bind$5.$tag === 0) {
            const _Err = _bind$5;
            const _e = _Err._0;
            loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
            break _L;
          }
          const _bind$6 = _M0MP46heyq026moonjs3src6parser6Parser25parse__expr__allow__comma(self, true);
          let index;
          if (_bind$6.$tag === 0) {
            const _Err = _bind$6;
            const _e = _Err._0;
            loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
            break _L;
          } else {
            const _Ok = _bind$6;
            index = _Ok._0;
          }
          const end$2 = self.current.span.end;
          const _bind$7 = _M0MP46heyq026moonjs3src6parser6Parser6expect(self, (k) => {
            if (k.$tag === 15) {
              return true;
            } else {
              return false;
            }
          }, "expected ']' after index");
          if (_bind$7.$tag === 0) {
            const _Err = _bind$7;
            const _e = _Err._0;
            loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
            break _L;
          }
          lhs = _M0MP46heyq026moonjs3src3ast4Expr3new(new _M0DTP46heyq026moonjs3src3ast8ExprKind11IndexAccess(lhs, index), _M0MP46heyq026moonjs3src4util10SourceSpan3new(lhs.span.start, end$2));
          _tmp = 0;
          continue _L;
        }
        case 10: {
          const _bind$8 = _M0MP46heyq026moonjs3src6parser6Parser16parse__arguments(self);
          let args;
          if (_bind$8.$tag === 0) {
            const _Err = _bind$8;
            const _e = _Err._0;
            loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
            break _L;
          } else {
            const _Ok = _bind$8;
            args = _Ok._0;
          }
          const _bind$9 = self.current.kind;
          if (_bind$9.$tag === 24) {
            loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("arrow function requires Step 6b", self.current.span.start));
            break _L;
          }
          lhs = _M0MP46heyq026moonjs3src3ast4Expr3new(new _M0DTP46heyq026moonjs3src3ast8ExprKind4Call(lhs, args), _M0MP46heyq026moonjs3src4util10SourceSpan3new(lhs.span.start, self.prev_end));
          _tmp = 0;
          continue _L;
        }
        case 22: {
          loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("optional chaining requires Step 6b", self.current.span.start));
          break _L;
        }
        case 2: {
          break _L$2;
        }
        case 5: {
          break _L$2;
        }
        default: {
          loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE2Ok(undefined);
          break _L;
        }
      }
    }
    loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("tagged template requires Step 6b", self.current.span.start));
    break;
  }
  if (loop_r.$tag === 0) {
    const _Err = loop_r;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  } else {
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE2Ok(lhs);
  }
}
function _M0MP46heyq026moonjs3src6parser6Parser16parse__arguments(self) {
  const _bind = _M0MP46heyq026moonjs3src6parser6Parser6expect(self, (k) => {
    if (k.$tag === 10) {
      return true;
    } else {
      return false;
    }
  }, "expected '(' before args");
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRPB5ArrayGRP46heyq026moonjs3src3ast8ArgumentERP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  const args = [];
  const _bind$2 = self.current.kind;
  if (_bind$2.$tag === 11) {
    const _bind$3 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
    if (_bind$3.$tag === 0) {
      const _Err = _bind$3;
      const _e = _Err._0;
      return new _M0DTPC16result6ResultGRPB5ArrayGRP46heyq026moonjs3src3ast8ArgumentERP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
    }
    return new _M0DTPC16result6ResultGRPB5ArrayGRP46heyq026moonjs3src3ast8ArgumentERP46heyq026moonjs3src6parser10ParseErrorE2Ok(args);
  }
  let loop_r;
  let _tmp = 0;
  _L: while (true) {
    const _bind$3 = self.current.kind;
    if (_bind$3.$tag === 20) {
      loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("spread requires Step 6b", self.current.span.start));
      break;
    }
    const _bind$4 = _M0MP46heyq026moonjs3src6parser6Parser23parse__assignment__expr(self, true);
    let e;
    if (_bind$4.$tag === 0) {
      const _Err = _bind$4;
      const _e = _Err._0;
      loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
      break;
    } else {
      const _Ok = _bind$4;
      e = _Ok._0;
    }
    _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(args, new _M0DTP46heyq026moonjs3src3ast8Argument7ArgExpr(e));
    const _bind$5 = self.current.kind;
    switch (_bind$5.$tag) {
      case 16: {
        const _bind$6 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
        if (_bind$6.$tag === 0) {
          const _Err = _bind$6;
          const _e = _Err._0;
          loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
          break _L;
        } else {
          _tmp = 0;
          continue _L;
        }
      }
      case 11: {
        loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE2Ok(undefined);
        break _L;
      }
      default: {
        const _p = "expected ',' or ')' in argument list";
        loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError(_p, self.current.span.start));
        break _L;
      }
    }
  }
  if (loop_r.$tag === 0) {
    const _Err = loop_r;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRPB5ArrayGRP46heyq026moonjs3src3ast8ArgumentERP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  const _bind$3 = _M0MP46heyq026moonjs3src6parser6Parser6expect(self, (k) => {
    if (k.$tag === 11) {
      return true;
    } else {
      return false;
    }
  }, "expected ')' after arguments");
  if (_bind$3.$tag === 0) {
    const _Err = _bind$3;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRPB5ArrayGRP46heyq026moonjs3src3ast8ArgumentERP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  return new _M0DTPC16result6ResultGRPB5ArrayGRP46heyq026moonjs3src3ast8ArgumentERP46heyq026moonjs3src6parser10ParseErrorE2Ok(args);
}
function _M0MP46heyq026moonjs3src6parser6Parser16parse__new__expr(self) {
  const start = self.current.span.start;
  const _bind = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  const _bind$2 = self.current.kind;
  if (_bind$2.$tag === 19) {
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("new.target requires Step 6b", self.current.span.start));
  }
  let callee;
  _L: {
    _L$2: {
      const _bind$3 = self.current.kind;
      if (_bind$3.$tag === 8) {
        const _KeywordTok = _bind$3;
        const _x = _KeywordTok._0;
        if (_x === 21) {
          callee = _M0MP46heyq026moonjs3src6parser6Parser16parse__new__expr(self);
        } else {
          break _L$2;
        }
      } else {
        break _L$2;
      }
      break _L;
    }
    callee = _M0MP46heyq026moonjs3src6parser6Parser20parse__primary__expr(self);
  }
  let callee$2;
  if (callee.$tag === 0) {
    const _Err = callee;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  } else {
    const _Ok = callee;
    callee$2 = _Ok._0;
  }
  let inner_loop;
  let _tmp = 0;
  _L$2: while (true) {
    const _bind$3 = self.current.kind;
    switch (_bind$3.$tag) {
      case 19: {
        const _bind$4 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
        if (_bind$4.$tag === 0) {
          const _Err = _bind$4;
          const _e = _Err._0;
          inner_loop = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
          break _L$2;
        }
        const _bind$5 = self.current.kind;
        let name;
        switch (_bind$5.$tag) {
          case 7: {
            const _IdentifierTok = _bind$5;
            name = _IdentifierTok._0;
            break;
          }
          case 8: {
            const _KeywordTok = _bind$5;
            const _kind = _KeywordTok._0;
            name = _M0FP46heyq026moonjs3src6parser15keyword__lexeme(_kind);
            break;
          }
          default: {
            const _p = "expected property name after '.'";
            inner_loop = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError(_p, self.current.span.start));
            break _L$2;
          }
        }
        const end = self.current.span.end;
        const _bind$6 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
        if (_bind$6.$tag === 0) {
          const _Err = _bind$6;
          const _e = _Err._0;
          inner_loop = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
          break _L$2;
        }
        callee$2 = _M0MP46heyq026moonjs3src3ast4Expr3new(new _M0DTP46heyq026moonjs3src3ast8ExprKind6Member(callee$2, name), _M0MP46heyq026moonjs3src4util10SourceSpan3new(callee$2.span.start, end));
        _tmp = 0;
        continue _L$2;
      }
      case 14: {
        const _bind$7 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
        if (_bind$7.$tag === 0) {
          const _Err = _bind$7;
          const _e = _Err._0;
          inner_loop = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
          break _L$2;
        }
        const _bind$8 = _M0MP46heyq026moonjs3src6parser6Parser25parse__expr__allow__comma(self, true);
        let index;
        if (_bind$8.$tag === 0) {
          const _Err = _bind$8;
          const _e = _Err._0;
          inner_loop = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
          break _L$2;
        } else {
          const _Ok = _bind$8;
          index = _Ok._0;
        }
        const end$2 = self.current.span.end;
        const _bind$9 = _M0MP46heyq026moonjs3src6parser6Parser6expect(self, (k) => {
          if (k.$tag === 15) {
            return true;
          } else {
            return false;
          }
        }, "expected ']' after index");
        if (_bind$9.$tag === 0) {
          const _Err = _bind$9;
          const _e = _Err._0;
          inner_loop = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
          break _L$2;
        }
        callee$2 = _M0MP46heyq026moonjs3src3ast4Expr3new(new _M0DTP46heyq026moonjs3src3ast8ExprKind11IndexAccess(callee$2, index), _M0MP46heyq026moonjs3src4util10SourceSpan3new(callee$2.span.start, end$2));
        _tmp = 0;
        continue _L$2;
      }
      default: {
        inner_loop = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE2Ok(undefined);
        break _L$2;
      }
    }
  }
  if (inner_loop.$tag === 0) {
    const _Err = inner_loop;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  const _bind$3 = self.current.kind;
  let args;
  if (_bind$3.$tag === 10) {
    const _bind$4 = _M0MP46heyq026moonjs3src6parser6Parser16parse__arguments(self);
    if (_bind$4.$tag === 0) {
      const _Err = _bind$4;
      const _e = _Err._0;
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
    } else {
      const _Ok = _bind$4;
      args = _Ok._0;
    }
  } else {
    args = [];
  }
  return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Expr3new(new _M0DTP46heyq026moonjs3src3ast8ExprKind3New(callee$2, args), _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, self.prev_end)));
}
function _M0MP46heyq026moonjs3src6parser6Parser20parse__primary__expr(self) {
  const start = self.current.span.start;
  _L: {
    _L$2: {
      const _bind = self.current.kind;
      switch (_bind.$tag) {
        case 0: {
          const _NumberTok = _bind;
          const _value = _NumberTok._0;
          const _bind$2 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
          if (_bind$2.$tag === 0) {
            const _Err = _bind$2;
            const _e = _Err._0;
            return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
          }
          return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Expr3new(new _M0DTP46heyq026moonjs3src3ast8ExprKind9NumberLit(_value), _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, self.prev_end)));
        }
        case 1: {
          const _StringTok = _bind;
          const _value$2 = _StringTok._0;
          const _bind$3 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
          if (_bind$3.$tag === 0) {
            const _Err = _bind$3;
            const _e = _Err._0;
            return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
          }
          return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Expr3new(new _M0DTP46heyq026moonjs3src3ast8ExprKind9StringLit(_value$2), _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, self.prev_end)));
        }
        case 8: {
          const _KeywordTok = _bind;
          const _x = _KeywordTok._0;
          switch (_x) {
            case 28: {
              const _bind$4 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
              if (_bind$4.$tag === 0) {
                const _Err = _bind$4;
                const _e = _Err._0;
                return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
              }
              return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Expr3new(_M0MP46heyq026moonjs3src6parser6Parser20parse__primary__exprN6constrS2378, _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, self.prev_end)));
            }
            case 29: {
              const _bind$5 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
              if (_bind$5.$tag === 0) {
                const _Err = _bind$5;
                const _e = _Err._0;
                return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
              }
              return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Expr3new(_M0MP46heyq026moonjs3src6parser6Parser20parse__primary__exprN6constrS2379, _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, self.prev_end)));
            }
            case 22: {
              const _bind$6 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
              if (_bind$6.$tag === 0) {
                const _Err = _bind$6;
                const _e = _Err._0;
                return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
              }
              return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Expr3new(_M0DTP46heyq026moonjs3src3ast8ExprKind6Null____, _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, self.prev_end)));
            }
            case 26: {
              const _bind$7 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
              if (_bind$7.$tag === 0) {
                const _Err = _bind$7;
                const _e = _Err._0;
                return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
              }
              return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Expr3new(_M0DTP46heyq026moonjs3src3ast8ExprKind6This____, _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, self.prev_end)));
            }
            case 24: {
              return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("super requires Step 6b", start));
            }
            case 15: {
              return _M0MP46heyq026moonjs3src6parser6Parser21parse__function__expr(self, start);
            }
            case 3: {
              return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("class requires Step 6b", start));
            }
            default: {
              break _L;
            }
          }
        }
        case 7: {
          const _IdentifierTok = _bind;
          const _name = _IdentifierTok._0;
          const _bind$8 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
          if (_bind$8.$tag === 0) {
            const _Err = _bind$8;
            const _e = _Err._0;
            return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
          }
          return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Expr3new(new _M0DTP46heyq026moonjs3src3ast8ExprKind10Identifier(_name), _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, self.prev_end)));
        }
        case 10: {
          return _M0MP46heyq026moonjs3src6parser6Parser20parse__grouped__expr(self, start);
        }
        case 14: {
          return _M0MP46heyq026moonjs3src6parser6Parser21parse__array__literal(self, start);
        }
        case 12: {
          return _M0MP46heyq026moonjs3src6parser6Parser22parse__object__literal(self, start);
        }
        case 6: {
          return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("regex literal requires Step 6b", start));
        }
        case 2: {
          break _L$2;
        }
        case 5: {
          break _L$2;
        }
        default: {
          break _L;
        }
      }
    }
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("template literal requires Step 6b", start));
  }
  const _p = "unexpected token in expression";
  return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError(_p, self.current.span.start));
}
function _M0MP46heyq026moonjs3src6parser6Parser21parse__array__literal(self, start) {
  const _bind = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  const elems = [];
  const _bind$2 = self.current.kind;
  if (_bind$2.$tag === 15) {
    const _bind$3 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
    if (_bind$3.$tag === 0) {
      const _Err = _bind$3;
      const _e = _Err._0;
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
    }
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Expr3new(new _M0DTP46heyq026moonjs3src3ast8ExprKind8ArrayLit(elems), _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, self.prev_end)));
  }
  let loop_r;
  let _tmp = 0;
  _L: while (true) {
    const _bind$3 = self.current.kind;
    switch (_bind$3.$tag) {
      case 20: {
        loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("spread requires Step 6b", self.current.span.start));
        break _L;
      }
      case 16: {
        _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(elems, _M0DTP46heyq026moonjs3src3ast12ArrayElement4Hole__);
        const _bind$4 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
        if (_bind$4.$tag === 0) {
          const _Err = _bind$4;
          const _e = _Err._0;
          loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
          break _L;
        } else {
          _tmp = 0;
          continue _L;
        }
      }
      case 15: {
        loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE2Ok(undefined);
        break _L;
      }
    }
    const _bind$5 = _M0MP46heyq026moonjs3src6parser6Parser23parse__assignment__expr(self, true);
    let e;
    if (_bind$5.$tag === 0) {
      const _Err = _bind$5;
      const _e = _Err._0;
      loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
      break;
    } else {
      const _Ok = _bind$5;
      e = _Ok._0;
    }
    _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(elems, new _M0DTP46heyq026moonjs3src3ast12ArrayElement4Item(e));
    const _bind$6 = self.current.kind;
    switch (_bind$6.$tag) {
      case 16: {
        const _bind$7 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
        if (_bind$7.$tag === 0) {
          const _Err = _bind$7;
          const _e = _Err._0;
          loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
          break _L;
        } else {
          _tmp = 0;
          continue _L;
        }
      }
      case 15: {
        loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE2Ok(undefined);
        break _L;
      }
      default: {
        const _p = "expected ',' or ']' in array literal";
        loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError(_p, self.current.span.start));
        break _L;
      }
    }
  }
  if (loop_r.$tag === 0) {
    const _Err = loop_r;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  const _bind$3 = _M0MP46heyq026moonjs3src6parser6Parser6expect(self, (k) => {
    if (k.$tag === 15) {
      return true;
    } else {
      return false;
    }
  }, "expected ']' after array elements");
  if (_bind$3.$tag === 0) {
    const _Err = _bind$3;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Expr3new(new _M0DTP46heyq026moonjs3src3ast8ExprKind8ArrayLit(elems), _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, self.prev_end)));
}
function _M0MP46heyq026moonjs3src6parser6Parser21parse__function__expr(self, start) {
  const _bind = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  const _bind$2 = self.current.kind;
  if (_bind$2.$tag === 27) {
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("generator requires Step 6b", self.current.span.start));
  }
  const _bind$3 = self.current.kind;
  let id;
  if (_bind$3.$tag === 7) {
    const _IdentifierTok = _bind$3;
    const _name = _IdentifierTok._0;
    const _bind$4 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
    if (_bind$4.$tag === 0) {
      const _Err = _bind$4;
      const _e = _Err._0;
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
    }
    id = _name;
  } else {
    id = undefined;
  }
  const _bind$4 = _M0MP46heyq026moonjs3src6parser6Parser23parse__function__params(self);
  let params;
  if (_bind$4.$tag === 0) {
    const _Err = _bind$4;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  } else {
    const _Ok = _bind$4;
    params = _Ok._0;
  }
  const _bind$5 = _M0MP46heyq026moonjs3src6parser6Parser25parse__stmt__list__braced(self);
  let body_stmts;
  if (_bind$5.$tag === 0) {
    const _Err = _bind$5;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  } else {
    const _Ok = _bind$5;
    body_stmts = _Ok._0;
  }
  const body = _M0MP46heyq026moonjs3src3ast5Block3new(body_stmts);
  return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Expr3new(new _M0DTP46heyq026moonjs3src3ast8ExprKind6FnExpr(id, params, body, false, false), _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, self.prev_end)));
}
function _M0MP46heyq026moonjs3src6parser6Parser25parse__stmt__list__braced(self) {
  const _bind = _M0MP46heyq026moonjs3src6parser6Parser6expect(self, (k) => {
    if (k.$tag === 12) {
      return true;
    } else {
      return false;
    }
  }, "expected '{'");
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRPB5ArrayGRP46heyq026moonjs3src3ast4StmtERP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  const stmts = [];
  let loop_r;
  let _tmp = 0;
  _L: while (true) {
    const _bind$2 = self.current.kind;
    switch (_bind$2.$tag) {
      case 13: {
        loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE2Ok(undefined);
        break _L;
      }
      case 69: {
        loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("unterminated block", self.current.span.start));
        break _L;
      }
      default: {
        const _bind$3 = _M0MP46heyq026moonjs3src6parser6Parser11parse__stmt(self);
        if (_bind$3.$tag === 0) {
          const _Err = _bind$3;
          const _e = _Err._0;
          loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
          break _L;
        } else {
          const _Ok = _bind$3;
          const _s = _Ok._0;
          _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(stmts, _s);
          _tmp = 0;
          continue _L;
        }
      }
    }
  }
  if (loop_r.$tag === 0) {
    const _Err = loop_r;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRPB5ArrayGRP46heyq026moonjs3src3ast4StmtERP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  const _bind$2 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
  if (_bind$2.$tag === 0) {
    const _Err = _bind$2;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRPB5ArrayGRP46heyq026moonjs3src3ast4StmtERP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  return new _M0DTPC16result6ResultGRPB5ArrayGRP46heyq026moonjs3src3ast4StmtERP46heyq026moonjs3src6parser10ParseErrorE2Ok(stmts);
}
function _M0MP46heyq026moonjs3src6parser6Parser20parse__grouped__expr(self, start) {
  const _bind = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  const _bind$2 = self.current.kind;
  if (_bind$2.$tag === 11) {
    const _bind$3 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
    if (_bind$3.$tag === 0) {
      const _Err = _bind$3;
      const _e = _Err._0;
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
    }
    const _bind$4 = self.current.kind;
    if (_bind$4.$tag === 24) {
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("arrow function requires Step 6b", start));
    } else {
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("empty parentheses require an arrow function", start));
    }
  }
  const _bind$3 = _M0MP46heyq026moonjs3src6parser6Parser25parse__expr__allow__comma(self, true);
  let inner;
  if (_bind$3.$tag === 0) {
    const _Err = _bind$3;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  } else {
    const _Ok = _bind$3;
    inner = _Ok._0;
  }
  const _bind$4 = _M0MP46heyq026moonjs3src6parser6Parser6expect(self, (k) => {
    if (k.$tag === 11) {
      return true;
    } else {
      return false;
    }
  }, "expected ')' after expression");
  if (_bind$4.$tag === 0) {
    const _Err = _bind$4;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  const _bind$5 = self.current.kind;
  if (_bind$5.$tag === 24) {
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("arrow function requires Step 6b", self.current.span.start));
  }
  return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Expr3new(inner.kind, _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, self.prev_end)));
}
function _M0MP46heyq026moonjs3src6parser6Parser22parse__object__literal(self, start) {
  const _bind = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  const props = [];
  const _bind$2 = self.current.kind;
  if (_bind$2.$tag === 13) {
    const _bind$3 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
    if (_bind$3.$tag === 0) {
      const _Err = _bind$3;
      const _e = _Err._0;
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
    }
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Expr3new(new _M0DTP46heyq026moonjs3src3ast8ExprKind9ObjectLit(props), _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, self.prev_end)));
  }
  let loop_r;
  let _tmp = 0;
  _L: while (true) {
    const _bind$3 = self.current.kind;
    switch (_bind$3.$tag) {
      case 20: {
        loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("spread requires Step 6b", self.current.span.start));
        break _L;
      }
      case 14: {
        loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("computed key requires Step 6b", self.current.span.start));
        break _L;
      }
    }
    const key_start = self.current.span.start;
    let key;
    let key_ident_name;
    _L$2: {
      const _bind$4 = self.current.kind;
      switch (_bind$4.$tag) {
        case 7: {
          const _IdentifierTok = _bind$4;
          const _name = _IdentifierTok._0;
          const _bind$5 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
          if (_bind$5.$tag === 0) {
            const _Err = _bind$5;
            const _e = _Err._0;
            loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
            break _L;
          }
          key = new _M0DTP46heyq026moonjs3src3ast11PropertyKey5IdKey(_name);
          key_ident_name = _name;
          break _L$2;
        }
        case 8: {
          const _KeywordTok = _bind$4;
          const _kind = _KeywordTok._0;
          const n = _M0FP46heyq026moonjs3src6parser15keyword__lexeme(_kind);
          const _bind$6 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
          if (_bind$6.$tag === 0) {
            const _Err = _bind$6;
            const _e = _Err._0;
            loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
            break _L;
          }
          key = new _M0DTP46heyq026moonjs3src3ast11PropertyKey5IdKey(n);
          key_ident_name = undefined;
          break _L$2;
        }
        case 1: {
          const _StringTok = _bind$4;
          const _value = _StringTok._0;
          const _bind$7 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
          if (_bind$7.$tag === 0) {
            const _Err = _bind$7;
            const _e = _Err._0;
            loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
            break _L;
          }
          key = new _M0DTP46heyq026moonjs3src3ast11PropertyKey9StringKey(_value);
          key_ident_name = undefined;
          break _L$2;
        }
        case 0: {
          const _NumberTok = _bind$4;
          const _value$2 = _NumberTok._0;
          const _bind$8 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
          if (_bind$8.$tag === 0) {
            const _Err = _bind$8;
            const _e = _Err._0;
            loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
            break _L;
          }
          key = new _M0DTP46heyq026moonjs3src3ast11PropertyKey9NumberKey(_value$2);
          key_ident_name = undefined;
          break _L$2;
        }
        default: {
          const _p = "expected property key";
          loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError(_p, self.current.span.start));
          break _L;
        }
      }
    }
    _L$3: {
      _L$4: {
        const _bind$4 = self.current.kind;
        switch (_bind$4.$tag) {
          case 18: {
            const _bind$5 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
            if (_bind$5.$tag === 0) {
              const _Err = _bind$5;
              const _e = _Err._0;
              loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
              break _L;
            }
            const _bind$6 = _M0MP46heyq026moonjs3src6parser6Parser23parse__assignment__expr(self, true);
            let v;
            if (_bind$6.$tag === 0) {
              const _Err = _bind$6;
              const _e = _Err._0;
              loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
              break _L;
            } else {
              const _Ok = _bind$6;
              v = _Ok._0;
            }
            _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(props, new _M0DTP46heyq026moonjs3src3ast14ObjectProperty8KeyValue(key, v, false));
            break;
          }
          case 10: {
            loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("method shorthand requires Step 6b", self.current.span.start));
            break _L;
          }
          case 16: {
            break _L$4;
          }
          case 13: {
            break _L$4;
          }
          case 44: {
            loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("object destructuring default requires Step 6b", self.current.span.start));
            break _L;
          }
          default: {
            const _p = "expected ':' or shorthand in object literal";
            loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError(_p, self.current.span.start));
            break _L;
          }
        }
        break _L$3;
      }
      if (key_ident_name === undefined) {
        const _p = "expected ':' after property key";
        loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError(_p, self.current.span.start));
        break;
      } else {
        const _Some = key_ident_name;
        const _n = _Some;
        const v = _M0MP46heyq026moonjs3src3ast4Expr3new(new _M0DTP46heyq026moonjs3src3ast8ExprKind10Identifier(_n), _M0MP46heyq026moonjs3src4util10SourceSpan3new(key_start, self.prev_end));
        _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(props, new _M0DTP46heyq026moonjs3src3ast14ObjectProperty8KeyValue(key, v, true));
      }
    }
    const _bind$4 = self.current.kind;
    switch (_bind$4.$tag) {
      case 16: {
        const _bind$5 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
        if (_bind$5.$tag === 0) {
          const _Err = _bind$5;
          const _e = _Err._0;
          loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
          break _L;
        } else {
          _tmp = 0;
          continue _L;
        }
      }
      case 13: {
        loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE2Ok(undefined);
        break _L;
      }
      default: {
        const _p = "expected ',' or '}' in object literal";
        loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError(_p, self.current.span.start));
        break _L;
      }
    }
  }
  if (loop_r.$tag === 0) {
    const _Err = loop_r;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  const _bind$3 = _M0MP46heyq026moonjs3src6parser6Parser6expect(self, (k) => {
    if (k.$tag === 13) {
      return true;
    } else {
      return false;
    }
  }, "expected '}' after object literal");
  if (_bind$3.$tag === 0) {
    const _Err = _bind$3;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4ExprRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Expr3new(new _M0DTP46heyq026moonjs3src3ast8ExprKind9ObjectLit(props), _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, self.prev_end)));
}
function _M0MP46heyq026moonjs3src6parser6Parser30parse__expr__stmt__or__labeled(self, start) {
  const _bind = self.current.kind;
  if (_bind.$tag === 7) {
    const _IdentifierTok = _bind;
    const _name = _IdentifierTok._0;
    const ident_span = self.current.span;
    const _bind$2 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
    if (_bind$2.$tag === 0) {
      const _Err = _bind$2;
      const _e = _Err._0;
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
    }
    const _bind$3 = self.current.kind;
    if (_bind$3.$tag === 18) {
      const _bind$4 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
      if (_bind$4.$tag === 0) {
        const _Err = _bind$4;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
      }
      _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(self.labels, _name);
      const body_r = _M0MP46heyq026moonjs3src6parser6Parser11parse__stmt(self);
      _M0MPC15array5Array3popGRP46heyq026moonjs3src8compiler16FunctionCompilerE(self.labels);
      let body;
      if (body_r.$tag === 0) {
        const _Err = body_r;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
      } else {
        const _Ok = body_r;
        body = _Ok._0;
      }
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Stmt3new(new _M0DTP46heyq026moonjs3src3ast8StmtKind7Labeled(_name, body), _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, self.prev_end)));
    } else {
      if (_name === "async") {
        const _bind$4 = self.current.kind;
        if (_bind$4.$tag === 8) {
          const _KeywordTok = _bind$4;
          const _x = _KeywordTok._0;
          if (_x === 15) {
            return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("async function requires Step 6b", start));
          }
        }
      }
      const ident_expr = _M0MP46heyq026moonjs3src3ast4Expr3new(new _M0DTP46heyq026moonjs3src3ast8ExprKind10Identifier(_name), ident_span);
      const _bind$4 = _M0MP46heyq026moonjs3src6parser6Parser30continue__expr__after__primary(self, ident_expr);
      let lhs_member;
      if (_bind$4.$tag === 0) {
        const _Err = _bind$4;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
      } else {
        const _Ok = _bind$4;
        lhs_member = _Ok._0;
      }
      const _bind$5 = _M0MP46heyq026moonjs3src6parser6Parser21finish__postfix__from(self, lhs_member);
      let lhs;
      if (_bind$5.$tag === 0) {
        const _Err = _bind$5;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
      } else {
        const _Ok = _bind$5;
        lhs = _Ok._0;
      }
      const _bind$6 = _M0MP46heyq026moonjs3src6parser6Parser18finish__expr__from(self, lhs, 1, true);
      let full;
      if (_bind$6.$tag === 0) {
        const _Err = _bind$6;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
      } else {
        const _Ok = _bind$6;
        full = _Ok._0;
      }
      const _bind$7 = _M0MP46heyq026moonjs3src6parser6Parser21maybe__wrap__sequence(self, full, true);
      let full$2;
      if (_bind$7.$tag === 0) {
        const _Err = _bind$7;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
      } else {
        const _Ok = _bind$7;
        full$2 = _Ok._0;
      }
      const _bind$8 = _M0MP46heyq026moonjs3src6parser6Parser12expect__semi(self);
      if (_bind$8.$tag === 0) {
        const _Err = _bind$8;
        const _e = _Err._0;
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
      }
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Stmt3new(new _M0DTP46heyq026moonjs3src3ast8StmtKind8ExprStmt(full$2), _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, self.prev_end)));
    }
  }
  const _bind$2 = _M0MP46heyq026moonjs3src6parser6Parser25parse__expr__allow__comma(self, true);
  let e;
  if (_bind$2.$tag === 0) {
    const _Err = _bind$2;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  } else {
    const _Ok = _bind$2;
    e = _Ok._0;
  }
  const _bind$3 = _M0MP46heyq026moonjs3src6parser6Parser12expect__semi(self);
  if (_bind$3.$tag === 0) {
    const _Err = _bind$3;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Stmt3new(new _M0DTP46heyq026moonjs3src3ast8StmtKind8ExprStmt(e), _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, self.prev_end)));
}
function _M0MP46heyq026moonjs3src6parser6Parser16parse__for__stmt(self, start) {
  const _bind = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  const _bind$2 = _M0MP46heyq026moonjs3src6parser6Parser6expect(self, (k) => {
    if (k.$tag === 10) {
      return true;
    } else {
      return false;
    }
  }, "expected '(' after 'for'");
  if (_bind$2.$tag === 0) {
    const _Err = _bind$2;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  let init;
  _L: {
    _L$2: {
      const _bind$3 = self.current.kind;
      switch (_bind$3.$tag) {
        case 17: {
          init = undefined;
          break;
        }
        case 8: {
          const _KeywordTok = _bind$3;
          const _x = _KeywordTok._0;
          switch (_x) {
            case 32: {
              const _bind$4 = _M0MP46heyq026moonjs3src6parser6Parser21parse__for__init__var(self, 0);
              if (_bind$4.$tag === 0) {
                const _Err = _bind$4;
                const _e = _Err._0;
                return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
              } else {
                const _Ok = _bind$4;
                const _v = _Ok._0;
                init = _v;
              }
              break;
            }
            case 20: {
              const _bind$5 = _M0MP46heyq026moonjs3src6parser6Parser21parse__for__init__var(self, 1);
              if (_bind$5.$tag === 0) {
                const _Err = _bind$5;
                const _e = _Err._0;
                return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
              } else {
                const _Ok = _bind$5;
                const _v = _Ok._0;
                init = _v;
              }
              break;
            }
            case 4: {
              const _bind$6 = _M0MP46heyq026moonjs3src6parser6Parser21parse__for__init__var(self, 2);
              if (_bind$6.$tag === 0) {
                const _Err = _bind$6;
                const _e = _Err._0;
                return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
              } else {
                const _Ok = _bind$6;
                const _v = _Ok._0;
                init = _v;
              }
              break;
            }
            default: {
              break _L$2;
            }
          }
          break;
        }
        default: {
          break _L$2;
        }
      }
      break _L;
    }
    const _bind$3 = _M0MP46heyq026moonjs3src6parser6Parser25parse__expr__allow__comma(self, false);
    if (_bind$3.$tag === 0) {
      const _Err = _bind$3;
      const _e = _Err._0;
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
    } else {
      const _Ok = _bind$3;
      const _e = _Ok._0;
      init = new _M0DTP46heyq026moonjs3src3ast7ForInit8InitExpr(_e);
    }
  }
  const _bind$3 = self.current.kind;
  switch (_bind$3.$tag) {
    case 8: {
      const _KeywordTok = _bind$3;
      const _x = _KeywordTok._0;
      if (_x === 18) {
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("for-in requires Step 6b", self.current.span.start));
      }
      break;
    }
    case 7: {
      const _IdentifierTok = _bind$3;
      const _x$2 = _IdentifierTok._0;
      if (_x$2 === "of") {
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("for-of requires Step 6b", self.current.span.start));
      }
      break;
    }
  }
  const _bind$4 = _M0MP46heyq026moonjs3src6parser6Parser6expect(self, (k) => {
    if (k.$tag === 17) {
      return true;
    } else {
      return false;
    }
  }, "expected ';' in for-init");
  if (_bind$4.$tag === 0) {
    const _Err = _bind$4;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  const _bind$5 = self.current.kind;
  let cond;
  if (_bind$5.$tag === 17) {
    cond = undefined;
  } else {
    const _bind$6 = _M0MP46heyq026moonjs3src6parser6Parser25parse__expr__allow__comma(self, true);
    if (_bind$6.$tag === 0) {
      const _Err = _bind$6;
      const _e = _Err._0;
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
    } else {
      const _Ok = _bind$6;
      const _e = _Ok._0;
      cond = _e;
    }
  }
  const _bind$6 = _M0MP46heyq026moonjs3src6parser6Parser6expect(self, (k) => {
    if (k.$tag === 17) {
      return true;
    } else {
      return false;
    }
  }, "expected ';' after for-cond");
  if (_bind$6.$tag === 0) {
    const _Err = _bind$6;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  const _bind$7 = self.current.kind;
  let update;
  if (_bind$7.$tag === 11) {
    update = undefined;
  } else {
    const _bind$8 = _M0MP46heyq026moonjs3src6parser6Parser25parse__expr__allow__comma(self, true);
    if (_bind$8.$tag === 0) {
      const _Err = _bind$8;
      const _e = _Err._0;
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
    } else {
      const _Ok = _bind$8;
      const _e = _Ok._0;
      update = _e;
    }
  }
  const _bind$8 = _M0MP46heyq026moonjs3src6parser6Parser6expect(self, (k) => {
    if (k.$tag === 11) {
      return true;
    } else {
      return false;
    }
  }, "expected ')' after for-header");
  if (_bind$8.$tag === 0) {
    const _Err = _bind$8;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  self.in_loop = self.in_loop + 1 | 0;
  const body_r = _M0MP46heyq026moonjs3src6parser6Parser11parse__stmt(self);
  self.in_loop = self.in_loop - 1 | 0;
  let body;
  if (body_r.$tag === 0) {
    const _Err = body_r;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  } else {
    const _Ok = body_r;
    body = _Ok._0;
  }
  return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Stmt3new(new _M0DTP46heyq026moonjs3src3ast8StmtKind3For(init, cond, update, body), _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, self.prev_end)));
}
function _M0MP46heyq026moonjs3src6parser6Parser21parse__for__init__var(self, kind) {
  const _bind = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast7ForInitRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  const decls = [];
  let loop_r;
  let _tmp = 0;
  while (true) {
    const _bind$2 = _M0MP46heyq026moonjs3src6parser6Parser22parse__var__declarator(self);
    if (_bind$2.$tag === 0) {
      const _Err = _bind$2;
      const _e = _Err._0;
      loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
      break;
    } else {
      const _Ok = _bind$2;
      const _d = _Ok._0;
      _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(decls, _d);
      const _bind$3 = self.current.kind;
      if (_bind$3.$tag === 16) {
        const _bind$4 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
        if (_bind$4.$tag === 0) {
          const _Err = _bind$4;
          const _e = _Err._0;
          loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
          break;
        } else {
          _tmp = 0;
          continue;
        }
      } else {
        loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE2Ok(undefined);
        break;
      }
    }
  }
  if (loop_r.$tag === 0) {
    const _Err = loop_r;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast7ForInitRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast7ForInitRP46heyq026moonjs3src6parser10ParseErrorE2Ok(new _M0DTP46heyq026moonjs3src3ast7ForInit7InitVar(kind, decls));
}
function _M0MP46heyq026moonjs3src6parser6Parser22parse__var__declarator(self) {
  const start = self.current.span.start;
  _L: {
    _L$2: {
      const _bind = self.current.kind;
      switch (_bind.$tag) {
        case 12: {
          break _L$2;
        }
        case 14: {
          break _L$2;
        }
      }
      break _L;
    }
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast13VarDeclaratorRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("destructuring requires Step 6b", start));
  }
  const _bind = _M0MP46heyq026moonjs3src6parser6Parser13expect__ident(self);
  let name;
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast13VarDeclaratorRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  } else {
    const _Ok = _bind;
    name = _Ok._0;
  }
  const pat = _M0MP46heyq026moonjs3src3ast7Pattern3new(new _M0DTP46heyq026moonjs3src3ast11PatternKind8IdentPat(name), _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, self.prev_end));
  const _bind$2 = self.current.kind;
  let init;
  if (_bind$2.$tag === 44) {
    const _bind$3 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
    if (_bind$3.$tag === 0) {
      const _Err = _bind$3;
      const _e = _Err._0;
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast13VarDeclaratorRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
    }
    const _bind$4 = _M0MP46heyq026moonjs3src6parser6Parser23parse__assignment__expr(self, true);
    if (_bind$4.$tag === 0) {
      const _Err = _bind$4;
      const _e = _Err._0;
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast13VarDeclaratorRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
    } else {
      const _Ok = _bind$4;
      const _e = _Ok._0;
      init = _e;
    }
  } else {
    init = undefined;
  }
  return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast13VarDeclaratorRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast13VarDeclarator3new(pat, init));
}
function _M0MP46heyq026moonjs3src6parser6Parser21parse__function__decl(self, start) {
  const _bind = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  const _bind$2 = self.current.kind;
  if (_bind$2.$tag === 27) {
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("generator requires Step 6b", self.current.span.start));
  }
  const _bind$3 = _M0MP46heyq026moonjs3src6parser6Parser13expect__ident(self);
  let id;
  if (_bind$3.$tag === 0) {
    const _Err = _bind$3;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  } else {
    const _Ok = _bind$3;
    id = _Ok._0;
  }
  const _bind$4 = _M0MP46heyq026moonjs3src6parser6Parser23parse__function__params(self);
  let params;
  if (_bind$4.$tag === 0) {
    const _Err = _bind$4;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  } else {
    const _Ok = _bind$4;
    params = _Ok._0;
  }
  const _bind$5 = _M0MP46heyq026moonjs3src6parser6Parser25parse__stmt__list__braced(self);
  let body_stmts;
  if (_bind$5.$tag === 0) {
    const _Err = _bind$5;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  } else {
    const _Ok = _bind$5;
    body_stmts = _Ok._0;
  }
  const body = _M0MP46heyq026moonjs3src3ast5Block3new(body_stmts);
  return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Stmt3new(new _M0DTP46heyq026moonjs3src3ast8StmtKind12FunctionDecl(id, params, body, false, false), _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, self.prev_end)));
}
function _M0MP46heyq026moonjs3src6parser6Parser15parse__if__stmt(self, start) {
  const _bind = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  const _bind$2 = _M0MP46heyq026moonjs3src6parser6Parser6expect(self, (k) => {
    if (k.$tag === 10) {
      return true;
    } else {
      return false;
    }
  }, "expected '(' after 'if'");
  if (_bind$2.$tag === 0) {
    const _Err = _bind$2;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  const _bind$3 = _M0MP46heyq026moonjs3src6parser6Parser25parse__expr__allow__comma(self, true);
  let cond;
  if (_bind$3.$tag === 0) {
    const _Err = _bind$3;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  } else {
    const _Ok = _bind$3;
    cond = _Ok._0;
  }
  const _bind$4 = _M0MP46heyq026moonjs3src6parser6Parser6expect(self, (k) => {
    if (k.$tag === 11) {
      return true;
    } else {
      return false;
    }
  }, "expected ')' after if-condition");
  if (_bind$4.$tag === 0) {
    const _Err = _bind$4;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  const _bind$5 = _M0MP46heyq026moonjs3src6parser6Parser11parse__stmt(self);
  let cons;
  if (_bind$5.$tag === 0) {
    const _Err = _bind$5;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  } else {
    const _Ok = _bind$5;
    cons = _Ok._0;
  }
  let alt;
  _L: {
    _L$2: {
      const _bind$6 = self.current.kind;
      if (_bind$6.$tag === 8) {
        const _KeywordTok = _bind$6;
        const _x = _KeywordTok._0;
        if (_x === 10) {
          const _bind$7 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
          if (_bind$7.$tag === 0) {
            const _Err = _bind$7;
            const _e = _Err._0;
            return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
          }
          const _bind$8 = _M0MP46heyq026moonjs3src6parser6Parser11parse__stmt(self);
          if (_bind$8.$tag === 0) {
            const _Err = _bind$8;
            const _e = _Err._0;
            return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
          } else {
            const _Ok = _bind$8;
            const _s = _Ok._0;
            alt = _s;
          }
        } else {
          break _L$2;
        }
      } else {
        break _L$2;
      }
      break _L;
    }
    alt = undefined;
  }
  return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Stmt3new(new _M0DTP46heyq026moonjs3src3ast8StmtKind2If(cond, cons, alt), _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, self.prev_end)));
}
function _M0MP46heyq026moonjs3src6parser6Parser19parse__return__stmt(self, start) {
  const _bind = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  let arg;
  _L: {
    _L$2: {
      const _bind$2 = self.current.kind;
      switch (_bind$2.$tag) {
        case 17: {
          break _L$2;
        }
        case 13: {
          break _L$2;
        }
        case 69: {
          break _L$2;
        }
        default: {
          if (_M0MP46heyq026moonjs3src6parser6Parser15had__lt__before(self)) {
            arg = undefined;
          } else {
            const _bind$3 = _M0MP46heyq026moonjs3src6parser6Parser25parse__expr__allow__comma(self, true);
            if (_bind$3.$tag === 0) {
              const _Err = _bind$3;
              const _e = _Err._0;
              return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
            } else {
              const _Ok = _bind$3;
              const _e = _Ok._0;
              arg = _e;
            }
          }
        }
      }
      break _L;
    }
    arg = undefined;
  }
  const _bind$2 = _M0MP46heyq026moonjs3src6parser6Parser12expect__semi(self);
  if (_bind$2.$tag === 0) {
    const _Err = _bind$2;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Stmt3new(new _M0DTP46heyq026moonjs3src3ast8StmtKind6Return(arg), _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, self.prev_end)));
}
function _M0MP46heyq026moonjs3src6parser6Parser18parse__throw__stmt(self, start) {
  const _bind = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  if (_M0MP46heyq026moonjs3src6parser6Parser15had__lt__before(self)) {
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("no line terminator allowed after 'throw'", self.current.span.start));
  }
  const _bind$2 = _M0MP46heyq026moonjs3src6parser6Parser25parse__expr__allow__comma(self, true);
  let arg;
  if (_bind$2.$tag === 0) {
    const _Err = _bind$2;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  } else {
    const _Ok = _bind$2;
    arg = _Ok._0;
  }
  const _bind$3 = _M0MP46heyq026moonjs3src6parser6Parser12expect__semi(self);
  if (_bind$3.$tag === 0) {
    const _Err = _bind$3;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Stmt3new(new _M0DTP46heyq026moonjs3src3ast8StmtKind5Throw(arg), _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, self.prev_end)));
}
function _M0MP46heyq026moonjs3src6parser6Parser16parse__try__stmt(self, start) {
  const _bind = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  const _bind$2 = _M0MP46heyq026moonjs3src6parser6Parser25parse__stmt__list__braced(self);
  let body;
  if (_bind$2.$tag === 0) {
    const _Err = _bind$2;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  } else {
    const _Ok = _bind$2;
    body = _Ok._0;
  }
  let catch_;
  _L: {
    _L$2: {
      const _bind$3 = self.current.kind;
      if (_bind$3.$tag === 8) {
        const _KeywordTok = _bind$3;
        const _x = _KeywordTok._0;
        if (_x === 2) {
          const _bind$4 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
          if (_bind$4.$tag === 0) {
            const _Err = _bind$4;
            const _e = _Err._0;
            return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
          }
          const _bind$5 = self.current.kind;
          let param;
          if (_bind$5.$tag === 10) {
            const _bind$6 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
            if (_bind$6.$tag === 0) {
              const _Err = _bind$6;
              const _e = _Err._0;
              return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
            }
            const p_start = self.current.span.start;
            _L$3: {
              _L$4: {
                const _bind$7 = self.current.kind;
                switch (_bind$7.$tag) {
                  case 12: {
                    break _L$4;
                  }
                  case 14: {
                    break _L$4;
                  }
                }
                break _L$3;
              }
              return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("destructuring in catch requires Step 6b", p_start));
            }
            const _bind$7 = _M0MP46heyq026moonjs3src6parser6Parser13expect__ident(self);
            let name;
            if (_bind$7.$tag === 0) {
              const _Err = _bind$7;
              const _e = _Err._0;
              return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
            } else {
              const _Ok = _bind$7;
              name = _Ok._0;
            }
            const _bind$8 = _M0MP46heyq026moonjs3src6parser6Parser6expect(self, (k) => {
              if (k.$tag === 11) {
                return true;
              } else {
                return false;
              }
            }, "expected ')' after catch-param");
            if (_bind$8.$tag === 0) {
              const _Err = _bind$8;
              const _e = _Err._0;
              return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
            }
            param = _M0MP46heyq026moonjs3src3ast7Pattern3new(new _M0DTP46heyq026moonjs3src3ast11PatternKind8IdentPat(name), _M0MP46heyq026moonjs3src4util10SourceSpan3new(p_start, self.prev_end));
          } else {
            param = undefined;
          }
          const _bind$6 = _M0MP46heyq026moonjs3src6parser6Parser25parse__stmt__list__braced(self);
          let cbody;
          if (_bind$6.$tag === 0) {
            const _Err = _bind$6;
            const _e = _Err._0;
            return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
          } else {
            const _Ok = _bind$6;
            cbody = _Ok._0;
          }
          catch_ = _M0MP46heyq026moonjs3src3ast11CatchClause3new(param, cbody);
        } else {
          break _L$2;
        }
      } else {
        break _L$2;
      }
      break _L;
    }
    catch_ = undefined;
  }
  let finally_;
  _L$2: {
    _L$3: {
      const _bind$3 = self.current.kind;
      if (_bind$3.$tag === 8) {
        const _KeywordTok = _bind$3;
        const _x = _KeywordTok._0;
        if (_x === 13) {
          const _bind$4 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
          if (_bind$4.$tag === 0) {
            const _Err = _bind$4;
            const _e = _Err._0;
            return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
          }
          const _bind$5 = _M0MP46heyq026moonjs3src6parser6Parser25parse__stmt__list__braced(self);
          if (_bind$5.$tag === 0) {
            const _Err = _bind$5;
            const _e = _Err._0;
            return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
          } else {
            const _Ok = _bind$5;
            const _sl = _Ok._0;
            finally_ = new _M0DTPC16option6OptionGRPB5ArrayGRP46heyq026moonjs3src3ast4StmtEE4Some(_sl);
          }
        } else {
          break _L$3;
        }
      } else {
        break _L$3;
      }
      break _L$2;
    }
    finally_ = _M0DTPC16option6OptionGRPB5ArrayGRP46heyq026moonjs3src3ast4StmtEE4None__;
  }
  if (catch_ === undefined) {
    if (finally_.$tag === 0) {
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError("try must be followed by catch or finally", self.current.span.start));
    }
  }
  return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Stmt3new(new _M0DTP46heyq026moonjs3src3ast8StmtKind3Try(body, catch_, finally_), _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, self.prev_end)));
}
function _M0MP46heyq026moonjs3src6parser6Parser16parse__var__decl(self, start, kind) {
  const _bind = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  const decls = [];
  let loop_r;
  let _tmp = 0;
  while (true) {
    const _bind$2 = _M0MP46heyq026moonjs3src6parser6Parser22parse__var__declarator(self);
    if (_bind$2.$tag === 0) {
      const _Err = _bind$2;
      const _e = _Err._0;
      loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
      break;
    } else {
      const _Ok = _bind$2;
      const _d = _Ok._0;
      _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(decls, _d);
      const _bind$3 = self.current.kind;
      if (_bind$3.$tag === 16) {
        const _bind$4 = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
        if (_bind$4.$tag === 0) {
          const _Err = _bind$4;
          const _e = _Err._0;
          loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
          break;
        } else {
          _tmp = 0;
          continue;
        }
      } else {
        loop_r = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE2Ok(undefined);
        break;
      }
    }
  }
  if (loop_r.$tag === 0) {
    const _Err = loop_r;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  const _bind$2 = _M0MP46heyq026moonjs3src6parser6Parser12expect__semi(self);
  if (_bind$2.$tag === 0) {
    const _Err = _bind$2;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Stmt3new(new _M0DTP46heyq026moonjs3src3ast8StmtKind7VarDecl(kind, decls), _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, self.prev_end)));
}
function _M0MP46heyq026moonjs3src6parser6Parser18parse__while__stmt(self, start) {
  const _bind = _M0MP46heyq026moonjs3src6parser6Parser7advance(self);
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  const _bind$2 = _M0MP46heyq026moonjs3src6parser6Parser6expect(self, (k) => {
    if (k.$tag === 10) {
      return true;
    } else {
      return false;
    }
  }, "expected '(' after 'while'");
  if (_bind$2.$tag === 0) {
    const _Err = _bind$2;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  const _bind$3 = _M0MP46heyq026moonjs3src6parser6Parser25parse__expr__allow__comma(self, true);
  let cond;
  if (_bind$3.$tag === 0) {
    const _Err = _bind$3;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  } else {
    const _Ok = _bind$3;
    cond = _Ok._0;
  }
  const _bind$4 = _M0MP46heyq026moonjs3src6parser6Parser6expect(self, (k) => {
    if (k.$tag === 11) {
      return true;
    } else {
      return false;
    }
  }, "expected ')' after while-condition");
  if (_bind$4.$tag === 0) {
    const _Err = _bind$4;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  }
  self.in_loop = self.in_loop + 1 | 0;
  const body = _M0MP46heyq026moonjs3src6parser6Parser11parse__stmt(self);
  self.in_loop = self.in_loop - 1 | 0;
  let body$2;
  if (body.$tag === 0) {
    const _Err = body;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  } else {
    const _Ok = body;
    body$2 = _Ok._0;
  }
  return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast4StmtRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast4Stmt3new(new _M0DTP46heyq026moonjs3src3ast8StmtKind5While(cond, body$2), _M0MP46heyq026moonjs3src4util10SourceSpan3new(start, self.prev_end)));
}
function _M0MP46heyq026moonjs3src6parser6Parser3new(source, filename) {
  const l = _M0MP46heyq026moonjs3src5lexer5Lexer3new(source, filename);
  const _bind = _M0MP46heyq026moonjs3src5lexer5Lexer9lex__next(l, true);
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    const _LexError = _e;
    const _msg = _LexError._0;
    const _loc = _LexError._1;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src6parser6ParserRP46heyq026moonjs3src6parser10ParseErrorE3Err(new _M0DTPC15error5Error56heyq02_2fmoonjs_2fsrc_2fparser_2eParseError_2eParseError(_msg, _loc));
  } else {
    const _Ok = _bind;
    const _tok = _Ok._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src6parser6ParserRP46heyq026moonjs3src6parser10ParseErrorE2Ok(new _M0TP46heyq026moonjs3src6parser6Parser(l, _tok, _M0MP46heyq026moonjs3src4util9SourceLoc3new(1, 0), 0, []));
  }
}
function _M0MP46heyq026moonjs3src6parser6Parser13parse__script(self) {
  const body = [];
  let done;
  let _tmp = 0;
  while (true) {
    const _bind = self.current.kind;
    if (_bind.$tag === 69) {
      done = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE2Ok(undefined);
      break;
    } else {
      const _bind$2 = _M0MP46heyq026moonjs3src6parser6Parser11parse__stmt(self);
      if (_bind$2.$tag === 0) {
        const _Err = _bind$2;
        const _e = _Err._0;
        done = new _M0DTPC16result6ResultGuRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
        break;
      } else {
        const _Ok = _bind$2;
        const _s = _Ok._0;
        _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(body, _s);
        _tmp = 0;
        continue;
      }
    }
  }
  if (done.$tag === 0) {
    const _Err = done;
    const _e = _Err._0;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast7ProgramRP46heyq026moonjs3src6parser10ParseErrorE3Err(_e);
  } else {
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src3ast7ProgramRP46heyq026moonjs3src6parser10ParseErrorE2Ok(_M0MP46heyq026moonjs3src3ast7Program3new(body, false));
  }
}
function _M0MP46heyq026moonjs3src2vm5Frame3new(chunk, this_val) {
  const locals = [];
  const _bind = chunk.local_count;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(locals, _M0MP46heyq026moonjs3src5value7Upvalue3new(_M0DTP46heyq026moonjs3src5value7JSValue9Undefined__));
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0TP46heyq026moonjs3src2vm5Frame(0, chunk, locals, [], [], [], this_val, undefined);
}
function _M0MP46heyq026moonjs3src2vm5Frame14new__for__call(chunk, this_val, args, func, caller) {
  const locals = [];
  const _bind = chunk.local_count;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(locals, _M0MP46heyq026moonjs3src5value7Upvalue3new(_M0DTP46heyq026moonjs3src5value7JSValue9Undefined__));
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const filled = args.length < chunk.param_count ? args.length : chunk.param_count;
  let _tmp$2 = 0;
  while (true) {
    const i = _tmp$2;
    if (i < filled) {
      _M0MP46heyq026moonjs3src5value7Upvalue3set(_M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(locals, i), _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(args, i));
      _tmp$2 = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  if (chunk.self_binding_slot >= 0 && chunk.self_binding_slot < locals.length) {
    _M0MP46heyq026moonjs3src5value7Upvalue3set(_M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(locals, chunk.self_binding_slot), new _M0DTP46heyq026moonjs3src5value7JSValue8Function(func));
  }
  return new _M0TP46heyq026moonjs3src2vm5Frame(0, chunk, locals, func.upvalues, [], [], this_val, caller);
}
function _M0MP46heyq026moonjs3src2vm10TryHandler3new(catch_pc, finally_pc, operand_depth) {
  return new _M0TP46heyq026moonjs3src2vm10TryHandler(catch_pc, finally_pc, operand_depth);
}
function _M0MP46heyq026moonjs3src2vm6Engine3new() {
  const globals = _M0MP46heyq026moonjs3src5value6Object3new(_M0MP46heyq026moonjs3src5value5Shape3new(), _M0DTP46heyq026moonjs3src5value7JSValue4Null__);
  const bi = _M0MP46heyq026moonjs3src8builtins8Builtins3new();
  _M0MP46heyq026moonjs3src5value6Object10set__proto(globals, new _M0DTP46heyq026moonjs3src5value7JSValue6Object(bi.object_proto));
  _M0MP46heyq026moonjs3src8builtins8Builtins13install__into(bi, globals);
  return new _M0TP46heyq026moonjs3src2vm6Engine(globals, [], bi);
}
function _M0MP46heyq026moonjs3src2vm6Engine15register__chunk(self, chunk) {
  const _bind = self.chunk_registry.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      if (_M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(self.chunk_registry, i) === chunk) {
        return i;
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const idx = self.chunk_registry.length;
  _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(self.chunk_registry, chunk);
  const _bind$2 = chunk.nested_chunks.length;
  let _tmp$2 = 0;
  while (true) {
    const i = _tmp$2;
    if (i < _bind$2) {
      _M0MP46heyq026moonjs3src2vm6Engine15register__chunk(self, _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(chunk.nested_chunks, i));
      _tmp$2 = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return idx;
}
function _M0FP46heyq026moonjs3src2vm20adjust__ctor__return(caller, ret, this_val) {
  const pc = caller.pc;
  if (pc <= 0) {
    return ret;
  }
  const call_op = _M0FP46heyq026moonjs3src8bytecode6decode(_M0MPC15array5Array2atGjE(caller.chunk.code, pc - 1 | 0)).op;
  const _p = 83;
  if (call_op === _p) {
    _L: {
      switch (ret.$tag) {
        case 6: {
          break _L;
        }
        case 7: {
          break _L;
        }
        case 8: {
          break _L;
        }
        default: {
          return this_val;
        }
      }
    }
    return ret;
  } else {
    return ret;
  }
}
function _M0FP46heyq026moonjs3src2vm11delete__own(obj, name) {
  const _bind = _M0MPC17hashmap7HashMap3getGsRP46heyq026moonjs3src5value8PropMetaE(obj.shape.props, name);
  if (_bind === undefined) {
    return;
  } else {
    const old_keys = obj.shape.keys_ordered;
    const new_shape = _M0MP46heyq026moonjs3src5value5Shape3new();
    const new_slots = [];
    let new_slot_idx = 0;
    const _bind$2 = old_keys.length;
    let _tmp = 0;
    while (true) {
      const _ = _tmp;
      if (_ < _bind$2) {
        const k = old_keys[_];
        _L: {
          if (k === name) {
            break _L;
          }
          const _bind$3 = _M0MPC17hashmap7HashMap3getGsRP46heyq026moonjs3src5value8PropMetaE(obj.shape.props, k);
          let meta;
          if (_bind$3 === undefined) {
            break _L;
          } else {
            const _Some = _bind$3;
            meta = _Some;
          }
          const v = _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(obj.slots, meta.slot_idx);
          _M0MPC17hashmap7HashMap3setGsRP46heyq026moonjs3src5value8PropMetaE(new_shape.props, k, _M0MP46heyq026moonjs3src5value8PropMeta3new(new_slot_idx, meta.attrs));
          _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(new_shape.keys_ordered, k);
          _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(new_slots, v);
          new_slot_idx = new_slot_idx + 1 | 0;
          break _L;
        }
        _tmp = _ + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    _M0MP46heyq026moonjs3src5value6Object10set__shape(obj, new_shape);
    while (true) {
      if (obj.slots.length > 0) {
        _M0MPC15array5Array3popGRP46heyq026moonjs3src8compiler16FunctionCompilerE(obj.slots);
        continue;
      } else {
        break;
      }
    }
    const _bind$3 = new_slots.length;
    let _tmp$2 = 0;
    while (true) {
      const _ = _tmp$2;
      if (_ < _bind$3) {
        const v = new_slots[_];
        _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(obj.slots, v);
        _tmp$2 = _ + 1 | 0;
        continue;
      } else {
        return;
      }
    }
  }
}
function _M0FP46heyq026moonjs3src2vm22describe__call__target(v) {
  switch (v.$tag) {
    case 0: {
      return "undefined";
    }
    case 1: {
      return "null";
    }
    case 2: {
      const _Bool = v;
      const _b = _Bool._0;
      return _b ? "true" : "false";
    }
    case 3: {
      const _Int32 = v;
      const _i = _Int32._0;
      return _M0MPC13int3Int18to__string_2einner(_i, 10);
    }
    case 4: {
      const _Number = v;
      const _d = _Number._0;
      return String(_d);
    }
    case 5: {
      const _Str = v;
      const _s = _Str._0;
      return `\"${_s}\"`;
    }
    case 6: {
      return "[object Object]";
    }
    case 7: {
      const _Function = v;
      const _f = _Function._0;
      return _f.name;
    }
    default: {
      const _NativeFn = v;
      const _nf = _NativeFn._0;
      return _nf.name;
    }
  }
}
function _M0FP46heyq026moonjs3src2vm13effective__op(frame) {
  const pc = frame.pc;
  const word = _M0MPC15array5Array2atGjE(frame.chunk.code, pc);
  const decoded = _M0FP46heyq026moonjs3src8bytecode6decode(word);
  const _p = decoded.op;
  const _p$2 = 254;
  if (_p === _p$2) {
    const next = _M0FP46heyq026moonjs3src8bytecode6decode(_M0MPC15array5Array2atGjE(frame.chunk.code, pc + 1 | 0));
    return next.op;
  } else {
    return decoded.op;
  }
}
function _M0FP46heyq026moonjs3src2vm19parse__array__index(s) {
  if (s.length === 0) {
    return undefined;
  }
  if (s === "0") {
    return _M0FP46heyq026moonjs3src2vm19parse__array__indexN6constrS1393;
  }
  const zero_code = 48;
  const nine_code = 57;
  const _p = 0 >>> 0 < s.length ? s.charCodeAt(0) : $oob();
  const first = _p;
  if (first < (zero_code + 1 | 0) || first > nine_code) {
    return undefined;
  }
  let acc = first - zero_code | 0;
  const _bind = s.length;
  let _tmp = 1;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      const _p$2 = i >>> 0 < s.length ? s.charCodeAt(i) : $oob();
      const c = _p$2;
      if (c < zero_code || c > nine_code) {
        return undefined;
      }
      acc = (Math.imul(acc, 10) | 0) + (c - zero_code | 0) | 0;
      if (acc < 0) {
        return undefined;
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return acc;
}
function _M0FP46heyq026moonjs3src2vm18number__to__string(d) {
  if (d !== d) {
    return "NaN";
  }
  if (d > _M0FPB18double__max__value) {
    return "Infinity";
  }
  if (d < _M0FPB18double__min__value) {
    return "-Infinity";
  }
  if (d === 0) {
    return "0";
  }
  const trunc = _M0MPC16double6Double5trunc(d);
  if (trunc === d && (d >= -9.22337203685477478e+18 && d <= 9.22337203685477478e+18)) {
    const i64_val = $i64_trunc_f64(d);
    if ($f64_convert_i64(BigInt.asIntN(64, i64_val)) === d) {
      return _M0MPC15int645Int6418to__string_2einner(i64_val, 10);
    }
  }
  return String(d);
}
function _M0FP46heyq026moonjs3src2vm10to__string(v) {
  switch (v.$tag) {
    case 0: {
      return "undefined";
    }
    case 1: {
      return "null";
    }
    case 2: {
      const _Bool = v;
      const _x = _Bool._0;
      if (_x === true) {
        return "true";
      } else {
        return "false";
      }
    }
    case 3: {
      const _Int32 = v;
      const _i = _Int32._0;
      return _M0MPC13int3Int18to__string_2einner(_i, 10);
    }
    case 4: {
      const _Number = v;
      const _d = _Number._0;
      return _M0FP46heyq026moonjs3src2vm18number__to__string(_d);
    }
    case 5: {
      const _Str = v;
      return _Str._0;
    }
    case 6: {
      return "[object Object]";
    }
    case 7: {
      const _Function = v;
      const _f = _Function._0;
      return `function ${_f.name}() { [native code] }`;
    }
    default: {
      const _NativeFn = v;
      const _nf = _NativeFn._0;
      return `function ${_nf.name}() { [native code] }`;
    }
  }
}
function _M0FP46heyq026moonjs3src2vm25primitive__to__string__fn(receiver) {
  let name;
  if (receiver.$tag === 5) {
    name = "toString";
  } else {
    name = "toString";
  }
  const impl_ = (_this, _args) => {
    if (receiver.$tag === 5) {
      const _Str = receiver;
      const _s = _Str._0;
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11NativeErrorE2Ok(new _M0DTP46heyq026moonjs3src5value7JSValue3Str(_s));
    } else {
      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11NativeErrorE2Ok(new _M0DTP46heyq026moonjs3src5value7JSValue3Str(_M0FP46heyq026moonjs3src2vm10to__string(receiver)));
    }
  };
  return new _M0DTP46heyq026moonjs3src5value7JSValue8NativeFn(_M0MP46heyq026moonjs3src5value14NativeFunction3new(name, false, impl_));
}
function _M0FP46heyq026moonjs3src2vm20get__property__value(v, name) {
  _L: {
    switch (v.$tag) {
      case 1: {
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValuesE3Err(`Cannot read properties of null (reading '${name}')`);
      }
      case 0: {
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValuesE3Err(`Cannot read properties of undefined (reading '${name}')`);
      }
      case 6: {
        const _Object = v;
        const _obj = _Object._0;
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValuesE2Ok(_M0MP46heyq026moonjs3src5value6Object13get__property(_obj, name));
      }
      case 5: {
        const _Str = v;
        const _s = _Str._0;
        if (name === "length") {
          return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValuesE2Ok(new _M0DTP46heyq026moonjs3src5value7JSValue5Int32(_s.length));
        }
        if (name === "toString" || name === "valueOf") {
          return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValuesE2Ok(_M0FP46heyq026moonjs3src2vm25primitive__to__string__fn(v));
        }
        const _bind = _M0FP46heyq026moonjs3src2vm19parse__array__index(name);
        if (_bind === undefined) {
          return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValuesE2Ok(_M0DTP46heyq026moonjs3src5value7JSValue9Undefined__);
        } else {
          const _Some = _bind;
          const _i = _Some;
          return _i >= 0 && _i < _s.length ? new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValuesE2Ok(new _M0DTP46heyq026moonjs3src5value7JSValue3Str(_M0MPC16string10StringView9to__owned(_M0MPC16string6String11sub_2einner(_s, _i, _i + 1 | 0)))) : new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValuesE2Ok(_M0DTP46heyq026moonjs3src5value7JSValue9Undefined__);
        }
      }
      case 3: {
        break _L;
      }
      case 4: {
        break _L;
      }
      case 2: {
        break _L;
      }
      case 7: {
        const _Function = v;
        const _f = _Function._0;
        if (name === "name") {
          return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValuesE2Ok(new _M0DTP46heyq026moonjs3src5value7JSValue3Str(_f.name));
        }
        if (name === "prototype") {
          return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValuesE2Ok(_f.prototype);
        }
        if (name === "length") {
          return _M0FP46heyq026moonjs3src2vm20get__property__valueN6constrS1395;
        }
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValuesE2Ok(_M0DTP46heyq026moonjs3src5value7JSValue9Undefined__);
      }
      default: {
        const _NativeFn = v;
        const _nf = _NativeFn._0;
        if (name === "name") {
          return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValuesE2Ok(new _M0DTP46heyq026moonjs3src5value7JSValue3Str(_nf.name));
        }
        if (name === "prototype") {
          return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValuesE2Ok(_nf.prototype);
        }
        if (name === "length") {
          return _M0FP46heyq026moonjs3src2vm20get__property__valueN6constrS1397;
        }
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValuesE2Ok(_M0DTP46heyq026moonjs3src5value7JSValue9Undefined__);
      }
    }
  }
  if (name === "toString" || name === "valueOf") {
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValuesE2Ok(_M0FP46heyq026moonjs3src2vm25primitive__to__string__fn(v));
  }
  return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValuesE2Ok(_M0DTP46heyq026moonjs3src5value7JSValue9Undefined__);
}
function _M0FP46heyq026moonjs3src2vm19get__element__value(v, _key, key_str) {
  return _M0FP46heyq026moonjs3src2vm20get__property__value(v, key_str);
}
function _M0FP46heyq026moonjs3src2vm17instanceof__check(obj_val, ctor_val) {
  let target_proto;
  switch (ctor_val.$tag) {
    case 8: {
      const _NativeFn = ctor_val;
      const _nf = _NativeFn._0;
      target_proto = _nf.prototype;
      break;
    }
    case 7: {
      const _Function = ctor_val;
      const _f = _Function._0;
      target_proto = _f.prototype;
      break;
    }
    default: {
      return _M0FP46heyq026moonjs3src2vm17instanceof__checkN6constrS1398;
    }
  }
  let target_obj;
  if (target_proto.$tag === 6) {
    const _Object = target_proto;
    target_obj = _Object._0;
  } else {
    return _M0FP46heyq026moonjs3src2vm17instanceof__checkN6constrS1399;
  }
  if (obj_val.$tag === 6) {
    const _Object = obj_val;
    const _start = _Object._0;
    let cur = _start.proto;
    let result = false;
    let done = false;
    while (true) {
      if (!done) {
        const _bind = cur;
        if (_bind.$tag === 6) {
          const _Object$2 = _bind;
          const _op_ref = _Object$2._0;
          if (_op_ref === target_obj) {
            result = true;
            done = true;
          } else {
            cur = _op_ref.proto;
          }
        } else {
          done = true;
        }
        continue;
      } else {
        break;
      }
    }
    return new _M0DTPC16result6ResultGbsE2Ok(result);
  } else {
    return _M0FP46heyq026moonjs3src2vm17instanceof__checkN6constrS1400;
  }
}
function _M0FP46heyq026moonjs3src2vm10int32__add(a, b) {
  const sum = BigInt.asUintN(64, BigInt.asUintN(64, BigInt(a)) + BigInt.asUintN(64, BigInt(b)));
  return BigInt.asIntN(64, sum) >= BigInt.asIntN(64, 18446744071562067968n) && BigInt.asIntN(64, sum) <= BigInt.asIntN(64, 2147483647n) ? new _M0DTP46heyq026moonjs3src5value7JSValue5Int32(Number(BigInt.asIntN(32, sum)) | 0) : new _M0DTP46heyq026moonjs3src5value7JSValue6Number($f64_convert_i64(BigInt.asIntN(64, sum)));
}
function _M0EPC16string6StringP46heyq026moonjs3src2vm12charcode__at(self, i) {
  const _p = i >>> 0 < self.length ? self.charCodeAt(i) : $oob();
  return _p;
}
function _M0FP46heyq026moonjs3src2vm17parse__int__radix(s, radix) {
  if (s.length === 0) {
    return _M0FPC16double14not__a__number;
  }
  let acc = 0;
  const radix_d = radix + 0;
  const _bind = s.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      const ch = _M0EPC16string6StringP46heyq026moonjs3src2vm12charcode__at(s, i);
      let d;
      if (ch >= 48 && ch <= 57) {
        d = ch - 48 | 0;
      } else {
        if (ch >= 97 && ch <= 122) {
          d = (ch - 97 | 0) + 10 | 0;
        } else {
          if (ch >= 65 && ch <= 90) {
            d = (ch - 65 | 0) + 10 | 0;
          } else {
            return _M0FPC16double14not__a__number;
          }
        }
      }
      if (d < 0 || d >= radix) {
        return _M0FPC16double14not__a__number;
      }
      acc = acc * radix_d + (d + 0);
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return acc;
}
function _M0FP46heyq026moonjs3src2vm18string__to__number(s) {
  const trimmed_view = _M0MPC16string6String4trim(s, undefined);
  if ((trimmed_view.end - trimmed_view.start | 0) === 0) {
    return 0;
  }
  const trimmed = _M0MPC16string10StringView9to__owned(trimmed_view);
  if (trimmed === "Infinity" || trimmed === "+Infinity") {
    return _M0FPC16double8infinity;
  }
  if (trimmed === "-Infinity") {
    return _M0FPC16double13neg__infinity;
  }
  if (trimmed.length >= 2 && _M0EPC16string6StringP46heyq026moonjs3src2vm12charcode__at(trimmed, 0) === 48) {
    const c = _M0EPC16string6StringP46heyq026moonjs3src2vm12charcode__at(trimmed, 1);
    if (c === 120 || c === 88) {
      return _M0FP46heyq026moonjs3src2vm17parse__int__radix(_M0MPC16string10StringView9to__owned(_M0MPC16string6String11sub_2einner(trimmed, 2, undefined)), 16);
    }
    if (c === 98 || c === 66) {
      return _M0FP46heyq026moonjs3src2vm17parse__int__radix(_M0MPC16string10StringView9to__owned(_M0MPC16string6String11sub_2einner(trimmed, 2, undefined)), 2);
    }
    if (c === 111 || c === 79) {
      return _M0FP46heyq026moonjs3src2vm17parse__int__radix(_M0MPC16string10StringView9to__owned(_M0MPC16string6String11sub_2einner(trimmed, 2, undefined)), 8);
    }
  }
  let _try_err;
  _L: {
    const _bind = _M0FPC28internal7strconv13parse__double(_M0MPC16string6String12view_2einner(trimmed, 0, undefined));
    if (_bind.$tag === 1) {
      const _ok = _bind;
      return _ok._0;
    } else {
      const _err = _bind;
      _try_err = _err._0;
      break _L;
    }
  }
  return _M0FPC16double14not__a__number;
}
function _M0FP46heyq026moonjs3src2vm10to__number(v) {
  switch (v.$tag) {
    case 0: {
      return _M0FPC16double14not__a__number;
    }
    case 1: {
      return 0;
    }
    case 2: {
      const _Bool = v;
      const _x = _Bool._0;
      if (_x === true) {
        return 1;
      } else {
        return 0;
      }
    }
    case 3: {
      const _Int32 = v;
      const _i = _Int32._0;
      return _i + 0;
    }
    case 4: {
      const _Number = v;
      return _Number._0;
    }
    case 5: {
      const _Str = v;
      const _s = _Str._0;
      return _M0FP46heyq026moonjs3src2vm18string__to__number(_s);
    }
    case 6: {
      return _M0FPC16double14not__a__number;
    }
    case 7: {
      return _M0FPC16double14not__a__number;
    }
    default: {
      return _M0FPC16double14not__a__number;
    }
  }
}
function _M0FP46heyq026moonjs3src2vm7js__add(x, y) {
  _L: {
    _L$2: {
      if (x.$tag === 5) {
        break _L$2;
      } else {
        if (y.$tag === 5) {
          break _L$2;
        } else {
          if (x.$tag === 3) {
            const _Int32 = x;
            const _a = _Int32._0;
            if (y.$tag === 3) {
              const _Int32$2 = y;
              const _b = _Int32$2._0;
              return _M0FP46heyq026moonjs3src2vm10int32__add(_a, _b);
            } else {
              break _L;
            }
          } else {
            break _L;
          }
        }
      }
    }
    return new _M0DTP46heyq026moonjs3src5value7JSValue3Str(`${_M0FP46heyq026moonjs3src2vm10to__string(x)}${_M0FP46heyq026moonjs3src2vm10to__string(y)}`);
  }
  return new _M0DTP46heyq026moonjs3src5value7JSValue6Number(_M0FP46heyq026moonjs3src2vm10to__number(x) + _M0FP46heyq026moonjs3src2vm10to__number(y));
}
function _M0FP46heyq026moonjs3src2vm17double__to__int32(d) {
  if (d !== d || (d > _M0FPB18double__max__value || d < _M0FPB18double__min__value)) {
    return 0;
  }
  const truncated = _M0MPC16double6Double5trunc(d);
  const modded = truncated - 4294967296 * _M0MPC16double6Double5floor(truncated / 4294967296);
  return modded >= 2147483648 ? _M0MPC16double6Double7to__int(modded - 4294967296) : _M0MPC16double6Double7to__int(modded);
}
function _M0FP46heyq026moonjs3src2vm9to__int32(v) {
  if (v.$tag === 3) {
    const _Int32 = v;
    return _Int32._0;
  } else {
    return _M0FP46heyq026moonjs3src2vm17double__to__int32(_M0FP46heyq026moonjs3src2vm10to__number(v));
  }
}
function _M0FP46heyq026moonjs3src2vm8js__band(x, y) {
  return new _M0DTP46heyq026moonjs3src5value7JSValue5Int32(_M0FP46heyq026moonjs3src2vm9to__int32(x) & _M0FP46heyq026moonjs3src2vm9to__int32(y));
}
function _M0FP46heyq026moonjs3src2vm8js__bnot(x) {
  return new _M0DTP46heyq026moonjs3src5value7JSValue5Int32(~_M0FP46heyq026moonjs3src2vm9to__int32(x));
}
function _M0FP46heyq026moonjs3src2vm7js__bor(x, y) {
  return new _M0DTP46heyq026moonjs3src5value7JSValue5Int32(_M0FP46heyq026moonjs3src2vm9to__int32(x) | _M0FP46heyq026moonjs3src2vm9to__int32(y));
}
function _M0FP46heyq026moonjs3src2vm8js__bxor(x, y) {
  return new _M0DTP46heyq026moonjs3src5value7JSValue5Int32(_M0FP46heyq026moonjs3src2vm9to__int32(x) ^ _M0FP46heyq026moonjs3src2vm9to__int32(y));
}
function _M0FP46heyq026moonjs3src2vm7js__div(x, y) {
  const a = _M0FP46heyq026moonjs3src2vm10to__number(x);
  const b = _M0FP46heyq026moonjs3src2vm10to__number(y);
  const r = a / b;
  return new _M0DTP46heyq026moonjs3src5value7JSValue6Number(r);
}
function _M0FP46heyq026moonjs3src2vm20abstract__relational(x, y) {
  _L: {
    if (x.$tag === 5) {
      const _Str = x;
      const _a = _Str._0;
      if (y.$tag === 5) {
        const _Str$2 = y;
        const _b = _Str$2._0;
        return _M0IP016_24default__implPB7Compare6op__ltGsE(_a, _b);
      } else {
        break _L;
      }
    } else {
      break _L;
    }
  }
  const a = _M0FP46heyq026moonjs3src2vm10to__number(x);
  const b = _M0FP46heyq026moonjs3src2vm10to__number(y);
  return a !== a || b !== b ? -1 : a < b;
}
function _M0FP46heyq026moonjs3src2vm6js__ge(x, y) {
  const _bind = _M0FP46heyq026moonjs3src2vm20abstract__relational(x, y);
  if (_bind === -1) {
    return false;
  } else {
    const _Some = _bind;
    const _b = _Some;
    return !_b;
  }
}
function _M0FP46heyq026moonjs3src2vm6js__gt(x, y) {
  const _bind = _M0FP46heyq026moonjs3src2vm20abstract__relational(y, x);
  return _bind === -1 ? false : _bind;
}
function _M0FP46heyq026moonjs3src2vm6js__le(x, y) {
  const _bind = _M0FP46heyq026moonjs3src2vm20abstract__relational(y, x);
  if (_bind === -1) {
    return false;
  } else {
    const _Some = _bind;
    const _b = _Some;
    return !_b;
  }
}
function _M0FP46heyq026moonjs3src2vm14js__strict__eq(x, y) {
  switch (x.$tag) {
    case 0: {
      if (y.$tag === 0) {
        return true;
      } else {
        return false;
      }
    }
    case 1: {
      if (y.$tag === 1) {
        return true;
      } else {
        return false;
      }
    }
    case 2: {
      const _Bool = x;
      const _a = _Bool._0;
      if (y.$tag === 2) {
        const _Bool$2 = y;
        const _b = _Bool$2._0;
        return _a === _b;
      } else {
        return false;
      }
    }
    case 3: {
      const _Int32 = x;
      const _a$2 = _Int32._0;
      switch (y.$tag) {
        case 3: {
          const _Int32$2 = y;
          const _b = _Int32$2._0;
          return _a$2 === _b;
        }
        case 4: {
          const _Number = y;
          const _b$2 = _Number._0;
          return _a$2 + 0 === _b$2;
        }
        default: {
          return false;
        }
      }
    }
    case 4: {
      const _Number$2 = x;
      const _a$3 = _Number$2._0;
      switch (y.$tag) {
        case 3: {
          const _Int32$3 = y;
          const _b$3 = _Int32$3._0;
          return _a$3 === _b$3 + 0;
        }
        case 4: {
          const _Number$3 = y;
          const _b$4 = _Number$3._0;
          return _a$3 === _b$4;
        }
        default: {
          return false;
        }
      }
    }
    case 5: {
      const _Str = x;
      const _a$4 = _Str._0;
      if (y.$tag === 5) {
        const _Str$2 = y;
        const _b$5 = _Str$2._0;
        return _a$4 === _b$5;
      } else {
        return false;
      }
    }
    case 6: {
      const _Object = x;
      const _a$5 = _Object._0;
      if (y.$tag === 6) {
        const _Object$2 = y;
        const _b$5 = _Object$2._0;
        return _a$5 === _b$5;
      } else {
        return false;
      }
    }
    case 7: {
      const _Function = x;
      const _a$6 = _Function._0;
      if (y.$tag === 7) {
        const _Function$2 = y;
        const _b$5 = _Function$2._0;
        return _a$6 === _b$5;
      } else {
        return false;
      }
    }
    default: {
      const _NativeFn = x;
      const _a$7 = _NativeFn._0;
      if (y.$tag === 8) {
        const _NativeFn$2 = y;
        const _b$5 = _NativeFn$2._0;
        return _a$7 === _b$5;
      } else {
        return false;
      }
    }
  }
}
function _M0FP46heyq026moonjs3src2vm13js__loose__eq(x, y) {
  let _tmp = x;
  let _tmp$2 = y;
  _L: while (true) {
    const x$2 = _tmp;
    const y$2 = _tmp$2;
    _L$2: {
      _L$3: {
        _L$4: {
          _L$5: {
            _L$6: {
              switch (x$2.$tag) {
                case 0: {
                  switch (y$2.$tag) {
                    case 0: {
                      return true;
                    }
                    case 1: {
                      return true;
                    }
                    case 2: {
                      break _L$2;
                    }
                    case 6: {
                      return false;
                    }
                    default: {
                      return false;
                    }
                  }
                }
                case 1: {
                  switch (y$2.$tag) {
                    case 1: {
                      return true;
                    }
                    case 0: {
                      return true;
                    }
                    case 2: {
                      break _L$2;
                    }
                    case 6: {
                      return false;
                    }
                    default: {
                      return false;
                    }
                  }
                }
                case 2: {
                  if (y$2.$tag === 2) {
                    break _L$6;
                  } else {
                    _tmp = new _M0DTP46heyq026moonjs3src5value7JSValue6Number(_M0FP46heyq026moonjs3src2vm10to__number(x$2));
                    continue _L;
                  }
                }
                case 5: {
                  switch (y$2.$tag) {
                    case 5: {
                      break _L$6;
                    }
                    case 3: {
                      break _L$3;
                    }
                    case 4: {
                      break _L$3;
                    }
                    case 2: {
                      break _L$2;
                    }
                    default: {
                      return false;
                    }
                  }
                }
                case 3: {
                  switch (y$2.$tag) {
                    case 3: {
                      break _L$5;
                    }
                    case 4: {
                      break _L$5;
                    }
                    case 5: {
                      break _L$4;
                    }
                    case 2: {
                      break _L$2;
                    }
                    default: {
                      return false;
                    }
                  }
                }
                case 4: {
                  switch (y$2.$tag) {
                    case 3: {
                      break _L$5;
                    }
                    case 4: {
                      break _L$5;
                    }
                    case 5: {
                      break _L$4;
                    }
                    case 2: {
                      break _L$2;
                    }
                    default: {
                      return false;
                    }
                  }
                }
                default: {
                  if (y$2.$tag === 2) {
                    break _L$2;
                  } else {
                    switch (x$2.$tag) {
                      case 6: {
                        const _Object = x$2;
                        const _a = _Object._0;
                        switch (y$2.$tag) {
                          case 6: {
                            const _Object$2 = y$2;
                            const _b = _Object$2._0;
                            return _a === _b;
                          }
                          case 1: {
                            return false;
                          }
                          case 0: {
                            return false;
                          }
                          default: {
                            return false;
                          }
                        }
                      }
                      case 7: {
                        const _Function = x$2;
                        const _a$2 = _Function._0;
                        if (y$2.$tag === 7) {
                          const _Function$2 = y$2;
                          const _b$2 = _Function$2._0;
                          return _a$2 === _b$2;
                        } else {
                          return false;
                        }
                      }
                      default: {
                        const _NativeFn = x$2;
                        const _a$3 = _NativeFn._0;
                        if (y$2.$tag === 8) {
                          const _NativeFn$2 = y$2;
                          const _b$2 = _NativeFn$2._0;
                          return _a$3 === _b$2;
                        } else {
                          return false;
                        }
                      }
                    }
                  }
                }
              }
            }
            return _M0FP46heyq026moonjs3src2vm14js__strict__eq(x$2, y$2);
          }
          return _M0FP46heyq026moonjs3src2vm14js__strict__eq(x$2, y$2);
        }
        return _M0FP46heyq026moonjs3src2vm14js__strict__eq(x$2, new _M0DTP46heyq026moonjs3src5value7JSValue6Number(_M0FP46heyq026moonjs3src2vm10to__number(y$2)));
      }
      return _M0FP46heyq026moonjs3src2vm14js__strict__eq(new _M0DTP46heyq026moonjs3src5value7JSValue6Number(_M0FP46heyq026moonjs3src2vm10to__number(x$2)), y$2);
    }
    _tmp$2 = new _M0DTP46heyq026moonjs3src5value7JSValue6Number(_M0FP46heyq026moonjs3src2vm10to__number(y$2));
    continue;
  }
}
function _M0FP46heyq026moonjs3src2vm6js__lt(x, y) {
  const _bind = _M0FP46heyq026moonjs3src2vm20abstract__relational(x, y);
  return _bind === -1 ? false : _bind;
}
function _M0FP46heyq026moonjs3src2vm7js__mod(x, y) {
  _L: {
    if (x.$tag === 3) {
      const _Int32 = x;
      const _a = _Int32._0;
      if (y.$tag === 3) {
        const _Int32$2 = y;
        const _b = _Int32$2._0;
        return _b !== 0 ? new _M0DTP46heyq026moonjs3src5value7JSValue5Int32(_a - (Math.imul(_a / _b | 0, _b) | 0) | 0) : new _M0DTP46heyq026moonjs3src5value7JSValue6Number(_M0FPC16double14not__a__number);
      } else {
        break _L;
      }
    } else {
      break _L;
    }
  }
  const a = _M0FP46heyq026moonjs3src2vm10to__number(x);
  const b = _M0FP46heyq026moonjs3src2vm10to__number(y);
  return new _M0DTP46heyq026moonjs3src5value7JSValue6Number(_M0IPC16double6DoublePB3Mod3mod(a, b));
}
function _M0FP46heyq026moonjs3src2vm7js__mul(x, y) {
  _L: {
    if (x.$tag === 3) {
      const _Int32 = x;
      const _a = _Int32._0;
      if (y.$tag === 3) {
        const _Int32$2 = y;
        const _b = _Int32$2._0;
        const prod = BigInt.asUintN(64, BigInt.asUintN(64, BigInt(_a)) * BigInt.asUintN(64, BigInt(_b)));
        return BigInt.asIntN(64, prod) >= BigInt.asIntN(64, 18446744071562067968n) && BigInt.asIntN(64, prod) <= BigInt.asIntN(64, 2147483647n) ? new _M0DTP46heyq026moonjs3src5value7JSValue5Int32(Number(BigInt.asIntN(32, prod)) | 0) : new _M0DTP46heyq026moonjs3src5value7JSValue6Number($f64_convert_i64(BigInt.asIntN(64, prod)));
      } else {
        break _L;
      }
    } else {
      break _L;
    }
  }
  return new _M0DTP46heyq026moonjs3src5value7JSValue6Number(_M0FP46heyq026moonjs3src2vm10to__number(x) * _M0FP46heyq026moonjs3src2vm10to__number(y));
}
function _M0FP46heyq026moonjs3src2vm7js__neg(x) {
  if (x.$tag === 3) {
    const _Int32 = x;
    const _i = _Int32._0;
    return _i === -2147483648 ? new _M0DTP46heyq026moonjs3src5value7JSValue6Number(-(_i + 0)) : new _M0DTP46heyq026moonjs3src5value7JSValue5Int32(-_i | 0);
  } else {
    return new _M0DTP46heyq026moonjs3src5value7JSValue6Number(-_M0FP46heyq026moonjs3src2vm10to__number(x));
  }
}
function _M0FP46heyq026moonjs3src2vm7js__pow(x, y) {
  const a = _M0FP46heyq026moonjs3src2vm10to__number(x);
  const b = _M0FP46heyq026moonjs3src2vm10to__number(y);
  return new _M0DTP46heyq026moonjs3src5value7JSValue6Number(_M0FPC14math3pow(a, b));
}
function _M0FP46heyq026moonjs3src2vm10to__uint32(v) {
  const i = _M0FP46heyq026moonjs3src2vm9to__int32(v);
  return i;
}
function _M0FP46heyq026moonjs3src2vm7js__shl(x, y) {
  const lhs = _M0FP46heyq026moonjs3src2vm9to__int32(x);
  const shift = _M0FP46heyq026moonjs3src2vm10to__uint32(y) & 31;
  const u = lhs;
  const shifted = u << shift;
  return new _M0DTP46heyq026moonjs3src5value7JSValue5Int32(shifted);
}
function _M0FP46heyq026moonjs3src2vm7js__shr(x, y) {
  const lhs = _M0FP46heyq026moonjs3src2vm9to__int32(x);
  const shift = _M0FP46heyq026moonjs3src2vm10to__uint32(y) & 31;
  return new _M0DTP46heyq026moonjs3src5value7JSValue5Int32(lhs >> shift);
}
function _M0FP46heyq026moonjs3src2vm7js__sub(x, y) {
  _L: {
    if (x.$tag === 3) {
      const _Int32 = x;
      const _a = _Int32._0;
      if (y.$tag === 3) {
        const _Int32$2 = y;
        const _b = _Int32$2._0;
        const diff = BigInt.asUintN(64, BigInt.asUintN(64, BigInt(_a)) - BigInt.asUintN(64, BigInt(_b)));
        return BigInt.asIntN(64, diff) >= BigInt.asIntN(64, 18446744071562067968n) && BigInt.asIntN(64, diff) <= BigInt.asIntN(64, 2147483647n) ? new _M0DTP46heyq026moonjs3src5value7JSValue5Int32(Number(BigInt.asIntN(32, diff)) | 0) : new _M0DTP46heyq026moonjs3src5value7JSValue6Number($f64_convert_i64(BigInt.asIntN(64, diff)));
      } else {
        break _L;
      }
    } else {
      break _L;
    }
  }
  return new _M0DTP46heyq026moonjs3src5value7JSValue6Number(_M0FP46heyq026moonjs3src2vm10to__number(x) - _M0FP46heyq026moonjs3src2vm10to__number(y));
}
function _M0FP46heyq026moonjs3src2vm8js__ushr(x, y) {
  const lhs = _M0FP46heyq026moonjs3src2vm10to__uint32(x);
  const shift = _M0FP46heyq026moonjs3src2vm10to__uint32(y) & 31;
  const result = lhs >>> shift | 0;
  return result >>> 0 <= 2147483647 >>> 0 ? new _M0DTP46heyq026moonjs3src5value7JSValue5Int32(result) : new _M0DTP46heyq026moonjs3src5value7JSValue6Number($f64_convert_i32_u(result));
}
function _M0FP46heyq026moonjs3src2vm19make__error__object(name, message) {
  const obj = _M0MP46heyq026moonjs3src5value6Object3new(_M0MP46heyq026moonjs3src5value5Shape3new(), _M0DTP46heyq026moonjs3src5value7JSValue4Null__);
  _M0MP46heyq026moonjs3src5value6Object13add__property(obj, "name", new _M0DTP46heyq026moonjs3src5value7JSValue3Str(name), 7);
  _M0MP46heyq026moonjs3src5value6Object13add__property(obj, "message", new _M0DTP46heyq026moonjs3src5value7JSValue3Str(message), 7);
  return new _M0DTP46heyq026moonjs3src5value7JSValue6Object(obj);
}
function _M0FP46heyq026moonjs3src2vm11peek__stack(frame) {
  const n = frame.operand_stack.length;
  if (n === 0) {
    `VM: operand stack empty on peek at pc=${_M0MPC13int3Int18to__string_2einner(frame.pc, 10)} in ${frame.chunk.name}`;
    $panic();
  }
  return _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, n - 1 | 0);
}
function _M0FP46heyq026moonjs3src2vm10pop__stack(frame) {
  const _bind = _M0MPC15array5Array3popGRP46heyq026moonjs3src8compiler16FunctionCompilerE(frame.operand_stack);
  if (_bind === undefined) {
    `VM: operand stack underflow at pc=${_M0MPC13int3Int18to__string_2einner(frame.pc, 10)} in ${frame.chunk.name}`;
    return $panic();
  } else {
    const _Some = _bind;
    return _Some;
  }
}
function _M0FP46heyq026moonjs3src2vm17unwind__in__frame(frame, exc) {
  const n = frame.try_stack.length;
  if (n === 0) {
    return undefined;
  }
  const handler = _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(frame.try_stack, n - 1 | 0);
  _M0MPC15array5Array3popGRP46heyq026moonjs3src8compiler16FunctionCompilerE(frame.try_stack);
  if (handler.catch_pc < 0) {
    return undefined;
  }
  while (true) {
    if (frame.operand_stack.length > handler.operand_depth) {
      _M0MPC15array5Array3popGRP46heyq026moonjs3src8compiler16FunctionCompilerE(frame.operand_stack);
      continue;
    } else {
      break;
    }
  }
  _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, exc.value);
  return handler.catch_pc;
}
function _M0FP46heyq026moonjs3src2vm20propagate__exception(frame, exc) {
  let cur = frame;
  while (true) {
    const _bind = cur;
    if (_bind === undefined) {
      return undefined;
    } else {
      const _Some = _bind;
      const _f = _Some;
      const _bind$2 = _M0FP46heyq026moonjs3src2vm17unwind__in__frame(_f, exc);
      if (_bind$2 === undefined) {
        cur = _f.caller;
      } else {
        const _Some$2 = _bind$2;
        const _pc = _Some$2;
        _f.pc = _pc;
        return _f;
      }
    }
    continue;
  }
}
function _M0FP46heyq026moonjs3src2vm13string__const(frame, idx) {
  const _bind = _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(frame.chunk.const_pool, idx);
  if (_bind.$tag === 5) {
    const _Str = _bind;
    return _Str._0;
  } else {
    `VM: expected String constant at pool index ${_M0MPC13int3Int18to__string_2einner(idx, 10)} in ${frame.chunk.name}`;
    return $panic();
  }
}
function _M0FP46heyq026moonjs3src2vm14frame__loc__at(frame, pc) {
  return pc >= 0 && pc < frame.chunk.source_locs.length ? _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(frame.chunk.source_locs, pc) : frame.chunk.source_locs.length > 0 ? _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(frame.chunk.source_locs, frame.chunk.source_locs.length - 1 | 0) : _M0MP46heyq026moonjs3src4util9SourceLoc3new(1, 1);
}
function _M0FP46heyq026moonjs3src2vm18throw__from__frame(frame, cur_pc, value) {
  const stack = [];
  const loc = _M0FP46heyq026moonjs3src2vm14frame__loc__at(frame, cur_pc);
  _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(stack, _M0MP46heyq026moonjs3src5value14StackFrameInfo3new(frame.chunk.name, frame.chunk.filename, loc));
  let cur = frame.caller;
  while (true) {
    const _bind = cur;
    if (_bind === undefined) {
      break;
    } else {
      const _Some = _bind;
      const _f = _Some;
      const caller_pc = _f.pc > 0 ? _f.pc - 1 | 0 : 0;
      const caller_loc = _M0FP46heyq026moonjs3src2vm14frame__loc__at(_f, caller_pc);
      _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(stack, _M0MP46heyq026moonjs3src5value14StackFrameInfo3new(_f.chunk.name, _f.chunk.filename, caller_loc));
      cur = _f.caller;
    }
    continue;
  }
  return _M0MP46heyq026moonjs3src5value11JSException3new(value, stack);
}
function _M0FP46heyq026moonjs3src2vm11to__boolean(v) {
  switch (v.$tag) {
    case 0: {
      return false;
    }
    case 1: {
      return false;
    }
    case 2: {
      const _Bool = v;
      return _Bool._0;
    }
    case 3: {
      const _Int32 = v;
      const _x = _Int32._0;
      if (_x === 0) {
        return false;
      } else {
        return true;
      }
    }
    case 4: {
      const _Number = v;
      const _d = _Number._0;
      return _d !== _d ? false : !(_d === 0);
    }
    case 5: {
      const _Str = v;
      const _s = _Str._0;
      return _s.length > 0;
    }
    case 6: {
      return true;
    }
    case 7: {
      return true;
    }
    default: {
      return true;
    }
  }
}
function _M0FP46heyq026moonjs3src2vm14typeof__string(v) {
  switch (v.$tag) {
    case 0: {
      return "undefined";
    }
    case 1: {
      return "object";
    }
    case 2: {
      return "boolean";
    }
    case 3: {
      return "number";
    }
    case 4: {
      return "number";
    }
    case 5: {
      return "string";
    }
    case 6: {
      return "object";
    }
    case 7: {
      return "function";
    }
    default: {
      return "function";
    }
  }
}
function _M0MP46heyq026moonjs3src2vm6Engine22array__proto__or__null(self) {
  const _bind = self.builtins;
  if (_bind === undefined) {
    return _M0DTP46heyq026moonjs3src5value7JSValue4Null__;
  } else {
    const _Some = _bind;
    const _bi = _Some;
    return new _M0DTP46heyq026moonjs3src5value7JSValue6Object(_bi.array_proto);
  }
}
function _M0MP46heyq026moonjs3src2vm6Engine17error__proto__for(self, name) {
  const _bind = self.builtins;
  if (_bind === undefined) {
    return _M0DTP46heyq026moonjs3src5value7JSValue4Null__;
  } else {
    const _Some = _bind;
    const _bi = _Some;
    switch (name) {
      case "TypeError": {
        return new _M0DTP46heyq026moonjs3src5value7JSValue6Object(_bi.type_error_proto);
      }
      case "RangeError": {
        return new _M0DTP46heyq026moonjs3src5value7JSValue6Object(_bi.range_error_proto);
      }
      case "SyntaxError": {
        return new _M0DTP46heyq026moonjs3src5value7JSValue6Object(_bi.syntax_error_proto);
      }
      case "ReferenceError": {
        return new _M0DTP46heyq026moonjs3src5value7JSValue6Object(_bi.reference_error_proto);
      }
      default: {
        return new _M0DTP46heyq026moonjs3src5value7JSValue6Object(_bi.error_proto);
      }
    }
  }
}
function _M0MP46heyq026moonjs3src2vm6Engine25make__error__from__native(self, err) {
  const obj = _M0MP46heyq026moonjs3src5value6Object3new(_M0MP46heyq026moonjs3src5value5Shape3new(), _M0DTP46heyq026moonjs3src5value7JSValue4Null__);
  _M0MP46heyq026moonjs3src5value6Object13add__property(obj, "name", new _M0DTP46heyq026moonjs3src5value7JSValue3Str(err.name), 7);
  _M0MP46heyq026moonjs3src5value6Object13add__property(obj, "message", new _M0DTP46heyq026moonjs3src5value7JSValue3Str(err.message), 7);
  const proto = _M0MP46heyq026moonjs3src2vm6Engine17error__proto__for(self, err.name);
  _M0MP46heyq026moonjs3src5value6Object10set__proto(obj, proto);
  return new _M0DTP46heyq026moonjs3src5value7JSValue6Object(obj);
}
function _M0MP46heyq026moonjs3src2vm6Engine23object__proto__or__null(self) {
  const _bind = self.builtins;
  if (_bind === undefined) {
    return _M0DTP46heyq026moonjs3src5value7JSValue4Null__;
  } else {
    const _Some = _bind;
    const _bi = _Some;
    return new _M0DTP46heyq026moonjs3src5value7JSValue6Object(_bi.object_proto);
  }
}
function _M0MP46heyq026moonjs3src2vm6Engine14execute__frame(self, initial) {
  let frame = initial;
  _L: while (true) {
    if (frame.pc >= frame.chunk.code.length) {
      const _bind = frame.caller;
      if (_bind === undefined) {
        return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11JSExceptionE2Ok(_M0DTP46heyq026moonjs3src5value7JSValue9Undefined__);
      } else {
        const _Some = _bind;
        const _caller = _Some;
        _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(_caller.operand_stack, _M0DTP46heyq026moonjs3src5value7JSValue9Undefined__);
        frame = _caller;
        continue;
      }
    }
    const op = _M0FP46heyq026moonjs3src2vm13effective__op(frame);
    const cur_pc = frame.pc;
    const _p = 0;
    if (op === _p) {
      frame.pc = cur_pc + 1 | 0;
    } else {
      const _p$2 = 1;
      if (op === _p$2) {
        _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, _M0DTP46heyq026moonjs3src5value7JSValue9Undefined__);
        frame.pc = cur_pc + 1 | 0;
      } else {
        const _p$3 = 2;
        if (op === _p$3) {
          _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, _M0DTP46heyq026moonjs3src5value7JSValue4Null__);
          frame.pc = cur_pc + 1 | 0;
        } else {
          const _p$4 = 3;
          if (op === _p$4) {
            _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, _M0MP46heyq026moonjs3src2vm6Engine14execute__frameN6constrS1401);
            frame.pc = cur_pc + 1 | 0;
          } else {
            const _p$5 = 4;
            if (op === _p$5) {
              _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, _M0MP46heyq026moonjs3src2vm6Engine14execute__frameN6constrS1402);
              frame.pc = cur_pc + 1 | 0;
            } else {
              const _p$6 = 5;
              if (op === _p$6) {
                const _bind = _M0MP46heyq026moonjs3src8bytecode5Chunk18read__operand__i24(frame.chunk, cur_pc);
                const _i = _bind._0;
                const _adv = _bind._1;
                _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, new _M0DTP46heyq026moonjs3src5value7JSValue5Int32(_i));
                frame.pc = cur_pc + _adv | 0;
              } else {
                const _p$7 = 6;
                if (op === _p$7) {
                  const _bind = _M0MP46heyq026moonjs3src8bytecode5Chunk18read__operand__u24(frame.chunk, cur_pc);
                  const _idx = _bind._0;
                  const _adv = _bind._1;
                  const i = _idx;
                  _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(frame.chunk.const_pool, i));
                  frame.pc = cur_pc + _adv | 0;
                } else {
                  const _p$8 = 7;
                  if (op === _p$8) {
                    const v = _M0FP46heyq026moonjs3src2vm11peek__stack(frame);
                    _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, v);
                    frame.pc = cur_pc + 1 | 0;
                  } else {
                    let _tmp;
                    const _p$9 = 8;
                    if (op === _p$9) {
                      _tmp = true;
                    } else {
                      const _p$10 = 10;
                      _tmp = op === _p$10;
                    }
                    if (_tmp) {
                      _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                      frame.pc = cur_pc + 1 | 0;
                    } else {
                      const _p$10 = 9;
                      if (op === _p$10) {
                        const n = frame.operand_stack.length;
                        if (n < 2) {
                          $panic();
                        }
                        const a = _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, n - 2 | 0);
                        const b = _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, n - 1 | 0);
                        _M0MPC15array5Array3setGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, n - 2 | 0, b);
                        _M0MPC15array5Array3setGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, n - 1 | 0, a);
                        frame.pc = cur_pc + 1 | 0;
                      } else {
                        const _p$11 = 16;
                        if (op === _p$11) {
                          const _bind = _M0MP46heyq026moonjs3src8bytecode5Chunk18read__operand__u24(frame.chunk, cur_pc);
                          const _idx = _bind._0;
                          const _adv = _bind._1;
                          const i = _idx;
                          const _tmp$2 = frame.operand_stack;
                          const _p$12 = _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(frame.locals, i);
                          _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(_tmp$2, _p$12.value);
                          frame.pc = cur_pc + _adv | 0;
                        } else {
                          const _p$12 = 17;
                          if (op === _p$12) {
                            const _bind = _M0MP46heyq026moonjs3src8bytecode5Chunk18read__operand__u24(frame.chunk, cur_pc);
                            const _idx = _bind._0;
                            const _adv = _bind._1;
                            const i = _idx;
                            const v = _M0FP46heyq026moonjs3src2vm11peek__stack(frame);
                            _M0MP46heyq026moonjs3src5value7Upvalue3set(_M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(frame.locals, i), v);
                            frame.pc = cur_pc + _adv | 0;
                          } else {
                            const _p$13 = 18;
                            if (op === _p$13) {
                              const _bind = _M0MP46heyq026moonjs3src8bytecode5Chunk18read__operand__u24(frame.chunk, cur_pc);
                              const _idx = _bind._0;
                              const _adv = _bind._1;
                              const i = _idx;
                              const _tmp$2 = frame.operand_stack;
                              const _p$14 = _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(frame.upvalues, i);
                              _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(_tmp$2, _p$14.value);
                              frame.pc = cur_pc + _adv | 0;
                            } else {
                              const _p$14 = 19;
                              if (op === _p$14) {
                                const _bind = _M0MP46heyq026moonjs3src8bytecode5Chunk18read__operand__u24(frame.chunk, cur_pc);
                                const _idx = _bind._0;
                                const _adv = _bind._1;
                                const i = _idx;
                                const v = _M0FP46heyq026moonjs3src2vm11peek__stack(frame);
                                _M0MP46heyq026moonjs3src5value7Upvalue3set(_M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(frame.upvalues, i), v);
                                frame.pc = cur_pc + _adv | 0;
                              } else {
                                const _p$15 = 20;
                                if (op === _p$15) {
                                  const _bind = _M0MP46heyq026moonjs3src8bytecode5Chunk18read__operand__u24(frame.chunk, cur_pc);
                                  const _idx = _bind._0;
                                  const _adv = _bind._1;
                                  const name = _M0FP46heyq026moonjs3src2vm13string__const(frame, _idx);
                                  if (_M0MP46heyq026moonjs3src5value6Object8has__own(self.globals, name)) {
                                    _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, _M0MP46heyq026moonjs3src5value6Object13get__property(self.globals, name));
                                    frame.pc = cur_pc + _adv | 0;
                                  } else {
                                    frame.pc = cur_pc + _adv | 0;
                                    const err = _M0FP46heyq026moonjs3src2vm19make__error__object("ReferenceError", `${name} is not defined`);
                                    const exc = _M0FP46heyq026moonjs3src2vm18throw__from__frame(frame, cur_pc, err);
                                    const _bind$2 = _M0FP46heyq026moonjs3src2vm20propagate__exception(frame, exc);
                                    if (_bind$2 === undefined) {
                                      return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11JSExceptionE3Err(exc);
                                    } else {
                                      const _Some = _bind$2;
                                      const _next = _Some;
                                      frame = _next;
                                    }
                                  }
                                } else {
                                  const _p$16 = 21;
                                  if (op === _p$16) {
                                    const _bind = _M0MP46heyq026moonjs3src8bytecode5Chunk18read__operand__u24(frame.chunk, cur_pc);
                                    const _idx = _bind._0;
                                    const _adv = _bind._1;
                                    const name = _M0FP46heyq026moonjs3src2vm13string__const(frame, _idx);
                                    const v = _M0FP46heyq026moonjs3src2vm11peek__stack(frame);
                                    _M0MP46heyq026moonjs3src5value6Object8set__own(self.globals, name, v);
                                    frame.pc = cur_pc + _adv | 0;
                                  } else {
                                    const _p$17 = 22;
                                    if (op === _p$17) {
                                      const _bind = _M0MP46heyq026moonjs3src8bytecode5Chunk18read__operand__u24(frame.chunk, cur_pc);
                                      const _idx = _bind._0;
                                      const _adv = _bind._1;
                                      const name = _M0FP46heyq026moonjs3src2vm13string__const(frame, _idx);
                                      if (!_M0MP46heyq026moonjs3src5value6Object8has__own(self.globals, name)) {
                                        _M0MP46heyq026moonjs3src5value6Object13add__property(self.globals, name, _M0DTP46heyq026moonjs3src5value7JSValue9Undefined__, 7);
                                      }
                                      frame.pc = cur_pc + _adv | 0;
                                    } else {
                                      const _p$18 = 23;
                                      if (op === _p$18) {
                                        const _bind = _M0MP46heyq026moonjs3src8bytecode5Chunk18read__operand__u24(frame.chunk, cur_pc);
                                        const _idx = _bind._0;
                                        const _adv = _bind._1;
                                        const name = _M0FP46heyq026moonjs3src2vm13string__const(frame, _idx);
                                        const v = _M0MP46heyq026moonjs3src5value6Object8has__own(self.globals, name) ? _M0MP46heyq026moonjs3src5value6Object13get__property(self.globals, name) : _M0DTP46heyq026moonjs3src5value7JSValue9Undefined__;
                                        _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, v);
                                        frame.pc = cur_pc + _adv | 0;
                                      } else {
                                        const _p$19 = 24;
                                        if (op === _p$19) {
                                          _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, frame.this_val);
                                          frame.pc = cur_pc + 1 | 0;
                                        } else {
                                          const _p$20 = 25;
                                          if (op === _p$20) {
                                            const v = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                            if (v.$tag === 3) {
                                              _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, v);
                                            } else {
                                              _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, new _M0DTP46heyq026moonjs3src5value7JSValue6Number(_M0FP46heyq026moonjs3src2vm10to__number(v)));
                                            }
                                            frame.pc = cur_pc + 1 | 0;
                                          } else {
                                            const _p$21 = 32;
                                            if (op === _p$21) {
                                              const b = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                              const a = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                              _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, _M0FP46heyq026moonjs3src2vm7js__add(a, b));
                                              frame.pc = cur_pc + 1 | 0;
                                            } else {
                                              const _p$22 = 33;
                                              if (op === _p$22) {
                                                const b = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                const a = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, _M0FP46heyq026moonjs3src2vm7js__sub(a, b));
                                                frame.pc = cur_pc + 1 | 0;
                                              } else {
                                                const _p$23 = 34;
                                                if (op === _p$23) {
                                                  const b = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                  const a = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                  _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, _M0FP46heyq026moonjs3src2vm7js__mul(a, b));
                                                  frame.pc = cur_pc + 1 | 0;
                                                } else {
                                                  const _p$24 = 35;
                                                  if (op === _p$24) {
                                                    const b = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                    const a = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                    _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, _M0FP46heyq026moonjs3src2vm7js__div(a, b));
                                                    frame.pc = cur_pc + 1 | 0;
                                                  } else {
                                                    const _p$25 = 36;
                                                    if (op === _p$25) {
                                                      const b = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                      const a = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                      _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, _M0FP46heyq026moonjs3src2vm7js__mod(a, b));
                                                      frame.pc = cur_pc + 1 | 0;
                                                    } else {
                                                      const _p$26 = 37;
                                                      if (op === _p$26) {
                                                        const b = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                        const a = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                        _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, _M0FP46heyq026moonjs3src2vm7js__pow(a, b));
                                                        frame.pc = cur_pc + 1 | 0;
                                                      } else {
                                                        const _p$27 = 38;
                                                        if (op === _p$27) {
                                                          const a = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                          _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, _M0FP46heyq026moonjs3src2vm7js__neg(a));
                                                          frame.pc = cur_pc + 1 | 0;
                                                        } else {
                                                          const _p$28 = 39;
                                                          if (op === _p$28) {
                                                            const a = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                            _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, _M0FP46heyq026moonjs3src2vm8js__bnot(a));
                                                            frame.pc = cur_pc + 1 | 0;
                                                          } else {
                                                            const _p$29 = 40;
                                                            if (op === _p$29) {
                                                              const b = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                              const a = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                              _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, _M0FP46heyq026moonjs3src2vm8js__band(a, b));
                                                              frame.pc = cur_pc + 1 | 0;
                                                            } else {
                                                              const _p$30 = 41;
                                                              if (op === _p$30) {
                                                                const b = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                const a = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, _M0FP46heyq026moonjs3src2vm7js__bor(a, b));
                                                                frame.pc = cur_pc + 1 | 0;
                                                              } else {
                                                                const _p$31 = 42;
                                                                if (op === _p$31) {
                                                                  const b = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                  const a = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                  _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, _M0FP46heyq026moonjs3src2vm8js__bxor(a, b));
                                                                  frame.pc = cur_pc + 1 | 0;
                                                                } else {
                                                                  const _p$32 = 43;
                                                                  if (op === _p$32) {
                                                                    const b = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                    const a = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                    _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, _M0FP46heyq026moonjs3src2vm7js__shl(a, b));
                                                                    frame.pc = cur_pc + 1 | 0;
                                                                  } else {
                                                                    const _p$33 = 44;
                                                                    if (op === _p$33) {
                                                                      const b = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                      const a = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                      _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, _M0FP46heyq026moonjs3src2vm7js__shr(a, b));
                                                                      frame.pc = cur_pc + 1 | 0;
                                                                    } else {
                                                                      const _p$34 = 45;
                                                                      if (op === _p$34) {
                                                                        const b = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                        const a = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                        _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, _M0FP46heyq026moonjs3src2vm8js__ushr(a, b));
                                                                        frame.pc = cur_pc + 1 | 0;
                                                                      } else {
                                                                        const _p$35 = 46;
                                                                        if (op === _p$35) {
                                                                          const b = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                          const a = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                          _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, new _M0DTP46heyq026moonjs3src5value7JSValue4Bool(_M0FP46heyq026moonjs3src2vm13js__loose__eq(a, b)));
                                                                          frame.pc = cur_pc + 1 | 0;
                                                                        } else {
                                                                          const _p$36 = 47;
                                                                          if (op === _p$36) {
                                                                            const b = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                            const a = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                            _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, new _M0DTP46heyq026moonjs3src5value7JSValue4Bool(!_M0FP46heyq026moonjs3src2vm13js__loose__eq(a, b)));
                                                                            frame.pc = cur_pc + 1 | 0;
                                                                          } else {
                                                                            const _p$37 = 48;
                                                                            if (op === _p$37) {
                                                                              const b = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                              const a = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                              _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, new _M0DTP46heyq026moonjs3src5value7JSValue4Bool(_M0FP46heyq026moonjs3src2vm14js__strict__eq(a, b)));
                                                                              frame.pc = cur_pc + 1 | 0;
                                                                            } else {
                                                                              const _p$38 = 49;
                                                                              if (op === _p$38) {
                                                                                const b = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                                const a = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                                _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, new _M0DTP46heyq026moonjs3src5value7JSValue4Bool(!_M0FP46heyq026moonjs3src2vm14js__strict__eq(a, b)));
                                                                                frame.pc = cur_pc + 1 | 0;
                                                                              } else {
                                                                                const _p$39 = 50;
                                                                                if (op === _p$39) {
                                                                                  const b = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                                  const a = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                                  _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, new _M0DTP46heyq026moonjs3src5value7JSValue4Bool(_M0FP46heyq026moonjs3src2vm6js__lt(a, b)));
                                                                                  frame.pc = cur_pc + 1 | 0;
                                                                                } else {
                                                                                  const _p$40 = 51;
                                                                                  if (op === _p$40) {
                                                                                    const b = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                                    const a = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                                    _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, new _M0DTP46heyq026moonjs3src5value7JSValue4Bool(_M0FP46heyq026moonjs3src2vm6js__le(a, b)));
                                                                                    frame.pc = cur_pc + 1 | 0;
                                                                                  } else {
                                                                                    const _p$41 = 52;
                                                                                    if (op === _p$41) {
                                                                                      const b = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                                      const a = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                                      _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, new _M0DTP46heyq026moonjs3src5value7JSValue4Bool(_M0FP46heyq026moonjs3src2vm6js__gt(a, b)));
                                                                                      frame.pc = cur_pc + 1 | 0;
                                                                                    } else {
                                                                                      const _p$42 = 53;
                                                                                      if (op === _p$42) {
                                                                                        const b = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                                        const a = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                                        _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, new _M0DTP46heyq026moonjs3src5value7JSValue4Bool(_M0FP46heyq026moonjs3src2vm6js__ge(a, b)));
                                                                                        frame.pc = cur_pc + 1 | 0;
                                                                                      } else {
                                                                                        const _p$43 = 54;
                                                                                        if (op === _p$43) {
                                                                                          const a = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                                          _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, new _M0DTP46heyq026moonjs3src5value7JSValue4Bool(!_M0FP46heyq026moonjs3src2vm11to__boolean(a)));
                                                                                          frame.pc = cur_pc + 1 | 0;
                                                                                        } else {
                                                                                          const _p$44 = 55;
                                                                                          if (op === _p$44) {
                                                                                            const a = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                                            _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, new _M0DTP46heyq026moonjs3src5value7JSValue3Str(_M0FP46heyq026moonjs3src2vm14typeof__string(a)));
                                                                                            frame.pc = cur_pc + 1 | 0;
                                                                                          } else {
                                                                                            const _p$45 = 56;
                                                                                            if (op === _p$45) {
                                                                                              const ctor_val = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                                              const obj_val = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                                              frame.pc = cur_pc + 1 | 0;
                                                                                              const _bind = _M0FP46heyq026moonjs3src2vm17instanceof__check(obj_val, ctor_val);
                                                                                              if (_bind.$tag === 1) {
                                                                                                const _Ok = _bind;
                                                                                                const _b = _Ok._0;
                                                                                                _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, new _M0DTP46heyq026moonjs3src5value7JSValue4Bool(_b));
                                                                                              } else {
                                                                                                const _Err = _bind;
                                                                                                const _msg = _Err._0;
                                                                                                const err = _M0FP46heyq026moonjs3src2vm19make__error__object("TypeError", _msg);
                                                                                                const exc = _M0FP46heyq026moonjs3src2vm18throw__from__frame(frame, cur_pc, err);
                                                                                                const _bind$2 = _M0FP46heyq026moonjs3src2vm20propagate__exception(frame, exc);
                                                                                                if (_bind$2 === undefined) {
                                                                                                  return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11JSExceptionE3Err(exc);
                                                                                                } else {
                                                                                                  const _Some = _bind$2;
                                                                                                  const _next = _Some;
                                                                                                  frame = _next;
                                                                                                }
                                                                                              }
                                                                                            } else {
                                                                                              const _p$46 = 57;
                                                                                              if (op === _p$46) {
                                                                                                const obj_val = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                                                const key_val = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                                                frame.pc = cur_pc + 1 | 0;
                                                                                                if (obj_val.$tag === 6) {
                                                                                                  const _Object = obj_val;
                                                                                                  const _obj = _Object._0;
                                                                                                  const key = _M0FP46heyq026moonjs3src2vm10to__string(key_val);
                                                                                                  _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, new _M0DTP46heyq026moonjs3src5value7JSValue4Bool(_M0MP46heyq026moonjs3src5value6Object13has__property(_obj, key)));
                                                                                                } else {
                                                                                                  const err = _M0FP46heyq026moonjs3src2vm19make__error__object("TypeError", "Cannot use 'in' operator to search in non-object");
                                                                                                  const exc = _M0FP46heyq026moonjs3src2vm18throw__from__frame(frame, cur_pc, err);
                                                                                                  const _bind = _M0FP46heyq026moonjs3src2vm20propagate__exception(frame, exc);
                                                                                                  if (_bind === undefined) {
                                                                                                    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11JSExceptionE3Err(exc);
                                                                                                  } else {
                                                                                                    const _Some = _bind;
                                                                                                    const _next = _Some;
                                                                                                    frame = _next;
                                                                                                  }
                                                                                                }
                                                                                              } else {
                                                                                                const _p$47 = 64;
                                                                                                if (op === _p$47) {
                                                                                                  const obj = _M0MP46heyq026moonjs3src5value6Object3new(_M0MP46heyq026moonjs3src5value5Shape3new(), _M0MP46heyq026moonjs3src2vm6Engine23object__proto__or__null(self));
                                                                                                  _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, new _M0DTP46heyq026moonjs3src5value7JSValue6Object(obj));
                                                                                                  frame.pc = cur_pc + 1 | 0;
                                                                                                } else {
                                                                                                  const _p$48 = 65;
                                                                                                  if (op === _p$48) {
                                                                                                    const _bind = _M0MP46heyq026moonjs3src8bytecode5Chunk18read__operand__u24(frame.chunk, cur_pc);
                                                                                                    const _idx = _bind._0;
                                                                                                    const _adv = _bind._1;
                                                                                                    const name = _M0FP46heyq026moonjs3src2vm13string__const(frame, _idx);
                                                                                                    const val = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                                                    const obj_v = _M0FP46heyq026moonjs3src2vm11peek__stack(frame);
                                                                                                    if (obj_v.$tag === 6) {
                                                                                                      const _Object = obj_v;
                                                                                                      const _obj = _Object._0;
                                                                                                      if (_M0MP46heyq026moonjs3src5value6Object8has__own(_obj, name)) {
                                                                                                        _M0MP46heyq026moonjs3src5value6Object8set__own(_obj, name, val);
                                                                                                      } else {
                                                                                                        _M0MP46heyq026moonjs3src5value6Object13add__property(_obj, name, val, 7);
                                                                                                      }
                                                                                                    } else {
                                                                                                      `VM: DEFINE_PROP on non-Object at pc=${_M0MPC13int3Int18to__string_2einner(cur_pc, 10)}`;
                                                                                                      $panic();
                                                                                                    }
                                                                                                    frame.pc = cur_pc + _adv | 0;
                                                                                                  } else {
                                                                                                    const _p$49 = 66;
                                                                                                    if (op === _p$49) {
                                                                                                      const _bind = _M0MP46heyq026moonjs3src8bytecode5Chunk18read__operand__u24(frame.chunk, cur_pc);
                                                                                                      const _idx = _bind._0;
                                                                                                      const _adv = _bind._1;
                                                                                                      const name = _M0FP46heyq026moonjs3src2vm13string__const(frame, _idx);
                                                                                                      const obj_v = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                                                      frame.pc = cur_pc + _adv | 0;
                                                                                                      const _bind$2 = _M0FP46heyq026moonjs3src2vm20get__property__value(obj_v, name);
                                                                                                      if (_bind$2.$tag === 1) {
                                                                                                        const _Ok = _bind$2;
                                                                                                        const _v = _Ok._0;
                                                                                                        _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, _v);
                                                                                                      } else {
                                                                                                        const _Err = _bind$2;
                                                                                                        const _msg = _Err._0;
                                                                                                        const err = _M0FP46heyq026moonjs3src2vm19make__error__object("TypeError", _msg);
                                                                                                        const exc = _M0FP46heyq026moonjs3src2vm18throw__from__frame(frame, cur_pc, err);
                                                                                                        const _bind$3 = _M0FP46heyq026moonjs3src2vm20propagate__exception(frame, exc);
                                                                                                        if (_bind$3 === undefined) {
                                                                                                          return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11JSExceptionE3Err(exc);
                                                                                                        } else {
                                                                                                          const _Some = _bind$3;
                                                                                                          const _next = _Some;
                                                                                                          frame = _next;
                                                                                                        }
                                                                                                      }
                                                                                                    } else {
                                                                                                      const _p$50 = 67;
                                                                                                      if (op === _p$50) {
                                                                                                        const _bind = _M0MP46heyq026moonjs3src8bytecode5Chunk18read__operand__u24(frame.chunk, cur_pc);
                                                                                                        const _idx = _bind._0;
                                                                                                        const _adv = _bind._1;
                                                                                                        const name = _M0FP46heyq026moonjs3src2vm13string__const(frame, _idx);
                                                                                                        const val = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                                                        const obj_v = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                                                        frame.pc = cur_pc + _adv | 0;
                                                                                                        _L$2: {
                                                                                                          _L$3: {
                                                                                                            switch (obj_v.$tag) {
                                                                                                              case 6: {
                                                                                                                const _Object = obj_v;
                                                                                                                const _obj = _Object._0;
                                                                                                                _M0MP46heyq026moonjs3src5value6Object8set__own(_obj, name, val);
                                                                                                                break;
                                                                                                              }
                                                                                                              case 1: {
                                                                                                                break _L$3;
                                                                                                              }
                                                                                                              case 0: {
                                                                                                                break _L$3;
                                                                                                              }
                                                                                                            }
                                                                                                            break _L$2;
                                                                                                          }
                                                                                                          let _tmp$2;
                                                                                                          if (obj_v.$tag === 1) {
                                                                                                            _tmp$2 = "null";
                                                                                                          } else {
                                                                                                            _tmp$2 = "undefined";
                                                                                                          }
                                                                                                          const err = _M0FP46heyq026moonjs3src2vm19make__error__object("TypeError", `Cannot set property '${name}' of ${_tmp$2}`);
                                                                                                          const exc = _M0FP46heyq026moonjs3src2vm18throw__from__frame(frame, cur_pc, err);
                                                                                                          const _bind$2 = _M0FP46heyq026moonjs3src2vm20propagate__exception(frame, exc);
                                                                                                          if (_bind$2 === undefined) {
                                                                                                            return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11JSExceptionE3Err(exc);
                                                                                                          } else {
                                                                                                            const _Some = _bind$2;
                                                                                                            const _next = _Some;
                                                                                                            frame = _next;
                                                                                                            continue;
                                                                                                          }
                                                                                                        }
                                                                                                        _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, val);
                                                                                                      } else {
                                                                                                        const _p$51 = 68;
                                                                                                        if (op === _p$51) {
                                                                                                          const key = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                                                          const obj_v = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                                                          frame.pc = cur_pc + 1 | 0;
                                                                                                          const key_str = _M0FP46heyq026moonjs3src2vm10to__string(key);
                                                                                                          const _bind = _M0FP46heyq026moonjs3src2vm19get__element__value(obj_v, key, key_str);
                                                                                                          if (_bind.$tag === 1) {
                                                                                                            const _Ok = _bind;
                                                                                                            const _v = _Ok._0;
                                                                                                            _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, _v);
                                                                                                          } else {
                                                                                                            const _Err = _bind;
                                                                                                            const _msg = _Err._0;
                                                                                                            const err = _M0FP46heyq026moonjs3src2vm19make__error__object("TypeError", _msg);
                                                                                                            const exc = _M0FP46heyq026moonjs3src2vm18throw__from__frame(frame, cur_pc, err);
                                                                                                            const _bind$2 = _M0FP46heyq026moonjs3src2vm20propagate__exception(frame, exc);
                                                                                                            if (_bind$2 === undefined) {
                                                                                                              return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11JSExceptionE3Err(exc);
                                                                                                            } else {
                                                                                                              const _Some = _bind$2;
                                                                                                              const _next = _Some;
                                                                                                              frame = _next;
                                                                                                            }
                                                                                                          }
                                                                                                        } else {
                                                                                                          const _p$52 = 69;
                                                                                                          if (op === _p$52) {
                                                                                                            const val = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                                                            const key = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                                                            const obj_v = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                                                            frame.pc = cur_pc + 1 | 0;
                                                                                                            _L$2: {
                                                                                                              _L$3: {
                                                                                                                switch (obj_v.$tag) {
                                                                                                                  case 6: {
                                                                                                                    const _Object = obj_v;
                                                                                                                    const _obj = _Object._0;
                                                                                                                    const key_str = _M0FP46heyq026moonjs3src2vm10to__string(key);
                                                                                                                    _M0MP46heyq026moonjs3src5value6Object8set__own(_obj, key_str, val);
                                                                                                                    break;
                                                                                                                  }
                                                                                                                  case 1: {
                                                                                                                    break _L$3;
                                                                                                                  }
                                                                                                                  case 0: {
                                                                                                                    break _L$3;
                                                                                                                  }
                                                                                                                }
                                                                                                                break _L$2;
                                                                                                              }
                                                                                                              const err = _M0FP46heyq026moonjs3src2vm19make__error__object("TypeError", "Cannot set property of null / undefined");
                                                                                                              const exc = _M0FP46heyq026moonjs3src2vm18throw__from__frame(frame, cur_pc, err);
                                                                                                              const _bind = _M0FP46heyq026moonjs3src2vm20propagate__exception(frame, exc);
                                                                                                              if (_bind === undefined) {
                                                                                                                return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11JSExceptionE3Err(exc);
                                                                                                              } else {
                                                                                                                const _Some = _bind;
                                                                                                                const _next = _Some;
                                                                                                                frame = _next;
                                                                                                                continue;
                                                                                                              }
                                                                                                            }
                                                                                                            _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, val);
                                                                                                          } else {
                                                                                                            const _p$53 = 70;
                                                                                                            if (op === _p$53) {
                                                                                                              const _bind = _M0MP46heyq026moonjs3src8bytecode5Chunk18read__operand__u24(frame.chunk, cur_pc);
                                                                                                              const _idx = _bind._0;
                                                                                                              const _adv = _bind._1;
                                                                                                              const name = _M0FP46heyq026moonjs3src2vm13string__const(frame, _idx);
                                                                                                              const obj_v = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                                                              frame.pc = cur_pc + _adv | 0;
                                                                                                              if (obj_v.$tag === 6) {
                                                                                                                const _Object = obj_v;
                                                                                                                const _obj = _Object._0;
                                                                                                                _M0FP46heyq026moonjs3src2vm11delete__own(_obj, name);
                                                                                                                _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, _M0MP46heyq026moonjs3src2vm6Engine14execute__frameN6constrS1403);
                                                                                                              } else {
                                                                                                                _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, _M0MP46heyq026moonjs3src2vm6Engine14execute__frameN6constrS1404);
                                                                                                              }
                                                                                                            } else {
                                                                                                              const _p$54 = 71;
                                                                                                              if (op === _p$54) {
                                                                                                                const key = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                                                                const obj_v = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                                                                frame.pc = cur_pc + 1 | 0;
                                                                                                                if (obj_v.$tag === 6) {
                                                                                                                  const _Object = obj_v;
                                                                                                                  const _obj = _Object._0;
                                                                                                                  _M0FP46heyq026moonjs3src2vm11delete__own(_obj, _M0FP46heyq026moonjs3src2vm10to__string(key));
                                                                                                                  _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, _M0MP46heyq026moonjs3src2vm6Engine14execute__frameN6constrS1405);
                                                                                                                } else {
                                                                                                                  _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, _M0MP46heyq026moonjs3src2vm6Engine14execute__frameN6constrS1406);
                                                                                                                }
                                                                                                              } else {
                                                                                                                const _p$55 = 72;
                                                                                                                if (op === _p$55) {
                                                                                                                  const _bind = _M0MP46heyq026moonjs3src8bytecode5Chunk18read__operand__u24(frame.chunk, cur_pc);
                                                                                                                  const _adv = _bind._1;
                                                                                                                  const obj = _M0MP46heyq026moonjs3src5value6Object3new(_M0MP46heyq026moonjs3src5value5Shape3new(), _M0MP46heyq026moonjs3src2vm6Engine22array__proto__or__null(self));
                                                                                                                  _M0MP46heyq026moonjs3src5value6Object13add__property(obj, "length", _M0MP46heyq026moonjs3src2vm6Engine14execute__frameN6constrS1407, 7);
                                                                                                                  _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, new _M0DTP46heyq026moonjs3src5value7JSValue6Object(obj));
                                                                                                                  frame.pc = cur_pc + _adv | 0;
                                                                                                                } else {
                                                                                                                  const _p$56 = 73;
                                                                                                                  if (op === _p$56) {
                                                                                                                    const val = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                                                                    const arr_v = _M0FP46heyq026moonjs3src2vm11peek__stack(frame);
                                                                                                                    frame.pc = cur_pc + 1 | 0;
                                                                                                                    if (arr_v.$tag === 6) {
                                                                                                                      const _Object = arr_v;
                                                                                                                      const _arr = _Object._0;
                                                                                                                      const len_v = _M0MP46heyq026moonjs3src5value6Object13get__property(_arr, "length");
                                                                                                                      let len;
                                                                                                                      switch (len_v.$tag) {
                                                                                                                        case 3: {
                                                                                                                          const _Int32 = len_v;
                                                                                                                          len = _Int32._0;
                                                                                                                          break;
                                                                                                                        }
                                                                                                                        case 4: {
                                                                                                                          const _Number = len_v;
                                                                                                                          const _d = _Number._0;
                                                                                                                          len = _M0MPC16double6Double7to__int(_d);
                                                                                                                          break;
                                                                                                                        }
                                                                                                                        default: {
                                                                                                                          len = 0;
                                                                                                                        }
                                                                                                                      }
                                                                                                                      _M0MP46heyq026moonjs3src5value6Object8set__own(_arr, _M0MPC13int3Int18to__string_2einner(len, 10), val);
                                                                                                                      _M0MP46heyq026moonjs3src5value6Object8set__own(_arr, "length", new _M0DTP46heyq026moonjs3src5value7JSValue5Int32(len + 1 | 0));
                                                                                                                    } else {
                                                                                                                      `VM: ARRAY_PUSH on non-Object at pc=${_M0MPC13int3Int18to__string_2einner(cur_pc, 10)}`;
                                                                                                                      $panic();
                                                                                                                    }
                                                                                                                  } else {
                                                                                                                    const _p$57 = 80;
                                                                                                                    if (op === _p$57) {
                                                                                                                      const _bind = _M0MP46heyq026moonjs3src8bytecode5Chunk18read__operand__u24(frame.chunk, cur_pc);
                                                                                                                      const _idx = _bind._0;
                                                                                                                      const _adv = _bind._1;
                                                                                                                      const i = _idx;
                                                                                                                      if (i < 0 || i >= frame.chunk.nested_chunks.length) {
                                                                                                                        `VM: NEW_CLOSURE nested index ${_M0MPC13int3Int18to__string_2einner(i, 10)} out of range in ${frame.chunk.name}`;
                                                                                                                        $panic();
                                                                                                                      }
                                                                                                                      const nested = _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(frame.chunk.nested_chunks, i);
                                                                                                                      const child_id = _M0MP46heyq026moonjs3src2vm6Engine15register__chunk(self, nested);
                                                                                                                      const upvalues = [];
                                                                                                                      const _bind$2 = nested.upvalue_slots.length;
                                                                                                                      let _tmp$2 = 0;
                                                                                                                      while (true) {
                                                                                                                        const slot_i = _tmp$2;
                                                                                                                        if (slot_i < _bind$2) {
                                                                                                                          const decl = _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(nested.upvalue_slots, slot_i);
                                                                                                                          const _bind$3 = decl.from_kind;
                                                                                                                          if (_bind$3 === 0) {
                                                                                                                            _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(upvalues, _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(frame.locals, decl.from_idx));
                                                                                                                          } else {
                                                                                                                            _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(upvalues, _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(frame.upvalues, decl.from_idx));
                                                                                                                          }
                                                                                                                          _tmp$2 = slot_i + 1 | 0;
                                                                                                                          continue;
                                                                                                                        } else {
                                                                                                                          break;
                                                                                                                        }
                                                                                                                      }
                                                                                                                      const fn_value = _M0MP46heyq026moonjs3src5value8Function3new(child_id, upvalues, nested.name, true);
                                                                                                                      const fn_proto = _M0MP46heyq026moonjs3src5value6Object3new(_M0MP46heyq026moonjs3src5value5Shape3new(), _M0MP46heyq026moonjs3src2vm6Engine23object__proto__or__null(self));
                                                                                                                      _M0MP46heyq026moonjs3src5value6Object13add__property(fn_proto, "constructor", new _M0DTP46heyq026moonjs3src5value7JSValue8Function(fn_value), 7);
                                                                                                                      _M0MP46heyq026moonjs3src5value8Function14set__prototype(fn_value, new _M0DTP46heyq026moonjs3src5value7JSValue6Object(fn_proto));
                                                                                                                      _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, new _M0DTP46heyq026moonjs3src5value7JSValue8Function(fn_value));
                                                                                                                      frame.pc = cur_pc + _adv | 0;
                                                                                                                    } else {
                                                                                                                      const _p$58 = 81;
                                                                                                                      if (op === _p$58) {
                                                                                                                        const _bind = _M0MP46heyq026moonjs3src8bytecode5Chunk18read__operand__u24(frame.chunk, cur_pc);
                                                                                                                        const _argc_u = _bind._0;
                                                                                                                        const _adv = _bind._1;
                                                                                                                        const argc = _argc_u;
                                                                                                                        const n = frame.operand_stack.length;
                                                                                                                        if (n < (argc + 1 | 0)) {
                                                                                                                          `VM: CALL insufficient operands at pc=${_M0MPC13int3Int18to__string_2einner(cur_pc, 10)} (argc=${_M0MPC13int3Int18to__string_2einner(argc, 10)}, stack=${_M0MPC13int3Int18to__string_2einner(n, 10)})`;
                                                                                                                          $panic();
                                                                                                                        }
                                                                                                                        const args = [];
                                                                                                                        let _tmp$2 = 0;
                                                                                                                        while (true) {
                                                                                                                          const ai = _tmp$2;
                                                                                                                          if (ai < argc) {
                                                                                                                            _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(args, _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, (n - argc | 0) + ai | 0));
                                                                                                                            _tmp$2 = ai + 1 | 0;
                                                                                                                            continue;
                                                                                                                          } else {
                                                                                                                            break;
                                                                                                                          }
                                                                                                                        }
                                                                                                                        let _tmp$3 = 0;
                                                                                                                        while (true) {
                                                                                                                          const _ = _tmp$3;
                                                                                                                          if (_ < argc) {
                                                                                                                            _M0MPC15array5Array3popGRP46heyq026moonjs3src8compiler16FunctionCompilerE(frame.operand_stack);
                                                                                                                            _tmp$3 = _ + 1 | 0;
                                                                                                                            continue;
                                                                                                                          } else {
                                                                                                                            break;
                                                                                                                          }
                                                                                                                        }
                                                                                                                        const callee = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                                                                        frame.pc = cur_pc + _adv | 0;
                                                                                                                        switch (callee.$tag) {
                                                                                                                          case 7: {
                                                                                                                            const _Function = callee;
                                                                                                                            const _func = _Function._0;
                                                                                                                            const chunk = _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(self.chunk_registry, _func.chunk_id);
                                                                                                                            const new_frame = _M0MP46heyq026moonjs3src2vm5Frame14new__for__call(chunk, _M0DTP46heyq026moonjs3src5value7JSValue9Undefined__, args, _func, frame);
                                                                                                                            frame = new_frame;
                                                                                                                            break;
                                                                                                                          }
                                                                                                                          case 8: {
                                                                                                                            const _NativeFn = callee;
                                                                                                                            const _nf = _NativeFn._0;
                                                                                                                            const _bind$2 = _M0MP46heyq026moonjs3src5value14NativeFunction4call(_nf, _M0DTP46heyq026moonjs3src5value7JSValue9Undefined__, args);
                                                                                                                            if (_bind$2.$tag === 1) {
                                                                                                                              const _Ok = _bind$2;
                                                                                                                              const _v = _Ok._0;
                                                                                                                              _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, _v);
                                                                                                                            } else {
                                                                                                                              const _Err = _bind$2;
                                                                                                                              const _nerr = _Err._0;
                                                                                                                              const err = _M0MP46heyq026moonjs3src2vm6Engine25make__error__from__native(self, _nerr);
                                                                                                                              const exc = _M0FP46heyq026moonjs3src2vm18throw__from__frame(frame, cur_pc, err);
                                                                                                                              const _bind$3 = _M0FP46heyq026moonjs3src2vm20propagate__exception(frame, exc);
                                                                                                                              if (_bind$3 === undefined) {
                                                                                                                                return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11JSExceptionE3Err(exc);
                                                                                                                              } else {
                                                                                                                                const _Some = _bind$3;
                                                                                                                                const _next = _Some;
                                                                                                                                frame = _next;
                                                                                                                              }
                                                                                                                            }
                                                                                                                            break;
                                                                                                                          }
                                                                                                                          default: {
                                                                                                                            const err = _M0FP46heyq026moonjs3src2vm19make__error__object("TypeError", `${_M0FP46heyq026moonjs3src2vm22describe__call__target(callee)} is not a function`);
                                                                                                                            const exc = _M0FP46heyq026moonjs3src2vm18throw__from__frame(frame, cur_pc, err);
                                                                                                                            const _bind$3 = _M0FP46heyq026moonjs3src2vm20propagate__exception(frame, exc);
                                                                                                                            if (_bind$3 === undefined) {
                                                                                                                              return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11JSExceptionE3Err(exc);
                                                                                                                            } else {
                                                                                                                              const _Some = _bind$3;
                                                                                                                              const _next = _Some;
                                                                                                                              frame = _next;
                                                                                                                            }
                                                                                                                          }
                                                                                                                        }
                                                                                                                      } else {
                                                                                                                        const _p$59 = 82;
                                                                                                                        if (op === _p$59) {
                                                                                                                          const _bind = _M0MP46heyq026moonjs3src8bytecode5Chunk18read__operand__u24(frame.chunk, cur_pc);
                                                                                                                          const _argc_u = _bind._0;
                                                                                                                          const _adv = _bind._1;
                                                                                                                          const argc = _argc_u;
                                                                                                                          const n = frame.operand_stack.length;
                                                                                                                          if (n < (argc + 2 | 0)) {
                                                                                                                            `VM: CALL_METHOD insufficient operands at pc=${_M0MPC13int3Int18to__string_2einner(cur_pc, 10)}`;
                                                                                                                            $panic();
                                                                                                                          }
                                                                                                                          const args = [];
                                                                                                                          let _tmp$2 = 0;
                                                                                                                          while (true) {
                                                                                                                            const ai = _tmp$2;
                                                                                                                            if (ai < argc) {
                                                                                                                              _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(args, _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, (n - argc | 0) + ai | 0));
                                                                                                                              _tmp$2 = ai + 1 | 0;
                                                                                                                              continue;
                                                                                                                            } else {
                                                                                                                              break;
                                                                                                                            }
                                                                                                                          }
                                                                                                                          let _tmp$3 = 0;
                                                                                                                          while (true) {
                                                                                                                            const _ = _tmp$3;
                                                                                                                            if (_ < argc) {
                                                                                                                              _M0MPC15array5Array3popGRP46heyq026moonjs3src8compiler16FunctionCompilerE(frame.operand_stack);
                                                                                                                              _tmp$3 = _ + 1 | 0;
                                                                                                                              continue;
                                                                                                                            } else {
                                                                                                                              break;
                                                                                                                            }
                                                                                                                          }
                                                                                                                          const callee = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                                                                          const this_val = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                                                                          frame.pc = cur_pc + _adv | 0;
                                                                                                                          switch (callee.$tag) {
                                                                                                                            case 7: {
                                                                                                                              const _Function = callee;
                                                                                                                              const _func = _Function._0;
                                                                                                                              const chunk = _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(self.chunk_registry, _func.chunk_id);
                                                                                                                              const new_frame = _M0MP46heyq026moonjs3src2vm5Frame14new__for__call(chunk, this_val, args, _func, frame);
                                                                                                                              frame = new_frame;
                                                                                                                              break;
                                                                                                                            }
                                                                                                                            case 8: {
                                                                                                                              const _NativeFn = callee;
                                                                                                                              const _nf = _NativeFn._0;
                                                                                                                              const _bind$2 = _M0MP46heyq026moonjs3src5value14NativeFunction4call(_nf, this_val, args);
                                                                                                                              if (_bind$2.$tag === 1) {
                                                                                                                                const _Ok = _bind$2;
                                                                                                                                const _v = _Ok._0;
                                                                                                                                _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, _v);
                                                                                                                              } else {
                                                                                                                                const _Err = _bind$2;
                                                                                                                                const _nerr = _Err._0;
                                                                                                                                const err = _M0MP46heyq026moonjs3src2vm6Engine25make__error__from__native(self, _nerr);
                                                                                                                                const exc = _M0FP46heyq026moonjs3src2vm18throw__from__frame(frame, cur_pc, err);
                                                                                                                                const _bind$3 = _M0FP46heyq026moonjs3src2vm20propagate__exception(frame, exc);
                                                                                                                                if (_bind$3 === undefined) {
                                                                                                                                  return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11JSExceptionE3Err(exc);
                                                                                                                                } else {
                                                                                                                                  const _Some = _bind$3;
                                                                                                                                  const _next = _Some;
                                                                                                                                  frame = _next;
                                                                                                                                }
                                                                                                                              }
                                                                                                                              break;
                                                                                                                            }
                                                                                                                            default: {
                                                                                                                              const err = _M0FP46heyq026moonjs3src2vm19make__error__object("TypeError", `${_M0FP46heyq026moonjs3src2vm22describe__call__target(callee)} is not a function`);
                                                                                                                              const exc = _M0FP46heyq026moonjs3src2vm18throw__from__frame(frame, cur_pc, err);
                                                                                                                              const _bind$3 = _M0FP46heyq026moonjs3src2vm20propagate__exception(frame, exc);
                                                                                                                              if (_bind$3 === undefined) {
                                                                                                                                return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11JSExceptionE3Err(exc);
                                                                                                                              } else {
                                                                                                                                const _Some = _bind$3;
                                                                                                                                const _next = _Some;
                                                                                                                                frame = _next;
                                                                                                                              }
                                                                                                                            }
                                                                                                                          }
                                                                                                                        } else {
                                                                                                                          const _p$60 = 83;
                                                                                                                          if (op === _p$60) {
                                                                                                                            const _bind = _M0MP46heyq026moonjs3src8bytecode5Chunk18read__operand__u24(frame.chunk, cur_pc);
                                                                                                                            const _argc_u = _bind._0;
                                                                                                                            const _adv = _bind._1;
                                                                                                                            const argc = _argc_u;
                                                                                                                            const n = frame.operand_stack.length;
                                                                                                                            if (n < (argc + 1 | 0)) {
                                                                                                                              `VM: CONSTRUCT insufficient operands at pc=${_M0MPC13int3Int18to__string_2einner(cur_pc, 10)}`;
                                                                                                                              $panic();
                                                                                                                            }
                                                                                                                            const args = [];
                                                                                                                            let _tmp$2 = 0;
                                                                                                                            while (true) {
                                                                                                                              const ai = _tmp$2;
                                                                                                                              if (ai < argc) {
                                                                                                                                _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(args, _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, (n - argc | 0) + ai | 0));
                                                                                                                                _tmp$2 = ai + 1 | 0;
                                                                                                                                continue;
                                                                                                                              } else {
                                                                                                                                break;
                                                                                                                              }
                                                                                                                            }
                                                                                                                            let _tmp$3 = 0;
                                                                                                                            while (true) {
                                                                                                                              const _ = _tmp$3;
                                                                                                                              if (_ < argc) {
                                                                                                                                _M0MPC15array5Array3popGRP46heyq026moonjs3src8compiler16FunctionCompilerE(frame.operand_stack);
                                                                                                                                _tmp$3 = _ + 1 | 0;
                                                                                                                                continue;
                                                                                                                              } else {
                                                                                                                                break;
                                                                                                                              }
                                                                                                                            }
                                                                                                                            const callee = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                                                                            frame.pc = cur_pc + _adv | 0;
                                                                                                                            switch (callee.$tag) {
                                                                                                                              case 7: {
                                                                                                                                const _Function = callee;
                                                                                                                                const _func = _Function._0;
                                                                                                                                if (!_func.is_constructor) {
                                                                                                                                  const err = _M0FP46heyq026moonjs3src2vm19make__error__object("TypeError", `${_func.name} is not a constructor`);
                                                                                                                                  const exc = _M0FP46heyq026moonjs3src2vm18throw__from__frame(frame, cur_pc, err);
                                                                                                                                  const _bind$2 = _M0FP46heyq026moonjs3src2vm20propagate__exception(frame, exc);
                                                                                                                                  if (_bind$2 === undefined) {
                                                                                                                                    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11JSExceptionE3Err(exc);
                                                                                                                                  } else {
                                                                                                                                    const _Some = _bind$2;
                                                                                                                                    const _next = _Some;
                                                                                                                                    frame = _next;
                                                                                                                                    continue _L;
                                                                                                                                  }
                                                                                                                                }
                                                                                                                                const _bind$2 = _func.prototype;
                                                                                                                                let proto;
                                                                                                                                if (_bind$2.$tag === 6) {
                                                                                                                                  proto = _func.prototype;
                                                                                                                                } else {
                                                                                                                                  proto = _M0MP46heyq026moonjs3src2vm6Engine23object__proto__or__null(self);
                                                                                                                                }
                                                                                                                                const new_obj = _M0MP46heyq026moonjs3src5value6Object3new(_M0MP46heyq026moonjs3src5value5Shape3new(), proto);
                                                                                                                                const this_val = new _M0DTP46heyq026moonjs3src5value7JSValue6Object(new_obj);
                                                                                                                                const chunk = _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(self.chunk_registry, _func.chunk_id);
                                                                                                                                const new_frame = _M0MP46heyq026moonjs3src2vm5Frame14new__for__call(chunk, this_val, args, _func, frame);
                                                                                                                                frame = new_frame;
                                                                                                                                break;
                                                                                                                              }
                                                                                                                              case 8: {
                                                                                                                                const _NativeFn = callee;
                                                                                                                                const _nf = _NativeFn._0;
                                                                                                                                if (!_nf.is_constructor) {
                                                                                                                                  const err = _M0FP46heyq026moonjs3src2vm19make__error__object("TypeError", `${_nf.name} is not a constructor`);
                                                                                                                                  const exc = _M0FP46heyq026moonjs3src2vm18throw__from__frame(frame, cur_pc, err);
                                                                                                                                  const _bind$3 = _M0FP46heyq026moonjs3src2vm20propagate__exception(frame, exc);
                                                                                                                                  if (_bind$3 === undefined) {
                                                                                                                                    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11JSExceptionE3Err(exc);
                                                                                                                                  } else {
                                                                                                                                    const _Some = _bind$3;
                                                                                                                                    const _next = _Some;
                                                                                                                                    frame = _next;
                                                                                                                                    continue _L;
                                                                                                                                  }
                                                                                                                                }
                                                                                                                                const _bind$3 = _nf.prototype;
                                                                                                                                let proto$2;
                                                                                                                                if (_bind$3.$tag === 6) {
                                                                                                                                  proto$2 = _nf.prototype;
                                                                                                                                } else {
                                                                                                                                  proto$2 = _M0MP46heyq026moonjs3src2vm6Engine23object__proto__or__null(self);
                                                                                                                                }
                                                                                                                                const new_obj$2 = _M0MP46heyq026moonjs3src5value6Object3new(_M0MP46heyq026moonjs3src5value5Shape3new(), proto$2);
                                                                                                                                const this_val$2 = new _M0DTP46heyq026moonjs3src5value7JSValue6Object(new_obj$2);
                                                                                                                                const _bind$4 = _M0MP46heyq026moonjs3src5value14NativeFunction4call(_nf, this_val$2, args);
                                                                                                                                if (_bind$4.$tag === 1) {
                                                                                                                                  const _Ok = _bind$4;
                                                                                                                                  const _ret = _Ok._0;
                                                                                                                                  let final_ret;
                                                                                                                                  _L$2: {
                                                                                                                                    _L$3: {
                                                                                                                                      switch (_ret.$tag) {
                                                                                                                                        case 6: {
                                                                                                                                          break _L$3;
                                                                                                                                        }
                                                                                                                                        case 7: {
                                                                                                                                          break _L$3;
                                                                                                                                        }
                                                                                                                                        case 8: {
                                                                                                                                          break _L$3;
                                                                                                                                        }
                                                                                                                                        default: {
                                                                                                                                          final_ret = this_val$2;
                                                                                                                                        }
                                                                                                                                      }
                                                                                                                                      break _L$2;
                                                                                                                                    }
                                                                                                                                    final_ret = _ret;
                                                                                                                                  }
                                                                                                                                  _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.operand_stack, final_ret);
                                                                                                                                } else {
                                                                                                                                  const _Err = _bind$4;
                                                                                                                                  const _nerr = _Err._0;
                                                                                                                                  const err = _M0MP46heyq026moonjs3src2vm6Engine25make__error__from__native(self, _nerr);
                                                                                                                                  const exc = _M0FP46heyq026moonjs3src2vm18throw__from__frame(frame, cur_pc, err);
                                                                                                                                  const _bind$5 = _M0FP46heyq026moonjs3src2vm20propagate__exception(frame, exc);
                                                                                                                                  if (_bind$5 === undefined) {
                                                                                                                                    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11JSExceptionE3Err(exc);
                                                                                                                                  } else {
                                                                                                                                    const _Some = _bind$5;
                                                                                                                                    const _next = _Some;
                                                                                                                                    frame = _next;
                                                                                                                                  }
                                                                                                                                }
                                                                                                                                break;
                                                                                                                              }
                                                                                                                              default: {
                                                                                                                                const err = _M0FP46heyq026moonjs3src2vm19make__error__object("TypeError", `${_M0FP46heyq026moonjs3src2vm22describe__call__target(callee)} is not a constructor`);
                                                                                                                                const exc = _M0FP46heyq026moonjs3src2vm18throw__from__frame(frame, cur_pc, err);
                                                                                                                                const _bind$5 = _M0FP46heyq026moonjs3src2vm20propagate__exception(frame, exc);
                                                                                                                                if (_bind$5 === undefined) {
                                                                                                                                  return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11JSExceptionE3Err(exc);
                                                                                                                                } else {
                                                                                                                                  const _Some = _bind$5;
                                                                                                                                  const _next = _Some;
                                                                                                                                  frame = _next;
                                                                                                                                }
                                                                                                                              }
                                                                                                                            }
                                                                                                                          } else {
                                                                                                                            const _p$61 = 84;
                                                                                                                            if (op === _p$61) {
                                                                                                                              const v = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                                                                              const _bind = frame.caller;
                                                                                                                              if (_bind === undefined) {
                                                                                                                                return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11JSExceptionE2Ok(v);
                                                                                                                              } else {
                                                                                                                                const _Some = _bind;
                                                                                                                                const _caller = _Some;
                                                                                                                                const return_val = _M0FP46heyq026moonjs3src2vm20adjust__ctor__return(_caller, v, frame.this_val);
                                                                                                                                _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(_caller.operand_stack, return_val);
                                                                                                                                frame = _caller;
                                                                                                                              }
                                                                                                                            } else {
                                                                                                                              const _p$62 = 85;
                                                                                                                              if (op === _p$62) {
                                                                                                                                const _bind = frame.caller;
                                                                                                                                if (_bind === undefined) {
                                                                                                                                  return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11JSExceptionE2Ok(_M0DTP46heyq026moonjs3src5value7JSValue9Undefined__);
                                                                                                                                } else {
                                                                                                                                  const _Some = _bind;
                                                                                                                                  const _caller = _Some;
                                                                                                                                  const return_val = _M0FP46heyq026moonjs3src2vm20adjust__ctor__return(_caller, _M0DTP46heyq026moonjs3src5value7JSValue9Undefined__, frame.this_val);
                                                                                                                                  _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(_caller.operand_stack, return_val);
                                                                                                                                  frame = _caller;
                                                                                                                                }
                                                                                                                              } else {
                                                                                                                                const _p$63 = 96;
                                                                                                                                if (op === _p$63) {
                                                                                                                                  const _bind = _M0MP46heyq026moonjs3src8bytecode5Chunk18read__operand__i24(frame.chunk, cur_pc);
                                                                                                                                  const _offset = _bind._0;
                                                                                                                                  const _adv = _bind._1;
                                                                                                                                  frame.pc = (cur_pc + _adv | 0) + _offset | 0;
                                                                                                                                } else {
                                                                                                                                  const _p$64 = 97;
                                                                                                                                  if (op === _p$64) {
                                                                                                                                    const _bind = _M0MP46heyq026moonjs3src8bytecode5Chunk18read__operand__i24(frame.chunk, cur_pc);
                                                                                                                                    const _offset = _bind._0;
                                                                                                                                    const _adv = _bind._1;
                                                                                                                                    const v = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                                                                                    if (_M0FP46heyq026moonjs3src2vm11to__boolean(v)) {
                                                                                                                                      frame.pc = (cur_pc + _adv | 0) + _offset | 0;
                                                                                                                                    } else {
                                                                                                                                      frame.pc = cur_pc + _adv | 0;
                                                                                                                                    }
                                                                                                                                  } else {
                                                                                                                                    const _p$65 = 98;
                                                                                                                                    if (op === _p$65) {
                                                                                                                                      const _bind = _M0MP46heyq026moonjs3src8bytecode5Chunk18read__operand__i24(frame.chunk, cur_pc);
                                                                                                                                      const _offset = _bind._0;
                                                                                                                                      const _adv = _bind._1;
                                                                                                                                      const v = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                                                                                      if (!_M0FP46heyq026moonjs3src2vm11to__boolean(v)) {
                                                                                                                                        frame.pc = (cur_pc + _adv | 0) + _offset | 0;
                                                                                                                                      } else {
                                                                                                                                        frame.pc = cur_pc + _adv | 0;
                                                                                                                                      }
                                                                                                                                    } else {
                                                                                                                                      const _p$66 = 113;
                                                                                                                                      if (op === _p$66) {
                                                                                                                                        const _bind = _M0MP46heyq026moonjs3src8bytecode5Chunk18read__operand__i24(frame.chunk, cur_pc);
                                                                                                                                        const _offset = _bind._0;
                                                                                                                                        const _adv = _bind._1;
                                                                                                                                        frame.pc = cur_pc + _adv | 0;
                                                                                                                                        const catch_pc = _offset === -1 ? -1 : (cur_pc + _adv | 0) + _offset | 0;
                                                                                                                                        const handler = _M0MP46heyq026moonjs3src2vm10TryHandler3new(catch_pc, -1, frame.operand_stack.length);
                                                                                                                                        _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(frame.try_stack, handler);
                                                                                                                                      } else {
                                                                                                                                        const _p$67 = 114;
                                                                                                                                        if (op === _p$67) {
                                                                                                                                          if (frame.try_stack.length === 0) {
                                                                                                                                            `VM: LEAVE_TRY with empty try_stack at pc=${_M0MPC13int3Int18to__string_2einner(cur_pc, 10)}`;
                                                                                                                                            $panic();
                                                                                                                                          }
                                                                                                                                          _M0MPC15array5Array3popGRP46heyq026moonjs3src8compiler16FunctionCompilerE(frame.try_stack);
                                                                                                                                          frame.pc = cur_pc + 1 | 0;
                                                                                                                                        } else {
                                                                                                                                          const _p$68 = 112;
                                                                                                                                          if (op === _p$68) {
                                                                                                                                            const v = _M0FP46heyq026moonjs3src2vm10pop__stack(frame);
                                                                                                                                            frame.pc = cur_pc + 1 | 0;
                                                                                                                                            const exc = _M0FP46heyq026moonjs3src2vm18throw__from__frame(frame, cur_pc, v);
                                                                                                                                            const _bind = _M0FP46heyq026moonjs3src2vm20propagate__exception(frame, exc);
                                                                                                                                            if (_bind === undefined) {
                                                                                                                                              return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11JSExceptionE3Err(exc);
                                                                                                                                            } else {
                                                                                                                                              const _Some = _bind;
                                                                                                                                              const _next = _Some;
                                                                                                                                              frame = _next;
                                                                                                                                            }
                                                                                                                                          } else {
                                                                                                                                            const err = _M0FP46heyq026moonjs3src2vm19make__error__object("TypeError", `opcode 0x${_M0MPC13int3Int18to__string_2einner(op, 16)} (${_M0FP46heyq026moonjs3src8bytecode12opcode__name(op)}) not implemented`);
                                                                                                                                            frame.pc = cur_pc + 1 | 0;
                                                                                                                                            const exc = _M0FP46heyq026moonjs3src2vm18throw__from__frame(frame, cur_pc, err);
                                                                                                                                            const _bind = _M0FP46heyq026moonjs3src2vm20propagate__exception(frame, exc);
                                                                                                                                            if (_bind === undefined) {
                                                                                                                                              return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11JSExceptionE3Err(exc);
                                                                                                                                            } else {
                                                                                                                                              const _Some = _bind;
                                                                                                                                              const _next = _Some;
                                                                                                                                              frame = _next;
                                                                                                                                            }
                                                                                                                                          }
                                                                                                                                        }
                                                                                                                                      }
                                                                                                                                    }
                                                                                                                                  }
                                                                                                                                }
                                                                                                                              }
                                                                                                                            }
                                                                                                                          }
                                                                                                                        }
                                                                                                                      }
                                                                                                                    }
                                                                                                                  }
                                                                                                                }
                                                                                                              }
                                                                                                            }
                                                                                                          }
                                                                                                        }
                                                                                                      }
                                                                                                    }
                                                                                                  }
                                                                                                }
                                                                                              }
                                                                                            }
                                                                                          }
                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    continue;
  }
  return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11JSExceptionE2Ok(_M0DTP46heyq026moonjs3src5value7JSValue9Undefined__);
}
function _M0MP46heyq026moonjs3src2vm6Engine10run__chunk(self, chunk) {
  _M0MP46heyq026moonjs3src2vm6Engine15register__chunk(self, chunk);
  const frame = _M0MP46heyq026moonjs3src2vm5Frame3new(chunk, _M0DTP46heyq026moonjs3src5value7JSValue9Undefined__);
  return _M0MP46heyq026moonjs3src2vm6Engine14execute__frame(self, frame);
}
function _M0MP46heyq026moonjs3src2vm6Engine19make__syntax__error(self, msg, loc, filename) {
  const obj = _M0MP46heyq026moonjs3src5value6Object3new(_M0MP46heyq026moonjs3src5value5Shape3new(), _M0DTP46heyq026moonjs3src5value7JSValue4Null__);
  _M0MP46heyq026moonjs3src5value6Object13add__property(obj, "name", _M0MP46heyq026moonjs3src2vm6Engine19make__syntax__errorN6constrS1408, 7);
  _M0MP46heyq026moonjs3src5value6Object13add__property(obj, "message", new _M0DTP46heyq026moonjs3src5value7JSValue3Str(msg), 7);
  const _bind = self.builtins;
  if (_bind === undefined) {
  } else {
    const _Some = _bind;
    const _bi = _Some;
    _M0MP46heyq026moonjs3src5value6Object10set__proto(obj, new _M0DTP46heyq026moonjs3src5value7JSValue6Object(_bi.syntax_error_proto));
  }
  const stack = [];
  _M0MPC15array5Array4pushGRP46heyq026moonjs3src5value7JSValueE(stack, _M0MP46heyq026moonjs3src5value14StackFrameInfo3new("<top>", filename, loc));
  return _M0MP46heyq026moonjs3src5value11JSException3new(new _M0DTP46heyq026moonjs3src5value7JSValue6Object(obj), stack);
}
function _M0MP46heyq026moonjs3src2vm6Engine12eval__script(self, source, filename) {
  const _bind = _M0MP46heyq026moonjs3src6parser6Parser3new(source, filename);
  let parser;
  if (_bind.$tag === 1) {
    const _Ok = _bind;
    parser = _Ok._0;
  } else {
    const _Err = _bind;
    const _e = _Err._0;
    const _ParseError = _e;
    const _msg = _ParseError._0;
    const _loc = _ParseError._1;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11JSExceptionE3Err(_M0MP46heyq026moonjs3src2vm6Engine19make__syntax__error(self, _msg, _loc, filename));
  }
  const _bind$2 = _M0MP46heyq026moonjs3src6parser6Parser13parse__script(parser);
  let program;
  if (_bind$2.$tag === 1) {
    const _Ok = _bind$2;
    program = _Ok._0;
  } else {
    const _Err = _bind$2;
    const _e = _Err._0;
    const _ParseError = _e;
    const _msg = _ParseError._0;
    const _loc = _ParseError._1;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11JSExceptionE3Err(_M0MP46heyq026moonjs3src2vm6Engine19make__syntax__error(self, _msg, _loc, filename));
  }
  const compiler = _M0MP46heyq026moonjs3src8compiler8Compiler3new();
  const _bind$3 = _M0MP46heyq026moonjs3src8compiler8Compiler15compile__script(compiler, program, filename);
  let chunk;
  if (_bind$3.$tag === 1) {
    const _Ok = _bind$3;
    chunk = _Ok._0;
  } else {
    const _Err = _bind$3;
    const _e = _Err._0;
    const _CompileError = _e;
    const _msg = _CompileError._0;
    const _loc = _CompileError._1;
    return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11JSExceptionE3Err(_M0MP46heyq026moonjs3src2vm6Engine19make__syntax__error(self, _msg, _loc, filename));
  }
  return _M0MP46heyq026moonjs3src2vm6Engine10run__chunk(self, chunk);
}
function _M0FP46heyq026moonjs3cmd19moonjs_2dplayground14format__number(d) {
  if (d !== d) {
    return "NaN";
  }
  if (d > _M0FPB18double__max__value) {
    return "Infinity";
  }
  if (d < _M0FPB18double__min__value) {
    return "-Infinity";
  }
  if (d === 0) {
    return "0";
  }
  const trunc = _M0MPC16double6Double5trunc(d);
  if (trunc === d && (d >= -9.22337203685477478e+18 && d <= 9.22337203685477478e+18)) {
    const i64_val = $i64_trunc_f64(d);
    if ($f64_convert_i64(BigInt.asIntN(64, i64_val)) === d) {
      return _M0MPC15int645Int6418to__string_2einner(i64_val, 10);
    }
  }
  return String(d);
}
function _M0FP46heyq026moonjs3cmd19moonjs_2dplayground9pad__hex4(n) {
  const d3 = n >> 12 & 15;
  const d2 = n >> 8 & 15;
  const d1 = n >> 4 & 15;
  const d0 = n & 15;
  const buf = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  const _p = d3 >>> 0 < _M0FP46heyq026moonjs3cmd19moonjs_2dplayground9pad__hex4N3hexS22.length ? _M0FP46heyq026moonjs3cmd19moonjs_2dplayground9pad__hex4N3hexS22.charCodeAt(d3) : $oob();
  _M0IPB13StringBuilderPB6Logger11write__char(buf, _p);
  const _p$2 = d2 >>> 0 < _M0FP46heyq026moonjs3cmd19moonjs_2dplayground9pad__hex4N3hexS22.length ? _M0FP46heyq026moonjs3cmd19moonjs_2dplayground9pad__hex4N3hexS22.charCodeAt(d2) : $oob();
  _M0IPB13StringBuilderPB6Logger11write__char(buf, _p$2);
  const _p$3 = d1 >>> 0 < _M0FP46heyq026moonjs3cmd19moonjs_2dplayground9pad__hex4N3hexS22.length ? _M0FP46heyq026moonjs3cmd19moonjs_2dplayground9pad__hex4N3hexS22.charCodeAt(d1) : $oob();
  _M0IPB13StringBuilderPB6Logger11write__char(buf, _p$3);
  const _p$4 = d0 >>> 0 < _M0FP46heyq026moonjs3cmd19moonjs_2dplayground9pad__hex4N3hexS22.length ? _M0FP46heyq026moonjs3cmd19moonjs_2dplayground9pad__hex4N3hexS22.charCodeAt(d0) : $oob();
  _M0IPB13StringBuilderPB6Logger11write__char(buf, _p$4);
  return buf.val;
}
function _M0FP46heyq026moonjs3cmd19moonjs_2dplayground13quote__string(s) {
  const buf = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  _M0IPB13StringBuilderPB6Logger11write__char(buf, 34);
  const n = s.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < n) {
      const unit = i >>> 0 < s.length ? s.charCodeAt(i) : $oob();
      const c = unit;
      if (c === 92) {
        _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\\\");
      } else {
        if (c === 34) {
          _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\\"");
        } else {
          if (c === 10) {
            _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\n");
          } else {
            if (c === 13) {
              _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\r");
            } else {
              if (c === 9) {
                _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\t");
              } else {
                if (c === 8) {
                  _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\b");
                } else {
                  if (c === 12) {
                    _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\f");
                  } else {
                    if (c < 32) {
                      _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\u");
                      _M0IPB13StringBuilderPB6Logger13write__string(buf, _M0FP46heyq026moonjs3cmd19moonjs_2dplayground9pad__hex4(c));
                    } else {
                      _M0IPB13StringBuilderPB6Logger11write__char(buf, unit);
                    }
                  }
                }
              }
            }
          }
        }
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0IPB13StringBuilderPB6Logger11write__char(buf, 34);
  return buf.val;
}
function _M0FP46heyq026moonjs3cmd19moonjs_2dplayground17format__js__value(v) {
  switch (v.$tag) {
    case 0: {
      return "undefined";
    }
    case 1: {
      return "null";
    }
    case 2: {
      const _Bool = v;
      const _x = _Bool._0;
      if (_x === true) {
        return "true";
      } else {
        return "false";
      }
    }
    case 3: {
      const _Int32 = v;
      const _i = _Int32._0;
      return _M0MPC13int3Int18to__string_2einner(_i, 10);
    }
    case 4: {
      const _Number = v;
      const _d = _Number._0;
      return _M0FP46heyq026moonjs3cmd19moonjs_2dplayground14format__number(_d);
    }
    case 5: {
      const _Str = v;
      const _s = _Str._0;
      return _M0FP46heyq026moonjs3cmd19moonjs_2dplayground13quote__string(_s);
    }
    case 6: {
      return "[object Object]";
    }
    case 7: {
      const _Function = v;
      const _f = _Function._0;
      const name = _f.name;
      return name.length === 0 ? "[Function: anonymous]" : `[Function: ${name}]`;
    }
    default: {
      return "[native]";
    }
  }
}
function _M0FP46heyq026moonjs3cmd19moonjs_2dplayground30js__value__as__display__string(v) {
  switch (v.$tag) {
    case 0: {
      return "undefined";
    }
    case 1: {
      return "null";
    }
    case 2: {
      const _Bool = v;
      const _x = _Bool._0;
      if (_x === true) {
        return "true";
      } else {
        return "false";
      }
    }
    case 3: {
      const _Int32 = v;
      const _i = _Int32._0;
      return _M0MPC13int3Int18to__string_2einner(_i, 10);
    }
    case 4: {
      const _Number = v;
      const _d = _Number._0;
      return _M0FP46heyq026moonjs3cmd19moonjs_2dplayground14format__number(_d);
    }
    case 5: {
      const _Str = v;
      return _Str._0;
    }
    case 6: {
      return "[object Object]";
    }
    case 7: {
      const _Function = v;
      const _f = _Function._0;
      const name = _f.name;
      return name.length === 0 ? "[Function: anonymous]" : `[Function: ${name}]`;
    }
    default: {
      return "[native]";
    }
  }
}
function _M0FP46heyq026moonjs3cmd19moonjs_2dplayground23format__exception__head(v) {
  if (v.$tag === 6) {
    const _Object = v;
    const _obj = _Object._0;
    const name_val = _M0MP46heyq026moonjs3src5value6Object13get__property(_obj, "name");
    const message_val = _M0MP46heyq026moonjs3src5value6Object13get__property(_obj, "message");
    let has_name;
    if (name_val.$tag === 0) {
      has_name = false;
    } else {
      has_name = true;
    }
    let has_message;
    if (message_val.$tag === 0) {
      has_message = false;
    } else {
      has_message = true;
    }
    const name_str = has_name ? _M0FP46heyq026moonjs3cmd19moonjs_2dplayground30js__value__as__display__string(name_val) : "Error";
    const msg_str = has_message ? _M0FP46heyq026moonjs3cmd19moonjs_2dplayground30js__value__as__display__string(message_val) : "";
    return msg_str.length === 0 ? name_str : `${name_str}: ${msg_str}`;
  } else {
    return _M0FP46heyq026moonjs3cmd19moonjs_2dplayground17format__js__value(v);
  }
}
function _M0FP46heyq026moonjs3cmd19moonjs_2dplayground17format__exception(exc) {
  const head = _M0FP46heyq026moonjs3cmd19moonjs_2dplayground23format__exception__head(exc.value);
  const buf = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  _M0IPB13StringBuilderPB6Logger13write__string(buf, head);
  const _bind = exc.stack.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      const frame = _M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(exc.stack, i);
      const file = frame.filename.length === 0 ? "<inline>" : frame.filename;
      _M0IPB13StringBuilderPB6Logger13write__string(buf, "\n    at ");
      _M0IPB13StringBuilderPB6Logger13write__string(buf, frame.chunk_name);
      _M0IPB13StringBuilderPB6Logger13write__string(buf, " (");
      _M0IPB13StringBuilderPB6Logger13write__string(buf, file);
      _M0IPB13StringBuilderPB6Logger13write__string(buf, ":");
      _M0IPB13StringBuilderPB6Logger13write__string(buf, _M0MPC13int3Int18to__string_2einner(frame.loc.line, 10));
      _M0IPB13StringBuilderPB6Logger13write__string(buf, ":");
      _M0IPB13StringBuilderPB6Logger13write__string(buf, _M0MPC13int3Int18to__string_2einner(frame.loc.col, 10));
      _M0IPB13StringBuilderPB6Logger13write__string(buf, ")");
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return buf.val;
}
function _M0FP46heyq026moonjs3cmd19moonjs_2dplayground11print__impl(_this_val, args) {
  const buf = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  const _bind = args.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      if (i > 0) {
        _M0IPB13StringBuilderPB6Logger11write__char(buf, 32);
      }
      _M0IPB13StringBuilderPB6Logger13write__string(buf, _M0FP46heyq026moonjs3cmd19moonjs_2dplayground30js__value__as__display__string(_M0MPC15array5Array2atGRP46heyq026moonjs3src5value7JSValueE(args, i)));
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0IPB13StringBuilderPB6Logger11write__char(buf, 10);
  _M0FP46heyq026moonjs3cmd19moonjs_2dplayground11stdout__buf.contents = `${_M0FP46heyq026moonjs3cmd19moonjs_2dplayground11stdout__buf.contents}${buf.val}`;
  return new _M0DTPC16result6ResultGRP46heyq026moonjs3src5value7JSValueRP46heyq026moonjs3src5value11NativeErrorE2Ok(_M0DTP46heyq026moonjs3src5value7JSValue9Undefined__);
}
function _M0FP46heyq026moonjs3cmd19moonjs_2dplayground14install__print(engine) {
  const nf = _M0MP46heyq026moonjs3src5value14NativeFunction3new("print", false, _M0FP46heyq026moonjs3cmd19moonjs_2dplayground11print__impl);
  _M0MP46heyq026moonjs3src5value6Object13add__property(engine.globals, "print", new _M0DTP46heyq026moonjs3src5value7JSValue8NativeFn(nf), 7);
}
function _M0FP46heyq026moonjs3cmd19moonjs_2dplayground19split__prefix__expr(src) {
  const _p = 59;
  const semi_code = _p & 65535;
  const _p$2 = 123;
  const lbrace = _p$2 & 65535;
  const _p$3 = 125;
  const rbrace = _p$3 & 65535;
  const _p$4 = 40;
  const lparen = _p$4 & 65535;
  const _p$5 = 41;
  const rparen = _p$5 & 65535;
  const _p$6 = 91;
  const lbracket = _p$6 & 65535;
  const _p$7 = 93;
  const rbracket = _p$7 & 65535;
  let last_boundary = -1;
  let depth = 0;
  const _bind = src.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      const c = i >>> 0 < src.length ? src.charCodeAt(i) : $oob();
      if (c === lbrace || (c === lparen || c === lbracket)) {
        depth = depth + 1 | 0;
      } else {
        if (c === rbrace || (c === rparen || c === rbracket)) {
          depth = depth - 1 | 0;
          if (depth === 0 && c === rbrace) {
            last_boundary = i;
          }
        } else {
          if (c === semi_code && depth === 0) {
            last_boundary = i;
          }
        }
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  if (last_boundary < 0) {
    return { _0: "", _1: src };
  }
  const after = _M0MPC16string10StringView9to__owned(_M0MPC16string6String4trim(_M0MPC16string10StringView9to__owned(_M0MPC16string6String11sub_2einner(src, last_boundary + 1 | 0, undefined)), undefined));
  if (after.length > 0) {
    let expr = after;
    let _tmp$2;
    if (expr.length > 0) {
      const _tmp$3 = expr;
      const _tmp$4 = expr.length - 1 | 0;
      const _p$8 = _tmp$4 >>> 0 < _tmp$3.length ? _tmp$3.charCodeAt(_tmp$4) : $oob();
      _tmp$2 = _p$8 === semi_code;
    } else {
      _tmp$2 = false;
    }
    if (_tmp$2) {
      expr = _M0MPC16string10StringView9to__owned(_M0MPC16string6String4trim(_M0MPC16string10StringView9to__owned(_M0MPC16string6String11sub_2einner(expr, 0, expr.length - 1 | 0)), undefined));
    }
    return { _0: _M0MPC16string10StringView9to__owned(_M0MPC16string6String11sub_2einner(src, 0, last_boundary + 1 | 0)), _1: expr };
  }
  const inner = _M0MPC16string10StringView9to__owned(_M0MPC16string6String11sub_2einner(src, 0, last_boundary));
  let prev = -1;
  let d2 = 0;
  const _bind$2 = inner.length;
  let _tmp$2 = 0;
  while (true) {
    const i = _tmp$2;
    if (i < _bind$2) {
      const c = i >>> 0 < inner.length ? inner.charCodeAt(i) : $oob();
      if (c === lbrace || (c === lparen || c === lbracket)) {
        d2 = d2 + 1 | 0;
      } else {
        if (c === rbrace || (c === rparen || c === rbracket)) {
          d2 = d2 - 1 | 0;
          if (d2 === 0 && c === rbrace) {
            prev = i;
          }
        } else {
          if (c === semi_code && d2 === 0) {
            prev = i;
          }
        }
      }
      _tmp$2 = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return prev < 0 ? { _0: "", _1: inner } : { _0: _M0MPC16string10StringView9to__owned(_M0MPC16string6String11sub_2einner(inner, 0, prev + 1 | 0)), _1: _M0MPC16string10StringView9to__owned(_M0MPC16string6String4trim(_M0MPC16string10StringView9to__owned(_M0MPC16string6String11sub_2einner(inner, prev + 1 | 0, undefined)), undefined)) };
}
function _M0FP46heyq026moonjs3cmd19moonjs_2dplayground25wrap__source__for__result(source) {
  const trimmed = _M0MPC16string10StringView9to__owned(_M0MPC16string6String4trim(source, undefined));
  if (trimmed.length === 0) {
    return { _0: trimmed, _1: false };
  }
  const _bind = _M0FP46heyq026moonjs3cmd19moonjs_2dplayground19split__prefix__expr(trimmed);
  const _prefix = _bind._0;
  const _expr = _bind._1;
  if (_expr.length === 0) {
    return { _0: trimmed, _1: false };
  }
  return { _0: `var _r; ${_prefix} _r = (${_expr});`, _1: true };
}
function _M0FP46heyq026moonjs3cmd19moonjs_2dplayground17eval__and__format(source, filename) {
  _M0FP46heyq026moonjs3cmd19moonjs_2dplayground11stdout__buf.contents = "";
  const engine = _M0MP46heyq026moonjs3src2vm6Engine3new();
  _M0FP46heyq026moonjs3cmd19moonjs_2dplayground14install__print(engine);
  const _bind = _M0FP46heyq026moonjs3cmd19moonjs_2dplayground25wrap__source__for__result(source);
  const _transformed = _bind._0;
  const _has_expr = _bind._1;
  if (_has_expr) {
    const saved_stdout = _M0FP46heyq026moonjs3cmd19moonjs_2dplayground11stdout__buf.contents;
    const _bind$2 = _M0MP46heyq026moonjs3src2vm6Engine12eval__script(engine, _transformed, filename);
    if (_bind$2.$tag === 1) {
      const final_val = _M0MPC16option6Option10unwrap__orGRP46heyq026moonjs3src5value7JSValueE(_M0MP46heyq026moonjs3src5value6Object8get__own(engine.globals, "_r"), _M0DTP46heyq026moonjs3src5value7JSValue9Undefined__);
      return new _M0TP46heyq026moonjs3cmd19moonjs_2dplayground10EvalOutput("ok", _M0FP46heyq026moonjs3cmd19moonjs_2dplayground17format__js__value(final_val), "", _M0FP46heyq026moonjs3cmd19moonjs_2dplayground11stdout__buf.contents);
    } else {
      _M0FP46heyq026moonjs3cmd19moonjs_2dplayground11stdout__buf.contents = saved_stdout;
    }
    const engine2 = _M0MP46heyq026moonjs3src2vm6Engine3new();
    _M0FP46heyq026moonjs3cmd19moonjs_2dplayground14install__print(engine2);
    const _bind$3 = _M0MP46heyq026moonjs3src2vm6Engine12eval__script(engine2, source, filename);
    if (_bind$3.$tag === 1) {
      const _Ok = _bind$3;
      const _v = _Ok._0;
      return new _M0TP46heyq026moonjs3cmd19moonjs_2dplayground10EvalOutput("ok", _M0FP46heyq026moonjs3cmd19moonjs_2dplayground17format__js__value(_v), "", _M0FP46heyq026moonjs3cmd19moonjs_2dplayground11stdout__buf.contents);
    } else {
      const _Err = _bind$3;
      const _exc = _Err._0;
      return new _M0TP46heyq026moonjs3cmd19moonjs_2dplayground10EvalOutput("error", "", _M0FP46heyq026moonjs3cmd19moonjs_2dplayground17format__exception(_exc), _M0FP46heyq026moonjs3cmd19moonjs_2dplayground11stdout__buf.contents);
    }
  } else {
    const _bind$2 = _M0MP46heyq026moonjs3src2vm6Engine12eval__script(engine, source, filename);
    if (_bind$2.$tag === 1) {
      const _Ok = _bind$2;
      const _v = _Ok._0;
      return new _M0TP46heyq026moonjs3cmd19moonjs_2dplayground10EvalOutput("ok", _M0FP46heyq026moonjs3cmd19moonjs_2dplayground17format__js__value(_v), "", _M0FP46heyq026moonjs3cmd19moonjs_2dplayground11stdout__buf.contents);
    } else {
      const _Err = _bind$2;
      const _exc = _Err._0;
      return new _M0TP46heyq026moonjs3cmd19moonjs_2dplayground10EvalOutput("error", "", _M0FP46heyq026moonjs3cmd19moonjs_2dplayground17format__exception(_exc), _M0FP46heyq026moonjs3cmd19moonjs_2dplayground11stdout__buf.contents);
    }
  }
}
export { _M0FP46heyq026moonjs3cmd19moonjs_2dplayground17eval__and__format as eval_and_format }
