// Compiled by ClojureScript 1.8.51 {:static-fns true, :optimize-constants true}
goog.provide('replumb.common');
goog.require('cljs.core');
goog.require('clojure.string');
replumb.common.error_branch_QMARK_ = (function replumb$common$error_branch_QMARK_(error){
return (error instanceof Error);
});
replumb.common.error_children = (function replumb$common$error_children(error){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [error.cause], null);
});
replumb.common.error_seq = (function replumb$common$error_seq(error){
return cljs.core.tree_seq(replumb.common.error_branch_QMARK_,replumb.common.error_children,error);
});
/**
 * Iteratively extracts messages inside nested #error objects, returns a
 *   string.
 * 
 *   If the boolean `exclude-error-msg?` is true, only the messages not
 *   marked as "ERROR" will be included in the final string.
 * 
 *   If the boolean `print-stack?` is true, the stack will be added
 *   to the final string. They both default to false.
 * 
 *   ** Be sure to pass a js/Error object here **
 */
replumb.common.extract_message = (function replumb$common$extract_message(var_args){
var args16772 = [];
var len__6932__auto___16776 = arguments.length;
var i__6933__auto___16777 = (0);
while(true){
if((i__6933__auto___16777 < len__6932__auto___16776)){
args16772.push((arguments[i__6933__auto___16777]));

var G__16778 = (i__6933__auto___16777 + (1));
i__6933__auto___16777 = G__16778;
continue;
} else {
}
break;
}

var G__16774 = args16772.length;
switch (G__16774) {
case 1:
return replumb.common.extract_message.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return replumb.common.extract_message.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return replumb.common.extract_message.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args16772.length)].join('')));

}
});

replumb.common.extract_message.cljs$core$IFn$_invoke$arity$1 = (function (err){
return replumb.common.extract_message.cljs$core$IFn$_invoke$arity$3(false,false,err);
});

replumb.common.extract_message.cljs$core$IFn$_invoke$arity$2 = (function (print_stack_QMARK_,err){
return replumb.common.extract_message.cljs$core$IFn$_invoke$arity$3(print_stack_QMARK_,false,err);
});

replumb.common.extract_message.cljs$core$IFn$_invoke$arity$3 = (function (print_stack_QMARK_,exclude_error_msg_QMARK_,err){
return [cljs.core.str((function (){var strings = (function (){var G__16775 = cljs.core.keep.cljs$core$IFn$_invoke$arity$2(cljs.core.identity,replumb.common.error_seq(err));
var G__16775__$1 = (cljs.core.truth_(exclude_error_msg_QMARK_)?cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (G__16775){
return (function (p1__16770_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("ERROR",p1__16770_SHARP_.message);
});})(G__16775))
,G__16775):G__16775);
var G__16775__$2 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (G__16775,G__16775__$1){
return (function (p1__16771_SHARP_){
return p1__16771_SHARP_.message;
});})(G__16775,G__16775__$1))
,G__16775__$1)
;
return cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.core.complement(cljs.core.empty_QMARK_),G__16775__$2);

})();
if(cljs.core.seq(strings)){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2(" - ",strings);
} else {
return "Error";
}
})()),cljs.core.str((cljs.core.truth_(print_stack_QMARK_)?[cljs.core.str("\n"),cljs.core.str(err.stack)].join(''):null))].join('');
});

replumb.common.extract_message.cljs$lang$maxFixedArity = 3;
/**
 * Callback that just echoes the result map. It also asserts the correct
 *   result format in its post condition. Useful for debugging and
 *   testing.
 */
replumb.common.echo_callback = (function replumb$common$echo_callback(result_map){
return result_map;
});
/**
 * Wraps the message in a success map.
 */
replumb.common.wrap_success = (function replumb$common$wrap_success(message){
return new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$value,message], null);
});
/**
 * Wraps the message in a error map.
 */
replumb.common.wrap_error = (function replumb$common$wrap_error(message){
return new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$error,message], null);
});
/**
 * Returns true if the string contains the newline \\n or \\r as
 *   characters.
 */
replumb.common.inline_newline_QMARK_ = (function replumb$common$inline_newline_QMARK_(s){
return cljs.core.re_matches(/\\{2,}n|\\{2,}r/,s);
});
/**
 * Is the string returned from an evaluation valid?
 */
replumb.common.valid_eval_result_QMARK_ = (function replumb$common$valid_eval_result_QMARK_(var_args){
var args16780 = [];
var len__6932__auto___16783 = arguments.length;
var i__6933__auto___16784 = (0);
while(true){
if((i__6933__auto___16784 < len__6932__auto___16783)){
args16780.push((arguments[i__6933__auto___16784]));

var G__16785 = (i__6933__auto___16784 + (1));
i__6933__auto___16784 = G__16785;
continue;
} else {
}
break;
}

var G__16782 = args16780.length;
switch (G__16782) {
case 1:
return replumb.common.valid_eval_result_QMARK_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return replumb.common.valid_eval_result_QMARK_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args16780.length)].join('')));

}
});

replumb.common.valid_eval_result_QMARK_.cljs$core$IFn$_invoke$arity$1 = (function (result){
return replumb.common.valid_eval_result_QMARK_.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,result);
});

replumb.common.valid_eval_result_QMARK_.cljs$core$IFn$_invoke$arity$2 = (function (opts,result){
var or__5862__auto__ = (cljs.core.not(cljs.core.cst$kw$no_DASH_pr_DASH_str_DASH_on_DASH_value.cljs$core$IFn$_invoke$arity$1(opts))) && (typeof result === 'string') && (cljs.core.not(replumb.common.inline_newline_QMARK_(result)));
if(or__5862__auto__){
return or__5862__auto__;
} else {
var and__5850__auto__ = cljs.core.cst$kw$no_DASH_pr_DASH_str_DASH_on_DASH_value.cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(and__5850__auto__)){
return !((result == null));
} else {
return and__5850__auto__;
}
}
});

replumb.common.valid_eval_result_QMARK_.cljs$lang$maxFixedArity = 2;
/**
 * Is the string returned from an evaluation valid?
 */
replumb.common.valid_eval_error_QMARK_ = (function replumb$common$valid_eval_error_QMARK_(error){
return (error instanceof Error);
});
/**
 * Is the string returned from an evaluation valid?
 */
replumb.common.valid_eval_warning_QMARK_ = (function replumb$common$valid_eval_warning_QMARK_(warning){
return typeof warning === 'string';
});
replumb.common.has_valid_warning_QMARK_ = (function replumb$common$has_valid_warning_QMARK_(result){
var G__16788 = cljs.core.cst$kw$warning.cljs$core$IFn$_invoke$arity$1(result);
if((G__16788 == null)){
return null;
} else {
return replumb.common.valid_eval_warning_QMARK_(G__16788);
}
});
/**
 * Yields a "keyword not supported" error map. Receives the
 *   symbol/keyword printed in the message and ex-info data.
 */
replumb.common.error_keyword_not_supported = (function replumb$common$error_keyword_not_supported(keyword,ex_info_data){
return replumb.common.wrap_error(cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2([cljs.core.str("The "),cljs.core.str(keyword),cljs.core.str(" keyword is not supported at the moment")].join(''),ex_info_data));
});
/**
 * Yields a "Argument must a be a symbol" error map. Receives the
 *   symbol/fn name printed in the message and ex-info data.
 */
replumb.common.error_argument_must_be_symbol = (function replumb$common$error_argument_must_be_symbol(symbol,ex_info_data){
return replumb.common.wrap_error(cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2([cljs.core.str("Argument to "),cljs.core.str(symbol),cljs.core.str(" must be a symbol")].join(''),ex_info_data));
});
/**
 * Filter out the option map keys that have -fn in it.
 */
replumb.common.filter_fn_keys = (function replumb$common$filter_fn_keys(opts){
if(cljs.core.map_QMARK_(opts)){
} else {
throw (new Error("Assert failed: (map? opts)"));
}

var new_fn_entries = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__16789_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__16789_SHARP_,(1),"<hidden function>");
}),cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__16790_SHARP_){
return cljs.core.re_find(/-fn/,cljs.core.name(cljs.core.first(p1__16790_SHARP_)));
}),cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,opts)));
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(opts,new_fn_entries);
});
/**
 * The function used by replumb for logging. It simply calls println for
 *   now so you that client code can set *print-fn* to customize the
 *   behavior, for example the following marks traces as DEBUG:
 * 
 *   (set! *print-fn*
 *  (fn [& args]
 *    (.apply (.-debug js/console) js/console (into-array args))))
 */
replumb.common.debug_prn = (function replumb$common$debug_prn(var_args){
var args__6939__auto__ = [];
var len__6932__auto___16792 = arguments.length;
var i__6933__auto___16793 = (0);
while(true){
if((i__6933__auto___16793 < len__6932__auto___16792)){
args__6939__auto__.push((arguments[i__6933__auto___16793]));

var G__16794 = (i__6933__auto___16793 + (1));
i__6933__auto___16793 = G__16794;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((0) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((0)),(0),null)):null);
return replumb.common.debug_prn.cljs$core$IFn$_invoke$arity$variadic(argseq__6940__auto__);
});

replumb.common.debug_prn.cljs$core$IFn$_invoke$arity$variadic = (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.println,args);
});

replumb.common.debug_prn.cljs$lang$maxFixedArity = (0);

replumb.common.debug_prn.cljs$lang$applyTo = (function (seq16791){
return replumb.common.debug_prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq16791));
});
/**
 * Adds a / if missing at the end of the path.
 */
replumb.common.normalize_path = (function replumb$common$normalize_path(path){
return [cljs.core.str(path),cljs.core.str(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("/",cljs.core.last(path)))?null:"/"))].join('');
});
