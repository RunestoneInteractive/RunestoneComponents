// Compiled by ClojureScript 1.8.34 {:static-fns true, :optimize-constants true}
goog.provide('rune_cljs.core');
goog.require('cljs.core');
goog.require('cljs.js');
goog.require('cljs.analyzer');
goog.require('clojure.string');
cljs.core.enable_console_print_BANG_();
cljs.user = {};
if(typeof rune_cljs.core.compiler_state !== 'undefined'){
} else {
rune_cljs.core.compiler_state = cljs.js.empty_state.cljs$core$IFn$_invoke$arity$0();
goog.exportSymbol('rune_cljs.core.compiler_state', rune_cljs.core.compiler_state);
}
rune_cljs.core.elide_children = (function rune_cljs$core$elide_children(_,ast){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(ast,cljs.core.cst$kw$children);
});
rune_cljs.core.simplify_env = (function rune_cljs$core$simplify_env(_,p__16481){
var map__16484 = p__16481;
var map__16484__$1 = ((((!((map__16484 == null)))?((((map__16484.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16484.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__16484):map__16484);
var ast = map__16484__$1;
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16484__$1,cljs.core.cst$kw$op);
var env = cljs.core.cst$kw$env.cljs$core$IFn$_invoke$arity$1(ast);
var ast__$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(op,cljs.core.cst$kw$fn))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ast,cljs.core.cst$kw$methods,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (env,map__16484,map__16484__$1,ast,op){
return (function (p1__16480_SHARP_){
return rune_cljs$core$simplify_env(null,p1__16480_SHARP_);
});})(env,map__16484,map__16484__$1,ast,op))
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
return cljs.js.compile_str.cljs$core$IFn$_invoke$arity$5(rune_cljs.core.compiler_state,src,null,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$source_DASH_map,true], null),(function (resultmap){
if(cljs.core.contains_QMARK_(resultmap,cljs.core.cst$kw$value)){
return rune_cljs.core.evaluate(src);
} else {
return [cljs.core.cst$kw$value.cljs$core$IFn$_invoke$arity$1(resultmap),cljs.core.cst$kw$error.cljs$core$IFn$_invoke$arity$1(resultmap)];
}
}));
});
goog.exportSymbol('rune_cljs.core.compile_evaluate', rune_cljs.core.compile_evaluate);
