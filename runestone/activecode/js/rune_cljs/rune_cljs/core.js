// Compiled by ClojureScript 1.8.51 {:static-fns true, :optimize-constants true}
goog.provide('rune_cljs.core');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('replumb.core');
rune_cljs.core.output = (function (){var G__19573 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$print,"",cljs.core.cst$kw$error,""], null);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__19573) : cljs.core.atom.call(null,G__19573));
})();
/**
 * Set *print-fn* to an atom
 */
rune_cljs.core.redirect_console_print_BANG_ = (function rune_cljs$core$redirect_console_print_BANG_(){
cljs.core._STAR_print_newline_STAR_ = false;

cljs.core._STAR_print_fn_STAR_ = (function() { 
var G__19574__delegate = function (args){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(rune_cljs.core.output,cljs.core.assoc,cljs.core.cst$kw$print,[cljs.core.str(clojure.string.join.cljs$core$IFn$_invoke$arity$2(" ",args)),cljs.core.str("\n")].join(''));
};
var G__19574 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__19575__i = 0, G__19575__a = new Array(arguments.length -  0);
while (G__19575__i < G__19575__a.length) {G__19575__a[G__19575__i] = arguments[G__19575__i + 0]; ++G__19575__i;}
  args = new cljs.core.IndexedSeq(G__19575__a,0);
} 
return G__19574__delegate.call(this,args);};
G__19574.cljs$lang$maxFixedArity = 0;
G__19574.cljs$lang$applyTo = (function (arglist__19576){
var args = cljs.core.seq(arglist__19576);
return G__19574__delegate(args);
});
G__19574.cljs$core$IFn$_invoke$arity$variadic = G__19574__delegate;
return G__19574;
})()
;

cljs.core._STAR_print_err_fn_STAR_ = (function() { 
var G__19577__delegate = function (args){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(rune_cljs.core.output,cljs.core.assoc,cljs.core.cst$kw$error,[cljs.core.str(clojure.string.join.cljs$core$IFn$_invoke$arity$2(" ",args)),cljs.core.str("\n")].join(''));
};
var G__19577 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__19578__i = 0, G__19578__a = new Array(arguments.length -  0);
while (G__19578__i < G__19578__a.length) {G__19578__a[G__19578__i] = arguments[G__19578__i + 0]; ++G__19578__i;}
  args = new cljs.core.IndexedSeq(G__19578__a,0);
} 
return G__19577__delegate.call(this,args);};
G__19577.cljs$lang$maxFixedArity = 0;
G__19577.cljs$lang$applyTo = (function (arglist__19579){
var args = cljs.core.seq(arglist__19579);
return G__19577__delegate(args);
});
G__19577.cljs$core$IFn$_invoke$arity$variadic = G__19577__delegate;
return G__19577;
})()
;

return null;
});
rune_cljs.core.redirect_console_print_BANG_();
cljs.user = {};
rune_cljs.core.callback = (function rune_cljs$core$callback(resultmap){
return [cljs.core.cst$kw$value.cljs$core$IFn$_invoke$arity$1(resultmap),cljs.core.cst$kw$error.cljs$core$IFn$_invoke$arity$1(resultmap),cljs.core.cst$kw$print.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(rune_cljs.core.output) : cljs.core.deref.call(null,rune_cljs.core.output))),cljs.core.cst$kw$error.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(rune_cljs.core.output) : cljs.core.deref.call(null,rune_cljs.core.output)))];
});
rune_cljs.core.eval_source = (function rune_cljs$core$eval_source(src){
var G__19582_19584 = rune_cljs.core.output;
var G__19583_19585 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$print,"",cljs.core.cst$kw$error,""], null);
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__19582_19584,G__19583_19585) : cljs.core.reset_BANG_.call(null,G__19582_19584,G__19583_19585));

return replumb.core.read_eval_call.cljs$core$IFn$_invoke$arity$3(new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$warning_DASH_as_DASH_error,true,cljs.core.cst$kw$context,cljs.core.cst$kw$statement], null),rune_cljs.core.callback,src);
});
goog.exportSymbol('rune_cljs.core.eval_source', rune_cljs.core.eval_source);
