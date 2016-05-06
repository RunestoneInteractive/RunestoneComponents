// Compiled by ClojureScript 1.8.51 {:static-fns true, :optimize-constants true}
goog.provide('replumb.nodejs');
goog.require('cljs.core');
replumb.nodejs.init_fn_BANG_ = (function replumb$nodejs$init_fn_BANG_(){
global.cljs.user = {};

goog.isProvided_ = function(x) { return false; };;

goog.require = (function (name){
var G__19144 = (goog.dependencies_.nameToPath[name]);
return CLOSURE_IMPORT_SCRIPT(G__19144);
});

cljs.core._STAR_loaded_libs_STAR_ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, ["cljs.core",null], null), null);

return goog.require = (function (name,reload){
if(cljs.core.truth_((function (){var or__5862__auto__ = !(cljs.core.contains_QMARK_(cljs.core._STAR_loaded_libs_STAR_,name));
if(or__5862__auto__){
return or__5862__auto__;
} else {
return reload;
}
})())){
cljs.core._STAR_loaded_libs_STAR_ = cljs.core.conj.cljs$core$IFn$_invoke$arity$2((function (){var or__5862__auto__ = cljs.core._STAR_loaded_libs_STAR_;
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return cljs.core.PersistentHashSet.EMPTY;
}
})(),name);

var G__19145 = (goog.dependencies_.nameToPath[name]);
return CLOSURE_IMPORT_SCRIPT(G__19145);
} else {
return null;
}
});
});
/**
 * Node.js default set of options for read-eval-call.
 *   It is intentionally missing :load-fn! that will need to be added
 *   before calling read-eval-call. See nodejs-opts.
 */
replumb.nodejs.default_opts = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$target,cljs.core.cst$kw$nodejs,cljs.core.cst$kw$init_DASH_fns,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [replumb.nodejs.init_fn_BANG_], null)], null);
