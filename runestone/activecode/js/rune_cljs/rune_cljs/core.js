// Compiled by ClojureScript 1.8.34 {:static-fns true, :optimize-constants true}
goog.provide('rune_cljs.core');
goog.require('cljs.core');
goog.require('cljs.js');
goog.require('cljs.analyzer');
goog.require('clojure.string');
rune_cljs.core.logging = (function (){var G__16480 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$value,"",cljs.core.cst$kw$error,""], null);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__16480) : cljs.core.atom.call(null,G__16480));
})();
cljs.core.enable_console_print_BANG_();
cljs.user = {};
rune_cljs.core.custom_warning_handler = (function rune_cljs$core$custom_warning_handler(warning_type,env,extra){
if(cljs.core.truth_((warning_type.cljs$core$IFn$_invoke$arity$1 ? warning_type.cljs$core$IFn$_invoke$arity$1(rune_cljs.core._STAR_cljs_warnings_STAR_) : warning_type.call(null,rune_cljs.core._STAR_cljs_warnings_STAR_)))){
var temp__4657__auto__ = (rune_cljs.core.error_message.cljs$core$IFn$_invoke$arity$2 ? rune_cljs.core.error_message.cljs$core$IFn$_invoke$arity$2(warning_type,extra) : rune_cljs.core.error_message.call(null,warning_type,extra));
if(cljs.core.truth_(temp__4657__auto__)){
var s = temp__4657__auto__;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(rune_cljs.core.logging,cljs.core.assoc,cljs.core.cst$kw$error,[cljs.core.str("WARNING: "),cljs.core.str(s)].join(''));
} else {
return null;
}
} else {
return null;
}
});
if(typeof rune_cljs.core.compiler_state !== 'undefined'){
} else {
rune_cljs.core.compiler_state = cljs.js.empty_state.cljs$core$IFn$_invoke$arity$0();
goog.exportSymbol('rune_cljs.core.compiler_state', rune_cljs.core.compiler_state);
}
rune_cljs.core.elide_children = (function rune_cljs$core$elide_children(_,ast){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(ast,cljs.core.cst$kw$children);
});
rune_cljs.core.simplify_env = (function rune_cljs$core$simplify_env(_,p__16482){
var map__16485 = p__16482;
var map__16485__$1 = ((((!((map__16485 == null)))?((((map__16485.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16485.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__16485):map__16485);
var ast = map__16485__$1;
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16485__$1,cljs.core.cst$kw$op);
var env = cljs.core.cst$kw$env.cljs$core$IFn$_invoke$arity$1(ast);
var ast__$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(op,cljs.core.cst$kw$fn))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ast,cljs.core.cst$kw$methods,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (env,map__16485,map__16485__$1,ast,op){
return (function (p1__16481_SHARP_){
return rune_cljs$core$simplify_env(null,p1__16481_SHARP_);
});})(env,map__16485,map__16485__$1,ast,op))
,cljs.core.cst$kw$methods.cljs$core$IFn$_invoke$arity$1(ast))):ast);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(ast__$1,cljs.core.cst$kw$env),cljs.core.cst$kw$env,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$context,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env)], null));
});
rune_cljs.core.analyze = (function rune_cljs$core$analyze(src){
return cljs.js.analyze_str.cljs$core$IFn$_invoke$arity$5(rune_cljs.core.compiler_state,src,null,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$passes,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [rune_cljs.core.elide_children,rune_cljs.core.simplify_env], null)], null),(function (resultmap){
return [cljs.core.cst$kw$value.cljs$core$IFn$_invoke$arity$1(resultmap),cljs.core.cst$kw$error.cljs$core$IFn$_invoke$arity$1(resultmap),resultmap];
}));
});
goog.exportSymbol('rune_cljs.core.analyze', rune_cljs.core.analyze);
rune_cljs.core.evaluate = (function rune_cljs$core$evaluate(src){
return cljs.js.eval_str.cljs$core$IFn$_invoke$arity$5(rune_cljs.core.compiler_state,src,null,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$eval,cljs.js.js_eval,cljs.core.cst$kw$source_DASH_map,true,cljs.core.cst$kw$context,cljs.core.cst$kw$expr], null),(function (resultmap){
return [cljs.core.cst$kw$value.cljs$core$IFn$_invoke$arity$1(resultmap),cljs.core.cst$kw$error.cljs$core$IFn$_invoke$arity$1(resultmap)];
}));
});
goog.exportSymbol('rune_cljs.core.evaluate', rune_cljs.core.evaluate);
rune_cljs.core.compile_evaluate = (function rune_cljs$core$compile_evaluate(src){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(rune_cljs.core.logging,cljs.core.assoc,cljs.core.cst$kw$error,"");

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(rune_cljs.core.logging,cljs.core.assoc,cljs.core.cst$kw$value,"");

var _STAR_cljs_warning_handlers_STAR_16488 = rune_cljs.core._STAR_cljs_warning_handlers_STAR_;
rune_cljs.core._STAR_cljs_warning_handlers_STAR_ = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [rune_cljs.core.custom_warning_handler], null);

try{return cljs.js.compile_str.cljs$core$IFn$_invoke$arity$5(rune_cljs.core.compiler_state,src,null,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$source_DASH_map,true], null),((function (_STAR_cljs_warning_handlers_STAR_16488){
return (function (resultmap){
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$error.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(rune_cljs.core.logging) : cljs.core.deref.call(null,rune_cljs.core.logging))),"")){
return [cljs.core.cst$kw$value.cljs$core$IFn$_invoke$arity$1(resultmap),cljs.core.cst$kw$error.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(rune_cljs.core.logging) : cljs.core.deref.call(null,rune_cljs.core.logging)))];
} else {
if(cljs.core.contains_QMARK_(resultmap,cljs.core.cst$kw$value)){
return rune_cljs.core.evaluate(src);
} else {
return [cljs.core.cst$kw$value.cljs$core$IFn$_invoke$arity$1(resultmap),cljs.core.cst$kw$error.cljs$core$IFn$_invoke$arity$1(resultmap)];
}
}
});})(_STAR_cljs_warning_handlers_STAR_16488))
);
}finally {rune_cljs.core._STAR_cljs_warning_handlers_STAR_ = _STAR_cljs_warning_handlers_STAR_16488;
}});
goog.exportSymbol('rune_cljs.core.compile_evaluate', rune_cljs.core.compile_evaluate);
